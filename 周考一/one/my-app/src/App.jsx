import React from 'react'
import { routes } from './router'
import { RouterProvider } from 'react-router-dom';

export default function App() {
  return <RouterProvider router={routes} />
}
