import React from 'react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        
        {/* Foot Branding Column */}
        <div className="foot-brand">
          <div className="logo-combo">
            <div className="logo-dla">DLA</div>
            <div className="logo-sep"></div>
            <div className="logo-img">
              <img src={logoImg} alt="Dealer Licensing Authority" style={{ height: '44px' }} />
            </div>
          </div>
          <p>
            We help entrepreneurs nationwide get fully licensed as independent auto dealers — handling every step so you can focus on growing your business.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="foot-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#how">The Process</a></li>
            <li><a href="#auctions">Auction Access</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#start">Get Started</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="foot-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+18773827860">📞 877-382-7860</a></li>
            <li><a href="#start">Submit an Inquiry</a></li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Block */}
      <div className="foot-bottom">
        <span>© 2025 <span>Dealer Licensing Authority</span>. All rights reserved.</span>
        <span>USA · Canada · Mexico · Europe</span>
      </div>
    </footer>
  );
}
