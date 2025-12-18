import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./TripPlannerUIAllInOne.css";
import goabackground from "../assets/goabackground.png";
import { useLocation, useNavigate } from "react-router-dom";
import Hotel from "./hotel"; // ✅ Import Hotel component

// Example place images
import chapelImg from "../assets/chapel.png";
import restaurantImg from "../assets/restaurant.png";
import waterfallImg from "../assets/waterfall.png";
import martinsImg from "../assets/martins.png";
import beachImg from "../assets/beach.jpg";

// Fix default Leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// States with coordinates
const states = [
  { state: "Andhra Pradesh", capital: "Amaravati", lat: 16.5417, lon: 80.515 },
  { state: "Arunachal Pradesh", capital: "Itanagar", lat: 27.0844, lon: 93.6053 },
  { state: "Assam", capital: "Dispur (Guwahati)", lat: 26.1433, lon: 91.7898 },
  { state: "Bihar", capital: "Patna", lat: 25.5941, lon: 85.1376 },
  { state: "Chhattisgarh", capital: "Raipur", lat: 21.2514, lon: 81.6296 },
  { state: "Goa", capital: "Panaji", lat: 15.4909, lon: 73.8278 },
  { state: "Gujarat", capital: "Gandhinagar", lat: 23.2156, lon: 72.6369 },
  { state: "Haryana", capital: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  { state: "Himachal Pradesh", capital: "Shimla", lat: 31.1048, lon: 77.1734 },
  { state: "Jharkhand", capital: "Ranchi", lat: 23.3441, lon: 85.3096 },
  { state: "Karnataka", capital: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { state: "Kerala", capital: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366 },
  { state: "Madhya Pradesh", capital: "Bhopal", lat: 23.2599, lon: 77.4126 },
  { state: "Maharashtra", capital: "Mumbai", lat: 19.076, lon: 72.8777 },
  { state: "Manipur", capital: "Imphal", lat: 24.817, lon: 93.9368 },
  { state: "Meghalaya", capital: "Shillong", lat: 25.5788, lon: 91.8933 },
  { state: "Mizoram", capital: "Aizawl", lat: 23.7271, lon: 92.7176 },
  { state: "Nagaland", capital: "Kohima", lat: 25.674, lon: 94.1108 },
  { state: "Odisha", capital: "Bhubaneswar", lat: 20.2961, lon: 85.8245 },
  { state: "Punjab", capital: "Chandigarh", lat: 30.7333, lon: 76.7794 },
  { state: "Rajasthan", capital: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { state: "Sikkim", capital: "Gangtok", lat: 27.3389, lon: 88.6065 },
  { state: "Tamil Nadu", capital: "Chennai", lat: 13.0827, lon: 80.2707 },
  { state: "Telangana", capital: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { state: "Tripura", capital: "Agartala", lat: 23.8315, lon: 91.2868 },
  { state: "Uttar Pradesh", capital: "Lucknow", lat: 26.8467, lon: 80.9462 },
  { state: "Uttarakhand", capital: "Dehradun", lat: 30.3165, lon: 78.0322 },
  { state: "West Bengal", capital: "Kolkata", lat: 22.5726, lon: 88.3639 },
];

// Map flyTo helper
function FlyTo({ position }) {
  const map = useMap();
  if (position) map.flyTo(position, 6, { duration: 1.2 });
  return null;
}

export default function TripPlannerUIAllInOne() {
  const [flyToRef, setFlyToRef] = useState([22.5937, 78.9629]);
  const location = useLocation();
  const navigate = useNavigate();

  const { place, selectedTrip, startDate, endDate, days } = location.state || {};

  let totalDays = days;
  if (!totalDays && startDate && endDate) {
    const diffTime = new Date(endDate) - new Date(startDate);
    totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  let headingText = "";
  if (place && totalDays) headingText = `${place} for ${totalDays} days - ${selectedTrip}`;

  const [itinerary, setItinerary] = useState({
    1: [
      { title: "Three Kings Chapel", category: "Religious Sites", rating: 4.2, reviews: 147, img: chapelImg },
      { title: "Shivers Garden Restaurant", category: "Restaurant • Indian • Asian", rating: 4.4, reviews: 588, img: restaurantImg },
      { title: "Dudhsagar Falls", category: "Waterfalls", rating: 4.3, reviews: 1421, img: waterfallImg },
      { title: "Martin’s Corner", category: "Restaurant • Indian • Bar", rating: 4.5, reviews: 3051, img: martinsImg },
      { title: "Colva Beach", category: "Beaches", rating: 4.0, reviews: 1987, img: beachImg },
    ],
    2: [
      { title: "Fort Aguada", category: "Historic Sites", rating: 4.5, reviews: 2100, img: chapelImg },
      { title: "Baga Beach", category: "Beaches", rating: 4.3, reviews: 3500, img: beachImg },
    ],
    3: [
      { title: "Fort Aguada", category: "Historic Sites", rating: 4.5, reviews: 2100, img: chapelImg },
      { title: "Baga Beach", category: "Beaches", rating: 4.3, reviews: 3500, img: beachImg },
    ],
    4: [
      { title: "Fort Aguada", category: "Historic Sites", rating: 4.5, reviews: 2100, img: chapelImg },
      { title: "Baga Beach", category: "Beaches", rating: 4.3, reviews: 3500, img: beachImg },
    ],
    5: [
      { title: "Fort Aguada", category: "Historic Sites", rating: 4.5, reviews: 2100, img: chapelImg },
      { title: "Baga Beach", category: "Beaches", rating: 4.3, reviews: 3500, img: beachImg },
    ],
    6: [
      { title: "Fort Aguada", category: "Historic Sites", rating: 4.5, reviews: 2100, img: chapelImg },
      { title: "Baga Beach", category: "Beaches", rating: 4.3, reviews: 3500, img: beachImg },
    ],
    7: [
      { title: "Fort Aguada", category: "Historic Sites", rating: 4.5, reviews: 2100, img: chapelImg },
      { title: "Baga Beach", category: "Beaches", rating: 4.3, reviews: 3500, img: beachImg },
    ],
  });

  const [openDay, setOpenDay] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hiddenSuggestion, setHiddenSuggestion] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showHotelPopup, setShowHotelPopup] = useState(false); // ✅ Popup state
  const dayRefs = useRef({});

  const handleTabClick = (day) => {
    setOpenDay(day);
    if (dayRefs.current[day]) {
      dayRefs.current[day].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRemovePlace = (day, index) => {
    setItinerary((prev) => {
      const updated = { ...prev };
      updated[day] = updated[day].filter((_, i) => i !== index);
      return updated;
    });
  };

  const handleAddPlace = (day) => {
    const newPlace = {
      title: "New Place",
      category: "Category",
      rating: 0,
      reviews: 0,
      img: beachImg,
    };
    setItinerary((prev) => {
      const updated = { ...prev };
      if (!updated[day]) updated[day] = [];
      updated[day] = [...updated[day], newPlace];
      return updated;
    });
  };

  return (
    <div className="trip-planner-ui-page">
      <div className="editor-choice-badge">Editor’s Choice AI</div>

      <div className="trip-planner-ui-header">
        <h1>Your trip, your way.</h1>
        <p>Selected interests will guide your itinerary.</p>
      </div>

      <div className="trip-planner-ui-top-section">
        <div className="trip-planner-ui-left">
          <div className="trip-planner-ui-image-card">
            <img src={goabackground} alt="Trip destination" className="trip-image" />
            <div className="trip-heading-overlay">{headingText && <h1>{headingText}</h1>}</div>
          </div>

          {totalDays && (
            <div className="day-tabs-wrapper">
              <h3 className="itinerary-title">Itinerary</h3>
              <div className="day-tabs">
                {Array.from({ length: totalDays }, (_, i) => (
                  <button key={i} className="day-tab" onClick={() => handleTabClick(i + 1)}>
                    Day {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="edit-button-wrapper">
            <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Done" : "Edit"}
            </button>
          </div>

          {totalDays && (
            <div className="day-dropdowns">
              {Array.from({ length: totalDays }, (_, i) => {
                const day = i + 1;
                return (
                  <div className="day-section" key={day} ref={(el) => (dayRefs.current[day] = el)}>
                    <div className="day-header" onClick={() => setOpenDay(openDay === day ? null : day)}>
                      <h3>
                        Day {day} - {place}, India
                      </h3>
                      <div className={`toggle-icon ${openDay === day ? "open" : ""}`}>
                        {openDay === day ? "−" : "+"}
                      </div>
                    </div>

                    {openDay === day && (
                      <div className="day-timeline">
                        {(itinerary[day] || []).map((spot, idx) => (
                          <div key={idx} className="timeline-item">
                            <div className="timeline-icon">📍</div>
                            <div className="place-card-horizontal">
                              <img src={spot.img} alt={spot.title} className="place-img-h" />
                              <div className="place-info-h">
                                <h4>{spot.title}</h4>
                                <p>{spot.category}</p>
                                <span>
                                  ⭐ {spot.rating} ({spot.reviews} reviews)
                                </span>
                              </div>

                              {isEditing && (
                                <button className="remove-btn" onClick={() => handleRemovePlace(day, idx)}>
                                  ❌
                                </button>
                              )}
                            </div>
                          </div>
                        ))}

                        {!hiddenSuggestion[day] && (
                          <div className="suggestion-card">
                            <span>
                              Pick a home-base that matches your vibe.{" "}
                              <a
                                href="#"
                                className="suggestion-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowHotelPopup(true);
                                }}
                              >
                                Add a place to stay.
                              </a>
                            </span>
                            <button
                              className="suggestion-close"
                              onClick={() => setHiddenSuggestion((prev) => ({ ...prev, [day]: true }))}
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {isEditing && (
                          <div className="add-btn-wrapper">
                            <button className="add-btn" onClick={() => handleAddPlace(day)}>
                              ➕ Add
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="trip-planner-ui-right">
          <div className="trip-planner-ui-map">
            <MapContainer center={flyToRef} zoom={5} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {states.map((s, idx) => (
                <Marker
                  key={idx}
                  position={[s.lat, s.lon]}
                  eventHandlers={{ click: () => setFlyToRef([s.lat, s.lon]) }}
                >
                  <Popup>
                    <strong>{s.state}</strong>
                    <br />
                    Capital: {s.capital}
                  </Popup>
                </Marker>
              ))}
              <FlyTo position={flyToRef} />
            </MapContainer>
          </div>

          {/* ---- PRICING SECTION ---- */}
          <div className="pricing-container">
            <p className="original-price">
              ₹27,962 <span className="discount">10% OFF</span>
            </p>

            {(() => {
              const basePrice = 17660;
              let discount = 0;

              if (appliedCoupon === "PPGO") discount = 399;
              else if (appliedCoupon === "Dvinks") discount = 288;

              const finalPrice = basePrice - discount;

              return (
                <h2 className="final-price">
                  ₹{finalPrice.toLocaleString()} <span className="per-person">/Adult</span>
                </h2>
              );
            })()}

            <p className="tax-note">Excluding applicable taxes</p>
            <button className="payment-btn" onClick={() => navigate("/payment")}>
              PROCEED TO PAYMENT
            </button>
          </div>

          {/* ---- COUPONS SECTION ---- */}
          <div className="coupons-container">
            <h3>Coupons & Offers</h3>
            <p className="coupon-subtitle">Have a Coupon Code?</p>
           <span className="enter-code-link">Enter Code</span>


            <div className={`coupon-card ${appliedCoupon === "PPGO" ? "applied" : ""}`}>
              <div className="coupon-left">
                <img src={require("../assets/coupon.png")} alt="Coupon" className="coupon-icon-img" />
                <div>
                  <strong>PPGO</strong>
                  <p>{appliedCoupon === "PPGO" ? "Coupon Applied Successfully!" : "Grab Your Discount Before It’s Gone!"}</p>
                </div>
              </div>
              <div className="coupon-right">
                <span className="coupon-discount">- ₹399</span>
                {appliedCoupon === "PPGO" ? (
                  <button className="coupon-action remove" onClick={() => setAppliedCoupon(null)}>
                    REMOVE
                  </button>
                ) : (
                  <button className="coupon-action apply" onClick={() => setAppliedCoupon("PPGO")}>
                    APPLY
                  </button>
                )}
              </div>
            </div>

            <div className={`coupon-card ${appliedCoupon === "Dvinks" ? "applied" : ""}`}>
              <div className="coupon-left">
                <img src={require("../assets/coupon.png")} alt="Coupon" className="coupon-icon-img" />
                <div>
                  <strong>Dvinks</strong>
                  <p>{appliedCoupon === "Dvinks" ? "Coupon Applied Successfully!" : "Grab Your Discount Before It’s Gone!"}</p>
                </div>
              </div>
              <div className="coupon-right">
                <span className="coupon-discount">- ₹288</span>
                {appliedCoupon === "Dvinks" ? (
                  <button className="coupon-action remove" onClick={() => setAppliedCoupon(null)}>
                    REMOVE
                  </button>
                ) : (
                  <button className="coupon-action apply" onClick={() => setAppliedCoupon("Dvinks")}>
                    APPLY
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Hotel Popup Modal */}
      {showHotelPopup && (
        <div className="hotel-popup-overlay">
          <div className="hotel-popup">
            <button className="close-popup" onClick={() => setShowHotelPopup(false)}>
              ✕
            </button>
            <Hotel />
          </div>
        </div>
      )}
    </div>
  );
}
