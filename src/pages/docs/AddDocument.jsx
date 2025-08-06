// src/pages/Documents/new.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
// import { createDoc } from '../../features/docs/docsActions';
import { toast } from 'react-toastify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { createDoc } from '../../features/docs/docsActions';

const AddDocument = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { loading } = useSelector((state) => state.docs);
    const loading = false;

    const [formData, setFormData] = useState({
        Title: '',
        Summary: '',
        Description: '',
        Level: 'beginner',
        Features: '',
        Disabled: false,
        Prerequisites: '',
        TargetAudience: '',
        SortIndex: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (checked) => {
        setFormData(prev => ({ ...prev, Disabled: checked }));
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        const data = {
            "@Id": 0,
            "@Title": formData.Title,
            "@Summary": formData.Summary,
            "@Description": formData.Description,
            "@Level": formData.Level,
            "@Features": formData.Features,
            "@Disabled": formData.Disabled,
            "@Prerequisites": formData.Prerequisites,
            "@TargetAudience": formData.TargetAudience,
            "@SortIndex": formData.SortIndex,
            "@Price": "10"
        }
        e.preventDefault();
        console.log(data)
        try {
            await dispatch(createDoc(data)).unwrap();
            toast.success('مستند با موفقیت ایجاد شد');
            navigate('/docs');
        } catch (error) {
            toast.error(`خطا در ایجاد مستند: ${error.message}`);
        }
    };

    return (
        <div className=" mx-auto p-4 ">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">ایجاد مستند جدید</h1>
                <Button
                    variant="outline"
                    onClick={() => navigate('/Documents')}
                >
                    بازگشت
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* عنوان */}
                    <div>
                        <Label className="mb-2" htmlFor="Title">عنوان دوره</Label>
                        <Input
                            id="Title"
                            name="Title"
                            value={formData.Title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* سطح دوره */}
                    <div>
                        <Label className="mb-2" htmlFor="Level">سطح دوره</Label>
                        <Select
                            value={formData.Level}
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, Level: value }))
                            }
                        >
                            <SelectTrigger className="w-full p-2 border rounded-md">
                                <SelectValue placeholder="سطح را انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">مبتدی</SelectItem>
                                <SelectItem value="intermediate">متوسط</SelectItem>
                                <SelectItem value="advanced">پیشرفته</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    < div >
                        <Label className="mb-2" htmlFor="Summary">توضیحات کوتاه</Label>
                        <Input
                            id="Summary"
                            name="Summary"
                            value={formData.Summary}
                            onChange={handleChange}
                            required
                        />
                    </div >
                </div >

                {/* توضیحات کوتاه */}


                {/* توضیحات بلند */}
                <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-6">

                    < div >
                        <Label className="mb-2" htmlFor="Description">توضیحات بلند</Label>
                        <Textarea
                            id="Description"
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            rows={4}
                            required
                        />
                    </div >
                    < div >
                        <Label className="mb-2" htmlFor="TargetAudience">
                            این دوره برای چه کسانی مناسب است؟
                        </Label>
                        <Textarea
                            id="TargetAudience"
                            name="TargetAudience"
                            value={formData.TargetAudience}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div >
                </div>

                {/* ویژگی‌ها */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

                    < div className="mb-6" >
                        <Label className="mb-2" htmlFor="Features">
                            ویژگی‌ها (با کاما جدا کنید)
                        </Label>
                        <Input
                            id="Features"
                            name="Features"
                            value={formData.Features}
                            onChange={handleChange}
                            placeholder="مثال: ویژگی اول, ویژگی دوم"
                        />
                    </div >

                    {/* پیش‌نیازها */}
                    < div className="mb-6" >
                        <Label className="mb-2" htmlFor="Prerequisites">پیش‌نیازها</Label>
                        <Input
                            id="Prerequisites"
                            name="Prerequisites"
                            value={formData.Prerequisites}
                            onChange={handleChange}
                        />
                    </div >
                    < div className="mb-6" >
                        <Label className="mb-2" htmlFor="SortIndex">مرتب سازی</Label>
                        <Input
                            type="number"
                            id="SortIndex"
                            name="SortIndex"
                            value={formData.SortIndex}
                            onChange={handleChange}
                        />
                    </div >

                    {/* مناسب برای */}

                </div>

                {/* وضعیت */}
                < div className="flex items-center space-x-2 mb-8" >
                    <Switch
                        id="Disabled"
                        checked={formData.Disabled}
                        onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="Disabled" className="cursor-pointer mb-2">
                        {formData.Disabled ? 'غیرفعال' : 'فعال'}
                    </Label>
                </div >

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/Documents')}
                    >
                        لغو
                    </Button>
                    <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={loading}
                    >
                        {loading ? 'در حال ایجاد...' : 'ایجاد مستند'}
                    </Button>
                </div>
            </form >
        </div >
    );
};

export default AddDocument;