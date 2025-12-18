import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiURL } from "../services/variables";
import "./TripComparison.css";

export default function TripComparison() {
  const location = useLocation();
  const { packageId, categoryId } = location.state || {};

  const [mainPackage, setMainPackage] = useState(null);
  const [comparePackage, setComparePackage] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");

  const [mainDetails, setMainDetails] = useState([]);
  const [compareDetails, setCompareDetails] = useState([]);

  const [loading, setLoading] = useState(true);

  /* ------------------- Convert Grouped Object → Sorted Array ------------------- */
  const convertToArray = (grouped) => {
    if (!grouped || typeof grouped !== "object") return [];

    return Object.keys(grouped)
      .sort((a, b) => Number(a) - Number(b))
      .map((day) => ({
        day: Number(day),
        places: grouped[day],
      }));
  };

  /* ------------------- FETCH MAIN PACKAGE ------------------- */
  useEffect(() => {
    if (!packageId) return;

    const fetchMain = async () => {
      const res = await fetch(`${apiURL}/packages/byid/${packageId}`);
      const data = await res.json();
      if (data.result === "success") setMainPackage(data.data);
    };

    fetchMain();
  }, [packageId]);

  /* ------------------- FETCH MAIN DETAILS ------------------- */
  useEffect(() => {
    if (!packageId) return;

    const fetchMainDetails = async () => {
      const res = await fetch(`${apiURL}/package-details/packagebyid/${packageId}`);
      const data = await res.json();
      if (data.result === "success") setMainDetails(convertToArray(data.data));
    };

    fetchMainDetails();
  }, [packageId]);

  /* ------------------- FETCH CATEGORY LIST ------------------- */
  useEffect(() => {
    if (!categoryId) return;

    const fetchList = async () => {
      const res = await fetch(`${apiURL}/packages/category/${categoryId}`);
      const data = await res.json();

      if (data.result === "success") {
        setAllPackages(data.data.filter((p) => p._id !== packageId));
      }

      setLoading(false);
    };

    fetchList();
  }, [categoryId, packageId]);

  /* ------------------- FETCH SELECTED COMPARE PACKAGE ------------------- */
  useEffect(() => {
    if (!selectedPackage) return;

    const fetchCompare = async () => {
      const res = await fetch(`${apiURL}/packages/byid/${selectedPackage}`);
      const data = await res.json();
      if (data.result === "success") setComparePackage(data.data);
    };

    fetchCompare();
  }, [selectedPackage]);

  /* ------------------- FETCH SELECTED COMPARE DETAILS ------------------- */
  useEffect(() => {
    if (!selectedPackage) return;

    const fetchCompareDetails = async () => {
      const res = await fetch(`${apiURL}/package-details/packagebyid/${selectedPackage}`);
      const data = await res.json();
      if (data.result === "success") setCompareDetails(convertToArray(data.data));
    };

    fetchCompareDetails();
  }, [selectedPackage]);

  if (loading) return <div>Loading...</div>;

  /* UTIL HELPERS */
  const totalDays = (details) => details?.length || 0;

  return (
    <div className="tripComparison-body">
      <div className="tripComparison-container">
        <h1 className="tripComparison-title">Trip Comparison</h1>

        {/* TOP SELECT AREA */}
        <div className="tripComparison-top">
          <div className="tripComparison-pill">
            <span className="pill-title">{mainPackage?.title}</span>
            <span className="pill-sub">(Bachelor Trip)</span>
          </div>

          <div className="tripComparison-pill dropdown-pill">
            <select
              className="pill-select"
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
            >
              <option value="">{mainPackage?.title} (Bachelor Trip)</option>

              {allPackages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.title} (Bachelor Trip)
                </option>
              ))}
            </select>

            <span className="pill-arrow">▾</span>
          </div>
        </div>

        {/* TABLE */}
        <table className="tripComparison-table">
          <thead>
            <tr className="tripComparison-heading-row">
              <th>Compare</th>
              <th>{mainPackage?.title}</th>
              <th>{comparePackage?.title || "Select Package"}</th>
            </tr>
          </thead>

          <tbody>
            {/* PRICE */}
            <tr className="tripComparison-section-title">
              <td colSpan="3">Compare Prices</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>₹ {mainPackage?.price?.toLocaleString()}</td>
              <td>{comparePackage ? `₹ ${comparePackage.price.toLocaleString()}` : "-"}</td>
            </tr>

            {/* DAYS */}
            <tr className="tripComparison-section-title">
              <td colSpan="3">Duration</td>
            </tr>
            <tr>
              <td>Days</td>
              <td>{totalDays(mainDetails)}</td>
              <td>{totalDays(compareDetails)}</td>
            </tr>

            {/* DESTINATIONS */}
            <tr className="tripComparison-section-title">
              <td colSpan="3">Destinations</td>
            </tr>

            {Array.from({
              length: Math.max(mainDetails.length, compareDetails.length),
            }).map((_, dayIndex) => (
              <React.Fragment key={dayIndex}>
                <tr className="day-row">
                  <td>Day {mainDetails[dayIndex]?.day || compareDetails[dayIndex]?.day}</td>
                  <td></td>
                  <td></td>
                </tr>

                {Array.from({
                  length: Math.max(
                    mainDetails[dayIndex]?.places.length || 0,
                    compareDetails[dayIndex]?.places.length || 0
                  ),
                }).map((__, placeIndex) => (
                  <tr key={placeIndex}>
                    <td></td>
                    <td>{mainDetails[dayIndex]?.places[placeIndex]?.touristPlace || "-"}</td>
                    <td>{compareDetails[dayIndex]?.places[placeIndex]?.touristPlace || "-"}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {/* REVIEWS */}
            <tr className="tripComparison-section-title">
              <td colSpan="3">Reviews</td>
            </tr>
            <tr>
              <td>Total Reviews</td>
              <td>{mainPackage?.review || 0}</td>
              <td>{comparePackage?.review || 0}</td>
            </tr>

            {/* RATINGS */}
            <tr className="tripComparison-section-title">
              <td colSpan="3">Rating</td>
            </tr>
            <tr>
              <td>Average Rating</td>
              <td>{mainPackage?.rating || "-"}</td>
              <td>{comparePackage?.rating || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
