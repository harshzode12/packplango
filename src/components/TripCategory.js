import React, { useState } from "react";
import "./TripCategory.css";
import { useNavigate, useLocation } from "react-router-dom";

function TripCategory() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get data from Planner
  const { place, selectedTrip, selectedMonth, days, startDate, endDate } =
    location.state || {};

  const options = [
    "Must-see Attractions",
    "Historic landmark",
    "Hill station",
    "Natural Parks",
    "Cultural Heritage",
    "Temples & Spiritual sites",
    "Shopping",
    "Street food Tours",
    "Art & Museums",
    "Nature Escape",
    "Hidden Gems",
    "Photography",
  ];

  const toggleSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      if (selected.length < 6) {
        setSelected([...selected, item]);
      } else {
        alert("You can select up to 6 options only.");
      }
    }
  };

  const handleNextClick = () => {
    if (selected.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    navigate("/transportation", {
      state: {
        place,
        selectedTrip,
        selectedMonth,
        days,
        startDate,
        endDate,
        categories: selected,
      },
    });
  };

  return (
    <div className="tripCategory-page">
      <div className="tripCategory-badge">Editor's Choice AI</div>
      <h1 className="tripCategory-main-heading">
        <span>Your trip, your way.</span>
      </h1>
      <p className="tripCategory-sub-text">Select your interests below:</p>

      <div className="tripCategory-options-grid">
        {options.map((item, index) => (
          <button
            key={index}
            className={`tripCategory-option-btn ${
              selected.includes(item) ? "selected" : ""
            }`}
            onClick={() => toggleSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="tripCategory-next-btn" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
}

export default TripCategory;
