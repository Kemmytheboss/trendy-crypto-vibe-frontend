import React, { useEffect, useState } from "react";

function SocialFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://www.reddit.com/r/cryptocurrency/top.json?limit=5")
      .then(res => res.json())
      .then(data => setPosts(data.data.children))
      .catch(err => console.error("Error fetching Reddit posts:", err));
  }, []);

  return (
    <div className="social-feed">
      <h3>Top Crypto Reddit Posts 📈</h3>
      <ul>
        {posts.map(post => (
          <li key={post.data.id}>
            <a href={`https://reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
              {post.data.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialFeed;
