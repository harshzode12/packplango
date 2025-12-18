import React from "react";
import styles from "./Adventure.module.css"; // ✅ CSS Module import

// Importing images
import Udaipur from "../assets/Udaipur.jpg";
import Ooty from "../assets/Ooty.jpg";
import Nainital from "../assets/Nainital.jpg";
import Gangtok from "../assets/Gangtok.jpg";
import Disneyland from "../assets/Disneyland.jpg";
import Tunnel from "../assets/Cu Chi Tunnel.jpg";
import Island from "../assets/Easter Island.jpg";
import Amsterdam from "../assets/Amsterdam.jpg";

const trips = [
  { name: "Udaipur", country: "Rajasthan", price: "₹25,499/-", rating: 4.9, reviews: 4510, img: Udaipur },
  { name: "Ooty", country: "Tamil Nadu", price: "₹26,999/-", rating: 4.8, reviews: 4258, img: Ooty},
  { name: "Nainital", country: "Uttarakhand", price: "₹38,499/-", rating: 4.7, reviews: 3557, img: Nainital },
  { name: "Gangtok", country: "Sikkim", price: "₹24,999/-", rating: 4.7, reviews: 3012, img: Gangtok },
  { name: "Disneyland", country: "Hong Kong", price: "₹1,49,999/-", rating: 4.6, reviews: 2914, img: Disneyland },
  { name: "Cu Chi Tunnel", country: "Vietnam", price: "₹1,03,999/-", rating: 4.5, reviews: 2537, img: Tunnel },
  { name: "Easter Island", country: "USA", price: "₹2,85,999/-", rating: 4.3, reviews: 2371, img: Island },
  { name: "Amsterdam", country: "Nrtherlands", price: "₹1,65,999/-", rating: 4.2, reviews: 2105, img: Amsterdam },
];

const Adventure = () => {
  return (
    <div className={styles.adventureContainer}>
      <h1 className={styles.title}>Family Trip</h1>
      <div className={styles.cardsContainer}>
        {trips.map((trip, index) => (
          <div className={styles.card} key={index}>
            <img src={trip.img} alt={trip.name} className={styles.cardImg} />
            <div className={styles.cardContent}>
              {/* Trip Name + Price Row */}
              <div className={styles.tripRow}>
                <h3 className={styles.tripName}>
                  {trip.name} <span className={styles.country}>({trip.country})</span>
                </h3>
                <p className={styles.price}>{trip.price}</p>
              </div>

              {/* Rating */}
              <div className={styles.rating}>
                <span className={styles.ratingBadge}>
                  {trip.rating} <span className={styles.outOf}>/5</span>
                </span>
                <span className={styles.reviews}>({trip.reviews} reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adventure;