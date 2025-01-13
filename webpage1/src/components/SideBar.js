import React from "react";
import "../css/SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <p className="sidebar-brand">powerup.plaza</p>
      <div className="sidebar-link-container">
        <a
          href="https://maps.app.goo.gl/TkHetwQBhfbmLJZm8"
          className="sidebar-link"
          target="_blank"
          rel="noreferrer"
        >
          スーパー・ニンテンドー・ワールド/ View on Maps
        </a>
        <p className="sidebar-text">
          2 Chome-1-33 Sakurajima, Konohana Ward, Osaka, 554-0031, Japan
        </p>
      </div>
    </div>
  );
}

export default SideBar;
