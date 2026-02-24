import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email required";
    if (!form.password) e.password = "Password required";
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

      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      let data;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        if (!res.ok) {
          setServerError(text || "Login failed");
          return;
        }
        data = { token: text }; // if backend returns token as plain text
      }

      if (!res.ok) {
        setServerError(data?.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/user-dashboard");

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
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">
          Login to continue ordering delicious food
        </p>

        {serverError && <div className="server-error">{serverError}</div>}

        <form onSubmit={onSubmit} noValidate className="auth-form">
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

          <button
            type="submit"
            className="btn btn-accent big-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <small>
            New here?{" "}
            <Link to="/register" className="link-muted">
              Create an account
            </Link>
          </small>
        </div>

        <div className="auth-footer">
          <Link to="/" className="link-muted">
            ← Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;