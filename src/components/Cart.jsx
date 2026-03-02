import React, { useState } from "react";
import "./Cart.css";

export default function Cart() {

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cheese Burger",
      price: 149,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
      id: 2,
      name: "Veg Pizza",
      price: 249,
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    }
  ]);

  /* Increase quantity */
  const increaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  /* Decrease quantity */
  const decreaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  /* Remove item */
  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-layout">

      {/* Background */}
      <div className="cart-bg"></div>

      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-icon">🍔</div>
        <div>🏠</div>
        <div>🛒</div>
        <div>👤</div>
        <div>⚙️</div>
      </div>

      {/* Main */}
      <div className="cart-main">

        <h2 className="cart-title">🛒 Your Food Cart</h2>

        <div className="cart-container">

          {/* CART ITEMS */}
          <div className="cart-items">

            {cartItems.length === 0 ? (
              <p className="empty">Your cart is empty</p>
            ) : (
              cartItems.map(item => (
                <div className="cart-card" key={item.id}>

                  <img src={item.image} alt={item.name} />

                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p className="price">₹ {item.price}</p>

                    <div className="qty-control">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </div>

                  <div className="cart-actions">
                    <p className="item-total">
                      ₹ {item.price * item.qty}
                    </p>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))
            )}

          </div>

          {/* ORDER SUMMARY */}
          <div className="cart-summary">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items Total</span>
              <span>₹ {total}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹ 40</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹ {total + 40}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}