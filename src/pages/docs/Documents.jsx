import React, { useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontalIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocs } from '../../features/docs/docsActions';

// دیتاهای فیک برای فیلدهای غیر از title
const fakeValues = [
    {
        instructor: "علی رضایی",
        duration: 120,
        episodes: 12,
        status: "منتشر شده",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
    {
        instructor: "زهرا حسینی",
        duration: 200,
        episodes: 20,
        status: "منتشر شده",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
    {
        instructor: "سعید کریمی",
        duration: 95,
        episodes: 10,
        status: "پیش‌نویس",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
    {
        instructor: "ندا عباسی",
        duration: 180,
        episodes: 18,
        status: "منتشر شده",
        price: Math.floor(Math.random() * 4000000) + 1000000,
    },
    {
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
        cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
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
        cell: ({ row }) => <div className="text-center">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "instructor",
        header: () => <div>مدرس</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("instructor")}</div>,
    },
    {
        accessorKey: "duration",
        header: () => <div>مدت زمان</div>,
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("duration")} دقیقه</div>
        ),
    },
    {
        accessorKey: "episodes",
        header: () => <div>تعداد قسمت‌ها</div>,
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("episodes")} قسمت</div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div>قیمت</div>,
        cell: ({ row }) => (
            <div className="text-center">
                {row.getValue("price").toLocaleString()} تومان
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <div>وضعیت</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <span
                    className={`px-2 py-1 rounded block mx-auto w-fit text-xs ${status === "منتشر شده"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
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
        header: () => <div className="text-center">عملیات</div>,
        cell: ({ row }) => {
            const doc = row.original;
            return (
                <div className="flex justify-center items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">باز کردن منو</span>
                                <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>عملیات</DropdownMenuLabel>

                            <DropdownMenuItem>
                                <Link to={`/Documents/${doc.id}/exercises`}>تمرینات</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={doc.id.toString()}>مشاهده</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={`edit/${doc.id}`}>ویرایش</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>حذف</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

const Documents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { docs, loading, error } = useSelector((state) => state.docs);

    useEffect(() => {
        dispatch(fetchDocs({ "@Disabled": "false" }));
    }, [dispatch]);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {error}</p>;

    // تبدیل داده‌های واقعی به ساختار جدول با داده‌های فیک
    const mergedData = docs.map((item, index) => ({
        id: item.SortIndex,
        title: item.Title,
        ...fakeValues[index % fakeValues.length], // چرخش بین داده‌های فیک
    }));

    return (
        <>
            <div className="mb-2 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">لیست مستندات</h1>
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                        onClick={() => navigate("new")}
                    >
                        ایجاد مستند
                    </Button>
                </div>
            </div>

            <DataTable
                data={mergedData}
                columns={columns}
                filters={[
                    {
                        value: "title",
                        placeholder: "عنوان",
                    },
                ]}
            />
        </>
    );
};

export default Documents;
