import { Navbar } from "./Navbar"
import { Search } from "./Search"
import { UserNavbar } from "./UserNavbar"
import Layout from "./Layout"

export function Header() {



    return (
        <Layout.Header>
            <Navbar links={topNav} />
            <div className='mr-auto flex items-center space-x-4 gap-5'>
                <Search />
                <UserNavbar />
            </div>
        </Layout.Header>
    )
}

const topNav = [
    {
        title: 'نمای کلی',
        href: 'dashboard/overview',
        isActive: true,
    },
    {
        title: 'مشتریان',
        href: 'dashboard/customers',
        isActive: false,
    },
    {
        title: 'محصولات',
        href: 'dashboard/products',
        isActive: false,
    },
    {
        title: 'تنظیمات',
        href: 'dashboard/settings',
        isActive: false,
    },
]