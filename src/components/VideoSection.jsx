import React, { useState } from 'react';
import coverImg from '../assets/coverimage.webp';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section id="video-sec">
      <div className="vid-wrap">
        <div>
          <span className="s-label">See It In Action</span>
          <h2 className="s-title">Everything You Need to Know — Is here</h2>
          <div className="bar"></div>
          <p className="s-desc">
            Watch how we take clients from first inquiry to fully licensed dealer license — handling every step so you don't have to.
          </p>
          <br /><br />
          <a href="#start" className="btn-g">
            Start Your Inquiry{' '}
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div className="vid-box" id="vidBox">
          {!isPlaying ? (
            <div 
              className="vid-overlay" 
              onClick={handlePlayClick}
              style={{
                backgroundImage: `linear-gradient(rgba(10, 22, 40, 0.72), rgba(10, 22, 40, 0.72)), url(${coverImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 60%'
              }}
            >
              <div className="play-ring">
                <svg width="26" height="26" fill="white" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p style={{ color: '#fff', fontWeight: '500', letterSpacing: '0.02em' }}>
                Click to Play — Dealer Licensing Overview
              </p>
            </div>
          ) : (
            <video 
              autoPlay 
              controls 
              playsInline 
              preload="auto"
              poster={coverImg}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
