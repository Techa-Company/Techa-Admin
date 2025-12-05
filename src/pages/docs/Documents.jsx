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
import { createAndUpdateDoc, deleteDoc, fetchDocs } from '../../features/docs/docsActions';
import { minuteToHour } from '../../helper';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const Documents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { docs, loading, error } = useSelector((state) => state.docs);

    useEffect(() => {
        dispatch(fetchDocs({ Take: 20 }));
    }, [dispatch]);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {error}</p>;


    const changeStatus = async (doc) => {
        const data = {
            "@Id": doc.Id,
            "@Disabled": !doc.Disabled,
            "@Title": doc.Title,
            "@SortIndex": doc.SortIndex,
            "@Price": "10"
        };

        try {
            const resultAction = await dispatch(createAndUpdateDoc(data));

            if (createAndUpdateDoc.fulfilled.match(resultAction)) {
                toast.success('تغییر وضعیت مستند انجام شد');
                // Reload docs to reflect new state
                dispatch(fetchDocs({ "PageSize": 20, "Mode": "AdminCourses" }));
            } else {
                toast.error('خطا در تغییر وضعیت مستند');
            }
        } catch (error) {
            toast.error(`خطا در تغییر وضعیت مستند: ${error.message}`);
        }
    };

    const MySwal = withReactContent(Swal);

    const handleDeleteDoc = async (id) => {
        const confirm = await MySwal.fire({
            title: 'آیا از حذف این دوره مطمئن هستید؟',
            text: "این عمل قابل بازگشت نیست!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'بله، حذف شود!',
            cancelButtonText: 'لغو',
        });

        if (!confirm.isConfirmed) return;

        const data = {
            "@Id": id,
        };

        try {
            const resultAction = await dispatch(deleteDoc(data));

            if (resultAction.type === deleteDoc.fulfilled.type) {
                toast.success('مستند با موفقیت حذف شد');
                dispatch(fetchDocs({ "@PageSize": 20 }));
            } else {
                toast.error('خطا در حذف مستند');
            }
        } catch (error) {
            toast.error(`خطا در حذف مستند: ${error.message}`);
        }
    };


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
            accessorKey: 'Level',
            header: 'سطح',
            cell: ({ row }) => {
                const levels = { Beginner: ['مقدماتی', 'text-green-600'], Intermediate: ['متوسط', 'text-yellow-600'], Advanced: ['پیشرفته', 'text-red-600'], 3: ['چالش‌برانگیز', 'text-purple-600'] };
                const [text, color] = levels[row.getValue('Level')] || ['نامشخص', 'text-gray-400'];
                return <div className={`text-center font-bold ${color}`}>{text}</div>;
            }
        },
        {
            accessorKey: 'Disabled',
            header: 'وضعیت',
            cell: ({ row }) => {
                const val = row.getValue('Disabled');
                const text = val ? 'غیرفعال' : 'فعال';
                const bg = val ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
                return <span className={`py-1 rounded-sm text-center block mx-auto text-sm font-medium ${bg}`}>{text}</span>;
            }
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
                                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                    <span className="sr-only">باز کردن منو</span>
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {/* <DropdownMenuLabel>عملیات</DropdownMenuLabel> */}

                                <DropdownMenuItem>
                                    <Link to={`/Documents/${doc.Id}/exercises`}>تمرینات</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to={doc.Id.toString()}>مشاهده</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span
                                        className={`${doc.Disabled ? "text-green-500" : "text-red-500"}`}
                                        onClick={() => changeStatus(doc)}
                                    >{doc.Disabled ? "فعال کردن" : "غیرفعال کردن"}
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to={`edit/${doc.Id}`}>ویرایش</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500"
                                    onClick={() => handleDeleteDoc(doc.Id)}
                                >حذف</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div >
                );
            },
        },
    ];
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