// ProfileAvatar.js
import { Dropdown, Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const ProfileAvatar = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                حساب کاربری
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
                تنظیمات
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />}>
                خروج
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomRight" arrow>
            <div className="flex items-center cursor-pointer">
                <span className="ml-2 text-gray-700 font-medium">رامین جوشنگ</span>
                <Avatar size={50} src="../../../assets/images/user.jpeg" />
            </div>
        </Dropdown>
    );
};

export default ProfileAvatar;