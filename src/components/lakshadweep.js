import React from "react";
import "./HeroSection.css";
import lakshadweepImg from "../assets/lakshadweep.jpg"; // renamed to avoid confusion with component name

function LakshadweepHero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${lakshadweepImg})` }}
    >
      <div className="hero-content">
        <h1>Lakshadweep – India’s Hidden Tropical Gem</h1>
        <p>
          A paradise of turquoise waters, swaying palms, and untouched coral reefs, 
          Lakshadweep is a dream for every beach lover. Dive into crystal-clear lagoons, 
          stroll along powdery white sands, and feel the rhythm of island life. Here, 
          nature whispers, and the sea sings.
        </p>
        <button className="explore-btn">Explore now</button>
      </div>
    </section>
  );
}

export default LakshadweepHero;
