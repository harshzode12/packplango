import React from "react";
import styles from "./Adventure.module.css"; // ✅ CSS Module import

// Importing images
import Maiami from "../assets/Maiami.jpg";
import Bangkok from "../assets/Bangkok.jpg";
import Shimla from "../assets/Shimla1.jpg";
import AbuDhabi from "../assets/AbuDhabi.jpg";
import Ibiza from "../assets/Ibiza.jpg";
import Baga from "../assets/Baga.jpg";
import Bunol from "../assets/Bunol.jpg";
import Rovaniemi from "../assets/Rovaniemi.jpg";

const trips = [
  { name: "Maimi", country: "Maimi", price: "₹2,45,999/-", rating: 4.9, reviews: 4510, img: Maiami },
  { name: "Bangkok", country: "Thailand", price: "₹75,499/-", rating: 4.8, reviews: 4258, img: Bangkok },
  { name: "Shimla", country: "Himachal Pradesh", price: "₹18,999/-", rating: 4.7, reviews: 3557, img: Shimla },
  { name: " Abu Dhabi", country: "UAE", price: "₹59,999/-", rating: 4.7, reviews: 3012, img: AbuDhabi  },
  { name: "Ibiza Island", country: "Spain", price: "₹1,24,999/-", rating: 4.6, reviews: 2914, img: Ibiza  },
  { name: "Baga Beach", country: "Goa", price: "₹10,499/-", rating: 4.5, reviews: 2537, img: Baga },
  { name: "Bunol", country: "Spain", price: "₹1,21,999/-", rating: 4.3, reviews: 2371, img: Bunol  },
  { name: "Rovaniemi", country: "Finland", price: "₹1,50,499/-", rating: 4.2, reviews: 2105, img:Rovaniemi },
];

const Adventure = () => {
  return (
    <div className={styles.adventureContainer}>
      <h1 className={styles.title}>Bachelor Trip</h1>
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