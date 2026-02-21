import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default role
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";

    if (!password) e.password = "Password required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // Redirect based on selected role
      switch (role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "supplier":
          navigate("/supplier-dashboard");
          break;
        case "delivery":
          navigate("/livery-dashboard");
          break;
        case "customer":
          navigate("/user-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  };

  return (
    <motion.div
      className="container-card"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
    >
      <div className="glass-card">
        <h2 className="form-title">Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <p style={{ marginTop: 0, color: "#fff", fontSize: "1rem" }}>
          Select your role and login to your account
        </p>

        {/* Role Selection */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
          {["admin", "supplier", "customer", "delivery"].map((r) => (
            <label key={r} style={{ color: "#fff", cursor: "pointer" }}>
              <input
                type="radio"
                value={r}
                checked={role === r}
                onChange={(e) => setRole(e.target.value)}
                style={{ marginRight: 5 }}
              />
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </label>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          <button type="submit" className="btn-accent">
            Login
          </button>
        </form>

        <div style={{ marginTop: 15, fontSize: 14 }}>
          <small>
            Don't have an account?{" "}
            <Link to="/register" className="link-muted">
              Create one
            </Link>
          </small>
        </div>

        <div style={{ marginTop: 8, fontSize: 13 }}>
          <Link to="/" className="link-muted">
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
