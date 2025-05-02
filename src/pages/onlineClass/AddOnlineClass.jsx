import MainLayout from '../layout/MainLayout';
import BreadCrumb from '../../components/common/BreadCrumb';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table, TimePicker } from 'antd';
import Uploader from '../../components/common/Uploader';
import TinyMCE from '../../components/common/TinyMCE';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;


const AddOnlineClass = () => {
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [dayData, setDayData] = useState({ day: '', startTime: '', endTime: '' });

    const handleAddDay = () => {
        if (dayData.day && dayData.startTime && dayData.endTime) {
            setSelectedDays([...selectedDays, dayData]);
            setDayData({ day: '', startTime: '', endTime: '' }); // reset inputs
        }
    };

    const handleRegister = () => {
        console.log(selectedDays);
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        setDayData({ ...dayData, [e.target.name]: e.target.value });
    };

    const columns = [
        {
            title: 'روز',
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: 'ساعت شروع',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'ساعت پایان',
            dataIndex: 'endTime',
            key: 'endTime',
        },
    ];

    const dataSource = selectedDays.map((item, index) => ({
        key: index,
        ...item,
    }));

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
                            <Select
                                readonly
                                showSearch
                                // style={{ height: 60 }}
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
                                                style={{ width: 25, height: 25, borderRadius: '50%', marginLeft: 8 }}
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
                            <DatePicker className='w-full' placeholder="تاریخ شروع کلاس" />
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="تاریخ پایان"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن تاریخ پایان ضروری است",
                                },
                            ]}
                        >
                            <DatePicker className='w-full' placeholder="تاریخ پایان کلاس" />
                        </Form.Item>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5'>
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
                    <div className='mb-5'>
                        <Button type="primary" onClick={() => setIsModalVisible(true)}>
                            تعریف روز های برگذاری
                        </Button>
                        <Modal
                            title="Select Class Days"
                            visible={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select a day"
                                onChange={(value) => setDayData({ ...dayData, day: value })}
                                value={dayData.day}
                            >
                                {['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map(day => (
                                    <Option key={day} value={day}>
                                        {day}
                                    </Option>
                                ))}
                            </Select>
                            <Input
                                placeholder="ساعت شروع"
                                name="startTime"
                                style={{ marginTop: '10px' }}
                                value={dayData.startTime}
                                onChange={handleInputChange}
                            />
                            <Input
                                placeholder="ساعت پایان"
                                name="endTime"
                                style={{ marginTop: '10px' }}
                                value={dayData.endTime}
                                onChange={handleInputChange}
                            />
                            <Button type="primary" onClick={handleAddDay} style={{ marginTop: '10px' }}>
                                +
                            </Button>
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                pagination={false}
                                style={{ marginTop: '20px' }}
                            />
                            <Button type="primary" onClick={handleRegister} style={{ marginTop: '20px' }}>
                                Register
                            </Button>
                        </Modal>
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