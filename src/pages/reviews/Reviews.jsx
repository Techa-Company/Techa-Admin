import React, { useEffect, useMemo } from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';
import {
    MoreHorizontalIcon,
    Star,
    CornerDownRight,
    CheckCircle2,
    XCircle,
    MessageSquare,
    User,
    ShieldCheck,
    ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';
// فرض بر این است که اکشن changeReviewStatus در فایل اکشن‌ها تعریف شده است
import { fetchReviews, changeReviewStatus } from '../../features/reviews/reviewsActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner'; // یا هر کتابخانه نوتیفیکیشن که دارید

// تابع کمکی برای نمایش ستاره‌ها
const RatingStars = ({ rating }) => {
    if (!rating) return <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">پاسخ (Reply)</span>;

    return (
        <div className="flex items-center gap-1 text-amber-500">
            <span className="font-bold text-sm mt-0.5">{rating}</span>
            <Star className="w-4 h-4 fill-current" />
        </div>
    );
};

const Reviews = () => {
    const dispatch = useDispatch();
    const { reviews, loading } = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    // هندل کردن تغییر وضعیت
    const handleStatusChange = (id, currentStatus) => {
        // اگر وضعیت فعلی 1 است (تایید شده)، باید 0 (رد شده) شود و برعکس
        // با توجه به دیتای شما Status: 1 معادل تایید شده است
        const newStatus = currentStatus === 1 ? 0 : 1;
        const statusText = newStatus === 1 ? "تایید" : "عدم تایید";

        dispatch(changeReviewStatus({ Id: id, Status: newStatus }))
            .unwrap() // اگر از Redux Toolkit استفاده می‌کنید برای هندل کردن Promise
            .then(() => {
                toast.success(`نظر با موفقیت ${statusText} شد`);
                // اگر نیاز بود لیست را آپدیت کنید (اگر استیت به صورت خودکار آپدیت نمی‌شود)
                dispatch(fetchReviews());
            })
            .catch((err) => {
                toast.error("خطا در تغییر وضعیت نظر");
                console.error(err);
            });
    };

    // تعریف ستون‌ها داخل کامپوننت برای دسترسی به handleStatusChange
    const columns = useMemo(() => [
        {
            accessorKey: "Id",
            header: () => <div className="text-center">شناسه</div>,
            cell: ({ row }) => <div className="text-center font-medium text-slate-500">#{row.getValue("Id")}</div>,
        },
        {
            accessorKey: "UserFullName",
            header: () => <div className="text-right pr-4">کاربر</div>,
            cell: ({ row }) => {
                const fullName = row.getValue("UserFullName");
                const mobile = row.original.UserMobile;

                return (
                    <div className="flex items-center gap-3 pr-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <User size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-sm text-slate-800">{fullName}</span>
                            <span className="text-xs text-slate-400 font-mono tracking-wider">{mobile}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "Content",
            header: () => <div className="text-right">متن نظر</div>,
            cell: ({ row }) => {
                const content = row.getValue("Content");
                const isReply = row.original.ParentId !== null;

                return (
                    <div className="flex items-start gap-2 max-w-[350px]">
                        {isReply ? (
                            <CornerDownRight className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                        ) : (
                            <MessageSquare className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                        )}
                        <p className="text-sm text-slate-600 truncate" title={content}>
                            {content}
                        </p>
                    </div>
                );
            },
        },
        {
            accessorKey: "Rating",
            header: () => <div className="text-center">امتیاز</div>,
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <RatingStars rating={row.getValue("Rating")} />
                </div>
            ),
        },
        {
            accessorKey: "IsApproved",
            header: () => <div className="text-center">وضعیت تایید</div>,
            cell: ({ row }) => {
                const isApproved = row.getValue("IsApproved");

                return (
                    <div className="flex justify-center">
                        {isApproved ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                <CheckCircle2 size={12} />
                                تایید شده
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                                <XCircle size={12} />
                                در انتظار
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "CreatedAt",
            header: () => <div className="text-center">تاریخ ثبت</div>,
            cell: ({ row }) => {
                const date = new Date(row.getValue("CreatedAt"));
                return (
                    <div className="text-center text-sm text-slate-500 dir-ltr font-mono">
                        {date.toLocaleDateString('fa-IR')}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center">عملیات</div>,
            cell: ({ row }) => {
                const review = row.original;
                return (
                    <div className="flex justify-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                    <span className="sr-only">منو</span>
                                    <MoreHorizontalIcon className="h-4 w-4 text-slate-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px]">
                                <DropdownMenuLabel>مدیریت نظر</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link to={`/reviews/${review.Id}`} className="cursor-pointer flex items-center justify-between">
                                        مشاهده جزئیات
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                {review.IsApproved ? (
                                    <DropdownMenuItem
                                        onClick={() => handleStatusChange(review.Id, review.Status)}
                                        className="text-amber-600 focus:text-amber-700 focus:bg-amber-50 cursor-pointer flex items-center gap-2"
                                    >
                                        <ShieldAlert size={14} />
                                        لغو تایید (عدم نمایش)
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem
                                        onClick={() => handleStatusChange(review.Id, review.Status)}
                                        className="text-green-600 focus:text-green-700 focus:bg-green-50 cursor-pointer flex items-center gap-2"
                                    >
                                        <ShieldCheck size={14} />
                                        تایید و انتشار
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer flex items-center gap-2">
                                    <XCircle size={14} />
                                    حذف کامل
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ], [reviews]); // وابستگی به reviews باعث می‌شود با آپدیت شدن لیست، وضعیت دکمه‌ها هم تغییر کند

    return (
        <div className="p-6 space-y-6 bg-white/50 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">مدیریت نظرات دوره</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        لیست نظرات ثبت شده برای دوره شماره {reviews && reviews[0]?.CourseId}
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-white px-4 py-2 rounded-lg border text-sm font-medium shadow-sm">
                        تعداد کل: {reviews?.length || 0}
                    </span>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
                    <span>در حال دریافت اطلاعات...</span>
                </div>
            ) : (
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden px-5 pb-5">
                    <DataTable
                        columns={columns}
                        data={reviews || []}
                        filters={[
                            {
                                value: "UserFullName",
                                placeholder: "نام"
                            },
                            {
                                value: "UserMobile",
                                placeholder: "شماره موبایل"
                            }
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default Reviews;