import React, { useState } from "react";
import "./month.css";
import { useNavigate, useLocation } from "react-router-dom";

const months = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

function Month() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [days, setDays] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const { place } = location.state || {};  // ✅ carry place forward

  const handleNextClick = () => {
    if (!selectedMonth) {
      alert("Please select a month before continuing!");
      return;
    }

    // ✅ Navigate to Planner with month, days, and place
    navigate("/planner", {
      state: { place, selectedMonth, days }
    });
  };

  // ✅ Enter Dates handler (go back to Calendar)
  const handleEnterDatesClick = () => {
    navigate("/calendar", { state: { place } });
  };

  return (
    <div className="month-page">
      {/* Badge */}
      <div className="month-badge">Editor’s Choice AI</div>

      {/* Heading */}
      <h1 className="month-heading">
        <span className="first-line">When are you going?</span>
      </h1>

      {/* Subtitle */}
      <p className="month-subtitle">Choose month and trip length.</p>

      {/* Month Buttons */}
      <div className="months-grid">
        {months.map((month) => (
          <button
            key={month}
            className={`month-btn ${selectedMonth === month ? "active" : ""}`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Days Counter */}
      <div className="days-counter">
        <span>How many days?</span>
        <button onClick={() => setDays(days > 1 ? days - 1 : 1)}>-</button>
        <span className="days-value">{days}</span>
        <button onClick={() => setDays(days < 7 ? days + 1 : 7)}>+</button>
      </div>

      {/* Enter Dates link */}
      <div 
        className="enter-dates" 
        onClick={handleEnterDatesClick} 
        style={{ cursor: "pointer", textDecoration: "underline" }}
      >
        Enter exact dates.
      </div>

      {/* Next Button */}
      <button className="month-next-btn" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
}

export default Month;
