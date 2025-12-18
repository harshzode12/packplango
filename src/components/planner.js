import React, { useState } from 'react';
import './planner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";

const Planner = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get data from Calendar
  const { place, selectedMonth, days, startDate, endDate } = location.state || {};

  const tripOptions = [
    { name: 'Solo Trip', icon: faUser },
    { name: 'Partner Trip', icon: faHeart },
    { name: 'Friends Trip', icon: faUsers },
    { name: 'Family Trip', icon: faHome },
  ];

  const handleSelectTrip = (tripName) => {
    setSelectedTrip(tripName);
  };

  const handleNextClick = () => {
    if (selectedTrip) {
      navigate("/TripCategory", {
        state: { place, selectedTrip, selectedMonth, days, startDate, endDate }
      });
    } else {
      alert('Please select a trip type.');
    }
  };

  return (
    <div className="planner-container">
      <div className="planner-header">
        <div className="editor-choice">Editor's Choice AI</div>
        <h1 className="planner-title">What kind of trip are you planning?</h1>
        <p className="planner-subtitle">Select one.</p>
      </div>

      {/* ✅ Show selected details */}
      <div className="selected-dates">
        {place && <p>Destination: {place}</p>}
        {selectedMonth && <p>Selected Month: {selectedMonth}</p>}
        {days && <p>Trip Length: {days} days</p>}
        {startDate && (
          <p>
            Selected Dates: {new Date(startDate).toDateString()}
            {endDate ? " - " + new Date(endDate).toDateString() : ""}
          </p>
        )}
      </div>

      <div className="trip-options">
        {tripOptions.map((option) => (
          <div
            key={option.name}
            className={`trip-card ${selectedTrip === option.name ? 'selected' : ''}`}
            onClick={() => handleSelectTrip(option.name)}
          >
            <div className="trip-icon">
              <FontAwesomeIcon icon={option.icon} />
            </div>
            <p className="trip-name">{option.name}</p>
          </div>
        ))}
      </div>

      <button className="planner-next-button" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Planner;
