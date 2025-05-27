import React from 'react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/common/DataTable';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
    {
        id: 1,
        courseTitle: "آموزش React پیشرفته",
        buyerName: "علی کریمی",
        purchaseDate: "1403/02/15",
        price: 1200000,
        discount: 200000,
        finalAmount: 1000000,
        status: "موفق",
        paymentStatus: "پرداخت شده",
        transactionId: "TRX-001234",
    },
    {
        id: 2,
        courseTitle: "دوره جامع Next.js",
        buyerName: "زهرا مرادی",
        purchaseDate: "1403/01/10",
        price: 1500000,
        discount: 0,
        finalAmount: 1500000,
        status: "ناموفق",
        paymentStatus: "لغو شده",
        transactionId: "TRX-001235",
    },
    {
        id: 3,
        courseTitle: "مبانی TypeScript",
        buyerName: "مهدی حسینی",
        purchaseDate: "1402/12/20",
        price: 900000,
        discount: 100000,
        finalAmount: 800000,
        status: "در حال بررسی",
        paymentStatus: "در انتظار پرداخت",
        transactionId: "TRX-001236",
    },
];

const columns = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">ردیف</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        accessorKey: "courseTitle",
        header: () => <div className="text-center">عنوان دوره</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("courseTitle")}</div>,
    },
    {
        accessorKey: "buyerName",
        header: () => <div className="text-center">نام خریدار</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("buyerName")}</div>,
    },
    {
        accessorKey: "purchaseDate",
        header: () => <div className="text-center">زمان خرید</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("purchaseDate")}</div>,
    },
    {
        accessorKey: "price",
        header: () => <div className="text-center">مبلغ (تومان)</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("price").toLocaleString()}</div>,
    },
    {
        accessorKey: "discount",
        header: () => <div className="text-center">تخفیف (تومان)</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("discount").toLocaleString()}</div>,
    },
    {
        accessorKey: "finalAmount",
        header: () => <div className="text-center">مبلغ نهایی (تومان)</div>,
        cell: ({ row }) => <div className="text-center font-semibold">{row.getValue("finalAmount").toLocaleString()}</div>,
    },
    {
        accessorKey: "paymentStatus",
        header: () => <div className="text-center">وضعیت پرداخت</div>,
        cell: ({ row }) => {
            const status = row.getValue("paymentStatus");
            const colorClass =
                status === "پرداخت شده" ? "bg-green-200 text-green-800" :
                    status === "لغو شده" ? "bg-red-200 text-red-800" :
                        "bg-yellow-200 text-yellow-800";
            return (
                <div className="text-center">
                    <span className={`px-2 py-1 rounded text-xs ${colorClass}`}>
                        {status}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "transactionId",
        header: () => <div className="text-center">شناسه پرداخت</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("transactionId")}</div>,
    },
    {
        id: "actions",
        header: () => <div className="text-center">عملیات</div>,
        cell: ({ row }) => {
            const purchase = row.original;
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
                            <DropdownMenuItem asChild>
                                <Link to={`/purchases/${purchase.id}`}>جزئیات بیشتر</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => alert(`بازپرداخت برای ${purchase.buyerName}`)}>
                                بازپرداخت
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

const Purchases = () => {
    return (
        <>
            <div className='mb-2 flex items-center justify-between space-y-2'>
                <h1 className='text-2xl font-bold tracking-tight'>لیست خریدها</h1>
                <div className='flex items-center gap-3'></div>
            </div>

            <DataTable
                data={data}
                columns={columns}
                filters={[
                    { value: "courseTitle", placeholder: "جستجو در عنوان دوره" },
                    { value: "buyerName", placeholder: "جستجو در نام خریدار" },
                    { value: "transactionId", placeholder: "جستجو در شناسه پرداخت" }
                ]}
            />
        </>
    );
};

export default Purchases;
