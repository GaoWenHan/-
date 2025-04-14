import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const List = lazy(() => import('@/pages/list'));
const Search = lazy(() => import('@/pages/search'));
const Cart = lazy(() => import('@/pages/cart'));

const routes = [
    {
        path:'/',
        element:<Navigate to='/search' replace />
    },
    {
        path:'/search',
        element:<Search />
    },
    {
        path:'/list',
        element:<List />
    },
    {
        path:'/cart',
        element:<Cart />
    }
]

export default routes;