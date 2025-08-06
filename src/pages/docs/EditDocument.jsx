// src/pages/Documents/edit.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'react-toastify';
import { fetchDocById, } from '../../features/docs/docsActions';

const EditDocument = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentDoc, loading, error } = useSelector((state) => state.docs);

    const [formData, setFormData] = useState({
        Title: '',
        Summary: '',
        Description: '',
        Level: 'beginner',
        Features: '',
        Disabled: false,
        Prerequisites: '',
        TargetAudience: ''
    });

    useEffect(() => {
        dispatch(fetchDocById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (currentDoc) {
            setFormData({
                Title: currentDoc.Title,
                Summary: currentDoc.Summary,
                Description: currentDoc.Description,
                Level: currentDoc.Level,
                Features: currentDoc.Features,
                Disabled: currentDoc.Disabled,
                Prerequisites: currentDoc.Prerequisites,
                TargetAudience: currentDoc.TargetAudience
            });
        }
    }, [currentDoc]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (checked) => {
        setFormData(prev => ({ ...prev, Disabled: checked }));
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     await dispatch(updateDoc({ id, ...formData })).unwrap();
        //     toast.success('مستند با موفقیت ویرایش شد');
        //     navigate('/docs');
        // } catch (error) {
        //     toast.error(`خطا در ویرایش مستند: ${error.message}`);
        // }
    };

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {error}</p>;

    return (
        <div className=" mx-auto p-4 ">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">ویرایش مستند</h1>
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

                {/* ویژگی‌ها و پیش‌نیازها */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    < div className="mb-6" >
                        <Label className="mb-2" htmlFor="Prerequisites">پیش‌نیازها</Label>
                        <Input
                            id="Prerequisites"
                            name="Prerequisites"
                            value={formData.Prerequisites}
                            onChange={handleChange}
                        />
                    </div >
                </div>

                {/* وضعیت */}
                < div className="flex items-center space-x-2 mb-8" >
                    <Switch
                        id="Disabled"
                        checked={formData.Disabled}
                        onCheckedChange={handleSwitchChange}
                    />
                    <Label className="mb-2 cursor-pointer" htmlFor="Disabled">
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
                        {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                    </Button>
                </div>
            </form >
        </div >
    );
};

export default EditDocument;