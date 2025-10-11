import React from "react";
import { Outlet, useNavigate } from "react-router";
import Lottie from "lottie-react";
import animation from "../assets/FaceLoginSuccess.json";
import Logo from "../Components/Logo/Logo";
import { FaArrowLeft } from "react-icons/fa";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-6">
        <Logo />
      </div>

      {/* Animation */}
      <div className="flex gap-5">
        <div className="mb-4 w-full md:w-1/2">
          <Lottie animationData={animation} loop={true} />
        </div>

        {/* Auth Form Area */}
        <div className="w-full md:w-1/2">
          <Outlet />
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-all duration-300"
      >
        <FaArrowLeft className="text-lg" /> Back
      </button>
    </div>
  );
};

export default AuthLayout;
