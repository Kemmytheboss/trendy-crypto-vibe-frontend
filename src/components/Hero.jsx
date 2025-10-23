import React from "react";
import LiveDashboard from "./LiveDashboard";
import { useNavigate } from "react-router-dom";
import SocialFeed from "./SocialFeed";
import heroGIF from "../assets/crypto.gif"; //


function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div>
        <img src={heroGIF} alt="Crypto Vibe" className="hero-gif" />
        <h1 className="hero-title">TrendyCryptoVibe</h1>
        <p className="hero-subtitle">Vibe with the Future of Crypto</p>
      </div>

      <div>
        <div className="card">
          <h3 style={{ margintTop: 0 }}>Stay Ahead in Crypto</h3>
          <LiveDashboard compact />
        </div>

        <div className="card" style={{margintTop: 12}}>
          <h3 style={{ margintTop: 0 }}>Join the Conversation</h3>
          <SocialFeed />
        </div>
      </div>
    </section>
  );
}

export default Hero;
