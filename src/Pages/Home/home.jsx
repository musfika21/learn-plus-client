import React, { useState, useEffect } from "react";
import Banner from "./Banner/banner";
import Loading1 from "../../Components/Loading/Loading1";
import Features from "./Features/Features";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && <Loading1 />}
      <Banner />
      <Features></Features>
    </div>
  );
};

export default Home;
