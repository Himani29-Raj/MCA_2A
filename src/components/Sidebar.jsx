import React from 'react';
import { FaHome, FaBox, FaUsers, FaUser } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Supplier</h2>
      <ul className="sidebar-menu">
        <li><FaHome /> Dashboard</li>
        <li><FaBox /> Orders</li>
        <li><FaUsers /> Complaints</li>
        <li><FaBox /> Products</li>
        <li><FaUser /> Profile</li>
      </ul>
    </div>
  );
}
