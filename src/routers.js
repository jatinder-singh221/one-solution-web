import { createBrowserRouter } from 'react-router-dom'

import Landing from './pages/Landing'
import Error from './core/Error'
import ProfessionalRegister from './pages/RegisterProfessional'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import SignUp from './pages/SignUp'
import Services from './pages/Services'
import Products from './pages/Products'
import Registerservice from './pages/Registerservice'
import Registerproduct from './pages/Registerproducts'
import MyAccount from './pages/MyAccount'
import MyDetails from './pages/MyDetails'
import Security from './pages/Security'
import Logout from './pages/Logout'
import Notifications from './pages/Notifications'
import Dashboard from './pages/Dashboard'
import Switch from './pages/Switch'
import ServiceSlug from './pages/ServiceSlug'
import Productslug from './pages/ProductSlug'
import Search from './pages/Search'
import BookService from './pages/BookService'
import BookProducts from './pages/BookProduct'
import About from './pages/About'
import TermsCondation from './pages/TermsCondation'
import Report from './pages/Report'
import ProductsAndServicesProvider from './pages/ProductsAndServicesProvider'
import MyServices from './pages/MyServices'
import MyProducts from './pages/MyProducts'


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
        errorElement: <Error />
    },
    {
        path: '/register-as-professional',
        element: <ProfessionalRegister />,
        errorElement: <Error />
    },
    {
        path: '/search',
        element: <Search />,
        errorElement: <Error />
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />
    },

    {
        path: '/forget-password',
        element: <ForgetPassword />,
        errorElement: <Error />
    },
    {
        path: '/sign-up',
        element: <SignUp />,
        errorElement: <Error />
    },
    {
        path: '/services',
        element: <Services />,
        errorElement: <Error />
    },
    {
        path: '/services/:slug',
        element: <ServiceSlug />,
        errorElement: <Error />
    },
    {
        path: '/products',
        element: <Products />,
        errorElement: <Error />
    },
    {
        path: '/products/:slug',
        element: <Productslug />,
        errorElement: <Error />
    },
    {
        path: '/register-service',
        element: <Registerservice />,
        errorElement: <Error />
    },
    {
        path: '/register-product',
        element: <Registerproduct />,
        errorElement: <Error />
    },
    {
        path: '/my-account',
        element: <MyAccount />,
        errorElement: <Error />,
        children: [
            {
                path: '',
                element: <MyDetails />,
                errorElement: <Error />
            },
            {
                path: 'security',
                element: <Security />,
                errorElement: <Error />
            },
            {
                path: 'notifications',
                element: <Notifications />,
                errorElement: <Error />
            },
            {
                path: 'logout',
                element: <Logout />,
                errorElement: <Error />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <Error />
    },
    {
        path: '/switch',
        element: <Switch />,
        errorElement: <Error />
    },
    {
        path: '/book-now-service',
        element: <BookService />,
        errorElement: <Error />
    },
    {
        path: '/book-now-product',
        element: <BookProducts />,
        errorElement: <Error />
    },
    {
        path: '/about',
        element: <About />,
        errorElement: <Error />
    },
    {
        path: '/terms',
        element: <TermsCondation />,
        errorElement: <Error />
    },
    {
        path: '/report',
        element: <Report />,
        errorElement: <Error />
    },
    {
        path: 'details/:slug',
        element: <ProductsAndServicesProvider />,
        errorElement: <Error />
    },
    {
        path: 'my-services',
        element: <MyServices />,
        errorElement: <Error />
    },
    {
        path: 'my-products',
        element: <MyProducts />,
        errorElement: <Error />
    },
])

export default routes