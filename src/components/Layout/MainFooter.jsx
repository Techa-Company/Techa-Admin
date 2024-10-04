import { Footer } from 'antd/es/layout/layout';

const MainFooter = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            سامانه تکا ©{new Date().getFullYear()} ساخته شده توسط رامین
        </Footer>
    );
};

export default MainFooter;