TrendyCryptoVibe

TrendyCryptoVibe is a neon cyberpunk-inspired single page React application for crypto enthusiasts. It combines live market data, portfolio tracking, social buzz, and bite-sized learning resources in one visually appealing dashboard.

MVP Summary

As a user of TrendyCryptoVibe, I can:

View live market coins with real-time prices, 24h changes, and predictions.

Add coins to my portfolio manually or directly from the CoinList.

Track portfolio performance including total value, P/L, and profit/loss percentages.

Browse top posts from Reddit’s r/cryptocurrency and share them easily.

Learn crypto basics through concise cards in the Learn Hub.

Toggle between dark and light themes for a customized UI.

Navigate seamlessly across sections (Home, Coins, Portfolio, Learn, About) with a responsive navbar and footer.

Features

Live Dashboard: Shows trending coins with 7-day price charts.

Coin List: Searchable table of top USDT pairs from Binance with add-to-portfolio functionality.

Portfolio Management: Fetches current prices and calculates P/L dynamically.

Add Coin Form: Controlled form to manually add coins to portfolio.

Social Feed: Carousel of top Reddit posts with share buttons.

Learn Hub: Cards with quick crypto learning topics.

Responsive Layout: Works on desktop and mobile devices.

Dark/Light Theme Toggle: Switch between themes with a single click.

Tech Stack

Frontend: React, React Router, Recharts

Backend: json-server (for portfolio REST API)

Styling: CSS with neon cyberpunk theme (linear gradients, glassmorphism, shadows)

Data Sources: Binance API, Reddit API

Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/trendycryptovibe-frontend.git
git clone https://github.com/yourusername/trendycryptovibe-backend.git


Backend Setup (json-server):

cd trendycryptovibe-backend
npm install -g json-server
json-server --watch db.json --port 8001


Frontend Setup:

cd trendycryptovibe-frontend
npm install
npm start


App will run at http://localhost:3000.

Folder Structure
trendycryptovibe-frontend/
├─ public/
├─ src/
│  ├─ assets/           # Images, GIFs
│  ├─ components/       # React components (NavBar, Hero, Portfolio, etc.)
│  ├─ App.jsx
│  ├─ App.css
│  └─ index.js

trendycryptovibe-backend/
├─ db.json               # Initial portfolio data

Screenshots

You can include 2–3 screenshots of the app here to showcase UI.

Future Enhancements

Integration with more exchanges (CoinGecko, CoinMarketCap).

User authentication and multi-user portfolios.

Advanced charting with candlesticks and indicators.

Mobile-specific optimizations and hamburger menu.

Deploy backend to Render and frontend to Netlify for public access.

License

MIT License © [Verah Mokaya]