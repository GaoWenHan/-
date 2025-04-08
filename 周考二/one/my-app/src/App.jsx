import React,{Suspense} from 'react'
import { BrowserRouter as Router,createBrowserRouter,RouterProvider } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary/index.jsx'
import Routes from './router/index.jsx'

const router = createBrowserRouter(Routes);

export default function App() {
  return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
  )
}
