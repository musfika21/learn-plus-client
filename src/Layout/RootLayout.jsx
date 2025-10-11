import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../pages/home/home";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="mx-auto">
      <Navbar></Navbar>
      <div className="max-w-screen-xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
