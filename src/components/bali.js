import React from "react";
import "./HeroSection.css";
import Bali from "../assets/Bali.jpg"; // renamed to avoid confusion with component name

function BaliHero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${Bali})` }}
    >
      <div className="hero-content">
        <h1>Bali – Island of Gods and Timeless Beauty</h1>
        <p>
          From serene temples floating on tranquil lakes to lush rice terraces and sun-kissed beaches,
           Bali is a paradise of culture and nature. Watch the sunrise over sacred Mount Agung,
            wander through vibrant markets, or lose yourself in the rhythm of ocean waves—every
             moment here feels like a blessing.
        </p>
        <button className="explore-btn">Explore now</button>
      </div>
    </section>
  );
}

export default BaliHero;
