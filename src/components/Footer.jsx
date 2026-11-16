import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCms } from '../context/CmsContext';

export default function Footer({ onOpenQuote }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useCms();

  const phone = settings?.phone || '+971 4 123 4567';
  const email = settings?.email || 'info@dubaidiesel.ae';
  const address = settings?.address || 'Dubai, United Arab Emirates';
  const workingHours = settings?.working_hours || 'Mon - Fri: 8:00 AM - 6:00 PM';
  const copyText = settings?.copyright_text || '© 2026 Dubai Diesel Trading L.L.C. All Rights Reserved.';


  const handleNavClick = (e, targetHash) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(targetHash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetHash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer id="contact" className="site-footer">
      {/* Clean Dark Navy Footer Backdrop */}
      <div className="footer-backdrop" aria-hidden="true">
        <div className="footer-sunset-glow"></div>

        {/* Center Distant Sunset Dubai Skyline Silhouette */}
        <svg viewBox="0 0 360 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer-center-skyline">
          <path d="M0 110V94H14V82H24V94H34V74H48V94H60V64H74V94H86V76H100V94H114V60H128V94H142V72H154V94H168V52L173 42L178 52V94H186V46L190 22L193 4L196 22L200 46V94H212V68H226V94H238V58H252V94H266V74H280V94H294V66H308V94H322V78H336V94H350V84H360V110H0Z" fill="#061D42" fillOpacity="0.88" />
        </svg>

        <div className="footer-navy-scrim"></div>
      </div>

      <div className="container footer-main">
        <div className="footer-grid">
          {/* Col 1: Brand + Description + Divider + Socials */}
          <div className="footer-col-brand">
            <Link to="/" className="brand-logo footer-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <svg viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-mark" aria-hidden="true">
                <text x="4" y="9" fill="#E2E8F0" fontSize="8.5" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.04em">DUBAI</text>
                <path d="M4 13H26C30.4183 13 34 16.5817 34 21V24H23V20.5C23 19.6716 22.3284 19 21.5 19H14V32H21.5C22.3284 32 23 31.3284 23 30.5V27H34V30C34 34.4183 30.4183 38 26 38H4V13Z" fill="#E1252C" />
                <path d="M27 20H52C56.4183 20 60 23.5817 60 28V35C60 39.4183 56.4183 43 52 43H27V33.5H36.5V36.5H49C49.8284 36.5 50.5 35.8284 50.5 35V28C50.5 27.1716 49.8284 26.5 49 26.5H36.5V29.5H27V20Z" fill="#F8FAFC" />
                <circle cx="43.5" cy="31.5" r="3" fill="#052048" />
                <text x="24" y="50" fill="#E2E8F0" fontSize="8" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.06em">DIESEL</text>
              </svg>
              <span className="brand-sep dark" aria-hidden="true"></span>
              <span className="brand-text">
                <span className="brand-arabic footer-arabic" dir="rtl" lang="ar">دبي لتجارة الديزل</span>
                <span className="brand-english white">DUBAI DIESEL</span>
                <span className="footer-brand-sub">TRADING LLC</span>
              </span>
            </Link>

            <p className="footer-desc">
              A trusted supplier of diesel and fuel solutions across the UAE, serving construction,
              industrial, marine, logistics, and power sectors with reliability and quality.
            </p>

            <span className="footer-brand-rule" aria-hidden="true"></span>

            <div className="footer-socials">
              <a href="#contact" aria-label="LinkedIn" className="footer-social-btn">
                <span className="footer-in-text">in</span>
              </a>
              <a href="#contact" aria-label="Instagram" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="15" height="15" aria-hidden="true">
                  <rect width="18" height="18" x="3" y="3" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#contact" aria-label="YouTube" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <span className="footer-heading-rule" aria-hidden="true"></span>
            <ul className="footer-chevron-list">
              <li>
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/projects">Our Projects</Link>
              </li>
              <li>
                <Link to="/services">Our Services</Link>
              </li>
              <li>
                <Link to="/industries">Industries</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="footer-col">
            <h4>Our Services</h4>
            <span className="footer-heading-rule" aria-hidden="true"></span>
            <ul className="footer-chevron-list">
              <li>
                <Link to="/services/diesel-supply">Diesel Supply</Link>
              </li>
              <li>
                <Link to="/services/industrial-fuel">Industrial Fuel</Link>
              </li>
              <li>
                <Link to="/services/marine-fuel">Marine Fuel</Link>
              </li>
              <li>
                <Link to="/services/generator-fuel">Generator Fuel</Link>
              </li>
              <li>
                <Link to="/services/bulk-fuel-supply">Bulk Fuel Supply</Link>
              </li>
              <li>
                <Link to="/services/storage-distribution">Fuel Storage &amp; Distribution</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="footer-col footer-col-contact">
            <h4>Contact Info</h4>
            <span className="footer-heading-rule" aria-hidden="true"></span>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="15" height="15">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>{address}</span>
              </li>
              <li>
                <span className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="15" height="15">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </span>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} >{phone}</a>
              </li>
              <li>
                <span className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="15" height="15">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <span className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="15" height="15">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <span>{workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Right Terminal Tank Graphic from Mockup - Seamlessly Blended */}
      <div className="footer-tank-graphic" aria-hidden="true">
        <img src="/images/footer-terminal-exact.png" alt="Dubai Diesel Storage Terminal" />
      </div>

      {/* Dark Midnight Bottom Copyright & Legal Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p>&copy; 2026 Dubai Diesel Trading L.L.C. All Rights Reserved.</p>
          <div className="footer-legal-links">
            <a href="#contact">Privacy Policy</a>
            <span aria-hidden="true">|</span>
            <a href="#contact">Terms of Use</a>
            <span aria-hidden="true">|</span>
            <a href="#contact">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
