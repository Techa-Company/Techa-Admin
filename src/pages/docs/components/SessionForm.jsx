import React from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Editor } from '@tinymce/tinymce-react';
import { FileText, CheckIcon, CrossIcon } from 'lucide-react';

const SessionForm = ({
    initialData,
    onSubmit,
    onCancel,
    isEditing = false
}) => {
    const [formData, setFormData] = React.useState({
        Title: '',
        Description: '',
        SortIndex: 1,
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData({
                Title: initialData.Title || '',
                Description: initialData.Description || '',
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

    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            Description: content
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="mb-6 animate-fadeIn">
            <div className="border border-emerald-200 shadow-md rounded-xl">
                <div className="py-6 px-6 bg-gradient-to-r rounded-t-xl from-emerald-50 to-teal-50 border-b border-emerald-100">
                    <h2 className="text-xl font-bold text-emerald-800 flex items-center">
                        <FileText className="h-5 w-5 ml-2" />
                        {isEditing ? 'ویرایش جلسه' : 'جلسه جدید'}
                    </h2>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <Label htmlFor="Title" className="text-gray-700 mb-2 block">
                                    عنوان جلسه
                                </Label>
                                <Input
                                    id="Title"
                                    value={formData.Title}
                                    className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                                    onChange={handleChange}
                                    placeholder="عنوان جلسه را وارد کنید"
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
                                    className="py-3 px-4 border-gray-300 focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="Description" className="text-gray-700 mb-2 block">
                                محتوای جلسه
                            </Label>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <Editor
                                    apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                                    value={formData.Description}
                                    init={{
                                        height: 400,
                                        menubar: true,
                                        plugins: 'code codesample link lists table emoticons image',
                                        toolbar: 'undo redo | formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table | emoticons | image | code',
                                        skin: 'oxide-dark',
                                        content_css: 'dark',
                                        branding: false,
                                        images_upload_url: 'postAcceptor.php',
                                        automatic_uploads: true,
                                        setup: (editor) => {
                                            const createBox = (type, text, color) => {
                                                editor.insertContent(`
                          <div class="custom-box ${type}" style="border-left: 4px solid ${color}; background-color: ${color}20; padding: 16px; border-radius: 8px; margin: 16px 0;">
                            <strong>${text}:</strong> این متن را ویرایش کنید.
                          </div>
                        `);
                                            };

                                            editor.ui.registry.addButton('noteBox', {
                                                icon: 'comment',
                                                tooltip: 'نکته',
                                                onAction: () => createBox('note', 'نکته', '#10B981')
                                            });

                                            editor.ui.registry.addButton('warningBox', {
                                                icon: 'warning',
                                                tooltip: 'هشدار',
                                                onAction: () => createBox('warning', 'هشدار', '#F59E0B')
                                            });

                                            editor.ui.registry.addButton('dangerBox', {
                                                icon: 'alert',
                                                tooltip: 'خطر',
                                                onAction: () => createBox('danger', 'خطر', '#EF4444')
                                            });

                                            editor.ui.registry.addButton('infoBox', {
                                                icon: 'info',
                                                tooltip: 'اطلاعات',
                                                onAction: () => createBox('info', 'اطلاعات', '#3B82F6')
                                            });
                                        }
                                    }}
                                    onEditorChange={handleEditorChange}
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
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                type="submit"
                            >
                                <CheckIcon className="ml-2 h-5 w-5" />
                                {isEditing ? 'ذخیره تغییرات' : 'ذخیره جلسه'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SessionForm;