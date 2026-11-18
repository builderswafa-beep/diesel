import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCms } from '../context/CmsContext';

const DEFAULT_QUICK_LINKS = [
  { label: 'Home', url: '/' },
  { label: 'About Us', url: '/about' },
  { label: 'Our Projects', url: '/projects' },
  { label: 'Our Services', url: '/services' },
  { label: 'Industries', url: '/industries' },
  { label: 'Gallery', url: '/gallery' },
  { label: 'Blog', url: '/blog' },
  { label: 'Contact Us', url: '/contact' },
];

const DEFAULT_SERVICE_LINKS = [
  { label: 'Diesel Supply', url: '/services/diesel-supply' },
  { label: 'Industrial Fuel', url: '/services/industrial-fuel' },
  { label: 'Marine Fuel', url: '/services/marine-fuel' },
  { label: 'Generator Fuel', url: '/services/generator-fuel' },
  { label: 'Bulk Fuel Supply', url: '/services/bulk-fuel-supply' },
  { label: 'Fuel Storage & Distribution', url: '/services/storage-distribution' },
];

const DEFAULT_LEGAL_LINKS = [
  { label: 'Privacy Policy', url: '#contact' },
  { label: 'Terms of Use', url: '#contact' },
  { label: 'Sitemap', url: '#contact' },
];

function parseLinks(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item) => item && item.label)
        .map((item) => ({ label: item.label, url: item.url || '#' }));
    }
  } catch {
    return fallback;
  }
  return fallback;
}

export default function Footer({ onOpenQuote }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useCms();

  const phone = settings?.phone || '+971 6 748 9138';
  const email = settings?.email || 'info@dubaidiesel.ae';
  const address = settings?.address || '9FXX+JF2 - Al Jerf 2 - Ajman - United Arab Emirates';
  const workingHours = settings?.working_hours || 'Mon - Fri: 8:00 AM - 6:00 PM';
  const copyText = settings?.copyright_text || '© 2026 Dubai Diesel Trading L.L.C. All Rights Reserved.';
  const brandArabic = settings?.footer_brand_arabic || 'دبي لتجارة الديزل';
  const brandName = settings?.footer_brand_name || 'DUBAI DIESEL';
  const brandSubtitle = settings?.footer_brand_subtitle || 'TRADING LLC';
  const description =
    settings?.footer_description ||
    'A trusted supplier of diesel and fuel solutions across the UAE, serving construction, industrial, marine, logistics, and power sectors with reliability and quality.';
  const quickHeading = settings?.footer_quick_heading || 'Quick Links';
  const servicesHeading = settings?.footer_services_heading || 'Our Services';
  const contactHeading = settings?.footer_contact_heading || 'Contact Info';
  const quickLinks = parseLinks(settings?.footer_quick_links, DEFAULT_QUICK_LINKS);
  const serviceLinks = parseLinks(settings?.footer_service_links, DEFAULT_SERVICE_LINKS);
  const legalLinks = parseLinks(settings?.footer_legal_links, DEFAULT_LEGAL_LINKS);
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: settings?.linkedin_url || '#contact',
      icon: <span className="footer-in-text">in</span>,
    },
    {
      name: 'Instagram',
      url: settings?.instagram_url || '#contact',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="15" height="15" aria-hidden="true">
          <rect width="18" height="18" x="3" y="3" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: settings?.youtube_url || '#contact',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      ),
    },
  ];

  const renderFooterLink = (link) => {
    const url = link.url || '#';
    if (url.startsWith('/')) {
      return <Link to={url}>{link.label}</Link>;
    }
    if (url.startsWith('#')) {
      return (
        <a href={url} onClick={(e) => handleNavClick(e, url)}>
          {link.label}
        </a>
      );
    }
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  };

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
                <span className="brand-arabic footer-arabic" dir="rtl" lang="ar">{brandArabic}</span>
                <span className="brand-english white">{brandName}</span>
                <span className="footer-brand-sub">{brandSubtitle}</span>
              </span>
            </Link>

            <p className="footer-desc">{description}</p>

            <span className="footer-brand-rule" aria-hidden="true"></span>

            <div className="footer-socials">
              {socialLinks
                .filter((social) => social.url)
                .map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className="footer-social-btn"
                    {...(/^https?:\/\//i.test(social.url)
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {social.icon}
                  </a>
                ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>{quickHeading}</h4>
            <span className="footer-heading-rule" aria-hidden="true"></span>
            <ul className="footer-chevron-list">
              {quickLinks.map((link, index) => (
                <li key={`${link.label}-${index}`}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="footer-col">
            <h4>{servicesHeading}</h4>
            <span className="footer-heading-rule" aria-hidden="true"></span>
            <ul className="footer-chevron-list">
              {serviceLinks.map((link, index) => (
                <li key={`${link.label}-${index}`}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="footer-col footer-col-contact">
            <h4>{contactHeading}</h4>
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

      {/* Dark Midnight Bottom Copyright & Legal Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p>{copyText}</p>
          <div className="footer-legal-links">
            {legalLinks.map((link, index) => (
              <React.Fragment key={`${link.label}-${index}`}>
                {index > 0 && <span aria-hidden="true">|</span>}
                {renderFooterLink(link)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
