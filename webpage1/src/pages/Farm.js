import React, { useState } from "react";
import "../css/Farm.css";

function Farm({ incrementCount }) {
  const [coinVisible, setCoinVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const clickSound = new Audio("../sounds/coin.mp3");
  clickSound.volume = 0.2;
  clickSound.currentTime = 0.2;

  
  const handleQuestionClick = () => {
    
    setIsClicked(true);
    setCoinVisible(true); 
    incrementCount();

    clickSound.play();

    setTimeout(() => setCoinVisible(false), 150);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <div className="farm-container">
      <div className="coin-container">
        <i
          className={`nes-icon coin is-medium ${coinVisible ? "visible" : ""}`}
        ></i>
      </div>
      <div className={`block-container`}>
        <img
          src="../images/question.jpg"
          alt="question"
          className={`question-block ${isClicked ? "clicked" : ""}`}
          onClick={handleQuestionClick}
        />
      </div>
    </div>
  );
}

export default Farm;
