import React from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import animation from "../../assets/404Light.json";

const Error = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); // navigate to home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-accent">
      {/* Lottie Animation */}
      <Lottie
        animationData={animation}
        loop={true}
        className="w-64 h-64 md:w-96 md:h-96"
      />

      {/* Error Message */}
      <h1 className="text-3xl md:text-5xl font-bold text-primary mt-6 text-center">
        Oops! Page Not Found
      </h1>
      <p className="text-secondary text-lg md:text-xl mt-2 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved. Please
        check the URL or return to the homepage.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={handleBackHome}
        className="mt-6 px-6 py-3 bg-primary text-neutral font-semibold rounded-lg shadow-lg hover:bg-primary/80 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Error;
