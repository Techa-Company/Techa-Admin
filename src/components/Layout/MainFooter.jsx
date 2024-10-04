import { Footer } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

const MainFooter = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            سامانه تکا ©{new Date().getFullYear()} ساخته شده توسط <Link className='text-blue-500 font-bold' to="https://Joshang.ir" target='_blank'>رامین جوشنگ</Link>
        </Footer>
    );
};

export default MainFooter;