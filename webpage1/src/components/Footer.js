import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p>Created by Ty Behnke</p>
      <p2>
        This website is a non-commercial proof of concept created for
        educational and experimental purposes. It is not intended for profit,
        and no revenue is generated through the use of this site. All images,
        characters, and assets used are the property of their respective owners,
        and no copyright infringement is intended. The use of these assets is
        purely for demonstration and is not associated with any official
        products or franchises. I do not claim ownership of any assets and have
        no commercial intentions with this project. If any content or asset is
        found to violate copyright or intellectual property rights, please
        contact me, and I will promptly address the matter. The layout of this
        site is heavily inspired by the NES.css framework and utrecht.jp.
      </p2>
      <div className="footer-icons">
        <a
          href="https://github.com/Benksur"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="nes-icon github is-large"></i>
        </a>
        <a
          href="mailto:tyjbehnke@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="nes-icon gmail is-large"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/ty-behnke-b197ab207/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="nes-icon linkedin is-large"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
