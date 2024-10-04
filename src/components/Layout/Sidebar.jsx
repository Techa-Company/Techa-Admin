import { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        getItem('داشبورد', '1', <PieChartOutlined />),
        getItem('کلاس های آنلاین', '2', <DesktopOutlined />),
        getItem('کاربران', 'sub1', <UserOutlined />, [
            getItem('رامین', '3'),
            getItem('امیر', '4'),
            getItem('سعید', '5'),
        ]),
        getItem('کلاس های آفلاین', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('تنظیمات', '9', <FileOutlined />),
    ];

    return (
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <div className='h-16 flex items-center justify-center'>
                <img className='object-center' src="../../../assets/images/logo.png" alt="" />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    );
};

export default Sidebar;

