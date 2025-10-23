import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import CoinList from "./components/CoinList";
import AddCoinForm from "./components/AddCoinForm";
import Portfolio from "./components/Portfolio";
import LearnHub from "./components/LearnHub";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState("dark");
  const [portfolio, setPortfolio] = useState([]);

  // Load portfolio from json-server
  useEffect(() => {
    fetch("http://localhost:8001/portfolio")
      .then((r) => r.json())
      .then((data) => setPortfolio(data))
      .catch((err) => console.error("Portfolio fetch error:", err));
  }, []);

  // Add new portfolio item (called after successful POST)
  function addPortfolioItem(item) {
    setPortfolio((prev) => [...prev, item]);
  }

  // Toggle theme (passed to NavBar)
  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div className={`app ${theme}`}>
      <NavBar onToggleTheme={toggleTheme} theme={theme} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Portfolio portfolio={portfolio} />
                <LearnHub />
              </>
            }
          />
          <Route
            path="/coins"
            element={<CoinList addPortfolioItem={addPortfolioItem} />}
          />
          <Route
            path="/add"
            element={<AddCoinForm addPortfolioItem={addPortfolioItem} />}
          />
          <Route path="/portfolio" element={<Portfolio portfolio={portfolio} />} />
          <Route path="/learn" element={<LearnHub />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
