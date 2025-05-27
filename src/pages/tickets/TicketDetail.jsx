import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { ScrollArea } from '../../components/ui/scroll-area';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';
import {
    ArrowLeftIcon,
    MailIcon,
    ClockIcon,
    SettingsIcon,
    CheckCircleIcon,
    AlertCircleIcon,
    UserIcon,
    PhoneIcon,
    CreditCardIcon,
    StarIcon, TagIcon,
    ServerIcon,
    AlertTriangleIcon
} from 'lucide-react';

const data = [
    {
        id: 1,
        subject: "مشکل در ورود به حساب",
        category: "حساب کاربری",
        status: "باز",
        priority: "بالا",
        senderName: "مهدی احمدی",
        senderEmail: "mahdi@example.com",
        description: "هنگام ورود به حساب کاربری با خطای ۵۰۰ مواجه میشوم. لطفاً بررسی نمایید.",
        createdAt: "۱۴۰۳/۰۳/۲۰ - ۰۹:۱۵",
        updatedAt: "۱۴۰۳/۰۳/۲۰ - ۱۰:۴۵",
        replies: [
            {
                id: 1,
                author: "رامین جوشنگ",
                role: "کارشناس پشتیبانی",
                avatar: "/assets/images/user.jpeg",
                date: "۱۴۰۲/۰۳/۱۵ - ۱۰:۳۰",
                content: "<p>با سلام<br/>مشکل از سمت سرور شناسایی شد و در حال رفع می‌باشد. لطفاً یک ساعت دیگر مجدد تلاش کنید.</p>",
                isStaff: true
            }
        ]
    },
    // ... سایر داده‌ها
];
const relatedTickets = [
    { id: 2, subject: 'خطای پرداخت هنگام ثبت سفارش', status: 'باز' },
    { id: 3, subject: 'عدم دریافت ایمیل فعال‌سازی', status: 'در حال بررسی' },
    { id: 4, subject: 'مشکل در بروزرسانی اطلاعات کاربری', status: 'بسته' }
];


const statusColors = {
    باز: "bg-red-100 text-red-800 border-red-200",
    "در حال بررسی": "bg-yellow-100 text-yellow-800 border-yellow-200",
    بسته: "bg-green-100 text-green-800 border-green-200"
};

const priorityColors = {
    بالا: "text-red-600",
    متوسط: "text-yellow-600",
    پایین: "text-gray-600"
};

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const ticket = data.find(t => t.id === parseInt(id));
    const [replyContent, setReplyContent] = useState('');
    const [currentStatus, setCurrentStatus] = useState(ticket?.status || "باز");

    const handleSubmitReply = () => {
        if (!replyContent) return;
        // منطق ذخیره پاسخ
        setReplyContent('');
    };

    if (!ticket) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <AlertCircleIcon className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">تیکت پیدا نشد!</h2>
            <Button onClick={() => navigate(-1)}>بازگشت به لیست تیکت‌ها</Button>
        </div>
    );

    return (
        <div className='flex'>

            <div className="flex-1 max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
                {/* هدر صفحه */}
                <div className="flex justify-between items-center mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="gap-2 hover:bg-blue-50"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        بازگشت
                    </Button>

                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <SettingsIcon className="h-4 w-4" />
                                    تغییر وضعیت
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {Object.keys(statusColors).map(status => (
                                    <DropdownMenuItem
                                        key={status}
                                        onSelect={() => setCurrentStatus(status)}
                                        className="cursor-pointer"
                                    >
                                        {status}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Badge className={`${statusColors[currentStatus]} border px-4 py-2 rounded-full`}>
                            {currentStatus}
                        </Badge>
                    </div>
                </div>

                {/* کارت اصلی تیکت */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                    <div className="flex gap-6 mb-8">
                        <Avatar className="h-16 w-16 border-2 border-blue-100">
                            <AvatarImage src="/assets/images/user.jpeg" />
                            <AvatarFallback className="bg-blue-100 text-blue-800 text-2xl">
                                {ticket.senderName[0]}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <h1 className="text-3xl font-bold text-gray-900">{ticket.subject}</h1>
                                <span className={`${priorityColors[ticket.priority]} font-medium`}>
                                    ⚡ {ticket.priority}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                    <span>{ticket.senderName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MailIcon className="h-5 w-5 text-gray-400" />
                                    <span>{ticket.senderEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="h-5 w-5 text-gray-400" />
                                    <span>ایجاد شده در: {ticket.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* محتوای تیکت */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                        <div className="prose max-w-none text-gray-700 text-lg">
                            {ticket.description}
                        </div>
                    </div>

                    {/* آمار کلی */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <div className="text-sm text-blue-600 mb-1">اولویت</div>
                            <div className="text-xl font-bold">{ticket.priority}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                            <div className="text-sm text-green-600 mb-1">آخرین بروزرسانی</div>
                            <div className="text-xl font-bold">{ticket.updatedAt}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                            <div className="text-sm text-purple-600 mb-1">دسته‌بندی</div>
                            <div className="text-xl font-bold">{ticket.category}</div>
                        </div>
                    </div>
                </div>

                {/* تاریخچه مکاتبات */}
                <ScrollArea className="h-[600px] rounded-2xl bg-white shadow-lg p-6 mb-8">
                    <div className="space-y-8">
                        {ticket.replies?.map((reply) => (
                            <div
                                key={reply.id}
                                className={`p-6 rounded-xl border ${reply.isStaff
                                    ? 'border-blue-100 bg-blue-50'
                                    : 'border-gray-100 bg-white'
                                    }`}
                            >
                                <div className="flex gap-4 mb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={reply.avatar} />
                                        <AvatarFallback className="bg-gray-100">
                                            {reply.author[0]}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold">{reply.author}</h3>
                                                <p className="text-sm text-gray-500">{reply.role}</p>
                                            </div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <span className="text-sm text-gray-500">
                                                            {reply.date}
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>زمان دقیق: {reply.date.split(' - ')[1]}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="prose max-w-none text-gray-700 pl-16"
                                    dangerouslySetInnerHTML={{ __html: reply.content }}
                                />

                                {reply.isStaff && (
                                    <div className="mt-4 pl-16 flex items-center gap-2 text-sm text-green-600">
                                        <CheckCircleIcon className="h-4 w-4" />
                                        <span>پاسخ رسمی پشتیبانی</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* بخش پاسخگویی */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <UserIcon className="h-8 w-8 text-blue-600" />
                        نوشتن پاسخ جدید
                    </h2>

                    <Editor
                        apiKey='your-api-key'
                        value={replyContent}
                        onEditorChange={setReplyContent}
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: `rtl ltr | undo redo | formatselect | bold italic | 
                        alignright aligncenter alignleft alignjustify | 
                        bullist numlist outdent indent | link image media | code`,
                            directionality: 'rtl',
                            content_style: `
                        body { 
                            font-family: Vazir, Tahoma, sans-serif; 
                            font-size: 16px;
                            line-height: 2;
                            }
                            p { margin: 0 0 1.5rem; }
                            `,
                            images_upload_handler: async (blobInfo) => {
                                // آپلود عکس به سرور
                            }
                        }}
                    />

                    <div className="mt-6 flex justify-between items-center">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>قبل از ارسال بررسی کنید:</span>
                            <Badge variant="outline" className="gap-2">
                                <CheckCircleIcon className="h-4 w-4" />
                                پاسخ تیکت بسته نخواهد شد
                            </Badge>
                        </div>

                        <Button
                            size="lg"
                            className="gap-2 px-8 py-5 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                            onClick={handleSubmitReply}
                        >
                            ارسال پاسخ
                            <MailIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
            <TicketSidebar ticket={ticket} />
        </div>
    );
};

export default TicketDetail;

const TicketSidebar = ({ ticket }) => {
    return (
        <div className="w-80 bg-gradient-to-b from-gray-50 to-white border-l border-gray-100 p-6 space-y-8">
            {/* هدر سایدبار */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🎫</span>
                <h3 className="font-bold text-lg">مشخصات تیکت</h3>
            </div>

            {/* کارت اطلاعات سریع */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="grid gap-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">شناسه:</span>
                        <Badge variant="outline">#{ticket.id}</Badge>
                    </div>
                    {/* <Separator /> */}

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">اولویت:</span>
                        <span className={`${priorityColors[ticket.priority]} font-medium`}>
                            {ticket.priority}
                        </span>
                    </div>
                    {/* <Separator /> */}

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">دسته‌بندی:</span>
                        <Badge variant="outline">{ticket.category}</Badge>
                    </div>
                    {/* <Separator /> */}

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">تاریخ ایجاد:</span>
                        <span className="text-gray-600">{ticket.createdAt}</span>
                    </div>
                    {/* <Separator /> */}

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">آخرین بروزرسانی:</span>
                        <span className="text-gray-600">{ticket.updatedAt}</span>
                    </div>
                </div>
            </div>

            {/* پروفایل کاربر */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="https://example.com/user-avatar.jpg" />
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                            {ticket.senderName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="font-semibold">{ticket.senderName}</h4>
                        <p className="text-sm text-gray-500">مشتری</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Button variant="outline" className="w-full gap-2">
                        <MailIcon className="h-4 w-4" />
                        ارسال ایمیل
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                        <PhoneIcon className="h-4 w-4" />
                        تماس تلفنی
                    </Button>
                </div>

                {/* <Separator className="my-4" /> */}

                <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                        <CreditCardIcon className="h-4 w-4" />
                        <span>۱۰ تیکت قبلی</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span>امتیاز کاربر: ۴.۸</span>
                    </div>
                </div>
            </div>

            {/* تیکت‌های مرتبط */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h4 className="font-semibold mb-3">تیکت‌های مرتبط</h4>
                <ScrollArea className="h-60">
                    {relatedTickets.map(ticket => (
                        <div
                            key={ticket.id}
                            className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-xs ${statusColors[ticket.status]} px-2 py-1 rounded-full`}>
                                    {ticket.status}
                                </span>
                                <p className="text-sm line-clamp-2">{ticket.subject}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* تگ‌ها */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h4 className="font-semibold mb-3">برچسب‌ها</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-2">
                        <TagIcon className="h-4 w-4" />
                        لاگین
                    </Badge>
                    <Badge variant="outline" className="gap-2">
                        <ServerIcon className="h-4 w-4" />
                        سرور
                    </Badge>
                    <Badge variant="outline" className="gap-2">
                        <AlertTriangleIcon className="h-4 w-4" />
                        خطای ۵۰۰
                    </Badge>
                </div>
            </div>
        </div>
    );
};