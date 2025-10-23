import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaRedditAlien, FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com/CryptoVibe" },
    { icon: <FaFacebook />, url: "https://facebook.com/CryptoVibe" },
    { icon: <FaInstagram />, url: "https://instagram.com/CryptoVibe" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/company/CryptoVibe" },
    { icon: <FaRedditAlien />, url: "https://www.reddit.com/r/cryptocurrency/" },
    { icon: <FaTelegramPlane />, url: "https://t.me/cryptochat" },
  ];

  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TrendyCryptoVibe. All rights reserved.</p>
      
      <div className="social-links">
        {socialLinks.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
