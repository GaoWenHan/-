import React from 'react'
import routes from '@/router/index'
import { RouterProvider } from 'react-router-dom'

export default function App() {
  return (
    <RouterProvider router={routes} />
  )
}
