import React from "react";

function CoinList({ coins }) {
  return (
    <div className="coin-list">
      <h2>Trending Coins 💹</h2>
      <div className="coin-container">
        {coins.map((coin) => (
          <div key={coin.id} className="coin-card">
            <h3>{coin.name} ({coin.symbol})</h3>
            <p>Price: ${coin.price}</p>
            <p>Trend: {coin.trend}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoinList;
