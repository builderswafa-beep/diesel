import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';

export default function AboutSection() {
  const { pageSections } = useCms();
  const aboutSec = pageSections?.['home.about'];
  const insetSec = pageSections?.['home.about_inset'];
  const mainImg = aboutSec?.image_url || '/images/about-terminal.jpg';
  const insetImg = insetSec?.image_url || aboutSec?.content?.image_inset || '/images/about-tanker.jpg';
  const isAllInOneGraphic = mainImg.includes('home-page-secound-sec') || aboutSec?.content?.banner_mode === 'graphic' || aboutSec?.content?.display_mode === 'single' || insetSec?.status === 'hidden';

  return (
    <section id="about" className="about-section">
      {/* SVG Clip Paths for Slanted Rounded Photo Collage */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="about-main-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.05 0 L 0.94 0 Q 1.00 0 0.99 0.06 L 0.86 0.94 Q 0.85 1.00 0.79 1.00 L 0.05 1.00 Q 0 1.00 0 0.94 L 0 0.06 Q 0 0 0.05 0 Z" />
          </clipPath>
          <clipPath id="about-inset-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.13 0 L 0.95 0 Q 1.00 0 0.99 0.09 L 0.90 0.91 Q 0.89 1.00 0.84 1.00 L 0.05 1.00 Q 0.00 1.00 0.01 0.91 L 0.10 0.09 Q 0.11 0 0.13 0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Subtle Dubai Skyline Watermark Bottom-Right */}
      <svg viewBox="0 0 520 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="about-skyline-watermark" aria-hidden="true">
        <path d="M0 180V145H18V122H34V145H46V110H64V145H78V98H86V86H94V98H102V145H118V116H136V145H150V104H172V145H188V124H206V145H222V92H242V145H258V118H278V145H296V88H314V145H330V110H346V145H364V128H382V145H398V78L406 64L414 78V145H428V112H442V145H454V92L460 72L464 38L467 8L470 38L474 72L480 92V145H494V116H510V145H520V180H0Z" fill="#0A2246" />
      </svg>

      <div className="container about-grid">
        {/* Left Dual Slanted Photo Collage */}
        <div className="about-visual">
          <div className="about-collage">
            {isAllInOneGraphic ? (
              <div className="about-main-shadow" style={{ width: '100%', height: '100%' }}>
                <div className="about-main-frame" style={{ width: '100%', height: '100%', clipPath: 'none', borderRadius: '16px', background: 'transparent' }}>
                  <img
                    src={mainImg}
                    alt="Dubai Diesel Company Overview"
                    className="about-main-img"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>
            ) : (
              <>
                {/* Red Top-Left Curved Bracket */}
                <svg viewBox="0 0 210 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="about-red-bracket" aria-hidden="true">
                  <path d="M18 190L0 212V48C0 21.4903 21.4903 0 48 0H206L190 22H52C33.2223 22 18 37.2223 18 56V190Z" fill="#D51F26" />
                </svg>

                {/* Main Storage Tank Photo */}
                <div className="about-main-shadow">
                  <div className="about-main-frame">
                    <img
                      src={mainImg}
                      alt="Dubai Diesel bulk fuel storage tanks at terminal"
                      className="about-main-img"
                    />
                  </div>
                </div>

                {/* Overlapping Lower-Right Tanker Photo */}
                <div className="about-inset-shadow">
                  <div className="about-inset-border">
                    <img
                      src={insetImg}
                      alt="Dubai Diesel fuel tanker truck at loading gantry"
                      className="about-inset-img"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Narrative & 4 Feature Pillars */}
        <div className="about-content">
          <div className="section-eyebrow">
            <span className="eyebrow-short-red" aria-hidden="true"></span>
            <span>About Dubai Diesel</span>
          </div>

          <h2 className="about-title">
            {aboutSec?.title ? (
              aboutSec.title.includes('&') ? (
                <>
                  {aboutSec.title.split('&')[0]}
                  <br />
                  <span className="text-red">&amp;{aboutSec.title.split('&')[1]}</span>
                </>
              ) : (
                aboutSec.title
              )
            ) : (
              <>
                A Trusted Name in
                <br />
                <span className="text-red">Diesel &amp; Fuel Trading</span>
              </>
            )}
          </h2>

          <p className="about-lead">
            {aboutSec?.subtitle || 'Dubai Diesel Trading LLC is a UAE-based fuel trading company, supplying high-quality diesel and fuel products to a wide range of industries, including construction, logistics, manufacturing, and power generation.'}
          </p>

          {/* 4 Icon Pillars */}
          <div className="about-pillars">
            <div className="pillar-item">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="pillar-icon" aria-hidden="true">
                <path d="M5 24V6.5C5 5.12 6.12 4 7.5 4H15.5C16.88 4 18 5.12 18 6.5V24H5Z" fill="#D51F26" />
                <rect x="7.5" y="6.8" width="8" height="4.8" rx="0.8" fill="#ffffff" />
                <path d="M3.5 24H19.5" stroke="#D51F26" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M18 11H20.5C21.6 11 22.5 11.9 22.5 13V19.5C22.5 20.6 23.4 21.5 24.5 21.5C25.6 21.5 26.5 20.6 26.5 19.5V10.5L23.2 7" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24.5" cy="9" r="1.2" fill="#D51F26" />
              </svg>
              <div className="pillar-label">
                <strong>Quality</strong>
                <span>Fuel Supply</span>
              </div>
            </div>

            <span className="pillar-sep" aria-hidden="true"></span>

            <div className="pillar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pillar-icon" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div className="pillar-label">
                <strong>Reliable</strong>
                <span>&amp; Safe</span>
              </div>
            </div>

            <span className="pillar-sep" aria-hidden="true"></span>

            <div className="pillar-item">
              <svg viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="pillar-icon pillar-icon-wide" aria-hidden="true">
                <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" stroke="#D51F26" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" stroke="#D51F26" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 11.5L5.5 16.5L8.2 14.5" stroke="#D51F26" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M29.5 9.5L27 15.5L24 14" stroke="#D51F26" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="pillar-label">
                <strong>Industry</strong>
                <span>Expertise</span>
              </div>
            </div>

            <span className="pillar-sep" aria-hidden="true"></span>

            <div className="pillar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pillar-icon" aria-hidden="true">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 12 12 17 22 12" />
                <polyline points="2 17 12 22 22 17" />
              </svg>
              <div className="pillar-label">
                <strong>Wide Sector</strong>
                <span>Coverage</span>
              </div>
            </div>
          </div>

          <div className="about-actions">
            <Link to="/about" className="btn-about-blue">
              <span>Learn More About Us</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
