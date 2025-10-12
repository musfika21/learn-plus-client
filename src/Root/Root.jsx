import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Home from "../Pages/home/home";
import DashLayout from "../Layout/DashLayout";
import Error from "../Components/Error/Error";
import AuthLayout from "../Layout/AuthLayout";
import DashHome from "../pages/DashBoard/DashHome";
import AddClass from "../pages/DashBoard/AddClass/AddClass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashLayout,
    children:[
      {
        index:true,
        Component:DashHome
      },
      {
        path:'addClass',
        Component:AddClass
      }
    ]
  },
]);
