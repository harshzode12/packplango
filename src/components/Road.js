import React from "react";
import styles from "./Adventure.module.css"; // ✅ CSS Module import

// Importing images
import Nubra from "../assets/Nubra valley.jpg";
import Agumbe from "../assets/Agumbe.jpg";
import Shimla from "../assets/Shimla.jpg";
import  Guwahati from "../assets/Guwahati.jpg";
import Pacific from "../assets/Pacific Highway.jpg";
import Road from "../assets/Road To Heaven.jpg";
import Dharamshala from "../assets/Dharamshala.jpg";
import Circle from "../assets/The Golden Circle.jpg";

const trips = [
  { name: "Nubra valley", country: "Ladakh", price: "₹54,999/-", rating: 4.9, reviews: 4510, img: Nubra},
  { name: "Agumbe", country: "Karnataka", price: "₹36,999/-", rating: 4.8, reviews: 4258, img: Agumbe},
  { name: "Shimla", country: "Himachal Pradesh", price: "₹31,999/-", rating: 4.7, reviews: 3557, img: Shimla},
  { name: "Guwahati", country: "Assam", price: "₹28,499/-", rating: 4.7, reviews: 3012, img: Guwahati},
  { name: "Pacific Highway", country: "California", price: "₹1,39,999/-", rating: 4.6, reviews: 2914, img: Pacific},
  { name: "Road to Heaven", country: "Kutch", price: "₹21,999/-", rating: 4.5, reviews: 2537, img: Road},
  { name: "Dharamshala", country: "Himachal Pradesh", price: "₹24,999/-", rating: 4.3, reviews: 2371, img: Dharamshala},
  { name: "The Golden Circle", country: "Iceland", price: "₹2,01,999/-", rating: 4.2, reviews: 2105, img: Circle},
];

const Adventure = () => {
  return (
    <div className={styles.adventureContainer}>
      <h1 className={styles.title}>Road Trip</h1>
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