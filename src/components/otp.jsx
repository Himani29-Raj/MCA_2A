import React, { useRef, useState } from "react";
import "./Otp.css";

export default function Otp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

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

  return (
    <div className="otp-layout">

      {/* Background Image Layer */}
      <div className="otp-bg"></div>

      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-icon">🍔</div>
        <div>🏠</div>
        <div>🛒</div>
        <div>👤</div>
      </div>

      {/* Main */}
      <div className="otp-main">
        <div className="otp-card">

          <h1>OTP Verification</h1>
          <p>Enter the 6-digit code sent to your phone</p>

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

          <button className="btn-primary otp-btn">
            Verify OTP
          </button>

          <p className="resend-text">
            Didn’t receive code? <span>Resend</span>
          </p>

        </div>
      </div>
    </div>
  );
}