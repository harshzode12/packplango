import React from "react";
import styles from "./Adventure.module.css"; // ✅ CSS Module import

// Importing images
import kelingking  from "../assets/kelingking Beach.jpg";
import Maafushi from "../assets/Maafushi Island.jpg";
import Havelock from "../assets/Havelock Island.jpg";
import Phuket from "../assets/Phuket.jpg";
import Ibiza from "../assets/Ibiza.jpg";
import Baga from "../assets/Baga.jpg";
import Kovalam from "../assets/Kovalam.jpg";
import Konkan from "../assets/Konkan.jpg";

const trips = [
  { name: "kelingking Beach", country: "Indonesia", price: "₹49,999/-", rating: 4.9, reviews: 4510, img: kelingking },
  { name: "Maafushi Island", country: "Maldives", price: "₹1,34,999/-", rating: 4.8, reviews: 4258, img: Maafushi },
  { name: "Havelock Island", country: "Andaman", price: "₹20,999/-", rating: 4.7, reviews: 3557, img: Havelock },
  { name: "Phuket", country: "Thailand", price: "₹44,999/-", rating: 4.7, reviews: 3012, img: Phuket },
  { name: "Ibiza Island", country: "Spain", price: "₹1,24,999/-", rating: 4.3, reviews: 1239, img: Ibiza },
  { name: "Baga Beach", country: "Goa", price: "₹10,499/-", rating: 4.5, reviews: 2537, img: Baga },
  { name: "Kovalam", country: "Kerela", price: "₹24,999/-", rating: 4.3, reviews: 2371, img: Kovalam },
  { name: "Konkan", country: "Maharashtra", price: "₹15,999/-", rating: 4.2, reviews: 2105, img:Konkan },
];

const Adventure = () => {
  return (
    <div className={styles.adventureContainer}>
      <h1 className={styles.title}>Beach Trip</h1>
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