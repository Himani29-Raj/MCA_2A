import React from 'react';
// import './MostPurchased.css';

const products = [
  { name: 'Paneer Butter Masala', img: "/assets/paneer.jpg" },
  { name: 'Chole Bhature', img: 'https://via.placeholder.com/80' },
];

export default function MostPurchased() {
  return (
    <div className="most-purchased">
      <h3>Most Purchased Products</h3>
      <div className="products-row">
        {products.map((p, idx) => (
          <div className="product-card" key={idx}>
            <img src={p.img} alt={p.name} />
            <p>{p.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
