import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Store, User2 } from "lucide-react";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "CUSTOMER",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Full name required";
    if (!form.email) e.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email";

    if (!form.password) e.password = "Password required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";

    if (form.password !== form.confirm)
      e.confirm = "Passwords do not match";

    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setServerError("");

    if (Object.keys(e).length !== 0) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8081/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        setServerError(text || "Signup failed");
        return;
      }

      // ✅ Correct navigation
      navigate("/otp-verify", { state: { email: form.email } });

    } catch (err) {
      console.error(err);
      setServerError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="home-wrapper"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
    >
      <div className="glass-card auth-card">
        <h2 className="auth-title">Create Your Food Account 🍽️</h2>
        <p className="auth-subtitle">
          Join our HomeBites and start ordering fresh meals
        </p>

        {serverError && <div className="server-error">{serverError}</div>}

        <form onSubmit={onSubmit} noValidate className="auth-form">
          <div className="input-group">
            <User size={18} />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="error-text">{errors.name}</div>

          <div className="input-group">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="error-text">{errors.email}</div>

          <div className="input-group">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="error-text">{errors.password}</div>

          <div className="input-group">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
          </div>
          <div className="error-text">{errors.confirm}</div>

          {/* Role Selector */}
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${form.role === "CUSTOMER" ? "active" : ""}`}
              onClick={() => setForm({ ...form, role: "CUSTOMER" })}
            >
              <User2 size={18} /> Customer
            </button>

            <button
              type="button"
              className={`role-btn ${form.role === "SUPPLIER" ? "active" : ""}`}
              onClick={() => setForm({ ...form, role: "SUPPLIER" })}
            >
              <Store size={18} /> Supplier
            </button>
          </div>
          <div className="error-text">{errors.role}</div>

          <button type="submit" className="btn btn-accent big-btn" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="link-muted">Login</Link>
          </small>
        </div>

        <div className="auth-footer">
          <Link to="/" className="link-muted">← Back to Home</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;