import React, { useState, useEffect } from "react";
import "./ExplorePage.css";
import { useParams, useNavigate } from "react-router-dom";
import { apiURL, baseURL } from "../services/variables.js";

function ExplorePage() {
  const { categoryID } = useParams();
  const [category, setCategory] = useState({});
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  // ✅ when user clicks a card, go to /detail/:id
  const handleCardClick = (pkg) => {
    window.scrollTo(0, 0);
    navigate(`/detail/${pkg._id}`); // ✅ Pass package id in URL
  };

  const fetchPackages = async (categoryTitle) => {
    try {
      const decodedTitle = decodeURIComponent(categoryTitle);

      const subRes = await fetch(`${apiURL}/packages/subcategory/${decodedTitle}`);
      const subData = await subRes.json();

      if (subData.result === "success" && subData.data.length > 0) {
        setPackages(subData.data);
      } else {
        const catRes = await fetch(`${apiURL}/packages/category/${decodedTitle}`);
        const catData = await catRes.json();
        setPackages(catData.data || []);
      }

      const categoryResponse = await fetch(`${apiURL}/categories/${decodedTitle}`);
      const categoryData = await categoryResponse.json();
      setCategory(categoryData.data || {});
    } catch (error) {
      console.error("Error fetching packages:", error);
      setCategory({});
      setPackages([]);
    }
  };

  useEffect(() => {
    if (categoryID) {
      fetchPackages(categoryID);
    }
  }, [categoryID]);

  const formatHeading = (str) => {
    if (!str) return "Explore More Destinations";
    const spaced = decodeURIComponent(str).replace(/([A-Z])/g, " $1").trim();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  };

  return (
    <div className="explore-container">
      <h2 className="explore-title">{formatHeading(category.title || categoryID)}</h2>

      <div className="explore-grid">
        {packages.length === 0 ? (
          <p className="explore-no-data">No packages found</p>
        ) : (
          packages.map((place, index) => (
            <div
              className="explore-card"
              key={index}
              onClick={() => handleCardClick(place)} // ✅ sends the full object
            >
              <img
                src={`${baseURL}/uploads/${place.images?.[0]}`}
                alt={place.title}
                className="explore-card-img"
              />

              <div className="explore-card-info explore-glass">
                <div className="explore-info-top">
                  <h3 className="explore-destination-title">
                    {place.title}
                    {place.country && (
                      <span className="explore-country-text">
                        ({place.country})
                      </span>
                    )}
                  </h3>

                  {place.price && (
                    <p className="explore-price">
                      ₹{Number(place.price).toLocaleString()}/-
                    </p>
                  )}
                </div>

                <div className="explore-rating">
                  <span className="explore-rating-badge">
                    {place.rating}
                    <span className="explore-outof">/5</span>
                  </span>
                  {place.review && (
                    <span className="explore-reviews">
                      ({place.review} reviews)
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
