import React, { useState } from "react";
import "./transportation.css";
import { FaPlane, FaTrain, FaBus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function TransportationAI() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { place, selectedTrip, selectedMonth, days, startDate, endDate, categories } =
    location.state || {};

  const handleSelect = (mode) => {
    setSelected(mode);
  };

  const handleNext = () => {
    navigate("/tripmap", {
      state: {
        place,
        selectedTrip,
        selectedMonth,
        days,
        startDate,
        endDate,
        categories,
        transportationMode: selected || "custom",
      },
    });
  };

  const handleCustom = () => {
    navigate("/tripmap", {
      state: {
        place,
        selectedTrip,
        selectedMonth,
        days,
        startDate,
        endDate,
        categories,
        transportationMode: "custom",
      },
    });
  };

  return (
    <div className="transportAI-container">
      <div className="transportAI-header">Editor’s Choice AI</div>
      <h1 className="transportAI-title">Which mode of travel should I plan for you?</h1>
      <p className="transportAI-subtitle">Select one.</p>

      <div className="transportAI-options">
        <div
          className={`transportAI-option ${selected === "flight" ? "transportAI-active" : ""}`}
          onClick={() => handleSelect("flight")}
        >
          <FaPlane className="transportAI-icon" />
          <span className="transportAI-name">Flight</span>
        </div>

        <div
          className={`transportAI-option ${selected === "train" ? "transportAI-active" : ""}`}
          onClick={() => handleSelect("train")}
        >
          <FaTrain className="transportAI-icon" />
          <span className="transportAI-name">Train</span>
        </div>

        <div
          className={`transportAI-option ${selected === "bus" ? "transportAI-active" : ""}`}
          onClick={() => handleSelect("bus")}
        >
          <FaBus className="transportAI-icon" />
          <span className="transportAI-name">Bus</span>
        </div>
      </div>

      <p className="transportAI-custom-option" onClick={handleCustom}>
        I will arrange my own transport
      </p>

      <button className="transportAI-next-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default TransportationAI;
