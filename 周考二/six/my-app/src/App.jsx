import React,{Suspense} from 'react'
import { createHashRouter,RouterProvider} from 'react-router-dom'
import routes from './router'

export default function App() {
  return (
   <Suspense fallback={<div>加载中...</div>}>
      <RouterProvider router={createHashRouter(routes)} />
   </Suspense>
  )
}
