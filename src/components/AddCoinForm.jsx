import React, { useState } from "react";

/**
 * Controlled form to add a manual portfolio item (POST to /portfolio)
 * After POST, calls addPortfolioItem to update App state
 */

function AddCoinForm({ addPortfolioItem }) {
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    amount: "",
    buyPrice: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: form.name || form.symbol,
      symbol: form.symbol.toUpperCase(),
      amount: parseFloat(form.amount),
      buyPrice: parseFloat(form.buyPrice),
      currentPrice: parseFloat(form.buyPrice) || 0,
      trend: "Added"
    };

    try {
      const res = await fetch("http://localhost:8001/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (addPortfolioItem) addPortfolioItem(data);
      setForm({ name: "", symbol: "", amount: "", buyPrice: "" });
      alert("Portfolio item added.");
    } catch (err) {
      console.error("Add coin error:", err);
      alert("Could not add coin. Check json-server.");
    }
  }

  return (
    <section className="card" style={{ maxWidth: 640, margin: "16px auto" }}>
      <h3>Add to Portfolio (manual)</h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name (e.g. Bitcoin)" />
        <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="Symbol (e.g. BTC)" required />
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount (e.g. 0.25)" required />
        <input name="buyPrice" value={form.buyPrice} onChange={handleChange} placeholder="Buy price (USD)" required />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn primary" type="submit">Add</button>
        </div>
      </form>
    </section>
  );
}

export default AddCoinForm;
