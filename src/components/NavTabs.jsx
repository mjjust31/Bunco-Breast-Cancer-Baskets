import { Link, useLocation } from "react-router-dom";
import React from "react";
import "./NavTabs.scss";

function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav nav-tabs">
      <button className="nav-item">
        <Link to="/" className={currentPage === "/" ? "active" : ""}>Main</Link>
      </button>
      <button className="nav-item">
        <Link to="/Favorites" className={currentPage === "/Favorites" ? "active" : ""}>Favorites</Link>
      </button>
    </ul>
  );
}

export default NavTabs;
