import axios from "../axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errs.email = "📧 Email is required.";
    } else if (!emailRegex.test(email)) {
      errs.email = "❌ Enter a valid email (e.g., user@example.com).";
    }

    if (!password.trim()) {
      errs.password = "🔒 Password is required.";
    } else if (password.length < 6) {
      errs.password = "❌ Password must be at least 6 characters.";
    }

    return errs;
  };

  const login = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const res = await axios.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      setToken(res.data.token);
      navigate("/home");
    } catch (e) {
      const msg = e.response?.data || "Invalid credentials or server error.";
      alert(`❌ Login failed: ${msg}`);
    }
  };

  return (
    <div className="page-container">
      <h1>🔐 Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
          placeholder="Enter your email (e.g. user@example.com)"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({ ...errors, password: "" });
          }}
          placeholder="Enter your password (min 6 characters)"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="button" onClick={login} className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
