"use client"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns-jalali';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function EditStudent() {
    const navigate = useNavigate();

    // داده‌های ثابت برای دانشجو
    const initialData = {
        id: '1',
        firstName: 'رامین',
        lastName: 'جوشنگ',
        mobile: '09123456789',
        email: 'amin.rezaei@example.com',
        nationalId: '1234567890',
        birthDate: new Date('2000-03-15'),
        isActive: true,
        resumeVisible: false
    };

    // حالت‌های فرم با داده‌های اولیه
    const [formData, setFormData] = useState(initialData);

    // مدیریت تغییرات فرم
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // اعتبارسنجی کد ملی
    const validateNationalId = (value) => {
        return /^\d{10}$/.test(value);
    };

    // اعتبارسنجی شماره موبایل
    const validateMobile = (value) => {
        return /^09\d{9}$/.test(value);
    };

    // ارسال فرم
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateNationalId(formData.nationalId)) {
            alert('کد ملی باید 10 رقم باشد');
            return;
        }

        if (!validateMobile(formData.mobile)) {
            alert('شماره موبایل باید با 09 شروع شده و 11 رقم باشد');
            return;
        }

        // شبیه‌سازی ارسال به API
        setTimeout(() => {
            navigate('/students');
        }, 1000);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    ویرایش دانشجو: {formData.firstName} {formData.lastName}
                </h1>
                <Button variant="outline" onClick={() => navigate("/students")}>
                    بازگشت به لیست دانشجویان
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* بخش اطلاعات اصلی */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">اطلاعات شخصی</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* نام */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName">نام<span className="text-red-500">*</span></Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* نام خانوادگی */}
                        <div className="space-y-2">
                            <Label htmlFor="lastName">نام خانوادگی<span className="text-red-500">*</span></Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* شماره تماس */}
                        <div className="space-y-2">
                            <Label htmlFor="mobile">شماره تماس<span className="text-red-500">*</span></Label>
                            <Input
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="09xxxxxxxxx"
                                required
                                pattern="09\d{9}"
                            />
                        </div>

                        {/* ایمیل */}
                        <div className="space-y-2">
                            <Label htmlFor="email">ایمیل<span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* کد ملی */}
                        <div className="space-y-2">
                            <Label htmlFor="nationalId">کد ملی<span className="text-red-500">*</span></Label>
                            <Input
                                id="nationalId"
                                name="nationalId"
                                value={formData.nationalId}
                                onChange={handleChange}
                                required
                                pattern="\d{10}"
                            />
                        </div>

                        {/* تاریخ تولد */}
                        <div className="space-y-2">
                            <Label>تاریخ تولد<span className="text-red-500">*</span></Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-right font-normal",
                                            !formData.birthDate && "text-muted-foreground"
                                        )}
                                    >
                                        {formData.birthDate ? (
                                            format(formData.birthDate, "yyyy/MM/dd")
                                        ) : (
                                            <span>تاریخ تولد را انتخاب کنید</span>
                                        )}
                                        <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.birthDate}
                                        onSelect={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
                                        disabled={(date) => date > new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* وضعیت فعال بودن */}
                        <div className="space-y-2">
                            <Label>وضعیت حساب</Label>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) =>
                                        setFormData(prev => ({ ...prev, isActive: checked }))
                                    }
                                />
                                <Label htmlFor="isActive">
                                    {formData.isActive ? 'فعال' : 'غیرفعال'}
                                </Label>
                            </div>
                        </div>

                        {/* وضعیت رزومه */}
                        <div className="space-y-2">
                            <Label>وضعیت رزومه</Label>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="resumeVisible"
                                    checked={formData.resumeVisible}
                                    onCheckedChange={(checked) =>
                                        setFormData(prev => ({ ...prev, resumeVisible: checked }))
                                    }
                                />
                                <Label htmlFor="resumeVisible">
                                    {formData.resumeVisible ? 'قابل مشاهده' : 'غیرقابل مشاهده'}
                                </Label>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* دکمه‌های پایانی */}
                <div className="flex justify-end gap-4 pt-6">
                    <Button type="button" variant="outline" onClick={() => navigate("/students")}>
                        انصراف
                    </Button>
                    <Button type="submit" className="px-8 bg-green-600 hover:bg-green-700">
                        ذخیره تغییرات
                    </Button>
                </div>
            </form>
        </div>
    );
}