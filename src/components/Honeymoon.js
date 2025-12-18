import React from "react";
import styles from "./Adventure.module.css"; // ✅ CSS Module import

// Importing images
import Santorini from "../assets/Santorini.jpg";
import Meeru from "../assets/Meeru.jpg";
import Munnar from "../assets/Munnar.jpg";
import Srinagar from "../assets/Srinagar.jpg";
import Hawaii from "../assets/Hawaii.jpg";
import Santosa from "../assets/Sentosa.jpg";
import Prague from "../assets/Prague.jpg";
import Budapest from "../assets/Budapest.jpg";

const trips = [
  { name: "Santorini Island", country: "Greece", price: "₹1,24,999/-", rating: 4.9, reviews: 4510, img: Santorini },
  { name: "Meeru Island", country: "Maldieves", price: "₹99,999/-", rating: 4.8, reviews: 4258, img: Meeru},
  { name: "Munnar", country: "Kerela", price: "₹19,999/-", rating: 4.7, reviews: 3557, img: Munnar },
  { name: "Srinagar", country: "Jammu & Kashmir", price: "₹22,999/-", rating: 4.7, reviews: 3012, img: Srinagar },
  { name: "Hawaii", country: "USA", price: "₹2,74,999/-", rating: 4.6, reviews: 2914, img: Hawaii },
  { name: "Santosa Flyer", country: "Singapore", price: "₹1,40,999/-", rating: 4.5, reviews: 2537, img: Santosa },
  { name: "Prague", country: "Czech Republic", price: "₹1,35,999/-", rating: 4.3, reviews: 2371, img: Prague },
  { name: "Budapest", country: "Hungary", price: "₹2,50,999/-", rating: 4.2, reviews: 2105, img: Budapest },
];

const Adventure = () => {
  return (
    <div className={styles.adventureContainer}>
      <h1 className={styles.title}>Honeymoon Trip</h1>
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
 