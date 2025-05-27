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
        subject: "مشکل در ورود به حساب",
        category: "حساب کاربری",
        status: "باز",
        priority: "بالا",
        senderName: "مهدی احمدی",
        senderEmail: "mahdi@example.com",
    },
    {
        id: 2,
        subject: "سوال درباره دوره React",
        category: "آموزشی",
        status: "در حال بررسی",
        priority: "متوسط",
        senderName: "نگار رضایی",
        senderEmail: "negar@example.com",
    },
    {
        id: 3,
        subject: "پیشنهاد بهبود رابط کاربری",
        category: "پیشنهادات",
        status: "بسته",
        priority: "پایین",
        senderName: "امیر راد",
        senderEmail: "amir@example.com",
    },
];

const columns = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">ردیف</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        accessorKey: "subject",
        header: () => <div className="text-center">موضوع</div>,
        cell: ({ row }) => <Link to={`/tickets/${row.getValue("id")}`} className="text-center block">{row.getValue("subject")}</Link>,
    },
    {
        accessorKey: "category",
        header: () => <div className="text-center">دسته‌بندی</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("category")}</div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">وضعیت</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            const colorClass = status === "باز"
                ? "bg-red-200 text-red-800"
                : status === "در حال بررسی"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800";
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
        accessorKey: "priority",
        header: () => <div className="text-center">اولویت</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("priority")}</div>,
    },
    {
        accessorKey: "senderName",
        header: () => <div className="text-center">نام ارسال‌کننده</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("senderName")}</div>,
    },
    {
        accessorKey: "senderEmail",
        header: () => <div className="text-center">ایمیل</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("senderEmail")}</div>,
    },
    {
        id: "actions",
        header: () => <div className="text-center">عملیات</div>,
        cell: ({ row }) => {
            const ticket = row.original;
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
                            <DropdownMenuItem onClick={() => alert(`نمایش تیکت: ${ticket.subject}`)}>
                                نمایش
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => alert(`بستن تیکت: ${ticket.subject}`)}>
                                بستن
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

const Tickets = () => {
    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست تیکت‌ها</h1>
                <div className='flex items-center gap-3'></div>
            </div>

            <DataTable
                data={data}
                columns={columns}
                filters={[
                    {
                        value: "subject",
                        placeholder: "جستجو در موضوع"
                    },
                ]}
            />
        </>
    );
};

export default Tickets;
