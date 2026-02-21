import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LiveryDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <motion.div
      className="container-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-card" style={{ textAlign: "center" }}>
        <h2 style={{ color: "#fff" }}>Delivery Dashboard</h2>

        <motion.h4
          style={{
            color: "#00ffff",
            marginTop: 10,
            textShadow: "0 0 8px #00ffff, 0 0 15px #00ffff",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            textShadow: [
              "0 0 8px #00ffff, 0 0 15px #00ffff",
              "0 0 15px #00ffff, 0 0 25px #00ffff",
              "0 0 8px #00ffff, 0 0 15px #00ffff",
            ],
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 2,
          }}
        >
          Welcome Back
        </motion.h4>

        <p style={{ color: "#fff" }}>
          Track your deliveries and update order statuses here.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: 20 }}>
          <Link to="/" className="btn-accent">Home</Link>
          <button onClick={handleLogout} className="btn-outline-secondary" style={{ color: "#fff" }}>
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveryDashboard;
