import React from "react";
import LiveDashboard from "./LiveDashboard";
import { useNavigate } from "react-router-dom";
import SocialFeed from "./SocialFeed";


function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <h1 className="hero-title">TrendyCryptoVibe</h1>

      <p className="hero-subtitle">
        Your gateway to trending crypto news, real-time coin updates, and
        the future of digital money. <br />
        Dive in, learn, invest, and vibe your way to financial freedom.
      </p>
      
      <button className="hero-button" onClick={() => navigate("/coins")}>Explore Coins</button>
      <LiveDashboard />
      <SocialFeed />
    </section>
  );
}

export default Hero;
