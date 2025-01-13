import React from "react";
import ShopTile from "../components/ShopTile";
import { usePowerups } from "../contexts/PowerupsContext";
import "../css/Collection.css";

function Collection() {
  const { powerupsCollection, removePowerupFromCollection } = usePowerups();

  const starpowerSound = new Audio("../sounds/starpower.mp3");
  starpowerSound.volume = 0.3;

  const starPower = (powerup) => {
    starpowerSound.play();
    removePowerupFromCollection(powerup.id);
  };

  return (
    <div className="collection-container">
      <div className="powerup-list">
        {powerupsCollection.map((powerup) => (
          <ShopTile
            key={powerup.id}
            powerup={powerup}
            onTileClick={starPower}
          />
        ))}
      </div>
    </div>
  );
}

export default Collection;
