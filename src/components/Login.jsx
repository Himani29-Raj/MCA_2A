import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import "./Register.css"; // 👈 use same css as register

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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();   // ✅ read JSON

    if (!res.ok) {
      setServerError(data.message || "Login failed");
      return;
    }

    // ✅ Save token and role
      localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify({
  name: data.name,
  role: data.role
}));

      // ✅ Redirect based on role
      if (data.role === "SUPPLIER") {
        navigate("/supplier");
      } else {
        navigate("/user-dashboard");
      }

    } catch (err) {
      console.error(err);
      setServerError(err.message || "Server not reachable");
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
          Login to continue ordering fresh meals
        </p>

        {serverError && <div className="server-error">{serverError}</div>}

        <form onSubmit={onSubmit} className="auth-form">

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
            Don't have an account?{" "}
            <Link to="/register" className="link-muted">
              Create Account
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