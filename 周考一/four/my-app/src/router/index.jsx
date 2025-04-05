import { createHashRouter,Navigate } from 'react-router-dom'
import Layouts from '@/layouts'
import AddProject from '@/pages/addProject'
import WorkTable from '@/pages/workTable'
import Detail from '@/pages/detail'
// import Statistical from '@/pages/statistical'

const routes = createHashRouter([
    {
        path:'/',
        element:<Navigate to='/layouts' replace/>
    },
    {
        path:'/layouts',
        element:<Layouts/>,
        children:[
            {
                path:'workTable',
                element:<WorkTable/>
            },
            {
                path:'detail/:id',
                element:<Detail/>
            }
            // {
            //     path:'statistic',
            //     element:<Statistical/>
            // }
        ]
    },
    {
        path:'addProject',
        element:<AddProject/>
    }
])

export default routes;