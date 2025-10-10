import React from "react";
import img from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      {" "}
      <div className="flex items-end">
        <img className="mb-1 w-6 md:w-8" src={img} alt="" />
        <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-primary -ml-2 md:-ml-3">
          Learn<span className="text-secondary">Plus</span>
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
