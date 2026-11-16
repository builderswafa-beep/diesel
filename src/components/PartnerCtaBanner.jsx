// src/components/PartnerCtaBanner.jsx
// Unified, professional "Partner with Dubai Diesel" CTA banner used across all pages.
// Displays live semantic headings, descriptions, and interactive quote button.

import React from 'react';
import { useCms } from '../context/CmsContext';

export default function PartnerCtaBanner({
  pageSlug = 'about',
  sectionKey = 'cta',
  defaultTitle = 'Partner with a Trusted Fuel Supply Company in the UAE',
  defaultSubtitle = 'Get reliable, safe, and efficient fuel solutions tailored to your business operations across the UAE.',
  defaultButtonText = 'Request a Quote',
  productKey,
  onOpenQuote,
  className = '',
}) {
  const { pageSections } = useCms();
  const ctaSec = pageSections?.[`${pageSlug}.${sectionKey}`];

  const title = ctaSec?.title || defaultTitle;
  const subtitle = ctaSec?.subtitle || defaultSubtitle;
  const buttonText = ctaSec?.content?.button_text || defaultButtonText;
  const bgImg = ctaSec?.image_url || '/images/cta-skyline-clean.jpg';

  const handleClick = () => {
    if (typeof onOpenQuote === 'function') {
      if (productKey) {
        onOpenQuote(productKey);
      } else {
        onOpenQuote();
      }
    }
  };

  return (
    <section className={`dd-cta-section ${className}`}>
      <div className="container">
        <div className="dd-cta-card">
          {/* High-Resolution Clean Dubai Dusk Skyline Background */}
          <img
            src={bgImg}
            alt="Dubai skyline panorama at dusk"
            className="dd-cta-bg-img"
            aria-hidden="true"
          />
          {/* Deep Navy Gradient Scrim Overlay for contrast */}
          <div className="dd-cta-overlay" aria-hidden="true"></div>

          {/* Live Semantic Content */}
          <div className="dd-cta-content">
            <div className="dd-cta-text-block">
              <div className="dd-cta-eyebrow">
                <span className="dd-cta-dash" aria-hidden="true"></span>
                <span>PARTNER WITH DUBAI DIESEL</span>
              </div>
              <h2 className="dd-cta-title">{title}</h2>
              <p className="dd-cta-desc">{subtitle}</p>
            </div>

            <div className="dd-cta-action">
              <button
                type="button"
                className="dd-cta-btn"
                onClick={handleClick}
                aria-label={`${buttonText} - ${title}`}
              >
                <span>{buttonText}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
