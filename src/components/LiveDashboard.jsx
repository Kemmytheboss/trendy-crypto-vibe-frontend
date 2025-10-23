import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * LiveDashboard:
 * - When compact prop is passed, shows a quick small chart for BTCUSDT (7 days)
 * - Otherwise, shows a bigger interactive chart and rotates through top trending symbols
 */

function LiveDashboard({compact = false}) {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading]  =    useState(true);

  // Fetch trending coins
  async function loadKLines(sym = symbol) {
    setLoading(true);
    try {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${sym}&interval=1d&limit=14`);
      const data = await res.json();
      
      const mapped = data.map((d) => ({
        time: new Date(d[0]).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price: parseFloat(d[4]),
      }));
        setChartData(mapped);
        } catch (err) {
            console.error("Klines error", err);
            setChartData([]);
            } finally {
            setLoading(false);
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
