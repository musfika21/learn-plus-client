import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../pages/home/home";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
