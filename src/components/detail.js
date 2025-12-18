import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./detailPageStyle.css";
import { apiURL, baseURL } from "../services/variables.js";
import axios from "axios";

// Assets
import couponIcon from "../assets/coupon.png";
import compareIcon from "../assets/Compare.png";
import fallbackImg from "../assets/beach.jpg";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // States
  const [packageData, setPackageData] = useState({});
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [itinerary, setItinerary] = useState({});
  const [detailData, setDetailData] = useState([]);
  const [openDay, setOpenDay] = useState(1);

  const basePrice = packageData?.price || 0;

  // Coupons
  const coupons = {
    PPGO: 399,
    DVINKS: 288,
  };

  const applyCoupon = (code) => {
    const discount = coupons[code];
    setCouponApplied(code);
    setFinalPrice(basePrice - discount);
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setFinalPrice(basePrice);
  };

  const toggleDay = (day) => {
    setOpenDay((prev) => (prev === day ? null : day));
  };

  // Fetch package & itinerary
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const pkgRes = await fetch(`${apiURL}/packages/byid/${id}`);
        const pkgJson = await pkgRes.json();
        if (pkgJson.result === "success") {
          setPackageData(pkgJson.data);
          setFinalPrice(pkgJson.data.price);
        }

        const detailRes = await fetch(`${apiURL}/package-details/packagebyid/${id}`);
        const detailJson = await detailRes.json();
        if (detailJson.result === "success") {
          const grouped = Object.keys(detailJson.data).reduce((acc, key) => {
            acc[key] = detailJson.data[key];
            return acc;
          }, {});
          setItinerary(grouped);
          const allDetails = Object.values(detailJson.data).flat();
          setDetailData(allDetails);
        }
      } catch (err) {
        console.error("Error fetching package details:", err);
      }
    };

    fetchData();
  }, [id]);

  // Banner image
  const bannerImage =
    packageData?.mainImage
      ? `${baseURL}${packageData.mainImage}`
      : detailData?.[0]?.image
      ? `${baseURL}${detailData[0].image}`
      : fallbackImg;

  const totalDays =
    Object.keys(itinerary).length > 0
      ? Object.keys(itinerary).length
      : packageData?.days || 0;

  const isLoggedIn = !!localStorage.getItem("userToken");

  // ----------------------
  // Razorpay payment function
  const initiateRazorpayPayment = async (packageId, amount) => {
    try {
      if (!packageId || !amount) {
        console.error("Package ID or amount is missing:", packageId, amount);
        alert("Payment initiation failed! Invalid package or amount.");
        return;
      }

      console.log("Initiating payment for package:", packageId, "Amount:", amount);

      const { data } = await axios.post(
        "http://localhost:3300/api/payment/initiate",
        { packageId, amount },
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );

      console.log("Backend response:", data);

      if (!data || !data.success || !data.order) {
        console.error("Order creation failed:", data);
        alert("Payment initiation failed! Order creation error.");
        return;
      }

      const order = data.order;

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: packageData.title,
        description: "Package Booking",
        order_id: order.id,
        handler: function (response) {
          console.log("Payment successful response:", response);
          navigate("/payment-success", {
            state: {
              packageId,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            },
          });
        },
        modal: {
          ondismiss: function () {
            console.warn("Payment popup closed by user.");
            navigate("/payment-failed", { state: { packageId } });
          },
        },
        prefill: {
          name: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
        },
        theme: { color: "#3399cc" },
      };

      console.log("Opening Razorpay checkout with options:", options);

      if (!window.Razorpay) {
        console.error("Razorpay script not loaded!");
        alert("Payment initiation failed! Razorpay script missing.");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      if (err.response) {
        console.error("Axios response error:", err.response.data);
      } else if (err.request) {
        console.error("Axios request error:", err.request);
      } else {
        console.error("Unknown error:", err.message);
      }
      alert("Payment initiation failed! Check console for details.");
    }
  };
  // ----------------------

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { packageId: packageData._id } });
    } else {
      initiateRazorpayPayment(packageData._id, finalPrice);
    }
  };

  // ----------------------
  // JSX Return
  return (
    <div className="detailPage-container">
      <h3 className="detailPage-subtitle">Package Details</h3>
      <h1 className="detailPage-title">
        At a <em>Glance.</em>
      </h1>

      {/* Banner */}
      <div className="detailPage-banner">
        <img src={bannerImage} alt={packageData?.title || "Package"} className="detailPage-banner-img" />
        <div className="detailPage-banner-text">
          <h2 className="banner-title">{packageData?.title || "Loading Package..."}</h2>
          <div className="banner-info">
            <span className="banner-days">
              📅 {totalDays > 0 ? `${totalDays} ${totalDays === 1 ? "Day" : "Days"}` : "Duration Unknown"}
            </span>
            <span className="banner-separator">•</span>
            <span className="banner-location">
              📍 {packageData?.location ? `${packageData.location}${packageData.country ? `, ${packageData.country}` : ""}` : packageData?.country ? packageData.country : "Unknown Destination"}
            </span>
          </div>
        </div>
      </div>

      <div className="detailPage-main-content">
        {/* Left - Itinerary */}
        <div className="detailPage-itinerary">
          <h2 className="detailPage-itinerary-title">Day-wise Itinerary</h2>
          <div className="day-button-group">
            {Object.keys(itinerary).length > 0 ? (
              Object.keys(itinerary).map((day) => (
                <button key={day} className={`day-btn ${openDay === Number(day) ? "active" : ""}`} onClick={() => toggleDay(Number(day))}>
                  Day {day}
                </button>
              ))
            ) : (
              <p>No days available yet.</p>
            )}
          </div>

          {Object.keys(itinerary).map((day) => (
            <div key={day} className={`day-section ${openDay === Number(day) ? "open" : ""}`}>
              <div className="day-header" onClick={() => toggleDay(Number(day))}>
                <h3>
                  <strong>Day {day}</strong> – {itinerary[day]?.[0]?.touristPlace || "No Destination Added"}
                </h3>
                <div className={`toggle-icon ${openDay === Number(day) ? "open" : ""}`}>
                  {openDay === Number(day) ? "−" : "+"}
                </div>
              </div>

              {openDay === Number(day) && (
                <div className="itinerary-timeline">
                  {itinerary[day]?.length > 0 ? (
                    itinerary[day].map((spot, idx) => (
                      <div key={idx} className="itinerary-item">
                        <div className="itinerary-icon">📍</div>
                        <div className="place-card-horizontal">
                          <img src={spot.image ? `${baseURL}${spot.image}` : fallbackImg} alt={spot.imageName} className="place-img-h" />
                          <div className="place-info-h">
                            <h4>{spot.imageName || "Untitled Spot"}</h4>
                            <p>⭐ {spot.rating || "N/A"} {spot.review ? `(${spot.review})` : "(No review yet)"}</p>
                            {spot.imageDetail && <p style={{ marginTop: 5, fontSize: 13, color: "#555" }}>{spot.imageDetail}</p>}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ textAlign: "center", margin: "15px 0", color: "#666" }}>No itinerary available for this day yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="detailPage-sidebar">
          {/* Price Box */}
          <div className="detailPage-price-box">
            <p className="old-price">
              <span className="strike">₹{(basePrice * 1.1).toLocaleString()}</span>{" "}
              <span className="discount-text">10% OFF</span>
            </p>
            <h2>₹{finalPrice.toLocaleString()} <span>/Adult</span></h2>
            <p>Excluding applicable taxes</p>
            <button className="detailPage-pay-btn" onClick={handleProceedToPayment}>Proceed to Payment</button>
          </div>

          {/* Coupons */}
          <div className="detailPage-coupon-box">
            <h4>Coupons & Offers</h4>
            <p className="detailPage-coupon-text">Have a Coupon Code?</p>
            {Object.keys(coupons).map((code) => (
              <div key={code} className={`detailPage-coupon-item ${couponApplied === code ? "applied" : ""}`}>
                <img src={couponIcon} alt="coupon" className="coupon-icon-img" />
                <div>
                  <b>{code}</b>
                  <p>{couponApplied === code ? "Coupon Applied Successfully! 🎉" : "Grab Your Discount Before It’s Gone!"}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="detailPage-coupon-amount">- ₹{coupons[code]}</div>
                  {couponApplied === code ? (
                    <button className="detailPage-remove-btn" onClick={removeCoupon}>REMOVE</button>
                  ) : (
                    <button className="detailPage-apply-btn" onClick={() => applyCoupon(code)}>APPLY</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Compare Packages */}
          <div className="compare-packages-box" onClick={() => {
            if (!packageData?._id) return;
            const packageId = packageData._id;
            const categoryId = packageData.categoryId || packageData?.category?._id;
            navigate("/tripcomparison", { state: { packageId, categoryId } });
          }}>
            <div className="compare-icon">
              <img src={compareIcon} alt="Compare" className="compare-img" />
            </div>
            <div className="compare-text">
              <h4>Compare Packages</h4>
              <p>Smart package comparison to match your budget and preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
