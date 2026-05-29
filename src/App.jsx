import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import Process from './components/Process';
import Auctions from './components/Auctions';
import Pricing from './components/Pricing';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';

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
      <VideoSection />
      <Process />
      <Auctions />
      <Pricing />
      <GetStarted />
      <Footer />
    </>
  );
}
