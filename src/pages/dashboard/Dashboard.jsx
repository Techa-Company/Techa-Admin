import React from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    ClipboardCheck,
    GraduationCap,
    ShoppingBag,
    Mail,
    FolderKanban
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
    // داده‌های نمونه برای نمودارها
    const enrollmentData = [
        { name: 'فروردین', enrollments: 45 },
        { name: 'اردیبهشت', enrollments: 52 },
        { name: 'خرداد', enrollments: 78 },
        { name: 'تیر', enrollments: 65 },
        { name: 'مرداد', enrollments: 89 },
        { name: 'شهریور', enrollments: 120 },
    ];

    const revenueData = [
        { name: 'فروردین', revenue: 12.5 },
        { name: 'اردیبهشت', revenue: 18.2 },
        { name: 'خرداد', revenue: 24.7 },
        { name: 'تیر', revenue: 19.8 },
        { name: 'مرداد', revenue: 28.4 },
        { name: 'شهریور', revenue: 35.1 },
    ];

    const courseDistribution = [
        { name: 'React', value: 35 },
        { name: 'JavaScript', value: 25 },
        { name: 'Node.js', value: 15 },
        { name: 'HTML/CSS', value: 12 },
        { name: 'Python', value: 8 },
        { name: 'دیگر', value: 5 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    // کارت‌های آماری
    const stats = [
        { title: "دوره‌های فعال", value: 24, icon: <BookOpen size={20} />, change: "+12%" },
        { title: "دانشجویان", value: 1243, icon: <Users size={20} />, change: "+8%" },
        { title: "فروش ماه", value: "۳۲,۵۰۰,۰۰۰ تومان", icon: <ShoppingBag size={20} />, change: "+18%" },
        { title: "آزمون‌های فعال", value: 18, icon: <ClipboardCheck size={20} />, change: "+5%" },
    ];

    // آخرین فعالیت‌ها
    const recentActivities = [
        { user: "علی محمدی", action: "ثبت‌نام در دوره React", time: "۲ ساعت پیش" },
        { user: "فاطمه احمدی", action: "خرید دوره HTML پیشرفته", time: "۵ ساعت پیش" },
        { user: "محمد رضایی", action: "ارسال تمرین پروژه نهایی", time: "دیروز" },
        { user: "زهرا حسینی", action: "تکمیل آزمون JavaScript", time: "دیروز" },
        { user: "سپیده کریمی", action: "دریافت گواهینامه دوره", time: "۲ روز پیش" },
    ];

    // دوره‌های پرطرفدار
    const popularCourses = [
        { name: "دوره جامع React", students: 342, progress: 85 },
        { name: "JavaScript پیشرفته", students: 287, progress: 78 },
        { name: "Node.js از صفر تا صد", students: 215, progress: 65 },
        { name: "طراحی وب واکنشگرا", students: 198, progress: 92 },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">داشبورد مدیریتی</h1>
                <p className="text-gray-600 mt-2">خلاصه عملکرد و آمار سیستم آموزشی</p>
            </div>

            {/* کارت‌های آماری */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                    <p className="text-xs text-green-500 mt-1">{stat.change} نسبت به ماه قبل</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    {stat.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* بخش نمودارها */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>ثبت‌نام‌های ماهانه</CardTitle>
                        <CardDescription>روند ثبت‌نام دانشجویان در ۶ ماه اخیر</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={enrollmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="enrollments" fill="#8884d8" name="تعداد ثبت‌نام" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>توزیع دوره‌ها بر اساس موضوع</CardTitle>
                        <CardDescription>پراکندگی دوره‌های آموزشی</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={courseDistribution}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {courseDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* بخش فروش و فعالیت‌ها */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>درآمد ماهانه (میلیون تومان)</CardTitle>
                        <CardDescription>روند درآمد حاصل از فروش دوره‌ها</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#00C49F" name="درآمد (میلیون تومان)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>آخرین فعالیت‌ها</CardTitle>
                        <CardDescription>فعالیت‌های اخیر کاربران</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <Users size={16} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">{activity.user}</p>
                                    <p className="text-sm text-gray-600">{activity.action}</p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full mt-2">مشاهده همه فعالیت‌ها</Button>
                    </CardContent>
                </Card>
            </div>

            {/* دوره‌های پرطرفدار */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>دوره‌های پرطرفدار</CardTitle>
                    <CardDescription>پربازدیدترین دوره‌های آموزشی</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {popularCourses.map((course, index) => (
                            <div key={index} className="flex items-center">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                <div className="ml-4 flex-1">
                                    <h4 className="font-medium">{course.name}</h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm text-gray-500">{course.students} دانشجو</span>
                                        <Badge variant="success" className="bg-green-100 text-green-800">
                                            فعال
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex items-center">
                                        <Progress value={course.progress} className="h-2 flex-1" />
                                        <span className="text-sm text-gray-500 ml-2">{course.progress}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button variant="outline">مشاهده همه دوره‌ها</Button>
                    </div>
                </CardContent>
            </Card>

            {/* خلاصه عملکرد */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>پشتیبانی و تیکت‌ها</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <Mail size={18} className="text-blue-500 mr-2" />
                                <span>تیکت‌های جدید</span>
                            </div>
                            <Badge variant="destructive">۱۲</Badge>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <Mail size={18} className="text-green-500 mr-2" />
                                <span>تیکت‌های پاسخ داده شده</span>
                            </div>
                            <Badge variant="success">۴۸</Badge>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <Mail size={18} className="text-yellow-500 mr-2" />
                                <span>در انتظار پاسخ کاربر</span>
                            </div>
                            <Badge variant="warning">۷</Badge>
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                            مدیریت تیکت‌ها
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>گزارشات سریع</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full flex justify-start">
                            <ClipboardCheck size={18} className="mr-2" />
                            گزارش آزمون‌ها
                        </Button>
                        <Button variant="outline" className="w-full flex justify-start">
                            <GraduationCap size={18} className="mr-2" />
                            گزارش گواهینامه‌ها
                        </Button>
                        <Button variant="outline" className="w-full flex justify-start">
                            <ShoppingBag size={18} className="mr-2" />
                            گزارش مالی
                        </Button>
                        <Button variant="outline" className="w-full flex justify-start">
                            <FolderKanban size={18} className="mr-2" />
                            گزارش محتواها
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;