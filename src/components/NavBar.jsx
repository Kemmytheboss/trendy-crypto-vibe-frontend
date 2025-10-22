import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cryptovibe logo.png"; //

function NavBar() {
  return (
    <nav className="navbar">
        <div className="nav-left">
            <img src={logo} alt="CryptoVibe Logo" className="nav-logo" />
            <h2 className="logo-text">CryptoVibe</h2>
        </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/coins">Coins</Link></li>
        <li><Link to="/add">Add Coin</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
