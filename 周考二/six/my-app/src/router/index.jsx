import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Login = lazy(() => import('@/pages/login'))
const Home  = lazy(() => import('@/pages/home'))


const routes = [
    {
        path:'/',
        element:<Navigate to='/login' replace />,
    },
    {
        path:'/login',
        element:<Login />,
    },
    {
        path:'/home',
        element:<Home />,
    }
]

export default routes;