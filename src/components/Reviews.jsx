import React from 'react';

const REVIEWS = [
  {
    stars: 5,
    quote: "Getting my license through DLA was incredibly fast. I was bidding at Manheim in less than 40 days!",
    name: "Marcus T.",
    location: "Atlanta, GA"
  },
  {
    stars: 5,
    quote: "Their office setup option and handling of the state inspection saved me weeks of headache.",
    name: "Darnell W.",
    location: "Dallas, TX"
  },
  {
    stars: 5,
    quote: "I can now buy salvage and clean title cars directly from my phone. A complete game changer.",
    name: "Jerome K.",
    location: "Miami, FL"
  },
  {
    stars: 5,
    quote: "The pre-license seminar and background checks were scheduled and handled for me. Very professional.",
    name: "Tiffany R.",
    location: "Los Angeles, CA"
  },
  {
    stars: 5,
    quote: "Unbelievable service. I was skeptical about the 30-45 day timeline but they delivered exactly as promised.",
    name: "Carlos M.",
    location: "Chicago, IL"
  },
  {
    stars: 5,
    quote: "Best investment I've made for my dealership. Their ongoing support makes compliance totally stress-free.",
    name: "Brenda L.",
    location: "New York, NY"
  }
];

export default function Reviews() {
  // We duplicate the list to make a seamless infinite loop scrolling marquee
  const doubleReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews">
      <div className="mxw" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <span className="s-label">Real Customers</span>
        <h2 className="s-title" style={{ textAlign: 'center' }}>What Our Dealers Say</h2>
        <p className="s-desc" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '560px' }}>
          Thousands of dealers licensed. Here's what a few of them had to say.
        </p>
      </div>

      <div className="tcarousel-wrap" aria-label="Customer testimonials">
        <div className="tcarousel tcarousel--left">
          <div className="tcarousel-track">
            {doubleReviews.map((rev, idx) => (
              <blockquote key={idx} className={`tcard ${idx % 2 === 1 ? 'tcard--accent' : ''}`}>
                <div className="tcard-quote-mark">“</div>
                <div className="tcard-stars">
                  {Array.from({ length: rev.stars }).map((_, i) => '★').join('')}
                </div>
                <p className="tcard-quote">"{rev.quote}"</p>
                <div className="tcard-divider"></div>
                <footer className="tcard-author">
                  <span className="tcard-name">{rev.name}</span>
                  <span className="tcard-detail">{rev.location}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
