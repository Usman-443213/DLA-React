import React, { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <nav ref={navRef}>
      <div className="logo-combo">
        <div className="logo-dla">DLA</div>
        <div className="logo-sep"></div>
        <div className="logo-img">
          <img src={logoImg} alt="Dealer Licensing Authority" />
        </div>
      </div>
      
      <button 
        className={`ham-btn ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu} 
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
        <li>
          <a href="#video-sec" onClick={closeMenu}>See It In Action</a>
        </li>
        <li>
          <a href="#how" onClick={closeMenu}>The Process</a>
        </li>
        <li>
          <a href="#auctions" onClick={closeMenu}>Auction Access</a>
        </li>
        <li>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
        </li>
        <li>
          <a href="#start" className="nav-btn" onClick={closeMenu}>Get Started</a>
        </li>
      </ul>
    </nav>
  );
}
