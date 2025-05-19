import React from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontalIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const data = [
    { id: 1, name: "فرانت‌اند", status: "فعال", courseCount: 12 },
    { id: 2, name: "بک‌اند", status: "فعال", courseCount: 8 },
    { id: 3, name: "طراحی", status: "غیرفعال", courseCount: 5 },
    { id: 4, name: "جامع", status: "فعال", courseCount: 3 },
];


const columns = [
    {
        accessorKey: "id",
        header: "ردیف",
        cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: "نام دسته‌بندی",
        cell: ({ row }) => <div className="text-center">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "courseCount",
        header: "تعداد دوره‌ها",
        cell: ({ row }) => <div className="text-center">{row.getValue("courseCount")} دوره</div>,
    },
    {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <span className={`px-2 py-1 rounded block mx-auto w-fit text-xs ${status === "فعال"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"}`}>
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
            const category = row.original;
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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.name)}>
                                کپی عنوان
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={`edit-category/${category.id}`}>ویرایش</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>حذف</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },

];


const Categories = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست دسته بندی دوره ها</h1>
                <div className='flex items-center gap-3'>
                    <Button
                        className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                        onClick={() => navigate("new")}
                    >ایجاد دسته بندی </Button>
                </div>
            </div>

            <DataTable data={data} columns={columns} filters={[{
                value: "title",
                placeholder: "عنوان"
            }]} />
        </>
    );
};

export default Categories;