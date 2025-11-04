import React, { useEffect, useState } from "react";
import { Check, BookOpen, Circle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { fetchExercises, sendExercise } from "../../features/exercises/exercisesActions";
import { useDispatch, useSelector } from "react-redux";

const SubmittedExerciseDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { exercises, loading } = useSelector(state => state.exercises);

    const [exercise, setExercise] = useState(null);
    const [score, setScore] = useState("");
    const [feedback, setFeedback] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchExercises({ "@Id": params.id }));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (exercises && exercises.length > 0) {
            const ex = exercises.find(e => e.Id === parseInt(params.id));
            setExercise(ex);
            setScore(ex?.UserScore ?? "");
            setFeedback(ex?.UserFeedback ?? "");
        }
    }, [exercises, params.id]);

    const handleSubmit = async () => {
        if (!exercise) return;
        setSubmitting(true);

        // تعیین وضعیت بر اساس نمره
        let status = 1; // پیش‌فرض
        if (score !== "") {
            const numScore = parseFloat(score);
            if (numScore < 70) status = 3;
            else if (numScore >= 70 && numScore <= 100) status = 2;
        }

        const data = {
            "@Id": exercise.UserExerciseProgId.toString(),
            "@UserId": "5",
            "@ExerciseId": exercise.Id,
            "@Score": score || 0,
            "@Feedback": feedback || "",
            "@Status": status.toString()
        };

        console.log(data)

        try {

            console.log("hel")
            await dispatch(sendExercise(data)).unwrap();
            toast.success("تمرین با موفقیت ذخیره شد");
            setSubmitting(false);

            dispatch(fetchExercises());
            // بازگشت به صفحه لیست تمرین‌ها
            navigate("/submitted-exercises");

        } catch (error) {
            console.log("Error sending exercise:", error);
            toast.error("خطا در ذخیره تمرین: " + (error?.message || "خطای ناشناخته"));
            setSubmitting(false);
        }
    };

    const renderStatusIcon = (status) => {
        switch (status) {
            case 2: return <Check className="text-green-500 w-6 h-6" />;
            case 1: return <BookOpen className="text-yellow-500 w-6 h-6" />;
            case 3: return <Circle className="text-red-500 w-6 h-6" />;
            default: return <Circle className="text-gray-400 w-6 h-6" strokeWidth={2} />;
        }
    };

    if (loading || !exercise) {
        return <p className="text-center mt-10">در حال بارگذاری...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">

            {/* اطلاعات تمرین */}
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">{exercise.Title}</h2>
                <p className="text-gray-600">{exercise.Description || "بدون توضیحات"}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span>دوره: {exercise.CourseTitle}</span>
                    <span>فصل: {exercise.SessionTitle}</span>
                    <span>جلسه: {exercise.ChapterTitle}</span>
                    <span>سطح: {["آسان", "متوسط", "دشوار", "چالش‌برانگیز"][exercise.Level]}</span>
                    <span>وضعیت: {exercise.Disabled ? "غیرفعال" : "فعال"}</span>
                </div>
            </div>

            {/* اطلاعات کاربر */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">اطلاعات کاربر</h3>
                <div className="flex items-center gap-2">
                    <span>وضعیت تمرین:</span>
                    {renderStatusIcon(exercise.UserStatus)}
                </div>
                <div>
                    <span className="font-medium">پاسخ کاربر:</span>
                    <p className="bg-gray-100 p-2 rounded mt-1">{exercise.UserAnswer || "پاسخی ثبت نشده"}</p>
                </div>
            </div>

            {/* ثبت نمره و فیدبک */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">ثبت نمره و فیدبک</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="نمره"
                        className="border p-2 rounded w-full md:w-32"
                    />
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="فیدبک به کاربر"
                        className="border p-2 rounded w-full md:flex-1"
                    />
                </div>
                <Button disabled={submitting} className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}>
                    {submitting ? "در حال ذخیره..." : "ذخیره"}
                </Button>
            </div>
        </div>
    );
};

export default SubmittedExerciseDetail;
