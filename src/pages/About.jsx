import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCms } from '../context/CmsContext';
import PartnerCtaBanner from '../components/PartnerCtaBanner';

export default function About({ onOpenQuote }) {
  useScrollReveal();
  const { pageSections } = useCms();
  const heroSec = pageSections?.['about.hero'];
  const companySec = pageSections?.['about.company'];
  const bentoMainSec = pageSections?.['about.bento_main'];
  const bentoTopSec = pageSections?.['about.bento_top'];
  const bentoBottomSec = pageSections?.['about.bento_bottom'];
  const whySec = pageSections?.['about.why_choose'];
  const ctaSec = pageSections?.['about.cta'];

  const heroImg = heroSec?.image_url || '/images/about-hero-facility-bg.jpg';
  const companyImg = bentoMainSec?.image_url || companySec?.content?.image_main || companySec?.image_url || '/images/about-bento-tank.jpg';
  const bentoTopImg = bentoTopSec?.image_url || companySec?.content?.image_top || '/images/about-bento-tanks-top.jpg';
  const bentoBottomImg = bentoBottomSec?.image_url || companySec?.content?.image_bottom || '/images/about-bento-truck-bottom.jpg';
  const companyBtnText = companySec?.content?.button_text || 'Learn More About Us';
  const companyBtnLink = companySec?.content?.button_link || '#why-choose';
  const ctaImg = ctaSec?.image_url || '/images/cta-skyline-clean.jpg';
  const ctaTitle = ctaSec?.title || 'Your Reliable Fuel Supply Partner in the UAE';
  const ctaSubtitle = ctaSec?.subtitle || 'Contact us today for fuel supply, storage, and distribution solutions.';
  const ctaBtnText = ctaSec?.content?.button_text || 'Request a Quote';
  const isCtaGraphicBanner = ctaSec?.content?.banner_mode === 'graphic';

  useEffect(() => {
    document.title = 'About Us | Dubai Diesel Trading LLC — UAE Fuel Supply Partner';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Animated stat counters
  const [counts, setCounts] = useState({
    exp: 0,
    storage: 0,
    partners: 0,
    clients: 0,
  });
  const statsRef = useRef(null);
  const countedRef = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const animateCounters = () => {
      if (countedRef.current) return;
      countedRef.current = true;

      const duration = 900;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCounts({
          exp: Math.max(1, Math.round(eased * 10)),
          storage: Math.max(1, Math.round(eased * 10)),
          partners: Math.max(1, Math.round(eased * 50)),
          clients: Math.max(1, Math.round(eased * 100)),
        });

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCounts({ exp: 10, storage: 10, partners: 50, clients: 100 });
        }
      };

      window.requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      animateCounters();
    }
  }, []);

  return (
    <main>
      {/* ABOUT HERO */}
      <section className="abp-hero unified-hero">
        {/* Full-bleed Backdrop: Dubai Diesel Terminal & Office Facility with Left Navy Fade */}
        <div className="abp-hero-media" aria-hidden="true">
          <img
            src={heroImg}
            alt="Dubai Diesel fuel storage terminal and head office building"
            className="abp-hero-img"
          />
          <div className="abp-hero-feather"></div>
        </div>

          <div className="container abp-hero-container">
            {/* Breadcrumb: Home › About Us */}
            <nav className="abp-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="abp-crumb-home">Home</Link>
              <span aria-hidden="true" className="abp-crumb-sep">&rsaquo;</span>
              <span className="abp-crumb-curr">About Us</span>
            </nav>

            <div className="abp-hero-copy">
              <div className="abp-eyebrow">
                <span className="abp-dash" aria-hidden="true"></span>
                <span className="abp-eyebrow-text">About</span>
              </div>

              <h1 className="abp-hero-title">
                {heroSec?.title ? (
                  heroSec.title.toLowerCase().includes('dubai diesel') ? (
                    <>
                      About<br />
                      <span className="text-red">Dubai Diesel</span><br />
                      {heroSec.title.replace(/about\s*dubai\s*diesel\s*/i, '').trim() || 'Trading L.L.C.'}
                    </>
                  ) : (
                    heroSec.title
                  )
                ) : (
                  <>
                    About<br />
                    <span className="text-red">Dubai Diesel</span><br />
                    Trading L.L.C.
                  </>
                )}
              </h1>

              <p className="abp-hero-sub">
                {heroSec?.subtitle || 'A trusted partner in diesel and fuel supply, storage, and distribution across the UAE.'}
              </p>

              <div className="abp-hero-ctas">
                <button
                  type="button"
                  className="abp-profile-btn"
                  onClick={() => onOpenQuote()}
                >
                  <span>Get in Touch</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <a
                  href="/assets/Dubai-Diesel-Trading-Profile.pdf"
                  download="Dubai-Diesel-Trading-Profile.pdf"
                  className="abp-profile-btn"
                >
                  <span>Our Profile (PDF)</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Dual Curved Red & Navy Bottom Wave */}
          <div className="abp-hero-wave-wrap" aria-hidden="true">
            <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="abp-hero-wave-svg">
              {/* Navy Base Curve */}
              <path
                d="M0 64 L1440 64 L1440 34 C1320 40 1160 54 1020 60 C880 64 560 64 360 64 C200 64 80 56 0 42 Z"
                fill="#02203c"
              />
              {/* Red Flowing Ribbon Left & Right Curves */}
              <path
                d="M0 42 C40 50 110 58 200 62 L320 64 C220 62 120 54 0 34 Z"
                fill="#D51F26"
              />
              <path
                d="M960 64 C1080 60 1220 48 1340 32 C1380 26 1415 18 1440 10 L1440 22 C1410 30 1370 38 1320 46 C1190 60 1060 64 960 64 Z"
                fill="#D51F26"
              />
            </svg>
          </div>
        </section>

      {/* FLOATING 4-PILLAR FEATURE BAR */}
      <div className="abp-trust-wrap">
        <div className="container">
          <div className="abp-trust-card">
            <div className="abp-trust-item">
              <span className="abp-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="abp-trust-icon">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <circle cx="10" cy="9" r="1" fill="#D51F26" />
                </svg>
              </span>
              <span>Reliable Fuel Supply</span>
            </div>

            <span className="abp-trust-sep" aria-hidden="true"></span>

            <div className="abp-trust-item">
              <span className="abp-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="abp-trust-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <span>Safety &amp; Compliance</span>
            </div>

            <span className="abp-trust-sep" aria-hidden="true"></span>

            <div className="abp-trust-item">
              <span className="abp-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="abp-trust-icon">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <span>Operational Excellence</span>
            </div>

            <span className="abp-trust-sep" aria-hidden="true"></span>

            <div className="abp-trust-item">
              <span className="abp-trust-icon-box" aria-hidden="true">
                <svg viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="abp-trust-icon abp-trust-icon-wide">
                  <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" stroke="#D51F26" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" stroke="#D51F26" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 11.5L5.5 16.5L8.2 14.5" stroke="#D51F26" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M29.5 9.5L27 15.5L24 14" stroke="#D51F26" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>Trusted Partnerships</span>
            </div>
          </div>
        </div>
      </div>

      {/* OUR COMPANY BENTO SPLIT SECTION */}
      <section id="our-company" className="abp-company-section">
        {/* Subtle Dubai Skyline Watermark */}
        <svg viewBox="0 0 460 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="abp-company-skyline" aria-hidden="true">
          <path d="M0 150V132H18V116H32V132H46V102H62V132H78V90H94V132H110V110H128V132H144V84H162V132H178V104H194V132H212V78H228V132H242V108H258V132H274V72L281 58L288 72V132H298V64L304 38L307 6L310 38L316 64V132H330V96H346V132H362V86H378V132H394V104H410V132H426V92H442V132H460V150H0Z" fill="#0A2246" />
        </svg>

        <div className="container abp-company-grid">
          {/* Left 3-Photo Slanted Collage */}
          <div className="abp-bento">
            {/* Top-Left Red Arch Accent */}
            <div className="abp-bento-red-tl" aria-hidden="true"></div>

            <div className="abp-bento-main">
              <img
                src={companyImg}
                alt="Dubai Diesel branded vertical fuel storage tank"
                className="abp-bento-img"
              />
            </div>

            <div className="abp-bento-side">
              <div className="abp-bento-top">
                <img
                  src={bentoTopImg}
                  alt="Industrial fuel storage tanks in row"
                  className="abp-bento-img"
                />
              </div>
              <div className="abp-bento-bottom">
                <img
                  src={bentoBottomImg}
                  alt="Dubai Diesel delivery tanker truck under gantry"
                  className="abp-bento-img"
                />
                <span className="abp-bento-red-br" aria-hidden="true"></span>
              </div>
            </div>
          </div>

          {/* Right Company Copy Column */}
          <div className="abp-company-copy">
            <div className="section-eyebrow">
              <span className="eyebrow-short-red" aria-hidden="true"></span>
              <span>Our Company</span>
            </div>

            <h2 className="section-title abp-company-title">
              {companySec?.title ? (
                companySec.title.includes('&') ? (
                  <>
                    {companySec.title.split('&')[0]}<br />
                    <span className="text-red">&amp;{companySec.title.split('&')[1]}</span>
                  </>
                ) : (
                  companySec.title
                )
              ) : (
                <>
                  A Trusted Name in<br />
                  <span className="text-red">Diesel &amp; Fuel Trading</span>
                </>
              )}
            </h2>

            <p className="abp-company-text">
              {companySec?.subtitle || 'Dubai Diesel Trading L.L.C. is a UAE-based fuel trading company specializing in the supply, storage, and distribution of high-quality diesel and fuel products to key industries across construction, logistics, manufacturing, marine, and power sectors.'}
            </p>

            <a
              href={companyBtnLink}
              className="abp-outline-red-btn"
              onClick={(e) => {
                if (companyBtnLink.startsWith('#')) {
                  e.preventDefault();
                  const targetId = companyBtnLink.replace('#', '');
                  const el = document.getElementById(targetId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>{companyBtnText}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* DARK NAVY FLOATING STATS BANNER */}
      <section className="abp-stats-section" aria-label="Company Key Figures" ref={statsRef}>
        <div className="container">
          <div className="abp-stats-bar">
            <div className="abp-stat-item">
              <div className="abp-stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="abp-stat-copy">
                <strong className="abp-stat-num">{counts.exp}+</strong>
                <span>Years of Experience</span>
              </div>
            </div>

            <span className="abp-stat-sep" aria-hidden="true"></span>

            <div className="abp-stat-item">
              <div className="abp-stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                  <path d="M3 21h18" />
                  <path d="M5 21V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12" />
                  <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                  <path d="M9 12v5" />
                  <path d="M15 12v5" />
                </svg>
              </div>
              <div className="abp-stat-copy">
                <strong className="abp-stat-num">{counts.storage}+</strong>
                <span>Storage Facilities</span>
              </div>
            </div>

            <span className="abp-stat-sep" aria-hidden="true"></span>

            <div className="abp-stat-item">
              <div className="abp-stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="17" cy="18" r="2" />
                  <circle cx="7" cy="18" r="2" />
                </svg>
              </div>
              <div className="abp-stat-copy">
                <strong className="abp-stat-num">{counts.partners}+</strong>
                <span>Distribution Partners</span>
              </div>
            </div>

            <span className="abp-stat-sep" aria-hidden="true"></span>

            <div className="abp-stat-item">
              <div className="abp-stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="abp-stat-copy">
                <strong className="abp-stat-num">{counts.clients}+</strong>
                <span>Satisfied Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE DUBAI DIESEL SECTION */}
      <section id="why-choose" className="abp-why-section">
        <div className="container">
          <div className="abp-why-header">
            <div className="section-eyebrow center">
              <span className="eyebrow-short-red" aria-hidden="true"></span>
              <span>Why Choose <strong className="text-red">Dubai Diesel?</strong></span>
            </div>
            <p className="abp-why-sub">
              We go beyond fuel supply &mdash; we deliver reliability, safety, and long-term value for your business.
            </p>
          </div>

          <div className="abp-why-grid">
            {/* Card 1 - Assured Quality */}
            <article className="abp-why-card">
              <div className="abp-why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
                </svg>
              </div>
              <h3>Assured Quality</h3>
              <p>High-grade, industry-compliant fuel</p>
              <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="abp-why-ribbon" aria-hidden="true">
                <path d="M40 24 C100 22 155 12 200 0 L200 24 Z" fill="#D51F26" />
              </svg>
            </article>

            {/* Card 2 - Reliable Delivery */}
            <article className="abp-why-card">
              <div className="abp-why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="17" cy="18" r="2" />
                  <circle cx="7" cy="18" r="2" />
                </svg>
              </div>
              <h3>Reliable Delivery</h3>
              <p>On-time supply across the UAE</p>
              <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="abp-why-ribbon" aria-hidden="true">
                <path d="M40 24 C100 22 155 12 200 0 L200 24 Z" fill="#D51F26" />
              </svg>
            </article>

            {/* Card 3 - Safety & Compliance */}
            <article className="abp-why-card">
              <div className="abp-why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3>Safety &amp; Compliance</h3>
              <p>Adherence to UAE industry standards</p>
              <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="abp-why-ribbon" aria-hidden="true">
                <path d="M40 24 C100 22 155 12 200 0 L200 24 Z" fill="#D51F26" />
              </svg>
            </article>

            {/* Card 4 - Trusted Partner */}
            <article className="abp-why-card">
              <div className="abp-why-icon" aria-hidden="true">
                <svg viewBox="0 0 32 28" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width="27" height="26">
                  <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" />
                  <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" />
                </svg>
              </div>
              <h3>Trusted Partner</h3>
              <p>A long-term, dependable fuel supply partner</p>
              <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="abp-why-ribbon" aria-hidden="true">
                <path d="M40 24 C100 22 155 12 200 0 L200 24 Z" fill="#D51F26" />
              </svg>
            </article>
          </div>
        </div>
      </section>

      {/* OUR CERTIFICATIONS & COMPLIANCE BAR */}
      <section id="certifications" className="abp-certs-section">
        <div className="container">
          <div className="abp-certs-card">
            <div className="abp-certs-heading">
              <span className="abp-certs-dash" aria-hidden="true"></span>
              <h2>Our<br />Certifications<br />&amp; Compliance</h2>
            </div>

            <div className="abp-cert-item">
              <svg viewBox="0 0 56 56" className="abp-iso-svg" aria-hidden="true">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#0A2246" strokeWidth="2" />
                <circle cx="28" cy="28" r="19" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2.5 2" />
                <text x="28" y="25" textAnchor="middle" fill="#0A2246" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">ISO</text>
                <text x="28" y="37" textAnchor="middle" fill="#0A2246" fontSize="9.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">9001</text>
              </svg>
              <strong>ISO 9001</strong>
              <span>Quality Management</span>
            </div>

            <div className="abp-cert-item">
              <svg viewBox="0 0 56 56" className="abp-iso-svg" aria-hidden="true">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#0A2246" strokeWidth="2" />
                <circle cx="28" cy="28" r="19" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2.5 2" />
                <text x="28" y="25" textAnchor="middle" fill="#0A2246" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">ISO</text>
                <text x="28" y="37" textAnchor="middle" fill="#0A2246" fontSize="9.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">14001</text>
              </svg>
              <strong>ISO 14001</strong>
              <span>Environmental Management</span>
            </div>

            <div className="abp-cert-item">
              <svg viewBox="0 0 56 56" className="abp-iso-svg" aria-hidden="true">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#0A2246" strokeWidth="2" />
                <circle cx="28" cy="28" r="19" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2.5 2" />
                <text x="28" y="25" textAnchor="middle" fill="#0A2246" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">ISO</text>
                <text x="28" y="37" textAnchor="middle" fill="#0A2246" fontSize="9.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">45001</text>
              </svg>
              <strong>ISO 45001</strong>
              <span>Occupational Health &amp; Safety</span>
            </div>

            <div className="abp-cert-item">
              <div className="abp-uae-falcon-wrap" aria-hidden="true">
                <img
                  src="/images/about-uae-falcon-emblem.png"
                  alt="UAE Coat of Arms Golden Falcon"
                  className="abp-uae-falcon-img"
                />
              </div>
              <strong>UAE Regulatory</strong>
              <span>Compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER DUSK SKYLINE CTA BANNER */}
      <PartnerCtaBanner
        pageSlug="about"
        sectionKey="cta"
        defaultTitle="Partner with a Trusted Fuel Supply Company in the UAE"
        defaultSubtitle="Get reliable, safe, and efficient fuel solutions tailored to your business operations across the UAE."
        onOpenQuote={onOpenQuote}
      />
    </main>
  );
}
