import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import AceEditor from 'react-ace';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchDocs, fetchDocsForDropdown } from '../../features/docs/docsActions';
import { fetchContents, fetchContentsForDropdown } from '../../features/contents/contentsActions';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { toast } from 'react-toastify';
import { createAndUpdateExercise } from '../../features/exercises/exercisesActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Loader2, Plus, ArrowRight, ArrowLeft } from 'lucide-react';

const AddExercise = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [coursesList, setCoursesList] = useState([]);
    const [chaptersList, setChaptersList] = useState([]);
    const [sessionsList, setSessionsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingChapters, setIsFetchingChapters] = useState(false);
    const [isFetchingSessions, setIsFetchingSessions] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [selectedSession, setSelectedSession] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [level, setLevel] = useState(0);
    const [disabled, setDisabled] = useState(0);
    const [sortIndex, setSortIndex] = useState(1);

    const levels = [
        { id: 1, name: 'آسان', color: 'bg-green-100 text-green-800' },
        { id: 2, name: 'متوسط', color: 'bg-yellow-100 text-yellow-800' },
        { id: 3, name: 'دشوار', color: 'bg-orange-100 text-orange-800' },
        { id: 4, name: 'چالش‌برانگیز', color: 'bg-red-100 text-red-800' },
    ];

    // گرفتن دوره‌ها
    useEffect(() => {
        const getCourses = async () => {
            try {
                setIsLoading(true);
                const res = await dispatch(fetchDocsForDropdown());
                setCoursesList(res.payload || []);
            } catch (error) {
                toast.error('خطا در دریافت دوره‌ها');
            } finally {
                setIsLoading(false);
            }
        };
        getCourses();
    }, [dispatch]);

    // گرفتن سرفصل‌ها وقتی دوره انتخاب شد
    useEffect(() => {
        if (!selectedCourse) {
            setChaptersList([]);
            setSessionsList([]);
            setSelectedChapter('');
            setSelectedSession('');
            return;
        }

        const getChapters = async () => {
            try {
                setIsFetchingChapters(true);
                const res = await dispatch(fetchContentsForDropdown({ CourseId: selectedCourse }));
                const contents = res.payload || [];
                setChaptersList(contents.filter(c => c.ParentId === null));
                setSessionsList([]);
                setSelectedChapter('');
                setSelectedSession('');
            } catch (error) {
                toast.error('خطا در دریافت سرفصل‌ها');
            } finally {
                setIsFetchingChapters(false);
            }
        };

        getChapters();
    }, [selectedCourse, dispatch]);

    // گرفتن جلسات وقتی سرفصل انتخاب شد
    useEffect(() => {
        if (!selectedChapter) {
            setSessionsList([]);
            setSelectedSession('');
            return;
        }

        const getSessions = async () => {
            try {
                setIsFetchingSessions(true);
                const res = await dispatch(fetchContentsForDropdown({ ParentId: selectedChapter }));
                const contents = res.payload || [];
                setSessionsList(contents);
                setSelectedSession('');
            } catch (error) {
                toast.error('خطا در دریافت جلسات');
            } finally {
                setIsFetchingSessions(false);
            }
        };

        getSessions();
    }, [selectedChapter, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse || !selectedChapter || !selectedSession || !title || level === null) {
            toast.warning('لطفا همه فیلدهای ضروری را تکمیل کنید');
            return;
        }

        const data = {
            "@Id": 0,
            "@Title": title?.trim() || '',
            "@Description": description?.trim() || '',
            "@Level": level ?? 0,
            "@ContentId": selectedSession || null,
            "@CourseId": selectedCourse || null,
            "@SessionId": selectedChapter || null,
            "@Disabled": disabled ?? 0,
            "@Code": code || '',
            "@SortIndex": sortIndex || 1,
        };

        try {
            setIsLoading(true);
            await dispatch(createAndUpdateExercise(data)).unwrap();
            toast.success('تمرین با موفقیت ایجاد شد');
            navigate('/exercises');
        } catch (error) {
            toast.error(`خطا در ایجاد تمرین: ${error?.message || 'خطای ناشناخته'}`);
            console.error("Error creating exercise:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getSelectedCourseName = () => {
        const course = coursesList.find(c => c.Id === selectedCourse);
        return course ? course.Title : 'انتخاب نشده';
    };

    const getSelectedChapterName = () => {
        const chapter = chaptersList.find(c => c.Id === selectedChapter);
        return chapter ? chapter.Title : 'انتخاب نشده';
    };

    const getSelectedSessionName = () => {
        const session = sessionsList.find(s => s.Id === selectedSession);
        return session ? session.Title : 'انتخاب نشده';
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex items-center mb-6">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/exercises')}
                    className="flex items-center gap-1"
                >
                    <ArrowRight className="h-4 w-4 ml-1" />
                    بازگشت
                </Button>
                <h1 className="text-2xl md:text-3xl font-bold text-center flex-1">ایجاد تمرین جدید</h1>
            </div>

            <Card className="shadow-lg border-0">
                <CardHeader className="bg-slate-50 rounded-t-lg py-4">
                    <CardTitle className="text-xl">مشخصات تمرین</CardTitle>
                    <CardDescription>
                        اطلاعات مربوط به تمرین جدید را در این بخش وارد کنید
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 md:p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* دوره */}
                            <div className="space-y-2">
                                <Label htmlFor="course">دوره *</Label>
                                <Select value={selectedCourse} onValueChange={val => setSelectedCourse(Number(val))}>
                                    <SelectTrigger className="w-full">
                                        {selectedCourse ? (
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="bg-blue-50">
                                                    {coursesList.find(c => c.Id === selectedCourse)?.Title || 'انتخاب نشده'}
                                                </Badge>
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="انتخاب دوره" />
                                        )}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {coursesList.map(c => (
                                            <SelectItem key={c.Id} value={c.Id}>{c.Title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* سرفصل */}
                            <div className="space-y-2">
                                <Label htmlFor="chapter">سرفصل *</Label>
                                <Select
                                    value={selectedChapter}
                                    onValueChange={val => setSelectedChapter(Number(val))}
                                    disabled={!selectedCourse || isFetchingChapters}
                                >
                                    <SelectTrigger className="w-full">
                                        {selectedChapter ? (
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="bg-indigo-50">
                                                    {chaptersList.find(c => c.Id === selectedChapter)?.Title || 'انتخاب نشده'}
                                                </Badge>
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="انتخاب سرفصل" />
                                        )}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {chaptersList.map(ch => (
                                            <SelectItem key={ch.Id} value={ch.Id}>{ch.Title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* جلسه */}
                            <div className="space-y-2">
                                <Label htmlFor="session">جلسه *</Label>
                                <Select
                                    value={selectedSession}
                                    onValueChange={val => setSelectedSession(Number(val))}
                                    disabled={!selectedChapter || isFetchingSessions}
                                >
                                    <SelectTrigger className="w-full">
                                        {selectedSession ? (
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="bg-purple-50">
                                                    {sessionsList.find(s => s.Id === selectedSession)?.Title || 'انتخاب نشده'}
                                                </Badge>
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="انتخاب جلسه" />
                                        )}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sessionsList.map(s => (
                                            <SelectItem key={s.Id} value={s.Id}>{s.Title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">عنوان تمرین *</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="عنوان تمرین را وارد کنید"
                                    className="w-full"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sortIndex">شماره ترتیب</Label>
                                <Input
                                    id="sortIndex"
                                    type="number"
                                    min="1"
                                    value={sortIndex}
                                    onChange={e => setSortIndex(parseInt(e.target.value) || 1)}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">توضیحات تمرین</Label>
                            <Textarea
                                id="description"
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="توضیحات کامل تمرین را اینجا وارد کنید..."
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2" dir="ltr">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="code" className="text-right">کد نمونه (اختیاری)</Label>
                                <Badge variant="outline" className="font-mono text-xs">JavaScript</Badge>
                            </div>
                            <div className="border rounded-md overflow-hidden">
                                <AceEditor
                                    mode="javascript"
                                    theme="monokai"
                                    value={code}
                                    onChange={setCode}
                                    name="code-editor"
                                    editorProps={{ $blockScrolling: true }}
                                    width="100%"
                                    height="200px"
                                    fontSize={14}
                                    setOptions={{
                                        showLineNumbers: true,
                                        tabSize: 2,
                                        showGutter: true,
                                        highlightActiveLine: true
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="level">سطح دشواری</Label>
                                <Select value={level.toString()} onValueChange={val => setLevel(Number(val))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="انتخاب سطح" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {levels.map(l => (
                                            <SelectItem key={l.id} value={l.id.toString()}>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${l.color.split(' ')[0]}`}></div>
                                                    <span>{l.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">وضعیت</Label>
                                <Select value={disabled.toString()} onValueChange={val => setDisabled(Number(val))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="انتخاب وضعیت" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                <span>فعال</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                                <span>غیرفعال</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/exercises')}
                            >
                                انصراف
                            </Button>
                            <Button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        در حال ثبت...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        ثبت تمرین
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddExercise;