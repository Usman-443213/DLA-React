import React from 'react';

export default function Pricing() {
  const checkIcon = (
    <div className="pr-check">
      <svg width="9" height="9" fill="none" stroke="#C9A84C" strokeWidth="2.5" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );

  return (
    <section id="pricing">
      <div className="pricing-wrap">
        
        {/* Pricing Header */}
        <div className="pricing-header">
          <span className="s-label">Transparent Pricing</span>
          <h2 className="s-title" style={{ textAlign: 'center' }}>
            Simple. Flat-Rate. No Surprises.
          </h2>
          <p className="s-desc" style={{ textAlign: 'center', margin: '0 auto' }}>
            Everything you need to get fully licensed and operational — covered under our straightforward pricing. No hidden fees, no per-car charges.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards">
          
          {/* Card 1: One-Time Fee */}
          <div className="pr-card reveal">
            <span className="pr-type">One-Time Fee</span>
            <div className="pr-price">$4,000</div>
            <span className="pr-sub">Complete Business &amp; License Setup</span>
            <ul className="pr-list">
              <li>
                {checkIcon}
                Corp or LLC registration in your name
              </li>
              <li>
                {checkIcon}
                Full dealer license application &amp; filing
              </li>
              <li>
                {checkIcon}
                Background check &amp; seminar registration
              </li>
              <li>
                {checkIcon}
                Dealer plates &amp; auction credentials
              </li>
              <li>
                {checkIcon}
                Office setup furnishings as required
              </li>
            </ul>
          </div>

          {/* Card 2: Featured Monthly Fee */}
          <div className="pr-card featured reveal">
            <span className="pr-type">Monthly Fee</span>
            <div className="pr-badge">Ongoing</div>
            <div className="pr-price">$650</div>
            <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.5rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What's Included:</div>
            <ul className="pr-list">
              <li>
                {checkIcon}
                Client Office Space — your dedicated professional suite
              </li>
              <li>
                {checkIcon}
                Continuous project management
              </li>
              <li>
                {checkIcon}
                Access to our specialist team year-round
              </li>
              <li>
                {checkIcon}
                24/7 CCTV Monitoring
              </li>
              <li>
                {checkIcon}
                Employee Parking On-site
              </li>
              <li>
                {checkIcon}
                Free High-Speed WiFi
              </li>
            </ul>
          </div>

        </div>

        {/* Fine print note */}
        <p className="pr-note" style={{ fontWeight: 'bold', color: 'var(--gold)' }}>
          <strong>* Government fees, insurance premiums, and surety bond costs vary and are separate from the above service fees. Total one-time setup investment: $500.</strong>
        </p>

      </div>
    </section>
  );
}
