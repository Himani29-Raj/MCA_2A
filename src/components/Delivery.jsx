import React from "react";
import "./Delivery.css";
import { useNavigate } from "react-router-dom";

export default function Delivery() {
  const navigate = useNavigate();

  return (
    <div className="delivery-page">

      {/* Background Overlay */}
      <div className="delivery-bg"></div>

      <div className="delivery-container">

        {/* Header */}
        <div className="delivery-header">
          <h1>🚚 Delivery Tracking</h1>
          <p>Your delicious meal is on the way!</p>
        </div>

        {/* Status Card */}
        <div className="delivery-card">

          <div className="delivery-image">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="food"
            />
          </div>

          <div className="delivery-details">
            <h2>Paneer Butter Masala</h2>
            <p>Estimated Arrival: <strong>25 mins</strong></p>

            {/* Progress */}
            <div className="delivery-progress">
              <div className="step active">Order Placed</div>
              <div className="step active">Cooking</div>
              <div className="step active">Out for Delivery</div>
              <div className="step">Delivered</div>
            </div>

            <button
              className="delivery-btn"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}