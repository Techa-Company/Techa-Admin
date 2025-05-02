import { Button, Input, Popconfirm, Space, Spin, Table, theme } from "antd";
import BreadCrumb from "../../components/common/BreadCrumb";
import MainLayout from "../layout/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon, { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";


const columns = [
    {
        title: "ردیف",
        dataIndex: "key",
        key: "key",
        render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
        title: "نام دانش پذیر",
        dataIndex: "title",
        key: "title",
        render: (_, record) => (
            <Link
                to={{
                    pathname: "/blogs/categories",
                    search: new URLSearchParams({ parent: record.key }).toString(),
                }}
            >
                {record.title}
            </Link>
        ),
    },
    {
        title: "شماره همراه",
        dataIndex: "descriptions",
        key: "descriptions",
        render: (_, record) => <span>{record.descriptions}</span>,
    },
    {
        title: "عملیات",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => <Actions id={record.key} {...record} />,
    },
];



function Actions({ id }) {
    const { token } = theme.useToken();
    const navigate = useNavigate();

    return (
        <Space size="middle">
            <Button
                onClick={() => navigate(`edit/${id}`)}
                icon={<Icon name="eye" color={token["purple-6"]} />}
                size="middle"
                type="text"
            />
            <Button
                onClick={() => navigate(`edit/${id}`)}
                icon={<Icon name="pen" color={token["blue-6"]} />}
                size="middle"
                type="text"
            />
            <Popconfirm
                title="حدف دسته بندی"
                description="از پاک این دسته بندی مطمئن هستید؟"
                okText="حذف"
                cancelText="لغو"
                okButtonProps={{
                    danger: true,
                }}
                onConfirm={() => {
                    // messageApi.open({ type: "info", content: "دسته بندی حذف شد" });
                }}
                icon={<QuestionCircleOutlined style={{ color: token["red-6"] }} />}
            >
                <Button
                    icon={<Icon name="trash-2" color={token["red-6"]} />}
                    size="middle"
                    type="text"
                />
            </Popconfirm>
        </Space>
    );
}

const Students = () => {

    const [search, setSearch] = useState("");
    let loading = true;
    let categories = [];


    return (
        <MainLayout>
            <BreadCrumb items={[{ title: "خانه" }, { title: "کلاس های مجازی" }, { title: "لیست دانش پذیران" }]} />
            <div
                className="bg-white p-6 rounded-lg w-full"
            >
                <Space size="large" className="w-full mb-10">
                    {/* <Link to="new">
                        <Button type="primary" icon={<PlusOutlined />}>
                            ایجاد کلاس جدید
                        </Button>
                    </Link> */}
                    <Input.Search
                        placeholder="جستجو"
                        allowClear
                        enterButton
                        onSearch={setSearch}
                        value={search}
                    />
                </Space>
                <Spin size="large" spinning={loading}>
                    <Table columns={columns} dataSource={categories} />
                </Spin>
            </div>
        </MainLayout>
    );
};

export default Students;