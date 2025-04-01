import { createHashRouter,Navigate } from 'react-router-dom'
import Layouts from '@/layouts'
import Home from '@/pages/home'
import Cate from '@/pages/cate'
import Cart from '@/pages/cart'
import My from '@/pages/my'

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
                element:<Navigate to='home' replace/>
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
                element:<Cate/>
            },
            {
                path:'my',
                element:<My/>
            }
        ]
    }
])

export default routes;