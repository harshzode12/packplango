import React from "react";
import "./HeroSection.css";
import Paris from "../assets/Paris.jpg"; // renamed to avoid confusion with component name

function ParisHero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${Paris})` }}
    >
      <div className="hero-content">
        <h1>Paris – The City of Love & Timeless Charm</h1>
        <p>
          From the iconic Eiffel Tower sparkling under the night sky to the charming cobblestone streets lined with cafés,
           Paris is a celebration of romance, art, and history. Stroll along the Seine, admire masterpieces in the Louvre,
            and savor the aroma of fresh croissants in the morning air.
        </p>
        <button className="explore-btn">Explore now</button>
      </div>
    </section>
  );
}

export default ParisHero; 
