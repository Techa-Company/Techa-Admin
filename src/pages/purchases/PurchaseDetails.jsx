import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Wallet, Gift, User, Mail, Calendar, ExternalLink } from 'lucide-react';

const purchase = {
    id: 1,
    courseTitle: 'آموزش React پیشرفته',
    buyerName: 'علی کریمی',
    buyerEmail: 'ali@example.com',
    purchaseDate: '1403/02/15',
    price: 1200000,
    discount: 200000,
    finalAmount: 1000000,
    status: 'موفق',
    paymentStatus: 'پرداخت شده',
    transactionId: 'TRX-001234',
};

const statusColor = {
    موفق: 'bg-emerald-500/20 text-emerald-600',
    ناموفق: 'bg-rose-500/20 text-rose-600',
    'در حال بررسی': 'bg-amber-500/20 text-amber-600',
};

const paymentColor = {
    'پرداخت شده': 'bg-emerald-500/20 text-emerald-600',
    'لغو شده': 'bg-rose-500/20 text-rose-600',
    'در انتظار پرداخت': 'bg-amber-500/20 text-amber-600',
};

const PurchaseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const StatusIcon = ({ status }) => {
        switch (status) {
            case 'موفق':
                return <CheckCircle className="w-4 h-4 ml-2" />;
            case 'ناموفق':
                return <AlertCircle className="w-4 h-4 ml-2" />;
            default:
                return <Clock className="w-4 h-4 ml-2" />;
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 px-4 lg:px-0">
            <div className="mb-8">
                <Button
                    variant="ghost"
                    className="mb-6 hover:bg-gray-100/50"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    بازگشت به لیست خریدها
                </Button>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center">
                        <Wallet className="w-8 h-8 ml-3 text-emerald-600" />
                        جزئیات تراکنش #{id}
                    </h1>
                    <Badge className="px-4 py-1.5 bg-gray-100/80 text-gray-600">
                        <Calendar className="w-4 h-4 ml-2" />
                        {purchase.purchaseDate}
                    </Badge>
                </div>
            </div>

            <Card className="shadow-2xl hover:shadow-none transition-shadow duration-300 border-gray-100/80">
                <CardContent className="p-8 space-y-6">
                    {/* بخش اطلاعات کاربر */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center text-gray-700">
                            <User className="w-5 h-5 ml-2" />
                            اطلاعات خریدار
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailItem
                                icon={<User className="w-5 h-5" />}
                                label="نام خریدار"
                                value={purchase.buyerName}
                            />
                            <DetailItem
                                icon={<Mail className="w-5 h-5" />}
                                label="ایمیل"
                                value={purchase.buyerEmail}
                                isLink
                            />
                        </div>
                    </div>

                    <Separator className="bg-gray-100/50" />

                    {/* بخش اطلاعات دوره */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center text-gray-700">
                            <ExternalLink className="w-5 h-5 ml-2" />
                            اطلاعات دوره
                        </h2>

                        <DetailItem
                            icon={<Wallet className="w-5 h-5" />}
                            label="عنوان دوره"
                            value={purchase.courseTitle}
                            className="text-emerald-600 font-medium"
                        />
                    </div>

                    <Separator className="bg-gray-100/50" />

                    {/* بخش مالی */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center text-gray-700">
                            <Wallet className="w-5 h-5 ml-2" />
                            جزئیات مالی
                        </h2>

                        <div className="space-y-3">
                            <DetailItem
                                label="مبلغ اصلی"
                                value={`${purchase.price.toLocaleString()} تومان`}
                                className="line-through text-gray-400"
                            />
                            <DetailItem
                                icon={<Gift className="w-5 h-5 text-rose-500" />}
                                label="تخفیف اعمال شده"
                                value={`-${purchase.discount.toLocaleString()} تومان`}
                                className="text-rose-500"
                            />
                            <DetailItem
                                label="مبلغ قابل پرداخت"
                                value={`${purchase.finalAmount.toLocaleString()} تومان`}
                                className="text-2xl font-bold text-emerald-600"
                            />
                        </div>
                    </div>

                    <Separator className="bg-gray-100/50" />

                    {/* بخش وضعیت‌ها */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-500">وضعیت تراکنش</h3>
                            <Badge className={`${statusColor[purchase.status]} px-4 py-2 rounded-lg`}>
                                <StatusIcon status={purchase.status} />
                                {purchase.status}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-500">وضعیت پرداخت</h3>
                            <Badge className={`${paymentColor[purchase.paymentStatus]} px-4 py-2 rounded-lg`}>
                                {purchase.paymentStatus}
                            </Badge>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <h3 className="text-sm font-medium text-gray-500">شناسه پرداخت</h3>
                            <div className="flex items-center bg-gray-50/50 px-4 py-2.5 rounded-lg border border-gray-100">
                                <code className="font-mono text-gray-700">{purchase.transactionId}</code>
                                <Button variant="ghost" size="sm" className="mr-auto px-2 hover:bg-gray-100">
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// کامپوننت جزئیات آیتم
const DetailItem = ({
    icon,
    label,
    value,
    className = '',
    isLink = false
}) => (
    <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/30 transition-colors">
        <div className="flex items-center">
            {icon && <span className="text-gray-400">{icon}</span>}
            <span className="text-sm text-gray-500 ml-2">{label}</span>
        </div>
        {isLink ? (
            <a
                href={`mailto:${value}`}
                className={`text-blue-600 hover:underline ${className}`}
            >
                {value}
            </a>
        ) : (
            <span className={`text-gray-700 ${className}`}>
                {value}
            </span>
        )}
    </div>
);

export default PurchaseDetails;