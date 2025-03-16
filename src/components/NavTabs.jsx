import { Link, useLocation } from "react-router-dom";
import React from "react";
// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === "/" ? "nav-link active" : "nav-link"}>
          Main
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Favorites"
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === "/About" ? "nav-link active" : "nav-link"}>
          Favorites
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
