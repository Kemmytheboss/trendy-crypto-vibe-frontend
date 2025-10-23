import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} CryptoVibe. All rights reserved.</p>
      
      <div className="social-links">
        <a href="https://twitter.com/CryptoVibe" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://facebook.com/CryptoVibe" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com/CryptoVibe" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://linkedin.com/company/CryptoVibe" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.reddit.com/r/cryptocurrency/" target="_blank" rel="noopener noreferrer">👽 Reddit</a>
        <a href="https://t.me/cryptochat" target="_blank" rel="noopener noreferrer">💬 Telegram</a>
      </div>
    </footer>
  );
}

export default Footer;
