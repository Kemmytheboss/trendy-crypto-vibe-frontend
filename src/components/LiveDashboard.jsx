import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

/**
 * LiveDashboard:
 * - When compact prop is passed, shows a quick small chart for BTCUSDT (7 days)
 * - Otherwise, shows a bigger interactive chart and rotates through top trending symbols
 */
function LiveDashboard({ compact = false }) {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ useCallback ensures stable reference for dependencies
  const loadKlines = useCallback(async (sym = symbol) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${sym}&interval=1d&limit=14`
      );
      const data = await res.json();
      const mapped = data.map((d) => ({
        time: new Date(d[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: parseFloat(d[4]),
      }));
      setChartData(mapped);
    } catch (err) {
      console.error("Klines error", err);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    loadKlines(symbol);

    let rot;
    if (!compact) {
      rot = setInterval(async () => {
        try {
          const tickersRes = await fetch(
            "https://api.binance.com/api/v3/ticker/24hr"
          );
          const tickers = await tickersRes.json();
          const top = tickers
            .filter((t) => t.symbol.endsWith("USDT"))
            .slice(0, 20);
          const pick = top[Math.floor(Math.random() * top.length)];
          if (pick) {
            setSymbol(pick.symbol);
            loadKlines(pick.symbol);
          }
        } catch (e) {
          console.error(e);
        }
      }, 7000);
    }

    return () => clearInterval(rot);
  }, [compact, symbol, loadKlines]); // ✅ now all dependencies are declared

  return (
    <div style={{ width: "100%", height: compact ? 180 : 320 }}>
      <h4 style={{ margin: "6px 0" }}>
        {compact ? "BTC 7-day" : `Live chart: ${symbol}`}
      </h4>
      {loading ? (
        <p className="loading">Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={compact ? 140 : 260}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00ffff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default LiveDashboard;
