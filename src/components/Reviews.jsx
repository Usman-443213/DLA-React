import React from 'react';

const REVIEWS = [
  {
    stars: 5,
    quote: "Getting my license through DLA was incredibly fast. I was bidding at Manheim in less than 40 days!",
    name: "Michael T.",
    location: "Atlanta, GA",
    duration: 4,
    delay: 0
  },
  {
    stars: 5,
    quote: "Their office setup option and handling of the state inspection saved me weeks of headache.",
    name: "Sarah L.",
    location: "Dallas, TX",
    duration: 4.5,
    delay: 0.5
  },
  {
    stars: 5,
    quote: "I can now buy salvage and clean title cars directly from my phone. A complete game changer.",
    name: "David K.",
    location: "Miami, FL",
    duration: 3.8,
    delay: 0.2
  },
  {
    stars: 5,
    quote: "The pre-license seminar and background checks were scheduled and handled for me. Very professional.",
    name: "James R.",
    location: "Los Angeles, CA",
    duration: 4.2,
    delay: 0.7
  },
  {
    stars: 5,
    quote: "Unbelievable service. I was skeptical about the 30-45 day timeline but they delivered exactly as promised.",
    name: "Robert H.",
    location: "Chicago, IL",
    duration: 4.6,
    delay: 0.3
  },
  {
    stars: 5,
    quote: "Best investment I've made for my dealership. Their ongoing support makes compliance totally stress-free.",
    name: "Elena M.",
    location: "New York, NY",
    duration: 3.9,
    delay: 0.9
  }
];

export default function Reviews() {
  return (
    <section id="reviews">
      <div className="mxw">
        <div className="reviews-top">
          <div>
            <span className="s-label">Testimonials</span>
            <h2 className="s-title">
              What Our Licensed
              <br />
              Dealers Say.
            </h2>
          </div>
          <p className="s-desc">
            Read success stories from dealer entrepreneurs nationwide who got licensed and active in wholesale auctions through our flat-rate services.
          </p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((rev, idx) => (
            <div 
              key={idx} 
              className="review-card-wrapper reveal"
              style={{
                animation: `float ${rev.duration}s ease-in-out ${rev.delay}s infinite alternate`
              }}
            >
              <div className="review-card">
                <div className="stars">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <svg key={i} className="star-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="review-quote">"{rev.quote}"</p>
                <div className="review-divider"></div>
                <div className="review-author">
                  <span className="author-name">{rev.name}</span>
                  <span className="author-location">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
