import React, { useState } from "react";
import "./hotel.css";

const hotels = [
  {
    id: 1,
    name: "The King’s Hotel",
    rating: 4.5,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: 2,
    name: "The Paradise Hotel",
    rating: 4.2,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f",
  },
  {
    id: 3,
    name: "The Royals",
    rating: 3.2,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
];

function Hotel() {
  const [search, setSearch] = useState("");

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="hotelUI-star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="hotelUI-star half">★</span>);
      } else {
        stars.push(<span key={i} className="hotelUI-star">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="hotelUI-page">
      <div className="hotelUI-search-bar">
        <span className="hotelUI-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search hotel"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="hotelUI-list">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="hotelUI-card">
            <img src={hotel.image} alt={hotel.name} className="hotelUI-image" />
            <div className="hotelUI-info">
              <h3>{hotel.name}</h3>
              <div className="hotelUI-rating">
                <span>{hotel.rating}</span>
                <span className="hotelUI-stars">{renderStars(hotel.rating)}</span>
                <span className="hotelUI-reviews">({hotel.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotel;
