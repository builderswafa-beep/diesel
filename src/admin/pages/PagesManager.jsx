// src/admin/pages/PagesManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import ImageUploadControl from '../components/ImageUploadControl';

export default function PagesManager() {
  const { pageSections, saveSection, media, uploadImage } = useCms();
  const { user } = useAuth();

  const pagesList = [
    { id: 'home', name: '1. Home Page', route: '/' },
    { id: 'about', name: '2. About Us', route: '/about' },
    { id: 'projects', name: '3. Our Projects', route: '/projects' },
    { id: 'services', name: '4. Our Services', route: '/services' },
    { id: 'service-diesel', name: '5. Service: Diesel Supply', route: '/services/diesel-supply' },
    { id: 'service-industrial', name: '6. Service: Industrial Fuel', route: '/services/industrial-fuel' },
    { id: 'service-marine', name: '7. Service: Marine Fuel', route: '/services/marine-fuel' },
    { id: 'service-generator', name: '8. Service: Generator Fuel', route: '/services/generator-fuel' },
    { id: 'service-bulk', name: '9. Service: Bulk Fuel Supply', route: '/services/bulk-fuel-supply' },
    { id: 'service-storage', name: '10. Service: Fuel Storage & Dist.', route: '/services/fuel-storage-distribution' },
    { id: 'industries', name: '11. Industries', route: '/industries' },
    { id: 'blog', name: '12. Blog Listing', route: '/blog' },
    { id: 'gallery', name: '13. Gallery', route: '/gallery' },
    { id: 'contact', name: '14. Contact Us', route: '/contact' },
  ];

  const [selectedPage, setSelectedPage] = useState('home');
  const [editingSection, setEditingSection] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Default section configurations per page
  const defaultPageSections = {
    home: [
      { key: 'hero', name: '1. Hero Banner', title: 'Supplying Quality Diesel & Fuel Solutions Across the UAE', subtitle: 'Dubai Diesel Trading LLC is a trusted supplier of diesel and fuel products, serving businesses across construction, logistics, manufacturing, and industrial sectors.', image_url: '/images/hero-terminal.jpg', status: 'published' },
      { key: 'about', name: '2. Company Overview (Main Tank Photo)', title: 'Empowering UAE\'s Industrial Engine with Reliable Fuel', subtitle: 'A trusted partner in diesel and fuel supply across the UAE.', image_url: '/images/about-terminal.jpg', status: 'published' },
      { key: 'about_inset', name: '3. Company Overview (Inset Tanker Photo)', title: 'Logistics Fleet Inset Photo', subtitle: 'Overlapping road delivery tanker under gantry in company overview.', image_url: '/images/about-tanker.jpg', status: 'published' },
      { key: 'services', name: '4. Services Heading Section', title: 'Comprehensive Diesel & Fuel Services', subtitle: 'End-to-end fuel trading and supply solutions, ensuring reliable, safe, and on-time delivery across the UAE.', image_url: '', status: 'published' },
      { key: 'why_choose', name: '5. Why Choose Section', title: 'Your Trusted Fuel Partner in the UAE', subtitle: 'We deliver reliable, high-quality diesel and fuel solutions with a commitment to safety, efficiency, and long-term partnerships.', image_url: '/images/why-choose-terminal.jpg', status: 'published' },
      { key: 'sectors', name: '6. Industries We Serve Carousel', title: 'Fuel Solutions for Key Industries', subtitle: 'Supplying high-quality diesel and fuel solutions to a wide range of industries across the UAE.', image_url: '', status: 'published' },
      { key: 'cta', name: '7. Get in Touch CTA Banner', title: 'Ready to Streamline Your Fuel Supply?', subtitle: 'Contact our 24/7 dispatch desk for custom volume pricing and priority delivery.', image_url: '/uploads/Dubai_Fuel_Supply_Partner_Banner_1794640505328.png', status: 'published' },
    ],
    about: [
      { key: 'hero', name: '1. Hero Banner', title: 'About Dubai Diesel Trading L.L.C.', subtitle: 'A trusted partner in diesel and fuel supply, storage, and distribution across the UAE.', image_url: '/images/about-hero-facility-bg.jpg', status: 'published' },
      { key: 'company', name: '2. Our Company Bento Section (Overview & Text)', title: 'A Trusted Name in Diesel & Fuel Trading', subtitle: 'Dubai Diesel Trading L.L.C. is a UAE-based fuel trading company specializing in the supply, storage, and distribution of high-quality diesel and fuel products...', image_url: '/images/about-bento-tank.jpg', status: 'published' },
      { key: 'bento_main', name: '3. Bento Card 1 (Main Large Tank Image)', title: 'Vertical Bulk Fuel Storage Reservoir', subtitle: 'Main prominent vertical tank photo in the 3-photo Bento collage.', image_url: '/images/about-bento-tank.jpg', status: 'published' },
      { key: 'bento_top', name: '4. Bento Card 2 (Top Storage Tanks Image)', title: 'Industrial Storage Tanks in Row', subtitle: 'Top-right secondary photo in the Bento collage.', image_url: '/images/about-bento-tanks-top.jpg', status: 'published' },
      { key: 'bento_bottom', name: '5. Bento Card 3 (Bottom Delivery Tanker Image)', title: 'Delivery Tanker Under Gantry', subtitle: 'Bottom-right photo in the Bento collage with red accent curve.', image_url: '/images/about-bento-truck-bottom.jpg', status: 'published' },
      { key: 'stats', name: '6. Highlights & Statistics Strip', title: 'Proven Track Record of Excellence', subtitle: '10+ Years Experience | 10+ Storage | 50+ Partners | 100+ Clients', image_url: '', status: 'published' },
      { key: 'why_choose', name: '7. Why Choose Dubai Diesel Section', title: 'Why Choose Dubai Diesel?', subtitle: 'We go beyond fuel supply — we deliver reliability, safety, and long-term value for your business.', image_url: '', status: 'published' },
      { key: 'certs', name: '8. Certifications & Compliance Strip', title: 'Our Certifications & Compliance', subtitle: 'ISO 9001, ISO 14001, ISO 45001 & UAE Regulatory Compliance', image_url: '/images/about-uae-falcon-emblem.png', status: 'published' },
      { key: 'cta', name: '9. Partner With Us CTA Banner', title: 'Partner with a Trusted Fuel Supply Company in the UAE', subtitle: 'Get reliable, safe, and efficient fuel solutions for your business.', image_url: '/images/cta-skyline-clean.jpg', status: 'published' },
    ],
    projects: [
      { key: 'hero', name: 'Hero Banner', title: 'Our Projects', subtitle: 'A showcase of our fuel supply solutions and successful partnerships across key industries in the UAE.', image_url: '/images/projects-hero-banner.jpg', status: 'published' },
      { key: 'stats', name: 'Project Highlights', title: '50+ Delivered | 100% On-Time Supply | Trusted Partnerships', subtitle: 'Reliable Fuel Solutions Across All Seven Emirates', image_url: '', status: 'published' },
      { key: 'cta', name: 'Project Requirement CTA', title: 'Have a Project Requirement?', subtitle: 'Get in touch with our team for a tailored fuel supply solution.', image_url: '/images/cta-skyline-clean.jpg', status: 'published' },
    ],
    services: [
      { key: 'hero', name: 'Hero Banner', title: 'Our Fuel Supply Services', subtitle: 'Comprehensive fuel trading, bunkering, and dedicated storage solutions for mission-critical industries in the UAE.', image_url: '/images/services-hero-tanker.jpg', status: 'published' },
      { key: 'why_choose', name: 'Why Choose Us', title: 'Certified Quality & Reliable On-Site Fleet', subtitle: 'ESMA Compliant 10PPM Diesel with GPS-tracked digital meter delivery tankers.', image_url: '/images/services-why-engineer.jpg', status: 'published' },
      { key: 'cta', name: 'Services CTA Banner', title: 'Need Bulk Diesel Delivered to Your Site?', subtitle: 'Talk to our fuel trading team today for priority schedule options.', image_url: '/images/cta-skyline-clean.jpg', status: 'published' },
    ],
    'service-diesel': [
      { key: 'hero', name: 'Hero Banner', title: 'Diesel Supply', subtitle: 'High-quality, low-emission diesel (EN 590 10ppm) delivered with unmatched reliability across the UAE.', image_url: '/images/detail-construction-hero.jpg', status: 'published' },
      { key: 'overview', name: 'Service Overview Side Image', title: 'High-Quality Diesel Supply', subtitle: 'We provide premium-grade Ultra Low Sulfur Diesel (EN 590 10ppm) tailored for commercial fleets, construction contractors, manufacturing facilities, and heavy industrial operations.', image_url: '/images/detail-construction-overview.jpg', status: 'published' },
      { key: 'benefits', name: 'Key Benefits Side Image', title: 'Key Benefits & Delivery Fleet', subtitle: 'Ultra Low Sulfur Diesel (10ppm) adhering to strict EN 590 standards with direct-to-tank mobile delivery.', image_url: '/images/services-card-diesel.jpg', status: 'published' },
    ],
    'service-industrial': [
      { key: 'hero', name: 'Hero Banner', title: 'Industrial Fuel', subtitle: 'Reliable fuel supply and continuous power support for manufacturing, logistics, and heavy industrial operations across the UAE.', image_url: '/images/service-card-industrial-exact.jpg', status: 'published' },
      { key: 'overview', name: 'Service Overview Side Image', title: 'Heavy Industrial Fuel Solutions', subtitle: 'Specialized fuel delivery for boilers, asphalt plants, steel manufacturing, and industrial generators with zero downtime.', image_url: '/images/service-industrial.jpg', status: 'published' },
      { key: 'benefits', name: 'Key Benefits Side Image', title: 'Industrial Key Benefits', subtitle: 'High thermal caloric value reducing overall fuel consumption per production cycle with strict ADNOC compliance.', image_url: '/images/industry-manufacturing.jpg', status: 'published' },
    ],
    'service-marine': [
      { key: 'hero', name: 'Hero Banner', title: 'Marine Fuel', subtitle: 'Certified Marine Gas Oil (MGO) bunkering and marine vessel fueling across major UAE ports and coastal terminals.', image_url: '/images/service-card-marine-exact.jpg', status: 'published' },
      { key: 'overview', name: 'Service Overview Side Image', title: 'Port & Offshore Bunkering', subtitle: 'Direct-to-vessel marine fuel supply adhering to strict MARPOL and international safety protocols.', image_url: '/images/service-card-marine-exact.jpg', status: 'published' },
      { key: 'benefits', name: 'Key Benefits Side Image', title: 'Marine Bunkering Specifications', subtitle: 'Certified ISO 8217 DMA specification with complete Bunker Delivery Notes (BDN) and rapid turnaround.', image_url: '/images/service-marine.jpg', status: 'published' },
    ],
    'service-generator': [
      { key: 'hero', name: 'Hero Banner', title: 'Generator Fuel', subtitle: '24/7 dedicated fuel delivery for emergency backup power and prime generators across construction sites and critical facilities.', image_url: '/images/service-generator.jpg', status: 'published' },
      { key: 'overview', name: 'Service Overview Side Image', title: 'Reliable Generator Refueling', subtitle: 'Prevent outages with automated and scheduled fuel refills for backup generators, telecoms, and hospitals.', image_url: '/images/service-generator.jpg', status: 'published' },
      { key: 'benefits', name: 'Key Benefits Side Image', title: 'Generator Reliability Benefits', subtitle: 'Low-ash EN 590 diesel with 24/7 priority emergency dispatch and telemetry tank monitoring.', image_url: '/images/services-card-generator.jpg', status: 'published' },
    ],
    'service-bulk': [
      { key: 'hero', name: 'Hero Banner', title: 'Bulk Fuel Supply', subtitle: 'Large-volume fuel trading and bulk transportation across Dubai, Abu Dhabi, Sharjah, and Northern Emirates.', image_url: '/images/service-bulk.jpg', status: 'published' },
      { key: 'overview', name: 'Service Overview Side Image', title: 'Wholesale Fuel Distribution', subtitle: 'High-capacity bulk deliveries with dedicated highway tanker fleets and automated metering systems.', image_url: '/images/service-bulk.jpg', status: 'published' },
      { key: 'benefits', name: 'Key Benefits Side Image', title: 'Bulk Delivery Fleet Logistics', subtitle: 'Modern ADR and Civil Defense certified road tankers with high discharge rates and calibrated flow meters.', image_url: '/images/services-card-bulk.jpg', status: 'published' },
    ],
    'service-storage': [
      { key: 'hero', name: 'Hero Banner', title: 'Fuel Storage & Distribution', subtitle: 'Safe, compliant bulk fuel storage terminal solutions and customized fuel management systems in the UAE.', image_url: '/images/about-bento-tank.jpg', status: 'published' },
      { key: 'overview', name: 'Service Overview Side Image', title: 'Terminal & Storage Infrastructure', subtitle: 'State-of-the-art bulk fuel reservoirs with civil defense compliance, metering bays, and distribution gantries.', image_url: '/images/services-hero-tanker.jpg', status: 'published' },
      { key: 'benefits', name: 'Key Benefits Side Image', title: 'Storage Safety Compliance', subtitle: 'Double-walled mobile skid tanks, automated dispensing pumps, and real-time inventory telemetry.', image_url: '/images/about-bento-tank.jpg', status: 'published' },
    ],
    industries: [
      { key: 'hero', name: 'Hero Banner', title: 'Industries We Serve', subtitle: 'Supplying high-quality diesel and fuel solutions to a wide range of industries across the UAE.', image_url: '/images/industries-hero-panorama-exact.jpg', status: 'published' },
      { key: 'cta', name: 'Custom Fuel Solution CTA', title: 'Need a Custom Fuel Solution for Your Industry?', subtitle: 'Talk to our industrial fuel consultants for tailored bulk delivery and fuel storage.', image_url: '/images/cta-skyline-clean.jpg', status: 'published' },
    ],
    blog: [
      { key: 'hero', name: 'Hero Banner', title: 'Industry Insights & Blog', subtitle: 'Industry insights, fuel market updates, and expert perspectives from the Dubai Diesel Trading L.L.C. technical team.', image_url: '/images/blog-hero-banner.jpg', status: 'published' },
    ],
    gallery: [
      { key: 'hero', name: 'Gallery Hero Banner', title: 'Corporate Gallery', subtitle: 'Explore our fuel storage terminals, specialized tanker fleet, and high-capacity operations across the United Arab Emirates.', image_url: '/images/gallery-hero-banner.jpg', status: 'published' },
    ],
    contact: [
      { key: 'hero', name: 'Contact Hero Banner', title: 'Contact Our Fuel Logistics Team', subtitle: '24/7 dedicated support for fuel delivery, bulk quotes, and emergency re-fuelling across Dubai and Northern Emirates.', image_url: '/images/contact-hero-banner.jpg', status: 'published' },
      { key: 'office', name: 'Head Office Card', title: 'Dubai Head Office & Terminal', subtitle: 'Operating hours: Monday to Friday 8:00 AM - 6:00 PM', image_url: '/images/contact-head-office.jpg', status: 'published' },
    ],
  };

  const currentSections = defaultPageSections[selectedPage] || [
    { key: 'hero', name: 'Hero Banner', title: 'Page Section', subtitle: 'Configure this page section content and media.', image_url: '', status: 'published' },
  ];

  const handleEditClick = (sec) => {
    const liveKey = `${selectedPage}.${sec.key}`;
    const live = pageSections[liveKey];
    const contentObj = live?.content ? { ...live.content } : {};

    // Bento section defaults
    if (selectedPage === 'about' && sec.key === 'company') {
      const bentoMain = pageSections['about.bento_main'];
      const bentoTop = pageSections['about.bento_top'];
      const bentoBottom = pageSections['about.bento_bottom'];
      if (!contentObj.image_main) contentObj.image_main = bentoMain?.image_url || live?.image_url || '/images/about-bento-tank.jpg';
      if (!contentObj.image_top) contentObj.image_top = bentoTop?.image_url || '/images/about-bento-tanks-top.jpg';
      if (!contentObj.image_bottom) contentObj.image_bottom = bentoBottom?.image_url || '/images/about-bento-truck-bottom.jpg';
      if (!contentObj.button_text) contentObj.button_text = 'Learn More About Us';
      if (!contentObj.button_link) contentObj.button_link = '#why-choose';
    }

    setEditingSection({
      page_slug: selectedPage,
      section_key: sec.key,
      name: sec.name,
      title: live?.title !== undefined ? live.title : sec.title,
      subtitle: live?.subtitle !== undefined ? live.subtitle : sec.subtitle,
      image_url: live?.image_url !== undefined ? live.image_url : sec.image_url,
      status: live?.status || sec.status || 'published',
      content: contentObj,
    });
    setSaveStatus('');
  };

  const handleSaveSection = async (publish = true) => {
    if (!editingSection) return;
    setSaveStatus('Saving to Hostinger MySQL...');

    const payload = {
      ...editingSection,
      status: publish ? 'published' : 'draft',
    };

    const res = await saveSection(editingSection.page_slug, editingSection.section_key, payload, user?.full_name);

    // If saving about.company with multi-cards, sync bento_main, bento_top, bento_bottom
    if (editingSection.page_slug === 'about' && editingSection.section_key === 'company') {
      if (editingSection.content?.image_main) {
        await saveSection('about', 'bento_main', {
          title: 'Vertical Bulk Fuel Storage Reservoir',
          subtitle: 'Main prominent photo in the 3-photo Bento collage.',
          image_url: editingSection.content.image_main,
          status: publish ? 'published' : 'draft',
        }, user?.full_name);
      }
      if (editingSection.content?.image_top) {
        await saveSection('about', 'bento_top', {
          title: 'Industrial Storage Tanks in Row',
          subtitle: 'Top-right secondary photo in the Bento collage.',
          image_url: editingSection.content.image_top,
          status: publish ? 'published' : 'draft',
        }, user?.full_name);
      }
      if (editingSection.content?.image_bottom) {
        await saveSection('about', 'bento_bottom', {
          title: 'Delivery Tanker Under Gantry',
          subtitle: 'Bottom-right photo in the Bento collage with red accent curve.',
          image_url: editingSection.content.image_bottom,
          status: publish ? 'published' : 'draft',
        }, user?.full_name);
      }
    }

    // If saving an individual Bento card, keep about.company content updated
    if (editingSection.page_slug === 'about') {
      const compLive = pageSections['about.company'];
      if (editingSection.section_key === 'bento_main') {
        const updatedContent = { ...(compLive?.content || {}), image_main: editingSection.image_url };
        await saveSection('about', 'company', {
          title: compLive?.title || 'A Trusted Name in Diesel & Fuel Trading',
          subtitle: compLive?.subtitle || 'Dubai Diesel Trading L.L.C. is a UAE-based fuel trading company...',
          image_url: editingSection.image_url,
          content: updatedContent,
          status: publish ? 'published' : 'draft',
        }, user?.full_name);
      } else if (editingSection.section_key === 'bento_top') {
        const updatedContent = { ...(compLive?.content || {}), image_top: editingSection.image_url };
        await saveSection('about', 'company', {
          title: compLive?.title || 'A Trusted Name in Diesel & Fuel Trading',
          subtitle: compLive?.subtitle || 'Dubai Diesel Trading L.L.C. is a UAE-based fuel trading company...',
          image_url: compLive?.image_url || '/images/about-bento-tank.jpg',
          content: updatedContent,
          status: publish ? 'published' : 'draft',
        }, user?.full_name);
      } else if (editingSection.section_key === 'bento_bottom') {
        const updatedContent = { ...(compLive?.content || {}), image_bottom: editingSection.image_url };
        await saveSection('about', 'company', {
          title: compLive?.title || 'A Trusted Name in Diesel & Fuel Trading',
          subtitle: compLive?.subtitle || 'Dubai Diesel Trading L.L.C. is a UAE-based fuel trading company...',
          image_url: compLive?.image_url || '/images/about-bento-tank.jpg',
          content: updatedContent,
          status: publish ? 'published' : 'draft',
        }, user?.full_name);
      }
    }

    if (res.success) {
      setSaveStatus(publish ? 'Published successfully!' : 'Draft saved successfully!');
      setTimeout(() => {
        setEditingSection(null);
        setSaveStatus('');
      }, 800);
    } else {
      setSaveStatus('Error saving section. Please try again.');
    }
  };

  const isBentoOverview = editingSection?.page_slug === 'about' && editingSection?.section_key === 'company';
  const hasButtonSettings = isBentoOverview || editingSection?.section_key === 'cta' || editingSection?.section_key === 'hero';

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Page &amp; Section Management</h1>
          <p className="adm-page-desc">Select any page below to edit its individual sections, cards, headings, images, and buttons.</p>
        </div>
      </div>

      {/* Page Selector Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
        {pagesList.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`adm-btn-secondary ${selectedPage === p.id ? 'active' : ''}`}
            style={{
              whiteSpace: 'nowrap',
              background: selectedPage === p.id ? '#0A2246' : '#FFFFFF',
              color: selectedPage === p.id ? '#FFFFFF' : '#0A2246',
              borderColor: selectedPage === p.id ? '#0A2246' : '#E2E8F0',
              fontWeight: '600',
            }}
            onClick={() => setSelectedPage(p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Sections Grid for Selected Page */}
      <div className="adm-card">
        <div className="adm-card-header">
          <h2 className="adm-card-title">Sections in {pagesList.find((p) => p.id === selectedPage)?.name}</h2>
          <span className="adm-badge adm-badge-navy">{currentSections.length} Sections Configured</span>
        </div>
        <div className="adm-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {currentSections.map((sec) => {
              const liveKey = `${selectedPage}.${sec.key}`;
              const live = pageSections[liveKey];
              const title = live?.title !== undefined ? live.title : sec.title;
              const sub = live?.subtitle !== undefined ? live.subtitle : sec.subtitle;
              const img = live?.image_url !== undefined ? live.image_url : sec.image_url;
              const status = live?.status || sec.status || 'published';

              return (
                <div
                  key={sec.key}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '18px',
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px', color: '#D51F26' }}>
                        {sec.name}
                      </span>
                      <span className={`adm-badge ${status === 'published' ? 'adm-badge-success' : 'adm-badge-warning'}`}>
                        {status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#0A2246', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 14px 0', lineHeight: 1.4 }}>
                      {sub}
                    </p>

                    {img && (
                      <div style={{ position: 'relative', height: '110px', borderRadius: '6px', overflow: 'hidden', background: '#0A2246', marginBottom: '14px' }}>
                        <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px' }}>
                          Card Media
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                    <button
                      type="button"
                      className="adm-btn-primary"
                      style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: '12.5px' }}
                      onClick={() => handleEditClick(sec)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span>Edit Section</span>
                    </button>
                    <a
                      href={pagesList.find((p) => p.id === selectedPage)?.route || '/'}
                      target="_blank"
                      rel="noreferrer"
                      className="adm-btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '12.5px' }}
                      title="Preview on Public Website"
                    >
                      <span>View</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="adm-modal-backdrop" onClick={() => setEditingSection(null)}>
          <div className="adm-modal" style={{ maxWidth: '680px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">Edit: {editingSection.name}</h2>
              <button type="button" className="adm-modal-close" onClick={() => setEditingSection(null)}>&times;</button>
            </div>

            <div className="adm-modal-body" style={{ overflowY: 'auto', flex: 1 }}>
              <div className="adm-form-group">
                <label className="adm-form-label">Heading / Title</label>
                <input
                  type="text"
                  className="adm-input"
                  value={editingSection.title || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-form-label">Subtitle / Description</label>
                <textarea
                  className="adm-textarea"
                  rows={3}
                  value={editingSection.subtitle || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                />
              </div>

              {/* Primary Image Control */}
              <ImageUploadControl
                label={isBentoOverview ? "Card 1 Image: Main Large Tank Photo (Left)" : "Section / Card Image"}
                value={isBentoOverview ? (editingSection.content?.image_main || editingSection.image_url) : editingSection.image_url}
                onChange={(newUrl) => {
                  if (isBentoOverview) {
                    setEditingSection({
                      ...editingSection,
                      image_url: newUrl,
                      content: { ...(editingSection.content || {}), image_main: newUrl },
                    });
                  } else {
                    setEditingSection({ ...editingSection, image_url: newUrl });
                  }
                }}
                media={media}
                uploadImage={uploadImage}
                userName={user?.full_name}
              />

              {/* Extra Images for Bento Overview */}
              {isBentoOverview && (
                <>
                  <div style={{ margin: '14px 0 10px 0', borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0A2246', marginBottom: '4px' }}>
                      Additional Bento Cards Images:
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px 0' }}>
                      Upload separate images for each of the secondary cards in the Our Company 3-photo collage.
                    </p>
                  </div>

                  <ImageUploadControl
                    label="Card 2 Image: Top-Right Storage Tanks Photo"
                    value={editingSection.content?.image_top || '/images/about-bento-tanks-top.jpg'}
                    onChange={(newUrl) => {
                      setEditingSection({
                        ...editingSection,
                        content: { ...(editingSection.content || {}), image_top: newUrl },
                      });
                    }}
                    media={media}
                    uploadImage={uploadImage}
                    userName={user?.full_name}
                  />

                  <ImageUploadControl
                    label="Card 3 Image: Bottom-Right Delivery Tanker Photo"
                    value={editingSection.content?.image_bottom || '/images/about-bento-truck-bottom.jpg'}
                    onChange={(newUrl) => {
                      setEditingSection({
                        ...editingSection,
                        content: { ...(editingSection.content || {}), image_bottom: newUrl },
                      });
                    }}
                    media={media}
                    uploadImage={uploadImage}
                    userName={user?.full_name}
                  />
                </>
              )}

              {/* Hero Section Live Text Indicator */}
              {editingSection?.section_key === 'hero' && (
                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" width="18" height="18">
                      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                    </svg>
                    <strong style={{ fontSize: '13px', color: '#1E40AF' }}>Live Actual Text Mode Active</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#1E3A8A', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                    The title, subtitle, breadcrumbs, and action buttons for this hero section are rendered as <strong>real, selectable, and editable HTML text</strong> directly on top of your background photo. Search engines index this text and it updates instantly when you edit the fields below.
                  </p>
                  <div style={{ borderTop: '1px solid #DBEAFE', paddingTop: '10px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#1E40AF', display: 'block', marginBottom: '6px' }}>
                      Recommended Clean Background Photo Presets (No baked-in text):
                    </span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {editingSection?.page_slug === 'home' && (
                        <button
                          type="button"
                          className="adm-btn-secondary"
                          style={{ fontSize: '11.5px', padding: '5px 10px', background: '#ffffff' }}
                          onClick={() => setEditingSection({
                            ...editingSection,
                            image_url: '/images/hero-terminal.jpg',
                            content: { ...(editingSection.content || {}), banner_mode: 'text' }
                          })}
                        >
                          Use Dubai Terminal Panoramic Photo
                        </button>
                      )}
                      {editingSection?.page_slug === 'projects' && (
                        <button
                          type="button"
                          className="adm-btn-secondary"
                          style={{ fontSize: '11.5px', padding: '5px 10px', background: '#ffffff' }}
                          onClick={() => setEditingSection({
                            ...editingSection,
                            image_url: '/images/projects-hero-banner.jpg',
                            content: { ...(editingSection.content || {}), banner_mode: 'text' }
                          })}
                        >
                          Use Clean Storage Tanks Banner Photo
                        </button>
                      )}
                      {editingSection?.page_slug === 'services' && (
                        <button
                          type="button"
                          className="adm-btn-secondary"
                          style={{ fontSize: '11.5px', padding: '5px 10px', background: '#ffffff' }}
                          onClick={() => setEditingSection({
                            ...editingSection,
                            image_url: '/images/services-hero-tanker.jpg',
                            content: { ...(editingSection.content || {}), banner_mode: 'text' }
                          })}
                        >
                          Use Clean Tanker &amp; Facility Photo
                        </button>
                      )}
                      {editingSection?.page_slug === 'about' && (
                        <button
                          type="button"
                          className="adm-btn-secondary"
                          style={{ fontSize: '11.5px', padding: '5px 10px', background: '#ffffff' }}
                          onClick={() => setEditingSection({
                            ...editingSection,
                            image_url: '/images/about-hero-facility-bg.jpg',
                            content: { ...(editingSection.content || {}), banner_mode: 'text' }
                          })}
                        >
                          Use Dubai Diesel Head Office Photo
                        </button>
                      )}
                      {editingSection?.page_slug === 'industries' && (
                        <button
                          type="button"
                          className="adm-btn-secondary"
                          style={{ fontSize: '11.5px', padding: '5px 10px', background: '#ffffff' }}
                          onClick={() => setEditingSection({
                            ...editingSection,
                            image_url: '/images/industries-hero-panorama-exact.jpg',
                            content: { ...(editingSection.content || {}), banner_mode: 'text' }
                          })}
                        >
                          Use Refinery &amp; Storage Panorama Photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Banner Display Mode for CTA section */}
              {editingSection?.section_key === 'cta' && (() => {
                const isGraphicSelected = editingSection.content?.banner_mode === 'graphic';
                const isStandardSelected = !isGraphicSelected;

                return (
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0A2246', marginBottom: '6px' }}>
                      CTA Banner Display Mode
                    </label>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 10px 0' }}>
                      Choose how this CTA banner displays on the website:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '600', color: isStandardSelected ? '#D51F26' : '#334155' }}>
                        <input
                          type="radio"
                          name="banner_mode"
                          value="text"
                          checked={isStandardSelected}
                          onChange={() => setEditingSection({
                            ...editingSection,
                            content: { ...(editingSection.content || {}), banner_mode: 'text' }
                          })}
                        />
                        Standard Background Photo (Renders live editable title, subtitle, and action button on top of background photo)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '600', color: isGraphicSelected ? '#D51F26' : '#334155' }}>
                        <input
                          type="radio"
                          name="banner_mode"
                          value="graphic"
                          checked={isGraphicSelected}
                          onChange={() => setEditingSection({
                            ...editingSection,
                            content: { ...(editingSection.content || {}), banner_mode: 'graphic' }
                          })}
                        />
                        Graphic Banner (Display uploaded artwork as a single flattened banner)
                      </label>
                    </div>

                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
                      <button
                        type="button"
                        className="adm-btn-secondary"
                        style={{ fontSize: '11.5px', padding: '5px 10px', background: '#ffffff' }}
                        onClick={() => setEditingSection({
                          ...editingSection,
                          image_url: '/images/cta-skyline-clean.jpg',
                          content: { ...(editingSection.content || {}), banner_mode: 'text' }
                        })}
                      >
                        Reset to Clean Dubai Skyline Photo Preset (No baked-in text)
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Button & Link Settings */}
              {hasButtonSettings && (
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0A2246', marginBottom: '10px' }}>
                    Button &amp; Link Settings
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Button Text</span>
                      <input
                        type="text"
                        className="adm-input"
                        placeholder="e.g. Learn More About Us"
                        value={editingSection.content?.button_text || ''}
                        onChange={(e) => setEditingSection({
                          ...editingSection,
                          content: { ...(editingSection.content || {}), button_text: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Button Link / Target</span>
                      <input
                        type="text"
                        className="adm-input"
                        placeholder="e.g. #why-choose or /services"
                        value={editingSection.content?.button_link || ''}
                        onChange={(e) => setEditingSection({
                          ...editingSection,
                          content: { ...(editingSection.content || {}), button_link: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {saveStatus && (
                <div style={{ padding: '10px 14px', borderRadius: '6px', background: '#F0FDF4', color: '#166534', fontSize: '13px', fontWeight: '600', marginTop: '14px' }}>
                  {saveStatus}
                </div>
              )}
            </div>

            <div className="adm-modal-footer">
              <button type="button" className="adm-btn-secondary" onClick={() => setEditingSection(null)}>Cancel</button>
              <button type="button" className="adm-btn-secondary" onClick={() => handleSaveSection(false)}>Save Draft</button>
              <button type="button" className="adm-btn-primary" onClick={() => handleSaveSection(true)}>Publish Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
