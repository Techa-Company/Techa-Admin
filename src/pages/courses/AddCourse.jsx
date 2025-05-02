import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns-jalali';
import { Plus, Trash2, Video, ImageIcon, ChevronDown, ChevronUp, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MultiSelect } from '../../components/common/MultiSelect';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';

export default function AddCourse() {
    const navigate = useNavigate();

    // حالت‌های فرم
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        longDescription: '',
        duration: '',
        instructor: '',
        price: '',
        videoCount: '',
        level: '',
        status: 'draft',
        lastUpdate: new Date(),
        syllabus: [{ title: '', parts: [''] }],
        isFree: false,
        hasCertificate: true,
        prerequisites: [],
        currentPrerequisite: ''
    });


    // const frameworks = [
    //     {
    //         value: "next.js",
    //         label: "رامین جوشنگ",
    //     },
    //     {
    //         value: "sveltekit",
    //         label: "امیرحسین چگینی",
    //     },
    //     {
    //         value: "nuxt.js",
    //         label: "مهدی هوشمندی",
    //     },
    //     {
    //         value: "remix",
    //         label: "محسن مردانی فر",
    //     },
    //     {
    //         value: "astro",
    //         label: "امیررضا رمضانی",
    //     },
    // ]

    // لیست مدرسین
    const [instructors] = useState([
        { id: 1, name: 'جان دو', avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=JohnDoe` },
        { id: 2, name: 'جین اسمیت', avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=JaneSmith` },
        { id: 3, name: 'محمد رضایی', avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=MohammadRezaei` },
        { id: 4, name: 'سارا محمدی', avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=SaraMohammadi` }
    ]);
    // آپلود تصویر و ویدیو
    const { acceptedFiles: imageFiles, getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        }
    });

    const { acceptedFiles: videoFiles, getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            'video/*': ['.mp4', '.mov', '.avi']
        }
    });

    // مدیریت تغییرات فرم
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // مدیریت سرفصل‌ها
    const addChapter = () => {
        setFormData(prev => ({
            ...prev,
            syllabus: [...prev.syllabus, { title: '', parts: [''] }]
        }));
    };

    const removeChapter = (index) => {
        if (formData.syllabus.length > 1) {
            setFormData(prev => ({
                ...prev,
                syllabus: prev.syllabus.filter((_, i) => i !== index)
            }));
        }
    };

    const addPart = (chapterIndex) => {
        const updatedSyllabus = [...formData.syllabus];
        updatedSyllabus[chapterIndex].parts.push('');
        setFormData(prev => ({ ...prev, syllabus: updatedSyllabus }));
    };

    const removePart = (chapterIndex, partIndex) => {
        const updatedSyllabus = [...formData.syllabus];
        if (updatedSyllabus[chapterIndex].parts.length > 1) {
            updatedSyllabus[chapterIndex].parts = updatedSyllabus[chapterIndex].parts.filter((_, i) => i !== partIndex);
            setFormData(prev => ({ ...prev, syllabus: updatedSyllabus }));
        }
    };

    const handleChapterChange = (chapterIndex, field, value) => {
        const updatedSyllabus = [...formData.syllabus];
        updatedSyllabus[chapterIndex][field] = value;
        setFormData(prev => ({ ...prev, syllabus: updatedSyllabus }));
    };

    const handlePartChange = (chapterIndex, partIndex, value) => {
        const updatedSyllabus = [...formData.syllabus];
        updatedSyllabus[chapterIndex].parts[partIndex] = value;
        setFormData(prev => ({ ...prev, syllabus: updatedSyllabus }));
    };

    // مدیریت پیش نیاز ها
    const addTag = () => {
        if (formData.currentPrerequisite && !formData.prerequisites.includes(formData.currentPrerequisite)) {
            setFormData(prev => ({
                ...prev,
                prerequisites: [...prev.prerequisites, prev.currentPrerequisite],
                currentPrerequisite: ''
            }));
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            prerequisites: prev.prerequisites.filter(tag => tag !== tagToRemove)
        }));
    };

    // ارسال فرم
    const handleSubmit = (e) => {
        e.preventDefault();
        const courseData = {
            ...formData,
            thumbnail: imageFiles[0],
            introVideo: videoFiles[0],
            syllabus: formData.syllabus.filter(chapter => chapter.title.trim() !== '')
        };
        console.log('Course Data Submitted:', courseData);
        // در اینجا می‌توانید داده‌ها را به API ارسال کنید
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ایجاد دوره جدید</h1>
                <Button variant="outline" onClick={() => navigate("/courses")}>
                    بازگشت به لیست دوره‌ها
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* بخش اطلاعات اصلی */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">اطلاعات اصلی دوره</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* عنوان دوره */}
                        <div className="space-y-2">
                            <Label htmlFor="title">عنوان دوره <span className='text-red-500'>*</span></Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="مثال: آموزش React پیشرفته"
                                required
                            />
                        </div>

                        {/* مدرس */}
                        <div className="space-y-2">
                            <Label>مدرس <span className='text-red-500'>*</span></Label>
                            <Select
                                onValueChange={val => handleSelectChange("instructor", val)}
                                value={formData.instructor}
                                required
                            >
                                <SelectTrigger className="w-full h-20">
                                    <SelectValue placeholder="انتخاب مدرس" />
                                </SelectTrigger>
                                <SelectContent >
                                    {instructors.map(instructor => (
                                        <SelectItem key={instructor.id} value={instructor.name}>{instructor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* سطح دوره */}
                        <div className="space-y-2">
                            <Label>سطح دوره <span className='text-red-500'>*</span></Label>
                            <Select
                                onValueChange={val => handleSelectChange("level", val)}
                                value={formData.level}
                                required
                            >
                                <SelectTrigger
                                    className="w-full"
                                >
                                    <SelectValue placeholder="انتخاب سطح" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">مبتدی</SelectItem>
                                    <SelectItem value="intermediate">متوسط</SelectItem>
                                    <SelectItem value="advanced">پیشرفته</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* مدت زمان */}
                        <div className="space-y-2">
                            <Label htmlFor="duration">مدت زمان (دقیقه) <span className='text-red-500'>*</span></Label>
                            <Input
                                id="duration"
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="مثال: 320"
                                required
                                min="0"
                            />
                        </div>

                        {/* قیمت */}
                        <div className="space-y-2">
                            <Label htmlFor="price">قیمت (تومان)</Label>
                            <Input
                                id="price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="مثال: 250000"
                                disabled={formData.isFree}
                                min="0"
                            />
                            <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                    id="free-course"
                                    checked={formData.isFree}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFree: checked }))}
                                />
                                <Label htmlFor="free-course">دوره رایگان است</Label>
                            </div>
                        </div>

                        {/* وضعیت دوره */}
                        <div className="space-y-2">
                            <Label>وضعیت دوره <span className='text-red-500'>*</span></Label>
                            <Select
                                onValueChange={val => handleSelectChange("status", val)}
                                value={formData.status}
                                required
                            >
                                <SelectTrigger
                                    className="w-full"
                                >
                                    <SelectValue placeholder="انتخاب وضعیت" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">پیش‌نویس</SelectItem>
                                    <SelectItem value="published">منتشر شده</SelectItem>
                                    <SelectItem value="archived">آرشیو شده</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* گواهینامه */}
                        <div className="flex items-center space-x-2 pt-6">
                            <Switch
                                id="has-certificate"
                                checked={formData.hasCertificate}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasCertificate: checked }))}
                            />
                            <Label htmlFor="has-certificate">ارائه گواهینامه پایان دوره</Label>
                        </div>
                    </div>
                </Card>

                {/* بخش توضیحات */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">توضیحات دوره</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* توضیح کوتاه */}
                        <div className="space-y-2">
                            <Label htmlFor="shortDescription">توضیح کوتاه <span className='text-red-500'>*</span></Label>
                            <Textarea
                                id="shortDescription"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                placeholder="توضیح مختصر درباره دوره (حداکثر 200 کاراکتر)"
                                rows={4}
                                maxLength={200}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                {formData.shortDescription.length}/200 کاراکتر
                            </p>
                        </div>

                        {/* توضیح کامل */}
                        <div className="space-y-2">
                            <Label htmlFor="longDescription">توضیح کامل</Label>
                            <Textarea
                                id="longDescription"
                                name="longDescription"
                                value={formData.longDescription}
                                onChange={handleChange}
                                placeholder="توضیح کامل درباره دوره و سرفصل‌ها"
                                rows={6}
                            />
                        </div>
                    </div>
                </Card>

                {/* بخش رسانه‌ها */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">رسانه‌های دوره</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* تصویر دوره */}
                        <div {...getImageRootProps()} className="space-y-2">
                            <Label>تصویر شاخص دوره <span className='text-red-500'>*</span></Label>
                            <Card className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer hover:border-primary transition-colors">
                                <input {...getImageInputProps()} />
                                <ImageIcon className="w-10 h-10 text-muted-foreground mb-3" />
                                <p className="text-center">
                                    {imageFiles[0] ? (
                                        <span className="text-primary font-medium">{imageFiles[0].name}</span>
                                    ) : (
                                        <>
                                            تصویر دوره را اینجا رها کنید یا <span className="text-primary font-medium">کلیک کنید</span>
                                        </>
                                    )}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">فرمت‌های مجاز: JPG, PNG, WEBP</p>
                            </Card>
                        </div>

                        {/* ویدیوی معرفی */}
                        <div {...getVideoRootProps()} className="space-y-2">
                            <Label>ویدیوی معرفی دوره</Label>
                            <Card className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer hover:border-primary transition-colors">
                                <input {...getVideoInputProps()} />
                                <Video className="w-10 h-10 text-muted-foreground mb-3" />
                                <p className="text-center">
                                    {videoFiles[0] ? (
                                        <span className="text-primary font-medium">{videoFiles[0].name}</span>
                                    ) : (
                                        <>
                                            ویدیوی معرفی را اینجا رها کنید یا <span className="text-primary font-medium">کلیک کنید</span>
                                        </>
                                    )}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">فرمت‌های مجاز: MP4, MOV, AVI</p>
                            </Card>
                        </div>
                    </div>
                </Card>

                {/* بخش سرفصل‌ها */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">سرفصل‌ها و محتوای دوره</h2>

                    <div className="space-y-4">
                        {formData.syllabus.map((chapter, chapterIndex) => (
                            <Card key={chapterIndex} className="p-4 space-y-3 border border-muted">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <ChevronDown className="w-5 h-5 text-muted-foreground cursor-pointer" />
                                            <Input
                                                placeholder={`عنوان فصل ${chapterIndex + 1}`}
                                                value={chapter.title}
                                                onChange={(e) => handleChapterChange(chapterIndex, 'title', e.target.value)}
                                                className="font-medium"
                                            />
                                        </div>

                                        {chapter.parts.map((part, partIndex) => (
                                            <div key={partIndex} className="flex gap-2 items-center pl-8">
                                                <Input
                                                    placeholder={`عنوان قسمت ${partIndex + 1}`}
                                                    value={part}
                                                    onChange={(e) => handlePartChange(chapterIndex, partIndex, e.target.value)}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    type="button"
                                                    onClick={() => removePart(chapterIndex, partIndex)}
                                                    disabled={chapter.parts.length === 1}
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            onClick={() => removeChapter(chapterIndex)}
                                            disabled={formData.syllabus.length === 1}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="pl-8">
                                    <Button
                                        variant="ghost"
                                        className="text-primary"
                                        type="button"
                                        onClick={() => addPart(chapterIndex)}
                                    >
                                        <Plus className="w-4 h-4 ml-1" />
                                        افزودن قسمت جدید
                                    </Button>
                                </div>
                            </Card>
                        ))}

                        <Button
                            variant="outline"
                            className="w-full"
                            type="button"
                            onClick={addChapter}
                        >
                            <Plus className="w-4 h-4 ml-1" />
                            افزودن فصل جدید
                        </Button>
                    </div>
                </Card>

                {/* بخش اطلاعات تکمیلی */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">اطلاعات تکمیلی</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* پیش نیاز ها */}
                        <div className="space-y-2">
                            <Label htmlFor="prerequisites">پیش نیاز ها</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="prerequisites"
                                    value={formData.currentPrerequisite}
                                    onChange={(e) => setFormData(prev => ({ ...prev, currentPrerequisite: e.target.value }))}
                                    placeholder="افزودن پیش نیاز"
                                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                                />
                                <Button type="button" onClick={addTag}>
                                    افزودن
                                </Button>
                            </div>
                            {formData.prerequisites.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {formData.prerequisites.map(tag => (
                                        <Badge key={tag} variant="outline" className="px-3 py-1">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="mr-1 text-muted-foreground hover:text-destructive"
                                            >
                                                ×
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* تاریخ بروزرسانی */}
                        <div className="space-y-2">
                            <Label>تاریخ آخرین بروزرسانی</Label>

                            <Popover className="w-full"
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-right font-normal", // text-right برای راست‌چین بودن تاریخ
                                            !formData.lastUpdate && "text-muted-foreground"
                                        )}
                                    >
                                        {formData.lastUpdate ? (
                                            format(formData.lastUpdate, "yyyy/MM/dd")
                                        ) : (
                                            <span>تاریخی انتخاب نشده است</span>
                                        )}
                                        <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.lastUpdate}
                                        onSelect={(date) => handleSelectChange("lastUpdate", date)}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <p className="text-sm text-muted-foreground">
                                {formData.lastUpdate ? (
                                    <>تاریخ انتخاب شده: {format(formData.lastUpdate, "yyyy/MM/dd")}</>
                                ) : (
                                    "تاریخی انتخاب نشده است"
                                )}
                            </p>
                        </div>


                    </div>
                </Card>

                {/* دکمه‌های پایانی */}
                <div className="flex justify-end gap-4 pt-6">
                    <Button type="button" variant="outline" onClick={() => navigate("/courses")}>
                        انصراف
                    </Button>
                    <Button type="submit" className="px-8">
                        ذخیره دوره
                    </Button>
                </div>
            </form>
        </div>
    );
}