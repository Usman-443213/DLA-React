import React, { useState } from 'react';

const SHEET_URL = "https://script.google.com/macros/s/AKfycbyJMHZ-XfDZiIU8qsph9XIqXsT0ZiHYb79e-vVUWhFOkTHfR2oaDVYsvfvYuwk6uiPZ/exec";

export default function GetStarted() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    timeline: '',
    message: ''
  });

  // Submission states: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      setStatus('success');
      // Reset inputs
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        timeline: '',
        message: ''
      });
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus('error');
    }
  };

  // Icon definitions for checklist and buttons
  const checkIcon = (
    <svg width="10" height="10" fill="none" stroke="#C9A84C" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const checklistItems = [
    "Background check at an approved GAPS site — we register & coordinate",
    "Board of Used Car Dealers license application — fully prepared & submitted",
    "Department of Revenue dealer plates — handled on your behalf",
    "Bid in person or remotely via smartphone — from anywhere",
    "Handle ALL unannounced inspections in relation to your office, license, or records — we manage it from start to finish",
    "Compliant office setup — fully equipped with desk, chair, and landline phone necessary to pass your license inspection",
    "Dealer license + 3 dealer plates — legally operate unregistered vehicles on public roads for business and demonstration purposes"
  ];

  // Button rendering based on submission status
  const renderSubmitButton = () => {
    switch (status) {
      case 'sending':
        return (
          <button type="submit" className="submit-btn" disabled>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeDashoffset="10">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
              </circle>
            </svg>
            Sending...
          </button>
        );
      case 'success':
        return (
          <button type="button" className="submit-btn" style={{ background: '#2a7a4b', color: '#fff' }} disabled>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Submitted! We'll be in touch shortly.
          </button>
        );
      case 'error':
        return (
          <button 
            type="submit" 
            className="submit-btn" 
            style={{ background: '#9b2c2c', color: '#fff' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Error — please try again
          </button>
        );
      case 'idle':
      default:
        return (
          <button type="submit" className="submit-btn">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Submit — Get Me Licensed
          </button>
        );
    }
  };

  return (
    <section id="start">
      <div className="start-wrap">
        
        {/* Left Side: Checklist */}
        <div>
          <span className="s-label">Get Started</span>
          <h2 className="s-title">Are You Ready to Get<br />Your Dealer License?</h2>
          <div className="bar"></div>
          <p className="s-desc">
            With over 10 years in the auto industry, we've helped clients nationwide get fully licensed and start buying at auction. Here's everything included:
          </p>
          <ul className="chk-list">
            {checklistItems.map((item, idx) => (
              <li key={idx}>
                <div className="chk-dot">{checkIcon}</div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Form */}
        <div className="form-box">
          <h3>Let's Get You Licensed.</h3>
          <p className="fb-sub">Fill out the form below — a specialist will reach out to you directly.</p>
          
          <form id="leadForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="John" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required 
                  disabled={status === 'sending' || status === 'success'}
                />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Smith" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required 
                  disabled={status === 'sending' || status === 'success'}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="(000) 000-0000" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                  disabled={status === 'sending' || status === 'success'}
                />
              </div>
              <div className="form-field">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="you@email.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  disabled={status === 'sending' || status === 'success'}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field full">
                <label>How soon are you looking to get your dealer license?</label>
                <select 
                  name="timeline" 
                  value={formData.timeline}
                  onChange={handleInputChange}
                  required
                  disabled={status === 'sending' || status === 'success'}
                >
                  <option value="" disabled>Select a timeframe...</option>
                  <option value="30">Within 30 days</option>
                  <option value="60">Within 60 days</option>
                  <option value="90">Within 90 days</option>
                  <option value="exploring">Just exploring options</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field full">
                <label>Message (Optional)</label>
                <textarea 
                  name="message" 
                  placeholder="Tell us a bit about your goals..."
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={status === 'sending' || status === 'success'}
                ></textarea>
              </div>
            </div>

            {renderSubmitButton()}
          </form>

          {/* Direct call strip */}
          <a href="tel:+18773827860" className="phone-strip">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.58 4.47 2 2 0 0 1 3.55 2.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.25z" />
            </svg>
            <div>
              <span className="phone-lbl">Prefer to Call?</span>
              <span className="phone-num">877-382-7860</span>
            </div>
          </a>

          <p className="form-note">No obligations. Free consultation. Licensed in as little as 30 days.</p>
        </div>

      </div>
    </section>
  );
}
