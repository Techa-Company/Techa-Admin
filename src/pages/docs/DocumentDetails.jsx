import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
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

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDocContents,
    // addDocContent,
    // updateDocContent,
    // deleteDocContent
} from '../../features/docs/docsActions';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Cross, CrossIcon, EllipsisVertical, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

const DocumentDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { contents, loading, error } = useSelector((state) => state.docs);
    const [chapters, setChapters] = useState([]);
    const [expandedChapters, setExpandedChapters] = useState({});
    const [editingChapter, setEditingChapter] = useState(null);
    const [editingSession, setEditingSession] = useState(null);
    const [newChapter, setNewChapter] = useState(null);
    const [newSession, setNewSession] = useState(null);

    useEffect(() => {
        dispatch(fetchDocContents({
            "@CourseId": id,
            "@GetAll": true,
        }));
    }, [dispatch, id]);

    useEffect(() => {
        if (contents && contents.length > 0) {
            // Organize data into hierarchical structure
            const chaptersMap = {};
            const sessionsMap = {};

            // Separate chapters and sessions
            contents.forEach(item => {
                if (!item.ParentId) {
                    chaptersMap[item.Id] = { ...item, sessions: [] };
                } else {
                    if (!sessionsMap[item.ParentId]) {
                        sessionsMap[item.ParentId] = [];
                    }
                    sessionsMap[item.ParentId].push(item);
                }
            });

            // Attach sessions to their chapters
            Object.keys(sessionsMap).forEach(parentId => {
                if (chaptersMap[parentId]) {
                    chaptersMap[parentId].sessions = sessionsMap[parentId]
                        .sort((a, b) => a.SortIndex - b.SortIndex);
                }
            });

            // Convert to array and sort
            const organizedChapters = Object.values(chaptersMap)
                .sort((a, b) => a.SortIndex - b.SortIndex);

            setChapters(organizedChapters);

            // Expand first chapter by default
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
        try {
            // await dispatch(addDocContent({
            //     ...newChapter,
            //     CourseId: parseInt(id),
            //     ParentId: null,
            //     Disabled: false,
            //     Price: 0
            // })).unwrap();

            setNewChapter(null);
            toast.success("سرفصل با موفقیت اضافه شد");
        } catch (error) {
            toast.error("خطا در افزودن سرفصل: " + error.message);
        }
    };

    const handleAddSession = async (chapterId) => {
        try {
            // await dispatch(addDocContent({
            //     ...newSession,
            //     CourseId: parseInt(id),
            //     ParentId: chapterId,
            //     Disabled: false,
            //     Price: 0
            // })).unwrap();

            setNewSession(null);
            toast.success("جلسه با موفقیت اضافه شد");
        } catch (error) {
            toast.error("خطا در افزودن جلسه: " + error.message);
        }
    };

    const handleUpdateChapter = async () => {
        try {
            // await dispatch(updateDocContent(editingChapter)).unwrap();
            setEditingChapter(null);
            toast.success("سرفصل با موفقیت به‌روزرسانی شد");
        } catch (error) {
            toast.error("خطا در به‌روزرسانی سرفصل: " + error.message);
        }
    };

    const handleUpdateSession = async () => {
        try {
            // await dispatch(updateDocContent(editingSession)).unwrap();
            setEditingSession(null);
            toast.success("جلسه با موفقیت به‌روزرسانی شد");
        } catch (error) {
            toast.error("خطا در به‌روزرسانی جلسه: " + error.message);
        }
    };

    const handleDeleteChapter = async (chapterId) => {
        if (window.confirm('آیا از حذف این سرفصل و تمام جلسات آن اطمینان دارید؟')) {
            try {
                // await dispatch(deleteDocContent(chapterId)).unwrap();
                toast.success("سرفصل با موفقیت حذف شد");
            } catch (error) {
                toast.error("خطا در حذف سرفصل: " + error.message);
            }
        }
    };

    const handleDeleteSession = async (sessionId) => {
        if (window.confirm('آیا از حذف این جلسه اطمینان دارید؟')) {
            try {
                // await dispatch(deleteDocContent(sessionId)).unwrap();
                toast.success("جلسه با موفقیت حذف شد");
            } catch (error) {
                toast.error("خطا در حذف جلسه: " + error.message);
            }
        }
    };
    // ===================== End CRUD Operations =====================

    if (loading) return <p className="text-center py-8">در حال بارگذاری...</p>;
    if (error) return <p className="text-red-500 text-center py-8">خطا: {error}</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">مدیریت سرفصل‌ها و جلسات</h1>
                <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setNewChapter({ Title: '', SortIndex: 0 })}
                >
                    <PlusIcon className="ml-2" />
                    افزودن سرفصل جدید
                </Button>
            </div>

            {/* New Chapter Form */}
            {newChapter && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>سرفصل جدید</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="chapter-title">عنوان سرفصل</Label>
                                <Input
                                    id="chapter-title"
                                    value={newChapter.Title}
                                    onChange={(e) => setNewChapter({ ...newChapter, Title: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="chapter-sort">ترتیب نمایش</Label>
                                <Input
                                    id="chapter-sort"
                                    type="number"
                                    value={newChapter.SortIndex}
                                    onChange={(e) => setNewChapter({ ...newChapter, SortIndex: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setNewChapter(null)}>
                            <Cross className="ml-2" />
                            انصراف
                        </Button>
                        <Button className="bg-emerald-600" onClick={handleAddChapter}>
                            <CheckIcon className="ml-2" />
                            ذخیره سرفصل
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {/* Chapters List */}
            <div className="space-y-4">
                {chapters.map((chapter) => (
                    <Card key={chapter.Id}>
                        <CardHeader className="flex-row justify-between items-center cursor-pointer"
                            onClick={() => toggleChapter(chapter.Id)}>
                            <div className="flex items-center">
                                {expandedChapters[chapter.Id] ?
                                    <ChevronUpIcon className="ml-2" /> :
                                    <ChevronDownIcon className="ml-2" />
                                }
                                {editingChapter?.Id === chapter.Id ? (
                                    <Input
                                        className="ml-2"
                                        value={editingChapter.Title}
                                        onChange={(e) => setEditingChapter({ ...editingChapter, Title: e.target.value })}
                                    />
                                ) : (
                                    <CardTitle>{chapter.Title}</CardTitle>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                {editingChapter?.Id === chapter.Id ? (
                                    <>
                                        <Button variant="outline" onClick={() => setEditingChapter(null)}>
                                            <CrossIcon className="ml-2" />
                                            انصراف
                                        </Button>
                                        <Button className="bg-green-600" onClick={handleUpdateChapter}>
                                            <CheckIcon className="ml-2" />
                                            ذخیره
                                        </Button>
                                    </>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <EllipsisVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setEditingChapter(chapter)}>
                                                <PencilIcon className="ml-2" />
                                                ویرایش
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteChapter(chapter.Id)}>
                                                <TrashIcon className="ml-2" />
                                                حذف
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setNewSession({
                                                Title: '',
                                                SortIndex: 0,
                                                Description: '',
                                                ParentId: chapter.Id
                                            })}>
                                                <PlusIcon className="ml-2" />
                                                افزودن جلسه
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </CardHeader>

                        {expandedChapters[chapter.Id] && (
                            <CardContent>
                                {/* New Session Form */}
                                {newSession?.ParentId === chapter.Id && (
                                    <Card className="mb-6 bg-blue-50">
                                        <CardHeader>
                                            <CardTitle>جلسه جدید</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Label htmlFor="session-title">عنوان جلسه</Label>
                                                    <Input
                                                        id="session-title"
                                                        value={newSession.Title}
                                                        onChange={(e) => setNewSession({ ...newSession, Title: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="session-sort">ترتیب نمایش</Label>
                                                    <Input
                                                        id="session-sort"
                                                        type="number"
                                                        value={newSession.SortIndex}
                                                        onChange={(e) => setNewSession({ ...newSession, SortIndex: parseInt(e.target.value) || 0 })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="session-content">محتوای جلسه</Label>
                                                <Editor
                                                    apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                                                    value={newSession.Description}
                                                    init={{
                                                        height: 400,
                                                        menubar: true,
                                                        plugins: 'code codesample link lists table',
                                                        toolbar:
                                                            'undo redo | formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table | noteBox warningBox dangerBox infoBox | code',
                                                        setup: (editor) => {
                                                            const createBox = (type, text, color) => {
                                                                editor.insertContent(`
          <div style="border-left: 4px solid ${color}; background-color: ${color}20; padding: 10px; border-radius: 5px; margin: 10px 0;">
            <strong>${text}:</strong> این متن را ویرایش کن.
          </div>
          <p><br></p>
        `);
                                                            };

                                                            editor.ui.registry.addButton('noteBox', {
                                                                icon: 'comment',
                                                                tooltip: 'نکته',
                                                                onAction: () => createBox('note', 'نکته', '#4CAF50')
                                                            });

                                                            editor.ui.registry.addButton('warningBox', {
                                                                icon: 'warning',
                                                                tooltip: 'هشدار',
                                                                onAction: () => createBox('warning', 'هشدار', '#FFC107')
                                                            });

                                                            editor.ui.registry.addButton('dangerBox', {
                                                                icon: 'alert',
                                                                tooltip: 'خطر',
                                                                onAction: () => createBox('danger', 'خطر', '#F44336')
                                                            });

                                                            editor.ui.registry.addButton('infoBox', {
                                                                icon: 'info',
                                                                tooltip: 'اطلاعات',
                                                                onAction: () => createBox('info', 'اطلاعات', '#2196F3')
                                                            });
                                                        }
                                                    }}
                                                    onEditorChange={(content) => setNewSession({ ...newSession, Description: content })}
                                                />
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-end space-x-2">
                                            <Button variant="outline" onClick={() => setNewSession(null)}>
                                                <CrossIcon className="ml-2" />
                                                انصراف
                                            </Button>
                                            <Button
                                                className="bg-blue-600"
                                                onClick={() => handleAddSession(chapter.Id)}
                                            >
                                                <CheckIcon className="ml-2" />
                                                ذخیره جلسه
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )}

                                {/* Sessions List */}
                                <div className="space-y-4">
                                    {chapter.sessions.map((session) => (
                                        <Card key={session.Id}>
                                            <CardHeader className="flex-row justify-between items-center">
                                                {editingSession?.Id === session.Id ? (
                                                    <Input
                                                        value={editingSession.Title}
                                                        onChange={(e) => setEditingSession({ ...editingSession, Title: e.target.value })}
                                                    />
                                                ) : (
                                                    <CardTitle>{session.Title}</CardTitle>
                                                )}

                                                <div className="flex space-x-2">
                                                    {editingSession?.Id === session.Id ? (
                                                        <>
                                                            <Button variant="outline" onClick={() => setEditingSession(null)}>
                                                                <CrossIcon className="ml-2" />
                                                                انصراف
                                                            </Button>
                                                            <Button className="bg-green-600" onClick={handleUpdateSession}>
                                                                <CheckIcon className="ml-2" />
                                                                ذخیره
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <EllipsisVertical />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuItem onClick={() => setEditingSession(session)}>
                                                                    <PencilIcon className="ml-2" />
                                                                    ویرایش
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleDeleteSession(session.Id)}>
                                                                    <TrashIcon className="ml-2" />
                                                                    حذف
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </div>
                                            </CardHeader>

                                            <CardContent>
                                                {editingSession?.Id === session.Id ? (
                                                    <Editor
                                                        apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                                                        value={editingSession.Description}
                                                        init={{
                                                            height: 400,
                                                            menubar: true,
                                                            plugins: 'code codesample link lists table',
                                                            toolbar:
                                                                'undo redo | formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table | noteBox warningBox dangerBox infoBox | code',
                                                            setup: (editor) => {
                                                                const createBox = (type, text, color) => {
                                                                    editor.insertContent(`
          <div style="border-left: 4px solid ${color}; background-color: ${color}20; padding: 10px; border-radius: 5px; margin: 10px 0;">
            <strong>${text}:</strong> این متن را ویرایش کن.
          </div>
          <p><br></p>
        `);
                                                                };

                                                                editor.ui.registry.addButton('noteBox', {
                                                                    icon: 'comment',
                                                                    tooltip: 'نکته',
                                                                    onAction: () => createBox('note', 'نکته', '#4CAF50')
                                                                });

                                                                editor.ui.registry.addButton('warningBox', {
                                                                    icon: 'warning',
                                                                    tooltip: 'هشدار',
                                                                    onAction: () => createBox('warning', 'هشدار', '#FFC107')
                                                                });

                                                                editor.ui.registry.addButton('dangerBox', {
                                                                    icon: 'alert',
                                                                    tooltip: 'خطر',
                                                                    onAction: () => createBox('danger', 'خطر', '#F44336')
                                                                });

                                                                editor.ui.registry.addButton('infoBox', {
                                                                    icon: 'info',
                                                                    tooltip: 'اطلاعات',
                                                                    onAction: () => createBox('info', 'اطلاعات', '#2196F3')
                                                                });
                                                            }
                                                        }}
                                                        onEditorChange={(content) => setEditingSession({ ...editingSession, Description: content })}
                                                    />
                                                ) : (
                                                    <div
                                                        className="prose max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: session.Description }}
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DocumentDetails;