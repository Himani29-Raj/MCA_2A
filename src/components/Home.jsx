import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, UtensilsCrossed, Truck, Star, Phone, Mail } from "lucide-react";
import "./Home.css";

const Home = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <motion.div
      className="home-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar */}
      <nav className="home-nav glass-card">
        <h2 className="logo">🍔 HomeBites</h2>
        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline fancy-btn">Login</Link>
          <Link to="/register" className="btn btn-accent fancy-btn glow">Sign Up</Link>
          <button
            className="btn btn-outline fancy-btn"
            onClick={() => setShowContact((s) => !s)}
          >
            Contact Us
          </button>
        </div>
      </nav>

      {/* Contact Info */}
      {showContact && (
  <motion.div
    className="contact-widget"
    initial={{ opacity: 0, x: 80, y: 80 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    exit={{ opacity: 0, x: 80, y: 80 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    <h4>Need help? 🍔</h4>

    <div className="contact-row">
      📧 support@HomeBites.com
    </div>

    <div className="contact-row">
      📞 +91 98765 43210
    </div>

    <button className="contact-close" onClick={() => setShowContact(false)}>
      Close
    </button>
  </motion.div>
)}

      {/* Hero Section */}
      <div className="hero glass-card">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Delicious Food, Delivered Fast 🚀
        </motion.h1>

        <p>
          Order fresh, hygienic, homemade-style meals from our HomeBites.  
          Hot food at your door in minutes.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="btn btn-accent big-btn glow">
            Start Ordering
          </Link>
          <Link to="/login" className="btn btn-outline big-btn fancy-btn">
            Already a User?
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="features">
        <motion.div className="feature-card glass-card" whileHover={{ y: -8 }}>
          <UtensilsCrossed size={28} />
          <h3>Freshly Cooked</h3>
          <p>Every meal is prepared after you order. No frozen food.</p>
        </motion.div>

        <motion.div className="feature-card glass-card" whileHover={{ y: -8 }}>
          <Truck size={28} />
          <h3>Fast Delivery</h3>
          <p>Lightning-fast delivery with live tracking.</p>
        </motion.div>

        <motion.div className="feature-card glass-card" whileHover={{ y: -8 }}>
          <Star size={28} />
          <h3>Top Rated</h3>
          <p>Loved by hundreds of customers for taste & hygiene.</p>
        </motion.div>

        <motion.div className="feature-card glass-card" whileHover={{ y: -8 }}>
          <ShoppingBag size={28} />
          <h3>Easy Ordering</h3>
          <p>Simple menu, secure payments & quick checkout.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;