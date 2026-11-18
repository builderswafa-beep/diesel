import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCms } from '../context/CmsContext';

export default function Header({ onOpenQuote, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useCms();
  const dropdownRef = useRef(null);
  const dropdownPinnedRef = useRef(false);

  const closeDropdown = useCallback(() => {
    dropdownPinnedRef.current = false;
    setServicesDropdown(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeDropdown();
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeDropdown]);

  useEffect(() => {
    closeDropdown();
  }, [location.pathname, closeDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phone = settings?.phone || '+971 6 748 9138';
  const email = settings?.email || 'info@dubaidiesel.ae';
  const address = settings?.address || '9FXX+JF2 - Al Jerf 2 - Ajman - United Arab Emirates';
  const workingHours = settings?.working_hours || 'Mon - Fri: 8:00 AM - 6:00 PM';

  const handleNavClick = (e, targetHash) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(targetHash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetHash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="top-bar-wedge" aria-hidden="true"></div>
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="top-icon" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{address}</span>
            </span>

            <span className="top-divider hide-sm" aria-hidden="true"></span>

            <span className="top-info-item hide-md">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="top-icon" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{workingHours}</span>
            </span>
          </div>

          <div className="top-bar-right">
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="top-info-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="top-icon" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              <span>{phone}</span>
            </a>

            <span className="top-divider hide-xs" aria-hidden="true"></span>

            <a href={`mailto:${email}`} className="top-info-link hide-xs">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="top-icon" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className={`site-header main-header ${isScrolled ? 'is-scrolled' : ''}`} id="main-header">
        <div className="container header-inner">
          {/* Official Bilingual Brand Identity */}
          <Link to="/" className="brand-logo" aria-label="Dubai Diesel Trading LLC Home">
            <svg viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-mark" aria-hidden="true">
              <text x="4" y="9" fill="#0A2246" fontSize="8.5" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.04em">DUBAI</text>
              <path d="M4 13H26C30.4183 13 34 16.5817 34 21V24H23V20.5C23 19.6716 22.3284 19 21.5 19H14V32H21.5C22.3284 32 23 31.3284 23 30.5V27H34V30C34 34.4183 30.4183 38 26 38H4V13Z" fill="#D51F26" />
              <path d="M27 20H52C56.4183 20 60 23.5817 60 28V35C60 39.4183 56.4183 43 52 43H27V33.5H36.5V36.5H49C49.8284 36.5 50.5 35.8284 50.5 35V28C50.5 27.1716 49.8284 26.5 49 26.5H36.5V29.5H27V20Z" fill="#0A2246" />
              <circle cx="43.5" cy="31.5" r="3" fill="#ffffff" />
              <text x="24" y="50" fill="#0A2246" fontSize="8" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.06em">DIESEL</text>
            </svg>
            <span className="brand-sep" aria-hidden="true"></span>
            <span className="brand-text">
              <span className="brand-arabic" dir="rtl" lang="ar">دبي لتجارة الديزل</span>
              <span className="brand-english">DUBAI DIESEL</span>
            </span>
          </Link>

          {/* Desktop Navigation Links - Single Row, Clean Direct Links */}
          <nav className="main-nav desktop-nav" aria-label="Main Navigation">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'is-active' : ''}`}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'is-active' : ''}`}
            >
              About Us
            </Link>

            <Link
              to="/projects"
              className={`nav-link ${location.pathname === '/projects' || location.pathname === '/our-projects' ? 'is-active' : ''}`}
            >
              Our Projects
            </Link>

            <div
              ref={dropdownRef}
              className={`nav-dropdown-wrap ${servicesDropdown ? 'is-open' : ''}`}
              onMouseEnter={() => {
                if (!dropdownPinnedRef.current) setServicesDropdown(true);
              }}
              onMouseLeave={() => {
                if (!dropdownPinnedRef.current) setServicesDropdown(false);
              }}
            >
              <button
                type="button"
                className={`nav-link nav-dropdown-toggle ${location.pathname.startsWith('/services') ? 'is-active' : ''}`}
                aria-haspopup="true"
                aria-expanded={servicesDropdown}
                onClick={() => {
                  dropdownPinnedRef.current = !dropdownPinnedRef.current;
                  setServicesDropdown(dropdownPinnedRef.current);
                }}
              >
                <span>Our Services</span>
                <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="12" height="12" style={{ marginLeft: '4px', verticalAlign: 'middle', display: 'inline-block' }} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {servicesDropdown && (
                <div className="dropdown-menu nav-dropdown-menu">
                  <Link to="/services/diesel-supply" className="dropdown-item" onClick={closeDropdown}>
                    Diesel Supply
                  </Link>
                  <Link to="/services/industrial-fuel" className="dropdown-item" onClick={closeDropdown}>
                    Industrial Fuel
                  </Link>
                  <Link to="/services/marine-fuel" className="dropdown-item" onClick={closeDropdown}>
                    Marine Fuel
                  </Link>
                  <Link to="/services/generator-fuel" className="dropdown-item" onClick={closeDropdown}>
                    Generator Fuel
                  </Link>
                  <Link to="/services/bulk-fuel-supply" className="dropdown-item" onClick={closeDropdown}>
                    Bulk Fuel Supply
                  </Link>
                  <Link to="/services/storage-distribution" className="dropdown-item" onClick={closeDropdown}>
                    Fuel Storage & Distribution
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/services" className="dropdown-all" onClick={closeDropdown}>
                    Explore All Services &rarr;
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className={`nav-link ${location.pathname === '/gallery' ? 'is-active' : ''}`}
            >
              Gallery
            </Link>

            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'is-active' : ''}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <button
              type="button"
              className="search-circle-btn"
              id="open-search-btn"
              aria-label="Search products and services"
              onClick={onOpenSearch}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <span className="action-sep hide-lg-down" aria-hidden="true"></span>

            <button
              type="button"
              className="btn-quote hide-lg-down"
              onClick={() => onOpenQuote()}
            >
              <span>Request a Quote</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="15" height="15" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              id="mobile-menu-toggle"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="22" height="22" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" id="mobile-drawer" style={{ display: 'flex' }}>
            <Link
              to="/"
              className="mobile-link"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/projects"
              className={`mobile-link ${location.pathname === '/projects' || location.pathname === '/our-projects' ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Projects
            </Link>
            <Link
              to="/services"
              className={`mobile-link ${location.pathname === '/services' ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Services
            </Link>
            <Link
              to="/gallery"
              className={`mobile-link ${location.pathname === '/gallery' ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className={`mobile-link ${location.pathname === '/contact' ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <button
              type="button"
              className="btn-quote mobile-quote-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
            >
              <span>Request a Quote</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="15" height="15" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        )}
      </header>
    </>
  );
}
