import React from "react";
import "./HeroSection.css";
import Singapore from "../assets/Singapore.jpg"; // renamed to avoid confusion with component name

function SingaporeHero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${Singapore})` }}
    >
      <div className="hero-content">
        <h1>Ladakh – Where Rivers Meet the Sky</h1>
        <p>
          Snow-kissed peaks, turquoise rivers, and the endless whispers of the Himalayas.
          Breathe in the crisp mountain air as the Indus and Zanskar embrace. Every turn
          is a postcard, every moment a timeless memory.
        </p>
        <button className="explore-btn">Explore now</button>
      </div>
    </section>
  );
}

export default SingaporeHero;
