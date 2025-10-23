import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import CoinList from "./components/CoinList";
import AddCoinForm from "./components/AddCoinForm";
import About from "./components/About";
import Footer from "./components/Footer";
import LiveDashboard from "./components/LiveDashboard";
import "./App.css";

function App() {
  const API_URL = "http://localhost:8001/coins";
  const [coins, setCoins] = useState([]);
  const [theme, setTheme] = useState("light");


  // Fetch data from backend
 useEffect(() => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => setCoins(data)) 
    .catch((err) => console.error("Error fetching coins:", err));
}, []);



  //  Add new coin to backend
  function addCoin(newCoin) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCoin),
    })
      .then((res) => res.json())
      .then((data) => setCoins([...coins, data]))
      .catch((err) => console.error("Error adding coin:", err));
  }
  
  // Toggle theme function
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={`app ${theme}`} >
      <Router>
        <NavBar toggleTheme={toggleTheme} theme={theme}/>
        <Routes>
          <Route path="/" element={<Hero coins={coins} />}/>
          <Route path="/coins" element={<CoinList  coins={coins} />} />
          <Route path="/add" element={<AddCoinForm addCoin={addCoin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/trending" element={<LiveDashboard />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
