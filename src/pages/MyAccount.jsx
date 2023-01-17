import { useContext } from 'react'
import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'
import ProtectedRoutes from '../Protected'
import { UserIcon, CogIcon, BellIcon, ArrowLeftOnRectangleIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline'
import { useLocation, Outlet } from 'react-router-dom'
import { store } from '../App'

export default function MyAccount() {
    const storeSate = useContext(store) ?? false
    const { user } = storeSate.state
    const location = useLocation()

    return (
        <ProtectedRoutes>
            <AppBar />
            <section className='place-content-start mt-14 p-5 w-full min-h-screen grid grid-cols-1 lg:grid-cols-10 '>
                <section className='h-12 lg:h-full col-span-full lg:col-span-2 space-y-7 overflow-x-hidden'>
                    <ul className='flex lg:flex-col space-x-5 lg:space-x-0 lg:space-y-5 overflow-x-auto items-start'>
                        {links.map((data, index) => {
                            return <li key={index}>
                                <NavLink to={data.to} title={data.name}
                                    className={`flex items-center space-x-4 rounded-md max-w-fit 
                                capitalize hover:text-violet-500 ${location.pathname === data.to && 'text-violet-500'} `}
                                >
                                    <data.icon className='w-5 h-5' />
                                    <span>{data.name}</span>
                                </NavLink>
                            </li>
                        })}
                        {user.is_professional &&
                            <li>
                                <NavLink to='/my-account/my-balance' title='my-balance'
                                    className={`flex items-center space-x-4 rounded-md max-w-fit 
                                capitalize hover:text-violet-500 ${location.pathname === "/my-account/my-balance"  && 'text-violet-500'} `}
                                >
                                    <CurrencyRupeeIcon className='w-5 h-5' />
                                    <span>My Balance</span>
                                </NavLink>
                            </li>
                        }
                    </ul>
                </section>
                <section className='p-4 w-full h-full rounded-md col-span-full lg:col-span-8 '>
                    <Outlet />
                </section>
            </section>
            <Footer />
        </ProtectedRoutes>
    )
}

const links = [
    {
        name: 'details',
        to: '/my-account',
        icon: UserIcon
    },
    {
        name: 'security',
        to: '/my-account/security',
        icon: CogIcon
    },
    {
        name: 'notifications',
        to: '/my-account/notifications',
        icon: BellIcon
    },
    {
        name: 'logout',
        to: '/my-account/logout',
        icon: ArrowLeftOnRectangleIcon
    },
]