import React, { useState } from 'react';
import './calendar.css';
import { useNavigate, useLocation } from "react-router-dom";

const Calendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const today = new Date();
  const navigate = useNavigate();
  const location = useLocation();
  const { place } = location.state || {}; // ✅ Get place from Editor

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendarDays = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    while (days.length < 42) days.push(null);
    return days;
  };

  const handleDateClick = (day, monthOffset) => {
    if (!day) return;
    const clickedDate = new Date(currentYear, currentMonth + monthOffset, day);

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
      return;
    }
    if (clickedDate < selectedStartDate) {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
      return;
    }

    const diffTime = clickedDate - selectedStartDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 6) {
      setSelectedEndDate(clickedDate);
    } else {
      alert('You can select a maximum of 7 days!');
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
    }
  };

  const isDateInRange = (date, start, end) => {
    if (!start) return false;
    if (!end) return date.toDateString() === start.toDateString();
    return date >= start && date <= end;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  // ✅ Next button handler
  const handleNextClick = () => {
    if (!selectedStartDate) {
      alert("Please select at least a start date to continue.");
      return;
    }
    const diffTime = selectedEndDate
      ? new Date(selectedEndDate) - new Date(selectedStartDate)
      : 0;
    const days = selectedEndDate
      ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      : 1;

    navigate("/planner", {
      state: { place, startDate: selectedStartDate, endDate: selectedEndDate, days }
    });
  };

  // ✅ "I don’t know my dates yet" handler → Go to Month page
  const handleSkipDates = () => {
    navigate("/month", {
      state: { place }  // pass place along
    });
  };

  const renderMonth = (offset) => {
    const displayDate = new Date(currentYear, currentMonth + offset);
    const monthName = displayDate.toLocaleString('en-US', { month: 'long' });
    const year = displayDate.getFullYear();
    const days = generateCalendarDays(year, displayDate.getMonth());
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
      <div className="month-container">
        <div className="month-header">
          {offset === 0 && <span className="arrow" onClick={handlePrevMonth}>&lt;</span>}
          <span className="month-title">{monthName} {year}</span>
          {offset === 1 && <span className="arrow" onClick={handleNextMonth}>&gt;</span>}
        </div>
        <div className="days-grid">
          {dayNames.map((d) => <div key={d} className="day-name">{d}</div>)}
          {days.map((day, i) => {
            const date = day ? new Date(year, displayDate.getMonth(), day) : null;
            const isSelected =
              date &&
              ((selectedStartDate && date.toDateString() === selectedStartDate.toDateString()) ||
                (selectedEndDate && date.toDateString() === selectedEndDate.toDateString()) ||
                isDateInRange(date, selectedStartDate, selectedEndDate));
            const isToday = day && date.toDateString() === today.toDateString();
            return (
              <div
                key={i}
                className={`day-cell ${day ? '' : 'empty'} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => handleDateClick(day, offset)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-page">
      <div className="calendar-badge">Editor's Choice AI</div>
      <h1 className="calendar-heading">When are you going?</h1>
      <p className="calendar-subtitle">Choose a date range, up to 7 days.</p>
      <div className="calendars-wrapper">
        {renderMonth(0)}
        {renderMonth(1)}
      </div>

      {/* ✅ Skip Button */}
      <button className="skip-button" onClick={handleSkipDates}>
        I don’t know my dates yet
      </button>

      <button className="next-button" onClick={handleNextClick}>Next</button>
    </div>
  );
};
export default Calendar;
