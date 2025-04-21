import React, { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';

const Layouts = lazy(() => import('../layouts/index.jsx'));
const Home = lazy(() => import('../pages/home/index.jsx'));
const FloorPage = lazy(() => import('../pages/floorPage/index.jsx'))

const routes = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/layout" replace />,
  },
  {
    path: '/layout',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'floorPage',
        element: <FloorPage />
      }
    ],
  },
]);

export default routes;
