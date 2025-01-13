import React from "react";
import Featured from "../components/Featured";
import News from "../components/News";
import Welcome from "../components/Welcome";
import "../css/Home.css";
import powerups from "../assets/powerups.json";

function Home() {
  const featuredPowerups = powerups.filter(
    (powerup) => powerup.id === 3 || powerup.id === 5
  );

  return (
    <div className="main-content">
      <Welcome />
      <p1>Featured / おすすめ</p1>
      {featuredPowerups.map((powerup) => (
        <Featured key={powerup.id} powerup={powerup} />
      ))}
      <p1>News / お知らせ</p1>
      <News />
    </div>
  );
}

export default Home;
