import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Loader2, Plus, ArrowRight, Code, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import AceEditor from 'react-ace';
import { Editor } from '@tinymce/tinymce-react';
import { createAndUpdateExercise } from '../../features/exercises/exercisesActions';
import { fetchContentsForDropdown } from '../../features/contents/contentsActions';
import { fetchDocsForDropdown } from '../../features/docs/docsActions';

// Import Ace Editor modes and themes
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';

const AddExercise = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [coursesList, setCoursesList] = useState([]);
    const [chaptersList, setChaptersList] = useState([]);
    const [sessionsList, setSessionsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingChapters, setIsFetchingChapters] = useState(false);
    const [isFetchingSessions, setIsFetchingSessions] = useState(false);

    const [formData, setFormData] = useState({
        courseId: '',
        chapterId: '',
        sessionId: '',
        title: '',
        description: '',
        code: ``,
        level: '1',
        disabled: false,
        sortIndex: 1,
        language: 'javascript'
    });

    const levels = [
        { id: '1', name: 'آسان', color: 'bg-green-100 text-green-800 border-green-200' },
        { id: '2', name: 'متوسط', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        { id: '3', name: 'دشوار', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        { id: '4', name: 'چالش‌برانگیز', color: 'bg-red-100 text-red-800 border-red-200' },
    ];

    const languages = [
        { id: 'javascript', name: 'JavaScript' },
        { id: 'html', name: 'HTML' },
        { id: 'css', name: 'CSS' },
        { id: 'python', name: 'Python' },
    ];

    const editorThemes = [
        { id: 'monokai', name: 'Monokai' },
        { id: 'github', name: 'GitHub' },
        { id: 'chrome', name: 'Chrome' },
        { id: 'tomorrow_night', name: 'Dark' },
    ];

    const [currentTheme, setCurrentTheme] = useState('monokai');

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
        if (!formData.courseId) {
            setChaptersList([]);
            setSessionsList([]);
            setFormData(prev => ({ ...prev, chapterId: '', sessionId: '' }));
            return;
        }

        const getChapters = async () => {
            try {
                setIsFetchingChapters(true);
                const res = await dispatch(fetchContentsForDropdown({ CourseId: formData.courseId }));
                const contents = res.payload || [];
                setChaptersList(contents.filter(c => c.ParentId === null));
                setSessionsList([]);
                setFormData(prev => ({ ...prev, chapterId: '', sessionId: '' }));
            } catch (error) {
                toast.error('خطا در دریافت سرفصل‌ها');
            } finally {
                setIsFetchingChapters(false);
            }
        };

        getChapters();
    }, [formData.courseId, dispatch]);

    // گرفتن جلسات وقتی سرفصل انتخاب شد
    useEffect(() => {
        if (!formData.chapterId) {
            setSessionsList([]);
            setFormData(prev => ({ ...prev, sessionId: '' }));
            return;
        }

        const getSessions = async () => {
            try {
                setIsFetchingSessions(true);
                const res = await dispatch(fetchContentsForDropdown({ ParentId: formData.chapterId }));
                const contents = res.payload || [];
                setSessionsList(contents);
                setFormData(prev => ({ ...prev, sessionId: '' }));
            } catch (error) {
                toast.error('خطا در دریافت جلسات');
            } finally {
                setIsFetchingSessions(false);
            }
        };

        getSessions();
    }, [formData.chapterId, dispatch]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { courseId, chapterId, sessionId, title, level } = formData;

        if (!courseId || !chapterId || !sessionId || !title || !level) {
            toast.warning('لطفا همه فیلدهای ضروری را تکمیل کنید');
            return;
        }

        const data = {
            "@Id": 0,
            "@Title": formData.title?.trim() || '',
            "@Description": formData.description?.trim() || '',
            "@Level": parseInt(formData.level) || 0,
            "@ContentId": formData.sessionId || null,
            "@CourseId": formData.courseId || null,
            "@SessionId": formData.chapterId || null,
            "@Disabled": formData.disabled ? 1 : 0,
            "@Code": formData.code || '',
            "@Solution": formData.solution || '',
            "@SortIndex": formData.sortIndex || 1,
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

    const aceEditorOptions = {
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        showGutter: true,
        highlightActiveLine: true,
        wrap: true,
        fontSize: 14,
        showPrintMargin: false,
        useWorker: true
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/exercises')}
                        className="flex items-center gap-1"
                    >
                        <ArrowRight className="h-4 w-4 ml-1" />
                        بازگشت به لیست تمرین‌ها
                    </Button>
                    <h1 className="text-2xl md:text-3xl font-bold">ایجاد تمرین جدید</h1>
                </div>
                <Badge variant="outline" className="px-3 py-1">
                    <Code className="h-3 w-3 ml-1" />
                    {languages.find(l => l.id === formData.language)?.name || 'JavaScript'}
                </Badge>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-8">
                {/* بخش انتخاب دوره و سرفصل */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        اطلاعات درس
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* دوره */}
                        <div className="space-y-2">
                            <Label htmlFor="course" className="text-sm font-medium">
                                دوره <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.courseId}
                                onValueChange={(val) => handleChange('courseId', val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="انتخاب دوره" />
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
                            <Label htmlFor="chapter" className="text-sm font-medium">
                                سرفصل <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.chapterId}
                                onValueChange={(val) => handleChange('chapterId', val)}
                                disabled={!formData.courseId || isFetchingChapters}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="انتخاب سرفصل" />
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
                            <Label htmlFor="session" className="text-sm font-medium">
                                جلسه <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.sessionId}
                                onValueChange={(val) => handleChange('sessionId', val)}
                                disabled={!formData.chapterId || isFetchingSessions}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="انتخاب جلسه" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sessionsList.map(s => (
                                        <SelectItem key={s.Id} value={s.Id}>{s.Title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* بخش اطلاعات تمرین */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-700">مشخصات تمرین</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">
                                عنوان تمرین <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="عنوان تمرین را وارد کنید"
                                className="w-full"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sortIndex" className="text-sm font-medium">
                                    شماره ترتیب
                                </Label>
                                <Input
                                    id="sortIndex"
                                    type="number"
                                    min="1"
                                    value={formData.sortIndex}
                                    onChange={(e) => handleChange('sortIndex', parseInt(e.target.value) || 1)}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="language" className="text-sm font-medium">
                                    زبان برنامه‌نویسی
                                </Label>
                                <Select
                                    value={formData.language}
                                    onValueChange={(val) => handleChange('language', val)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="انتخاب زبان" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map(lang => (
                                            <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            توضیحات تمرین
                        </Label>
                        <div className="border rounded-md overflow-hidden">
                            <Editor
                                apiKey="v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j"
                                value={formData.description}
                                onEditorChange={(content) => handleChange('description', content)}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount directionality'
                                    ],
                                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help | rtl',
                                    directionality: 'rtl',
                                    language: 'fa',
                                    content_style: 'body { font-family: "Vazirmatn", sans-serif; font-size: 14px; }'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* بخش کد و راه‌حل */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <Code className="h-5 w-5" />
                            کد تمرین
                        </h2>
                        <div className="flex items-center gap-2">
                            <Label className="text-sm text-slate-600">تم ادیتور:</Label>
                            <Select value={currentTheme} onValueChange={setCurrentTheme}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {editorThemes.map(theme => (
                                        <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Tabs defaultValue="code" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="code" className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                کد نمونه
                            </TabsTrigger>
                            <TabsTrigger value="solution" className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                راه‌حل
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="code" className="space-y-2">
                            <Label className="text-sm font-medium">کد اولیه برای دانشجو</Label>
                            <div className="border border-slate-200 rounded-md overflow-hidden" dir="ltr">
                                <AceEditor
                                    mode={formData.language}
                                    theme={currentTheme}
                                    value={formData.code}
                                    onChange={(value) => handleChange('code', value)}
                                    name="code-editor"
                                    editorProps={{ $blockScrolling: true }}
                                    width="100%"
                                    height="300px"
                                    setOptions={aceEditorOptions}
                                    fontSize={14}
                                    showPrintMargin={false}
                                    className="rounded-md"
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="solution" className="space-y-2">
                            <Label className="text-sm font-medium">راه‌حل کامل تمرین</Label>
                            <div className="border border-slate-200 rounded-md overflow-hidden" dir="ltr">
                                <AceEditor
                                    mode={formData.language}
                                    theme={currentTheme}
                                    value={formData.solution}
                                    onChange={(value) => handleChange('solution', value)}
                                    name="solution-editor"
                                    editorProps={{ $blockScrolling: true }}
                                    width="100%"
                                    height="300px"
                                    setOptions={aceEditorOptions}
                                    fontSize={14}
                                    showPrintMargin={false}
                                    className="rounded-md"
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* بخش تنظیمات */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-700">تنظیمات</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="level" className="text-sm font-medium">
                                سطح دشواری
                            </Label>
                            <Select
                                value={formData.level}
                                onValueChange={(val) => handleChange('level', val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="انتخاب سطح" />
                                </SelectTrigger>
                                <SelectContent>
                                    {levels.map(l => (
                                        <SelectItem key={l.id} value={l.id}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${l.color.split(' ')[0]}`}></div>
                                                <span>{l.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-md">
                            <div className="space-y-1">
                                <Label htmlFor="status" className="text-sm font-medium cursor-pointer">
                                    وضعیت انتشار
                                </Label>
                                <p className="text-xs text-slate-500">
                                    {formData.disabled ? 'تمرین غیرفعال خواهد شد' : 'تمرین فعال خواهد شد'}
                                </p>
                            </div>
                            <Switch
                                id="status"
                                checked={!formData.disabled}
                                onCheckedChange={(checked) => handleChange('disabled', !checked)}
                                className="data-[state=checked]:bg-emerald-600"
                            />
                        </div>
                    </div>
                </div>

                {/* دکمه‌های عملیاتی */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/exercises')}
                        className="px-6"
                    >
                        انصراف
                    </Button>
                    <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 px-8"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                در حال ایجاد...
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                ایجاد تمرین
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddExercise;