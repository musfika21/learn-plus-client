import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [

    ]
  },
  {
    path: "register",
    Component: Register
  },
  {
    path: "login",
    Component: Login
  }
]);
