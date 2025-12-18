import React, { useState, useEffect } from "react";
import "./nextpage.css";
import { useNavigate } from "react-router-dom";
import { apiURL, baseURL } from "../services/variables.js";

function NextPage() {
  const [activeTab, setActiveTab] = useState("Domestic");
  const [animate, setAnimate] = useState("");
  const [domesticPackages, setDomesticPackages] = useState([]);
  const [overseasPackages, setOverseasPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🌀 Handle tab switch animation
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setAnimate(tab === "Overseas" ? "slide-in-right" : "slide-in-left");
    setTimeout(() => {
      setActiveTab(tab);
      setAnimate("");
    }, 300);
  };

  // 🎯 Navigate to detail page (example)
  const handleCardClick = (placeName) => {
    window.scrollTo(0, 0);
    navigate(`/detail/${placeName}`);
  };

  // 📦 Fetch only "showOnHome" packages from backend
  const fetchHomePackages = async () => {
    try {
      const response = await fetch(`${apiURL}/packages/home`);
      const data = await response.json();

      if (data.result === "success") {
        const packages = data.data || [];

        // 🔍 Separate Domestic and Overseas home packages
        setDomesticPackages(packages.filter((pkg) => pkg.type === "Domestic"));
        setOverseasPackages(packages.filter((pkg) => pkg.type === "Overseas"));
      } else {
        console.warn("⚠️ No home packages found:", data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching home packages:", error);
      setDomesticPackages([]);
      setOverseasPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePackages();
  }, []);

  const displayedPackages =
    activeTab === "Domestic" ? domesticPackages : overseasPackages;

  return (
    <div className="destinations-container">
      <h2 className="section-title">Popular Destinations</h2>

      {/* 🌍 Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "Domestic" ? "tab active" : "tab"}
          onClick={() => handleTabChange("Domestic")}
        >
          Domestic
        </button>
        <button
          className={activeTab === "Overseas" ? "tab active" : "tab"}
          onClick={() => handleTabChange("Overseas")}
        >
          Overseas
        </button>
      </div>

      {/* 🏖️ Packages Grid */}
      {loading ? (
        <p className="loading-text">Loading awesome travel deals...</p>
      ) : (
        <div className={`cards-grid ${animate}`}>
          {displayedPackages.length === 0 ? (
            <p className="no-data">No packages available for this tab.</p>
          ) : (
            displayedPackages.map((place, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleCardClick(place._id)}
              >
                <img
                  src={
                    place.images && place.images.length > 0
                      ? `${baseURL}/uploads/${place.images[0]}`
                      : `${baseURL}/uploads/default.jpg`
                  }
                  alt={place.title}
                  className="card-img"
                />

                <div className="card-info glass-effect">
                  <div className="info-top">
                    <h3 className="destination-title">
                      {place.title}{" "}
                      {place.type === "Overseas" && place.country && (
                        <span className="country-text">
                          ({place.country})
                        </span>
                      )}
                    </h3>
                    {place.price && (
                      <p className="price">
                        ₹{Number(place.price).toLocaleString()}/-
                      </p>
                    )}
                  </div>

                  <div className="rating">
                    <span className="rating-badge">
                      {place.rating}
                      <span className="outof">/5</span>
                    </span>
                    {place.review && (
                      <span className="reviews">({place.review} reviews)</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NextPage;
