import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { BasketContext } from "../context/BasketContext"; // ✅ Import context
import "./NavTabs.scss";

const NavTabs = () => {
  const { username, handleLogout } = useContext(BasketContext);
  const safeUsername = username?.toLowerCase() || ""; // Prevent errors if empty
  const navigate = useNavigate(); // ✅ Define navigate here

  return (
    <nav className="navbar">
      <ul className="nav-tabs">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>

        {safeUsername !== "" && safeUsername !== "admin" && (
          <li className="nav-item">
            <Link to="/favorites" className="nav-link">Favorites</Link>
          </li>
        )}

        {safeUsername === "admin" && (
          <li className="nav-item">
            <button onClick={() => handleLogout(navigate)} className="nav-link logout-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavTabs;
