import React, { lazy } from 'react';
import { createHashRouter,Navigate } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home/index.jsx'));

const routes = createHashRouter([
    {
        path: '/',
        element: <Navigate to='/home' replace />,
    },
    {
        path: '/home',
        element: <Home />,
    }
])


export default routes;