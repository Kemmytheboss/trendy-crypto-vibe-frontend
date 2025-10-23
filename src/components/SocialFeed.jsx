import React, { useEffect, useState } from "react";

function SocialFeed() {
  const [posts, setPosts] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    fetch("https://www.reddit.com/r/cryptocurrency/top.json?limit=8")
      .then(r => r.json())
      .then(data => setPosts(data.data.children || []))
      .catch(err => console.error("Reddit error", err));
  }, []);

  useEffect(() => {
    if (!posts.length) return;
    const t = setInterval(() => setIdx(i => (i + 1) % posts.length), 5000);
    return () => clearInterval(t);
  }, [posts.length]);

  if (!posts.length) return <p className="loading">Loading social buzz...</p>;

  const post = posts[idx].data;
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noreferrer">{post.title}</a>
        <div style={{ color: "#9aa0ff", fontSize: 13 }}>▲ {post.ups} • 💬 {post.num_comments}</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => setIdx((idx - 1 + posts.length) % posts.length)}>◀</button>
        <button className="btn" onClick={() => setIdx((idx + 1) % posts.length)}>▶</button>
        <button className="btn primary" onClick={() => {
          const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent("https://reddit.com" + post.permalink)}`;
          window.open(url, "_blank");
        }}>Share</button>
      </div>
    </div>
  );
}

export default SocialFeed;
