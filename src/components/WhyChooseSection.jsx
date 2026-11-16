import React from 'react';
import { useCms } from '../context/CmsContext';

export default function WhyChooseSection() {
  const { pageSections } = useCms();
  const whySec = pageSections?.['home.why_choose'];
  const photoImg = whySec?.image_url || '/images/why-choose-terminal.jpg';
  return (
    <section id="why-choose-us" className="why-section">
      {/* SVG Clip Path for Left Curved Terminal Photo */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="why-photo-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 L 0.72 0 C 0.88 0.14 0.94 0.30 0.84 0.56 C 0.76 0.77 0.74 0.90 0.79 1 L 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Left Flush Curved Photo Panel + Upper-Right Red Crescent */}
      <div className="why-media-panel">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="why-red-crescent" aria-hidden="true">
          <path d="M 73 2 C 93 13 99 26 86 52 C 90 30 85 15 73 2 Z" fill="#D51F26" />
        </svg>
        <img
          src={photoImg}
          alt="Dubai Diesel storage tanks and fuel delivery tanker"
          className="why-photo-img"
        />
      </div>

      {/* Subtle Dubai Skyline Watermark Above Bottom-Right Wave */}
      <svg viewBox="0 0 520 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-skyline-watermark" aria-hidden="true">
        <path d="M0 180V145H18V122H34V145H46V110H64V145H78V98H86V86H94V98H102V145H118V116H136V145H150V104H172V145H188V124H206V145H222V92H242V145H258V118H278V145H296V88H314V145H330V110H346V145H364V128H382V145H398V78L406 64L414 78V145H428V112H442V145H454V92L460 72L464 38L467 8L470 38L474 72L480 92V145H494V116H510V145H520V180H0Z" fill="#0A2246" />
      </svg>

      {/* Right Content & 6-Card Grid */}
      <div className="container why-container">
        <div className="why-content">
          <div className="section-eyebrow">
            <span className="eyebrow-short-red" aria-hidden="true"></span>
            <span>Why Choose Us</span>
          </div>

          <h2 className="section-title why-title">
            {whySec?.title ? (
              whySec.title.includes(' ') ? (
                <>
                  {whySec.title.split(' ').slice(0, -2).join(' ')}{' '}
                  <span className="text-red">{whySec.title.split(' ').slice(-2).join(' ')}</span>
                </>
              ) : (
                whySec.title
              )
            ) : (
              <>Your Trusted <span className="text-red">Fuel Partner</span> in the UAE</>
            )}
          </h2>

          <p className="why-subtitle">
            {whySec?.subtitle || 'We deliver reliable, high-quality diesel and fuel solutions with a commitment to safety, efficiency, and long-term partnerships.'}
          </p>

          <div className="why-grid">
            {/* Card 1: Assured Quality */}
            <article className="why-card">
              <div className="why-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <circle cx="12" cy="9" r="5" />
                  <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
                  <path d="M12 7v.5" />
                </svg>
              </div>
              <div className="why-card-text">
                <h3>Assured Quality</h3>
                <p>High-grade, industry compliant fuel</p>
              </div>
            </article>

            {/* Card 2: Reliable Delivery */}
            <article className="why-card">
              <div className="why-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="17" cy="18" r="2" />
                  <circle cx="7" cy="18" r="2" />
                </svg>
              </div>
              <div className="why-card-text">
                <h3>Reliable Delivery</h3>
                <p>On-time supply across the UAE</p>
              </div>
            </article>

            {/* Card 3: Safety & Compliance */}
            <article className="why-card">
              <div className="why-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="why-card-text">
                <h3>Safety &amp; Compliance</h3>
                <p>Adherence to UAE industry standards</p>
              </div>
            </article>

            {/* Card 4: Trusted Partner */}
            <article className="why-card">
              <div className="why-icon-box" aria-hidden="true">
                <svg viewBox="0 0 32 28" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="24" height="22">
                  <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" />
                  <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" />
                  <path d="M2.5 11.5L5.5 16.5L8.2 14.5" />
                  <path d="M29.5 9.5L27 15.5L24 14" />
                </svg>
              </div>
              <div className="why-card-text">
                <h3>Trusted Partner</h3>
                <p>Strong, long-term business relationships</p>
              </div>
            </article>

            {/* Card 5: Flexible Supply */}
            <article className="why-card">
              <div className="why-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 12 12 17 22 12" />
                  <polyline points="2 17 12 22 22 17" />
                </svg>
              </div>
              <div className="why-card-text">
                <h3>Flexible Supply</h3>
                <p>Solutions for diverse industry requirements</p>
              </div>
            </article>

            {/* Card 6: Dedicated Support */}
            <article className="why-card">
              <div className="why-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>
              <div className="why-card-text">
                <h3>Dedicated Support</h3>
                <p>24/7 customer service and dispatch</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
