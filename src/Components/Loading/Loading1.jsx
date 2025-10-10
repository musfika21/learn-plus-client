import React from "react";
import Lottie from "lottie-react";
import animation from "../../assets/GrearLoading.json"; // make sure path is correct
import Logo from "../Logo/Logo";
import DashBoardWrapper from "../DashBoardWrapper/DashBoardWrapper";

const Loading1 = () => {
  return (
    <DashBoardWrapper>
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-accent/50 backdrop-blur-md z-50">
        {/* Logo on top */}
        <div className="w-32 mb-6">
          <Logo />
        </div>

        {/* Lottie animation */}
        <Lottie
          animationData={animation}
          loop={true}
          className="w-48 h-48 md:w-64 md:h-64"
        />
      </div>
    </DashBoardWrapper>
  );
};

export default Loading1;
