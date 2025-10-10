import React from "react";
import Lottie from "lottie-react";
import animation from "../../assets/LoadingLine.json"; // make sure path is correct
import Logo from "../Logo/Logo";
import DashBoardWrapper from "../DashBoardWrapper/DashBoardWrapper";

const Loading2 = () => {
  return (
    <DashBoardWrapper>
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-accent/20 backdrop-blur-md z-50">
        <div>
          <Logo></Logo>
        </div>{" "}
        <Lottie
          animationData={animation}
          loop={true}
          className="w-48 h-48 md:w-64 md:h-64"
        />
      </div>
    </DashBoardWrapper>
  );
};

export default Loading2;
