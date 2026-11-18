// src/pages/BlogListing.jsx
// Complete Corporate Blog Listing Page for Dubai Diesel Trading L.L.C.
// Features category filters, featured article spotlight, and 3-column article cards.

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { allBlogPosts, blogCategories } from '../data/blogData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCms } from '../context/CmsContext';
import PartnerCtaBanner from '../components/PartnerCtaBanner';

export default function BlogListing({ onOpenQuote }) {
  useScrollReveal();
  const navigate = useNavigate();
  const { pageSections } = useCms();
  const heroSec = pageSections?.['blog.hero'];
  const heroImg = heroSec?.image_url || '/images/blog-hero-banner.jpg';
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'Blog & Industry Insights | Dubai Diesel Trading LLC';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const postsArray = Object.values(allBlogPosts);

  const featuredPost = allBlogPosts['the-importance-of-a-reliable-fuel-supply'] || postsArray[0];

  const filteredPosts = postsArray.filter((p) => {
    const matchesCategory = selectedCat === 'all' || p.categoryId === selectedCat;
    const matchesSearch = !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.intro.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="blog-listing-page">
      {/* 1. HERO BANNER */}
      <section className="proj-hero">
        <div className="proj-hero-bg-container" aria-hidden="true">
          <img
            src={heroImg}
            alt="Dubai Diesel fuel storage tanks and corporate facility"
            className="proj-hero-img"
          />
          <div className="proj-hero-gradient-overlay"></div>
        </div>

          <div className="container proj-hero-container">
            <nav className="proj-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="proj-bc-link">Home</Link>
              <span className="proj-bc-sep" aria-hidden="true">&gt;</span>
              <span className="proj-bc-current">Blog</span>
            </nav>

            <h1 className="proj-hero-title">
              {heroSec?.title ? (
                heroSec.title.includes('&') ? (
                  <>
                    {heroSec.title.split('&')[0]}
                    <span className="text-red">&amp;{heroSec.title.split('&')[1]}</span>
                  </>
                ) : (
                  heroSec.title
                )
              ) : (
                <>Industry <span className="text-red">Insights &amp; Blog</span></>
              )}
            </h1>

            <p className="proj-hero-subtitle">
              {heroSec?.subtitle || 'Industry insights, fuel market updates, and expert perspectives from the Dubai Diesel Trading L.L.C. technical team.'}
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
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="proj-hero-wave" aria-hidden="true">
            <path d="M0 60 C380 58 720 32 1080 8 C1240 -2 1360 0 1440 0 V60 H0 Z" fill="#D51F26" />
            <path d="M0 60 C320 60 680 38 1040 16 C1200 6 1340 4 1440 4 V60 H0 Z" fill="#0A2246" />
          </svg>
        </section>

      {/* 2. FEATURED ARTICLE SPOTLIGHT */}
      <section className="blog-featured-section">
        <div className="container">
          <div className="blog-featured-card" onClick={() => navigate(`/blog/${featuredPost.slug}`)}>
            <div className="blog-featured-media">
              <img
                src={featuredPost.featuredImage}
                alt={featuredPost.title}
                className="blog-featured-img"
              />
            </div>

            <div className="blog-featured-body">
              <div className="blog-meta-row">
                <span className="blog-cat-badge">{featuredPost.category}</span>
                <span className="blog-date">{featuredPost.date}</span>
                <span className="blog-read-time">{featuredPost.readTime}</span>
              </div>

              <h2 className="blog-featured-title">
                {featuredPost.title}
              </h2>

              <p className="blog-featured-excerpt">
                {featuredPost.intro}
              </p>

              <div className="blog-featured-footer">
                <Link to={`/blog/${featuredPost.slug}`} className="blog-read-btn">
                  <span>Read Full Article</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER & SEARCH BAR */}
      <section className="blog-filter-section">
        <div className="container">
          <div className="blog-filter-bar">
            <div className="blog-pills" role="tablist">
              <button
                type="button"
                className={`blog-pill-btn ${selectedCat === 'all' ? 'is-active' : ''}`}
                onClick={() => setSelectedCat('all')}
              >
                All Articles
              </button>
              {blogCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`blog-pill-btn ${selectedCat === cat.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedCat(cat.id)}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            <div className="blog-search-box">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="blog-search-input"
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" className="blog-search-icon" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARTICLES GRID */}
      <section className="blog-grid-section">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="blog-empty-state">
              <p>No articles found matching your criteria.</p>
              <button type="button" className="blog-reset-btn" onClick={() => { setSelectedCat('all'); setSearchTerm(''); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="blog-cards-grid">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <div className="blog-card-media">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      loading="lazy"
                      className="blog-card-img"
                    />
                    <span className="blog-card-badge">{post.category}</span>
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">{post.date}</span>
                      <span className="blog-card-dot">&bull;</span>
                      <span className="blog-card-read">{post.readTime}</span>
                    </div>

                    <h3 className="blog-card-title">{post.title}</h3>

                    <p className="blog-card-excerpt">
                      {post.intro.length > 120 ? `${post.intro.substring(0, 120)}...` : post.intro}
                    </p>

                    <div className="blog-card-footer">
                      <span className="blog-card-link">
                        <span>Read Article</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="14" height="14" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <PartnerCtaBanner
        pageSlug="blog"
        sectionKey="cta"
        defaultTitle="Need a Reliable Fuel Partner?"
        defaultSubtitle="Get in touch with our team for tailored fuel supply, bulk storage, and logistics solutions across the UAE."
        productKey="Ultra Low Sulfur Diesel (10ppm)"
        onOpenQuote={onOpenQuote}
      />
    </main>
  );
}
