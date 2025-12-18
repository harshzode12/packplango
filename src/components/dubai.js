import React from "react";
import "./HeroSection.css";
import Dubai from "../assets/Dubai.jpg"; // renamed to avoid confusion with component name

function DubaiHero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${Dubai})` }}
    >
      <div className="hero-content">
        <h1>Dubai – Where Modern Wonders Meet Desert Dreams</h1>
        <p>
          Gaze up at the awe-inspiring Burj Khalifa, stroll through glittering malls,
           and watch the city come alive under the golden desert sun. From futuristic
            skylines to traditional souks, Dubai offers a world of luxury, adventure,
             and unforgettable experiences—day and night.
        </p>
        <button className="explore-btn">Explore now</button>
      </div>
    </section>
  );
}

export default DubaiHero;
