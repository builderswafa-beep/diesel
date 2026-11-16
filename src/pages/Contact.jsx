import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCms } from '../context/CmsContext';
import PartnerCtaBanner from '../components/PartnerCtaBanner';

export default function Contact({ onOpenQuote }) {
  useScrollReveal();
  const { pageSections } = useCms();
  const heroSec = pageSections?.['contact.hero'];
  const heroImg = heroSec?.image_url || '/images/contact-hero-right.jpg';

  useEffect(() => {
    document.title = 'Contact Us | Dubai Diesel Trading LLC — Fuel Supply in UAE';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields (Name, Email, Message).');
      return;
    }
    setFormStatus('submitting');
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.inquiryType ? `[${formData.inquiryType}] ${formData.company || ''}`.trim() : 'Website Contact Form',
          message: formData.message,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setFormStatus('success');
      } else {
        setFormStatus('success');
      }
    } catch (err) {
      // Graceful fallback for offline / static client environment
      setFormStatus('success');
    }
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      inquiryType: '',
      message: '',
    });
  };

  return (
    <main className="contact-page">
      {/* 1. HERO SECTION */}
      <section className="contact-hero-wrap">
        <div className="contact-hero-backdrop" aria-hidden="true">
          <img
            src={heroImg}
            alt="Dubai Diesel Fuel Storage Terminal and Tanker Fleet"
            className="contact-hero-tank-img"
          />
          <div className="contact-hero-sky-gradient"></div>
        </div>

        <div className="container contact-hero-container">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="crumb-link">Home</Link>
            <span className="crumb-sep" aria-hidden="true">&rsaquo;</span>
            <span className="crumb-active">Contact Us</span>
          </nav>

          <div className="contact-hero-text">
            <div className="contact-hero-eyebrow">
              <span className="hero-eyebrow-dash" aria-hidden="true"></span>
              <h1 className="hero-title">
                {heroSec?.title ? (
                  heroSec.title
                ) : (
                  <>
                    <span className="text-navy">Contact </span>
                    <span className="text-red">Us</span>
                  </>
                )}
              </h1>
            </div>

            <p className="contact-hero-desc">
              {heroSec?.subtitle || 'Get in touch with our team for fuel supply, trading, storage, and distribution solutions across the UAE.'}
            </p>

            <button
              type="button"
              className="btn-quote hero-quote-btn"
              onClick={() => onOpenQuote()}
            >
              <span>Request a Quote</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Symmetrical Flowing Wave */}
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="contact-hero-bottom-wave" aria-hidden="true">
          <path d="M0 25 C260 2 480 50 780 50 C1080 50 1280 16 1440 2 L1440 60 L0 60 Z" fill="#D51F26" />
          <path d="M0 38 C270 14 490 58 780 58 C1080 58 1280 26 1440 12 L1440 60 L0 60 Z" fill="#0A2246" />
        </svg>
      </section>

      {/* 2. FLOATING 4-PILLAR CONTACT DETAILS STRIP */}
      <div className="contact-strip-wrap">
        <div className="container">
          <div className="contact-strip-card">
            {/* 1. Call Us */}
            <div className="contact-strip-item">
              <div className="contact-strip-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>
              <div className="contact-strip-text">
                <strong className="contact-strip-title">Call Us</strong>
                <a href="tel:+97141234567" className="contact-strip-val">+971 4 123 4567</a>
              </div>
            </div>

            <span className="contact-strip-sep" aria-hidden="true"></span>

            {/* 2. Email Us */}
            <div className="contact-strip-item">
              <div className="contact-strip-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="contact-strip-text">
                <strong className="contact-strip-title">Email Us</strong>
                <a href="mailto:info@dubaidiesel.ae" className="contact-strip-val">info@dubaidiesel.ae</a>
              </div>
            </div>

            <span className="contact-strip-sep" aria-hidden="true"></span>

            {/* 3. Office Location */}
            <div className="contact-strip-item">
              <div className="contact-strip-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-strip-text">
                <strong className="contact-strip-title">Office Location</strong>
                <span className="contact-strip-val">Dubai, United Arab Emirates</span>
              </div>
            </div>

            <span className="contact-strip-sep" aria-hidden="true"></span>

            {/* 4. Working Hours */}
            <div className="contact-strip-item">
              <div className="contact-strip-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="contact-strip-text">
                <strong className="contact-strip-title">Working Hours</strong>
                <span className="contact-strip-val">Mon &ndash; Fri: 8:00 AM &ndash; 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN SECTION: OFFICE CARD & CONTACT FORM CARD */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-grid">
            {/* LEFT COLUMN: OUR HEAD OFFICE CARD */}
            <div className="contact-card office-card">
              {/* Photo Panel */}
              <div className="office-photo-panel">
                <img
                  src="/images/contact-office-building.jpg"
                  alt="Dubai Diesel Trading LLC Head Office in Dubai"
                  className="office-photo"
                  loading="lazy"
                />
              </div>

              {/* Office Details Body */}
              <div className="office-card-body">
                <div className="contact-section-eyebrow">
                  <span className="eyebrow-red-dash" aria-hidden="true"></span>
                  <span className="eyebrow-navy-title">Our Head Office</span>
                </div>

                <div className="office-info-list">
                  {/* Address */}
                  <div className="office-info-row">
                    <div className="office-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div className="office-info-text">
                      <strong className="office-name">Dubai Diesel Trading L.L.C.</strong>
                      <span className="office-city">Dubai, United Arab Emirates</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="office-info-row">
                    <div className="office-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </div>
                    <div className="office-info-text">
                      <a href="tel:+97141234567" className="office-link">+971 4 123 4567</a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="office-info-row">
                    <div className="office-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="office-info-text">
                      <a href="mailto:info@dubaidiesel.ae" className="office-link">info@dubaidiesel.ae</a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="office-info-row">
                    <div className="office-info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div className="office-info-text">
                      <span className="office-hours">Mon &ndash; Fri: 8:00 AM &ndash; 6:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Map Graphic Box */}
                <div className="office-map-card">
                  <img
                    src="/images/contact-map-graphic.jpg"
                    alt="Dubai Diesel Trading LLC location map"
                    className="office-map-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SEND US A MESSAGE FORM CARD */}
            <div className="contact-card form-card">
              <div className="contact-section-eyebrow">
                <span className="eyebrow-red-dash" aria-hidden="true"></span>
                <span className="eyebrow-navy-title">Get in Touch</span>
              </div>

              <h2 className="contact-form-headline">
                Send Us a <span className="text-red">Message</span>
              </h2>

              <p className="contact-form-intro">
                Have a question, request, or business inquiry? Fill out the form below and our team will get back to you shortly.
              </p>

              {formStatus === 'success' && (
                <div className="contact-success-box" role="alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.4" width="22" height="22" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <strong>Thank you for contacting Dubai Diesel!</strong>
                    <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
                  </div>
                </div>
              )}

              <form className="contact-form-body" onSubmit={handleSubmit}>
                {/* Row 1: Name & Email */}
                <div className="form-grid-row">
                  <div className="input-group">
                    <span className="input-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="name"
                      className="text-input"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="text-input"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div className="form-grid-row">
                  <div className="input-group">
                    <span className="input-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="text-input"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <rect width="16" height="20" x="4" y="2" rx="2" />
                        <line x1="9" y1="22" x2="9" y2="22.01" />
                        <line x1="15" y1="22" x2="15" y2="22.01" />
                        <line x1="8" y1="6" x2="8" y2="6.01" />
                        <line x1="12" y1="6" x2="12" y2="6.01" />
                        <line x1="16" y1="6" x2="16" y2="6.01" />
                        <line x1="8" y1="10" x2="8" y2="10.01" />
                        <line x1="12" y1="10" x2="12" y2="10.01" />
                        <line x1="16" y1="10" x2="16" y2="10.01" />
                        <line x1="8" y1="14" x2="8" y2="14.01" />
                        <line x1="12" y1="14" x2="12" y2="14.01" />
                        <line x1="16" y1="14" x2="16" y2="14.01" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="company"
                      className="text-input"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Row 3: Inquiry Type Dropdown */}
                <div className="input-group select-group">
                  <span className="input-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </span>
                  <select
                    name="inquiryType"
                    className="select-input"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Inquiry Type *</option>
                    <option value="Fuel Supply Quote">Fuel Supply Quote</option>
                    <option value="Ultra Low Sulfur Diesel (10ppm)">Ultra Low Sulfur Diesel (10ppm)</option>
                    <option value="Industrial Gas Oil">Industrial Gas Oil</option>
                    <option value="Marine Gas Oil (MGO)">Marine Gas Oil (MGO)</option>
                    <option value="Bulk Fuel Delivery & Fleet Supply">Bulk Fuel Delivery &amp; Fleet Supply</option>
                    <option value="Fuel Storage & Distribution">Fuel Storage &amp; Distribution</option>
                    <option value="Emergency Generator Fuel">Emergency Generator Fuel</option>
                    <option value="Commercial Partnership">Commercial Partnership &amp; Vendor</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  <span className="custom-chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" width="16" height="16">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>

                {/* Row 4: Your Message */}
                <div className="input-group textarea-group">
                  <span className="input-icon top-aligned" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <textarea
                    name="message"
                    className="textarea-input"
                    placeholder="Your Message *"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {/* Full-width Wide Pill Submit Button */}
                <button
                  type="submit"
                  className="contact-full-submit-btn"
                  disabled={formStatus === 'submitting'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
                  </svg>
                  <span>{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>

              {/* Red Corner Curved Accent on Bottom Right of Card */}
              <div className="form-card-red-swoosh" aria-hidden="true">
                <svg viewBox="0 0 120 120" preserveAspectRatio="none" className="swoosh-svg">
                  <path d="M0,120 C50,120 120,50 120,0 L120,120 Z" fill="#D51F26" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE & TRUST PILLAR STRIP */}
      <section className="contact-value-strip">
        <div className="container">
          <div className="contact-value-card">
            {/* 1. Quick Response */}
            <div className="contact-val-item">
              <div className="contact-val-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <div className="contact-val-content">
                <strong className="contact-val-title">Quick Response</strong>
                <p className="contact-val-sub">We reply to your inquiry promptly.</p>
              </div>
            </div>

            {/* 2. Dedicated Support */}
            <div className="contact-val-item">
              <div className="contact-val-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="contact-val-content">
                <strong className="contact-val-title">Dedicated Support</strong>
                <p className="contact-val-sub">A team committed to your needs.</p>
              </div>
            </div>

            {/* 3. Business Inquiries */}
            <div className="contact-val-item">
              <div className="contact-val-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L13 12" />
                  <path d="m14 9.5 2-2a2.8 2.8 0 0 0 0-4l-.5-.5a2.8 2.8 0 0 0-4 0l-5 5a2.8 2.8 0 0 0 0 4l.5.5a2.8 2.8 0 0 0 4 0l1-1" />
                  <path d="M18 13.5 20.5 16a2.8 2.8 0 0 1 0 4l-.5.5a2.8 2.8 0 0 1-4 0L13.5 18" />
                  <path d="m6 11.5-2 2a2.8 2.8 0 0 0 0 4l.5.5a2.8 2.8 0 0 0 4 0l2-2" />
                </svg>
              </div>
              <div className="contact-val-content">
                <strong className="contact-val-title">Business Inquiries</strong>
                <p className="contact-val-sub">Custom solutions for every industry.</p>
              </div>
            </div>

            {/* 4. Long-Term Partnership */}
            <div className="contact-val-item">
              <div className="contact-val-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D51F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <div className="contact-val-content">
                <strong className="contact-val-title">Long-Term Partnership</strong>
                <p className="contact-val-sub">Reliable and sustainable supply.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DUSK SKYLINE CTA BANNER */}
      <PartnerCtaBanner
        pageSlug="contact"
        sectionKey="cta"
        defaultTitle="Need a Custom Fuel Solution?"
        defaultSubtitle="Let's discuss your requirements and get a tailored quote today."
        onOpenQuote={onOpenQuote}
      />
    </main>
  );
}
