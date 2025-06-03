import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const exercises = [
    // ... داده‌ها مثل قبل
];

const coursesData = [
    ...exercises.map((ex) => ({
        course: ex.course,
        chapter: ex.chapter,
        session: ex.session,
    })),
];

// ادیتور با React Ace
const Editor = ({ value, onChange }) => (
    <AceEditor
        mode="javascript"
        theme="github"
        onChange={onChange}
        value={value}
        name="code_editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="200px"
        setOptions={{
            fontSize: 14,
            showLineNumbers: true,
            tabSize: 2,
        }}
    />
);

const EditExercise = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const exercise = exercises.find((e) => e.id === Number(id));

    const [course, setCourse] = useState(exercise?.course || "");
    const [chapter, setChapter] = useState(exercise?.chapter || "");
    const [session, setSession] = useState(exercise?.session || "");
    const [number, setNumber] = useState(exercise?.number || "");
    const [title, setTitle] = useState(exercise?.title || "");
    const [description, setDescription] = useState(exercise?.description || "");
    const [code, setCode] = useState(exercise?.code || "");
    const [level, setLevel] = useState(exercise?.level || "آسان");

    const courseList = useMemo(
        () => [...new Set(coursesData.map((c) => c.course))],
        []
    );
    const chapterList = useMemo(
        () =>
            course
                ? [
                    ...new Set(
                        coursesData
                            .filter((c) => c.course === course)
                            .map((c) => c.chapter)
                    ),
                ]
                : [],
        [course]
    );
    const sessionList = useMemo(
        () =>
            chapter
                ? [
                    ...new Set(
                        coursesData
                            .filter((c) => c.chapter === chapter)
                            .map((c) => c.session)
                    ),
                ]
                : [],
        [chapter]
    );

    const [errors, setErrors] = useState({});

    if (!exercise) return <div className="p-4">تمرین پیدا نشد</div>;

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!course) newErrors.course = "لطفا دوره را انتخاب کنید.";
        if (!chapter) newErrors.chapter = "لطفا فصل را انتخاب کنید.";
        if (!session) newErrors.session = "لطفا جلسه را انتخاب کنید.";
        if (!number) newErrors.number = "شماره تمرین را وارد کنید.";
        if (!title) newErrors.title = "عنوان تمرین را وارد کنید.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        console.log({
            id,
            course,
            chapter,
            session,
            number,
            title,
            description,
            code,
            level,
        });
        alert("تمرین با موفقیت ویرایش شد!");
        navigate(-1);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">ویرایش تمرین</h1>

            <label className="block mb-2">دوره</label>
            <Select
                value={course}
                onValueChange={(val) => {
                    setCourse(val);
                    setChapter("");
                    setSession("");
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب دوره" />
                </SelectTrigger>
                <SelectContent>
                    {courseList.map((c) => (
                        <SelectItem key={c} value={c}>
                            {c}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors.course && (
                <p className="text-red-600 text-sm mt-1">{errors.course}</p>
            )}

            <label className="block mt-4 mb-2">فصل</label>
            <Select
                value={chapter}
                disabled={!course}
                onValueChange={(val) => {
                    setChapter(val);
                    setSession("");
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب فصل" />
                </SelectTrigger>
                <SelectContent>
                    {chapterList.map((ch) => (
                        <SelectItem key={ch} value={ch}>
                            {ch}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors.chapter && (
                <p className="text-red-600 text-sm mt-1">{errors.chapter}</p>
            )}

            <label className="block mt-4 mb-2">جلسه</label>
            <Select
                value={session}
                disabled={!chapter}
                onValueChange={(val) => setSession(val)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب جلسه" />
                </SelectTrigger>
                <SelectContent>
                    {sessionList.map((se) => (
                        <SelectItem key={se} value={se}>
                            {se}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors.session && (
                <p className="text-red-600 text-sm mt-1">{errors.session}</p>
            )}

            <label className="block mt-4 mb-2">شماره تمرین</label>
            <Input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
            />
            {errors.number && (
                <p className="text-red-600 text-sm mt-1">{errors.number}</p>
            )}

            <label className="block mt-4 mb-2">عنوان تمرین</label>
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}

            <label className="block mt-4 mb-2">توضیحات</label>
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
            />

            <label className="block mt-4 mb-2">کد (در صورت وجود)</label>
            <Editor value={code} onChange={setCode} />

            <label className="block mt-4 mb-2">سطح</label>
            <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب سطح" />
                </SelectTrigger>
                <SelectContent>
                    {["آسان", "متوسط", "سخت"].map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                            {lvl}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="mt-6 flex justify-end gap-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                    انصراف
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    ذخیره تغییرات
                </Button>
            </div>
        </form>
    );
};

export default EditExercise;
