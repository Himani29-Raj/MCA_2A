import React, { useState, useEffect } from "react";
import { Search, Home, Heart, ShoppingBag, Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";


export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
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

  const filteredItems = foods;

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {

  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }

}, []);

  useEffect(() => {

  const token = localStorage.getItem("token");

  const fetchFoods = () => {
    fetch("http://localhost:8081/api/food/available", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setFoods(data);
      })
      .catch(err => console.error(err));
  };

  fetchFoods(); // first load

  const interval = setInterval(fetchFoods, 5000); // refresh every 5 sec

  return () => clearInterval(interval);

}, []);

  const addToCart = (item) => {

  const existing = cart.find(c => c.id === item.id);

  if (existing) {

    setCart(cart.map(c =>
      c.id === item.id
        ? { ...c, qty: c.qty + 1 }
        : c
    ));

  } else {

    setCart([
      ...cart,
      {
        ...item,
        discountedPrice: getDiscountedPrice(item),
        qty: 1
      }
    ]);

  }
};
  const increaseQty = (id) => {

    setCart(cart.map(item =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    ));

  };

  const decreaseQty = (id) => {

    setCart(cart
      .map(item =>
        item.id === id
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter(item => item.qty > 0)
    );

  };

 const total = cart.reduce((acc, item) => {
  return acc + item.discountedPrice * item.qty;
}, 0);

  const getDiscountedPrice = (item) => {
  return item.price - (item.price * item.discount / 100).toFixed(0);
};

const placeOrder = () => {

  const orderData = {
    items: cart,
    totalAmount: total,
    status: "CREATED",
    createdAt: new Date()
  };

  console.log("Order created:", orderData);

  // Temporary behaviour (until Razorpay is added)
  alert("Order created successfully. Payment integration coming soon.");

};
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
                src={item.imageUrl || "https://via.placeholder.com/300x200?text=Food"}
                alt={item.name}
              />
               {item.discount > 0 && (
                                    <div className="discount-badge">
                                        {item.discount}% OFF
                                    </div>
                                )}
              {item.featured && (
                <div className="featured-badge">
                  ⭐ Featured
                </div>
              )}
              <div className="menu-body">
                <h3>{item.name}</h3>
                <div className="menu-footer">
                  <div>
                    
                     <span className="price">
       ₹{getDiscountedPrice(item)}
      </span>

      <span className="old-price">
        ₹{item.price}
      </span>
                  </div>
                  <button
                    className="btn-primary small"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Panel */}
      <aside className="dashboard-right">
        <h2>Your Cart ({cart.length})</h2>

{cart.length === 0 && (
  <p>Your cart is empty 🛒</p>
)}

        {cart.map(item => (

  <div key={item.id} className="cart-item">

    <img
      src={item.imageUrl}
      alt={item.name}
      className="cart-img"
    />

    <div className="cart-info">

      <h4>{item.name}</h4>

      <div className="cart-controls">

        <button onClick={() => decreaseQty(item.id)}>−</button>

        <span>{item.qty}</span>

        <button onClick={() => increaseQty(item.id)}>+</button>

      </div>

    </div>

    <div className="cart-right">

      <span className="cart-price">
        ₹{item.discountedPrice * item.qty}
      </span>

      <button
        className="remove-btn"
        onClick={() =>
          setCart(cart.filter(c => c.id !== item.id))
        }
      >
        ❌
      </button>

    </div>

  </div>

))}
        <h3>Total: ₹{total}</h3>
       <button
  className="btn-primary buy-btn"
  disabled={cart.length === 0}
  onClick={placeOrder}
>
  {cart.length === 0 ? "Cart Empty" : `Place Order`}
</button>
      </aside>

    </div>
  );
}