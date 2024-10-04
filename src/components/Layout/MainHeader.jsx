import { Layout, theme } from 'antd';
import ProfileAvatar from './ProfileAvater';
const { Header } = Layout;

const MainHeader = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken();
    return (
        <Header
            style={{
                padding: 0,
                paddingRight: 20,
                paddingLeft: 20,
                background: colorBgContainer,
            }}
        >
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>خانه</h1>
                <ProfileAvatar />
            </div>
        </Header>
    );
};

export default MainHeader;