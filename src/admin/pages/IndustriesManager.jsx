// src/admin/pages/IndustriesManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import ImageUploadControl from '../components/ImageUploadControl';

export default function IndustriesManager() {
  const { industries, saveIndustry, media, uploadImage } = useCms();
  const { user } = useAuth();

  const [editingIndustry, setEditingIndustry] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleEdit = (ind) => {
    setEditingIndustry({
      id: ind.id,
      industry_id: ind.industry_id,
      title: ind.title,
      description: ind.description || '',
      image: ind.image || '',
      icon: ind.icon || 'factory',
      order_index: ind.order_index || 0,
      status: ind.status || 'published',
    });
    setStatusMessage('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMessage('Saving industry to database...');
    const res = await saveIndustry(editingIndustry, user?.full_name);
    if (res.success) {
      setStatusMessage('Industry updated successfully!');
      setTimeout(() => {
        setEditingIndustry(null);
        setStatusMessage('');
      }, 700);
    } else {
      setStatusMessage('Error updating industry.');
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Industries Management</h1>
          <p className="adm-page-desc">Manage the industry sectors displayed on the homepage carousel and Industries page.</p>
        </div>
      </div>

      {statusMessage && (
        <div style={{ padding: '12px 18px', background: '#F0FDF4', color: '#166534', borderRadius: '8px', marginBottom: '18px', fontWeight: '600', fontSize: '13.5px' }}>
          {statusMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
        {industries.map((ind) => (
          <div
            key={ind.id}
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
              <div style={{ position: 'relative', height: '160px', background: '#0A2246' }}>
                <img src={ind.image} alt={ind.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#0A2246', color: '#FFFFFF', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px' }}>
                  Industry Sector #{ind.order_index || 0}
                </span>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0A2246', margin: '0 0 6px 0' }}>
                  {ind.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.45', margin: 0 }}>
                  {ind.description}
                </p>
              </div>
            </div>

            <div style={{ padding: '12px 18px', borderTop: '1px solid #F1F5F9', background: '#FAFAFA', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="adm-btn-primary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => handleEdit(ind)}
              >
                Edit Sector
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingIndustry && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">Edit Industry: {editingIndustry.title}</h2>
              <button type="button" className="adm-modal-close" onClick={() => setEditingIndustry(null)}>&times;</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label className="adm-form-label">Industry Title *</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={editingIndustry.title}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, title: e.target.value })}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Description / Scope *</label>
                  <textarea
                    className="adm-textarea"
                    rows={3}
                    value={editingIndustry.description}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, description: e.target.value })}
                    required
                  />
                </div>

                <ImageUploadControl
                  label="Sector Image *"
                  value={editingIndustry.image}
                  onChange={(url) => setEditingIndustry({ ...editingIndustry, image: url })}
                  media={media}
                  uploadImage={uploadImage}
                  userName={user?.full_name}
                  helpText="Sector cover photo (construction, fleet, marine, factories, energy, agriculture). Upload from computer or pick from library."
                />
              </div>

              <div className="adm-modal-footer">
                <button type="button" className="adm-btn-secondary" onClick={() => setEditingIndustry(null)}>Cancel</button>
                <button type="submit" className="adm-btn-primary">Save Industry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
