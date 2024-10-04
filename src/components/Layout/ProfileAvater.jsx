// ProfileAvatar.js
import { Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const ProfileAvatar = () => {

    const items = [
        {
            key: '1',
            label: 'حساب کاربری',
            icon: <UserOutlined />
        },
        {
            key: '2',
            label: 'تنظیمات',
            icon: <SettingOutlined />
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: 'خروج',
            icon: <LogoutOutlined />
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <div className="flex items-center cursor-pointer">
                <span className="ml-2 text-gray-700 font-">رامین جوشنگ</span>
                <Avatar size={50} src="../../../assets/images/user.jpeg" />
            </div>
        </Dropdown>
    );
};

export default ProfileAvatar;