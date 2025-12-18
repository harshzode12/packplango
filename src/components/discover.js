import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./discover.css";
import { apiURL } from "../services/variables.js";

function Discover() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiURL}/categories`);
        const data = await response.json();
        console.log(data);
        
        if (data.result === "success") {
          setCategories(data.data || []);
        } else {
          console.error("Failed to fetch categories:", data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Navigate to category-specific page
  const handleCategoryClick = (cat) => {
    navigate(`/category/${cat._id}`, { state: { title: cat.title } });
  };

  return (
    <div className="discover-container">
      <h2 className="discover-title">Discover Your Way to Travel</h2>

      <div className="discover-grid">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="discover-card"
              style={{
                backgroundImage: `url(${
                  cat.image?.startsWith("http")
                    ? cat.image
                    : `${apiURL.replace("/api", "")}${cat.image}`
                })`,
              }}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="discover-overlay">
                <h3>{cat.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">No categories available.</p>
        )}
      </div>
    </div>
  );
}

export default Discover;
