import React, { useState } from "react";

function AddCoinForm({ addCoin }) {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    price: "",
    trend: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8001/coins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newCoin) => {
        addCoin(newCoin);
        setFormData({ name: "", symbol: "", price: "", trend: "" });
      });
  }

  return (
    <div className="add-form">
      <h2>Add a New Coin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Coin Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="symbol"
          placeholder="Symbol"
          value={formData.symbol}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="trend"
          placeholder="Trend Emoji (🔥🚀⬆️)"
          value={formData.trend}
          onChange={handleChange}
        />
        <button type="submit">Add Coin</button>
      </form>
    </div>
  );
}

export default AddCoinForm;
