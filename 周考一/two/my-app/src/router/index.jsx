import { createHashRouter, Navigate } from "react-router-dom";
import Layouts from "../Layouts";
import WarseHouse from "../page/warehouse";

const routes = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/Layouts" replace />,
  },
  {
    path: "/Layouts",
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Navigate to="warseHouse" replace />,
      },
      {
        path: "warseHouse",
        element: <WarseHouse />,
      },
    ],
  },
]);

export { routes };
