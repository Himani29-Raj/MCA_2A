import React, { useState } from "react";
import "./Favourites.css";

export default function Favourites() {

  const [favourites, setFavourites] = useState([
    {
      id: 1,
      name: "Veg Burger",
      price: 120,
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 250,
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      price: 220,
      img: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5"
    }
  ]);

  const removeFavourite = (id) => {
    setFavourites(favourites.filter(item => item.id !== id));
  };

  return (
    <div className="fav-layout">

      {/* Background */}
      <div className="fav-bg"></div>

      <div className="fav-main">
        <h1 className="fav-title">❤️ Your Favourites</h1>

        {favourites.length === 0 ? (
          <p className="empty">No favourite items yet.</p>
        ) : (
          <div className="fav-grid">
            {favourites.map(item => (
              <div className="fav-card" key={item.id}>
                <img src={item.img} alt={item.name} />

                <div className="fav-info">
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price}</p>

                  <div className="fav-actions">
                    <button className="cart-btn">
                      Add to Cart
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => removeFavourite(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}