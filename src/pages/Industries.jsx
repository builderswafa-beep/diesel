import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCms } from '../context/CmsContext';
import PartnerCtaBanner from '../components/PartnerCtaBanner';

export default function Industries({ onOpenQuote }) {
  useScrollReveal();
  const navigate = useNavigate();
  const { pageSections } = useCms();
  const heroSec = pageSections?.['industries.hero'];
  const heroImg = heroSec?.image_url || '/images/industries-hero-panorama-exact.jpg';

  const ctaSec = pageSections?.['industries.cta'];
  const ctaImg = ctaSec?.image_url || '/images/cta-skyline-clean.jpg';
  const isCtaGraphicBanner = ctaSec?.content?.banner_mode === 'graphic';

  useEffect(() => {
    document.title = 'Industries We Serve | Dubai Diesel Trading LLC — UAE Fuel Supply Partner';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const industriesList = [
    {
      id: 'construction',
      title: 'Construction',
      image: '/images/industry-construction.jpg',
      badgeTheme: 'srv-badge--red',
      waveColor: '#D51F26',
      productKey: 'Ultra Low Sulfur Diesel (10ppm)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M2 22h20" />
          <path d="M12 2v20" />
          <path d="M7 7h10" />
          <path d="M3 2l9 5 9-5" />
          <rect x="5" y="16" width="4" height="6" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      ),
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      image: '/images/industry-manufacturing.jpg',
      badgeTheme: 'srv-badge--navy',
      waveColor: '#0A2246',
      productKey: 'Industrial Gas Oil',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </svg>
      ),
    },
    {
      id: 'logistics-transport',
      title: 'Logistics & Transport',
      image: '/images/service-bulk.jpg',
      badgeTheme: 'srv-badge--red',
      waveColor: '#D51F26',
      productKey: 'Ultra Low Sulfur Diesel (10ppm)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </svg>
      ),
    },
    {
      id: 'power-generation',
      title: 'Power Generation',
      image: '/images/service-generator.jpg',
      badgeTheme: 'srv-badge--navy',
      waveColor: '#0A2246',
      productKey: 'Ultra Low Sulfur Diesel (10ppm)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: 'marine-shipping',
      title: 'Marine & Shipping',
      image: '/images/service-marine.jpg',
      badgeTheme: 'srv-badge--red',
      waveColor: '#D51F26',
      productKey: 'Marine Gas Oil (MGO)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.03" />
          <path d="M12 10V4" />
          <path d="M8 8l4-4 4 4" />
        </svg>
      ),
    },
    {
      id: 'oil-gas',
      title: 'Oil & Gas',
      image: '/images/industry-oil-gas.jpg',
      badgeTheme: 'srv-badge--navy',
      waveColor: '#D51F26',
      productKey: 'Industrial Gas Oil',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      ),
    },
  ];

  return (
    <main className="ind-page">
      {/* 1. HERO SECTION */}
      <section className="ind-hero">
        <div className="ind-hero-bg-container" aria-hidden="true">
          <img
            src={heroImg}
            alt="Petrochemical refinery and Dubai Diesel bulk storage facilities"
            className="ind-hero-img"
          />
        </div>

          <div className="container ind-hero-container">
            <nav className="abp-breadcrumb hero-eyebrow" aria-label="Breadcrumb">
              <Link to="/" className="abp-crumb-home">Home</Link>
              <span aria-hidden="true" className="abp-crumb-sep">&rsaquo;</span>
              <span>Industries</span>
            </nav>

            <div className="ind-hero-content">
              <div className="ind-hero-eyebrow">
                <span className="ind-eyebrow-dash" aria-hidden="true"></span>
                <h1 className="ind-hero-title">
                  {heroSec?.title ? (
                    heroSec.title.includes(' ') ? (
                      <>
                        {heroSec.title.split(' ').slice(0, -1).join(' ')}{' '}
                        <span className="text-red">{heroSec.title.split(' ').slice(-1).join(' ')}</span>
                      </>
                    ) : (
                      heroSec.title
                    )
                  ) : (
                    <>Industries <span className="text-red">We Serve</span></>
                  )}
                </h1>
              </div>

              <p className="ind-hero-sub">
                {heroSec?.subtitle || (
                  <>
                    Supplying high-quality diesel and fuel solutions to a
                    <br className="hide-sm" /> wide range of industries across the UAE.
                  </>
                )}
              </p>

              <button
                type="button"
                className="btn-primary ind-hero-cta"
                onClick={() => onOpenQuote()}
              >
                <span>Request a Quote</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </section>

      {/* 2. FLOATING 4-PILLAR TRUST BAR */}
      <div className="ind-trust-wrap">
        <div className="container">
          <div className="ind-trust-card">
            <div className="ind-trust-item">
              <div className="ind-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d="M3 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17" />
                  <path d="M13 10h2a2 2 0 0 1 2 2v4a2 2 0 0 0 4 0v-6l-2.5-2.5" />
                  <circle cx="7.5" cy="8.5" r="1.5" fill="#D51F26" />
                  <line x1="2" y1="22" x2="14" y2="22" />
                </svg>
              </div>
              <span className="ind-trust-label">Reliable Fuel Supply</span>
            </div>

            <span className="ind-trust-sep" aria-hidden="true"></span>

            <div className="ind-trust-item">
              <div className="ind-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="ind-trust-label">Industry Compliance</span>
            </div>

            <span className="ind-trust-sep" aria-hidden="true"></span>

            <div className="ind-trust-item">
              <div className="ind-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 12 12 17 22 12" />
                  <polyline points="2 17 12 22 22 17" />
                </svg>
              </div>
              <span className="ind-trust-label">Flexible Solutions</span>
            </div>

            <span className="ind-trust-sep" aria-hidden="true"></span>

            <div className="ind-trust-item">
              <div className="ind-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="24">
                  <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 11.5L5.5 16.5L8.2 14.5" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M29.5 9.5L27 15.5L24 14" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="ind-trust-label">Trusted Partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN INDUSTRIES GRID (3x2 Grid) */}
      <section className="ind-catalog-section" id="industries-catalog">
        <div className="container">
          <div className="ind-catalog-header">
            <div className="ind-catalog-eyebrow">
              <span className="eyebrow-short-red" aria-hidden="true"></span>
              <span>Our Industries</span>
              <span className="eyebrow-short-red" aria-hidden="true"></span>
            </div>
            <h2 className="ind-catalog-title">
              Fuel Solutions for <span className="text-red">Key Industries</span>
            </h2>
            <p className="ind-catalog-sub">
              We provide reliable and efficient fuel solutions that power critical industries across the UAE.
            </p>
          </div>

          <div className="ind-grid">
            {industriesList.map((item) => (
              <article
                key={item.id}
                className="ind-card-modern"
                onClick={() => navigate(`/industries/${item.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/industries/${item.id}`);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="ind-card-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <svg viewBox="0 0 300 28" preserveAspectRatio="none" className="ind-card-cut" aria-hidden="true">
                    <path d="M0 28 L300 0 L300 28 L0 28 Z" fill="#ffffff" />
                  </svg>
                  <div className={`ind-badge ${item.badgeTheme}`} aria-hidden="true">
                    {item.icon}
                  </div>
                </div>

                <div className="ind-card-body">
                  <h3 className="ind-card-title">{item.title}</h3>
                </div>

                {/* Bottom colored curve accent */}
                <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="ind-card-bottom-accent" aria-hidden="true">
                  <path d="M0 14 C130 12 240 8 300 0 L300 14 Z" fill={item.waveColor} />
                </svg>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY LEADING INDUSTRIES CHOOSE US? BAR */}
      <section className="ind-choose-section">
        <div className="container">
          <div className="ind-choose-card">
            <div className="ind-choose-header">
              <h3 className="ind-choose-title">
                Why Leading Industries<br />
                <span className="text-red">Choose Us?</span>
              </h3>
            </div>

            <span className="ind-choose-sep" aria-hidden="true"></span>

            <div className="ind-choose-item">
              <div className="ind-choose-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="ind-choose-label">Consistent Supply</span>
            </div>

            <span className="ind-choose-sep" aria-hidden="true"></span>

            <div className="ind-choose-item">
              <div className="ind-choose-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <span className="ind-choose-label">Operational Efficiency</span>
            </div>

            <span className="ind-choose-sep" aria-hidden="true"></span>

            <div className="ind-choose-item">
              <div className="ind-choose-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <span className="ind-choose-label">Business Continuity</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DUSK SKYLINE CTA BANNER */}
      <PartnerCtaBanner
        pageSlug="industries"
        sectionKey="cta"
        defaultTitle="Fuel Your Operations with Dubai Diesel Trading L.L.C."
        defaultSubtitle="A reliable fuel partner for every industry in the UAE."
        onOpenQuote={onOpenQuote}
      />
    </main>
  );
}
