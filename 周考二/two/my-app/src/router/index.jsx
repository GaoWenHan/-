import { createHashRouter,Navigate,createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home';
import Login from '@/pages/Login';
import UserEdit from '@/pages/userEdit';
import UserSex from '@/pages/userSex';

const routes = createBrowserRouter([
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
    },
    {
        path:'/userEdit',
        element:<UserEdit/>
    },
    {
        path:'/userSex',
        element:<UserSex/>
    }
])

export default routes;