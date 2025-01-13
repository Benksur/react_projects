import React, { useState } from "react";
import "../css/ShopTile.css";

function ShopTile({ powerup, onTileClick }) {
  const [imageSrc, setImageSrc] = useState(1);

  const handleHover = () => {
    setImageSrc(2); 
  };

  const handleMouseLeave = () => {
    setImageSrc(1); 
  };
  return (
    <div className="shop-tile" onClick={() => onTileClick(powerup)}>
      <img
        className="shop-tile-image"
        src={`${powerup.src}${imageSrc}.jpg`}
        alt={powerup.title}
        onMouseEnter={handleHover} 
        onMouseLeave={handleMouseLeave}
      />
      <div className="shop-tile-info">
        <h1 className="shop-tile-title">{powerup.title}</h1>
        <div className="shop-tile-price">
          <i className="nes-icon coin is-small"></i>
          <span>{powerup.price}</span>
        </div>
      </div>
    </div>
  );
}

export default ShopTile;
