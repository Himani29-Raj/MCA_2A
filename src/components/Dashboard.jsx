import React, {  useState, useEffect } from "react";
import { Search, Home, Heart, ShoppingBag, Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const menuItems = [
  {
    name: "Butter Chicken",
    price: 220,
    oldPrice: 280,
    category: "Recommended",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800",
  },
  {
    name: "Masala Dosa",
    price: 90,
    oldPrice: 120,
    category: "Breakfast",
    image: "data:image/jpeg;base64,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",
  },
  {
    name: "Veg Thali",
    price: 160,
    oldPrice: 200,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=800",
  },
  {
    name: "Paneer Tikka",
    price: 180,
    oldPrice: 240,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800",
  },
  {
    name: "Chicken Biryani",
    price: 240,
    oldPrice: 300,
    category: "Lunch",
    image: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01-750x750.jpg",
  },
  {
    name: "Cold Coffee",
    price: 80,
    oldPrice: 120,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800",
  },
];

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("Recommended");
  const [activeTab, setActiveTab] = useState("Menu");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:8081/api/auth/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setUser(data);
    })
    .catch((err) => console.log(err));
}, []);

  const filteredItems =
    activeCategory === "Recommended"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-icon active"><Home /></div>
        <div className="sidebar-icon"><Heart /></div>
        <div className="sidebar-icon"><ShoppingBag /></div>
        <div className="sidebar-icon"><Settings /></div>
        <div className="sidebar-icon"><User /></div>

        <button className="logout-icon" onClick={handleLogout} title="Logout">
          <LogOut />
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Header */}
        <header className="dashboard-top">
          <div>
            <h1>Welcome, {user ? user.name : "User"} 👋</h1>
            <p>Good food = good mood 😄</p>
          </div>

          <div className="dashboard-actions">
            <button
              className={activeTab === "Menu" ? "btn-primary" : "btn-outline"}
              onClick={() => setActiveTab("Menu")}
            >
              Menu
            </button>
            <button
              className={activeTab === "Meal Plans" ? "btn-primary" : "btn-outline"}
              onClick={() => setActiveTab("Meal Plans")}
            >
              Meal Plans
            </button>
            <button
              className={activeTab === "Delivery" ? "btn-primary" : "btn-outline"}
              onClick={() => setActiveTab("Delivery")}
            >
              Delivery
            </button>

            <div className="search-box">
              <Search size={18} />
              <input placeholder="Search food..." />
            </div>
          </div>
        </header>

        {/* Categories */}
        <div className="category-tabs">
          {["Recommended", "Breakfast", "Lunch", "Dinner", "Coffee"].map((cat) => (
            <span
              key={cat}
              className={activeCategory === cat ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.map((item, i) => (
            <div key={i} className="menu-card">
              <img
                src={item.image || "https://via.placeholder.com/300x200?text=Food"}
                alt={item.name}
              />
              <div className="menu-body">
                <h3>{item.name}</h3>
                <div className="menu-footer">
                  <div>
                    <span className="price">₹{item.price}</span>
                    <span className="old-price">₹{item.oldPrice}</span>
                  </div>
                  <button className="btn-primary small">Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Panel */}
      <aside className="dashboard-right">
        <h2>Your Meal Plan</h2>

        <div className="meal-box">
          <strong>Breakfast</strong>
          <span>Masala Dosa</span>
          <span className="price">₹90</span>
        </div>

        <div className="meal-box">
          <strong>Lunch</strong>
          <span>Veg Thali</span>
          <span className="price">₹160</span>
        </div>

        <div className="meal-drop">Drop dinner here 🍽️</div>
      </aside>

    </div>
  );
}