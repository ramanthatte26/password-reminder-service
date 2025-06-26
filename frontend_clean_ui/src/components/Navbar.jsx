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
    <nav className="bg-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link className="text-xl font-bold text-blue-700" to="/">
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
        <div className="hidden lg:flex space-x-4 items-center">
          {token ? (
            <>
              <Link to="/home" className="text-gray-800 hover:text-blue-600">
                Home
              </Link>
              <Link to="/create" className="text-gray-800 hover:text-blue-600">
                Add
              </Link>
              <Link to="/upcoming" className="text-gray-800 hover:text-blue-600">
                Upcoming
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2">
          {token ? (
            <>
              <Link to="/home" className="block text-gray-800 hover:text-blue-600" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/create" className="block text-gray-800 hover:text-blue-600" onClick={toggleMenu}>
                Add
              </Link>
              <Link to="/upcoming" className="block text-gray-800 hover:text-blue-600" onClick={toggleMenu}>
                Upcoming
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block w-full bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
