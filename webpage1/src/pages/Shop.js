import React, { useState } from "react";
import "../css/Shop.css";
import ShopTile from "../components/ShopTile";
import powerups from "../assets/powerups.json";
import { usePowerups } from "../contexts/PowerupsContext";

function Shop({ subtractCount, coinCount }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPowerup, setSelectedPowerup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { addPowerupToCollection, powerupsCollection } = usePowerups();

  const deathSound = new Audio("../sounds/death.mp3");
  const powerupSound = new Audio("../sounds/powerup.mp3");
  powerupSound.volume = 0.2;
  deathSound.volume = 0.2;
  deathSound.currentTime = 0.7;

  const openDialog = (powerup) => {
    setSelectedPowerup(powerup);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    if (!selectedPowerup) return;

    const isPowerupInCollection = powerupsCollection.some(
      (item) => item.id === selectedPowerup.id
    );

    if (isPowerupInCollection || coinCount < selectedPowerup.price) {
      closeDialog();
      deathSound.play();
      setTimeout(() => deathSound.pause(), 700);
      return;
    }

    subtractCount(selectedPowerup.price);
    powerupSound.play();
    addPowerupToCollection(selectedPowerup);
    closeDialog();
  };

  const filteredPowerups = powerups.filter((powerup) =>
    powerup.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className="shop-content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for powerups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="shop-tiles">{filteredPowerups.map((powerup) => (
        <ShopTile key={powerup.id} powerup={powerup} onTileClick={openDialog} />
      ))}</div>
      

      {dialogOpen && selectedPowerup && (
        <dialog className="nes-dialog" open>
          <form method="dialog">
            <p className="title">{selectedPowerup.title}</p>
            <p>
              Price: <i className="nes-icon coin is-small"></i>{" "}
              {`${selectedPowerup.price}`}
            </p>
            <menu className="dialog-menu">
              <button className="nes-btn" onClick={closeDialog}>
                Cancel
              </button>
              <button className="nes-btn is-primary" onClick={handleConfirm}>
                Confirm
              </button>
            </menu>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default Shop;
