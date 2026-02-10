import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewById, changeReviewStatus } from '../../features/reviews/reviewsActions';
import {
    ArrowRight,
    User,
    Phone,
    Calendar,
    Star,
    CheckCircle2,
    XCircle,
    Quote,
    ThumbsUp,
    Hash,
    BookOpen,
    ShieldCheck,
    ShieldAlert,
    Clock
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

const ReviewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // فرض بر این است که در ریدیوسر، selectedReview برای جزئیات ذخیره می‌شود
    const { singleReview: review, loading } = useSelector(state => state.reviews);

    useEffect(() => {
        if (id) {
            dispatch(fetchReviewById({ "Id": id }));
        }
    }, [dispatch, id]);

    const handleStatusChange = (newStatus) => {
        const statusText = newStatus === 1 ? "تایید" : "عدم تایید";

        dispatch(changeReviewStatus({ Id: review.Id, Status: newStatus }))
            .unwrap()
            .then(() => {
                toast.success(`نظر با موفقیت ${statusText} شد`);
                // رفرش کردن دیتا برای آپدیت UI
                dispatch(fetchReviewById({ "Id": id }));
            })
            .catch(() => toast.error("خطا در تغییر وضعیت"));
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
                <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 animate-pulse">در حال بارگذاری جزئیات...</p>
            </div>
        );
    }

    if (!review) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500">نظری یافت نشد.</p>
                <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
                    بازگشت به لیست
                </Button>
            </div>
        );
    }

    const isReply = review.ParentId !== null;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 min-h-screen bg-slate-50/50">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="rounded-full hover:bg-slate-200"
                    >
                        <ArrowRight className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            جزئیات نظر
                            <span className="text-slate-400 font-mono text-lg">#{review.Id}</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {review.IsApproved ? (
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-200 shadow-sm">
                            <CheckCircle2 size={18} />
                            <span className="text-sm font-bold">تایید شده</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full border border-amber-200 shadow-sm">
                            <Clock size={18} />
                            <span className="text-sm font-bold">در انتظار تایید</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content Column (Left - 2 Cols) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Parent Context (If it's a reply) */}
                    {isReply && (
                        <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-1 h-full bg-slate-300 group-hover:bg-emerald-400 transition-colors"></div>
                            <div className="flex items-start gap-3 opacity-70">
                                <Quote className="w-8 h-8 text-slate-400 shrink-0 rotate-180" />
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        پاسخ به نظرِ {review.ParentUserFullName || "کاربر"}
                                    </span>
                                    <p className="text-slate-700 text-sm line-clamp-2 italic">
                                        "{review.ParentContent || "محتوای نظر اصلی در دسترس نیست..."}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Review Content Card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>

                        <div className="relative">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <User size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">{review.UserFullName}</h3>
                                        <span className="text-sm text-slate-500 dir-ltr font-mono">{formatDate(review.CreatedAt)}</span>
                                    </div>
                                </div>

                                {review.Rating && (
                                    <div className="flex flex-col items-end">
                                        <div className="flex gap-1 text-amber-400 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={18}
                                                    className={i < review.Rating ? "fill-current" : "text-slate-200"}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg">
                                            {review.Rating} از 5
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="py-4 border-t border-b border-slate-50 my-4">
                                <p className="text-slate-700 leading-8 text-lg text-justify whitespace-pre-line">
                                    {review.Content}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl">
                                    <ThumbsUp size={16} />
                                    <span className="text-sm font-medium">{review.LikesCount || 0} لایک</span>
                                </div>

                                <div className="flex gap-3">
                                    {review.IsApproved ? (
                                        <Button
                                            onClick={() => handleStatusChange(0)}
                                            variant="outline"
                                            className="text-amber-600 border-amber-200 hover:bg-amber-50 gap-2"
                                        >
                                            <ShieldAlert size={16} />
                                            لغو تایید
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleStatusChange(1)}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-lg shadow-emerald-600/20"
                                        >
                                            <ShieldCheck size={16} />
                                            تایید و انتشار
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column (Right - 1 Col) */}
                <div className="space-y-6">

                    {/* User Details Card */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                            اطلاعات کاربر
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <User size={18} />
                                    <span className="text-sm">نام کامل</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">{review.UserFullName}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone size={18} />
                                    <span className="text-sm">موبایل</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800 font-mono tracking-wider">{review.UserMobile}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Hash size={18} />
                                    <span className="text-sm">شناسه کاربر</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800 font-mono">{review.UserId}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                            جزئیات سیستم
                        </h4>
                        <ul className="space-y-3 relative">
                            {/* خط اتصال عمودی */}
                            <div className="absolute right-[19px] top-2 bottom-2 w-0.5 bg-slate-100 -z-10"></div>

                            <li className="flex items-center gap-3 text-sm">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                                    <BookOpen size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-xs">دوره آموزشی</span>
                                    <span className="font-medium text-slate-700">عنوان: {review.CourseTitle}</span>
                                </div>
                            </li>

                            <li className="flex items-center gap-3 text-sm">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                                    <Calendar size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-xs">تاریخ ایجاد</span>
                                    <span className="font-medium text-slate-700 dir-ltr">{formatDate(review.CreatedAt)}</span>
                                </div>
                            </li>

                            {review.UpdatedAt && (
                                <li className="flex items-center gap-3 text-sm">
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                                        <Clock size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 text-xs">آخرین بروزرسانی</span>
                                        <span className="font-medium text-slate-700 dir-ltr">{formatDate(review.UpdatedAt)}</span>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Delete Danger Zone */}
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center">
                        <h4 className="text-red-800 font-bold text-sm mb-2">منطقه خطر</h4>
                        <p className="text-red-600/70 text-xs mb-3">حذف این نظر غیرقابل بازگشت است.</p>
                        <Button variant="destructive" className="w-full text-xs h-9">
                            حذف نظر
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;