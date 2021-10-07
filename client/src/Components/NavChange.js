import React from "react";
import "../Styles/Nav.css";
import { Link } from "react-router-dom";

function NavChange() {
  return (
    <div className="nav_container">
      <div className="nav_in">
        <Link to="/" className="nav_logo"></Link>
        <div className="nav_menu">
          <Link className="nav_menu_sub" to="/search">
            Search
          </Link>
          <Link to="/mypage" className="nav_menu_sub">
            Mypage
          </Link>
          <span className="nav_menu_sub">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default NavChange;
