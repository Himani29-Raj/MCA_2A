import React from "react";
import "./mealplans.css";

const meals = [
  {
    id: 1,
    title: "Healthy Veg Plan",
    price: "₹1499 / week",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    desc: "Balanced vegetarian meals with protein & nutrition.",
  },
  {
    id: 2,
    title: "Protein Rich Plan",
    price: "₹1899 / week",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    desc: "High protein meals perfect for fitness lovers.",
  },
  {
    id: 3,
    title: "Family Combo Plan",
    price: "₹2999 / week",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    desc: "Delicious meals designed for the whole family.",
  },
  {
    id: 4,
    title: "Weight Loss Plan",
    price: "₹1699 / week",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    desc: "Low calorie meals crafted for healthy weight loss.",
  },
];

export default function MealPlans() {
  return (
    <div className="mealplans-page">
      <div className="mealplans-container">
        <h1 className="meal-title">🍱 Choose Your Meal Plan</h1>
        <p className="meal-subtitle">
          Fresh homemade meals delivered daily to your doorstep
        </p>

        <div className="meal-grid">
          {meals.map((meal) => (
            <div className="meal-card" key={meal.id}>
              <img src={meal.image} alt={meal.title} />
              <div className="meal-info">
                <h3>{meal.title}</h3>
                <p>{meal.desc}</p>

                <div className="meal-bottom">
                  <span>{meal.price}</span>
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}