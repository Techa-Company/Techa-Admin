import React from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
    {
        id: 1,
        fullName: "علی رضایی",
        email: "ali.rezaei@example.com",
        phone: "09121234567",
        status: "فعال",
        courses: 3,
        registeredAt: "2024-10-15",
    },
    {
        id: 2,
        fullName: "زهرا حسینی",
        email: "zahra.hosseini@example.com",
        phone: "09351234567",
        status: "غیرفعال",
        courses: 1,
        registeredAt: "2024-08-03",
    },
    {
        id: 3,
        fullName: "محمد احمدی",
        email: "m.ahmadi@example.com",
        phone: "09131234567",
        status: "فعال",
        courses: 5,
        registeredAt: "2024-12-01",
    },
];


const columns = [
    {
        accessorKey: "id",
        header: "ردیف",
        cell: ({ row }) => <div className='text-center'>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "fullName",
        header: "نام کامل",
        cell: ({ row }) => <div className='text-center'>{row.getValue("fullName")}</div>,
    },
    {
        accessorKey: "email",
        header: "ایمیل",
        cell: ({ row }) => <div className='text-center'>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phone",
        header: "شماره تماس",
        cell: ({ row }) => <div className='text-center'>{row.getValue("phone")}</div>,
    },
    {
        accessorKey: "courses",
        header: "تعداد دوره‌ها",
        cell: ({ row }) => <div className='text-center'>{row.getValue("courses")}</div>,
    },
    {
        accessorKey: "registeredAt",
        header: "تاریخ ثبت‌نام",
        cell: ({ row }) => <div className='text-center'>{row.getValue("registeredAt")}</div>,
    },
    {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <span
                    className={`px-2 py-1 rounded block mx-auto w-fit text-xs ${status === "فعال"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(course.fullName)}>
                            کپی نام
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>تغییر وضعیت</DropdownMenuItem>
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


const Students = () => {

    return (
        <>
            <div className='mb-2'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست دانشجویان</h1>
            </div>

            <DataTable data={data} columns={columns} filters={[{
                value: "fullName",
                placeholder: "نام"
            }]} />
        </>
    );
};

export default Students;