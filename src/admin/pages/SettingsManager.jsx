// src/admin/pages/SettingsManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import ImageUploadControl from '../components/ImageUploadControl';

function LinkListEditor({ label, value, onChange, helpText }) {
  let links = [];
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    if (Array.isArray(parsed)) links = parsed;
  } catch {
    links = [];
  }

  const update = (next) => onChange(JSON.stringify(next));

  const handleItemChange = (index, field, newValue) => {
    update(
      links.map((item, i) => (i === index ? { ...item, [field]: newValue } : item))
    );
  };

  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <label className="adm-form-label" style={{ marginBottom: 0 }}>{label}</label>
        <button
          type="button"
          className="adm-btn-primary"
          style={{ padding: '7px 12px', fontSize: '12px' }}
          onClick={() => update([...links, { label: '', url: '/' }])}
        >
          + Add Link
        </button>
      </div>
      {helpText && (
        <small style={{ color: '#64748B', fontSize: '12px', marginBottom: '10px', display: 'block' }}>
          {helpText}
        </small>
      )}
      {links.map((link, index) => (
        <div
          key={index}
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr) auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}
        >
          <input
            type="text"
            className="adm-input"
            placeholder="Link text"
            value={link.label || ''}
            onChange={(e) => handleItemChange(index, 'label', e.target.value)}
          />
          <input
            type="text"
            className="adm-input"
            placeholder="/page, #section or https://..."
            value={link.url || ''}
            onChange={(e) => handleItemChange(index, 'url', e.target.value)}
          />
          <button
            type="button"
            onClick={() => update(links.filter((_, i) => i !== index))}
            style={{ background: 'transparent', border: 'none', color: '#DC2626', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: '6px' }}
            title="Remove this link"
          >
            Remove
          </button>
        </div>
      ))}
      {links.length === 0 && (
        <p style={{ color: '#94A3B8', fontSize: '12px', margin: '4px 0 0 0' }}>No links yet. Click "+ Add Link" to create one.</p>
      )}
    </div>
  );
}

export default function SettingsManager() {
  const { settings, saveSettings, media, uploadImage } = useCms();
  const { user } = useAuth();

  const [formData, setFormData] = useState({ ...settings });
  const [statusMessage, setStatusMessage] = useState('');
  const [activeTab, setActiveTab] = useState('contact');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMessage('Saving settings to Hostinger MySQL...');
    const res = await saveSettings(formData, user?.full_name);
    if (res.success) {
      setStatusMessage('Settings saved successfully!');
      setTimeout(() => setStatusMessage(''), 2500);
    } else {
      setStatusMessage('Error saving settings.');
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Global Website Settings</h1>
          <p className="adm-page-desc">Configure company contact details, branding, SEO meta tags, and social media links.</p>
        </div>
      </div>

      {statusMessage && (
        <div style={{ padding: '12px 18px', background: '#F0FDF4', color: '#166534', borderRadius: '8px', marginBottom: '18px', fontWeight: '600', fontSize: '13.5px' }}>
          {statusMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="adm-tabs">
        <button
          type="button"
          className={`adm-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact &amp; Location
        </button>
        <button
          type="button"
          className={`adm-tab-btn ${activeTab === 'branding' ? 'active' : ''}`}
          onClick={() => setActiveTab('branding')}
        >
          Branding &amp; Footer
        </button>
        <button
          type="button"
          className={`adm-tab-btn ${activeTab === 'footer' ? 'active' : ''}`}
          onClick={() => setActiveTab('footer')}
        >
          Footer Content
        </button>
        <button
          type="button"
          className={`adm-tab-btn ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          Social &amp; WhatsApp
        </button>
        <button
          type="button"
          className={`adm-tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          SEO Meta Tags
        </button>
      </div>

      <form onSubmit={handleSave}>
        <div className="adm-card">
          <div className="adm-card-body">
            {activeTab === 'contact' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2246', marginBottom: '16px' }}>Corporate Contact Information</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Primary Phone (Landline)</label>
                    <input
                      type="text"
                      name="phone"
                      className="adm-input"
                      value={formData.phone || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Secondary / Mobile Phone</label>
                    <input
                      type="text"
                      name="phone_secondary"
                      className="adm-input"
                      value={formData.phone_secondary || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Primary Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="adm-input"
                      value={formData.email || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Business Working Hours</label>
                    <input
                      type="text"
                      name="working_hours"
                      className="adm-input"
                      value={formData.working_hours || ''}
                      onChange={handleChange}
                      placeholder="Mon - Fri: 8:00 AM - 6:00 PM"
                    />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Registered Office Location &amp; Address</label>
                  <input
                    type="text"
                    name="address"
                    className="adm-input"
                    value={formData.address || ''}
                    onChange={handleChange}
                    placeholder="Dubai, United Arab Emirates"
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Google Maps Embed URL (Iframe Link)</label>
                  <input
                    type="text"
                    name="map_embed_url"
                    className="adm-input"
                    value={formData.map_embed_url || ''}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/maps?q=Dubai%2C+United+Arab+Emirates&output=embed"
                  />
                  <small style={{ color: '#64748B', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    Leave blank to use the default Dubai Diesel Trading L.L.C., Dubai location map.
                  </small>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2246', marginBottom: '16px' }}>Company Identity</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Company Official Name (English)</label>
                    <input
                      type="text"
                      name="company_name"
                      className="adm-input"
                      value={formData.company_name || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Company Official Name (Arabic)</label>
                    <input
                      type="text"
                      name="company_name_ar"
                      className="adm-input"
                      value={formData.company_name_ar || ''}
                      onChange={handleChange}
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2246', marginBottom: '6px' }}>Footer Content</h3>
                <p style={{ color: '#64748B', fontSize: '12.5px', marginBottom: '18px' }}>
                  Every field here updates the live website footer. Social icon links are managed in the
                  Social &amp; WhatsApp tab, and contact details in the Contact &amp; Location tab.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Brand Name (Arabic)</label>
                    <input
                      type="text"
                      name="footer_brand_arabic"
                      className="adm-input"
                      value={formData.footer_brand_arabic || ''}
                      onChange={handleChange}
                      dir="rtl"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Brand Name (English)</label>
                    <input
                      type="text"
                      name="footer_brand_name"
                      className="adm-input"
                      value={formData.footer_brand_name || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Brand Subtitle</label>
                    <input
                      type="text"
                      name="footer_brand_subtitle"
                      className="adm-input"
                      value={formData.footer_brand_subtitle || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Column Heading: Quick Links</label>
                    <input
                      type="text"
                      name="footer_quick_heading"
                      className="adm-input"
                      value={formData.footer_quick_heading || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Column Heading: Services</label>
                    <input
                      type="text"
                      name="footer_services_heading"
                      className="adm-input"
                      value={formData.footer_services_heading || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Column Heading: Contact Info</label>
                    <input
                      type="text"
                      name="footer_contact_heading"
                      className="adm-input"
                      value={formData.footer_contact_heading || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Footer Description</label>
                  <textarea
                    name="footer_description"
                    className="adm-textarea"
                    rows={3}
                    value={formData.footer_description || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Footer Copyright Notice</label>
                  <input
                    type="text"
                    name="copyright_text"
                    className="adm-input"
                    value={formData.copyright_text || ''}
                    onChange={handleChange}
                  />
                </div>

                <ImageUploadControl
                  label="Footer Terminal Image"
                  value={formData.footer_image_url || ''}
                  onChange={(url) => setFormData((prev) => ({ ...prev, footer_image_url: url }))}
                  media={media}
                  uploadImage={uploadImage}
                  userName={user?.full_name}
                  helpText="Decorative image shown on the right side of the footer. Leave empty to hide it."
                />

                <LinkListEditor
                  label="Quick Links"
                  value={formData.footer_quick_links}
                  onChange={(value) => setFormData((prev) => ({ ...prev, footer_quick_links: value }))}
                  helpText="Use /path for internal pages, #section for on-page anchors, or a full https:// URL for external sites."
                />
                <LinkListEditor
                  label="Our Services Links"
                  value={formData.footer_service_links}
                  onChange={(value) => setFormData((prev) => ({ ...prev, footer_service_links: value }))}
                />
                <LinkListEditor
                  label="Bottom Legal Links"
                  value={formData.footer_legal_links}
                  onChange={(value) => setFormData((prev) => ({ ...prev, footer_legal_links: value }))}
                />
              </div>
            )}

            {activeTab === 'social' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2246', marginBottom: '16px' }}>Social Profiles &amp; WhatsApp Integration</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">WhatsApp Contact Number (with Country Code)</label>
                    <input
                      type="text"
                      name="whatsapp_number"
                      className="adm-input"
                      value={formData.whatsapp_number || ''}
                      onChange={handleChange}
                      placeholder="+971501234567"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Floating WhatsApp Button</label>
                    <select
                      name="whatsapp_enabled"
                      className="adm-select"
                      value={formData.whatsapp_enabled || 'true'}
                      onChange={handleChange}
                    >
                      <option value="true">Enabled (Visible on public pages)</option>
                      <option value="false">Disabled</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">LinkedIn URL</label>
                    <input
                      type="text"
                      name="linkedin_url"
                      className="adm-input"
                      value={formData.linkedin_url || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Instagram URL</label>
                    <input
                      type="text"
                      name="instagram_url"
                      className="adm-input"
                      value={formData.instagram_url || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">YouTube URL</label>
                    <input
                      type="text"
                      name="youtube_url"
                      className="adm-input"
                      value={formData.youtube_url || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Facebook URL</label>
                    <input
                      type="text"
                      name="facebook_url"
                      className="adm-input"
                      value={formData.facebook_url || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2246', marginBottom: '16px' }}>Search Engine Optimization (SEO)</h3>

                <div className="adm-form-group">
                  <label className="adm-form-label">Default Site Tagline (appears in browser tab)</label>
                  <input
                    type="text"
                    name="site_tagline"
                    className="adm-input"
                    value={formData.site_tagline || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Meta Description (for Google search results)</label>
                  <textarea
                    name="meta_description"
                    className="adm-textarea"
                    rows={3}
                    value={formData.meta_description || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="adm-card-header" style={{ justifyContent: 'flex-end', background: '#FAFAFA' }}>
            <button type="submit" className="adm-btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              <span>Save Website Settings</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
