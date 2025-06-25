import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddReminder from "./pages/AddReminder";
import EditReminder from "./pages/EditReminder";
import Upcoming from "./pages/Upcoming";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        {/* 👇 Redirect root route to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <AddReminder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditReminder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upcoming"
          element={
            <ProtectedRoute>
              <Upcoming />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
