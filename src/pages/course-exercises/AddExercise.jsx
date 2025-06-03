import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AceEditor from 'react-ace';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const coursesData = [
    {
        name: 'React مقدماتی',
        chapters: [
            {
                name: 'مبانی ری‌اکت',
                sessions: ['مقدمه', 'کامپوننت‌ها', 'رویدادها', 'مدیریت حالت'],
            },
            {
                name: 'پیشرفته ری‌اکت',
                sessions: ['هوک‌ها', 'مسیردهی', 'عملکرد بهینه'],
            },
        ],
    },
    {
        name: 'NodeJS پیشرفته',
        chapters: [
            {
                name: 'مقدمات نود',
                sessions: ['نصب', 'مدیریت پکیج‌ها', 'کار با فایل‌ها'],
            },
            {
                name: 'وب‌سرور',
                sessions: ['Express', 'Middleware', 'احراز هویت'],
            },
        ],
    },
    // می‌تونی این لیست رو گسترش بدی...
];

const levels = ['آسان', 'متوسط', 'سخت'];

const AddExercise = () => {
    const navigate = useNavigate();

    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [selectedSession, setSelectedSession] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('// کد نمونه اینجا قرار می‌گیرد');
    const [level, setLevel] = useState('');

    // فیلتر فصل‌ها بر اساس دوره انتخاب شده
    const chapters = useMemo(() => {
        if (!selectedCourse) return [];
        const course = coursesData.find((c) => c.name === selectedCourse);
        return course ? course.chapters : [];
    }, [selectedCourse]);

    // فیلتر جلسات بر اساس فصل انتخاب شده
    const sessions = useMemo(() => {
        if (!selectedChapter) return [];
        const chapter = chapters.find((ch) => ch.name === selectedChapter);
        return chapter ? chapter.sessions : [];
    }, [selectedChapter, chapters]);

    // هندلر ثبت فرم
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCourse || !selectedChapter || !selectedSession || !title || !level) {
            alert('لطفا همه موارد را به درستی وارد کنید');
            return;
        }

        const newExercise = {
            id: Date.now(),
            number: 0, // شماره تمرین می‌تونه توسط سرور یا منطق دیگه تعیین بشه
            course: selectedCourse,
            chapter: selectedChapter,
            session: selectedSession,
            title,
            description,
            code,
            level,
            status: 'پیش‌نویس',
        };

        console.log('تمرین جدید:', newExercise);

        // اینجا درخواست API یا ذخیره‌سازی انجام بشه
        // بعدش مثلا برگرد به صفحه لیست تمرین‌ها
        navigate(-1);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">ایجاد تمرین جدید</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-wrap gap-4">
                    <Select
                        value={selectedCourse}
                        onValueChange={(val) => {
                            setSelectedCourse(val);
                            setSelectedChapter('');
                            setSelectedSession('');
                        }}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="انتخاب دوره" />
                        </SelectTrigger>
                        <SelectContent>
                            {coursesData.map((course) => (
                                <SelectItem key={course.name} value={course.name}>
                                    {course.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedChapter}
                        onValueChange={(val) => {
                            setSelectedChapter(val);
                            setSelectedSession('');
                        }}
                        disabled={!selectedCourse}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="انتخاب فصل" />
                        </SelectTrigger>
                        <SelectContent>
                            {chapters.map((chapter) => (
                                <SelectItem key={chapter.name} value={chapter.name}>
                                    {chapter.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedSession}
                        onValueChange={setSelectedSession}
                        disabled={!selectedChapter}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="انتخاب جلسه" />
                        </SelectTrigger>
                        <SelectContent>
                            {sessions.map((session) => (
                                <SelectItem key={session} value={session}>
                                    {session}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">عنوان تمرین</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">توضیحات تمرین</label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="می‌توانید توضیحات یا نکات تمرین را بنویسید"
                    />
                </div>

                <div dir='ltr'>
                    <label className="block mb-1 font-semibold">کد نمونه (اختیاری)</label>
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
                        }}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">سطح تمرین</label>
                    <Select value={level} onValueChange={setLevel}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="انتخاب سطح" />
                        </SelectTrigger>
                        <SelectContent>
                            {levels.map((lvl) => (
                                <SelectItem key={lvl} value={lvl}>
                                    {lvl}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-4">
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                        ثبت تمرین
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddExercise;
