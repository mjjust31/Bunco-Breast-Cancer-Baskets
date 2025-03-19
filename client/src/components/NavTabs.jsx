import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import "./NavTabs.scss";

const NavTabs = () => {
  const { username, handleLogout } = useContext(BasketContext);
  const safeUsername = username?.toLowerCase() || ""; // Prevent errors if empty
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* ✅ Home Button (Left) */}
      {safeUsername && safeUsername !== "admin" && (
        <div className="nav-left">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
      )}

      {/* ✅ Centered Title */}
      <div className="nav-center">
        <h1 className="nav-title"> 🎗️🎲 Bunco Baskets 🎲 🎗️</h1>
      </div>

      {/* ✅ Favorites Button (Right) */}
      {safeUsername && safeUsername !== "admin" && (
        <div className="nav-right">
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </div>
      )}

    </nav>
  );
};

export default NavTabs;
