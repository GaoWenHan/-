import { createHashRouter,Navigate } from 'react-router-dom';
import Layouts from '../layouts';
import Home from '../page/home';
import Cate from '../page/cate';
import Cart from '../page/cart';
import My from '../page/my';
import SearchBox from '../page/search'

const routes = createHashRouter([
    {
        path:'/',
        element:<Navigate to='/layouts' replace />
    },
    {
        path:'/layouts',
        element:<Layouts/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'home',
                element:<Home/>
            },
            {
                path:'cate',
                element:<Cate/>
            },
            {
                path:'cart',
                element:<Cart/>
            },
            {
                path:'my',
                element:<My/>
            }
        ]
    },
    {
        path:'/search',
        element:<SearchBox/>
    }
])

export {
    routes
}