import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCms } from '../context/CmsContext';
import PartnerCtaBanner from '../components/PartnerCtaBanner';

export default function Services({ onOpenQuote }) {
  useScrollReveal();
  const navigate = useNavigate();
  const { pageSections } = useCms();
  const heroSec = pageSections?.['services.hero'];
  const ctaSec = pageSections?.['services.cta'];
  const heroImg = heroSec?.image_url || '/images/services-hero-panoramic-clean.jpg';
  const ctaImg = ctaSec?.image_url || '/images/cta-skyline-clean.jpg';

  const formatHeroTitle = (title) => {
    const raw = title || 'Our Fuel Supply Services';
    if (raw.toLowerCase().includes('services')) {
      const idx = raw.toLowerCase().lastIndexOf('services');
      const prefix = raw.substring(0, idx).trim();
      const suffix = raw.substring(idx).trim();
      return (
        <>
          <span className="text-navy">{prefix}</span>
          <br />
          <span className="text-red">{suffix}</span>
        </>
      );
    }
    const words = raw.trim().split(' ');
    if (words.length > 1) {
      const last = words.pop();
      return (
        <>
          <span className="text-navy">{words.join(' ')}</span>
          <br />
          <span className="text-red">{last}</span>
        </>
      );
    }
    return <span className="text-navy">{raw}</span>;
  };

  useEffect(() => {
    document.title = 'Our Services | Dubai Diesel Trading LLC — UAE Fuel Supply Partner';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const serviceCards = [
    {
      id: 'diesel-supply',
      title: 'Diesel Supply',
      desc: 'High-quality diesel (EN 590) for commercial and industrial use.',
      image: '/images/service-card-diesel-exact.jpg',
      badgeTheme: 'srv-badge--red',
      waveColor: '#D51F26',
      productKey: 'Ultra Low Sulfur Diesel (10ppm)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M3 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17" />
          <path d="M13 10h2a2 2 0 0 1 2 2v4a2 2 0 0 0 4 0v-6l-2.5-2.5" />
          <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor" />
          <line x1="2" y1="22" x2="14" y2="22" />
        </svg>
      ),
    },
    {
      id: 'industrial-fuel',
      title: 'Industrial Fuel',
      desc: 'Reliable fuel supply for industrial operations and heavy equipment.',
      image: '/images/service-card-industrial-exact.jpg',
      badgeTheme: 'srv-badge--navy',
      waveColor: '#0A2246',
      productKey: 'Industrial Gas Oil',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </svg>
      ),
    },
    {
      id: 'marine-fuel',
      title: 'Marine Fuel',
      desc: 'Fuel solutions for marine and shipping operations.',
      image: '/images/service-card-marine-exact.jpg',
      badgeTheme: 'srv-badge--red',
      waveColor: '#D51F26',
      productKey: 'Marine Gas Oil (MGO)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.03" />
          <path d="M12 10V4" />
          <path d="M8 8l4-4 4 4" />
        </svg>
      ),
    },
    {
      id: 'generator-fuel',
      title: 'Generator Fuel',
      desc: 'Dependable fuel for power generation and backup systems.',
      image: '/images/service-card-generator-exact.jpg',
      badgeTheme: 'srv-badge--navy',
      waveColor: '#D51F26',
      productKey: 'Ultra Low Sulfur Diesel (10ppm)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: 'bulk-fuel-supply',
      title: 'Bulk Fuel Supply',
      desc: 'Large-volume, on-time delivery across the UAE.',
      image: '/images/service-card-bulk-exact.jpg',
      badgeTheme: 'srv-badge--red',
      waveColor: '#0A2246',
      productKey: 'Bulk Fuel Supply',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </svg>
      ),
    },
    {
      id: 'storage-distribution',
      title: 'Fuel Storage & Distribution',
      desc: 'Safe and efficient storage and distribution solutions.',
      image: '/images/service-card-storage-exact.jpg',
      badgeTheme: 'srv-badge--navy',
      waveColor: '#D51F26',
      productKey: 'Bulk Fuel Supply',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M3 21h18" />
          <path d="M5 21V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12" />
          <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
          <path d="M9 12v5" />
          <path d="M15 12v5" />
        </svg>
      ),
    },
  ];

  return (
    <main className="srv-page">
      {/* 1. HERO SECTION */}
      <section className="srv-hero unified-hero">
        <div className="srv-hero-bg-container" aria-hidden="true">
          <img
            src={heroImg}
            alt="Dubai Diesel fuel storage terminal with branded tanks and delivery tanker fleet"
            className="srv-hero-img"
          />
          <div className="srv-hero-fade"></div>
        </div>

          <div className="container srv-hero-container">
            <nav className="abp-breadcrumb srv-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="abp-crumb-home">Home</Link>
              <span aria-hidden="true" className="abp-crumb-sep">&rsaquo;</span>
              <span className="abp-crumb-curr">Our Services</span>
            </nav>

            <div className="srv-hero-content">
              <div className="srv-hero-heading-row">
                <span className="srv-title-dash" aria-hidden="true"></span>
                <h1 className="srv-hero-title">
                  {formatHeroTitle(heroSec?.title)}
                </h1>
              </div>

              <p className="srv-hero-sub">
                {heroSec?.subtitle || 'Comprehensive fuel trading, bunkering, and dedicated storage solutions for mission-critical industries in the UAE.'}
              </p>

              <button
                type="button"
                className="btn-primary srv-hero-cta"
                onClick={() => onOpenQuote()}
              >
                <span>Get in Touch</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Symmetrical Flowing Red & Navy Wave */}
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="srv-hero-wave" aria-hidden="true">
            <path d="M0 25 C260 2 480 50 780 50 C1080 50 1280 16 1440 2 L1440 60 L0 60 Z" fill="#D51F26" />
            <path d="M0 38 C270 14 490 58 780 58 C1080 58 1280 26 1440 12 L1440 60 L0 60 Z" fill="#0A2246" />
          </svg>
        </section>

      {/* 2. FLOATING 4-PILLAR TRUST BAR */}
      <div className="srv-trust-wrap">
        <div className="container">
          <div className="srv-trust-card">
            <div className="srv-trust-item">
              <div className="srv-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M3 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17" />
                  <path d="M13 10h2a2 2 0 0 1 2 2v4a2 2 0 0 0 4 0v-6l-2.5-2.5" />
                  <circle cx="7.5" cy="8.5" r="1.5" fill="#D51F26" />
                  <line x1="2" y1="22" x2="14" y2="22" />
                </svg>
              </div>
              <span className="srv-trust-label">Diesel Trading</span>
            </div>

            <span className="srv-trust-sep" aria-hidden="true"></span>

            <div className="srv-trust-item">
              <div className="srv-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="srv-trust-label">Supply Assurance</span>
            </div>

            <span className="srv-trust-sep" aria-hidden="true"></span>

            <div className="srv-trust-item">
              <div className="srv-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 12 12 17 22 12" />
                  <polyline points="2 17 12 22 22 17" />
                </svg>
              </div>
              <span className="srv-trust-label">Operational Excellence</span>
            </div>

            <span className="srv-trust-sep" aria-hidden="true"></span>

            <div className="srv-trust-item">
              <div className="srv-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="22">
                  <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 11.5L5.5 16.5L8.2 14.5" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M29.5 9.5L27 15.5L24 14" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="srv-trust-label">Trusted Partnerships</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CORE SERVICES CATALOG (3x2 Grid) */}
      <section className="srv-catalog-section" id="services-catalog">
        <div className="container">
          <div className="srv-catalog-header">
            <div className="srv-catalog-eyebrow">
              <span className="eyebrow-short-red" aria-hidden="true"></span>
              <span>Our Services</span>
              <span className="eyebrow-short-red" aria-hidden="true"></span>
            </div>
            <h2 className="srv-catalog-title">
              Comprehensive Fuel <span className="text-red">Supply Solutions</span>
            </h2>
            <p className="srv-catalog-sub">
              At Dubai Diesel Trading L.L.C., we deliver reliable, high-quality fuel and petroleum products with unmatched service, ensuring your business keeps moving forward.
            </p>
          </div>

          <div className="srv-grid">
            {serviceCards.map((card) => (
              <article
                key={card.id}
                className="srv-card"
                onClick={() => navigate(`/services/${card.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/services/${card.id}`);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="srv-card-media">
                  <img src={card.image} alt={card.title} loading="lazy" />
                  <svg viewBox="0 0 300 28" preserveAspectRatio="none" className="srv-card-cut" aria-hidden="true">
                    <path d="M0 28 L300 0 L300 28 L0 28 Z" fill="#ffffff" />
                  </svg>
                  <div className={`srv-badge ${card.badgeTheme}`} aria-hidden="true">
                    {card.icon}
                  </div>
                </div>

                <div className="srv-card-body">
                  <h3 className="srv-card-title">{card.title}</h3>
                  <p className="srv-card-desc">{card.desc}</p>

                  <div className="srv-card-footer">
                    <button
                      type="button"
                      className="srv-arrow-btn"
                      aria-label={`View details for ${card.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/services/${card.id}`);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Bottom colored curve accent */}
                <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="srv-card-bottom-accent" aria-hidden="true">
                  <path d="M0 14 C130 12 240 8 300 0 L300 14 Z" fill={card.waveColor} />
                </svg>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE DUBAI DIESEL SECTION */}
      <section className="srv-why-section">
        <div className="container">
          <div className="srv-why-grid">
            {/* Left Photo with Red Trim */}
            <div className="srv-why-photo-wrap">
              <img
                src="/images/service-why-engineer-exact.png"
                alt="Dubai Diesel certified engineer inspecting fuel storage facilities"
                className="srv-why-img"
              />
            </div>

            {/* Middle Copy */}
            <div className="srv-why-center">
              <div className="srv-why-eyebrow">
                <span className="eyebrow-short-red" aria-hidden="true"></span>
                <span>Why Choose <strong className="text-red">Dubai Diesel?</strong></span>
              </div>

              <h2 className="srv-why-title">
                Quality. Reliability. <span className="text-red">Partnership.</span>
              </h2>

              <p className="srv-why-sub">
                We go beyond fuel supply &mdash; we deliver reliable, safe, and efficient solutions tailored to your business needs.
              </p>
            </div>

            {/* Right Feature List */}
            <div className="srv-why-features">
              <div className="srv-feature-row">
                <div className="srv-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0A2246" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <span className="srv-feature-text">Assured <strong>Quality</strong></span>
              </div>

              <div className="srv-feature-row">
                <div className="srv-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0A2246" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="srv-feature-text">On-Time <strong>Delivery</strong></span>
              </div>

              <div className="srv-feature-row">
                <div className="srv-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0A2246" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <span className="srv-feature-text">Dedicated <strong>Support</strong></span>
              </div>

              <div className="srv-feature-row">
                <div className="srv-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 28" fill="none" stroke="#0A2246" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="24" height="22">
                    <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" />
                    <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" />
                  </svg>
                </div>
                <span className="srv-feature-text">Long-Term <strong>Partnership</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DUSK SKYLINE CTA BANNER */}
      <PartnerCtaBanner
        pageSlug="services"
        sectionKey="cta"
        defaultTitle="Need Bulk Diesel Delivered to Your Site?"
        defaultSubtitle="Talk to our fuel trading team today for priority schedule options across the UAE."
        onOpenQuote={onOpenQuote}
      />
    </main>
  );
}
