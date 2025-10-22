import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import CoinList from "./components/CoinList";
import AddCoinForm from "./components/AddCoinForm";
import About from "./components/About";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/coins")
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error("Error fetching coins:", err));
  }, []);

  // Add new coin to state (for POST)
  function addCoin(newCoin) {
    setCoins([...coins, newCoin]);
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/coins" element={<CoinList coins={coins} />} />
        <Route path="/add" element={<AddCoinForm addCoin={addCoin} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
