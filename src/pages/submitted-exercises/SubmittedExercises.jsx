import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
    {
        id: 1,
        title: "تمرین اول",
        exerciseNumber: 1,
        chapter: "مقدمات React",
        course: "آموزش مقدماتی React",
        status: "تکمیل شده",
        studentName: "علی رضایی",
        score: 18,
    },
    {
        id: 2,
        title: "تمرین دوم",
        exerciseNumber: 2,
        chapter: "مقدمات React",
        course: "آموزش مقدماتی React",
        status: "در حال انجام",
        studentName: "زهرا حسینی",
        score: null,
    },
    {
        id: 3,
        title: "تمرین سوم",
        exerciseNumber: 1,
        chapter: "جاوااسکریپت پیشرفته",
        course: "دوره کامل جاوااسکریپت",
        status: "تکمیل شده",
        studentName: "سعید کریمی",
        score: 20,
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
        header: () => <div className="text-center">عنوان تمرین</div>,
        cell: ({ row }) => <Link to={row.getValue("id").toString()} className="text-center block">{row.getValue("title")}</Link>,
    },
    {
        accessorKey: "exerciseNumber",
        header: () => <div className="text-center">شماره تمرین</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("exerciseNumber")}</div>,
    },
    {
        accessorKey: "chapter",
        header: () => <div className="text-center">سر فصل</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("chapter")}</div>,
    },
    {
        accessorKey: "course",
        header: () => <div className="text-center">دوره</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("course")}</div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">وضعیت</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className="text-center">
                    <span className={`px-2 py-1 rounded text-xs ${status === "تکمیل شده"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                        }`}>
                        {status}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "studentName",
        header: () => <div className="text-center">نام دانشجو</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("studentName")}</div>,
    },
    {
        accessorKey: "score",
        header: () => <div className="text-center">نمره دریافتی</div>,
        cell: ({ row }) => {
            const status = row.getValue("status");
            const score = row.getValue("score");
            return <div className="text-center">{status === "تکمیل شده" ? score : "-"}</div>;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-center">عملیات</div>,
        cell: ({ row }) => {
            const exercise = row.original;
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
                            <DropdownMenuItem onClick={() => alert(`ویرایش تمرین ${exercise.title}`)}>
                                ویرایش
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => alert(`حذف تمرین ${exercise.title}`)}>
                                حذف
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];



const SubmittedExercises = () => {

    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست تمرینات ارسالی</h1>
                <div className='flex items-center gap-3'>
                </div>
            </div>

            <DataTable data={data} columns={columns} filters={[{
                value: "title",
                placeholder: "عنوان"
            }]} />
        </>
    );
};

export default SubmittedExercises;