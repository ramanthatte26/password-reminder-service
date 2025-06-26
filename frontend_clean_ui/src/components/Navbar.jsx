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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to={token ? "/home" : "/login"}
          className="text-xl font-bold hover:text-white"
        >
          🔐 Reminder Service
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 items-center">
          {token ? (
            <>
              <Link to="/home" className="hover:text-gray-200">
                Home
              </Link>
              <Link to="/create" className="hover:text-gray-200">
                Add
              </Link>
              <Link to="/upcoming" className="hover:text-gray-200">
                Upcoming
              </Link>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded">
                Login
              </Link>
              <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2 bg-blue-100 text-black">
          {token ? (
            <>
              <Link to="/home" onClick={toggleMenu}>Home</Link>
              <Link to="/create" onClick={toggleMenu}>Add</Link>
              <Link to="/upcoming" onClick={toggleMenu}>Upcoming</Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="w-full bg-red-500 text-white py-1 rounded"
              >
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
      )}
    </nav>
  );
}

export default Navbar;
