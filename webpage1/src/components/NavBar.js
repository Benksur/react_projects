import "../css/NavBar.css";
import { Link } from "react-router-dom";

function NavBar({ coins }) {
  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <Link to="/" className="link">
          Home / ホーム{" "}
        </Link>
        <Link to="/shop" className="link">
          Shop / ショップ{" "}
        </Link>
        <Link to="/farm" className="link">
          Farm / ファーム{" "}
        </Link>
      </div>
      <div className="player">
        <div className="coins">
          <span className="coin-count">{coins}x</span>
          <i className="nes-icon coin is-small"></i>
        </div>
        <Link to="/collection" className="nes-btn">
          Your Collection
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
