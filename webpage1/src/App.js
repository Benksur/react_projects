import React, { useState } from "react";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Farm from "./pages/Farm";
import Collection from "./pages/Collection";
import { PowerupsProvider } from "./contexts/PowerupsContext";

function App() {
  const [coinCount, setCoinCount] = useState(0);

  const incrementCount = () => {
    setCoinCount(coinCount + 5);
  };

  const subtractCount = (amount) => {
    setCoinCount(coinCount - amount);
  };

  return (
    <PowerupsProvider>
      <div className="container">
        <SideBar />
        <NavBar coins={coinCount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={
              <Shop subtractCount={subtractCount} coinCount={coinCount} />
            }
          />
          <Route
            path="/farm"
            element={<Farm incrementCount={incrementCount} />}
          />
          <Route path="/collection" element={<Collection />} />
        </Routes>
        <Footer />
      </div>
    </PowerupsProvider>
  );
}

export default App;
