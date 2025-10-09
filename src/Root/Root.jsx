import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import home from "../pages/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
      {
        index:true,
        Component:home
      }
    ]
  },
]);
