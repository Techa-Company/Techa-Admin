import { Layout } from 'antd';
import MainHeader from '../../components/Layout/MainHeader';
import MainFooter from '../../components/Layout/MainFooter';
import Sidebar from '../../components/Layout/Sidebar';
import PropTypes from 'prop-types';

const { Content } = Layout;

const MainLayout = ({ children }) => {
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sidebar />
            <Layout>
                <MainHeader />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {children}
                </Content>
                <MainFooter />
            </Layout>
        </Layout >
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
}

export default MainLayout;
