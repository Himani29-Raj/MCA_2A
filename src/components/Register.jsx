import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Full name required";
    if (!form.email) e.email = !form.email ? "Email required" : !/\S+@\S+\.\S+/.test(form.email) && "Enter a valid email";
    if (!form.password) e.password = "Password required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      navigate("/");
    }
  };

  return (
    <motion.div
      className="container-card"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
    >
      <div className="glass-card">
        <h2 className="form-title">Create Account</h2>
        <p style={{ marginTop: 0, color: "#fff", fontSize: "1rem" }}>Register your new account</p>

        <form onSubmit={onSubmit} noValidate>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <div className="invalid-feedback">{errors.name}</div>

          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="invalid-feedback">{errors.email}</div>

          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="invalid-feedback">{errors.password}</div>

          <input
            type="password"
            className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
          <div className="invalid-feedback">{errors.confirm}</div>

          <button type="submit" className="btn-accent">Register</button>
        </form>

        <div style={{ marginTop: 12, fontSize: 14 }}>
          <small>Already have an account? <Link to="/login" className="link-muted">Login</Link></small>
        </div>

        <div style={{ marginTop: 8, fontSize: 13 }}>
          <Link to="/" className="link-muted">Back to Home</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
