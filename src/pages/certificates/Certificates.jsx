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

const data = [
    {
        id: 1,
        studentName: "علی رضایی",
        course: "React پیشرفته",
        requestDate: "1403/03/10",
        status: "تایید شده",
        certificateType: "دیجیتال",
    },
    {
        id: 2,
        studentName: "زهرا حسینی",
        course: "جاوااسکریپت مقدماتی",
        requestDate: "1403/03/12",
        status: "در حال بررسی",
        certificateType: "چاپی",
    },
    {
        id: 3,
        studentName: "سعید کریمی",
        course: "طراحی رابط کاربری",
        requestDate: "1403/03/08",
        status: "رد شده",
        certificateType: "دیجیتال",
    },
];

const columns = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">ردیف</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        accessorKey: "studentName",
        header: () => <div className="text-center">نام دانشجو</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("studentName")}</div>,
    },
    {
        accessorKey: "course",
        header: () => <div className="text-center">دوره</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("course")}</div>,
    },
    {
        accessorKey: "requestDate",
        header: () => <div className="text-center">تاریخ درخواست</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("requestDate")}</div>,
    },
    {
        accessorKey: "certificateType",
        header: () => <div className="text-center">نوع گواهینامه</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("certificateType")}</div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">وضعیت</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className="text-center">
                    <span className={`px-2 py-1 rounded text-xs ${status === "تایید شده"
                            ? "bg-green-200 text-green-800"
                            : status === "در حال بررسی"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-200 text-red-800"
                        }`}>
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
            const request = row.original;
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
                            <DropdownMenuItem onClick={() => alert(`مشاهده درخواست ${request.studentName}`)}>
                                مشاهده
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert(`ویرایش درخواست ${request.studentName}`)}>
                                ویرایش
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => alert(`حذف درخواست ${request.studentName}`)}>
                                حذف
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

const Certificates = () => {
    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>درخواست‌های دریافت گواهینامه</h1>
                <div className='flex items-center gap-3'></div>
            </div>

            <DataTable
                data={data}
                columns={columns}
                filters={[{ value: "studentName", placeholder: "نام دانشجو" }]}
            />
        </>
    );
};

export default Certificates;
