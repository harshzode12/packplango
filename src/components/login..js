import React, { useState } from "react";
import "./login.css";
import bgImage from "../assets/loginbg.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const packageId = location.state?.packageId; // Get packageId from Detail page

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3300/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("userToken", data.token);
      alert("Login successful!");

      // Redirect to package detail page if packageId exists
      if (packageId) {
        navigate(`/detail/${packageId}`);
      } else {
        navigate("/"); // fallback to home
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="custom-login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="custom-login-card">
        <h1 className="custom-login-title">Welcome back</h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="custom-login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="custom-password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="custom-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="custom-eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>

        <button className="custom-login-btn" onClick={handleLogin}>
          Login
        </button>

        <p
          className="custom-create-account-btn"
          onClick={() => navigate("/signup")}
        >
          Create new account
        </p>
      </div>
    </div>
  );
}
