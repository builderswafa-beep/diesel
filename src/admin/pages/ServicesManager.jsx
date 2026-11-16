// src/admin/pages/ServicesManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import ImageUploadControl from '../components/ImageUploadControl';

export default function ServicesManager() {
  const { services, saveService, saveSection, pageSections, media, uploadImage } = useCms();
  const { user } = useAuth();

  const [editingService, setEditingService] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const serviceKeyMap = {
    'diesel-supply': 'service-diesel',
    'industrial-fuel': 'service-industrial',
    'marine-fuel': 'service-marine',
    'generator-fuel': 'service-generator',
    'bulk-fuel-supply': 'service-bulk',
    'fuel-storage-distribution': 'service-storage',
    'storage-distribution': 'service-storage',
  };

  const handleEdit = (srv) => {
    const pageSlug = serviceKeyMap[srv.service_id] || `service-${srv.service_id}`;
    const heroSec = pageSections?.[`${pageSlug}.hero`];
    const overviewSec = pageSections?.[`${pageSlug}.overview`];
    const benefitsSec = pageSections?.[`${pageSlug}.benefits`];

    setEditingService({
      id: srv.id,
      service_id: srv.service_id,
      pageSlug,
      title: srv.title,
      subtitle: srv.subtitle || '',
      overview: srv.overview || '',
      hero_image: srv.hero_image || heroSec?.image_url || '',
      overview_image: srv.overview_image || overviewSec?.image_url || '',
      benefits_image: srv.benefits_image || benefitsSec?.image_url || '',
      icon: srv.icon || 'truck',
      order_index: srv.order_index || 0,
      status: srv.status || 'published',
    });
    setStatusMessage('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMessage('Saving service to database...');
    const res = await saveService(editingService, user?.full_name);

    // Sync to page_sections so both PagesManager and ServicesManager are 100% synchronized
    if (editingService.pageSlug) {
      if (editingService.hero_image) {
        await saveSection(editingService.pageSlug, 'hero', {
          title: editingService.title,
          subtitle: editingService.subtitle,
          image_url: editingService.hero_image,
          status: editingService.status,
        }, user?.full_name);
      }
      if (editingService.overview_image) {
        await saveSection(editingService.pageSlug, 'overview', {
          title: editingService.title,
          subtitle: editingService.overview,
          image_url: editingService.overview_image,
          status: editingService.status,
        }, user?.full_name);
      }
      if (editingService.benefits_image) {
        await saveSection(editingService.pageSlug, 'benefits', {
          title: 'Key Benefits',
          subtitle: 'Certified quality & specs',
          image_url: editingService.benefits_image,
          status: editingService.status,
        }, user?.full_name);
      }
    }

    if (res.success) {
      setStatusMessage('Service & all detail page images updated successfully!');
      setTimeout(() => {
        setEditingService(null);
        setStatusMessage('');
      }, 700);
    } else {
      setStatusMessage('Error updating service.');
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Fuel Services Management (6 Services)</h1>
          <p className="adm-page-desc">Manage the 6 core fuel trading services and their dedicated detail pages, including hero banner and side images.</p>
        </div>
      </div>

      {statusMessage && (
        <div style={{ padding: '12px 18px', background: '#F0FDF4', color: '#166534', borderRadius: '8px', marginBottom: '18px', fontWeight: '600', fontSize: '13.5px' }}>
          {statusMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '22px' }}>
        {services.map((srv) => (
          <div
            key={srv.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ position: 'relative', height: '170px', background: '#0A2246' }}>
                <img src={srv.hero_image} alt={srv.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#D51F26',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  Core Service #{srv.order_index || 0}
                </span>
              </div>

              <div style={{ padding: '16px 18px' }}>
                <h3 style={{ fontSize: '16.5px', fontWeight: '800', color: '#0A2246', margin: '0 0 6px 0' }}>
                  {srv.title}
                </h3>
                {srv.subtitle && (
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#D51F26', marginBottom: '8px' }}>
                    {srv.subtitle}
                  </div>
                )}
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.45', margin: '0 0 12px 0' }}>
                  {srv.overview}
                </p>

                {/* 3 Images Thumbnails Preview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>Hero Banner</span>
                    <div style={{ height: '44px', borderRadius: '6px', overflow: 'hidden', background: '#0A2246', border: '1px solid #E2E8F0' }}>
                      <img src={srv.hero_image} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>Overview Side</span>
                    <div style={{ height: '44px', borderRadius: '6px', overflow: 'hidden', background: '#0A2246', border: '1px solid #E2E8F0' }}>
                      <img src={srv.overview_image || '/images/detail-construction-overview.jpg'} alt="Overview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>Benefits Side</span>
                    <div style={{ height: '44px', borderRadius: '6px', overflow: 'hidden', background: '#0A2246', border: '1px solid #E2E8F0' }}>
                      <img src={srv.benefits_image || '/images/services-card-diesel.jpg'} alt="Benefits" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 18px', borderTop: '1px solid #F1F5F9', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a
                href={`/services/${srv.service_id}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '12px', color: '#0A2246', fontWeight: '600', textDecoration: 'none' }}
              >
                View Public Page &rarr;
              </a>
              <button
                type="button"
                className="adm-btn-primary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => handleEdit(srv)}
              >
                Edit Content &amp; Images
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Editor Modal */}
      {editingService && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal" style={{ maxWidth: '680px' }}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">Edit Service: {editingService.title}</h2>
              <button type="button" className="adm-modal-close" onClick={() => setEditingService(null)}>&times;</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="adm-modal-body" style={{ maxHeight: '78vh', overflowY: 'auto' }}>
                <div className="adm-form-group">
                  <label className="adm-form-label">Service Title *</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Subtitle / Key Tagline</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={editingService.subtitle}
                    onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Service Overview &amp; Specifications *</label>
                  <textarea
                    className="adm-textarea"
                    rows={4}
                    value={editingService.overview}
                    onChange={(e) => setEditingService({ ...editingService, overview: e.target.value })}
                    required
                  />
                </div>

                {/* All 3 Service Images Management */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', marginBottom: '18px' }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '13.5px', fontWeight: '800', color: '#0A2246', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Service Images &amp; Side Media (Detail Page)
                  </h4>
                  <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#64748B' }}>
                    Control all 3 photo sections for this service detail page. Upload directly from your computer or choose from your media library.
                  </p>

                  <ImageUploadControl
                    label="1. Top Hero Banner &amp; Grid Card Photo *"
                    value={editingService.hero_image}
                    onChange={(url) => setEditingService({ ...editingService, hero_image: url })}
                    media={media}
                    uploadImage={uploadImage}
                    userName={user?.full_name}
                    helpText="Displayed on the top hero banner of the service detail page and the Services overview card."
                  />

                  <div style={{ height: '14px' }}></div>

                  <ImageUploadControl
                    label="2. Overview Section Side Photo *"
                    value={editingService.overview_image}
                    onChange={(url) => setEditingService({ ...editingService, overview_image: url })}
                    media={media}
                    uploadImage={uploadImage}
                    userName={user?.full_name}
                    helpText="Side photo displayed beside the 'High-Quality Service' overview text and Request a Quote button."
                  />

                  <div style={{ height: '14px' }}></div>

                  <ImageUploadControl
                    label="3. Key Benefits &amp; Specifications Side Photo *"
                    value={editingService.benefits_image}
                    onChange={(url) => setEditingService({ ...editingService, benefits_image: url })}
                    media={media}
                    uploadImage={uploadImage}
                    userName={user?.full_name}
                    helpText="Side photo displayed beside the Key Benefits checklist and operational standards."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Icon Type</label>
                    <select
                      className="adm-select"
                      value={editingService.icon}
                      onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    >
                      <option value="truck">Road Tanker (truck)</option>
                      <option value="factory">Refinery / Factory</option>
                      <option value="ship">Marine Vessel (ship)</option>
                      <option value="lightning">Power Generator</option>
                      <option value="truck-tank">Bulk Fleet</option>
                      <option value="warehouse">Storage &amp; Terminal</option>
                    </select>
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Status</label>
                    <select
                      className="adm-select"
                      value={editingService.status}
                      onChange={(e) => setEditingService({ ...editingService, status: e.target.value })}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="adm-modal-footer">
                <button type="button" className="adm-btn-secondary" onClick={() => setEditingService(null)}>Cancel</button>
                <button type="submit" className="adm-btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
