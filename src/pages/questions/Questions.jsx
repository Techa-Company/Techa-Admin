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
    CheckCircle2,
    XCircle,
    MessageSquare,
    User,
    ShieldCheck,
    ShieldAlert,
    BookOpen,
    MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchQuestions, changeQuestionStatus } from '../../features/questions/questionsActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

// تابع کمکی برای حذف تگ‌های HTML جهت نمایش در جدول
const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

const Questions = () => {
    const dispatch = useDispatch();
    // استخراج دیتا از اسلایس questions
    const { questions, loading } = useSelector(state => state.questions);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    const handleStatusChange = (id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        const statusText = newStatus === 1 ? "تایید" : "عدم تایید";

        dispatch(changeQuestionStatus({ Id: id, Status: newStatus }))
            .unwrap()
            .then(() => {
                toast.success(`وضعیت پرسش با موفقیت به ${statusText} تغییر یافت`);
                dispatch(fetchQuestions());
            })
            .catch((err) => {
                toast.error("خطا در تغییر وضعیت پرسش");
                console.error(err);
            });
    };

    const columns = useMemo(() => [
        {
            accessorKey: "Id",
            header: () => <div className="text-center">شناسه</div>,
            cell: ({ row }) => <div className="text-center font-medium text-slate-500">#{row.getValue("Id")}</div>,
        },
        {
            accessorKey: "UserName",
            header: () => <div className="text-right pr-4">کاربر</div>,
            cell: ({ row }) => {
                const userName = row.getValue("UserName");
                const avatar = row.original.Avatar;

                return (
                    <div className="flex items-center gap-3 pr-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center overflow-hidden">
                            {avatar ? <img src={avatar} alt={userName} /> : <User size={16} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-sm text-slate-800">{userName}</span>
                            <span className="text-[12px] text-slate-400">شناسه کاربر: {row.original.UserId}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "Title",
            header: () => <div className="text-right">عنوان</div>,
            cell: ({ row }) => {
                const title = row.getValue("Title");
                const content = stripHtml(row.original.Content);

                return (
                    <div className="flex flex-col max-w-[300px] gap-1">
                        <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-sm">
                            <MessageSquare className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="truncate">{title}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "CourseTitle",
            header: () => <div className="text-right">دوره / جلسه</div>,
            cell: ({ row }) => (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                        <BookOpen size={12} className="text-emerald-500" />
                        {row.getValue("CourseTitle")}
                    </div>
                    {row.original.SessionTitle && (
                        <span className="text-[12px] text-slate-400 pr-4 italic">
                            {row.original.SessionTitle}
                        </span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "AnswersCount",
            header: () => <div className="text-center">پاسخ‌ها</div>,
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-bold">
                        <MessageCircle size={12} />
                        {row.getValue("AnswersCount")}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "IsApproved",
            header: () => <div className="text-center">وضعیت</div>,
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
                    <div className="text-center text-xs text-slate-500 dir-ltr font-mono">
                        {date.toLocaleDateString('fa-IR')}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center">عملیات</div>,
            cell: ({ row }) => {
                const question = row.original;
                return (
                    <div className="flex justify-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                    <MoreHorizontalIcon className="h-4 w-4 text-slate-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px] font-vazir">
                                <DropdownMenuLabel>مدیریت پرسش</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link to={`/questions/${question.Id}`} className="cursor-pointer">
                                        مشاهده و پاسخ
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {question.IsApproved ? (
                                    <DropdownMenuItem
                                        onClick={() => handleStatusChange(question.Id, question.Status)}
                                        className="text-amber-600 focus:text-amber-700 focus:bg-amber-50 cursor-pointer flex items-center gap-2"
                                    >
                                        <ShieldAlert size={14} />
                                        لغو تایید
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem
                                        onClick={() => handleStatusChange(question.Id, question.Status)}
                                        className="text-green-600 focus:text-green-700 focus:bg-green-50 cursor-pointer flex items-center gap-2"
                                    >
                                        <ShieldCheck size={14} />
                                        تایید پرسش
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer flex items-center gap-2">
                                    <XCircle size={14} />
                                    حذف پرسش
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ], [questions]);

    return (
        <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">پرسش و پاسخ‌ها</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        مدیریت سوالات دانشجویان
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-white px-4 py-2 rounded-lg border text-sm font-medium shadow-sm text-slate-600">
                        تعداد کل سوالات: {questions?.length || 0}
                    </span>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
                    <span>در حال بارگذاری پرسش‌ها...</span>
                </div>
            ) : (
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden px-5 pb-5">
                    <DataTable
                        columns={columns}
                        data={questions || []}
                        filters={[
                            {
                                value: "UserName",
                                placeholder: "جستجوی نام کاربر..."
                            },
                            {
                                value: "Title",
                                placeholder: "جستجوی در عنوان..."
                            }
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default Questions;