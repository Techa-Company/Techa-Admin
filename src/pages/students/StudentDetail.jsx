"use client"
import { useState } from 'react';
import { RadarChart, PolarAngleAxis, PolarGrid, Radar, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from '../../components/common/DataTable';

const coderDetailData = {
    profile: {
        name: 'رامین جوشنگ',
        level: 'سطح ۳ - پیشرفته',
        joinDate: '1402/05/15',
        lastActive: '۲ ساعت پیش',
        avatar: '/assets/images/teacher.jpeg',
        languages: ['Python', 'JavaScript', 'TypeScript', 'Dart', 'Go', 'Rust', 'Kotlin'],
        techStack: ['Django', 'React', 'Flutter', 'Docker', 'Kubernetes', 'GraphQL', 'Redis']
    },
    metrics: {
        totalPoints: 3458,
        rank: 28,
        accuracy: 93.7,
        avgResponseTime: '1.4 ساعت'
    },
    skills: [
        { skill: 'HTML CSS', score: 95 },
        { skill: 'JavaScript', score: 88 },
        { skill: 'Tailwind', score: 82 },
        { skill: 'React', score: 78 },
        { skill: 'TypeScript', score: 75 },
        // { skill: 'Docker', score: 70 },
        // { skill: 'Flutter', score: 65 },
        // { skill: 'Kubernetes', score: 60 },
        // { skill: 'GraphQL', score: 58 }
    ],
    exercises: [
        { id: 1, title: 'سیستم مدیریت کتابخانه', language: 'Python', difficulty: 'سخت', status: 'تایید شده', score: 98 },
        { id: 2, title: 'TODO App', language: 'React', difficulty: 'متوسط', status: 'در انتظار بررسی', score: null },
        { id: 3, title: 'الگوریتم مرتب‌سازی', language: 'Algorithms', difficulty: 'آسان', status: 'نیاز به اصلاح', score: 65 },
        { id: 4, title: 'اپلیکیشن چت بلادرنگ', language: 'Flutter', difficulty: 'سخت', status: 'تایید شده', score: 90 },
        { id: 5, title: 'سیستم پرداخت آنلاین', language: 'Django', difficulty: 'سخت', status: 'تایید شده', score: 95 },
        { id: 6, title: 'پیاده‌سازی REST API', language: 'Go', difficulty: 'متوسط', status: 'تایید شده', score: 85 },
        { id: 7, title: 'طراحی پایگاه داده رابطه‌ای', language: 'Database', difficulty: 'متوسط', status: 'تایید شده', score: 80 },
        { id: 8, title: 'تست واحد و یکپارچه‌سازی', language: 'Testing', difficulty: 'متوسط', status: 'نیاز به اصلاح', score: 70 }
    ],
    exams: [
        { id: 1, title: 'تعیین سطح پیشرفته', date: '1403/02/15', score: 92, status: 'تکمیل شده' },
        { id: 2, title: 'بررسی فنی پایتون', date: '1403/03/01', score: 87, status: 'تکمیل شده' },
        { id: 3, title: 'آزمون React Hooks', date: '1403/03/20', score: null, status: 'در انتظار' },
        { id: 4, title: 'آزمون مفاهیم Docker', date: '1403/04/05', score: 80, status: 'تکمیل شده' },
        { id: 5, title: 'آزمون الگوریتم‌های پیشرفته', date: '1403/04/15', score: 88, status: 'تکمیل شده' },
        { id: 6, title: 'آزمون امنیت نرم‌افزار', date: '1403/04/22', score: null, status: 'در انتظار' }
    ],
    tickets: [
        { id: 1, title: 'مشکل در کامپایل پروژه', category: 'فنی', status: 'پاسخ داده شده', date: '1403/03/25' },
        { id: 2, title: 'درخواست تمدید ددلاین', category: 'اداری', status: 'در حال بررسی', date: '1403/03/27' },
        { id: 3, title: 'بهبود مستندات API', category: 'فنی', status: 'باز', date: '1403/04/10' },
        { id: 4, title: 'پیشنهاد برای بهینه‌سازی کد', category: 'فنی', status: 'پاسخ داده شده', date: '1403/04/15' },
        { id: 5, title: 'درخواست دسترسی به منابع', category: 'اداری', status: 'بسته شده', date: '1403/04/18' }
    ]
};

// ستون‌های جدول تمرین‌ها
const exerciseColumns = [
    {
        accessorKey: "id",
        header: "ردیف",
        cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>
    },
    {
        accessorKey: "title",
        header: "عنوان تمرین",
        cell: ({ row }) => <div className="text-center">{row.getValue("title")}</div>
    },
    {
        accessorKey: "language",
        header: "زبان",
        cell: ({ row }) => (
            <div className="text-center">
                <Badge variant="outline">{row.getValue("language")}</Badge>
            </div>
        )
    },
    {
        accessorKey: "difficulty",
        header: "سطح دشواری",
        cell: ({ row }) => {
            const difficulty = row.getValue("difficulty");
            return (
                <div className="text-center">
                    {difficulty === 'آسان' ? (
                        <Badge className="bg-green-100 text-green-800">{difficulty}</Badge>
                    ) : difficulty === 'متوسط' ? (
                        <Badge className="bg-amber-100 text-amber-800">{difficulty}</Badge>
                    ) : (
                        <Badge className="bg-red-100 text-red-800">{difficulty}</Badge>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className="text-center">
                    {status === 'تایید شده' ? (
                        <Badge className="bg-blue-100 text-blue-800">{status}</Badge>
                    ) : status === 'نیاز به اصلاح' ? (
                        <Badge className="bg-red-100 text-red-800">{status}</Badge>
                    ) : (
                        <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: "score",
        header: "امتیاز",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("score") || '-'}</div>
        )
    },
    {
        id: "actions",
        enableHiding: false,
        header: "عملیات",
        cell: () => (
            <div className="text-center">
                <Button variant="outline" size="sm">
                    مشاهده فیدبک
                </Button>
            </div>
        )
    }
];

// ستون‌های جدول آزمون‌ها
const examColumns = [
    {
        accessorKey: "id",
        header: "ردیف",
        cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>
    },
    {
        accessorKey: "title",
        header: "عنوان آزمون",
        cell: ({ row }) => <div className="text-center">{row.getValue("title")}</div>
    },
    {
        accessorKey: "date",
        header: "تاریخ",
        cell: ({ row }) => <div className="text-center">{row.getValue("date")}</div>
    },
    {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className="text-center">
                    {status === 'تکمیل شده' ? (
                        <Badge className="bg-green-100 text-green-800">{status}</Badge>
                    ) : (
                        <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: "score",
        header: "امتیاز",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("score") || '-'}</div>
        )
    },
    {
        id: "actions",
        enableHiding: false,
        header: "جزییات",
        cell: () => (
            <div className="text-center">
                <Button variant="outline" size="sm">
                    مشاهده تحلیل عملکرد
                </Button>
            </div>
        )
    }
];

// ستون‌های جدول تیکت‌ها
// ستون‌های جدول تیکت‌ها
const ticketColumns = [
    {
        accessorKey: "id",
        header: "ردیف",
        cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>
    },
    {
        accessorKey: "title",
        header: "موضوع",
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("title")}</div>
    },
    {
        accessorKey: "category",
        header: "دسته‌بندی",
        cell: ({ row }) => (
            <div className="text-center">
                <Badge variant="outline">{row.getValue("category")}</Badge>
            </div>
        )
    },
    {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <div className="text-center">
                    {status === 'پاسخ داده شده' ? (
                        <Badge className="bg-green-100 text-green-800">{status}</Badge>
                    ) : status === 'بسته شده' ? (
                        <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
                    ) : status === 'در حال بررسی' ? (
                        <Badge className="bg-amber-100 text-amber-800">{status}</Badge>
                    ) : (
                        <Badge className="bg-blue-100 text-blue-800">{status}</Badge>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: "date",
        header: "تاریخ",
        cell: ({ row }) => <div className="text-center">{row.getValue("date")}</div>
    },
    {
        id: "actions",
        enableHiding: false,
        header: "عملیات",
        cell: () => (
            <div className="text-center">
                <Button variant="outline" size="sm">
                    مشاهده مکالمه
                </Button>
            </div>
        )
    }
];

export default function CoderDetailPage() {
    const [activeTab, setActiveTab] = useState('exercises');

    return (
        <div className=" mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* سایدبار اطلاعات کاربری */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="sticky top-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={coderDetailData.profile.avatar} />
                                <AvatarFallback>CA</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold mb-2">{coderDetailData.profile.name}</h2>
                            <Badge variant="outline" className="mb-4 bg-purple-100 text-purple-800">
                                {coderDetailData.profile.level}
                            </Badge>

                            <div className="w-full space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">امتیاز کل</p>
                                    <p className="text-2xl font-bold">{coderDetailData.metrics.totalPoints}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">رتبه در سیستم</p>
                                    <p className="text-2xl font-bold">#{coderDetailData.metrics.rank}</p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">زبان‌های مسلط</p>
                                    <div className="flex flex-wrap gap-2">
                                        {coderDetailData.profile.languages.map(lang => (
                                            <Badge key={lang} variant="outline">{lang}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">تکنولوژی‌ها</p>
                                    <div className="flex flex-wrap gap-2">
                                        {coderDetailData.profile.techStack.map(tech => (
                                            <Badge key={tech} variant="outline">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">مهارت‌ها</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={coderDetailData.skills}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="skill" />
                                <Tooltip />
                                <Radar
                                    dataKey="score"
                                    stroke="#3B82F6"
                                    fill="#3B82F6"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* محتوای اصلی */}
            <div className="lg:col-span-3 space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4">
                        <TabsTrigger value="exercises">تمرین‌ها ({coderDetailData.exercises.length})</TabsTrigger>
                        <TabsTrigger value="exams">آزمون‌ها ({coderDetailData.exams.length})</TabsTrigger>
                        <TabsTrigger value="tickets">تیکت‌ها ({coderDetailData.tickets.length})</TabsTrigger>
                        <TabsTrigger value="activity">فعالیت‌ها</TabsTrigger>
                    </TabsList>

                    <TabsContent value="exercises">
                        <Card className="px-5">
                            <ScrollArea >
                                <DataTable
                                    data={coderDetailData.exercises}
                                    columns={exerciseColumns}
                                    filters={[
                                        {
                                            value: "title",
                                            placeholder: "جستجو در عنوان تمرین"
                                        },
                                        {
                                            value: "language",
                                            placeholder: "فیلتر بر اساس زبان"
                                        }
                                    ]}
                                />
                            </ScrollArea>
                        </Card>
                    </TabsContent>

                    <TabsContent value="exams">
                        <Card className="px-5">
                            <ScrollArea >
                                <DataTable
                                    data={coderDetailData.exams}
                                    columns={examColumns}
                                    filters={[
                                        {
                                            value: "title",
                                            placeholder: "جستجو در عنوان آزمون"
                                        }
                                    ]}
                                />
                            </ScrollArea>
                        </Card>
                    </TabsContent>

                    <TabsContent value="tickets">
                        <Card className="px-5">
                            <ScrollArea >
                                <DataTable
                                    data={coderDetailData.tickets}
                                    columns={ticketColumns}
                                    filters={[
                                        {
                                            value: "title",
                                            placeholder: "جستجو در موضوع تیکت"
                                        },
                                        {
                                            value: "category",
                                            placeholder: "فیلتر بر اساس دسته"
                                        }
                                    ]}
                                />
                            </ScrollArea>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* بخش پیشرفت دوره‌ها */}
                <Card >
                    <CardHeader>
                        <CardTitle>پیشرفت دوره‌های فعال</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>دوره React پیشرفته</span>
                                <span>78%</span>
                            </div>
                            <Progress value={78} className="h-3" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>آموزش Python برای هوش مصنوعی</span>
                                <span>45%</span>
                            </div>
                            <Progress value={45} className="h-3" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}