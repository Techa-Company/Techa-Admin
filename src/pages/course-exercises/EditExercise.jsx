import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import AceEditor from 'react-ace';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDocs, fetchDocsForDropdown } from '../../features/docs/docsActions';
import { fetchContents, fetchContentsForDropdown } from '../../features/contents/contentsActions';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { toast } from 'react-toastify';
import { createAndUpdateExercise, fetchExerciseById } from '../../features/exercises/exercisesActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Loader2, ArrowRight, Save } from 'lucide-react';

const EditExercise = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { singleExercise, loading } = useSelector(state => state.exercises);

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
    const [level, setLevel] = useState('0');
    const [disabled, setDisabled] = useState('0');
    const [sortIndex, setSortIndex] = useState(1);

    const levels = [
        { id: 1, name: 'آسان', color: 'bg-green-100 text-green-800' },
        { id: 2, name: 'متوسط', color: 'bg-yellow-100 text-yellow-800' },
        { id: 3, name: 'دشوار', color: 'bg-orange-100 text-orange-800' },
        { id: 4, name: 'چالش‌برانگیز', color: 'bg-red-100 text-red-800' },
    ];

    // گرفتن اطلاعات تمرین
    useEffect(() => {
        if (id) {
            dispatch(fetchExerciseById({ "@Id": id }));
        }
    }, [id, dispatch]);

    // پر کردن فرم در حالت ویرایش
    useEffect(() => {
        if (singleExercise) {
            setTitle(singleExercise.Title || '');
            setDescription(singleExercise.Description || '');
            setCode(singleExercise.Code || '');
            setLevel(singleExercise.Level?.toString() || '0');
            setDisabled(singleExercise.Disabled?.toString() || '0');
            setSortIndex(singleExercise.SortIndex || 1);
            setSelectedCourse(singleExercise.CourseId?.toString() || '');
            setSelectedChapter(singleExercise.SessionId?.toString() || '');
            setSelectedSession(singleExercise.ContentId?.toString() || '');
        }
    }, [singleExercise]);

    // گرفتن دوره‌ها
    useEffect(() => {
        const getCourses = async () => {
            try {
                setIsLoading(true);
                const res = await dispatch(fetchDocsForDropdown());
                setCoursesList(res.payload || []);
            } catch {
                toast.error('خطا در دریافت دوره‌ها');
            } finally {
                setIsLoading(false);
            }
        };
        getCourses();
    }, [dispatch]);

    // گرفتن سرفصل‌ها
    useEffect(() => {
        if (!selectedCourse) {
            if (!singleExercise) {
                setChaptersList([]);
                setSessionsList([]);
                setSelectedChapter('');
                setSelectedSession('');
            }
            return;
        }

        const getChapters = async () => {
            try {
                setIsFetchingChapters(true);
                const res = await dispatch(fetchContentsForDropdown({ CourseId: Number(selectedCourse) }));
                const contents = res.payload || [];
                setChaptersList(contents.filter(c => c.ParentId === null));
            } catch {
                toast.error('خطا در دریافت سرفصل‌ها');
            } finally {
                setIsFetchingChapters(false);
            }
        };
        getChapters();
    }, [selectedCourse, dispatch, singleExercise]);

    // گرفتن جلسات
    useEffect(() => {
        if (!selectedChapter) {
            if (!singleExercise) {
                setSessionsList([]);
                setSelectedSession('');
            }
            return;
        }

        const getSessions = async () => {
            try {
                setIsFetchingSessions(true);
                const res = await dispatch(fetchContentsForDropdown({ ParentId: Number(selectedChapter) }));
                setSessionsList(res.payload || []);
            } catch {
                toast.error('خطا در دریافت جلسات');
            } finally {
                setIsFetchingSessions(false);
            }
        };
        getSessions();
    }, [selectedChapter, dispatch, singleExercise]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse || !selectedChapter || !selectedSession || !title) {
            toast.warning('لطفا همه فیلدهای ضروری را تکمیل کنید');
            return;
        }

        const data = {
            "@Id": Number(id) || 0,
            "@Title": title.trim(),
            "@Description": description.trim(),
            "@Level": Number(level),
            "@ContentId": Number(selectedSession),
            "@CourseId": Number(selectedCourse),
            "@SessionId": Number(selectedChapter),
            "@Disabled": Number(disabled),
            "@Code": code || '',
            "@SortIndex": Number(sortIndex) || 1,
        };

        try {
            setIsLoading(true);
            await dispatch(createAndUpdateExercise(data)).unwrap();
            toast.success('تمرین با موفقیت ذخیره شد');
            navigate('/exercises');
        } catch (error) {
            toast.error(`خطا در ذخیره تمرین: ${error?.message || 'خطای ناشناخته'}`);
            console.error("Error saving exercise:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="mr-2">در حال بارگذاری...</span>
            </div>
        );
    }

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
                <h1 className="text-2xl md:text-3xl font-bold text-center flex-1">
                    {id ? 'ویرایش تمرین' : 'ایجاد تمرین جدید'}
                </h1>
            </div>

            <Card className="shadow-lg border-0">
                <CardHeader className="bg-slate-50 rounded-t-lg py-4">
                    <CardTitle className="text-xl">مشخصات تمرین</CardTitle>
                    <CardDescription>
                        اطلاعات مربوط به تمرین را تکمیل کنید
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-5 md:p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Selects */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* دوره */}
                            <div className="space-y-2">
                                <Label htmlFor="course">دوره *</Label>
                                <Select value={selectedCourse} onValueChange={val => setSelectedCourse(val)}>
                                    <SelectTrigger className="w-full">
                                        {selectedCourse ? (
                                            <Badge variant="outline" className="bg-blue-50">
                                                {coursesList.find(c => c.Id === Number(selectedCourse))?.Title || 'انتخاب نشده'}
                                            </Badge>
                                        ) : <SelectValue placeholder="انتخاب دوره" />}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {coursesList.map(c => (
                                            <SelectItem key={c.Id} value={c.Id.toString()}>{c.Title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* سرفصل */}
                            <div className="space-y-2">
                                <Label htmlFor="chapter">سرفصل *</Label>
                                <Select
                                    value={selectedChapter}
                                    onValueChange={val => setSelectedChapter(val)}
                                    disabled={!selectedCourse || isFetchingChapters}
                                >
                                    <SelectTrigger className="w-full">
                                        {isFetchingChapters ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : selectedChapter ? (
                                            <Badge variant="outline" className="bg-indigo-50">
                                                {chaptersList.find(c => c.Id === Number(selectedChapter))?.Title || 'انتخاب نشده'}
                                            </Badge>
                                        ) : <SelectValue placeholder="انتخاب سرفصل" />}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {chaptersList.map(ch => (
                                            <SelectItem key={ch.Id} value={ch.Id.toString()}>{ch.Title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* جلسه */}
                            <div className="space-y-2">
                                <Label htmlFor="session">جلسه *</Label>
                                <Select
                                    value={selectedSession}
                                    onValueChange={val => setSelectedSession(val)}
                                    disabled={!selectedChapter || isFetchingSessions}
                                >
                                    <SelectTrigger className="w-full">
                                        {isFetchingSessions ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : selectedSession ? (
                                            <Badge variant="outline" className="bg-purple-50">
                                                {sessionsList.find(s => s.Id === Number(selectedSession))?.Title || 'انتخاب نشده'}
                                            </Badge>
                                        ) : <SelectValue placeholder="انتخاب جلسه" />}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sessionsList.map(s => (
                                            <SelectItem key={s.Id} value={s.Id.toString()}>{s.Title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* سایر فیلدها */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">عنوان تمرین *</Label>
                                <Input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sortIndex">شماره ترتیب</Label>
                                <Input id="sortIndex" type="number" min="1" value={sortIndex}
                                    onChange={e => setSortIndex(Number(e.target.value) || 1)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">توضیحات تمرین</Label>
                            <Textarea id="description" rows={4} value={description}
                                onChange={e => setDescription(e.target.value)} />
                        </div>

                        {/* Code Editor */}
                        <div className="space-y-2" dir="ltr">
                            <Label htmlFor="code">کد نمونه (اختیاری)</Label>
                            <AceEditor
                                mode="javascript"
                                theme="monokai"
                                value={code}
                                onChange={setCode}
                                name="code-editor"
                                width="100%"
                                height="200px"
                                fontSize={14}
                                setOptions={{ showLineNumbers: true, tabSize: 2, highlightActiveLine: true }}
                            />
                        </div>

                        {/* سطح و وضعیت */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="level">سطح دشواری</Label>
                                <Select value={level} onValueChange={val => setLevel(val)}>
                                    <SelectTrigger><SelectValue placeholder="انتخاب سطح" /></SelectTrigger>
                                    <SelectContent>
                                        {levels.map(l => (
                                            <SelectItem key={l.id} value={l.id.toString()}>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${l.color.split(' ')[0]}`} />
                                                    <span>{l.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">وضعیت</Label>
                                <Select value={disabled} onValueChange={val => setDisabled(val)}>
                                    <SelectTrigger><SelectValue placeholder="انتخاب وضعیت" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                                <span>فعال</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-gray-400" />
                                                <span>غیرفعال</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* دکمه‌ها */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={() => navigate('/exercises')}>انصراف</Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1" disabled={isLoading}>
                                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> در حال ذخیره...</> :
                                    <><Save className="h-4 w-4" /> ذخیره تغییرات</>}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditExercise;
