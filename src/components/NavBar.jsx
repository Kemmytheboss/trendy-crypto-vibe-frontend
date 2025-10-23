import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; //

function NavBar({ onToggleTheme, theme}) {
  return (
    <nav className="navbar">
        <div className="nav-left">
            <img src={logo} alt="TrendyCryptoVibe Logo" className="nav-logo" />
            <h2 className="logo-text">TrendyCryptoVibe</h2>
        </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/coins">Coins</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="learn">Learn</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/add">Add Coin</Link></li>

        <li>
            <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer">
            Binance
          </a>
        </li>
        <li>
          <a href="https://www.reddit.com/r/cryptocurrency/" target="_blank" rel="noopener noreferrer">
            Reddit
          </a>
        </li>
        <li>
          <a href="https://coinmarketcap.com" target="_blank" rel="noopener noreferrer">
            CMC
          </a>
        </li>

      </ul>
        <div className="flex">
        
            <button className="theme-toggle" onClick={onToggleTheme}>
                {theme === "dark" ? "Light" : "Dark"}
            </button>
        </div> 

    </nav>
  );
}

export default NavBar;
