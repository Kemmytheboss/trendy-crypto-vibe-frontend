import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LiveDashboard() {
  const [trending, setTrending] = useState([]);
  const [priceData, setPriceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  // Fetch trending coins
  async function fetchTrending() {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
      const data = await res.json();
      setTrending(
        data.coins.map((item) => ({
          id: item.item.id,
          name: item.item.name,
          symbol: item.item.symbol.toUpperCase(),
          thumb: item.item.thumb,
          rank: item.item.market_cap_rank,
        }))
      );
    } catch (err) {
      console.error("Error fetching trending coins:", err);
    }
  }

  // Fetch 7-day price data for each trending coin
  async function fetchCoinPrices(coinId) {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      const data = await res.json();
      return data.prices.map(([time, price]) => ({
        time: new Date(time).toLocaleDateString("en-US", { weekday: "short" }),
        price,
      }));
    } catch (err) {
      console.error("Error fetching coin price data:", err);
      return [];
    }
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await fetchTrending();
      setLoading(false);
    }
    loadData();
  }, []);

  // Fetch graph data for all coins once we have trending coins
  useEffect(() => {
    async function loadPriceData() {
      const priceMap = {};
      for (const coin of trending) {
        priceMap[coin.id] = await fetchCoinPrices(coin.id);
      }
      setPriceData(priceMap);
    }
    if (trending.length > 0) loadPriceData();
  }, [trending]);

  // Auto-slide between coins
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % trending.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [trending]);

  if (loading) return <p className="loading">Loading live crypto data...</p>;
  if (trending.length === 0) return <p>No trending data found.</p>;

  const currentCoin = trending[index];
  const currentGraph = priceData[currentCoin.id] || [];

  return (
    <div className="live-dashboard">
      <h2 className="dashboard-title">📈 Trending Now: {currentCoin.name}</h2>
      <div className="carousel">
        <img src={currentCoin.thumb} alt={currentCoin.name} className="coin-image" />
        <div className="coin-info">
          <h3>{currentCoin.name}</h3>
          <p>Symbol: {currentCoin.symbol}</p>
          <p>Rank #{currentCoin.rank}</p>
        </div>
      </div>

      <div className="chart-section">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currentGraph}>
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#00ffff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="slide-note">Auto-updating every 5 seconds 🔄</p>
    </div>
  );
}

export default LiveDashboard;
