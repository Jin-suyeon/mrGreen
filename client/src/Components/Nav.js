import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Nav.css";

function Nav() {
  return (
    <div className="nav_container">
      <div className="nav_in">
        <Link to="/" className="nav_logo"></Link>
        <div className="nav_menu">
          <Link className="nav_menu_sub" to="/search">
            Search
          </Link>
          <span className="nav_menu_sub">Login</span>
          <span className="nav_menu_sub">Signup</span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
