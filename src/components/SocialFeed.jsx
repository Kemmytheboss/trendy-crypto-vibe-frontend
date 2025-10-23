import React, { useEffect, useState } from "react";


function SocialFeed() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://www.reddit.com/r/cryptocurrency/top.json?limit=10")
      .then(res => res.json())
      .then(data => setPosts(data.data.children))
      .catch(err => console.error("Error fetching Reddit posts:", err));
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [posts]);

  if (!posts.length) return <p>Loading trending posts...</p>;

  const currentPost = posts[currentIndex].data;

  return (
    <div className="social-feed-carousel">
      <h3>Top Crypto Reddit Posts 📈</h3>
      <div className="carousel-card">
        <a href={`https://reddit.com${currentPost.permalink}`} target="_blank" rel="noopener noreferrer">
          {currentPost.title}
        </a>
        <p>Upvotes: {currentPost.ups} | Comments: {currentPost.num_comments}</p>
      </div>

      <div className="carousel-controls">
        <button onClick={() => setCurrentIndex((currentIndex - 1 + posts.length) % posts.length)}>◀</button>
        <button onClick={() => setCurrentIndex((currentIndex + 1) % posts.length)}>▶</button>
      </div>
    </div>
  );
}

export default SocialFeed;
