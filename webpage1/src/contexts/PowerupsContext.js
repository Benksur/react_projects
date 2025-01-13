import React, { createContext, useContext, useState } from "react";

const PowerupsContext = createContext();

export const PowerupsProvider = ({ children }) => {
  const [powerupsCollection, setPowerupsCollection] = useState([]);

  const addPowerupToCollection = (powerup) => {
    setPowerupsCollection((prevCollection) => [...prevCollection, powerup]);
  };

  const removePowerupFromCollection = (powerupId) => {
    setPowerupsCollection((prevCollection) =>
      prevCollection.filter((powerup) => powerup.id !== powerupId)
    );
  };

  return (
    <PowerupsContext.Provider
      value={{
        powerupsCollection,
        addPowerupToCollection,
        removePowerupFromCollection,
      }}
    >
      {children}
    </PowerupsContext.Provider>
  );
};

export const usePowerups = () => useContext(PowerupsContext);
