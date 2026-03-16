import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Supplier from "./components/Supplier.jsx";
import Otp from "./components/Otp.jsx";
import AddFood from "./components/AddFood.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleProtectedRoute from "./components/RoleProtectedRoute.jsx";
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
          <Route path="/otp-verify" element={<Otp />} />
         
          

          {/* Dashboard (token logic for now) */}
          <Route
  path="/supplier"
  element={
    <RoleProtectedRoute allowedRole="SUPPLIER">
      <Supplier />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/add-food"
  element={
    <RoleProtectedRoute allowedRole="SUPPLIER">
      <AddFood />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/user-dashboard"
  element={
    <RoleProtectedRoute allowedRole="CUSTOMER">
      <Dashboard />
    </RoleProtectedRoute>
  }
/>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}