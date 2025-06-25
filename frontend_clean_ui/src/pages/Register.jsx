import { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function Register({ setToken }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      errs.name = "👤 Name is required.";
    }

    if (!form.email.trim()) {
      errs.email = "📧 Email is required.";
    } else if (!emailRegex.test(form.email)) {
      errs.email = "❌ Enter a valid email (e.g., user@example.com).";
    }

    if (!form.password.trim()) {
      errs.password = "🔒 Password is required.";
    } else if (form.password.length < 6) {
      errs.password = "❌ Password must be at least 6 characters.";
    }

    return errs;
  };

  const register = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const res = await axios.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", form.email);
      setToken(res.data.token);
      navigate("/home");
    } catch (e) {
      const msg = e.response?.data || "Something went wrong.";
      alert(`❌ Registration failed: ${msg}`);
    }
  };

  return (
    <div className="page-container">
      <h1>📝 Register</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            setErrors({ ...errors, name: "" });
          }}
          placeholder="Enter your name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            setErrors({ ...errors, email: "" });
          }}
          placeholder="Enter your email (e.g. user@example.com)"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            setErrors({ ...errors, password: "" });
          }}
          placeholder="Enter password (min 6 characters)"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="button" onClick={register} className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
