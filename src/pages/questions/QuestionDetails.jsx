import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionById, changeQuestionStatus } from '../../features/questions/questionsActions';
import {
    ArrowRight,
    User,
    CheckCircle2,
    MessageSquare,
    BookOpen,
    ShieldCheck,
    ShieldAlert,
    Clock,
    PlayCircle,
    Heart
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

const QuestionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { singleQuestion: question, loading } = useSelector(state => state.questions);

    useEffect(() => {
        if (id) {
            dispatch(fetchQuestionById({ "Id": id }));
        }
    }, [dispatch, id]);

    // تابع کمکی برای تبدیل رشته Answers به آرایه
    const getParsedAnswers = () => {
        if (!question?.Answers) return [];
        try {
            return JSON.parse(question.Answers);
        } catch (e) {
            console.error("Error parsing answers:", e);
            return [];
        }
    };

    const handleStatusChange = (newStatus) => {
        const statusText = newStatus === 1 ? "تایید" : "لغو تایید";
        dispatch(changeQuestionStatus({ Id: question.Id, Status: newStatus }))
            .unwrap()
            .then(() => {
                toast.success(`پرسش با موفقیت ${statusText} شد`);
                dispatch(fetchQuestionById({ "Id": id }));
            })
            .catch(() => toast.error("خطا در تغییر وضعیت پرسش"));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 animate-pulse font-vazir">در حال دریافت جزئیات پرسش...</p>
            </div>
        );
    }

    if (!question) {
        return (
            <div className="text-center py-20 font-vazir">
                <p className="text-slate-500">پرسشی با این شناسه یافت نشد.</p>
                <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
                    بازگشت به لیست
                </Button>
            </div>
        );
    }

    const answers = getParsedAnswers();

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 min-h-screen bg-slate-50/50 font-vazir" dir="rtl">

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="rounded-full hover:bg-slate-200 shrink-0"
                    >
                        <ArrowRight className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2 flex-wrap">
                            جزئیات پرسش
                            <span className="text-blue-500 font-mono text-lg">#{question.Id}</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {question.IsApproved ? (
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-200 shadow-sm">
                            <CheckCircle2 size={18} />
                            <span className="text-sm font-bold">تایید شده</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full border border-amber-200 shadow-sm">
                            <Clock size={18} />
                            <span className="text-sm font-bold">در انتظار بررسی</span>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Main Grid Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Main Question Card */}
                    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

                        <div className="relative space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-xl">
                                    <User size={28} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{question.UserFullName}</h3>
                                    <span className="text-xs text-slate-400 dir-ltr inline-block mt-1 font-mono">
                                        {formatDate(question.CreatedAt)}
                                    </span>
                                </div>
                            </div>

                            <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-relaxed border-r-4 border-blue-500 pr-4 bg-slate-50/80 py-4 rounded-l-xl">
                                {question.Title}
                            </h2>

                            <div
                                className="prose prose-slate max-w-none text-slate-700 leading-8 text-lg text-justify pt-4"
                                dangerouslySetInnerHTML={{ __html: question.Content }}
                            />

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-4 py-2 rounded-2xl">
                                    <MessageSquare size={18} />
                                    <span className="text-sm font-bold">{question.AnswersCount} پاسخ</span>
                                </div>

                                <div className="flex gap-2">
                                    {question.IsApproved ? (
                                        <Button
                                            onClick={() => handleStatusChange(0)}
                                            variant="outline"
                                            className="text-rose-600 border-rose-200 hover:bg-rose-50 rounded-xl"
                                        >
                                            <ShieldAlert className="ml-2" size={18} />
                                            لغو تایید
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleStatusChange(1)}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-200"
                                        >
                                            <ShieldCheck className="ml-2" size={18} />
                                            تایید و انتشار
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Answers List --- */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mr-2">
                            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                            پاسخ‌های کاربران
                        </h3>

                        {answers.length > 0 ? (
                            answers.map((answer) => (
                                <div key={answer.Id} className="bg-white border border-slate-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-800">{answer.AnswerUserName}</h4>
                                                <span className="text-[10px] text-slate-400 font-mono">{formatDate(answer.AnswerCreatedAt)}</span>
                                            </div>
                                        </div>
                                        {answer.Likes > 0 && (
                                            <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold">
                                                <Heart size={12} fill="currentColor" />
                                                {answer.Likes}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="prose prose-sm md:prose-base max-w-none text-slate-600 bg-slate-50/50 p-4 rounded-2xl border border-slate-50"
                                        dangerouslySetInnerHTML={{ __html: answer.AnswerContent }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-[1.5rem] p-12 text-center">
                                <p className="text-slate-500">تاکنون پاسخی برای این سوال ثبت نشده است.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6">
                    {/* Course Card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <BookOpen size={20} className="text-blue-500" />
                            مرتبط با دوره
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="text-xs text-slate-400 block mb-1">نام دوره:</span>
                                <span className="text-sm font-bold text-slate-800 leading-relaxed italic">{question.CourseTitle}</span>
                            </div>

                            {question.SessionTitle && (
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-xs text-slate-400 block mb-1">جلسه:</span>
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <PlayCircle size={16} />
                                        <span className="text-sm font-bold">{question.SessionTitle}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-sm">
                            اطلاعات سیستمی
                        </h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                                <span className="text-slate-400">شناسه دانشجو</span>
                                <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600">{question.UserId}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                                <span className="text-slate-400">شناسه مستند</span>
                                <span className="font-mono text-slate-600">{question.DocId}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">وضعیت نمایش</span>
                                {question.IsApproved ?
                                    <span className="text-emerald-600 font-bold">عمومی</span> :
                                    <span className="text-amber-600 font-bold">بایگانی/در انتظار</span>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
                        <h4 className="text-red-800 font-bold text-sm mb-2">مدیریت حساس</h4>
                        <p className="text-red-600/60 text-xs mb-4 leading-5">
                            حذف پرسش باعث حذف تمامی پاسخ‌های زیرمجموعه آن نیز خواهد شد. این عمل غیرقابل بازگشت است.
                        </p>
                        <Button variant="destructive" className="w-full rounded-xl py-6 shadow-lg shadow-red-200">
                            حذف دائمی این پرسش
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default QuestionDetails;