import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      className="container-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-card" style={{ maxWidth: "500px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", marginBottom: 10 }}>Fresh Homemade Food</h1>
        <p style={{ color: "#fff", marginBottom: 20 }}>
          Fresh food for everyone — made with traditional recipes and loving care.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
          <Link to="/login" className="btn btn-accent">Login</Link>
          <Link to="/register" className="btn btn-outline-secondary" style={{ color: "#000" }}>Create Account
</Link>
        </div>

        <div style={{ marginTop: 16, fontSize: 13, color: "#fff" }}>
          <small>Sign up to get personalized menu recommendations and faster checkout.</small>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
