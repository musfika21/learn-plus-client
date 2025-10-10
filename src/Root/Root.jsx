import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Home from "../Pages/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home
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
  }
]);