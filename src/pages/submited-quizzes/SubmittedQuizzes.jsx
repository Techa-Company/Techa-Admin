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
import { MoreHorizontalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
    {
        id: 1,
        title: "آزمون نهایی",
        course: "React پیشرفته",
        participantName: "علی رضایی",
        type: "تستی",
        status: "پاس شده",
        score: 85,
    },
    {
        id: 2,
        title: "آزمون نهایی",
        course: "جاوااسکریپت مقدماتی",
        participantName: "زهرا حسینی",
        type: "تشریحی",
        status: "رد شده",
        score: 65,
    },
    {
        id: 3,
        title: "آزمون میان ترم",
        course: "ساختمان داده",
        participantName: "سعید کریمی",
        type: "تستی",
        status: "پاس شده",
        score: 100,
    },
];

const columns = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">ردیف</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        accessorKey: "title",
        header: () => <div className="text-center">عنوان آزمون</div>,
        cell: ({ row }) => <Link to={row.getValue("id").toString()} className="text-center block">{row.getValue("title")}</Link>,
    },
    {
        accessorKey: "course",
        header: () => <div className="text-center">دوره</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("course")}</div>,
    },
    {
        accessorKey: "participantName",
        header: () => <div className="text-center">نام آزمون‌دهنده</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("participantName")}</div>,
    },
    {
        accessorKey: "type",
        header: () => <div className="text-center">نوع آزمون</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("type")}</div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">وضعیت</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className="text-center">
                    <span className={`px-2 py-1 rounded text-xs ${status === "پاس شده"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                        }`}>
                        {status}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "score",
        header: () => <div className="text-center">نمره کسب‌شده</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            const score = row.getValue("score");
            return <div className="text-center">{score}</div>;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-center">عملیات</div>,
        cell: ({ row }) => {
            const exam = row.original;
            return (
                <div className="flex justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">باز کردن منو</span>
                                <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => alert(`ویرایش آزمون ${exam.title}`)}>
                                ویرایش
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => alert(`حذف آزمون ${exam.title}`)}>
                                حذف
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

const SubmittedQuizzes = () => {
    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست آزمون‌های ارسالی</h1>
                <div className='flex items-center gap-3'></div>
            </div>

            <DataTable data={data} columns={columns} filters={[{
                value: "title",
                placeholder: "عنوان آزمون"
            }]} />
        </>
    );
};

export default SubmittedQuizzes;
