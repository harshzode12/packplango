import React from "react";
import "./Rewards.css";
import rewardIcon from "../assets/star.png"; // ✅ import image from assets

const Rewards = () => {
  return (
    <div className="rewards-page">
      <h2 className="rewards-title">My Rewards</h2>

      <div className="reward-card">
        <div className="reward-balance-section">
          <h1 className="reward-amount">$0</h1>
          <p className="reward-balance-text">REWARD BALANCE</p>
        </div>
        <div className="reward-bonus-section">
          {/* ✅ Image replaces emoji */}
          <img src={rewardIcon} alt="Reward Icon" className="star" />     
          <p className="reward-bonus-text">Reward Bonus</p>
          <p className="reward-bonus-amount">$100</p>
        </div>
      </div>

      <div className="reward-table">
        <div className="table-header">CATEGORY</div>

        <div className="table-row">
          <span>Domestic <b>Flights</b></span>
          <span className="amount">Rs. 500 or 5% of total booking amount*</span>
        </div>

        <div className="table-row">
          <span>International <b>Flights</b></span>
          <span className="amount">Rs. 1250 or 5% of total booking amount*</span>
        </div>

        <div className="note">
          NOTE : In flight booking, reward bonus cannot be applied along with coupon
        </div>

        <div className="table-row">
          <span>Domestic <b>Hotels</b></span>
          <span className="amount">Rs. 2000 or 5% of total pre-tax booking amount*</span>
        </div>

        <div className="table-row">
          <span>International <b>Hotels</b></span>
          <span className="amount">Rs. 2000 or 5% of total booking amount*</span>
        </div>

        <div className="table-row">
          <span><b>Trains</b></span>
          <span className="amount">Rs. 2000 or 5% of total booking amount*</span>
        </div>
      </div>
    </div>
  );
};

export default Rewards;