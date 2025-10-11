import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // ✅ Import default styles
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/img1.png";
import img2 from "../../../assets/img2.png";
import img3 from "../../../assets/img3.png";

const Banner = () => {
  return (
    <div className="m-1 shadow-xl shadow-primary/50 rounded-2xl overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        stopOnHover
        swipeable
        emulateTouch
        transitionTime={1000}
      >
        <div>
          <img src={img1} alt="Slide 1" className="rounded-2xl" />
        </div>
        <div>
          <img src={img2} alt="Slide 2" className="rounded-2xl" />
        </div>
        <div>
          <img src={img3} alt="Slide 3" className="rounded-2xl" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
