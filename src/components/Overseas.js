import React, { useState } from "react";
import "./nextpage.css";

// Import images
import LucerneImg from "../assets/lucerne.jpg";
import MoscowImg from "../assets/moscow.jpg";
import SaharaImg from "../assets/sahara.jpg";
import SiberiaImg from "../assets/Siberia.jpg";
import VeniceImg from "../assets/Venice.jpg";
import BarcelonaImg from "../assets/Barcelona.jpg";
import LasVegasImg from "../assets/Lasvegas.jpg";
import SydneyImg from "../assets/Sydney.jpg";

const destinations = {
  Overseas: [
    {
      name: "Lucerne",
      price: "₹24,999/-",
      rating: "4.9",
      outOf: "/5",
      reviews: "4510",
      image: LucerneImg,
      tag: "Lucerne",
    },
    {
      name: "Moscow",
      price: "₹15,999/-",
      rating: "4.9",
      outOf: "/5",
      reviews: "4258",
      image: MoscowImg,
      tag: "Moscow",
    },
    {
      name: "Sahara",
      price: "₹22,999/-",
      rating: "4.8",
      outOf: "/5",
      reviews: "3557",
      image: SaharaImg,
      tag: "Sahara",
    },
    {
      name: "Siberia",
      price: "₹17,999/-",
      rating: "4.7",
      outOf: "/5",
      reviews: "3012",
      image: SiberiaImg,
      tag: "Siberia",
    },
    {
      name: "Venice",
      price: "₹27,999/-",
      rating: "4.6",
      outOf: "/5",
      reviews: "2914",
      image: VeniceImg,
      tag: "Venice",
    },
    {
      name: "Barcelona",
      price: "₹30,999/-",
      rating: "4.5",
      outOf: "/5",
      reviews: "2537",
      image: BarcelonaImg,
      tag: "Barcelona",
    },
    {
      name: "Las Vegas",
      price: "₹39,999/-",
      rating: "4.3",
      outOf: "/5",
      reviews: "2371",
      image: LasVegasImg,
      tag: "Las Vegas",
    },
    {
      name: "Sydney",
      price: "₹35,999/-",
      rating: "4.2",
      outOf: "/5",
      reviews: "2105",
      image: SydneyImg,
      tag: "Sydney",
    },
  ],
};

function OverseasPage() {
  const [activeTab, setActiveTab] = useState("Overseas");

  return (
    <div className="destinations-container">
      <h2 className="section-title">Popular Overseas Destinations</h2>

      <div className="tabs">
        <button
          className={activeTab === "Overseas" ? "tab active" : "tab"}
          onClick={() => setActiveTab("Overseas")}
        >
          Overseas
        </button>
      </div>

      <div className="cards-grid">
        {destinations[activeTab].map((place, index) => (
          <div className="card" key={index}>
            <img src={place.image} alt={place.name} className="card-img" />

            {/* Overlay glass info box inside image */}
            <div className="card-info glass-effect">
              <div className="info-top">
                <h3>{place.name}</h3>
                <p className="price">{place.price}</p>
              </div>
              <div className="rating">
                <span className="rating-badge">
                  {place.rating}
                  <span className="outof">{place.outOf}</span>
                </span>
                <span className="reviews"> ({place.reviews} reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverseasPage;
