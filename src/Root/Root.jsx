import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/home/home";
import DashLayout from "../Layout/DashLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
      {
        index:true,
        Component:Home
      }
    ]
  },
  {
    path:'/dashBoard',
    Component:DashLayout
  }
]);
