import React, { useState } from "react";
import "./TripPage.css";
import suitcase from "../assets/suitcase.png";
import upcomingIcon from "../assets/upcoming.png";
import compltedIcon from "../assets/complited.png";

const Mytrip = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <>
      <div className="tripPage-container">
        <h2 className="tripPage-title">My Trips</h2>

        <div className="tripPage-card">
          <div className="tripPage-tabs">
            <button
              className={`tripPage-tabBtn ${
                activeTab === "upcoming" ? "active" : ""
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              <img
                src={upcomingIcon}
                alt="upcoming Icon"
                className="tripPage-upcomingIcon"
              />
              UPCOMING
            </button>

            <button
              className={`tripPage-tabBtn ${
                activeTab === "completed" ? "active" : ""
              }`}
              onClick={() => setActiveTab("completed")}
            >
              <img
                src={compltedIcon}
                alt="complted Icon"
                className="tripPage-completedIcon"
              />
              COMPLETED
            </button>
          </div>

          <div className="tripPage-content">
            {activeTab === "upcoming" ? (
              <div className="tripPage-emptyBox">
                <img
                  src={suitcase}
                  alt="No trips"
                  className="tripPage-emptyImg"
                />
                <p className="tripPage-emptyText">
                  Looks empty, you've no upcoming bookings.
                </p>
                <span className="tripPage-smallText">
                When you book a trip, you will see your itinerary here.
                </span>
                <button className="tripPage-planBtn">PLAN A TRIP</button>
              </div>
            ) : (
              <div className="tripPage-emptyBox">
                <img
                  src={suitcase}
                  alt="No trips"
                  className="tripPage-emptyImg"
                />
                <p className="tripPage-emptyText">
                  Looks empty, you've no completed trips yet.
                </p>
                <span className="tripPage2-smallText">
                  Once you complete a trip, you’ll see it here.
                </span>
                <button className="tripPage-planBtn">PLAN A TRIP</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mytrip;
