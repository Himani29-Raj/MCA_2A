import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
// import './Topbar.css';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="topbar-icons">
        <FaBell />
        <FaUserCircle />
      </div>
    </div>
  );
}
