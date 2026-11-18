// src/pages/Gallery.jsx
// Premium Corporate Photo & Facility Gallery for Dubai Diesel Trading L.L.C.
// Showcases fuel storage terminals, delivery tanker fleet, and on-site distribution operations.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCms } from '../context/CmsContext';
import PartnerCtaBanner from '../components/PartnerCtaBanner';

export const galleryItems = [
  {
    id: 'gallery-1',
    title: 'Dubai Diesel Storage Terminal & Vertical Tanks',
    category: 'Storage Terminals',
    categoryId: 'terminals',
    image: '/images/about-terminal.jpg',
    caption: 'Bulk fuel storage tanks with dedicated gantry pumping systems adhering to UAE civil defense safety standards.'
  },
  {
    id: 'gallery-2',
    title: 'Dubai Diesel Highway Delivery Tanker Fleet',
    category: 'Delivery Fleet',
    categoryId: 'fleet',
    image: '/images/about-tanker.jpg',
    caption: 'Certified road tankers equipped with calibrated digital flow meters for rapid on-site dispatch across the UAE.'
  },
  {
    id: 'gallery-3',
    title: 'Vertical Bulk Fuel Storage Tanks with Official Signage',
    category: 'Storage Terminals',
    categoryId: 'terminals',
    image: '/images/about-bento-tank.jpg',
    caption: 'High-capacity vertical fuel reservoirs with bilingual Dubai Diesel Trading L.L.C. branding.'
  },
  {
    id: 'gallery-4',
    title: 'Gantry Fuel Loading & Metering Bay',
    category: 'Delivery Fleet',
    categoryId: 'fleet',
    image: '/images/about-bento-truck-bottom.jpg',
    caption: 'Automated loading gantry ensuring zero contamination and strict fuel provenance before road dispatch.'
  },
  {
    id: 'gallery-5',
    title: 'Construction Heavy Equipment On-Site Refueling',
    category: 'Industrial & Sites',
    categoryId: 'industrial',
    image: '/images/industry-construction.jpg',
    caption: 'Direct-to-tank mobile fuel supply powering hydraulic excavators and tower cranes on UAE mega-projects.'
  },
  {
    id: 'gallery-6',
    title: 'Manufacturing & Industrial Plant Fuel Support',
    category: 'Industrial & Sites',
    categoryId: 'industrial',
    image: '/images/industry-manufacturing.jpg',
    caption: 'Continuous industrial gas oil delivery supporting 24/7 manufacturing plants, boilers, and production lines.'
  },
  {
    id: 'gallery-8',
    title: 'Standby Diesel Generators for Emergency Backup Power',
    category: 'Industrial & Sites',
    categoryId: 'industrial',
    image: '/images/service-generator.jpg',
    caption: 'Dedicated generator fuel delivery ensuring zero downtime for critical commercial and industrial facilities.'
  },
  {
    id: 'gallery-9',
    title: 'Bulk Fuel Logistics & Regional Transport Delivery',
    category: 'Delivery Fleet',
    categoryId: 'fleet',
    image: '/images/service-bulk.jpg',
    caption: 'Multi-compartment highway road tankers delivering high-volume diesel across Dubai, Abu Dhabi, and Northern Emirates.'
  },
  {
    id: 'gallery-10',
    title: 'Oil & Gas Exploration & Field Operations Fueling',
    category: 'Industrial & Sites',
    categoryId: 'industrial',
    image: '/images/industry-oil-gas.jpg',
    caption: 'Dependable fuel supply for drilling rigs, extraction plants, and remote energy operations.'
  },
  {
    id: 'gallery-11',
    title: 'Dubai Diesel Corporate Terminal Headquarters',
    category: 'Storage Terminals',
    categoryId: 'terminals',
    image: '/images/about-hero-terminal-exact.jpg',
    caption: 'Corporate operations center and main terminal facilities located in Dubai, United Arab Emirates.'
  },
  {
    id: 'gallery-12',
    title: 'Fleet Staging & Logistics Maintenance Yard',
    category: 'Delivery Fleet',
    categoryId: 'fleet',
    image: '/images/services-hero-tanker.jpg',
    caption: 'Dedicated vehicle depot where our logistics fleet undergoes routine safety, metering, and pressure inspections.'
  }
];

export const galleryCategories = [
  { id: 'all', label: 'All Photos' },
  { id: 'terminals', label: 'Storage Terminals' },
  { id: 'fleet', label: 'Delivery Fleet' },
  { id: 'industrial', label: 'Industrial & Sites' },
];

export default function Gallery({ onOpenQuote }) {
  useScrollReveal();
  const { pageSections, gallery } = useCms();
  const heroSec = pageSections?.['gallery.hero'];
  const heroImg = heroSec?.image_url || '/images/gallery-hero-banner.jpg';
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    document.title = 'Corporate Gallery | Dubai Diesel Trading LLC — Facilities & Fleet';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categoryNameMap = {
    terminals: 'Storage Terminals',
    fleet: 'Delivery Fleet',
    industrial: 'Industrial & Sites',
  };

  const activeGalleryItems = gallery && gallery.length > 0
    ? gallery
        .filter((g) => g.category !== 'marine')
        .map((g) => ({
          id: g.id,
          title: g.title,
          category: categoryNameMap[g.category] || g.category || 'General',
          categoryId: g.category,
          image: g.image_url || g.image,
          caption: g.caption || '',
        }))
    : galleryItems.filter((item) => item.categoryId !== 'marine');

  const filteredItems = activeCategory === 'all'
    ? activeGalleryItems
    : activeGalleryItems.filter((item) => item.categoryId === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activePhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <main className="gallery-page">
      {/* 1. HERO BANNER */}
      <section className="proj-hero unified-hero">
        <div className="proj-hero-bg-container" aria-hidden="true">
          <img
            src={heroImg}
            alt="Dubai Diesel fuel storage tanks and terminal facility"
            className="proj-hero-img"
          />
          <div className="proj-hero-gradient-left"></div>
        </div>

          <div className="container proj-hero-container">
            <div className="proj-breadcrumb">
              <Link to="/" className="proj-crumb-home">Home</Link>
              <span className="proj-crumb-sep">&gt;</span>
              <span className="proj-crumb-current">Gallery</span>
            </div>

            <div className="proj-hero-heading-wrap">
              <span className="proj-dash" aria-hidden="true"></span>
              <h1 className="proj-hero-title">
                {heroSec?.title ? (
                  heroSec.title
                ) : (
                  <>
                    Corporate <span className="text-red">Gallery</span>
                  </>
                )}
              </h1>
            </div>

            <p className="proj-hero-subtitle">
              {heroSec?.subtitle || 'A visual showcase of our fuel storage terminals, dedicated road tanker fleet, and professional fueling operations across the UAE.'}
            </p>

            <button
              type="button"
              className="hero-get-in-touch-btn"
              onClick={() => onOpenQuote()}
            >
              <span>Get in Touch</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Bottom Asymmetric Flowing Red & Navy Wave */}
          <div className="proj-hero-wave-wrap" aria-hidden="true">
            <svg viewBox="0 0 1440 38" preserveAspectRatio="none" className="proj-hero-wave-svg">
              <path d="M0 38 C420 36 780 20 1140 4 C1280 -2 1380 0 1440 0 V38 H0 Z" fill="#D51F26" />
              <path d="M0 38 C360 38 720 24 1080 8 C1240 2 1360 0 1440 0 V38 H0 Z" fill="#0A2246" />
            </svg>
          </div>
        </section>

      {/* 2. CATEGORY FILTER BAR */}
      <section className="gallery-filter-section">
        <div className="container">
          <div className="gallery-filter-pill-container" role="tablist" aria-label="Gallery category filters">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`gallery-filter-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PHOTO GRID */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openLightbox(idx);
                  }
                }}
              >
                <div className="gallery-media-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="gallery-img"
                  />
                  <div className="gallery-hover-overlay">
                    <span className="gallery-cat-badge">{item.category}</span>
                    <h3 className="gallery-card-title">{item.title}</h3>
                    <div className="gallery-zoom-circle" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="20" height="20">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIGHTBOX MODAL */}
      {lightboxIndex !== null && activePhoto && (
        <div className="gallery-lightbox-backdrop" onClick={closeLightbox}>
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close photo preview"
            >
              &times;
            </button>

            <button
              type="button"
              className="gallery-lightbox-nav prev"
              onClick={prevLightbox}
              aria-label="Previous photo"
            >
              &#8249;
            </button>

            <button
              type="button"
              className="gallery-lightbox-nav next"
              onClick={nextLightbox}
              aria-label="Next photo"
            >
              &#8250;
            </button>

            <div className="gallery-lightbox-figure">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="gallery-lightbox-img"
              />
              <div className="gallery-lightbox-caption-bar">
                <div className="gallery-lightbox-meta">
                  <span className="gallery-lightbox-badge">{activePhoto.category}</span>
                  <span className="gallery-lightbox-counter">
                    {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <h2 className="gallery-lightbox-title">{activePhoto.title}</h2>
                <p className="gallery-lightbox-desc">{activePhoto.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CTA BANNER */}
      <PartnerCtaBanner
        pageSlug="gallery"
        sectionKey="cta"
        defaultTitle="Looking for a Reliable Fuel Supply Partner?"
        defaultSubtitle="Get in touch with our team for a tailored fuel supply and storage solution for your business in the UAE."
        productKey="Ultra Low Sulfur Diesel (10ppm)"
        onOpenQuote={onOpenQuote}
      />
    </main>
  );
}
