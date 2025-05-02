import React from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontalIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const data = [
    {
        id: 1,
        title: "آموزش مقدماتی ری‌اکت",
        instructor: "علی رضایی",
        duration: 120,
        episodes: 12,
        status: "منتشر شده",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
    {
        id: 2,
        title: "دوره کامل جاوااسکریپت",
        instructor: "زهرا حسینی",
        duration: 200,
        episodes: 20,
        status: "منتشر شده",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
    {
        id: 3,
        title: "آموزش طراحی رابط کاربری",
        instructor: "سعید کریمی",
        duration: 95,
        episodes: 10,
        status: "پیش‌نویس",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
    {
        id: 4,
        title: "آموزش پیشرفته نود جی‌اس",
        instructor: "ندا عباسی",
        duration: 180,
        episodes: 18,
        status: "منتشر شده",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
    {
        id: 5,
        title: "بوت‌کمپ برنامه‌نویسی",
        instructor: "محمد احمدی",
        duration: 240,
        episodes: 24,
        status: "پیش‌نویس",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
];

const columns = [
    {
        accessorKey: "id",
        header: "ردیف",
        cell: ({ row }) => (
            <div className='text-center'>{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                عنوان دوره
                <ArrowUpDown className="mr-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className='text-center'>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "instructor",
        header: () => <div>مدرس</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("instructor")}</div>,
    },
    {
        accessorKey: "duration",
        header: () => <div>مدت زمان</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("duration")} دقیقه</div>,
    },
    {
        accessorKey: "episodes",
        header: () => <div>تعداد قسمت‌ها</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("episodes")} قسمت</div>,
    },
    {
        accessorKey: "price",
        header: () => <div>قیمت</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("price").toLocaleString()} تومان</div>,
    },
    {
        accessorKey: "status",
        header: () => <div>وضعیت</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <span
                    className={`px-2 py-1 rounded block mx-auto w-fit text-xs ${status === "منتشر شده" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                        }`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div>عملیات</div>,
        cell: ({ row }) => {
            const course = row.original;
            return (


                <DropdownMenu >
                    <DropdownMenuTrigger asChild >
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">باز کردن منو</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(course.title)}>
                            کپی عنوان
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to={`edit/${course.id}`}>ویرایش</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>حذف</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Courses = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست دوره ها</h1>
                <div className='flex items-center gap-3'>
                    {/* <Button >برسی کد جایزه</Button> */}
                    <Button
                        className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                        onClick={() => navigate("new")}
                    >ایجاد دوره </Button>
                </div>
            </div>

            <DataTable data={data} columns={columns} filters={[{
                value: "title",
                placeholder: "عنوان"
            }]} />
        </>
    );
};

export default Courses;