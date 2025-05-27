import React from 'react';
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
        title: "آزمون نهایی React",
        courseTitle: "دوره جامع React",
        type: "تستی",
        questionCount: 20,
        duration: 30,
        status: "فعال"
    },
    {
        id: 2,
        title: "آزمون میان‌دوره‌ای جاوااسکریپت",
        courseTitle: "مبانی JavaScript",
        type: "تشریحی",
        questionCount: 5,
        duration: 60,
        status: "غیرفعال"
    },
    {
        id: 3,
        title: "آزمون مقدماتی HTML",
        courseTitle: "HTML مقدماتی",
        type: "تستی",
        questionCount: 10,
        duration: 15,
        status: "فعال"
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
        cell: ({ row }) => (
            <Link to={`/quizzes/${row.getValue("id")}`} className="text-center block text-blue-600 hover:underline">
                {row.getValue("title")}
            </Link>
        ),
    },
    {
        accessorKey: "courseTitle",
        header: () => <div className="text-center">عنوان دوره</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("courseTitle")}</div>,
    },
    {
        accessorKey: "type",
        header: () => <div className="text-center">نوع آزمون</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("type")}</div>,
    },
    {
        accessorKey: "questionCount",
        header: () => <div className="text-center">تعداد سوالات</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("questionCount")}</div>,
    },
    {
        accessorKey: "duration",
        header: () => <div className="text-center">مدت پاسخ‌گویی (دقیقه)</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("duration")}</div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">وضعیت</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            const colorClass = status === "فعال"
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-800";
            return (
                <div className="text-center">
                    <span className={`px-2 py-1 rounded text-xs ${colorClass}`}>
                        {status}
                    </span>
                </div>
            );
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
                            <DropdownMenuItem onClick={() => alert(`مشاهده آزمون: ${exam.title}`)}>مشاهده</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => alert(`حذف آزمون: ${exam.title}`)} className="text-red-600">
                                حذف
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

const Quizzes = () => {
    return (
        <>
            <div className='mb-4 flex items-center justify-between'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست آزمون‌ها</h1>
                <div className='flex items-center gap-2'>
                    <Button asChild>
                        <Link to="/exams/create">افزودن آزمون جدید</Link>
                    </Button>
                </div>
            </div>

            <DataTable
                data={data}
                columns={columns}
                filters={[
                    {
                        value: "title",
                        placeholder: "جستجو در عنوان آزمون"
                    },
                ]}
            />
        </>
    );
};

export default Quizzes;
