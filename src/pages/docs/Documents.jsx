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
import { minuteToHour } from '../../helper';


const columns = [
    {
        accessorKey: "SortIndex",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ردیف
                <ArrowUpDown className="mr-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center">{row.getValue("SortIndex")}</div>,
    },
    {
        accessorKey: "Title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                عنوان دوره
                <ArrowUpDown className="mr-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center">{row.getValue("Title")}</div>,
    },
    {
        accessorKey: "Summary",
        header: () => <div>توضیحات</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("Summary")}</div>,
    },
    {
        accessorKey: "Duration",
        header: () => <div>مدت زمان</div>,
        cell: ({ row }) => (
            <div className="text-center">{minuteToHour(row.getValue("Duration"))}</div>
        ),
    },
    {
        accessorKey: "Lessons",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                تعداد دروس
                <ArrowUpDown className="mr-2 h-4 w-4" />
            </Button>
        ), cell: ({ row }) => (
            <div className="text-center">{row.getValue("Lessons")} قسمت</div>
        ),
    },
    {
        accessorKey: "Level",
        header: () => <div>سطح دوره</div>,
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("Level")}</div>
        ),
    },
    {
        accessorKey: "Disabled",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                وضعیت
                <ArrowUpDown className="mr-2 h-4 w-4" />
            </Button>
        ), cell: ({ row }) => {
            const disabled = row.getValue("Disabled");
            console.log(disabled)
            return (
                <span
                    className={`px-2 py-1 rounded block mx-auto w-fit text-xs ${!disabled
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                        }`}
                >
                    {!disabled ? "فعال" : "غیرفعال"}
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
                                <Link to={`/Documents/${doc.Id}/exercises`}>تمرینات</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={doc.Id.toString()}>مشاهده</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={`edit/${doc.Id}`}>ویرایش</Link>
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
        dispatch(fetchDocs({ "@PageSize": 20 }));
    }, [dispatch]);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {error}</p>;

    // تبدیل داده‌های واقعی به ساختار جدول با داده‌های فیک

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
                data={docs}
                columns={columns}
                filters={[
                    {
                        value: "Title",
                        placeholder: "عنوان",
                    },
                ]}
            />
        </>
    );
};

export default Documents;
