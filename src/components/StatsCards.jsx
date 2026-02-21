import React from 'react';

const stats = [
  { title: 'Orders', value: 120 },
  { title: 'Revenue', value: 4500 }, // remove the $ symbol here
  { title: 'Pending', value: 15 },
  { title: 'Delivered', value: 105 },
  { title: 'Products', value: 50 },
];

export default function StatsCards() {
  return (
    <div className="stats-cards">
      {stats.map((stat, idx) => (
        <div className="card" key={idx}>
          <h3>{stat.title}</h3>
          <p>
            {stat.title === 'Revenue'
              ? stat.value.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                })
              : stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
