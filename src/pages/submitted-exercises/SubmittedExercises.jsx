import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { BookOpen, Check, Circle, MoreHorizontalIcon, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    createAndUpdateExercise,
    deleteExercise,
    fetchExercises,
    fetchSubmittedExercises,
} from '../../features/exercises/exercisesActions';
import { fetchDocs, fetchDocsForDropdown } from '../../features/docs/docsActions';
import { fetchContents, fetchContentsForDropdown } from '../../features/contents/contentsActions';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const SubmittedExercises = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { submittedExercises: exercises, loading, error } = useSelector((state) => state.exercises);
    console.log(exercises)
    // فیلترها
    const [courseFilter, setCourseFilter] = useState('');
    const [chapterFilter, setChapterFilter] = useState('');
    const [sessionFilter, setSessionFilter] = useState('');

    // داده‌های فیلترها
    const [coursesList, setCoursesList] = useState([]);
    const [chaptersList, setChaptersList] = useState([]);
    const [sessionsList, setSessionsList] = useState([]);

    // گرفتن دوره‌ها
    useEffect(() => {
        dispatch(fetchDocsForDropdown()).then((res) => {
            setCoursesList(res.payload || []);
        });
    }, [dispatch]);

    // گرفتن سرفصل‌ها وقتی دوره انتخاب شد
    useEffect(() => {
        if (!courseFilter) {
            setChaptersList([]);
            setSessionsList([]);
            setChapterFilter('');
            setSessionFilter('');
            return;
        }

        dispatch(fetchContentsForDropdown({ CourseId: courseFilter })).then((res) => {
            const contents = res.payload || [];
            setChaptersList(contents.filter(c => c.ParentId === null));
            setSessionsList([]);
            setSessionFilter('');
        });
    }, [courseFilter, dispatch]);
    console.log(exercises)
    // گرفتن جلسات وقتی سرفصل انتخاب شد
    useEffect(() => {
        if (!chapterFilter) {
            setSessionsList([]);
            setSessionFilter('');
            return;
        }

        dispatch(fetchContentsForDropdown({ ParentId: chapterFilter })).then((res) => {
            setSessionsList(res.payload || []);
        });
    }, [chapterFilter, dispatch]);

    // واکشی تمرین‌ها
    useEffect(() => {
        const params = {};
        if (courseFilter) params["@CourseId"] = courseFilter;
        if (chapterFilter) params["@SessionId"] = chapterFilter;
        if (sessionFilter) params["@ContentId"] = sessionFilter;

        dispatch(fetchSubmittedExercises(params));
    }, [dispatch, courseFilter, chapterFilter, sessionFilter]);

    const MySwal = withReactContent(Swal);

    const changeStatus = async (exercise) => {
        const data = {
            "@Id": exercise.Id, "@Disabled": !exercise.Disabled ? 1 : 0,

        };

        try {
            const resultAction = await dispatch(createAndUpdateExercise(data));
            if (createAndUpdateExercise.fulfilled.match(resultAction)) {
                toast.success('تغییر وضعیت تمرین انجام شد');
                dispatch(fetchSubmittedExercises());
            } else {
                toast.error('خطا در تغییر وضعیت تمرین');
            }
        } catch (error) {
            toast.error(`خطا در تغییر وضعیت تمرین: ${error.message}`);
        }
    };

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

        try {
            const resultAction = await dispatch(deleteExercise({ "@Id": id }));
            if (resultAction.type === deleteExercise.fulfilled.type) {
                toast.success('تمرین با موفقیت حذف شد');
                dispatch(fetchSubmittedExercises());
            } else {
                toast.error('خطا در حذف تمرین');
            }
        } catch (error) {
            toast.error(`خطا در حذف تمرین: ${error.message}`);
        }
    };

    const columns = [
        { accessorKey: 'Id', header: 'ردیف', cell: ({ row }) => <div className="text-center font-medium">{row.index + 1}</div> },
        { accessorKey: 'Title', header: 'عنوان', cell: ({ row }) => <div className="text-center font-medium">{row.getValue('Title')}</div> },
        { accessorKey: 'CourseTitle', header: 'دوره', cell: ({ row }) => <div className="text-center">{row.getValue('CourseTitle')}</div> },
        { accessorKey: 'SessionTitle', header: 'فصل', cell: ({ row }) => <div className="text-center">{row.getValue('SessionTitle')}</div> },
        { accessorKey: 'ChapterTitle', header: 'جلسه', cell: ({ row }) => <div className="text-center">{row.getValue('ChapterTitle')}</div> },
        {
            accessorKey: 'Level',
            header: 'سطح',
            cell: ({ row }) => {
                const levels = { 1: ['آسان', 'text-green-600'], 2: ['متوسط', 'text-yellow-600'], 3: ['دشوار', 'text-red-600'], 4: ['چالش‌برانگیز', 'text-purple-600'] };
                const [text, color] = levels[row.getValue('Level')] || ['نامشخص', 'text-gray-400'];
                return <div className={`text-center font-bold ${color}`}>{text}</div>;
            }
        },
        {
            accessorKey: 'UserStatus',
            header: 'وضعیت تمرین',
            cell: ({ row }) => {
                const val = row.getValue('UserStatus') ?? 0;
                switch (val) {
                    case 2: return <BookOpen className="text-yellow-500 w-6 h-6 mx-auto" />;
                    case 3: return <Check className="text-green-500 w-6 h-6 mx-auto" />;
                    case 4: return <X className="text-red-500 w-6 h-6 mx-auto" />;
                    default: return <Circle className="text-gray-400 w-6 h-6 mx-auto" strokeWidth={2} />;
                }
            }
        },
        {
            accessorKey: 'UserScore',
            header: 'نمره',
            cell: ({ row }) => {
                const val = row.getValue('UserScore');
                return <div className={`text-center font-semibold ${val === null ? 'text-gray-400' : val < 70 ? 'text-red-600' : 'text-green-600'
                    }`}>
                    {val ?? '-'}
                </div>;
            }
        },
        {
            accessorKey: 'Disabled',
            header: 'وضعیت',
            cell: ({ row }) => {
                const val = row.getValue('Disabled');
                const text = val ? 'غیرفعال' : 'فعال';
                const bg = val ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
                return <span className={`px-3 py-1 rounded-full text-center block mx-auto text-sm font-medium ${bg}`}>{text}</span>;
            }
        },
        {
            id: 'actions',
            header: 'عملیات',
            cell: ({ row }) => {
                const exercise = row.original;
                return (
                    <div className="flex justify-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontalIcon className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem><Link to={`${exercise.Id}`}>مشاهده</Link></DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeStatus(exercise)}>{exercise.Disabled ? 'فعال کردن' : 'غیرفعال کردن'}</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteExercise(exercise.Id)}>حذف</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            }
        }
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
                <Select onValueChange={(val) => setCourseFilter(val)}>
                    <SelectTrigger className="w-[200px]"><SelectValue placeholder="انتخاب دوره" /></SelectTrigger>
                    <SelectContent>
                        {coursesList.map(c => <SelectItem key={c.Id} value={c.Id}>{c.Title}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select disabled={!courseFilter} onValueChange={(val) => setChapterFilter(val)}>
                    <SelectTrigger className="w-[200px]"><SelectValue placeholder="انتخاب سرفصل" /></SelectTrigger>
                    <SelectContent>
                        {chaptersList.map(ch => <SelectItem key={ch.Id} value={ch.Id}>{ch.Title}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select disabled={!chapterFilter} onValueChange={(val) => setSessionFilter(val)}>
                    <SelectTrigger className="w-[200px]"><SelectValue placeholder="انتخاب جلسه" /></SelectTrigger>
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

export default SubmittedExercises;
