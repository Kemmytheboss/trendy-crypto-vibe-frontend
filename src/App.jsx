import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import CoinList from "./components/CoinList";
import AddCoinForm from "./components/AddCoinForm";
import About from "./components/About";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [coins, setCoins] = useState([]);

  // Fetch coins from JSON-server
  useEffect(() => {
    fetch("http://localhost:8001/coins")
      .then(res => res.json())
      .then(data => setCoins(data))
      .catch(err => console.error("Error fetching coins:", err));
  }, []);

  // Add new coin (POST response updates state)
  function addCoin(newCoin) {
    setCoins([...coins, newCoin]);
  }

  // Toggle theme
  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div className={`app ${theme}`}>
      <Router>
        <NavBar onToggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/coins" element={<CoinList coins={coins} />} />
          <Route path="/add" element={<AddCoinForm addCoin={addCoin} />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
