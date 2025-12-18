import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./IndiaMapReact.css";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// List of 28 Indian states with capitals & coordinates
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

function FlyTo({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 7, { duration: 1.2 });
  }
  return null;
}

export default function IndiaMap() {
  const location = useLocation();
  const { selectedTrip, selectedMonth, days, startDate, endDate, categories } =
    location.state || {};

  console.log("➡️ Received from Category:", {
    selectedTrip,
    selectedMonth,
    days,
    startDate,
    endDate,
    categories,
  });

  const center = [22.5937, 78.9629]; // India center
  const flyToRef = useRef(null);

  return (
    <div className="india-map-app">
      <main className="map-wrapper">
        <MapContainer
          center={center}
          zoom={5}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {states.map((s, idx) => (
            <Marker key={idx} position={[s.lat, s.lon]}>
              <Popup>
                <div style={{ minWidth: 140 }}>
                  <strong>{s.state}</strong>
                  <br />Capital: {s.capital}
                  <br />
                  Lat: {s.lat.toFixed(4)}, Lon: {s.lon.toFixed(4)}
                </div>
              </Popup>
            </Marker>
          ))}

          <FlyTo position={flyToRef.current} />
        </MapContainer>
      </main>
    </div>
  );
}
