import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Navbar from "./components/Navbar";

// ✅ Import components from components folder
import JapanHero from "./components/japan";
import SingaporeHero from "./components/singapore";
import DubaiHero from "./components/dubai";
import LakshadweepHero from "./components/lakshadweep";
import ParisHero from "./components/paris";
import BaliHero from "./components/bali";
import NextPage from "./components/nextpage";
import Discover from "./components/discover";
import AboutUs from "./components/aboutus";


import "./App.css";

// Custom Arrows
function PrevArrow({ onClick }) {
  return (
    <div className="slick-arrow custom-prev" onClick={onClick}>
      <FaChevronLeft size={20} color="#fff" />
    </div>
  );
}
function NextArrow({ onClick }) {
  return (
    <div className="slick-arrow custom-next" onClick={onClick}>
      <FaChevronRight size={20} color="#fff" />
    </div>
  );
}

function Home() {
  const nextPageRef = useRef(null);
  const discoverRef = useRef(null);
  const aboutUsRef = useRef(null);

  const scrollToPackages = () =>
    nextPageRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToDiscover = () =>
    discoverRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToAboutUs = () =>
    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      {/* ✅ Navbar is inside Home now */}
      <Navbar
        scrollToPackages={scrollToPackages}
        scrollToDiscover={scrollToDiscover}
        scrollToAboutUs={scrollToAboutUs}
      />

      <div className="full-section">
        <Slider {...settings}>
          <div><JapanHero /></div>
          <div><SingaporeHero /></div>
          <div><BaliHero /></div>
          <div><DubaiHero /></div>
          <div><LakshadweepHero /></div>
          <div><ParisHero /></div>
        </Slider>
      </div>

      <div ref={nextPageRef} className="section-scroll">
        <NextPage />
      </div>

      <div ref={discoverRef} className="section-scroll">
        <Discover />
      </div>

      <div ref={aboutUsRef} className="section-scroll">
        <AboutUs />
      </div>
    </>
  );
}

export default Home;
