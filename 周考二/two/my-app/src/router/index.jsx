import { createHashRouter,Navigate } from 'react-router-dom';
import Home from '@/pages/home';
import Login from '@/pages/Login';

const routes = createHashRouter([
    {
        path:'/',
        element:<Navigate to='/login' replace />
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/home',
        element:<Home/>
    }
])

export default routes;