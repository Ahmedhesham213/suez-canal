import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Animated Waves */}
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://www.facebook.com/SuezCanalAuthorityEG/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://twitter.com/SuezAuthorityEG" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://www.instagram.com/suezcanalauthority/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>
      </ul>

      <ul className="menu">
        <li className="menu__item"><Link className="menu__link" to="/">Home</Link></li>
        <li className="menu__item"><Link className="menu__link" to="/about">About</Link></li>
        <li className="menu__item"><Link className="menu__link" to="/travels">Travels</Link></li>
        <li className="menu__item"><Link className="menu__link" to="/weather">Weather</Link></li>
        <li className="menu__item"><Link className="menu__link" to="/login">Login</Link></li>
      </ul>

      <p>&copy; 2026 MTIS | All Rights Reserved</p>
    </footer>
  );
}
