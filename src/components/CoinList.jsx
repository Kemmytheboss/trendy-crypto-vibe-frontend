import React, { useEffect, useState } from "react";

/**
 * CoinList:
 * - Fetches Binance 24hr ticker data
 * - Shows top N symbols that end with USDT and maps to readable coin symbol
 * - Allows adding an item to portfolio: posts to json-server /portfolio and calls addPortfolioItem
 */

function CoinList({ addPortfolioItem }) {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://api.binance.com/api/v3/ticker/24hr")
      .then((r) => r.json())
      .then((data) => {
        const usdt = data
          .filter((t) => t.symbol.endsWith("USDT"))
          .map((t) => ({
            symbol: t.symbol, // e.g. BTCUSDT
            base: t.symbol.replace("USDT", ""),
            lastPrice: parseFloat(t.lastPrice),
            priceChangePercent: parseFloat(t.priceChangePercent),
            volume: parseFloat(t.volume),
          }));
        usdt.sort((a, b) => b.volume - a.volume);
        setTickers(usdt.slice(0, 60));
      })
      .catch((err) => console.error("Binance fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  function getPrediction(change) {
    if (change >= 8) return "Strong Bullish 🔥";
    if (change >= 2) return "Bullish 🚀";
    if (change <= -8) return "Strong Bearish ❄️";
    if (change <= -2) return "Bearish ⤵️";
    return "Neutral ⚖️";
  }

  async function handleAddToPortfolio(ticker) {
    const newItem = {
      name: ticker.base,
      symbol: ticker.base,
      amount: 0.1,
      buyPrice: ticker.lastPrice,
      currentPrice: ticker.lastPrice,
      trend: getPrediction(ticker.priceChangePercent)
    };

    try {
      const res = await fetch("http://localhost:8001/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      if (addPortfolioItem) addPortfolioItem(data);
      alert(`${ticker.base} added to your portfolio (0.1 @ ${ticker.lastPrice})`);
    } catch (err) {
      console.error("Add portfolio error:", err);
      alert("Could not add to portfolio. Is json-server running?");
    }
  }

  const filtered = tickers.filter((t) =>
    t.base.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="coin-list card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Market Coins</h2>
        <input placeholder="Search symbol (BTC, ETH...)" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? <p className="loading">Loading market data...</p> : (
        <div style={{ overflowX: "auto", marginTop: 12 }}>
          <table className="coin-table">
            <thead>
              <tr>
                <th>Coin</th>
                <th>Price (USDT)</th>
                <th>24h %</th>
                <th>Volume</th>
                <th>Prediction</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.symbol}>
                  <td>{t.base}</td>
                  <td>${t.lastPrice.toLocaleString()}</td>
                  <td style={{ color: t.priceChangePercent >= 0 ? "lime" : "#ff6b6b" }}>
                    {t.priceChangePercent.toFixed(2)}%
                  </td>
                  <td>{Number(t.volume).toLocaleString()}</td>
                  <td>{getPrediction(t.priceChangePercent)}</td>
                  <td>
                    <button className="btn primary" onClick={() => handleAddToPortfolio(t)}>
                      Add to Portfolio
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default CoinList;
