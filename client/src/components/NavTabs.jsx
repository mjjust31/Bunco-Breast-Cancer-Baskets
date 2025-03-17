import React from "react";
import { Link } from "react-router-dom";
import "./NavTabs.scss";

const NavTabs = ({ username }) => {
  const safeUsername = username?.toLowerCase() || ""; // Prevent errors if username is empty

  return (
    <div className="navbar"> {/* Add the navbar class */}
      <ul className="nav nav-tabs"> {/* Add the nav-tabs class */}
        {/* Always show the Home page link */}
        <li className="nav-item"> {/* Add the nav-item class */}
          <Link to="/" className="nav-link">Home</Link> {/* Add the nav-link class */}
        </li>

        {/* Show Favorites link only if username is entered and not "administrator" */}
        {safeUsername !== "" && safeUsername !== "administrator" && (
          <li className="nav-item">
            <Link to="/favorites" className="nav-link">Favorites</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavTabs;
