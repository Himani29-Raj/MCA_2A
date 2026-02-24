import React from 'react';

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import './style.css';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-root">
      <div className="bg-image"></div>

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>

          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         
          <Route
            path="/dashboard"
            element={
              localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/login" />
            }
          />

          {/* 🔒 Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user-dashboard" element={<Dashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}