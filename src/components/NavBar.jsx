import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <h2 className="logo">CryptoVibe</h2>
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
