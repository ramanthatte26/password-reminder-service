import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="logo" to="/">🔐 Reminder Service</Link>
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/create">Add</Link>
              <Link to="/upcoming">Upcoming</Link>
              <button onClick={handleLogout} className="btn btn-warning">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-success">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
