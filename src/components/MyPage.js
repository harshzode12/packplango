import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePopup.css";

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-popup-container">
      {/* My Rewards Card */}
      <div
        className="profile-popup-card clickable-card"
        onClick={() => navigate("/rewards")}
      >
        <h3 className="profile-popup-title">My Rewards</h3>
        <p className="profile-popup-text">
          Book trips, earn rewards, and unlock exclusive travel benefits.
        </p>
      </div>

      {/* My Trips Card */}
      <div
        className="profile-popup-card clickable-card"
        onClick={() => navigate("/mytrip")}
      >
        <h3 className="profile-popup-title">My Trips</h3>
        <p className="profile-popup-text">
          Your journeys, organized and ready to explore.
        </p>
      </div>
    </div>
  );
};

export default MyPage;
