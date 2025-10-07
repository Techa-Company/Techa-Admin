import { Outlet } from 'react-router-dom'
import useIsCollapsed from './hooks/use-is-collapsed'
import SkipToMain from '@/components/layout/skip-to-main'
import Sidebar from './components/layout/Sidebar'
import Layout from './components/layout/Layout'
import { Navbar } from './components/layout/Navbar'
import { Search } from './components/layout/Search'
import { UserNavbar } from './components/layout/UserNavbar'
import { Header } from './components/layout/Header'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:mr-14' : 'md:mr-64'} h-full`}
      >

        <Layout>

          <Header />

          <Layout.Body>
            <Outlet />
          </Layout.Body>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // eslint-disable-next-line no-undef
          transition={Bounce}
        />
      </div>
    </div>
  )
}


