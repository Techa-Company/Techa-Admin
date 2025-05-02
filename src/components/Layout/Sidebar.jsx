import { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        {
            label: (
                <Link to="/" rel="noopener noreferrer">
                    داشبورد
                </Link>
            ),
            key: 'dashboard',
            icon: <PieChartOutlined />,
        },
        {
            label: 'کلاس های مجازی',
            key: 'onlineClass',
            icon: <DesktopOutlined />,
            children: [
                {
                    label: (
                        <Link to="/onlineClasses" rel="noopener noreferrer">
                            لیست کلاس ها
                        </Link>
                    ),
                    key: 'onlineClassesList',
                    icon: <FileOutlined />,
                },
                {
                    label: (
                        <Link to="/masters" rel="noopener noreferrer">
                            لیست اساتید
                        </Link>
                    ),
                    key: 'mastersList',
                    icon: <FileOutlined />,
                },
                {
                    label: 'لیست دانش پذیران',
                    key: 'studentsList',
                    icon: <FileOutlined />,
                },
            ]
        },
        // {
        //     label: 'کاربران',
        //     key: 'users',
        //     icon: <UserOutlined />,
        //     children: [
        //         {
        //             label: 'تنظیمات',
        //             key: 'setting',
        //             icon: <FileOutlined />,
        //         },
        //         {
        //             label: 'تنظیمات',
        //             key: 'setting',
        //             icon: <FileOutlined />,
        //         },
        //         {
        //             label: 'تنظیمات',
        //             key: 'setting',
        //             icon: <FileOutlined />,
        //         },
        //     ]
        // },
        {
            label: 'تنظیمات',
            key: 'setting',
            icon: <FileOutlined />,
        },

    ];
    const siderStyle = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: 'unset',
    };

    return (
        <Sider
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
            breakpoint="lg"
            width={250}
            className="h-full"
            reverseArrow
        >
            <div className="demo-logo-vertical" />
            <div className='h-16 flex items-center justify-center'>
                <img className='object-center' src="../../../assets/images/logo.png" alt="" />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    );
};

export default Sidebar;

