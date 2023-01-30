import { useContext, useState, useCallback, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from '@headlessui/react'

import Avatar from '../assests/avatar.jpg'

import { store } from '../App'
import Logo from '../core/Logo'
import MenuItem from '../core/MenuItem'
import Button from '../core/Button'
import Icon from '../core/Icon'
import RouteChange from '../core/RouteChange'
import {
  WrenchScrewdriverIcon, MagnifyingGlassIcon, Squares2X2Icon, UserGroupIcon,
  AtSymbolIcon, UserIcon, CurrencyRupeeIcon, ShoppingBagIcon, ArrowPathIcon,
  BellIcon, ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

export default function Appbar() {

  const storeState = useContext(store) ?? false
  const { isAuthenciated, user } = storeState.state

  const location = useLocation()
  const navigate = useNavigate()

  const [navigation, setnavigation] = useState(
    {
      topBarLinks: NavigationLinks,
      asideBarLinks: NavigationLinks,
      routeChange : false
    }
  )

  const onLoad = useCallback(() => {
    // provider concern navlink according to user
    if (isAuthenciated && user.is_user)
      setnavigation({ topBarLinks: userTopLinks, asideBarLinks: userAsideLinks })
    else if (isAuthenciated && user.is_service_provider)
      setnavigation({ topBarLinks: serviceTopLinks, asideBarLinks: serviceAsideLinks })
    else if (isAuthenciated && user.is_product_seller)
      setnavigation({ topBarLinks: productTopLinks, asideBarLinks: productitem })
  }, [isAuthenciated, user])


  const handleRouteChange = useCallback(() => {
    document.documentElement.scrollTo({top: 0, left: 0,})
    setnavigation(pre => ({...pre, routeChange: true}))
    setTimeout(() => {
      setnavigation(pre => ({...pre, routeChange: false}))
    }, 700);
  }, [])

  useEffect(() => {onLoad(); handleRouteChange()}, [onLoad, handleRouteChange, location.pathname]);

  const profileImage = user.profile !== null ? user.profile : Avatar

  const ButtonBar = !isAuthenciated ?
    <Menu.Button className='lg:hidden outline-none'>
      <Icon icon={Squares2X2Icon} />
    </Menu.Button> :
    <Menu.Button className='outline-none w-9 h-9 overflow-hidden rounded-full active:scale-95'>
      <img src={profileImage} alt="user-profile" className='w-full h-full object-fill' />
    </Menu.Button>

  return (
    <nav className='container fixed w-full z-50 before:absolute before:w-full  
      before:h-full before:-z-10 before:backdrop-filter before:backdrop-blur-2xl top-0'
    >
      {navigation.routeChange && <RouteChange />}
      <div className='flex flex-wrap items-center justify-between py-4 mx-auto 
        lg:justify-between px-4'
      >
        <Logo />

        <ul className='hidden lg:flex items-center space-x-4'>
          {navigation.topBarLinks?.map((data, index) => {
            return <li key={index} title={data.name} >
              <NavLink to={data.to} className={`flex items-center space-x-2 px-2 py-2 
                font-normal  no-underline rounded-md  hover:text-violet-600 text-sm 
                focus:text-violet-500  focus:outline-none capitalize 
                ${location.pathname === data.to && 'text-violet-500'}`}
              >
                <data.icon className='w-5 h-5' />
                <span>
                  {data.name}
                </span>
              </NavLink>
            </li>
          })}
          {!isAuthenciated && <li className='hidden lg:block'>
            <Button title='Sign up' onClick={() => navigate('/sign-up')} />
          </li>}
        </ul>
        <MenuItem button={ButtonBar}>
          {navigation.asideBarLinks?.map((data, index) => {
            return <Menu.Item as='li' key={index} title={data.name} >
              <NavLink to={data.to} className={`flex items-center space-x-2 px-2 py-2 hover:text-violet-600 
                text-sm no-underline rounded-md focus:outline-none capitalize ${location.pathname === data.to && 'text-violet-500'}`}
              >
                <data.icon className='w-5 h-5' />
                <span>
                  {data.name}
                </span>
              </NavLink>
            </Menu.Item>
          })}
          {!isAuthenciated && <Menu.Item className='hidden lg:block'>
            <Button title='Sign up' onClick={() => navigate('/sign-up')} />
          </Menu.Item>}
        </MenuItem>
      </div>
    </nav>
  )
}

const NavigationLinks = [
  {
    name: 'register as professional',
    to: '/register-as-professional',
    icon: UserGroupIcon
  },
  {
    name: 'search',
    to: '/search',
    icon: MagnifyingGlassIcon
  },
  {
    name: 'serivces',
    to: '/services',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'products',
    to: '/products',
    icon: ShoppingBagIcon
  },
  {
    name: 'login',
    to: '/login',
    icon: AtSymbolIcon
  },
]

const userTopLinks = [
  {
    name: 'Switch To Professional',
    to: '/switch',
    icon: ArrowPathIcon
  },
  {
    name: 'search',
    to: '/search',
    icon: MagnifyingGlassIcon
  },

  {
    name: 'serivces',
    to: '/services',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'products',
    to: '/products',
    icon: ShoppingBagIcon
  },
]

const userAsideLinks = [
  {
    name: 'Switch To Professional',
    to: '/switch',
    icon: ArrowPathIcon
  },
  {
    name: 'search',
    to: '/search',
    icon: MagnifyingGlassIcon
  },

  {
    name: 'serivces',
    to: '/services',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'products',
    to: '/products',
    icon: ShoppingBagIcon
  },
  {
    name: 'My Account',
    to: '/my-account',
    icon: UserIcon
  },
  {
    name: 'Notifications',
    to: '/my-account/notifications',
    icon: BellIcon
  },
  {
    name: 'Logout',
    to: '/my-account/logout',
    icon: ArrowLeftOnRectangleIcon
  },
]


const serviceTopLinks = [
  {
    name: 'my services',
    to: '/my-services',
    icon: ShoppingBagIcon
  },
  {
    name: 'Balance',
    to: '/balance',
    icon: CurrencyRupeeIcon
  },
  {
    name: 'search',
    to: '/search',
    icon: MagnifyingGlassIcon
  },
  {
    name: 'serivces',
    to: '/services',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'products',
    to: '/products',
    icon: ShoppingBagIcon
  },
]

const serviceAsideLinks = [
  {
    name: 'search',
    to: '/search',
    icon: MagnifyingGlassIcon
  },
  {
    name: 'my services',
    to: '/my-services',
    icon: ShoppingBagIcon
  },
  {
    name: 'Balance',
    to: '/balance',
    icon: CurrencyRupeeIcon
  },
  {
    name: 'serivces',
    to: '/services',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'products',
    to: '/products',
    icon: ShoppingBagIcon
  },
  {
    name: 'My Account',
    to: '/my-account',
    icon: UserIcon
  },
  {
    name: 'Notifications',
    to: '/my-account/notifications',
    icon: BellIcon
  },
  {
    name: 'Logout',
    to: '/my-account/logout',
    icon: ArrowLeftOnRectangleIcon
  },
]


const productTopLinks = [
  {
    name: 'my products',
    to: '/my-products',
    icon: ShoppingBagIcon
  },
  {
    name: 'Balance',
    to: '/balance',
    icon: CurrencyRupeeIcon
  },
  {
    name: 'search',
    to: '/search',
    icon: MagnifyingGlassIcon
  },
  {
    name: 'serivces',
    to: '/services',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'products',
    to: '/products',
    icon: ShoppingBagIcon
  },
]

const productitem = [
  {
    name: 'search',
    to: '/search',
    icon: MagnifyingGlassIcon
  },
  {
    name: 'my products',
    to: '/my-products',
    icon: ShoppingBagIcon
  },
  {
    name: 'Balance',
    to: '/balance',
    icon: CurrencyRupeeIcon
  },
  {
    name: 'serivces',
    to: '/services',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'products',
    to: '/products',
    icon: ShoppingBagIcon
  },
  {
    name: 'My Account',
    to: '/my-account',
    icon: UserIcon
  },
  {
    name: 'Notifications',
    to: '/my-account/notifications',
    icon: BellIcon
  },
  {
    name: 'Logout',
    to: '/my-account/logout',
    icon: ArrowLeftOnRectangleIcon
  },
]



