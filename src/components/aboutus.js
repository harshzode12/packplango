import React from "react";
import "./aboutus.css";
import logo from "../assets/logo.png";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Heading */}
      <h1 className="heading">Pack smart, Plan right, Go far</h1>

      {/* Content Section */}
      <div className="content">
        {/* About Us */}
        <div className="section">
          <h2>About Us</h2>
          <p>
            At PackPlanGo, we believe travel shouldn’t just be a dream — it should be 
            easy, affordable, and perfectly planned. We’re a team of travel lovers 
            and budget-conscious explorers who know that the best journeys are the ones 
            where you don’t have to compromise between experience and expenses.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="section">
          <h2>Why choose us</h2>
          <ul>
            <li>Budget-first planning – Trips tailored to your spending comfort.</li>
            <li>Smart recommendations – AI helps you discover hidden gems and deals.</li>
            <li>Transparent packages – No hidden costs, just clear breakdowns.</li>
            <li>Traveler-first approach – Reviews, tips, and support from real travelers.</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="section contact">
          <h2>Contact Us</h2>
          <p><a href="#">Customer Support</a></p>
          <p><a href="#">Service Guarantee</a></p>
          <p><a href="#">More Service Info</a></p>
        </div>
      </div>

      {/* Footer */}
                <footer className="footer">
            <div className="footer-logo">
              <img src={logo} alt="PackPlanGo Logo" className="logo-img" />
              <h2 className="footer-title">PackPlanGo</h2>
            </div>
            <p className="footer-text">
              PackPlanGo is, one of the world’s leading providers of travel services.
            </p>
          </footer>

          {/* ✅ Move copyright OUTSIDE footer */}
          <div className="copyright">
            <p>
              Copyright © 2025 PackPlanGo Pvt. Ltd. All rights reserved <br />
              Site Operator: PackPlanGo Pvt. Ltd.
            </p>
          </div>

    </div>
  );
};

export default AboutUs;