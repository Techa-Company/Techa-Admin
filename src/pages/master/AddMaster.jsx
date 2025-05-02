import MainLayout from '../layout/MainLayout';
import BreadCrumb from '../../components/common/BreadCrumb';
import { Button, Form, Select } from 'antd';
import TinyMCE from '../../components/common/TinyMCE';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const AddMaster = () => {
    const editorRef = useRef(null)
    const navigate = useNavigate();

    // Sample user data
    const users = [
        {
            id: 1,
            name: 'رامین جوشنگ',
            image: 'https://i.pravatar.cc/150?img=1',
        },
        {
            id: 2,
            name: 'امیرحسین چگینی',
            image: 'https://i.pravatar.cc/150?img=2',
        },
        {
            id: 3,
            name: 'مهدی هوشمندی',
            image: 'https://i.pravatar.cc/150?img=3',
        },
    ];


    return (
        <MainLayout>
            <BreadCrumb items={[{ title: "خانه" }, { title: "کلاس های مجازی" }, { title: "ایجاد استاد جدید" }]} />
            <div
                className="bg-white  p-6 rounded-lg w-full overflow-auto"
            >
                <h1 className='font-semibold text-xl'>ایجاد استاد جدید</h1>
                <Form
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    className='mt-5'
                    layout="vertical"
                    autoComplete="off"

                >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5'>

                        <Form.Item
                            name="categoriesKeys"
                            label="انتخاب استاد"
                            rules={[
                                {
                                    required: true,
                                    message: "انتخاب کردن ضروری است",
                                },
                            ]}
                        >
                            <Select
                                readonly
                                showSearch
                                style={{ height: 60 }}
                                optionFilterProp="label"
                                filterOption={(input, option) => {
                                    return option.props.label.props.children[1].props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                }}
                                options={users.map(user => ({
                                    value: user.id,
                                    label: (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                style={{ width: 50, height: 50, borderRadius: '50%', marginLeft: 8 }}
                                            />
                                            <span>{user.name}</span>
                                        </div>
                                    ),
                                }))}
                            >
                                {/* {
                                    categories.map(category => {
                                        return <Select.Option key={categories.key} value={category.key}>{category.title}</Select.Option>

                                    })
                                } */}
                            </Select>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="content" label="معرفی استاد"
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

export default AddMaster;