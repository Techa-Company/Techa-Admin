import React from 'react';

import { Bookmark, CheckIcon, CrossIcon } from 'lucide-react';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

const ChapterForm = ({
    initialData,
    onSubmit,
    onCancel,
    isEditing = false
}) => {
    const [formData, setFormData] = React.useState({
        Title: '',
        SortIndex: 1,
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData({
                Title: initialData.Title || '',
                SortIndex: initialData.SortIndex || 1,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: id === 'SortIndex' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="mb-8 animate-fadeIn">
            <div className="border border-purple-200 py-0 shadow-lg rounded-xl">
                <div className="py-6 px-6 bg-gradient-to-r rounded-t-xl from-purple-50 to-indigo-50 border-b border-purple-100">
                    <h2 className="text-xl font-bold text-purple-800 flex items-center">
                        <Bookmark className="h-5 w-5 ml-2" />
                        {isEditing ? 'ویرایش سرفصل' : 'سرفصل جدید'}
                    </h2>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="Title" className="text-gray-700 mb-2 block">
                                    عنوان سرفصل
                                </Label>
                                <Input
                                    id="Title"
                                    value={formData.Title}
                                    className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                                    onChange={handleChange}
                                    placeholder="عنوان سرفصل را وارد کنید"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="SortIndex" className="text-gray-700 mb-2 block">
                                    ترتیب نمایش
                                </Label>
                                <Input
                                    id="SortIndex"
                                    type="number"
                                    value={formData.SortIndex}
                                    className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-100">
                            <Button
                                variant="outline"
                                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                onClick={onCancel}
                                type="button"
                            >
                                <CrossIcon className="ml-2 h-5 w-5" />
                                انصراف
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-200"
                                type="submit"
                            >
                                <CheckIcon className="ml-2 h-5 w-5" />
                                {isEditing ? 'ذخیره تغییرات' : 'ذخیره سرفصل'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChapterForm;