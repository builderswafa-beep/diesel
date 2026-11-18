import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';

const PHRASES = [
  'Diesel & Fuel Solutions',
  'EN590 Diesel Supply',
  'Bulk Fuel Delivery',
  'Industrial Gas Oil',
  'Marine Fuel Solutions',
];

export default function Hero({ onOpenQuote }) {
  const { pageSections } = useCms();
  const heroSec = pageSections?.['home.hero'];
  const bgImg = heroSec?.image_url || '/images/hero-terminal.jpg';

  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass('is-exiting');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length);
        setAnimClass('is-entering');
        setTimeout(() => {
          setAnimClass('');
        }, 50);
      }, 340);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-canvas">
        {/* Panoramic Fuel Terminal Background */}
        <img
          src={bgImg}
          alt="Dubai Diesel storage terminal and fuel delivery fleet"
          className="hero-bg-img"
        />

        {/* Sky Top Wash & Centered Soft Radial Halo */}
        <div className="hero-sky-wash" aria-hidden="true"></div>
        <div className="hero-center-halo" aria-hidden="true"></div>

        {/* Centered Content Stack */}
        <div className="hero-content container">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" aria-hidden="true"></span>
            <p>RELIABLE FUEL SUPPLY PARTNER IN THE UAE</p>
            <span className="eyebrow-line" aria-hidden="true"></span>
          </div>

          <h1 className="hero-title">
            {heroSec?.title && heroSec.title !== 'Supplying Quality Diesel & Fuel Solutions Across the UAE' ? (
              heroSec.title
            ) : (
              <>
                Supplying Quality{' '}
                <span className="hero-dynamic-wrap">
                  <span className={`text-red hero-dynamic-text ${animClass}`} id="hero-dynamic-text">
                    {PHRASES[index]}
                  </span>
                </span>
                <br className="break-sm" /> Across the UAE
              </>
            )}
          </h1>

          <p className="hero-subtitle">
            {heroSec?.subtitle || 'Dubai Diesel Trading LLC is a trusted supplier of diesel and fuel products, serving businesses across construction, logistics, manufacturing, and industrial sectors.'}
          </p>

          {/* 3 Trust Feature Items */}
          <div className="hero-features">
            <div className="feature-item">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon" aria-hidden="true">
                <path d="M5 24V6.5C5 5.12 6.12 4 7.5 4H15.5C16.88 4 18 5.12 18 6.5V24H5Z" fill="#D51F26" />
                <rect x="7.5" y="6.8" width="8" height="4.8" rx="0.8" fill="#ffffff" />
                <path d="M3.5 24H19.5" stroke="#D51F26" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M18 11H20.5C21.6 11 22.5 11.9 22.5 13V19.5C22.5 20.6 23.4 21.5 24.5 21.5C25.6 21.5 26.5 20.6 26.5 19.5V10.5L23.2 7" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24.5" cy="9" r="1.2" fill="#D51F26" />
              </svg>
              <div className="feature-text">
                <strong>Reliable</strong>
                <span>Supply</span>
              </div>
            </div>

            <span className="feature-divider" aria-hidden="true"></span>

            <div className="feature-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div className="feature-text">
                <strong>Quality</strong>
                <span>Assured</span>
              </div>
            </div>

            <span className="feature-divider" aria-hidden="true"></span>

            <div className="feature-item">
              <svg viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon feature-icon-wide" aria-hidden="true">
                <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" stroke="#D51F26" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" stroke="#D51F26" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 11.5L5.5 16.5L8.2 14.5" stroke="#D51F26" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M29.5 9.5L27 15.5L24 14" stroke="#D51F26" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="feature-text">
                <strong>Trusted</strong>
                <span>UAE Partner</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-ctas">
            <button
              type="button"
              className="btn-primary"
              onClick={() => onOpenQuote()}
            >
              <span>Get in Touch</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <Link to="/services" className="btn-primary">
              <span>Explore Our Services</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/projects" className="btn-secondary">
              View Our Projects
            </Link>
          </div>
        </div>

        {/* Bottom-Right Curved Red & Navy Ribbon Swoosh */}
        <svg viewBox="0 0 460 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-swoosh" aria-hidden="true">
          <path d="M40 90C165 78 295 36 460 0V20C325 46 185 82 78 90H40Z" fill="#D51F26" />
          <path d="M72 90C192 80 330 40 460 12V90H72Z" fill="#0A3475" />
        </svg>
      </div>

      {/* Centered Emblem Divider Strip */}
      <div className="hero-divider-strip">
        <div className="container divider-inner">
          <span className="divider-line"></span>
          <svg viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="divider-badge" aria-hidden="true">
            <path d="M2 3H21C24.866 3 28 6.13401 28 10V13H19V10C19 9.44772 18.5523 9 18 9H10V20H18C18.5523 20 19 19.5523 19 19V16H28V19C28 22.866 24.866 26 21 26H2V3Z" fill="#D51F26" />
            <path d="M20 9H41C44.866 9 48 12.134 48 16V24C48 27.866 44.866 31 41 31H20V22.5H28.5V25H38.5C39.3284 25 40 24.3284 40 23.5V16.5C40 15.6716 39.3284 15 38.5 15H28.5V17.5H20V9Z" fill="#0E3B78" />
            <circle cx="34" cy="20" r="2.5" fill="#ffffff" />
          </svg>
          <span className="divider-line"></span>
        </div>
      </div>
    </section>
  );
}
