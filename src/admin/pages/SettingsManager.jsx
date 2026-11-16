// src/admin/pages/SettingsManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';

export default function SettingsManager() {
  const { settings, saveSettings } = useCms();
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
              </div>
            )}

            {activeTab === 'branding' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0A2246', marginBottom: '16px' }}>Company Identity &amp; Footer</h3>

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
