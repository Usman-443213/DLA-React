import React, { useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Process from './components/Process';
import Reviews from './components/Reviews';
import Pricing from './components/Pricing';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';

// Lazy load heavy components for performance optimization
const VideoSection = lazy(() => import('./components/VideoSection'));
const Auctions = lazy(() => import('./components/Auctions'));

export default function App() {
  // Centralized Scroll Reveal Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Replicate original jQuery/DOM scroll spy animation triggers
    const selectors = '.reveal, .how-card, .p-tile, .pr-card, .chk-list li';
    const elements = document.querySelectorAll(selectors);
    
    elements.forEach((el) => {
      el.classList.add('reveal'); // Guarantee reveal class is present
      observer.observe(el);
    });

    // Cleanup observer on unmount
    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="loading-fallback">Loading overview video...</div>}>
        <VideoSection />
      </Suspense>
      <Process />
      <Suspense fallback={<div className="loading-fallback">Loading interactive globe...</div>}>
        <Auctions />
      </Suspense>
      <Reviews />
      <Pricing />
      <GetStarted />
      <Footer />
    </>
  );
}
