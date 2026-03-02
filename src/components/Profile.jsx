import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {

  const [user, setUser] = useState({
    name: "Himani Raj",
    email: "himani@email.com",
    phone: "+91 9876543210",
    address: "Lucknow, India"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile-layout">

      {/* Background */}
      <div className="profile-bg"></div>

      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-icon">🍔</div>
        <div>🏠</div>
        <div>🛒</div>
        <div>⚙️</div>
        <div>👤</div>
      </div>

      {/* Main Section */}
      <div className="profile-main">

        <div className="profile-card">

          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              👩
            </div>
            <h2>My Profile</h2>
            <p>Manage your personal information</p>
          </div>

          {/* Form */}
          <div className="profile-form">

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </div>

            <button className="btn-primary save-btn">
              Save Changes
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}