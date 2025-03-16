import React from "react";
import { Link } from "react-router-dom";
import "./NavTabs.scss";

const NavTabs = ({ username }) => {
  const safeUsername = username?.toLowerCase() || ""; // Prevent errors if username is empty

  return (
    <ul className="nav nav-tabs">
      {/* Always show the Home page link */}
      <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>

      {/* Show Admin Panel only if username is "administrator" */}
      {safeUsername === "administrator" && (
        <li className="nav-item">
          <Link to="/administrator" className="nav-link">Admin Panel</Link>
        </li>
      )}

      {/* Show Favorites link if username is entered */}
      {safeUsername !== "" && safeUsername !== "administrator" && (
        <li className="nav-item">
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </li>
      )}
    </ul>
  );
};

export default NavTabs;
