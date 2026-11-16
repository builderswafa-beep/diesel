import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCms } from '../context/CmsContext';

export default function SectorsSection({ onOpenQuote }) {
  const navigate = useNavigate();
  const { pageSections } = useCms();
  const sec = pageSections?.['home.sectors'];
  const viewportRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (!viewportRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    setActiveSlide(progress > 0.4 ? 1 : 0);
  };

  const scrollPrev = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: -221, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: 221, behavior: 'smooth' });
    }
  };

  const scrollToSlide = (slideIdx) => {
    if (!viewportRef.current) return;
    const maxScroll = Math.max(1, viewportRef.current.scrollWidth - viewportRef.current.clientWidth);
    viewportRef.current.scrollTo({
      left: slideIdx === 0 ? 0 : maxScroll,
      behavior: 'smooth',
    });
    setActiveSlide(slideIdx);
  };

  return (
    <section id="sectors" className="industries-section">
      <div className="container industries-layout">
        {/* Left Heading & Skyline Column */}
        <div className="industries-intro">
          <div className="section-eyebrow">
            <span className="eyebrow-short-red" aria-hidden="true"></span>
            <span>Industries We Serve</span>
          </div>
          <h2 className="section-title industries-title">
            {sec?.title ? (
              sec.title.includes(' ') ? (
                <>
                  {sec.title.split(' ').slice(0, -2).join(' ')}
                  <br />
                  <span className="text-red">{sec.title.split(' ').slice(-2).join(' ')}</span>
                </>
              ) : (
                sec.title
              )
            ) : (
              <>
                Fuel Solutions for
                <br />
                <span className="text-red">Key Industries</span>
              </>
            )}
          </h2>
          <p className="industries-copy">
            {sec?.subtitle || 'Supplying high-quality diesel and fuel solutions to a wide range of industries across the UAE.'}
          </p>

          {/* Scroll Navigation Arrows */}
          <div className="industries-nav-arrows">
            <button
              type="button"
              className="svc-arrow-btn svc-arrow-prev"
              id="ind-prev-btn"
              aria-label="Previous industry"
              onClick={scrollPrev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="18" height="18" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="svc-arrow-btn svc-arrow-next"
              id="ind-next-btn"
              aria-label="Next industry"
              onClick={scrollNext}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="18" height="18" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Subtle Dubai Skyline Watermark */}
          <svg viewBox="0 0 420 145" fill="none" xmlns="http://www.w3.org/2000/svg" className="industries-skyline" aria-hidden="true">
            <path d="M0 145V126H14V112H26V126H38V100H52V126H64V88H78V126H90V108H106V126H118V82H134V126H146V102H160V126H176V78H190V126H202V106H216V126H230V70L237 56L244 70V126H252V62L257 36L260 6L263 36L268 62V126H282V94H296V126H310V84H324V126H338V102H352V126H366V90H380V126H394V110H408V126H420V145H0Z" fill="#0A2246" />
          </svg>
        </div>

        {/* Right Scrollable Single-Row Showcase */}
        <div className="industries-carousel-col">
          <div
            className="industries-viewport"
            id="industries-viewport"
            ref={viewportRef}
            onScroll={handleScroll}
          >
            <div className="industries-grid">
              {/* 1. Construction */}
              <button
                type="button"
                className="ind-card ind-card--red"
                onClick={() => navigate('/industries/construction')}
              >
                <div className="ind-photo-wrap">
                  <img
                    src="/images/industry-construction.jpg"
                    alt="Yellow hydraulic excavator operating on a Dubai construction site"
                    className="ind-photo"
                    loading="lazy"
                  />
                  <svg viewBox="0 0 200 26" preserveAspectRatio="none" className="ind-photo-cut" aria-hidden="true">
                    <polygon points="0,26 200,3 200,26" fill="#ffffff" />
                  </svg>
                </div>
                <div className="ind-icon-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="23" height="23">
                    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2Z" />
                    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
                    <path d="M4 15v-3a6 6 0 0 1 6-6" />
                    <path d="M14 6a6 6 0 0 1 6 6v3" />
                  </svg>
                </div>
                <div className="ind-card-body">
                  <h3 className="ind-card-title">Construction</h3>
                  <span className="ind-title-rule" aria-hidden="true"></span>
                </div>
                <svg viewBox="0 0 200 22" preserveAspectRatio="none" className="ind-card-ribbon" aria-hidden="true">
                  <path d="M52 22 C110 18 164 10 200 0 L200 22 Z" />
                </svg>
              </button>

              {/* 2. Manufacturing */}
              <button
                type="button"
                className="ind-card ind-card--navy"
                onClick={() => navigate('/industries/manufacturing')}
              >
                <div className="ind-photo-wrap">
                  <img
                    src="/images/industry-manufacturing.jpg"
                    alt="Industrial processing facility with metallic manufacturing towers in the UAE"
                    className="ind-photo"
                    loading="lazy"
                  />
                  <svg viewBox="0 0 200 26" preserveAspectRatio="none" className="ind-photo-cut" aria-hidden="true">
                    <polygon points="0,26 200,3 200,26" fill="#ffffff" />
                  </svg>
                </div>
                <div className="ind-icon-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="23" height="23">
                    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                    <path d="M17 18h1" />
                    <path d="M12 18h1" />
                    <path d="M7 18h1" />
                  </svg>
                </div>
                <div className="ind-card-body">
                  <h3 className="ind-card-title">Manufacturing</h3>
                  <span className="ind-title-rule" aria-hidden="true"></span>
                </div>
                <svg viewBox="0 0 200 22" preserveAspectRatio="none" className="ind-card-ribbon" aria-hidden="true">
                  <path d="M52 22 C110 18 164 10 200 0 L200 22 Z" />
                </svg>
              </button>

              {/* 3. Logistics & Transport */}
              <button
                type="button"
                className="ind-card ind-card--red"
                onClick={() => navigate('/industries/logistics-transport')}
              >
                <div className="ind-photo-wrap">
                  <img
                    src="/images/service-bulk.jpg"
                    alt="Heavy commercial diesel tanker truck on a UAE highway at sunrise"
                    className="ind-photo"
                    loading="lazy"
                  />
                  <svg viewBox="0 0 200 26" preserveAspectRatio="none" className="ind-photo-cut" aria-hidden="true">
                    <polygon points="0,26 200,3 200,26" fill="#ffffff" />
                  </svg>
                </div>
                <div className="ind-icon-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="23" height="23">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                    <path d="M15 18H9" />
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                    <circle cx="17" cy="18" r="2" />
                    <circle cx="7" cy="18" r="2" />
                  </svg>
                </div>
                <div className="ind-card-body">
                  <h3 className="ind-card-title">Logistics &amp;<br />Transport</h3>
                  <span className="ind-title-rule" aria-hidden="true"></span>
                </div>
                <svg viewBox="0 0 200 22" preserveAspectRatio="none" className="ind-card-ribbon" aria-hidden="true">
                  <path d="M52 22 C110 18 164 10 200 0 L200 22 Z" />
                </svg>
              </button>

              {/* 4. Power Generation */}
              <button
                type="button"
                className="ind-card ind-card--navy"
                onClick={() => navigate('/industries/power-generation')}
              >
                <div className="ind-photo-wrap">
                  <img
                    src="/images/service-generator.jpg"
                    alt="Industrial yellow backup diesel power generator unit"
                    className="ind-photo"
                    loading="lazy"
                  />
                  <svg viewBox="0 0 200 26" preserveAspectRatio="none" className="ind-photo-cut" aria-hidden="true">
                    <polygon points="0,26 200,3 200,26" fill="#ffffff" />
                  </svg>
                </div>
                <div className="ind-icon-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="23" height="23">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="ind-card-body">
                  <h3 className="ind-card-title">Power<br />Generation</h3>
                  <span className="ind-title-rule" aria-hidden="true"></span>
                </div>
                <svg viewBox="0 0 200 22" preserveAspectRatio="none" className="ind-card-ribbon" aria-hidden="true">
                  <path d="M52 22 C110 18 164 10 200 0 L200 22 Z" />
                </svg>
              </button>

              {/* 5. Marine & Shipping */}
              <button
                type="button"
                className="ind-card ind-card--red"
                onClick={() => navigate('/industries/marine-shipping')}
              >
                <div className="ind-photo-wrap">
                  <img
                    src="/images/service-marine.jpg"
                    alt="Container cargo ship sailing in open sea water"
                    className="ind-photo ind-photo--marine"
                    loading="lazy"
                  />
                  <svg viewBox="0 0 200 26" preserveAspectRatio="none" className="ind-photo-cut" aria-hidden="true">
                    <polygon points="0,26 200,3 200,26" fill="#ffffff" />
                  </svg>
                </div>
                <div className="ind-icon-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="23" height="23">
                    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
                    <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
                    <path d="M12 10v4" />
                    <path d="M12 2v3" />
                  </svg>
                </div>
                <div className="ind-card-body">
                  <h3 className="ind-card-title">Marine &amp;<br />Shipping</h3>
                  <span className="ind-title-rule" aria-hidden="true"></span>
                </div>
                <svg viewBox="0 0 200 22" preserveAspectRatio="none" className="ind-card-ribbon" aria-hidden="true">
                  <path d="M52 22 C110 18 164 10 200 0 L200 22 Z" />
                </svg>
              </button>

              {/* 6. Oil & Gas */}
              <button
                type="button"
                className="ind-card ind-card--navy"
                onClick={() => navigate('/industries/oil-gas')}
              >
                <div className="ind-photo-wrap">
                  <img
                    src="/images/industry-oil-gas.jpg"
                    alt="Oil extraction pump derrick at sunset"
                    className="ind-photo"
                    loading="lazy"
                  />
                  <svg viewBox="0 0 200 26" preserveAspectRatio="none" className="ind-photo-cut" aria-hidden="true">
                    <polygon points="0,26 200,3 200,26" fill="#ffffff" />
                  </svg>
                </div>
                <div className="ind-icon-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="23" height="23">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="ind-card-body">
                  <h3 className="ind-card-title">Oil &amp;<br />Gas</h3>
                  <span className="ind-title-rule" aria-hidden="true"></span>
                </div>
                <svg viewBox="0 0 200 22" preserveAspectRatio="none" className="ind-card-ribbon" aria-hidden="true">
                  <path d="M52 22 C110 18 164 10 200 0 L200 22 Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Pagination Bars */}
          <div className="industries-dots" id="industries-dots" role="tablist" aria-label="Industry slides">
            <button
              type="button"
              className={`svc-dot ${activeSlide === 0 ? 'is-active' : ''}`}
              aria-label="Industries view 1"
              onClick={() => scrollToSlide(0)}
            ></button>
            <button
              type="button"
              className={`svc-dot ${activeSlide === 1 ? 'is-active' : ''}`}
              aria-label="Industries view 2"
              onClick={() => scrollToSlide(1)}
            ></button>
          </div>
        </div>
      </div>

      {/* Bottom Asymmetric Flowing Red & Navy Wave */}
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="industries-bottom-wave" aria-hidden="true">
        <path d="M0 0 C260 22 490 48 800 48 C1080 48 1280 28 1440 6 L1440 56 L0 56 Z" fill="#D51F26" />
        <path d="M0 10 C270 30 500 52 800 52 C1080 52 1280 35 1440 16 L1440 56 L0 56 Z" fill="#08234A" />
      </svg>
    </section>
  );
}
