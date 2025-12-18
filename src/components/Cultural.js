import React from "react";
import styles from "./Adventure.module.css"; // ✅ CSS Module import

// Importing images
import Rameshwaram from "../assets/Rameshwaram.jpg";
import Dwarka from "../assets/Dwarka.jpg";
import Varanasi from "../assets/Varansi.jpg";
import Ram from "../assets/Ram Mandir.jpg";
import Louts from "../assets/Louts Temple.jpg";
import Somnath from "../assets/Somnath.jpg";
import Jaganath from "../assets/Jaganath Puri.jpg";
import Tirupati from "../assets/Tirupati Balaji.jpg";

const trips = [
  { name: "Rameshwaram", country: "Tamil Nadu", price: "₹40,999/-", rating: 4.9, reviews: 4510, img: Rameshwaram },
  { name: "Dwarka", country: "Gujarat", price: "₹14,999/-", rating: 4.8, reviews: 4258, img: Dwarka },
  { name: "Varanasi", country: "Uttar Pradesh", price: "₹20,999/-", rating: 4.7, reviews: 3557, img: Varanasi },
  { name: "Ram Mandir", country: "Uttar Pradesh", price: "₹11,999/-", rating: 4.7, reviews: 3012, img: Ram  },
  { name: "Louts Temple", country: "New Delhi", price: "₹14,999/-", rating: 4.6, reviews: 2914, img: Louts  },
  { name: "Somnath", country: "Gujarat", price: "₹12,999/-", rating: 4.5, reviews: 2537, img: Somnath },
  { name: "Jaganath Puri", country: "Odisha", price: "₹15,999/-", rating: 4.3, reviews: 2371, img: Jaganath  },
  { name: "Tirupati Balaji", country: "Andra Pradesh", price: "₹25,999/-", rating: 4.2, reviews: 2105, img:Tirupati  },
];

const Adventure = () => {
  return (
    <div className={styles.adventureContainer}>
      <h1 className={styles.title}>Cultural Trip</h1>
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