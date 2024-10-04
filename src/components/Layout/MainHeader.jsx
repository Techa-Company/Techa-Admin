import { Layout, theme } from 'antd';
import ProfileAvatar from './ProfileAvater';
const { Header } = Layout;

const MainHeader = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken();
    return (
        <Header
            className='w-full'
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingRight: 20,
                paddingLeft: 20,
                background: colorBgContainer,
            }}
        >
            <div className='flex justify-between items-center w-full'>
                <h1 className='text-2xl font-bold'>خانه</h1>
                <ProfileAvatar />
            </div>
        </Header>
    );
};

export default MainHeader;