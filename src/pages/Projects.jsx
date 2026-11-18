// src/pages/Projects.jsx
// Faithful implementation of Dubai Diesel Trading L.L.C. Our Projects Page
// Exactly matches media_1794566033912_49a73d29.jpg reference design.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectCategories, projectsList as fallbackProjects, projectHighlights } from '../data/projectsData';
import { useCms } from '../context/CmsContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PartnerCtaBanner from '../components/PartnerCtaBanner';

// Reusable SVG Icon Helper for Projects
function ProjectIcon({ name, size = 18, color = '#D51F26' }) {
  switch (name) {
    case 'crane':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <line x1="4" y1="22" x2="20" y2="22" />
          <line x1="8" y1="22" x2="8" y2="4" />
          <line x1="5" y1="4" x2="22" y2="4" />
          <line x1="8" y1="8" x2="14" y2="4" />
          <line x1="18" y1="4" x2="18" y2="10" />
          <circle cx="18" cy="11" r="1" />
        </svg>
      );
    case 'factory':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'lightning':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'ship':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.03" />
          <line x1="12" y1="10" x2="12" y2="4" />
          <line x1="8" y1="6" x2="16" y2="6" />
        </svg>
      );
    case 'oil-rig':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="6" y1="22" x2="10" y2="6" />
          <line x1="18" y1="22" x2="14" y2="6" />
          <line x1="10" y1="6" x2="14" y2="6" />
          <line x1="8" y1="14" x2="16" y2="14" />
          <line x1="7" y1="18" x2="17" y2="18" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <path d="M4 10l8-4 8 4" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'hard-hat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
          <path d="M10 15V6a2 2 0 0 1 4 0v9" />
          <path d="M4 15a8 8 0 0 1 16 0" />
        </svg>
      );
    case 'handshake':
      return (
        <svg viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
          <path d="M2.5 11.5L7.5 7.5L12.5 10.5L17.5 7.5L24.5 12.5L29.5 9.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 13.5L10.8 19.2C11.7 20.1 13.1 20.1 14 19.2L15.2 18M15.2 18L17.2 19.8C18.1 20.6 19.4 20.5 20.2 19.6L21.5 18.2M15.2 18L12.5 15.3M21.5 18.2L23.5 16.2C24.3 15.4 24.3 14.1 23.5 13.3L19.5 9.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 11.5L5.5 16.5L8.2 14.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M29.5 9.5L27 15.5L24 14" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'award':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default function Projects({ onOpenQuote }) {
  useScrollReveal();
  const { projects: cmsProjects, pageSections } = useCms();
  const [activeFilter, setActiveFilter] = useState('all');

  const projectsList = (cmsProjects && cmsProjects.length > 0) ? cmsProjects : fallbackProjects;
  const heroSection = pageSections?.['projects.hero'];
  const heroImg = heroSection?.image_url || '/images/projects-hero-banner.jpg';

  useEffect(() => {
    document.title = 'Our Projects | Dubai Diesel Trading L.L.C. — Fuel Supply Solutions';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Robust category matching supporting CMS keys ('power' vs 'power-generation', 'marine' vs 'marine-shipping')
  const matchesCategory = (project, filterId) => {
    if (!filterId || filterId === 'all') return true;
    const catKey = (project.categoryKey || project.category_key || '').toLowerCase().trim();
    const catLabel = (project.categoryLabel || project.category_label || '').toLowerCase().trim();
    const target = filterId.toLowerCase().trim();

    if (catKey === target || catLabel === target) return true;

    // Power Generation aliases
    if ((target === 'power-generation' || target === 'power') &&
        (catKey === 'power' || catKey === 'power-generation' || catLabel.includes('power'))) {
      return true;
    }

    // Marine & Shipping aliases
    if ((target === 'marine-shipping' || target === 'marine') &&
        (catKey === 'marine' || catKey === 'marine-shipping' || catLabel.includes('marine') || catLabel.includes('ship'))) {
      return true;
    }

    // Oil & Gas aliases
    if ((target === 'oil-gas' || target === 'oil') &&
        (catKey === 'oil-gas' || catKey === 'oil' || catLabel.includes('oil'))) {
      return true;
    }

    // Construction aliases
    if (target === 'construction' && (catKey.includes('construct') || catLabel.includes('construct'))) {
      return true;
    }

    // Manufacturing aliases
    if (target === 'manufacturing' && (catKey.includes('manufactur') || catLabel.includes('manufactur'))) {
      return true;
    }

    // Logistics aliases
    if (target === 'logistics' && (catKey.includes('logistic') || catLabel.includes('logistic'))) {
      return true;
    }

    return false;
  };

  // Filter projects by active category
  const filteredProjects = activeFilter === 'all'
    ? projectsList
    : projectsList.filter((p) => matchesCategory(p, activeFilter));

  return (
    <main className="proj-page">
      {/* 1. HERO BANNER */}
      <section className="proj-hero unified-hero">
        <div className="proj-hero-bg-container" aria-hidden="true">
          <img
            src={heroImg}
            alt="Dubai Diesel bulk fuel storage terminal with skyline"
            className="proj-hero-img"
          />
          <div className="proj-hero-gradient-left"></div>
        </div>

        <div className="container proj-hero-container">
          <div className="proj-hero-content">
            {/* Breadcrumb: Home > Our Projects */}
            <nav className="proj-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="proj-crumb-home">Home</Link>
              <span aria-hidden="true" className="proj-crumb-sep">&rsaquo;</span>
              <span className="proj-crumb-curr">Our Projects</span>
            </nav>

            <div className="proj-hero-heading-wrap">
              <span className="proj-dash" aria-hidden="true"></span>
              <h1 className="proj-hero-title">
                {heroSection?.title ? (
                  heroSection.title.includes(' ') ? (
                    <>
                      {heroSection.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="text-red">{heroSection.title.split(' ').slice(-1).join(' ')}</span>
                    </>
                  ) : (
                    heroSection.title
                  )
                ) : (
                  <>Our <span className="text-red">Projects</span></>
                )}
              </h1>
            </div>

            <p className="proj-hero-subtitle">
              {heroSection?.subtitle || "A showcase of our fuel supply solutions and successful partnerships across key industries in the UAE."}
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
        </div>

        {/* Hero Bottom Curved Wave: Navy + Crimson */}
        <div className="proj-hero-wave-wrap" aria-hidden="true">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="proj-hero-wave-svg">
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

      {/* 2. CATEGORY FILTER BAR */}
      <section className="proj-filter-section">
        <div className="container">
          <div className="proj-filter-bar reveal-on-scroll" role="tablist" aria-label="Project Categories">
            {projectCategories.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`proj-filter-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  {cat.id !== 'all' && (
                    <span className="proj-filter-icon" aria-hidden="true">
                      <ProjectIcon
                        name={cat.icon}
                        size={17}
                        color={isActive ? '#ffffff' : '#D51F26'}
                      />
                    </span>
                  )}
                  <span className="proj-filter-label">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PROJECT CARDS GRID (3x2 Grid) */}
      <section className="proj-grid-section" id="projects-grid">
        <div className="container">
          <div className="proj-cards-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => (
                <article
                  key={proj.id}
                  className="proj-card"
                >
                  {/* Card Media with Floating Category Badge & Cut Line */}
                  <div className="proj-card-media">
                    <img src={proj.image} alt={proj.imageAlt} loading="lazy" />

                    {/* Diagonal cut line */}
                    <svg viewBox="0 0 300 28" preserveAspectRatio="none" className="proj-card-cut" aria-hidden="true">
                      <path d="M0 28 L300 0 L300 28 L0 28 Z" fill="#ffffff" />
                    </svg>

                    {/* Floating White Category Badge at Top Left */}
                    <div className="proj-category-badge" aria-hidden="true">
                      <ProjectIcon name={proj.categoryIcon} size={15} color="#D51F26" />
                      <span className="proj-badge-text">{proj.categoryLabel}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="proj-card-body">
                    <h3 className="proj-card-title">{proj.title}</h3>
                    <p className="proj-card-desc">{proj.desc}</p>
                  </div>

                  {/* Bottom alternating color curve accent */}
                  <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="proj-card-bottom-accent" aria-hidden="true">
                    <path d="M0 14 C130 12 240 8 300 0 L300 14 Z" fill={proj.waveColor} />
                  </svg>
                </article>
              ))
            ) : (
              <div className="proj-empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 20px' }}>
                <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '16px' }}>No projects found in this category.</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setActiveFilter('all')}
                  style={{ display: 'inline-flex', padding: '10px 22px', borderRadius: '9999px' }}
                >
                  View All Projects
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. PROJECT HIGHLIGHTS & STATISTICS SECTION */}
      <section className="proj-stats-section">
        <div className="container">
          <div className="proj-stats-card reveal-on-scroll">
            <div className="proj-stats-grid">
              {projectHighlights.map((stat, idx) => (
                <div key={stat.id} className="proj-stat-item">
                  <div className="proj-stat-icon-wrap" aria-hidden="true">
                    <ProjectIcon name={stat.icon} size={28} color="#D51F26" />
                  </div>
                  <div className="proj-stat-content">
                    <span className="proj-stat-val">{stat.value}</span>
                    <span className="proj-stat-lbl">{stat.label}</span>
                  </div>
                  {idx < projectHighlights.length - 1 && (
                    <div className="proj-stat-divider" aria-hidden="true"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT ENQUIRY CTA BANNER */}
      <PartnerCtaBanner
        pageSlug="projects"
        sectionKey="cta"
        defaultTitle="Have a Project Requirement?"
        defaultSubtitle="Get in touch with our team for a tailored fuel supply solution across the UAE."
        productKey="Ultra Low Sulfur Diesel (10ppm)"
        onOpenQuote={onOpenQuote}
      />
    </main>
  );
}
