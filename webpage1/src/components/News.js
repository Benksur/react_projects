import React from "react";
import "../css/News.css";
import news from "../assets/newsarticle.json";

function News() {
  return (
    <div className="news">
      <div className="news-text">
        <h1>{news.headline}</h1>
        <p>
          {news.text.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <div className="news-img">
        <img src={news.src} alt={news.headline} />
      </div>
    </div>
  );
}

export default News;
