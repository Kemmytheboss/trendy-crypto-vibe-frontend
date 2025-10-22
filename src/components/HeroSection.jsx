import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">CryptoVibe 🚀</h1>

      <p className="hero-subtitle">
        Your Gen Z gateway to trending crypto news, real-time coin updates, and
        the future of digital money.
      </p>

      <div className="hero-message">
        <p>
          Hey there, trailblazer 👋 <br />
          Ready to ride the crypto wave? <br />
          Dive in, learn, invest, and vibe your way to financial freedom 🌊💰
        </p>
      </div>

      <button className="hero-button">Explore Coins</button>
    </section>
  );
}

export default HeroSection;
