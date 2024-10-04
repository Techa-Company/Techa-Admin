import MainLayout from '../layout/MainLayout';
import BreadCrumb from '../../components/common/BreadCrumb';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import Uploader from '../../components/common/Uploader';
import TinyMCE from '../../components/common/TinyMCE';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOnlineClass = () => {
    const editorRef = useRef(null)
    const navigate = useNavigate();

    return (
        <MainLayout>
            <BreadCrumb items={[{ title: "خانه" }, { title: "کلاس های مجازی" }, { title: "ایجاد کلاس جدید" }]} />
            <div
                className="bg-white  p-6 rounded-lg w-full overflow-auto"
            >
                <h1 className='font-semibold text-xl'>ایجاد کلاس جدید</h1>
                <Form
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    className='mt-5'
                    layout="vertical"
                    autoComplete="off"

                >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5'>
                        <Form.Item
                            name="title"
                            label="عنوان"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن عنوان ضروری است",
                                },
                            ]}
                        >
                            <Input placeholder="عنوان کلاس" />
                        </Form.Item>
                        <Form.Item
                            name="categoriesKeys"
                            label="نام استاد"
                            rules={[
                                {
                                    required: true,
                                    message: "انتخاب کردن نام استاد ضروری است",
                                },
                            ]}
                        >
                            <Select>
                                {/* {
                                    categories.map(category => {
                                        return <Select.Option key={categories.key} value={category.key}>{category.title}</Select.Option>

                                    })
                                } */}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="timeToRead"
                            label="طول دوره"
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    message: "وارد کردن طول دوره ضروری است",
                                },
                            ]}
                        >
                            <InputNumber
                                className='w-full'
                                addonAfter="ساعت"
                                controls
                                placeholder='طول دوره'
                            />
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="تاریخ شروع"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن تاریخ شروع ضروری است",
                                },
                            ]}
                        >
                            <Input placeholder="تاریخ شروع کلاس" />
                        </Form.Item>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5'>
                        <Form.Item
                            name="timeToRead"
                            label="مدت هر جلسه"
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    message: "وارد کردن مدت هر جلسه ضروری است",
                                },
                            ]}
                        >
                            <InputNumber
                                className='w-full'
                                addonAfter="دقیقه"
                                controls
                            />
                        </Form.Item>
                        <Form.Item
                            name="categoriesKeys"
                            label="روز های برگذاری"
                            rules={[
                                {
                                    required: true,
                                    message: "انتخاب کردن روز های برگذاری ضروری است",
                                },
                            ]}
                        >
                            <Select
                                mode='multiple'>
                                {/* {
                                    categories.map(category => {
                                        return <Select.Option key={categories.key} value={category.key}>{category.title}</Select.Option>

                                    })
                                } */}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="timeToRead"
                            label="قیمت"
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    message: "وارد کردن قیمت ضروری است",
                                },
                            ]}
                        >
                            <InputNumber
                                className='w-full'
                                addonAfter="تومان"
                                controls
                            />
                        </Form.Item>
                        <Form.Item
                            name="timeToRead"
                            label="ظرفیت"
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    message: "وارد کردن ظرفیت ضروری است",
                                },
                            ]}
                        >
                            <InputNumber
                                className='w-full'
                                addonAfter="دانش پذیر"
                                controls
                                placeholder='ظرفیت کلاس'
                            />
                        </Form.Item>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <Form.Item
                            name="mainImageName"
                            label="تصویر کلاس"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "آپلود تصویر ضروری است",
                        //     },
                        // ]}
                        >
                            <Uploader />
                        </Form.Item>
                        <Form.Item
                            name="mainImageName"
                            label="ویدئو معرفی کلاس"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "آپلود تصویر ضروری است",
                        //     },
                        // ]}
                        >
                            <Uploader />
                        </Form.Item>

                    </div>
                    <div>
                        <Form.Item name="content" label="محتوای مقاله"
                        >
                            <TinyMCE editorRef={editorRef} />
                        </Form.Item>
                    </div>
                    <Form.Item >
                        <Button className="ml-3" type="primary" htmlType="submit">
                            ایجاد
                        </Button>
                        <Button type="default" htmlType="button"
                            onClick={() => navigate("/onlineClasses")}
                        >
                            بازگشت
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </MainLayout>
    );
};

export default AddOnlineClass;