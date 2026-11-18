// src/admin/pages/GalleryManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import ImageUploadControl from '../components/ImageUploadControl';

export default function GalleryManager() {
  const { gallery, saveGalleryItem, deleteGalleryItem, media, uploadImage } = useCms();
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const categories = [
    { key: 'all', label: 'All Photos' },
    { key: 'terminals', label: 'Storage Terminals' },
    { key: 'fleet', label: 'Delivery Fleet' },
    { key: 'industrial', label: 'Industrial & Sites' },
  ];

  const getCategoryLabel = (catKey) => {
    const found = categories.find((c) => c.key === catKey);
    return found ? found.label : (catKey || 'General');
  };

  const filtered = (activeCategory === 'all'
    ? gallery
    : gallery.filter((g) => g.category === activeCategory)
  ).filter((g) => g.category !== 'marine');

  const handleAddNew = () => {
    setEditingItem({
      title: '',
      category: activeCategory === 'all' ? 'terminals' : activeCategory,
      image_url: '/images/about-terminal.jpg',
      caption: '',
      order_index: (gallery.length || 0) + 1,
    });
    setStatusMessage('');
  };

  const handleEdit = (item) => {
    setEditingItem({
      id: item.id,
      title: item.title,
      category: item.category || 'terminals',
      image_url: item.image_url || item.image || '',
      caption: item.caption || '',
      order_index: item.order_index || 0,
    });
    setStatusMessage('');
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to remove photo "${title}" from the gallery?`)) return;
    setStatusMessage('Removing photo from database...');
    const res = await deleteGalleryItem(id, user?.full_name);
    if (res.success) {
      setStatusMessage('Photo removed from gallery successfully.');
      setTimeout(() => setStatusMessage(''), 2500);
    } else {
      setStatusMessage('Error removing photo.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem.title || !editingItem.image_url) {
      alert('Please provide a title and photograph.');
      return;
    }
    setStatusMessage('Saving gallery photo to database...');
    const res = await saveGalleryItem(editingItem, user?.full_name);
    if (res.success) {
      setStatusMessage('Gallery photo saved successfully!');
      setTimeout(() => {
        setEditingItem(null);
        setStatusMessage('');
      }, 700);
    } else {
      setStatusMessage('Error saving gallery photo.');
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Corporate Gallery Management</h1>
          <p className="adm-page-desc">
            Upload, update, organize, or remove high-resolution corporate facility and fleet photographs.
          </p>
        </div>
        <div className="adm-page-actions">
          <button type="button" className="adm-btn-primary" onClick={handleAddNew}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Photo to Gallery</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div style={{ padding: '12px 18px', background: '#F0FDF4', color: '#166534', borderRadius: '8px', marginBottom: '18px', fontWeight: '600', fontSize: '13.5px' }}>
          {statusMessage}
        </div>
      )}

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {categories.map((c) => {
          const count = c.key === 'all'
            ? gallery.length
            : gallery.filter((g) => g.category === c.key).length;
          return (
            <button
              key={c.key}
              type="button"
              className="adm-btn-secondary"
              style={{
                whiteSpace: 'nowrap',
                background: activeCategory === c.key ? '#D51F26' : '#FFFFFF',
                color: activeCategory === c.key ? '#FFFFFF' : '#0A2246',
                borderColor: activeCategory === c.key ? '#D51F26' : '#E2E8F0',
                fontWeight: '600',
                padding: '7px 15px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
              }}
              onClick={() => setActiveCategory(c.key)}
            >
              <span>{c.label}</span>
              <span
                style={{
                  background: activeCategory === c.key ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                  color: activeCategory === c.key ? '#FFFFFF' : '#64748B',
                  borderRadius: '999px',
                  padding: '1px 7px',
                  fontSize: '11px',
                  fontWeight: '700',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: '48px 24px', textAlign: 'center', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <p style={{ color: '#64748B', fontSize: '14.5px', margin: '0 0 16px' }}>No photos found in this category.</p>
          <button type="button" className="adm-btn-primary" onClick={handleAddNew}>
            Add First Photo
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '22px' }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '180px', background: '#0A2246' }}>
                  <img
                    src={item.image_url || item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: '#0A2246',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '3px 9px',
                      borderRadius: '999px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {getCategoryLabel(item.category)}
                  </span>
                  {item.order_index ? (
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.6)',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: '700',
                        padding: '2px 7px',
                        borderRadius: '4px',
                      }}
                    >
                      #{item.order_index}
                    </span>
                  ) : null}
                </div>

                <div style={{ padding: '16px 18px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0A2246', margin: '0 0 6px 0', lineHeight: '1.35' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.45', margin: 0 }}>
                    {item.caption || 'No caption provided.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Update and Remove */}
              <div
                style={{
                  padding: '12px 18px',
                  borderTop: '1px solid #F1F5F9',
                  background: '#FAFAFA',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <button
                  type="button"
                  className="adm-btn-secondary"
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onClick={() => handleEdit(item)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Edit Photo</span>
                </button>

                <button
                  type="button"
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    color: '#DC2626',
                    background: '#FEF2F2',
                    border: '1px solid #FEE2E2',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                  onClick={() => handleDelete(item.id, item.title)}
                  title="Remove from Gallery"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Gallery Item Modal */}
      {editingItem && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal" style={{ maxWidth: '640px' }}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">
                {editingItem.id ? `Edit Photo: ${editingItem.title}` : 'Add New Gallery Photo'}
              </h2>
              <button type="button" className="adm-modal-close" onClick={() => setEditingItem(null)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="adm-modal-body" style={{ maxHeight: '78vh', overflowY: 'auto' }}>
                <div className="adm-form-group">
                  <label className="adm-form-label">Photo Title *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="e.g. Bulk Fuel Storage Terminal"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Category *</label>
                    <select
                      className="adm-select"
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    >
                      <option value="terminals">Storage Terminals</option>
                      <option value="fleet">Delivery Fleet</option>
                      <option value="industrial">Industrial &amp; Sites</option>
                    </select>
                  </div>

                  <div className="adm-form-group">
                    <label className="adm-form-label">Display Order</label>
                    <input
                      type="number"
                      className="adm-input"
                      value={editingItem.order_index}
                      onChange={(e) => setEditingItem({ ...editingItem, order_index: parseInt(e.target.value, 10) || 0 })}
                    />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Caption / Description</label>
                  <textarea
                    className="adm-textarea"
                    rows={3}
                    placeholder="Brief description of the facility, equipment, or operation depicted..."
                    value={editingItem.caption}
                    onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  />
                </div>

                {/* Image Upload Control with computer file upload + media library picker */}
                <ImageUploadControl
                  label="Photograph *"
                  value={editingItem.image_url}
                  onChange={(url) => setEditingItem({ ...editingItem, image_url: url })}
                  media={media}
                  uploadImage={uploadImage}
                  userName={user?.full_name}
                  helpText="Upload a crisp photograph from your computer or pick an existing image from the media library."
                />
              </div>

              <div className="adm-modal-footer">
                <button type="button" className="adm-btn-secondary" onClick={() => setEditingItem(null)}>
                  Cancel
                </button>
                <button type="submit" className="adm-btn-primary">
                  {editingItem.id ? 'Save Changes' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
