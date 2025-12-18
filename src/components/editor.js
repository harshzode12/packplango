import React, { useState } from "react";
import "./editor.css";
import { useNavigate } from "react-router-dom";

function Editor() {
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  const validPlaces = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
    "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya",
    "Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
    "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
    "West Bengal"
  ];

  const handleNext = () => {
    const formattedPlace = place.trim();
    if (formattedPlace === "") {
      alert("I’ll do the magic, but give me a state to start.!");
      return;
    }
    const isValid = validPlaces.some(
      (p) => p.toLowerCase() === formattedPlace.toLowerCase()
    );
    if (!isValid) {
      alert("Please enter a valid Indian city or state!");
      return;
    }
    navigate("/calendar", { state: { place: formattedPlace } });
  };

  return (
    <div className="editor-page">
      <div className="badge">Editor’s Choice AI</div>
      <div className="main-heading first-line">Start with a place.</div>
      <div className="main-heading">
        <span className="highlight">AI</span> will do the <span className="magic">magic.</span>
      </div>
      <p className="subtitle">AI does the thinking, you do the exploring.</p>
      <div className="search-container">
        <span className="search-icon"></span>
        <input
          type="text"
          placeholder="Where to next?"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </div>
      <button className="next-btn" onClick={handleNext}>Next</button>
    </div>
  );
}
export default Editor;
