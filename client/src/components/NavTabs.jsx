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
      <div className="nav-left">
        {/* ✅ Home Button (Regular User) */}
        {safeUsername && safeUsername !== "admin" && (
          <Link to="/" className="nav-link">
            Home
          </Link>
        )}

        {/* ✅ Admin Home Link (View User Page) */}
        {safeUsername === "admin" && (
          <Link to="/" className="nav-link admin-home-link">
            Home
          </Link>
        )}
      </div>

      {/* ✅ Centered Title */}
      <div className="nav-center">
        <h1 className="nav-title">🎗️🎲 Bunco Baskets 🎲 🎗️</h1>
      </div>

      <div className="nav-right">
        {/* ✅ Favorites Button (Regular User) */}
        {safeUsername && safeUsername !== "admin" && (
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        )}

        {/* ✅ Admin Portal Link (Only for Admin) */}
        {safeUsername === "admin" && (
          <Link to="/administrator" className="nav-link admin-portal-link">
            Admin Portal
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavTabs;
