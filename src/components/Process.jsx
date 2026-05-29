import React from 'react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Reach Out to Us',
      desc: 'Contact our team directly. Tell us your goals — no forms, no runaround.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.58 4.47 2 2 0 0 1 3.55 2.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.25z" />
        </svg>
      )
    },
    {
      num: '02',
      title: 'We Set Up Your Business',
      desc: 'We form your Corp or LLC, secure your FEIN, and prepare every document needed.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      num: '03',
      title: 'We Handle All Requirements',
      desc: 'Background check, pre-license seminar, insurance — we coordinate it all. You just show up.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      num: '04',
      title: 'License Application Filed',
      desc: 'We submit your complete application to the Board of Used Car Dealers — everything included.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )
    },
    {
      num: '05',
      title: 'Your License Is Approved',
      desc: 'In as little as 21–30 days, your dealer license is active under your own business name.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    },
    {
      num: '06',
      title: 'Access Auctions & Start Selling',
      desc: 'Bid in person or remotely from your phone — USA, Mexico, Canada, and Europe.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      )
    }
  ];

  return (
    <section id="how">
      <div className="mxw">
        <div className="how-top">
          <div>
            <span className="s-label">The Process</span>
            <h2 className="s-title">
              Simple Steps.
              <br />
              We Do the Heavy Lifting.
            </h2>
          </div>
          <p className="s-desc">
            You contact us — we handle everything else. No complicated steps, no red tape. Built for speed and results.
          </p>
        </div>

        <div className="how-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="how-card reveal">
              <div className="how-n">{step.num}</div>
              <div className="how-ico">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
