import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '../data/catalog';
import { useCms } from '../context/CmsContext';

export default function ServicesSection({ onOpenQuote }) {
  const navigate = useNavigate();
  const { pageSections } = useCms();
  const svcSec = pageSections?.['home.services'];
  const viewportRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const totalDots = 5;

  const getStepWidth = () => {
    if (!viewportRef.current) return 262;
    const card = viewportRef.current.querySelector('.svc-card');
    if (!card) return 262;
    const grid = card.parentElement;
    const gap = grid ? parseFloat(window.getComputedStyle(grid).gap) || 16 : 16;
    return card.offsetWidth + gap;
  };

  const handleScroll = () => {
    if (!viewportRef.current) return;
    const maxScroll = viewportRef.current.scrollWidth - viewportRef.current.clientWidth;
    if (maxScroll <= 0) return;
    const progress = viewportRef.current.scrollLeft / maxScroll;
    const activeIdx = Math.min(
      totalDots - 1,
      Math.max(0, Math.round(progress * (totalDots - 1)))
    );
    setActiveDot(activeIdx);
  };

  const scrollPrev = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
    }
  };

  const scrollToDot = (idx) => {
    if (!viewportRef.current) return;
    const maxScroll = Math.max(1, viewportRef.current.scrollWidth - viewportRef.current.clientWidth);
    const targetScroll = (maxScroll / Math.max(1, totalDots - 1)) * idx;
    viewportRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setActiveDot(idx);
  };

  // Mouse drag support
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;
    let dragThresholdPassed = false;

    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      isDown = true;
      dragThresholdPassed = false;
      startX = e.pageX - viewport.offsetLeft;
      scrollLeftStart = viewport.scrollLeft;
      viewport.style.cursor = 'grab';
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      const x = e.pageX - viewport.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) > 5) {
        dragThresholdPassed = true;
        viewport.style.cursor = 'grabbing';
        viewport.style.userSelect = 'none';
      }
      viewport.scrollLeft = scrollLeftStart - walk;
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      viewport.style.cursor = '';
      viewport.style.removeProperty('user-select');
    };

    viewport.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      viewport.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <section id="services" className="services-section">
      <div className="services-bg-facet" aria-hidden="true"></div>

      <div className="container services-header-row">
        <div className="services-heading-group">
          <div className="section-eyebrow">
            <span className="eyebrow-short-red" aria-hidden="true"></span>
            <span>Our Services</span>
          </div>
          <h2 className="section-title">
            {svcSec?.title ? (
              svcSec.title.includes('&') ? (
                <>
                  {svcSec.title.split('&')[0]}
                  <span className="text-red">&amp;{svcSec.title.split('&')[1]}</span>
                </>
              ) : (
                svcSec.title
              )
            ) : (
              <>Comprehensive <span className="text-red">Diesel &amp; Fuel</span> Services</>
            )}
          </h2>
          <p className="services-subtitle">
            {svcSec?.subtitle || 'End-to-end fuel trading and supply solutions, ensuring reliable, safe, and on-time delivery across the UAE.'}
          </p>
        </div>

        <div className="services-nav-arrows">
          <button
            type="button"
            className="svc-arrow-btn svc-arrow-prev"
            id="svc-prev-btn"
            aria-label="Previous service card"
            onClick={scrollPrev}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="18" height="18" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="svc-arrow-btn svc-arrow-next"
            id="svc-next-btn"
            aria-label="Next service card"
            onClick={scrollNext}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="18" height="18" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="services-carousel-viewport"
        ref={viewportRef}
        onScroll={handleScroll}
      >
        <div className="services-track" id="services-track">
          {servicesData.map((svc) => (
            <article
              key={svc.id}
              className={`svc-card ${svc.theme}`}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/services/${svc.id}`)}
            >
              <div className="svc-media">
                <img src={svc.image} alt={svc.title} />
                <svg viewBox="0 0 300 38" preserveAspectRatio="none" className="svc-media-cut" aria-hidden="true">
                  <path d="M0 36 L300 0 L300 38 L0 38 Z" fill="#ffffff" />
                </svg>
              </div>
              <div className="svc-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
                  <path d="M3 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17" />
                  <path d="M13 10h2a2 2 0 0 1 2 2v4a2 2 0 0 0 4 0v-6l-2.5-2.5" />
                  <rect x="6" y="6" width="4" height="4" rx="0.5" />
                  <line x1="2" y1="22" x2="14" y2="22" />
                </svg>
              </div>
              <div className="svc-body">
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <div style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: svc.theme === 'svc-theme-red' ? '#D51F26' : '#0A2246' }}>
                  <span>Learn More</span>
                  <span>&rarr;</span>
                </div>
              </div>
              <svg viewBox="0 0 300 18" preserveAspectRatio="none" className="svc-bottom-curve" aria-hidden="true">
                <path d="M0 18 C135 16 245 12 300 0 L300 18 Z" fill="currentColor" />
              </svg>
            </article>
          ))}
        </div>
      </div>

      <div className="services-dots" id="services-dots" role="tablist" aria-label="Services carousel slides">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`svc-dot ${activeDot === idx ? 'is-active' : ''}`}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => scrollToDot(idx)}
          ></button>
        ))}
      </div>
    </section>
  );
}
