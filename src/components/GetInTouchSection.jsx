import React from 'react';
import { useCms } from '../context/CmsContext';

export default function GetInTouchSection({ onOpenQuote }) {
  const { pageSections } = useCms();
  const ctaSec = pageSections?.['home.cta'];
  const ctaImg = ctaSec?.image_url || '/images/get-in-touch-terminal.jpg';
  const isGraphicBanner = ctaSec?.content?.banner_mode === 'graphic' || (
    ctaSec?.content?.banner_mode !== 'text' && (
      ctaSec?.image_url?.includes('getintouch') ||
      ctaSec?.image_url?.includes('banner')
    )
  );

  if (isGraphicBanner) {
    return (
      <section id="get-in-touch" className="git-section git-section--graphic" style={{ padding: '40px 0', background: '#ffffff' }}>
        <div className="container">
          <div
            className="git-graphic-card"
            onClick={() => onOpenQuote()}
            role="button"
            tabIndex={0}
            title="Click to Request a Quote"
            style={{
              cursor: 'pointer',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(7, 25, 54, 0.18)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
          >
            <img
              src={ctaImg}
              alt={ctaSec?.title || 'Dubai Diesel Fuel Supply Partner'}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="get-in-touch" className="git-section">
      {/* Right Terminal Photo Panel */}
      <div className="git-media-panel">
        <img
          src={ctaImg}
          alt="Dubai Diesel fuel storage tanks and tanker trucks at loading bay"
          className="git-photo-img"
        />
      </div>

      {/* Left Curved Deep Navy Backdrop + Geometric Facets + Red Crescent + White Cutout */}
      <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="git-overlay-svg" aria-hidden="true">
        <defs>
          <linearGradient id="gitNavyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#052659" />
            <stop offset="55%" stopColor="#09387A" />
            <stop offset="100%" stopColor="#06285C" />
          </linearGradient>
        </defs>

        {/* White outer cutout border */}
        <path d="M0 0 L1118 0 C1008 68 902 215 858 420 L0 420 Z" fill="#ffffff" />

        {/* Crimson red crescent hugging curved split */}
        <path d="M1082 0 C998 68 898 205 846 420 L816 420 C868 218 952 78 1038 0 Z" fill="#D51F26" />

        {/* Deep royal navy curved primary backdrop */}
        <path d="M0 0 L1048 0 C948 74 862 218 818 420 L0 420 Z" fill="url(#gitNavyGrad)" />

        {/* Subtle diagonal translucent geometric prism facets */}
        <polygon points="0,0 280,0 0,145" fill="rgba(59, 130, 246, 0.22)" />
        <polygon points="0,0 165,0 0,195" fill="rgba(147, 197, 253, 0.14)" />
        <polygon points="360,404 826,312 816,412" fill="rgba(4, 24, 58, 0.34)" />

        {/* Clean bottom upward white slant */}
        <polygon points="0,394 888,420 0,420" fill="#ffffff" />
      </svg>

      <div className="container git-container">
        <div className="git-content-row">
          {/* Left Copy & CTA */}
          <div className="git-cta-block">
            <div className="git-eyebrow">
              <span className="eyebrow-short-red" aria-hidden="true"></span>
              <span>Get in Touch</span>
            </div>

            <h2 className="git-title">
              {ctaSec?.title ? (
                ctaSec.title
              ) : (
                <>
                  Need a Reliable
                  <br />
                  <span className="git-title-red">Fuel Supply Partner?</span>
                </>
              )}
            </h2>

            <p className="git-subtitle">
              {ctaSec?.subtitle || 'Get a competitive quote for diesel and fuel supply tailored to your business needs across the UAE.'}
            </p>

            <button type="button" className="git-cta-btn" onClick={() => onOpenQuote()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>Request a Fuel Supply Quote</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Thin Vertical White Divider */}
          <span className="git-vertical-sep" aria-hidden="true"></span>

          {/* 3 Vertical Value Highlights */}
          <div className="git-highlights">
            <div className="git-highlight-item">
              <div className="git-highlight-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
              </div>
              <span>Quick Response</span>
            </div>

            <div className="git-highlight-item">
              <div className="git-highlight-icon" aria-hidden="true">
                <svg viewBox="0 0 32 28" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="22" height="20">
                  <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" />
                  <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" />
                  <path d="M2.5 11.5L5.5 16.5L8.2 14.5" />
                  <path d="M29.5 9.5L27 15.5L24 14" />
                </svg>
              </div>
              <span>Tailored Solutions</span>
            </div>

            <div className="git-highlight-item">
              <div className="git-highlight-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span>Reliable Supply</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
