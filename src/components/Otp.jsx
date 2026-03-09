import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Otp.css";

export default function Otp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  if (!email) {
    navigate("/register");
    return null;
  }

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8081/api/auth/verify-otp?email=${email}&otp=${enteredOtp}`,
        { method: "POST" }
      );

      const result = await res.text();

      if (result === "Email verified successfully") {
        alert("Email verified successfully");
        navigate("/login");
      } else {
        alert(result);
      }

    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="otp-layout">

    {/* ✅ Background Layer */}
    <div className="otp-bg"></div>

    <div className="otp-card">
      <h1>OTP Verification 🔐</h1>

      <div className="otp-inputs">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {/* ✅ Add className */}
      <button 
        className="otp-btn"
        onClick={verifyOtp} 
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  </div>
);
}