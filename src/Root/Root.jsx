import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import DashLayout from "../Layout/DashLayout";
import Error from '../Components/Error/Error';
import Home from "../pages/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '*',
        Component: Error
      }
    ]
  },
  {
    path: "/register",
    Component: Register
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: '/dashboard',
    Component: DashLayout
  }
]);
