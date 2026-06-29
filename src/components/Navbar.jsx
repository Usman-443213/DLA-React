import React, { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
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

  // Scroll spy tracking for active links
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'how', 'auctions', 'pricing', 'start'];
      const scrollPos = window.scrollY + 120; // Offset for detection

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <a 
            href="#hero" 
            className={activeSection === 'hero' ? 'active' : ''} 
            onClick={closeMenu}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#how" 
            className={activeSection === 'how' ? 'active' : ''} 
            onClick={closeMenu}
          >
            Process
          </a>
        </li>
        <li>
          <a 
            href="#auctions" 
            className={activeSection === 'auctions' ? 'active' : ''} 
            onClick={closeMenu}
          >
            Auctions
          </a>
        </li>
        <li>
          <a 
            href="#pricing" 
            className={activeSection === 'pricing' ? 'active' : ''} 
            onClick={closeMenu}
          >
            Pricing
          </a>
        </li>
        <li>
          <a 
            href="#start" 
            className={`nav-btn ${activeSection === 'start' ? 'active' : ''}`} 
            onClick={closeMenu}
          >
            Get Started
          </a>
        </li>
      </ul>
    </nav>
  );
}
