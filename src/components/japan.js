import React from "react";
import "./HeroSection.css";
import japan from "../assets/Japan.jpg";


function JapanHero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${japan})` }}
    >
      <div className="hero-content">
        <h1>Japan – Land of Serenity & Tradition</h1>
        <p>
          From the snow-capped glory of <strong>Mount Fuji</strong> to the
          peaceful red pagodas overlooking ancient towns, Japan offers a
          journey through breathtaking landscapes and centuries-old culture.
        </p>
        <button className="explore-btn">Explore now</button>
      </div>
    </section>
  );
}

export default JapanHero;
