import React from "react";
import { lazy } from "react";
import { createHashRouter,Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/home/index.jsx"));
const Search = lazy(() => import("../pages/search/index.jsx"));


const routes = createHashRouter([
    {
        path: "/",
        element: <Navigate to="/home" replace />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/search",
        element: <Search />,
    }
])

export default routes;