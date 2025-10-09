import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../pages/home/home";

const RootLayout = () => {
  return (
    <div className="text-2xl">
      <Navbar></Navbar>
      <Home></Home>
    </div>
  );
};

export default RootLayout;
