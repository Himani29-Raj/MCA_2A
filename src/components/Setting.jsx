import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.css";

export default function Settings() {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "user@example.com",
  };

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    const updatedUser = { name, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Settings updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="settings-container">
      <div className="settings-card">

        <h1>⚙️ Account Settings</h1>

        {/* Profile Section */}
        <div className="settings-section">
          <h2>Profile Information</h2>

          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Section */}
        <div className="settings-section">
          <h2>Change Password</h2>

          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Preferences */}
        <div className="settings-section">
          <h2>Preferences</h2>

          <div className="toggle-row">
            <span>Enable Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>

          <div className="toggle-row">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="settings-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}