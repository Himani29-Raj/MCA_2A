// src/components/UserDashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const homemadeFoods = [
  { id: 1, name: "Paneer Butter Masala", category: "North Indian", chef: "Mrs. Sharma", rating: 4.8, price: 150, image: "/assets/paneer.jpg"},
  { id: 2, name: "Masala Dosa", category: "South Indian", chef: "Mr. Reddy", rating: 4.8, price: 90, image: "/assets/dosa.jpg" },
  { id: 3, name: "Gulab Jamun", category: "Desserts", chef: "Mrs. Mehta", rating: 4.9, price: 50, image: "/assets/gulab-jamun.jpg" },
  { id: 4, name: "Samosa", category: "Snacks", chef: "Mr. Singh", rating: 4.7, price: 20, image: "/assets/samosa.jpg" },
  { id: 5, name: "Aloo Paratha", category: "North Indian", chef: "Mrs. Kaur", rating: 4.5, price: 60, image: "/assets/aalo-paratha.jpg" },
  { id: 6, name: "Indian Thali", category: "North Indian", chef: "Mrs. Sharma", rating: 4.9, price: 200, image: "/assets/Indian thali.jpg" },
  { id: 7, name: "Rasgulla", category: "Desserts", chef: "Mrs. Gupta", rating: 4.8, price: 40, image: "/assets/white rasgulla.jpg" },
  { id: 8, name: "Vada Pav", category: "Snacks", chef: "Mr. Desai", rating: 4.4, price: 30, image: "/assets/Vada-Pav.jpg" },
  { id: 9, name: "Chole Bhature", category: "North Indian", chef: "Mrs. Sharma", rating: 4.7, price: 120, image: "/assets/bhature.jpg" },
  { id: 10, name: "Idli Sambhar", category: "South Indian", chef: "Mr. Reddy", rating: 4.6, price: 70, image: "/assets/sambhar_idli.jpg" },
  { id: 11, name: "Jalebi", category: "Desserts", chef: "Mrs. Mehta", rating: 4.9, price: 35, image: "/assets/Jalebi.jpg" },
  { id: 12, name: "Pani Puri", category: "Snacks", chef: "Mr. Singh", rating: 4.6, price: 25, image: "/assets/Panipuri.jpg" },
  { id: 13, name: "Rajma Chawal", category: "North Indian", chef: "Mrs. Kaur", rating: 4.5, price: 100, image: "/assets/Rajma chawal.jpg" },
  { id: 14, name: "Uttapam", category: "South Indian", chef: "Mr. Reddy", rating: 4.6, price: 85, image: "/assets/uttapum.jpg" },
  { id: 15, name: "Kaju Katli", category: "Desserts", chef: "Mrs. Gupta", rating: 4.9, price: 60, image: "/assets/Kaju katli.jpg" },

  // 🍽️ Newly Added Items (from uploaded images)
  { id: 16, name: "Dal Makhani", category: "North Indian", chef: "Mrs. Sharma", rating: 4.8, price: 130, image: "/assets/dal.jpg" },
  { id: 17, name: "Soya Chaap", category: "North Indian", chef: "Mr. Khanna", rating: 4.7, price: 140, image: "/assets/Soya.jpg" },
  { id: 18, name: "Suji Halwa", category: "Desserts", chef: "Mrs. Mehta", rating: 4.9, price: 45, image: "/assets/halwa.jpg" },
  { id: 19, name: "Poori Bhaji", category: "North Indian", chef: "Mrs. Kaur", rating: 4.6, price: 80, image: "/assets/chat.jpg" },
  { id: 20, name: "Pav Bhaji", category: "Snacks", chef: "Mr. Desai", rating: 4.8, price: 90, image: "/assets/bhel.jpg" },
  { id: 21, name: "Momo", category: "Snacks", chef: "Mrs. Rai", rating: 4.7, price: 70, image: "/assets/fudge.jpg" },
  { id: 22, name: "Dhokla", category: "Snacks", chef: "Mrs. Patel", rating: 4.8, price: 60, image: "/assets/Palak.jpg" },
  { id: 23, name: "Kheer", category: "Desserts", chef: "Mrs. Gupta", rating: 4.9, price: 55, image: "/assets/Sanwi.jpg" },
  { id: 24, name: "Pulao", category: "North Indian", chef: "Mrs. Sharma", rating: 4.5, price: 100, image: "/assets/Friedrice.jpg" },
  { id: 25, name: "Dosa Combo", category: "South Indian", chef: "Mr. Reddy", rating: 4.7, price: 110, image: "/assets/chilli.jpg" },
];

const categories = ["All", "North Indian", "South Indian", "Snacks", "Desserts"];
const categoryIcons = { All: "🍽️", "North Indian": "🥘", "South Indian": "🌾", Snacks: "🥪", Desserts: "🍰" };
const locations = ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai"];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [location, setLocation] = useState("Mumbai");

  const handleLogout = () => navigate("/login");

  const filteredFoods = homemadeFoods.filter(
    (f) =>
      (activeCategory === "All" || f.category === activeCategory) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setCartOpen(true);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f8f8f8", minHeight: "100vh", paddingBottom: 80 }}>
      {/* Navbar */}
      <div style={{ position: "sticky", top: 0, backgroundColor: "#fff", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", zIndex: 100, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ margin: 0, color: "#ff3f6c" }}>Homemade Eats</h2>
        <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: "5px 10px", borderRadius: 20, border: "1px solid #ddd" }}>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search homemade food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "5px 10px", borderRadius: 20, border: "1px solid #ddd", flexGrow: 1, minWidth: 150 }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setCartOpen(!cartOpen)} style={{ backgroundColor: "#ff3f6c", color: "#fff", border: "none", padding: "5px 12px", borderRadius: 20 }}>Cart ({cart.length})</button>
          <button onClick={handleLogout} style={{ padding: "5px 10px", borderRadius: 20, backgroundColor: "#ff3f6c", color: "#fff", border: "none" }}>Logout</button>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ margin: "20px 0", overflowX: "auto", padding: "0 16px", display: "flex", gap: 12 }}>
        {categories.map((cat) => (
          <motion.div
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.1, boxShadow: "0 6px 12px rgba(0,0,0,0.2)" }}
            style={{ flex: "0 0 auto", minWidth: 100, height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: activeCategory === cat ? "#ff3f6c" : "#eee", color: activeCategory === cat ? "#fff" : "#333", fontWeight: "bold", cursor: "pointer", gap: 6 }}
          >
            <span style={{ fontSize: 18 }}>{categoryIcons[cat]}</span>
            <span>{cat}</span>
          </motion.div>
        ))}
      </div>

      {/* Food Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          padding: "0 16px",
        }}
      >
        {filteredFoods.map((f) => (
          <motion.div
            key={f.id}
            whileHover={{ scale: 1.05 }}
            style={{ borderRadius: 15, overflow: "hidden", backgroundColor: "#fff", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}
          >
            <div style={{ position: "relative", width: 300, height: 200 }}>
              <img
                src={f.image}
                alt={f.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  display: "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#eee",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "#555",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <span>{f.name}</span>
                <span>₹ {f.price}</span>
              </div>
            </div>

            <div style={{ padding: 10, flexGrow: 1 }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>{f.name}</h3>
              <p style={{ margin: "3px 0", fontSize: 12, color: "#555" }}>Chef: {f.chef}</p>
              <p style={{ margin: "2px 0", fontSize: 13, color: "#ff6f91" }}>⭐ {f.rating}</p>
              <p style={{ margin: "2px 0", fontSize: 14, fontWeight: "bold" }}>₹ {f.price}</p>
              <button
                onClick={() => addToCart(f)}
                style={{ width: "100%", marginTop: 5, border: "none", backgroundColor: "#ff3f6c", color: "#fff", padding: "6px 0", borderRadius: 10, cursor: "pointer" }}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
