import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import button from "../assets/button.png";
import profile from "../assets/profile.png";
import MyPage from "./MyPage"; // 👈 Import your MyPage component

function Navbar({ scrollToPackages, scrollToDiscover, scrollToAboutUs }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <nav className="navbar">
        {/* Left side logo */}
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
          <span>PackPlanGo</span>
        </div>

        {/* Middle navigation links */}
        <ul className="navbar-links">
          <li>Home</li>
          <li onClick={scrollToPackages}>Package</li>
          <li onClick={scrollToDiscover}>Tour</li>
          <li onClick={scrollToAboutUs}>About Us</li>
        </ul>

        {/* Profile image (opens popup) */}
        <div className="navbar-profile">
          <img
            src={profile}
            alt="Profile"
            className="profile-img"
            onClick={togglePopup}
            style={{ cursor: "pointer" }}
          />
        </div>
      </nav>

      {/* Floating button with texts */}
      <div className="floating-button">
        <div className="glassy-image">
          <Link to="/editor">
            <img src={button} alt="Floating Button" />
          </Link>
          <span className="button-text-editor">Editor's Choice</span>
          <span className="button-text-ai">A.I</span>
        </div>
      </div>

      {/* 🪄 Popup overlay */}
      {showPopup && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button className="close-btn" onClick={togglePopup}>
              ✖
            </button>
            <MyPage />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
