import React, { useEffect, useState } from 'react';
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
import { MoreHorizontalIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAndUpdateExercise, deleteExercise, fetchExercises } from '../../features/exercises/exercisesActions';
import { fetchDocs } from '../../features/docs/docsActions';
import { fetchContents } from '../../features/contents/contentsActions';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const CourseExercises = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { exercises, loading, error } = useSelector((state) => state.exercises);

    // فیلترها
    const [courseFilter, setCourseFilter] = useState('');
    const [chapterFilter, setChapterFilter] = useState('');
    const [sessionFilter, setSessionFilter] = useState('');

    // داده‌های فیلترها
    const [coursesList, setCoursesList] = useState([]);
    const [chaptersList, setChaptersList] = useState([]);
    const [sessionsList, setSessionsList] = useState([]);

    // مرحله 1: گرفتن دوره‌ها
    useEffect(() => {
        dispatch(fetchDocs()).then((res) => {
            setCoursesList(res.payload || []);
        });
    }, [dispatch]);

    // مرحله 2: گرفتن سرفصل‌ها وقتی دوره انتخاب شد
    useEffect(() => {
        if (!courseFilter) {
            setChaptersList([]);
            setSessionsList([]);
            setChapterFilter('');
            setSessionFilter('');
            return;
        }

        dispatch(fetchContents({ CourseId: courseFilter })).then((res) => {
            const contents = res.payload || [];
            setChaptersList(contents.filter(c => c.ParentId === null));
            setSessionsList([]);
            setSessionFilter('');
        });
    }, [courseFilter, dispatch]);

    // مرحله 3: گرفتن جلسات وقتی سرفصل انتخاب شد
    useEffect(() => {
        if (!chapterFilter) {
            setSessionsList([]);
            setSessionFilter('');
            return;
        }

        dispatch(fetchContents({ ParentId: chapterFilter })).then((res) => {
            const contents = res.payload || [];
            setSessionsList(contents);
        });
    }, [chapterFilter, dispatch]);

    // گرفتن تمرین‌ها
    useEffect(() => {
        const params = { "@PageSize": 10 };

        if (courseFilter) params["@CourseId"] = courseFilter;
        if (chapterFilter) params["@SessionId"] = chapterFilter;
        if (sessionFilter) params["@ContentId"] = sessionFilter;

        dispatch(fetchExercises(params));
    }, [dispatch, courseFilter, chapterFilter, sessionFilter]);


    const changeStatus = async (exercise) => {
        const data = {
            "@Id": exercise.Id,
            "@Title": exercise.Title,
            "@SortIndex": exercise.SortIndex,
            "@Disabled": !exercise.Disabled ? 1 : 0,
            "@ContentId": exercise.ContentId,
            "@CourseId": exercise.CourseId,
            "@SessionId": exercise.SessionId
        };

        console.log(exercise)
        try {
            const resultAction = await dispatch(createAndUpdateExercise(data));
            console.log(resultAction)
            if (createAndUpdateExercise.fulfilled.match(resultAction)) {
                toast.success('تغییر وضعیت تمرین انجام شد');
                // Reload docs to reflect new state
                dispatch(fetchExercises({ "@PageSize": 20 }));
            } else {
                toast.error('خطا در تغییر وضعیت تمرین');
            }
        } catch (error) {
            toast.error(`خطا در تغییر وضعیت تمرین: ${error.message}`);
        }
    };

    const MySwal = withReactContent(Swal);

    const handleDeleteExercise = async (id) => {
        const confirm = await MySwal.fire({
            title: 'آیا از حذف این تمرین مطمئن هستید؟',
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
            const resultAction = await dispatch(deleteExercise(data));

            if (resultAction.type === deleteExercise.fulfilled.type) {
                toast.success('تمرین با موفقیت حذف شد');
                dispatch(fetchExercises({ "@PageSize": 20 }));
            } else {
                toast.error('خطا در حذف تمرین');
            }
        } catch (error) {
            toast.error(`خطا در حذف تمرین: ${error.message}`);
        }
    };


    // ستون‌ها
    const columns = [
        {
            accessorKey: 'Id',
            header: 'ردیف',
            cell: ({ row }) => <div className="text-center">{row.getValue("Id")}</div>,
        },
        {
            accessorKey: 'Title',
            header: 'عنوان',
            cell: ({ row }) => <div className="text-center">{row.getValue('Title')}</div>,
        },
        {
            accessorKey: 'CourseTitle',
            header: 'دوره',
            cell: ({ row }) => <div className="text-center">{row.getValue('CourseTitle')}</div>,
        },
        {
            accessorKey: 'SessionTitle',
            header: 'فصل',
            cell: ({ row }) => <div className="text-center">{row.getValue('SessionTitle')}</div>,
        },
        {
            accessorKey: 'ChapterTitle',
            header: 'جلسه',
            cell: ({ row }) => <div className="text-center">{row.getValue('ChapterTitle')}</div>,
        },
        {
            accessorKey: 'Level',
            header: 'سطح',
            cell: ({ row }) => {
                const levelStyles = {
                    0: { text: 'آسان', color: 'green' },
                    1: { text: 'متوسط', color: 'orange' },
                    2: { text: 'دشوار', color: 'red' },
                    3: { text: 'چالش‌برانگیز', color: 'purple' }
                };
                const level = levelStyles[row.getValue('Level')] ?? { text: 'نامشخص', color: 'gray' };
                return <div className="text-center" style={{ color: level.color, fontWeight: 'bold' }}>{level.text}</div>;
            },
        },
        {
            accessorKey: 'Disabled',
            header: 'وضعیت',
            cell: ({ row }) => {
                const disabled = row.getValue('Disabled');
                const disabledMap = {
                    0: { text: 'فعال', bg: 'bg-green-200', textColor: 'text-green-800' },
                    1: { text: 'غیرفعال', bg: 'bg-red-200', textColor: 'text-red-800' }
                };
                const current = disabledMap[disabled] ?? { text: 'نامشخص', bg: 'bg-gray-200', textColor: 'text-gray-800' };
                return <span className={`px-2 py-1 rounded block mx-auto w-fit text-xs ${current.bg} ${current.textColor}`}>{current.text}</span>;
            },
        },
        {
            id: "actions",
            enableHiding: false,
            header: () => <div className="text-center">عملیات</div>,
            cell: ({ row }) => {
                const exercise = row.original;
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

                                {/* <DropdownMenuItem>
                                            <Link to={`/Documents/${doc.Id}/exercises`}>تمرینات</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to={doc.Id.toString()}>مشاهده</Link>
                                        </DropdownMenuItem> */}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span
                                        className={`${exercise.Disabled ? "text-green-500" : "text-red-500"}`}
                                        onClick={() => changeStatus(exercise)}
                                    >{exercise.Disabled ? "فعال کردن" : "غیرفعال کردن"}
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to={`edit/${exercise.Id}`}>ویرایش</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500"
                                    onClick={() => handleDeleteExercise(exercise.Id)}
                                >حذف</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div >
                );
            },
        },
    ];

    if (error) return <p>خطا: {error}</p>;

    return (
        <>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">لیست تمرین‌ها</h1>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('new')}>
                    ایجاد تمرین
                </Button>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
                {/* Select دوره */}
                <Select onValueChange={(val) => setCourseFilter(val)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="انتخاب دوره" />
                    </SelectTrigger>
                    <SelectContent>
                        {coursesList.map(c => <SelectItem key={c.Id} value={c.Id}>{c.Title}</SelectItem>)}
                    </SelectContent>
                </Select>

                {/* Select سرفصل */}
                <Select
                    disabled={!courseFilter}
                    onValueChange={(val) => setChapterFilter(val)}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="انتخاب سرفصل" />
                    </SelectTrigger>
                    <SelectContent>
                        {chaptersList.map(ch => <SelectItem key={ch.Id} value={ch.Id}>{ch.Title}</SelectItem>)}
                    </SelectContent>
                </Select>

                {/* Select جلسه */}
                <Select
                    disabled={!chapterFilter}
                    onValueChange={(val) => setSessionFilter(val)}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="انتخاب جلسه" />
                    </SelectTrigger>
                    <SelectContent>
                        {sessionsList.map(s => <SelectItem key={s.Id} value={s.Id}>{s.Title}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
                </div>
            ) : (
                <DataTable data={exercises} columns={columns} filters={[]} />
            )}
        </>
    );
};

export default CourseExercises;
