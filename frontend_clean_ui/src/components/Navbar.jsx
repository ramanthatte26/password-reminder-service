import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setToken(null);
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="logo" to={token ? "/home" : "/login"}>
          🔐 Reminder Service
        </Link>

        <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
          ☰
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {token ? (
            <>
              <Link to="/home" onClick={toggleMenu}>Home</Link>
              <Link to="/create" onClick={toggleMenu}>Add</Link>
              <Link to="/upcoming" onClick={toggleMenu}>Upcoming</Link>
              <button onClick={() => { handleLogout(); toggleMenu(); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>Login</Link>
              <Link to="/register" onClick={toggleMenu}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
