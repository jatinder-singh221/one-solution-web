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
        path: '/products',
        element: <Products />,
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
])

export default routes