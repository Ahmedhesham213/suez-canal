import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo" onClick={closeMenu}>
        <img src="/images/keep it2.png" alt="logo" width="150" className="logo-image" style={{ opacity: 1 }} />
      </NavLink>

      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={isMenuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
      </div>

      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" end style={{ '--i': 1 }} onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/about" style={{ '--i': 2 }} onClick={closeMenu}>
          About
        </NavLink>
        <NavLink to="/travels" style={{ '--i': 3 }} onClick={closeMenu}>
          Today Travels
        </NavLink>
        <NavLink to="/weather" style={{ '--i': 4 }} onClick={closeMenu}>
          Weather
        </NavLink>
        <NavLink to="/login" onClick={closeMenu}>
          <button className="singn_in_btn">sign in</button>
        </NavLink>
      </nav>

      <div className="soial-media">
        <a 
          href="https://twitter.com/SuezAuthorityEG" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ '--i': 1 }}
        >
          <i className="bx bxl-twitter"></i>
        </a>
        <a 
          href="https://www.facebook.com/SuezCanalAuthorityEG/" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ '--i': 2 }}
        >
          <i className="bx bxl-facebook-circle"></i>
        </a>
        <a 
          href="https://www.instagram.com/suezcanalauthority/" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ '--i': 3 }}
        >
          <i className="bx bxl-instagram-alt"></i>
        </a>
      </div>
    </header>
  );
}
