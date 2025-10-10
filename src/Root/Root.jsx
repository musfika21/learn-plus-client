import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/home/home";
import DashLayout from "../Layout/DashLayout";
import Error from '../Components/Error/Error'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'*',
        Component:Error
      }
    ]
  },
  {
    path:'/dashBoard',
    Component:DashLayout
  }
]);
