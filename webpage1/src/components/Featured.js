import React, { useState } from "react";
import "../css/Featured.css";

function Featured({ powerup }) {
  const [imageSrc, setImageSrc] = useState(1);

  const handleHover = () => {
    setImageSrc(2); 
  };

  const handleMouseLeave = () => {
    setImageSrc(1); 
  };

  return (
    <div className="featured">
      <div
        className="featured-img"
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <img src={`${powerup.src}${imageSrc}.jpg`} alt={powerup.title} />
      </div>
      <div className="featured-text">
        <h1>{powerup.title}</h1>
        <p>{powerup.description}</p>
      </div>
    </div>
  );
}

export default Featured;
