import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export default function AddCategory() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        status: 'active',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Category Submitted:', formData);
        // ارسال داده‌ها به API
        // سپس هدایت به صفحه دسته‌بندی‌ها
        navigate('/course-categories');
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ایجاد دسته‌بندی جدید</h1>
                <Button variant="outline" onClick={() => navigate('/course-categories')}>
                    بازگشت به لیست دسته‌بندی‌ها
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">اطلاعات دسته‌بندی</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* نام دسته‌بندی */}
                        <div className="space-y-2">
                            <Label htmlFor="title">نام دسته‌بندی <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="مثال: فرانت‌اند"
                                required
                            />
                        </div>

                        {/* وضعیت */}
                        <div className="space-y-2">
                            <Label>وضعیت دسته‌بندی <span className="text-red-500">*</span></Label>
                            <Select
                                onValueChange={val => handleSelectChange('status', val)}
                                value={formData.status}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="انتخاب وضعیت" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">فعال</SelectItem>
                                    <SelectItem value="inactive">غیرفعال</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>

                {/* دکمه‌های فرم */}
                <div className="flex justify-end gap-4 pt-6">
                    <Button type="button" variant="outline" onClick={() => navigate('/categories')}>
                        انصراف
                    </Button>
                    <Button type="submit" className="px-8">
                        ذخیره دسته‌بندی
                    </Button>
                </div>
            </form>
        </div>
    );
}
