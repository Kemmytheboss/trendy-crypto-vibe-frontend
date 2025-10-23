import React from "react";

/* Simple static learning hub*/
function LearnHub() {
  const cards = [
    { title: "What's DeFi?", body: "Decentralized Finance (DeFi) brings financial services to blockchain — lending, borrowing, swaps, and more." },
    { title: "Spot vs Margin", body: "Spot is buying/selling actual assets. Margin adds leverage including higher risk." },
    { title: "Reading a Chart", body: "Candlesticks show open-high-low-close. Volume shows market interest. Use risk management." },
  ];

  return (
    <section className="card">
      <h2>Learn Hub</h2>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        {cards.map((c, i) => (
          <div key={i} style={{ padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)" }}>
            <h4 style={{ marginTop: 0 }}>{c.title}</h4>
            <p style={{ margin: 0, color: "#cbd6ff" }}>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LearnHub;
