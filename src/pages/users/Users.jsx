import React, { useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../features/users/usersActions';





const Users = () => {

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers({ "@PageSize": 20 }));
    }, [dispatch]);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {error}</p>;

    console.log(users)
    const columns = [
        {
            accessorKey: "Id",
            header: "ردیف",
            cell: ({ row }) => <div className='text-center'>{row.getValue("Id")}</div>,
        },
        {
            accessorKey: "FullName",
            header: "نام کامل",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <Link
                        to={`/users/${user.id}`}
                        className='text-center block'
                    >
                        {user.FirstName + " " + user.LastName}
                    </Link>
                );
            },
        },

        {
            accessorKey: "Email",
            header: "ایمیل",
            cell: ({ row }) => <div className='text-center'>{row.getValue("Email")}</div>,
        },
        {
            accessorKey: "Mobile",
            header: "شماره تماس",
            cell: ({ row }) => <div className='text-center'>{row.getValue("Mobile")}</div>,
        },
        {
            accessorKey: "courses",
            header: "تعداد دوره‌ها",
            cell: ({ row }) => <div className='text-center'>{row.getValue("courses")}</div>,
        },
        {
            accessorKey: "CreatedDate",
            header: "تاریخ ثبت‌نام",
            cell: ({ row }) => {
                const date = new Date(row.getValue("CreatedDate"));
                return <div className='text-center'>{date.toLocaleDateString("fa-IR")}</div>;
            },
        }
        ,
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
    return (
        <>
            <div className='mb-2'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست کاربران</h1>
            </div>

            <DataTable data={users} columns={columns} filters={[{
                value: "fullName",
                placeholder: "نام"
            }]} />
        </>
    );
};

export default Users;