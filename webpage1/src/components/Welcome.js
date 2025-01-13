import React from "react";
import "../css/Welcome.css";

function Welcome() {
  return (
    <div>
      <div class="nes-container with-title is-centered">
        <p class="title">Welcome to powerup.plaza!</p>
        <p>
          Your one-stop shop for all the power-ups you need to take your
          adventures to the next level! Whether you're looking for a trusty Fire
          Flower to roast some Goombas or a P-Wing to soar through the skies,
          we’ve got it all. Browse our collection, power up your game, and get
          ready to conquer whatever challenges lie ahead.
        </p>
      </div>
      <p> </p>
      <div class="nes-container with-title is-centered">
        <p class="title">New here?</p>
        <p>
          No problem—we’ll help you get started.Simply click the brick on the
          Farm Page to collect coins. Once you've gathered enough, head to the
          Store and spend your hard-earned coins on powerful upgrades! Happy
          farming!
        </p>
      </div>
      <p> </p>
      <p> </p>
    </div>
  );
}

export default Welcome;
