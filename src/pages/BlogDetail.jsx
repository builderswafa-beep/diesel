// src/pages/BlogDetail.jsx
// Faithful recreation of Dubai Diesel Trading L.L.C. Blog Detail Page
// Exactly matches media_1794560834819_abb58895.jpg reference design.

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  allBlogPosts,
  blogCategories,
  recentBlogPosts,
  relatedBlogArticles
} from '../data/blogData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function BlogDetail({ onOpenQuote }) {
  useScrollReveal();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Active post key lookup (defaults to the main reference article)
  const currentKey = slug || 'the-importance-of-a-reliable-fuel-supply';
  const post = allBlogPosts[currentKey] || allBlogPosts['the-importance-of-a-reliable-fuel-supply'];

  // Sidebar interactive states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(post.category);
  const [shareFeedback, setShareFeedback] = useState('');

  useEffect(() => {
    document.title = `${post.title} | Dubai Diesel Trading L.L.C. Blog`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedCategory(post.category);
  }, [currentKey, post.title, post.category]);

  // Social Share Handlers
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://dubaidiesel.ae/blog';
  const shareText = encodeURIComponent(`${post.title} - Dubai Diesel Trading L.L.C.`);

  const handleShare = (platform) => {
    let url = '';
    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(currentUrl)}`;
        break;
      default:
        break;
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  // Search submission in sidebar
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Find matching post
    const q = searchQuery.toLowerCase();
    const matched = Object.values(allBlogPosts).find(
      (p) => p.title.toLowerCase().includes(q) || p.intro.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    if (matched) {
      navigate(`/blog/${matched.slug}`);
    } else {
      setShareFeedback(`No exact match for "${searchQuery}". Showing recent posts.`);
      setTimeout(() => setShareFeedback(''), 4000);
    }
  };

  return (
    <main className="bld-page">
      {/* 1. HERO BANNER WITH SIGNATURE SWOOSH */}
      <section className="bld-hero">
        <div className="bld-hero-bg-container" aria-hidden="true">
          <img
            src="/images/blog-hero-banner.jpg"
            alt="Dubai Diesel terminal storage tanks"
            className="bld-hero-img"
          />
          <div className="bld-hero-gradient-left"></div>
        </div>

        <div className="container bld-hero-container">
          {/* Breadcrumb: Home > Blog > Blog Details */}
          <nav className="bld-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="bld-crumb-home">Home</Link>
            <span aria-hidden="true" className="bld-crumb-sep">&rsaquo;</span>
            <Link to="/blog" className="bld-crumb-mid">Blog</Link>
            <span aria-hidden="true" className="bld-crumb-sep">&rsaquo;</span>
            <span className="bld-crumb-curr">Blog Details</span>
          </nav>

          <div className="bld-hero-content">
            <div className="bld-hero-heading-wrap">
              <span className="bld-dash" aria-hidden="true"></span>
              <h1 className="bld-hero-title">Blog Details</h1>
            </div>

            <p className="bld-hero-subtitle">
              Industry insights, fuel market updates, and expert perspectives from Dubai Diesel Trading L.L.C.
            </p>
          </div>
        </div>

        {/* Bottom curved waves: Navy + Crimson */}
        <div className="bld-hero-wave-wrap" aria-hidden="true">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="bld-hero-wave-svg">
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

      {/* 2. MAIN 2-COLUMN LAYOUT: ARTICLE (LEFT) + SIDEBAR (RIGHT) */}
      <section className="bld-main-section">
        <div className="container">
          <div className="bld-layout-grid">
            {/* ========================================================
                LEFT COLUMN: ARTICLE BODY & RELATED ARTICLES
               ======================================================== */}
            <article className="bld-article-col">
              {/* Featured Image */}
              <div className="bld-featured-media reveal-on-scroll">
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  className="bld-featured-img"
                  loading="eager"
                />
              </div>

              {/* Metadata Bar */}
              <div className="bld-meta-strip reveal-on-scroll">
                <span className="bld-category-pill">{post.category}</span>
                <span className="bld-meta-divider" aria-hidden="true"></span>

                <span className="bld-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{post.date}</span>
                </span>

                <span className="bld-meta-divider" aria-hidden="true"></span>

                <span className="bld-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{post.author}</span>
                </span>

                <span className="bld-meta-divider" aria-hidden="true"></span>

                <span className="bld-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{post.readTime}</span>
                </span>
              </div>

              {/* Article Main Title */}
              <h1 className="bld-article-title reveal-on-scroll">{post.title}</h1>

              {/* Introductory Paragraph */}
              <p className="bld-article-lead reveal-on-scroll">{post.intro}</p>

              {/* Section 1: Why Fuel Supply Reliability Matters */}
              <div className="bld-content-block reveal-on-scroll">
                <div className="bld-subhead-wrap">
                  <span className="bld-subhead-dash" aria-hidden="true"></span>
                  <h2 className="bld-subhead-title">{post.section1Heading}</h2>
                </div>
                <p className="bld-paragraph">{post.section1Body}</p>
              </div>

              {/* Section 2: Inline Media + Key Benefits (2 Columns) */}
              <div className="bld-benefits-split reveal-on-scroll">
                <div className="bld-split-media">
                  <img
                    src={post.section2Image}
                    alt={post.section2ImageAlt}
                    className="bld-split-img"
                    loading="lazy"
                  />
                </div>

                <div className="bld-split-content">
                  <div className="bld-subhead-wrap">
                    <span className="bld-subhead-dash" aria-hidden="true"></span>
                    <h3 className="bld-split-title">{post.section2Heading}</h3>
                  </div>

                  <ul className="bld-checklist" role="list">
                    {post.keyBenefits.map((item, idx) => (
                      <li key={idx} className="bld-checklist-item">
                        <span className="bld-check-badge" aria-hidden="true">
                          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
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
                        <span className="bld-checklist-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 3: Driving Operational Efficiency */}
              <div className="bld-content-block reveal-on-scroll">
                <div className="bld-subhead-wrap">
                  <span className="bld-subhead-dash" aria-hidden="true"></span>
                  <h2 className="bld-subhead-title">{post.section3Heading}</h2>
                </div>
                <p className="bld-paragraph">{post.section3Body}</p>
              </div>

              {/* Section 4: Conclusion Box */}
              <div className="bld-conclusion-card reveal-on-scroll">
                <div className="bld-conclusion-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M9 14h6" />
                    <path d="M9 18h6" />
                    <path d="M9 10h1" />
                  </svg>
                </div>
                <div className="bld-conclusion-text">
                  <h4 className="bld-conclusion-title">{post.conclusionHeading}</h4>
                  <p className="bld-conclusion-body">{post.conclusionBody}</p>
                </div>
              </div>

              {/* Social Sharing & Post Navigation Row */}
              <div className="bld-share-nav-row reveal-on-scroll">
                <div className="bld-share-wrap">
                  <span className="bld-share-label">Share This Article:</span>
                  <div className="bld-social-buttons">
                    <button
                      type="button"
                      className="bld-social-btn bld-social--linkedin"
                      onClick={() => handleShare('linkedin')}
                      aria-label="Share on LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="bld-social-btn bld-social--twitter"
                      onClick={() => handleShare('twitter')}
                      aria-label="Share on X"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="bld-social-btn bld-social--facebook"
                      onClick={() => handleShare('facebook')}
                      aria-label="Share on Facebook"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="bld-social-btn bld-social--whatsapp"
                      onClick={() => handleShare('whatsapp')}
                      aria-label="Share on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.35.06-.53.27-.19.21-.71.69-.71 1.7s.73 1.97.83 2.11c.11.14 1.44 2.2 3.49 3.09 1.71.74 2.05.6 2.43.56.37-.03 1.2-.49 1.37-.96.17-.48.17-.89.12-.97-.05-.09-.19-.14-.4-.25-.21-.11-1.2-.59-1.39-.66-.19-.07-.33-.11-.47.11-.14.21-.55.69-.67.83-.12.14-.24.16-.45.05-.21-.11-.89-.33-1.69-1.05-.63-.56-1.05-1.25-1.17-1.46-.12-.21-.01-.33.09-.43.1-.1.21-.24.32-.36.11-.12.14-.21.21-.35.07-.14.04-.26-.02-.37-.06-.11-.53-1.28-.73-1.75-.19-.47-.39-.4-.53-.41z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="bld-nav-buttons">
                  <button
                    type="button"
                    className="bld-nav-btn bld-nav-prev"
                    onClick={() => navigate(`/blog/${post.prevPostSlug}`)}
                  >
                    <span>&larr; Previous Post</span>
                  </button>

                  <button
                    type="button"
                    className="bld-nav-btn bld-nav-next"
                    onClick={() => navigate(`/blog/${post.nextPostSlug}`)}
                  >
                    <span>Next Post &rarr;</span>
                  </button>
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="bld-author-card reveal-on-scroll">
                <div className="bld-author-logo-box" aria-hidden="true">
                  <svg viewBox="0 0 64 52" fill="none" width="46" height="38">
                    <text x="4" y="9" fill="#0A2246" fontSize="8.5" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.04em">DUBAI</text>
                    <path d="M4 13H26C30.4183 13 34 16.5817 34 21V24H23V20.5C23 19.6716 22.3284 19 21.5 19H14V32H21.5C22.3284 32 23 31.3284 23 30.5V27H34V30C34 34.4183 30.4183 38 26 38H4V13Z" fill="#D51F26" />
                    <path d="M27 20H52C56.4183 20 60 23.5817 60 28V35C60 39.4183 56.4183 43 52 43H27V33.5H36.5V36.5H49C49.8284 36.5 50.5 35.8284 50.5 35V28C50.5 27.1716 49.8284 26.5 49 26.5H36.5V29.5H27V20Z" fill="#0A2246" />
                    <circle cx="43.5" cy="31.5" r="3" fill="#ffffff" />
                    <text x="24" y="50" fill="#0A2246" fontSize="8" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.06em">DIESEL</text>
                  </svg>
                </div>

                <div className="bld-author-details">
                  <h4 className="bld-author-name">{post.author}</h4>
                  <span className="bld-author-role">{post.authorRole}</span>
                </div>

                <div className="bld-author-bio-wrap">
                  <p className="bld-author-bio">{post.authorBio}</p>
                </div>
              </div>
            </article>

            {/* ========================================================
                RIGHT COLUMN: SIDEBAR (Search, Categories, Recent, CTA)
               ======================================================== */}
            <aside className="bld-sidebar-col">
              {/* Card 1: Search Blog */}
              <div className="bld-sidebar-card bld-search-card reveal-on-scroll">
                <h3 className="bld-sidebar-title">Search Blog</h3>
                <form onSubmit={handleSearchSubmit} className="bld-search-form">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="bld-search-input"
                    aria-label="Search articles"
                  />
                  <button type="submit" className="bld-search-btn" aria-label="Search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </form>
                {shareFeedback && <p className="bld-search-feedback">{shareFeedback}</p>}
              </div>

              {/* Card 2: Categories */}
              <div className="bld-sidebar-card bld-categories-card reveal-on-scroll">
                <h3 className="bld-sidebar-title">Categories</h3>
                <ul className="bld-category-list" role="list">
                  {blogCategories.map((cat) => {
                    const isActive = selectedCategory === cat.name;
                    return (
                      <li key={cat.id}>
                        <button
                          type="button"
                          className={`bld-category-btn ${isActive ? 'is-active' : ''}`}
                          onClick={() => setSelectedCategory(cat.name)}
                        >
                          <div className="bld-category-left">
                            <span className="bld-cat-icon-wrap" aria-hidden="true">
                              {cat.icon === 'layers' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                  <polyline points="2 17 12 22 22 17" />
                                  <polyline points="2 12 12 17 22 12" />
                                </svg>
                              )}
                              {cat.icon === 'droplet' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                </svg>
                              )}
                              {cat.icon === 'bar-chart' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                  <line x1="12" y1="20" x2="12" y2="10" />
                                  <line x1="18" y1="20" x2="18" y2="4" />
                                  <line x1="6" y1="20" x2="6" y2="16" />
                                </svg>
                              )}
                              {cat.icon === 'settings' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                  <circle cx="12" cy="12" r="3" />
                                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                              )}
                              {cat.icon === 'feather' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                                  <line x1="16" y1="8" x2="2" y2="22" />
                                  <line x1="17.5" y1="15" x2="9" y2="15" />
                                </svg>
                              )}
                            </span>
                            <span className="bld-cat-name">{cat.name}</span>
                          </div>
                          <span className="bld-cat-count">({cat.count})</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Card 3: Recent Posts */}
              <div className="bld-sidebar-card bld-recent-card reveal-on-scroll">
                <h3 className="bld-sidebar-title">Recent Posts</h3>
                <div className="bld-recent-list">
                  {recentBlogPosts.map((item) => (
                    <article
                      key={item.id}
                      className="bld-recent-item"
                      onClick={() => navigate(`/blog/${item.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate(`/blog/${item.id}`);
                        }
                      }}
                    >
                      <div className="bld-recent-thumb-wrap">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="bld-recent-thumb"
                          loading="lazy"
                        />
                      </div>
                      <div className="bld-recent-body">
                        <h4 className="bld-recent-item-title">{item.title}</h4>
                        <div className="bld-recent-date">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden="true">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Card 4: Need a Reliable Fuel Partner? Consultation CTA */}
              <div className="bld-sidebar-card bld-cta-card reveal-on-scroll">
                <div className="bld-cta-tank-graphic" aria-hidden="true">
                  <img
                    src="/images/footer-tank.png"
                    alt="Dubai Diesel bulk storage terminal tanks"
                    className="bld-cta-tank-img"
                  />
                </div>

                <div className="bld-cta-card-content">
                  <h3 className="bld-cta-card-title">Need a Reliable Fuel Partner?</h3>
                  <p className="bld-cta-card-desc">
                    Get in touch with our team for tailored fuel supply solutions for your business.
                  </p>
                  <button
                    type="button"
                    className="btn-primary bld-cta-consult-btn"
                    onClick={() => onOpenQuote('Ultra Low Sulfur Diesel (10ppm)')}
                  >
                    <span>Request a Consultation</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="15" height="15" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* ========================================================
              SECTION: RELATED ARTICLES (3 Cards in Row)
             ======================================================== */}
          <section className="bld-related-section reveal-on-scroll">
            <div className="bld-subhead-wrap">
              <span className="bld-subhead-dash" aria-hidden="true"></span>
              <h2 className="bld-related-heading">Related Articles</h2>
            </div>

            <div className="bld-related-grid">
              {relatedBlogArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="bld-related-card"
                  onClick={() => navigate(`/blog/${rel.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/blog/${rel.id}`);
                    }
                  }}
                >
                  <div className="bld-related-media">
                    <img
                      src={rel.image}
                      alt={rel.imageAlt}
                      className="bld-related-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="bld-related-body">
                    <h3 className="bld-related-card-title">{rel.title}</h3>
                    
                    <div className="bld-related-footer">
                      <div className="bld-related-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{rel.date}</span>
                      </div>

                      <div className="bld-related-arrow-btn" aria-label={`Read article: ${rel.title}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="15" height="15" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
