import React, { useEffect, useState } from "react";

/**
 * Portfolio component:
 * - Receives initial portfolio from App (from json-server)
 * - For each item, fetches current price from Binance and calculates current value and P/L
 * - Calculates value, P/L, and P/L percentage
 * - Adapts colors for dark/light theme
 */

function Portfolio({ portfolio }) {
  const [withPrices, setWithPrices] = useState([]);

  useEffect(() => {
    async function enrich() {
      const arr = await Promise.all(
        portfolio.map(async (p) => {
          try {
            // Binance expects pair like BTCUSDT
            const symbolPair = `${p.symbol}USDT`;
            const r = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbolPair}`);
            const json = await r.json();
            const current = json.price ? parseFloat(json.price) : p.currentPrice || 0;
            const value = current * (p.amount || 0);
            const cost = (p.buyPrice || 0) * (p.amount || 0);
            const pl = value - cost;
            const plPct = cost ? ((pl / cost) * 100) : 0;
            return { ...p, currentPrice: current, value, pl, plPct };
          } catch (err) {
            console.warn("Price fetch failed for", p.symbol, err);
            return { ...p, currentPrice: p.currentPrice || 0, value: 0, pl: 0, plPct: 0 };
          }
        })
      );
      setWithPrices(arr);
    }
    if (portfolio.length) enrich();
    else setWithPrices([]);
  }, [portfolio]);

  const totalValue = withPrices.reduce((s, i) => s + (i.value || 0), 0);
  const totalCost = withPrices.reduce((s, i) => s + ((i.buyPrice || 0) * (i.amount || 0)), 0);
  const totalPL = totalValue - totalCost;
  const totalPLPct = totalCost ? (totalPL / totalCost) * 100 : 0;

  return (
    <section className="card">
      <h2>Portfolio</h2>

      <div style={{ marginBottom: 12 }}>
        <strong>Total Value:</strong> ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        <span style={{ marginLeft: 12, color: totalPL >= 0 ? "lime" : "#ff6b6b" }}>
          {totalPL >= 0 ? "▲" : "▼"} ${totalPL.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({totalPLPct.toFixed(2)}%)
        </span>
      </div>

      <div className="portfolio-grid">
        {withPrices.map((p) => (
          <div className="card" key={p.id} style={{ padding: 12 }}>
            <h3 style={{ margin: 0 }}>{p.name} ({p.symbol})</h3>
            <p style={{ margin: "6px 0" }}>
              Amount: {p.amount} • Price: ${p.currentPrice?.toLocaleString()}
            </p>
            <p style={{ margin: "6px 0" }}>
              Value: ${p.value?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <p style={{ margin: "6px 0", color: p.pl >= 0 ? "lime" : "#ff6b6b" }}>
              P/L: ${p.pl?.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({p.plPct?.toFixed(2)}%)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
