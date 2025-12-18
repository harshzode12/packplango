import React from "react";
import styles from "./Adventure.module.css"; // ✅ CSS Module import

// Importing images
import Girnar from "../assets/Girnar.jpg";
import Alappuzha from "../assets/Alappuzha.jpg";
import Pachmarhi from "../assets/Pachmarhi.jpg";
import  Gaon from "../assets/Mana Gaon.jpg";
import Coorg from "../assets/Coorg.jpg";
import Patagonia from "../assets/Patagonia.jpg";
import Taktsang from "../assets/Paro Taktsang.jpg";
import Amazon from "../assets/Amazon Rainforest.jpg";

const trips = [
  { name: "Girnar", country: "Gujarat", price: "₹7,999/-", rating: 4.9, reviews: 4510, img: Girnar },
  { name: "Alappuzha", country: "Kerala", price: "₹21,999/-", rating: 4.8, reviews: 4258, img: Alappuzha},
  { name: "Pachmarhi", country: "Madhya Pradesh", price: "₹14,999/-", rating: 4.7, reviews: 3557, img: Pachmarhi },
  { name: "Mana Gaon", country: "Uttrakhand", price: "₹26,999/-", rating: 4.7, reviews: 3012, img: Gaon },
  { name: "Coorg", country: "Karnataka", price: "₹17,499/-", rating: 4.6, reviews: 2914, img: Coorg },
  { name: "Patagonia", country: "Argentina", price: "₹4,15,999/-", rating: 4.5, reviews: 2537, img: Patagonia },
  { name: "Paro Taktsang", country: "Bhutan", price: "₹72,999/-", rating: 4.3, reviews: 2371, img: Taktsang },
  { name: "Amazon Rainforest", country: "Brazil", price: "₹3,60,999/-", rating: 4.2, reviews: 2105, img: Amazon },
];

const Adventure = () => {
  return (
    <div className={styles.adventureContainer}>
      <h1 className={styles.title}>Nature Trip</h1>
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