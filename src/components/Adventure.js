import React from "react";
import styles from "./Adventure.module.css"; // ✅ CSS Module import

// Importing images
import everest from "../assets/Everest Base Camp.jpg";
import Queenstown from "../assets/Queenstown.jpg";
import borneo from "../assets/Borneo Jungle.jpg";
import scuba from "../assets/Scuba Diving.jpg";
import sahara from "../assets/Sahara Desert.jpg";
import safari from "../assets/Wildlife Safari.jpg";
import rishikesh from "../assets/Rishikesh.jpg";
import gulmarg from "../assets/Skiing in Gulmarg.jpg";

const trips = [
  { name: "Everest Base Camp", country: "Nepal", price: "₹74,999/-", rating: 4.9, reviews: 4510, img: everest },
  { name: "Queenstown", country: "New Zealand", price: "₹2,50,000/-", rating: 4.8, reviews: 4258, img: Queenstown },
  { name: "Borneo Jungle", country: "Malaysia", price: "₹1,65,000/-", rating: 4.7, reviews: 3557, img: borneo },
  { name: "Scuba Diving", country: "Indonesia", price: "₹1,25,000/-", rating: 4.7, reviews: 3012, img: scuba },
  { name: "Sahara Desert", country: "Morocco", price: "₹3,40,000/-", rating: 4.6, reviews: 2914, img: sahara },
  { name: "Wildlife Safari", country: "South Africa", price: "₹3,10,000/-", rating: 4.5, reviews: 2537, img: safari },
  { name: "Rishikesh", country: "Uttarakhand", price: "₹44,999/-", rating: 4.3, reviews: 2371, img: rishikesh },
  { name: "Skiing in Gulmarg", country: "J&K", price: "₹29,999/-", rating: 4.2, reviews: 2105, img: gulmarg },
];

const Adventure = () => {
  return (
    <div className={styles.adventureContainer}>
      <h1 className={styles.title}>Adventure Trip</h1>
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
