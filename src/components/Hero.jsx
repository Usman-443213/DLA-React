import React, { useState, useEffect } from 'react';
import slide1 from '../assets/1.webp';
import slide2 from '../assets/2.webp';
import slide3 from '../assets/3.webp';
import slide4 from '../assets/4.webp';

const slides = [slide1, slide2, slide3, slide4];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Transition to next slide every 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  return (
    <section id="hero">
      {/* Background Slideshow */}
      <div className="hero-slides">
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero-slide slide-${idx + 1} ${currentSlide === idx ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          ></div>
        ))}
      </div>

      {/* Progress Bar - remounts key on slide change to restart CSS animation */}
      <div key={currentSlide} className="slide-progress"></div>

      {/* Grid overlay for tech aesthetic */}
      <div className="hero-grid"></div>

      {/* Hero content - restored original bottom-aligned layout */}
      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-pill">10+ Years in the Auto Industry</div>
          
          <h1 className="hero-h1">Get Your Own</h1>
          
          <div className="hero-subline">
            <em style={{ fontStyle: 'normal' }}>Auto Dealer License</em> in 30-45 Days.
          </div>
          
          <p className="hero-sub">
            Get fully licensed under your own business name, access dealer-only wholesale auctions, and start buying and selling vehicles — we handle everything from start to finish.
          </p>

          <div className="hero-bid-badges">
            <span className="hbb">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              Bid In-Person at Auction
            </span>
            <span className="hbb">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <circle cx="12" cy="17" r="1" fill="currentColor" />
              </svg>
              Or From Your Phone, Anywhere
            </span>
          </div>

          <div className="hero-btns">
            <a href="#start" className="btn-g">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Get Licensed Now
            </a>
            <a href="#video-sec" className="btn-o">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              Watch Overview
            </a>
          </div>

          <div className="hero-counters">
            <div className="ctr">
              <span className="ctr-n">30-45</span>
              <span className="ctr-l">Days to License</span>
            </div>
            <div className="ctr">
              <span className="ctr-n">10+</span>
              <span className="ctr-l">Years Experience</span>
            </div>
            <div className="ctr">
              <span className="ctr-n">4</span>
              <span className="ctr-l">Markets Unlocked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Slide Dots */}
      <div className="slide-dots">
        {slides.map((_, idx) => (
          <div 
            key={idx}
            className={`slide-dot ${currentSlide === idx ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
          ></div>
        ))}
      </div>
    </section>
  );
}
