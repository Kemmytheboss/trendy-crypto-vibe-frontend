import React from "react";
import LiveDashboard from "./LiveDashboard";


function Hero() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">TrendyCryptoVibe</h1>

      <p className="hero-subtitle">
        Your gateway to trending crypto news, real-time coin updates, and
        the future of digital money.
        Hey there, trailblazer. <br />
        Ready to ride the crypto wave? <br />
        Dive in, learn, invest, and vibe your way to financial freedom 🌊💰
      </p>

      <LiveDashboard />


      <button className="hero-button">Explore Coins</button>
    </section>
  );
}

export default Hero;
