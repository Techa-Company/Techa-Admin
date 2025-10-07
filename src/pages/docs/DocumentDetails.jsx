import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '../../components/ui/dropdown-menu';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CrossIcon,
    EllipsisVertical,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    BookOpen,
    FileText,
    GripVertical,
    ArrowUpDown,
    Bookmark,
    BookmarkPlus,
    Clock
} from 'lucide-react';
import { createAndUpdateContent, deleteContent, fetchContents } from '../../features/contents/contentsActions';
import { minuteToHour } from '../../helper';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

// React SortableJS imports
import { ReactSortable } from "react-sortablejs";
import { EditSession } from 'ace-builds';

const DocumentDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { contents, loading, error } = useSelector((state) => state.contents);
    const [chapters, setChapters] = useState([]);
    const [expandedChapters, setExpandedChapters] = useState({});
    const [editingChapter, setEditingChapter] = useState(null);
    const [editingSession, setEditingSession] = useState(null);
    const [newChapter, setNewChapter] = useState(null);
    const [newSession, setNewSession] = useState(null);

    console.log(contents)

    useEffect(() => {
        dispatch(fetchContents({
            "@CourseId": id,
            "@GetAll": true,
        }));
    }, [dispatch, id]);

    useEffect(() => {
        if (contents && contents.length > 0) {
            const chaptersMap = {};
            const sessionsMap = {};

            contents.forEach(item => {
                if (!item.ParentId) {
                    chaptersMap[item.Id] = { ...item, sessions: [], id: item.Id };
                } else {
                    if (!sessionsMap[item.ParentId]) {
                        sessionsMap[item.ParentId] = [];
                    }
                    sessionsMap[item.ParentId].push({ ...item, id: item.Id });
                }
            });

            Object.keys(sessionsMap).forEach(parentId => {
                if (chaptersMap[parentId]) {
                    chaptersMap[parentId].sessions = sessionsMap[parentId]
                        .sort((a, b) => a.SortIndex - b.SortIndex);
                }
            });

            const organizedChapters = Object.values(chaptersMap)
                .sort((a, b) => a.SortIndex - b.SortIndex);

            setChapters(organizedChapters);

            if (organizedChapters.length > 0 && Object.keys(expandedChapters).length === 0) {
                setExpandedChapters({ [organizedChapters[0].Id]: true });
            }
        }
    }, [contents]);

    const toggleChapter = (chapterId) => {
        setExpandedChapters(prev => ({
            ...prev,
            [chapterId]: !prev[chapterId]
        }));
    };

    // ===================== CRUD Operations =====================
    const handleAddChapter = async () => {
        if (!newChapter || !newChapter.Title || newChapter.SortIndex == null) {
            toast.error("لطفاً عنوان و ترتیب سرفصل را وارد کنید");
            return;
        }

        const data = {
            "@Id": 0,
            "@CourseId": id,
            "@Title": newChapter.Title,
            "@SortIndex": newChapter.SortIndex,
            "@Disabled": false,
            "@Price": 0
        };

        try {
            await dispatch(createAndUpdateContent(data)).unwrap();
            setNewChapter(null);
            dispatch(fetchContents({
                "@CourseId": id,
                "@GetAll": true,
            }));
            toast.success("سرفصل با موفقیت اضافه شد");
        } catch (error) {
            console.error("Error creating chapter:", error);
            toast.error("خطا در افزودن سرفصل: " + (error?.message || "خطای ناشناخته"));
        }
    };

    const handleAddSession = async (chapterId) => {
        if (!newSession || !newSession.Title || newSession.SortIndex == null || !newSession.TimeToRead) {
            toast.error("لطفاً موارد الزامی را وارد کنید");
            return;
        }

        const data = {
            "@Id": 0,
            "@CourseId": id,
            "@ParentId": chapterId,
            "@Title": newSession.Title,
            "@Description": newSession.Description,
            "@SortIndex": newSession.SortIndex,
            "@Disabled": false,
            "@TimeToRead": newSession.TimeToRead,
            "@Price": 0
        };

        try {
            await dispatch(createAndUpdateContent(data)).unwrap();
            setNewSession(null);
            dispatch(fetchContents({
                "@CourseId": id,
                "@GetAll": true,
            }));
            toast.success("جلسه با موفقیت اضافه شد");
        } catch (error) {
            console.error("Error creating Session:", error);
            toast.error("خطا در افزودن جلسه: " + (error?.message || "خطای ناشناخته"));
        }
    };

    const handleUpdateChapter = async () => {
        if (!editingChapter || !editingChapter.Id || !editingChapter.Title || editingChapter.SortIndex == null) {
            toast.error("لطفاً عنوان و ترتیب سرفصل را وارد کنید");
            return;
        }

        const data = {
            "@Id": editingChapter.Id,
            "@CourseId": editingChapter.CourseId || id,
            "@Title": editingChapter.Title,
            "@SortIndex": editingChapter.SortIndex,
            "@Disabled": editingChapter.Disabled ?? false,
            "@Price": editingChapter.Price || 0
        };

        try {
            await dispatch(createAndUpdateContent(data)).unwrap();
            setEditingChapter(null);
            dispatch(fetchContents({
                "@CourseId": id,
                "@GetAll": true,
            }));
            toast.success("سرفصل با موفقیت به‌روزرسانی شد");
        } catch (error) {
            console.error("Error updating chapter:", error);
            toast.error("خطا در به‌روزرسانی سرفصل: " + (error?.message || "خطای ناشناخته"));
        }
    };

    const handleUpdateSession = async () => {
        if (!editingSession || !editingSession.Id || !editingSession.Title, !editingSession.TimeToRead) {
            toast.error("لطفاً اطلاعات جلسه را کامل وارد کنید");
            return;
        }

        const data = {
            "@Id": editingSession.Id,
            "@CourseId": editingSession.CourseId,
            "@ParentId": editingSession.ParentId,
            "@Title": editingSession.Title,
            "@Description": editingSession.Description,
            "@Disabled": editingSession.Disabled ?? false,
            "@SortIndex": editingSession.SortIndex,
            "@TimeToRead": editingSession.TimeToRead,
            "@Price": editingSession.Price || 0
        };

        try {
            await dispatch(createAndUpdateContent(data)).unwrap();
            setEditingSession(null);
            toast.success("جلسه با موفقیت به‌روزرسانی شد");
            dispatch(fetchContents({
                "@CourseId": id,
                "@GetAll": true,
            }));
        } catch (error) {
            console.error("Error updating session:", error);
            toast.error("خطا در به‌روزرسانی جلسه: " + (error?.message || "خطای ناشناخته"));
        }
    };

    const MySwal = withReactContent(Swal);

    const handleDeleteChapter = async (chapterId) => {
        const hasChildren = contents.some(item => item.ParentId === chapterId);

        if (hasChildren) {
            toast.error("این سرفصل دارای جلسه است و قابل حذف نیست.");
            return;
        }

        const confirm = await MySwal.fire({
            title: 'آیا از حذف این سرفصل مطمئن هستید؟',
            text: "تمام جلسات مربوط به این سرفصل نیز حذف خواهند شد!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'بله، حذف شود!',
            cancelButtonText: 'لغو',
        });

        if (!confirm.isConfirmed) return;

        const data = {
            "@Id": chapterId,
        };

        try {
            const resultAction = await dispatch(deleteContent(data));

            if (resultAction.type === deleteContent.fulfilled.type) {
                toast.success('سرفصل با موفقیت حذف شد');
                dispatch(fetchContents({
                    "@CourseId": id,
                    "@GetAll": true,
                }));
            } else {
                toast.error('خطا در حذف سرفصل');
            }
        } catch (error) {
            console.error("Error deleting chapter:", error);
            toast.error(`خطا در حذف سرفصل: ${error.message}`);
        }
    };

    const handleDeleteSession = async (sessionId) => {
        const confirm = await MySwal.fire({
            title: 'آیا از حذف این جلسه مطمئن هستید؟',
            text: "این عمل قابل بازگشت نیست!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'بله، حذف شود!',
            cancelButtonText: 'لغو',
        });

        if (!confirm.isConfirmed) return;

        const data = {
            "@Id": sessionId,
        };

        try {
            const resultAction = await dispatch(deleteContent(data));

            if (resultAction.type === deleteContent.fulfilled.type) {
                toast.success("جلسه با موفقیت حذف شد");
                dispatch(fetchContents({
                    "@CourseId": id,
                    "@GetAll": true,
                }));
            } else {
                toast.error("خطا در حذف جلسه");
            }
        } catch (error) {
            console.error("Error deleting session:", error);
            toast.error("خطا در حذف جلسه: " + (error?.message || "خطای ناشناخته"));
        }
    };
    // ===================== End CRUD Operations =====================

    // Handle chapter order change
    const handleChaptersOrderChange = async (newChapters) => {
        const updatedChapters = newChapters.map((chapter, index) => ({
            ...chapter,
            SortIndex: index + 1
        }));

        setChapters(updatedChapters);

        // مقدار قدیمی رو به تابع ارسال کن
        await updateOrderAndFetch(updatedChapters, 'chapter', null, chapters);
    };

    const handleSessionsOrderChange = async (newSessions, chapterId) => {
        const updatedChapters = chapters.map(chapter => {
            if (chapter.Id === chapterId) {
                return {
                    ...chapter,
                    sessions: newSessions.map((session, index) => ({
                        ...session,
                        SortIndex: index + 1
                    }))
                };
            }
            return chapter;
        });

        setChapters(updatedChapters);

        const chapter = updatedChapters.find(ch => ch.Id === chapterId);
        if (chapter) {
            const oldChapter = chapters.find(ch => ch.Id === chapterId);
            await updateOrderAndFetch(chapter.sessions, 'session', chapterId, oldChapter?.sessions || []);
        }
    };


    // Update order in server
    const updateOrderAndFetch = async (items, entityType, parentId = null, oldItems = []) => {
        try {
            // فقط آیتم‌هایی که SortIndex تغییر کرده رو فیلتر کن
            const itemsToUpdate = items.filter(item => {
                const oldItem = oldItems.find(old => old.Id === item.Id);
                if (!oldItem) return true; // اگر قبلاً نبود، حتما باید بفرستیم
                return oldItem.SortIndex !== item.SortIndex;
            });

            if (itemsToUpdate.length === 0) {
                // toast.info('ترتیب تغییری نکرده است.');
                return;
            }

            const updatePromises = itemsToUpdate.map(item => {
                const updateData = entityType === 'chapter' ? {
                    "@Id": item.Id,
                    "@CourseId": item.CourseId || id,
                    "@Title": item.Title,
                    "@SortIndex": item.SortIndex,
                    "@Disabled": item.Disabled ?? false,
                    "@Price": item.Price || 0
                } : {
                    "@Id": item.Id,
                    "@CourseId": item.CourseId,
                    "@ParentId": parentId,
                    "@Title": item.Title,
                    "@Description": item.Description,
                    "@Disabled": item.Disabled ?? false,
                    "@SortIndex": item.SortIndex,
                    "@Price": item.Price || 0
                };

                return dispatch(createAndUpdateContent(updateData)).unwrap();
            });

            await Promise.all(updatePromises);
            toast.success(`ترتیب ${entityType === 'chapter' ? 'سرفصل‌ها' : 'جلسات'} با موفقیت ذخیره شد`);

            dispatch(fetchContents({
                "@CourseId": id,
                "@GetAll": true,
            }));

        } catch (error) {
            console.error(`Error updating ${entityType} order:`, error);
            toast.error(`خطا در ذخیره ترتیب: ${error.message || 'خطای ناشناخته'}`);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
        </div>
    );

    if (error) return (
        <div className="container mx-auto px-4 py-12">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-bold text-red-800">خطا در بارگذاری داده‌ها</h3>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700 p-3 rounded-full shadow-lg mb-4">
                    <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">مدیریت سرفصل‌ها و جلسات</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    در این بخش می‌توانید سرفصل‌ها و جلسات دوره را مدیریت کنید. سرفصل‌ها را اضافه، ویرایش یا حذف کنید و برای هر سرفصل جلسات مربوطه را تنظیم نمایید.
                </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 shadow-sm border border-purple-100">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-lg ml-4">
                            <Bookmark className="h-6 w-6 text-purple-700" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">تعداد سرفصل‌ها</p>
                            <h3 className="text-2xl font-bold text-gray-800">{chapters.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 shadow-sm border border-emerald-100">
                    <div className="flex items-center">
                        <div className="bg-emerald-100 p-3 rounded-lg ml-4">
                            <FileText className="h-6 w-6 text-emerald-700" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">تعداد جلسات</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {chapters.reduce((total, chapter) => total + chapter.sessions.length, 0)}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 shadow-sm border border-amber-100">
                    <div className="flex items-center">
                        <div className="bg-amber-100 p-3 rounded-lg ml-4">
                            <ArrowUpDown className="h-6 w-6 text-amber-700" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">مدت زمان</p>
                            <h3 className="text-xl font-bold text-gray-800">
                                {
                                    minuteToHour(contents
                                        .filter(item => item.ParentId !== null)
                                        .reduce((sum, item) => sum + (item.TimeToRead || 0), 0))
                                }
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                        <GripVertical className="ml-2" />
                        مرتب‌سازی
                    </Button>
                    <Button variant="outline" className="border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        فیلتر
                    </Button>
                </div>

                <Button
                    className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg shadow-purple-200"
                    onClick={() => setNewChapter({ Title: '', SortIndex: chapters.length + 1 })}
                >
                    <BookmarkPlus className="ml-2" />
                    افزودن سرفصل جدید
                </Button>
            </div>

            {/* New Chapter Form */}
            {newChapter && (
                <div className="mb-8 animate-fadeIn">
                    <Card className="border border-purple-200 py-0 shadow-lg">
                        <CardHeader className="py-6 bg-gradient-to-r rounded-xl from-purple-50 to-indigo-50 border-b border-purple-100">
                            <CardTitle className="flex items-center text-purple-800">
                                <Bookmark className="h-5 w-5 ml-2" />
                                سرفصل جدید
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="chapter-title" className="text-gray-700 mb-2 block">عنوان سرفصل</Label>
                                    <Input
                                        id="chapter-title"
                                        value={newChapter.Title}
                                        className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                                        onChange={(e) => setNewChapter({ ...newChapter, Title: e.target.value })}
                                        placeholder="عنوان سرفصل را وارد کنید"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="chapter-sort" className="text-gray-700 mb-2 block">ترتیب نمایش</Label>
                                    <Input
                                        id="chapter-sort"
                                        type="number"
                                        value={newChapter.SortIndex}
                                        className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                                        onChange={(e) => setNewChapter({ ...newChapter, SortIndex: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-100 pb-6">
                            <Button
                                variant="outline"
                                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                onClick={() => setNewChapter(null)}
                            >
                                <CrossIcon className="ml-2 h-5 w-5" />
                                انصراف
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-200"
                                onClick={handleAddChapter}
                            >
                                <CheckIcon className="ml-2 h-5 w-5" />
                                ذخیره سرفصل
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {/* Chapters List */}
            <ReactSortable
                list={chapters}
                setList={handleChaptersOrderChange}
                handle=".drag-handle"
                animation={200}
                className="space-y-6"
            >
                {chapters.map((chapter) => (
                    <div key={chapter.Id} className="group relative">
                        <Card className="border border-gray-200 py-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                            <CardHeader
                                className={`flex justify-between items-center py-6 cursor-pointer transition-colors duration-200 ${expandedChapters[chapter.Id] ? 'bg-purple-50' : 'bg-white hover:bg-gray-50'}`}
                                onClick={() => toggleChapter(chapter.Id)}
                            >
                                <div className="flex items-center">
                                    <div className="p-2 rounded-lg bg-purple-100 text-purple-700 ml-3 cursor-move drag-handle">
                                        <GripVertical className="h-4 w-4" />
                                    </div>

                                    {expandedChapters[chapter.Id] ?
                                        <ChevronUpIcon className="ml-2 text-purple-600" /> :
                                        <ChevronDownIcon className="ml-2 text-gray-500" />
                                    }

                                    {editingChapter?.Id === chapter.Id ? (
                                        <Input
                                            className="ml-3 flex-1 py-2 px-4 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-300"
                                            value={editingChapter.Title}
                                            onChange={(e) => setEditingChapter({ ...editingChapter, Title: e.target.value })}
                                        />
                                    ) : (
                                        <CardTitle className="flex items-center">
                                            <Bookmark className="h-5 w-5 ml-2 text-purple-600" />
                                            {chapter.Title}
                                        </CardTitle>
                                    )}
                                </div>


                                <div className="flex space-x-2">
                                    {editingChapter?.Id === chapter.Id ? (
                                        <>
                                            <Button
                                                variant="outline"
                                                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                                onClick={() => setEditingChapter(null)}
                                            >
                                                <CrossIcon className="ml-2 h-5 w-5" />
                                                انصراف
                                            </Button>
                                            <Button
                                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                                onClick={handleUpdateChapter}
                                            >
                                                <CheckIcon className="ml-2 h-5 w-5" />
                                                ذخیره
                                            </Button>
                                        </>
                                    ) : (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-gray-500 hover:text-purple-700 hover:bg-purple-100 rounded-full"
                                                >
                                                    <EllipsisVertical className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="border border-gray-200 shadow-lg rounded-xl py-2">
                                                <DropdownMenuItem
                                                    className="flex items-center px-4 py-2 hover:bg-purple-50 cursor-pointer"
                                                    onClick={() => setEditingChapter(chapter)}
                                                >
                                                    <PencilIcon className="ml-2 h-4 w-4 text-gray-600" />
                                                    ویرایش
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="flex items-center px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600"
                                                    onClick={() => handleDeleteChapter(chapter.Id)}
                                                >
                                                    <TrashIcon className="ml-2 h-4 w-4" />
                                                    حذف
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="flex items-center px-4 py-2 hover:bg-emerald-50 cursor-pointer text-emerald-600"
                                                    onClick={() => setNewSession({
                                                        Title: '',
                                                        SortIndex: chapter.sessions.length + 1,
                                                        Description: '',
                                                        ParentId: chapter.Id
                                                    })}
                                                >
                                                    <PlusIcon className="ml-2 h-4 w-4" />
                                                    افزودن جلسه
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            </CardHeader>

                            {expandedChapters[chapter.Id] && (
                                <CardContent className="pt-0 pb-6">
                                    {/* New Session Form */}
                                    {newSession?.ParentId === chapter.Id && (
                                        <div className="mb-6 animate-fadeIn">
                                            <Card className="border border-emerald-200 shadow-md pt-0">
                                                <CardHeader className="pt-6 rounded-t-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                                                    <CardTitle className="flex items-center text-emerald-800">
                                                        <FileText className="h-5 w-5 ml-2" />
                                                        جلسه جدید
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="pt-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                                        <div>
                                                            <Label htmlFor="session-title" className="text-gray-700 mb-2 block">عنوان جلسه</Label>
                                                            <Input
                                                                id="session-title"
                                                                value={newSession.Title}
                                                                className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                                                                onChange={(e) => setNewSession({ ...newSession, Title: e.target.value })}
                                                                placeholder="عنوان جلسه را وارد کنید"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="session-sort" className="text-gray-700 mb-2 block">ترتیب نمایش</Label>
                                                            <Input
                                                                id="session-sort"
                                                                type="number"
                                                                value={newSession.SortIndex}
                                                                className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                                                                onChange={(e) => setNewSession({ ...newSession, SortIndex: parseInt(e.target.value) || 0 })}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="timeToRead" className="text-gray-700 mb-2 block">زمان مطالعه <span className='text-red-500'>*</span></Label>
                                                            <Input
                                                                id="timeToRead"
                                                                type="number"
                                                                value={newSession.timeToRead}
                                                                className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                                                                onChange={(e) => setNewSession({ ...newSession, timeToRead: parseInt(e.target.value) || 0 })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="session-content" className="text-gray-700 mb-2 block">محتوای جلسه</Label>
                                                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                                                            <Editor
                                                                apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                                                                value={newSession.Description}
                                                                init={{
                                                                    height: 400,
                                                                    menubar: true,
                                                                    plugins: 'code codesample link lists table emoticons image',
                                                                    toolbar:
                                                                        'undo redo | formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table | emoticons | image | code codesample | noteBox warningBox dangerBox infoBox',
                                                                    skin: 'oxide-dark',
                                                                    content_css: 'dark',
                                                                    branding: false,
                                                                    images_upload_url: 'postAcceptor.php',
                                                                    automatic_uploads: true,

                                                                    // ✅ لیست زبان‌های Code Sample
                                                                    codesample_languages: [
                                                                        { text: 'HTML/XML', value: 'markup' },
                                                                        { text: 'JavaScript', value: 'javascript' },
                                                                        { text: 'React (JSX)', value: 'jsx' },
                                                                        { text: 'SQL', value: 'sql' },
                                                                        { text: 'CSS', value: 'css' },
                                                                        { text: 'JSON', value: 'json' },
                                                                        { text: 'Python', value: 'python' },
                                                                        { text: 'Java', value: 'java' },
                                                                        { text: 'C#', value: 'csharp' },
                                                                        { text: 'C++', value: 'cpp' },
                                                                    ],

                                                                    setup: (editor) => {
                                                                        const createBox = (type, text, color) => {
                                                                            editor.insertContent(`
                                                                                <div dir='rtl' class="custom-box ${type}" 
                                                                                    style="border-right: 4px solid ${color}; background-color: ${color}20; padding: 16px; border-radius: 8px; margin: 16px 0;">
                                                                                    <strong>${text}:</strong> این متن را ویرایش کنید.
                                                                                </div>
                                                                            `);
                                                                        };

                                                                        editor.ui.registry.addButton('noteBox', {
                                                                            icon: 'comment',
                                                                            tooltip: 'نکته',
                                                                            onAction: () => createBox('note', 'نکته', '#10B981')
                                                                        });

                                                                        editor.ui.registry.addButton('warningBox', {
                                                                            icon: 'warning',
                                                                            tooltip: 'هشدار',
                                                                            onAction: () => createBox('warning', 'هشدار', '#F59E0B')
                                                                        });

                                                                        editor.ui.registry.addButton('dangerBox', {
                                                                            icon: 'alert',
                                                                            tooltip: 'خطر',
                                                                            onAction: () => createBox('danger', 'خطر', '#EF4444')
                                                                        });

                                                                        editor.ui.registry.addButton('infoBox', {
                                                                            icon: 'info',
                                                                            tooltip: 'اطلاعات',
                                                                            onAction: () => createBox('info', 'اطلاعات', '#3B82F6')
                                                                        });
                                                                    }
                                                                }}
                                                                onEditorChange={(content) =>
                                                                    setNewSession({ ...newSession, Description: content })
                                                                }
                                                            />

                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                                    <Button
                                                        variant="outline"
                                                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                                        onClick={() => setNewSession(null)}
                                                    >
                                                        <CrossIcon className="ml-2 h-5 w-5" />
                                                        انصراف
                                                    </Button>
                                                    <Button
                                                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                                        onClick={() => handleAddSession(chapter.Id)}
                                                    >
                                                        <CheckIcon className="ml-2 h-5 w-5" />
                                                        ذخیره جلسه
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    )}

                                    {/* Sessions List */}
                                    <ReactSortable
                                        list={chapter.sessions}
                                        setList={(newSessions) => handleSessionsOrderChange(newSessions, chapter.Id)}
                                        handle=".drag-handle"
                                        animation={200}
                                        className="space-y-4 pr-8 border-r-2 border-purple-100 ml-4"
                                    >
                                        {chapter.sessions.map((session) => (
                                            <div key={session.Id}>
                                                <Card className="pt-0 border border-gray-200 shadow-sm hover:shadow transition-shadow duration-300">
                                                    <CardHeader className="py-6 rounded-xl flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                                        <div className="flex items-center">
                                                            <div className="p-2 rounded-lg bg-gray-200 text-gray-700 ml-3 cursor-move drag-handle">
                                                                <GripVertical className="h-4 w-4" />
                                                            </div>
                                                            <div className='flex items-center gap-8'>

                                                                {editingSession?.Id === session.Id ? (
                                                                    <Input
                                                                        className="py-2 px-4 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-300"
                                                                        value={editingSession.Title}
                                                                        onChange={(e) => setEditingSession({ ...editingSession, Title: e.target.value })}
                                                                    />
                                                                ) : (
                                                                    <CardTitle className="flex items-center text-gray-700">
                                                                        <FileText className="h-4 w-4 ml-2 text-emerald-600" />
                                                                        {session.Title}
                                                                    </CardTitle>
                                                                )}
                                                                <div>
                                                                    {editingSession?.Id === session.Id ? (
                                                                        <Input
                                                                            type="number"
                                                                            className="py-2 px-4 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-300"
                                                                            value={editingSession.TimeToRead}
                                                                            onChange={(e) => setEditingSession({ ...editingSession, TimeToRead: e.target.value })}
                                                                        />
                                                                    ) : (
                                                                        <p className="flex items-center text-gray-700">
                                                                            <Clock className="h-4 w-4 ml-2 text-emerald-600" />
                                                                            زمان مطالعه :  {session.TimeToRead} دقیقه
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex space-x-2">

                                                            {editingSession?.Id === session.Id ? (
                                                                <>
                                                                    <Button
                                                                        variant="outline"
                                                                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                                                        onClick={() => setEditingSession(null)}
                                                                    >
                                                                        <CrossIcon className="ml-2 h-5 w-5" />
                                                                        انصراف
                                                                    </Button>
                                                                    <Button
                                                                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                                                        onClick={handleUpdateSession}
                                                                    >
                                                                        <CheckIcon className="ml-2 h-5 w-5" />
                                                                        ذخیره
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full"
                                                                        >
                                                                            <EllipsisVertical className="h-5 w-5" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent className="border border-gray-200 shadow-lg rounded-xl py-2">
                                                                        <DropdownMenuItem
                                                                            className="flex items-center px-4 py-2 hover:bg-emerald-50 cursor-pointer"
                                                                            onClick={() => setEditingSession(session)}
                                                                        >
                                                                            <PencilIcon className="ml-2 h-4 w-4 text-gray-600" />
                                                                            ویرایش
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            className="flex items-center px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600"
                                                                            onClick={() => handleDeleteSession(session.Id)}
                                                                        >
                                                                            <TrashIcon className="ml-2 h-4 w-4" />
                                                                            حذف
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            )}
                                                        </div>
                                                    </CardHeader>

                                                    <CardContent className="pt-6">
                                                        {editingSession?.Id === session.Id ? (
                                                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                                                <Editor
                                                                    apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                                                                    value={editingSession.Description}
                                                                    init={{
                                                                        height: 400,
                                                                        menubar: true,
                                                                        plugins: 'code codesample link lists table emoticons image',
                                                                        toolbar:
                                                                            'undo redo | formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table | emoticons | image | code codesample | noteBox warningBox dangerBox infoBox',
                                                                        skin: 'oxide-dark',
                                                                        content_css: 'dark',
                                                                        branding: false,
                                                                        images_upload_url: 'postAcceptor.php',
                                                                        automatic_uploads: true,

                                                                        // ✅ لیست زبان‌های Code Sample
                                                                        codesample_languages: [
                                                                            { text: 'HTML/XML', value: 'markup' },
                                                                            { text: 'JavaScript', value: 'javascript' },
                                                                            { text: 'React (JSX)', value: 'jsx' },
                                                                            { text: 'SQL', value: 'sql' },
                                                                            { text: 'CSS', value: 'css' },
                                                                            { text: 'JSON', value: 'json' },
                                                                            { text: 'Python', value: 'python' },
                                                                            { text: 'Java', value: 'java' },
                                                                            { text: 'C#', value: 'csharp' },
                                                                            { text: 'C++', value: 'cpp' },
                                                                        ],

                                                                        setup: (editor) => {
                                                                            const createBox = (type, text, color) => {
                                                                                editor.insertContent(`
                                                                                <div dir='rtl' class="custom-box ${type}" 
                                                                                    style="border-right: 4px solid ${color}; background-color: ${color}20; padding: 16px; border-radius: 8px; margin: 16px 0;">
                                                                                    <strong>${text}:</strong> این متن را ویرایش کنید.
                                                                                </div>
                                                                            `);
                                                                            };

                                                                            editor.ui.registry.addButton('noteBox', {
                                                                                icon: 'comment',
                                                                                tooltip: 'نکته',
                                                                                onAction: () => createBox('note', 'نکته', '#10B981')
                                                                            });

                                                                            editor.ui.registry.addButton('warningBox', {
                                                                                icon: 'warning',
                                                                                tooltip: 'هشدار',
                                                                                onAction: () => createBox('warning', 'هشدار', '#F59E0B')
                                                                            });

                                                                            editor.ui.registry.addButton('dangerBox', {
                                                                                icon: 'alert',
                                                                                tooltip: 'خطر',
                                                                                onAction: () => createBox('danger', 'خطر', '#EF4444')
                                                                            });

                                                                            editor.ui.registry.addButton('infoBox', {
                                                                                icon: 'info',
                                                                                tooltip: 'اطلاعات',
                                                                                onAction: () => createBox('info', 'اطلاعات', '#3B82F6')
                                                                            });
                                                                        }
                                                                    }}
                                                                    onEditorChange={(content) => setEditingSession({ ...editingSession, Description: content })}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="prose max-w-none p-4 bg-gray-50 rounded-lg"
                                                                dangerouslySetInnerHTML={{ __html: session.Description }}
                                                            />
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                    </ReactSortable>
                                </CardContent>
                            )}
                        </Card>
                    </div>
                ))}
            </ReactSortable>

            {/* Empty State */}
            {chapters.length === 0 && !newChapter && (
                <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="h-12 w-12 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">هنوز سرفصلی اضافه نشده است</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                        برای شروع، اولین سرفصل خود را با کلیک بر روی دکمه "افزودن سرفصل جدید" ایجاد کنید.
                    </p>
                    <Button
                        className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
                        onClick={() => setNewChapter({ Title: '', SortIndex: 1 })}
                    >
                        <PlusIcon className="ml-2" />
                        افزودن اولین سرفصل
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DocumentDetails;