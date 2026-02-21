import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

// 🌟 Newly added imports for dashboards
import AdminDashboard from './components/adminDashboard.jsx';
import SupplierDashboard from './components/supplierDashboard.jsx';
import LiveryDashboard from './components/liveryDashboard.jsx';
import UserDashboard from './components/userDashboard.jsx';

import './style.css'; // Make sure your CSS is imported

export default function App() {
  const location = useLocation();

  return (
    <div className="app-root">
      {/* Global blur background */}
      <div className="bg-image"></div>

      {/* AnimatePresence wraps Routes for page transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🌈 Dashboards */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/livery-dashboard" element={<LiveryDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* Default fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
