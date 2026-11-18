// src/pages/ServiceDetail.jsx
// Reusable, professional Service & Industry Detail Page template for Dubai Diesel Trading L.L.C.
// Faithfully matches media_1794560450690_76d6df76.jpg reference design.

import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { serviceDetails, serviceCardSummaries } from '../data/serviceDetails';
import { industryDetails, industryCardSummaries } from '../data/industryDetails';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCms } from '../context/CmsContext';
import PartnerCtaBanner from '../components/PartnerCtaBanner';

// Reusable SVG Icon Helper
function DetailIcon({ name, size = 24, color = '#D51F26' }) {
  switch (name) {
    case 'droplet':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case 'shield-check':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'headset':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      );
    case 'clock':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'tag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
    case 'activity':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'anchor':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="5" r="3" />
          <line x1="12" y1="8" x2="12" y2="21" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      );
    case 'award':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      );
    case 'excavator':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M2 17h16" />
          <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M15 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M7 11V6h5l3 5" />
          <path d="M17 11l4-5 1 2-3 4" />
        </svg>
      );
    case 'generator':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <rect x="2" y="6" width="20" height="13" rx="2" />
          <path d="M13 10l-3 4h4l-2 3" />
          <line x1="6" y1="2" x2="6" y2="6" />
          <line x1="18" y1="2" x2="18" y2="6" />
        </svg>
      );
    case 'tower-crane':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <line x1="4" y1="22" x2="20" y2="22" />
          <line x1="8" y1="22" x2="8" y2="4" />
          <line x1="5" y1="4" x2="22" y2="4" />
          <line x1="8" y1="8" x2="14" y2="4" />
          <line x1="18" y1="4" x2="18" y2="10" />
          <circle cx="18" cy="11" r="1" />
        </svg>
      );
    case 'barrier':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M4 6h16v8H4z" />
          <line x1="4" y1="14" x2="2" y2="21" />
          <line x1="20" y1="14" x2="22" y2="21" />
          <line x1="8" y1="6" x2="14" y2="14" />
          <line x1="14" y1="6" x2="20" y2="14" />
          <line x1="4" y1="8" x2="9" y2="14" />
        </svg>
      );
    case 'factory':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        </svg>
      );
    case 'cogs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'forklift':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="6" cy="18" r="2" />
          <circle cx="16" cy="18" r="2" />
          <path d="M4 16h12" />
          <path d="M4 16V6h6l4 5h4v5" />
          <line x1="22" y1="6" x2="22" y2="18" />
          <line x1="18" y1="18" x2="22" y2="18" />
        </svg>
      );
    case 'warehouse':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M3 21V9l9-6 9 6v12" />
          <path d="M9 21v-8h6v8" />
        </svg>
      );
    case 'bus':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case 'crane':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <polyline points="2 20 6 4 16 4 20 12" />
          <line x1="2" y1="20" x2="22" y2="20" />
          <line x1="16" y1="4" x2="16" y2="10" />
        </svg>
      );
    case 'hospital':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
          <line x1="12" y1="7" x2="12" y2="13" />
          <line x1="9" y1="10" x2="15" y2="10" />
        </svg>
      );
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'ship':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.03" />
          <line x1="12" y1="10" x2="12" y2="4" />
          <line x1="8" y1="6" x2="16" y2="6" />
        </svg>
      );
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case 'life-buoy':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
        </svg>
      );
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}

export default function ServiceDetail({ onOpenQuote }) {
  useScrollReveal();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { pageSections, services } = useCms();

  // Normalize id (strip optional .html)
  const cleanId = (id || 'diesel-supply').replace(/\.html$/, '').toLowerCase();
  const data = serviceDetails[cleanId] || industryDetails[cleanId] || serviceDetails['diesel-supply'];

  // Map to CMS page slug
  const serviceKeyMap = {
    'diesel-supply': 'service-diesel',
    'industrial-fuel': 'service-industrial',
    'marine-fuel': 'service-marine',
    'generator-fuel': 'service-generator',
    'bulk-fuel-supply': 'service-bulk',
    'fuel-storage-distribution': 'service-storage',
    'storage-distribution': 'service-storage',
  };
  const pageSlug = serviceKeyMap[cleanId] || `service-${cleanId}`;
  const heroSec = pageSections?.[`${pageSlug}.hero`] || pageSections?.[`${cleanId}.hero`];
  const overviewSec = pageSections?.[`${pageSlug}.overview`] || pageSections?.[`${cleanId}.overview`];
  const benefitsSec = pageSections?.[`${pageSlug}.benefits`] || pageSections?.[`${cleanId}.benefits`];

  const srvCms = services?.find(
    (s) =>
      s.service_id === cleanId ||
      s.service_id === pageSlug ||
      (cleanId === 'fuel-storage-distribution' && s.service_id === 'storage-distribution') ||
      (cleanId === 'storage-distribution' && s.service_id === 'fuel-storage-distribution')
  );

  const heroImg = heroSec?.image_url || srvCms?.hero_image || data.heroImage;
  const heroTitle = heroSec?.title || srvCms?.title || data.heroTitle;
  const heroSubtitle = heroSec?.subtitle || srvCms?.subtitle || data.heroSubtitle;
  const overviewImg = overviewSec?.image_url || srvCms?.overview_image || data.overviewImage;
  const overviewTitle = overviewSec?.title || `${data.overviewTitle} ${data.overviewTitleHighlight}`;
  const overviewDesc = overviewSec?.subtitle || srvCms?.overview || data.overviewDesc;
  const benefitsPhoto = benefitsSec?.image_url || srvCms?.benefits_image || data.benefitsPhoto;

  // Determine breadcrumb category and link based on route and data
  const isFromServices = location.pathname.startsWith('/services') || Boolean(serviceDetails[cleanId]);
  const parentCategory = data.breadcrumbCategory || (isFromServices ? 'Our Services' : 'Industries');
  const parentLink = data.breadcrumbLink || (isFromServices ? '/services' : '/industries');

  useEffect(() => {
    document.title = `${heroTitle} | Dubai Diesel Trading L.L.C.`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [cleanId, heroTitle]);

  return (
    <main className="dtl-page">
      {/* 1. HERO BANNER WITH SIGNATURE SWOOSH */}
      <section className="dtl-hero unified-hero">
        <div className="dtl-hero-bg-container" aria-hidden="true">
          <img
            src={heroImg}
            alt={`${heroTitle} fuel supply services by Dubai Diesel`}
            className="dtl-hero-img"
          />
          <div className="dtl-hero-gradient-left"></div>
        </div>

        <div className="container dtl-hero-container">
          {/* Breadcrumb: Home > Our Services / Industries > [Service / Industry] */}
          <nav className="dtl-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="dtl-crumb-home">Home</Link>
            <span aria-hidden="true" className="dtl-crumb-sep">&rsaquo;</span>
            <Link to={parentLink} className="dtl-crumb-mid">{parentCategory}</Link>
            <span aria-hidden="true" className="dtl-crumb-sep">&rsaquo;</span>
            <span className="dtl-crumb-curr">{heroTitle}</span>
          </nav>

          <div className="dtl-hero-content">
            <div className="dtl-hero-heading-wrap">
              <span className="dtl-dash" aria-hidden="true"></span>
              <h1 className="dtl-hero-title">{heroTitle}</h1>
            </div>

            <p className="dtl-hero-subtitle">{heroSubtitle}</p>

            <button
              type="button"
              className="hero-get-in-touch-btn"
              onClick={() => onOpenQuote(data.productKey)}
            >
              <span>Get in Touch</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero bottom curved waves: Navy + Crimson */}
        <div className="dtl-hero-wave-wrap" aria-hidden="true">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="dtl-hero-wave-svg">
            <path
              d="M0 48 C 360 48, 620 20, 1020 20 C 1220 20, 1360 36, 1440 48 L 1440 48 L 0 48 Z"
              fill="#0A2246"
            />
            <path
              d="M0 48 C 420 48, 720 28, 1140 28 C 1300 28, 1390 40, 1440 48 L 1440 48 L 0 48 Z"
              fill="#D51F26"
            />
          </svg>
        </div>
      </section>

      {/* 2. SERVICE OVERVIEW (2 Columns: Photo Left, Text + CTA Right) */}
      <section className="dtl-section dtl-overview-section">
        <div className="container">
          <div className="dtl-overview-grid">
            {/* Left Column: Photo Card */}
            <div className="dtl-overview-media-col reveal-on-scroll">
              <div className="dtl-overview-card-media">
                <img
                  src={overviewImg}
                  alt={data.overviewImageAlt || heroTitle}
                  className="dtl-overview-img"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="dtl-overview-content-col reveal-on-scroll">
              <div className="dtl-eyebrow">
                <span className="dtl-eyebrow-line" aria-hidden="true"></span>
                <span className="dtl-eyebrow-text">{data.overviewEyebrow}</span>
              </div>

              <h2 className="dtl-section-title">
                {overviewTitle}
              </h2>

              <p className="dtl-overview-desc">{overviewDesc}</p>

              <button
                type="button"
                className="btn-primary dtl-btn-pill"
                onClick={() => onOpenQuote(data.productKey)}
              >
                <span>Request a Quote</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE & KEY BENEFITS SECTION */}
      <section className="dtl-section dtl-why-benefits-section">
        <div className="container">
          {/* Row 1: Why Choose Heading (Left) + 4-Pillar Floating Pill Bar (Right) */}
          <div className="dtl-why-row reveal-on-scroll">
            <div className="dtl-why-text-col">
              <div className="dtl-eyebrow">
                <span className="dtl-eyebrow-line" aria-hidden="true"></span>
                <h3 className="dtl-why-title">
                  {data.whyChooseTitle}{' '}
                  <span className="text-red">{data.whyChooseTitleHighlight}</span>{' '}
                  {data.whyChooseTitleSuffix}
                </h3>
              </div>
              <p className="dtl-why-desc">{data.whyChooseDesc}</p>
            </div>

            <div className="dtl-why-pillars-col">
              <div className="dtl-pillars-pill-box">
                {data.pillars.map((pil, idx) => (
                  <div key={pil.id} className="dtl-pillar-item">
                    <div className="dtl-pillar-icon-wrap" aria-hidden="true">
                      <DetailIcon name={pil.icon} size={28} color="#D51F26" />
                    </div>
                    <div className="dtl-pillar-text">
                      <span className="dtl-pillar-line1">{pil.label}</span>
                      <span className="dtl-pillar-line2">{pil.sublabel}</span>
                    </div>
                    {idx < data.pillars.length - 1 && (
                      <div className="dtl-pillar-divider" aria-hidden="true"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Heavy Equipment Photo (Left) + Key Benefits Checklist (Right) */}
          <div className="dtl-benefits-row">
            <div className="dtl-benefits-media-col reveal-on-scroll">
              <div className="dtl-benefits-card-media">
                <img
                  src={benefitsPhoto}
                  alt={data.benefitsPhotoAlt || heroTitle}
                  className="dtl-benefits-img"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="dtl-benefits-list-col reveal-on-scroll">
              <div className="dtl-eyebrow">
                <span className="dtl-eyebrow-line" aria-hidden="true"></span>
                <h3 className="dtl-benefits-title">{data.benefitsEyebrow}</h3>
              </div>

              <ul className="dtl-checklist" role="list">
                {data.keyBenefits.map((item, idx) => (
                  <li key={idx} className="dtl-checklist-item">
                    <span className="dtl-check-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                        <circle cx="10" cy="10" r="10" fill="#D51F26" />
                        <path
                          d="M6 10.2L8.6 13L14 7.5"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="dtl-checklist-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLICATIONS IN [INDUSTRY] (4 CARDS) */}
      <section className="dtl-section dtl-applications-section">
        <div className="container">
          <div className="dtl-section-header reveal-on-scroll">
            <div className="dtl-eyebrow">
              <span className="dtl-eyebrow-line" aria-hidden="true"></span>
              <h2 className="dtl-apps-heading">{data.applicationsTitle}</h2>
            </div>
          </div>

          <div className="dtl-apps-grid">
            {data.applications.map((app) => (
              <div key={app.id} className="dtl-app-card reveal-on-scroll">
                <div className="dtl-app-icon-circle" aria-hidden="true">
                  <DetailIcon name={app.icon} size={26} color="#D51F26" />
                </div>
                <h3 className="dtl-app-card-title">{app.title}</h3>
                <p className="dtl-app-card-desc">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RELATED SERVICES (3 CARDS) */}
      <section className="dtl-section dtl-related-section">
        <div className="container">
          <div className="dtl-section-header reveal-on-scroll">
            <div className="dtl-eyebrow">
              <span className="dtl-eyebrow-line" aria-hidden="true"></span>
              <h2 className="dtl-related-heading">{data.relatedTitle}</h2>
            </div>
          </div>

          <div className="dtl-related-grid">
            {data.related.map((relId) => {
              const rel = serviceCardSummaries[relId] || industryCardSummaries[relId];
              if (!rel) return null;
              const targetRoute = serviceDetails[relId] ? `/services/${rel.id}` : `/industries/${rel.id}`;
              return (
                <div
                  key={rel.id}
                  className="dtl-related-card reveal-on-scroll"
                  onClick={() => navigate(targetRoute)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(targetRoute);
                    }
                  }}
                >
                  <div className="dtl-related-media">
                    <img src={rel.image} alt={rel.title} loading="lazy" />
                  </div>

                  <div className="dtl-related-footer">
                    <h3 className="dtl-related-card-title">{rel.title}</h3>
                    <div className="dtl-related-arrow-btn" aria-label={`View ${rel.title} details`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom thin wave accent */}
                  <svg viewBox="0 0 300 8" preserveAspectRatio="none" className="dtl-related-accent" aria-hidden="true">
                    <path d="M0 8 C 120 7, 240 3, 300 0 L 300 8 Z" fill="#D51F26" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. DUSK SKYLINE CTA BANNER */}
      <PartnerCtaBanner
        pageSlug={pageSlug}
        sectionKey="cta"
        defaultTitle={data.ctaTitle || 'Need High-Quality Fuel Delivered to Your Site?'}
        defaultSubtitle={data.ctaSubtitle || 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'}
        productKey={data.productKey}
        onOpenQuote={onOpenQuote}
      />
    </main>
  );
}
