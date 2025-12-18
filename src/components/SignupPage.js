import React, { useState } from "react";
import "./SignupPage.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bgImg from "../assets/loginbg.jpg";
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3300/api/users/register", {
        name,
        email,
        password,
        role: "user"
      });

      // store token so user can auto-login
      localStorage.setItem("userToken", data.token);

      alert("Signup successful! Now login.");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="glass-box">
        <h1>Get started</h1>

        <div className="field">
          <input 
            type="text" 
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>

        <div className="field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>

        <button className="signin-btn" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}
