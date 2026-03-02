import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

/* Pages */
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile.jsx";
import Setting from "./components/Setting.jsx";
import Cart from "./components/Cart.jsx";
import Favourites from "./components/Favourites.jsx";
import MealPlans from "./components/MealPlans.jsx";
import Delivery from "./components/Delivery.jsx";
import Otp from "./components/otp.jsx";

import "./style.css";

export default function App() {
  const location = useLocation();

  return (
    <div className="app-root">
      <div className="bg-image"></div>

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />

          {/* Main Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/mealplans" element={<MealPlans />} />
          <Route path="/delivery" element={<Delivery />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />

        </Routes>
      </AnimatePresence>
    </div>
  );
}