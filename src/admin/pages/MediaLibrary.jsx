// src/admin/pages/MediaLibrary.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';

export default function MediaLibrary() {
  const { media, uploadImage, deleteImage } = useCms();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const filteredMedia = (media || []).filter((m) =>
    m.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setStatusMessage('Uploading images...');

    let completed = 0;
    files.forEach((file) => {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp|svg\+xml)$/)) {
        alert(`File "${file.name}" is not a supported image format (JPEG, PNG, WEBP, SVG).`);
        return;
      }

      // Validate size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target.result;
        await uploadImage(file.name, dataUrl, user?.full_name);
        completed += 1;
        if (completed === files.length) {
          setUploading(false);
          setStatusMessage(`Uploaded ${completed} image(s) successfully!`);
          setTimeout(() => setStatusMessage(''), 3000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopyStatus('Copied URL to clipboard!');
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const handleDelete = async (filename) => {
    if (!window.confirm(`Delete image "${filename}" from server?`)) return;
    setStatusMessage(`Deleting ${filename}...`);
    const res = await deleteImage(filename, user?.full_name);
    if (res.success) {
      setSelectedImage(null);
      setStatusMessage('Image deleted successfully.');
      setTimeout(() => setStatusMessage(''), 2000);
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Media Library</h1>
          <p className="adm-page-desc">Upload, manage, inspect, and use images across your website pages and banners.</p>
        </div>
        <div className="adm-page-actions">
          <label className="adm-btn-primary" style={{ cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>{uploading ? 'Uploading...' : 'Upload Images'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {statusMessage && (
        <div style={{ padding: '12px 18px', background: '#F0FDF4', color: '#166534', borderRadius: '8px', marginBottom: '18px', fontWeight: '600', fontSize: '13.5px' }}>
          {statusMessage}
        </div>
      )}

      {/* Search and Filter bar */}
      <div className="adm-card" style={{ marginBottom: '20px' }}>
        <div className="adm-card-body" style={{ padding: '14px 18px', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
            <input
              type="text"
              className="adm-input"
              placeholder="Search images by filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: '600' }}>
            Showing {filteredMedia.length} of {media.length} image assets
          </span>
        </div>
      </div>

      {/* Media Grid */}
      <div className="adm-media-grid">
        {filteredMedia.map((m, idx) => (
          <div
            key={idx}
            className="adm-media-item"
            onClick={() => setSelectedImage(m)}
          >
            <img src={m.url} alt={m.filename} className="adm-media-thumb" loading="lazy" />
            <div className="adm-media-meta">
              <div className="adm-media-name" title={m.filename}>{m.filename}</div>
              <div className="adm-media-size">
                {m.size ? `${(m.size / 1024).toFixed(1)} KB` : 'Active Asset'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview & Details Modal */}
      {selectedImage && (
        <div className="adm-modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="adm-modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title" style={{ fontSize: '15px' }}>Image Details: {selectedImage.filename}</h2>
              <button type="button" className="adm-modal-close" onClick={() => setSelectedImage(null)}>&times;</button>
            </div>

            <div className="adm-modal-body">
              <div style={{ textAlign: 'center', background: '#0A2246', borderRadius: '8px', overflow: 'hidden', maxHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.filename}
                  style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain' }}
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-form-label">Asset Path / URL</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" className="adm-input" value={selectedImage.url} readOnly />
                  <button
                    type="button"
                    className="adm-btn-secondary"
                    onClick={() => handleCopyUrl(selectedImage.url)}
                  >
                    Copy
                  </button>
                </div>
                {copyStatus && (
                  <span style={{ fontSize: '12px', color: '#166534', fontWeight: '600', marginTop: '4px', display: 'block' }}>
                    {copyStatus}
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12.5px', color: '#64748B', background: '#F8FAFC', padding: '12px', borderRadius: '6px' }}>
                <div><strong>Filename:</strong> {selectedImage.filename}</div>
                <div><strong>Size:</strong> {selectedImage.size ? `${(selectedImage.size / 1024).toFixed(1)} KB` : 'Standard Asset'}</div>
              </div>
            </div>

            <div className="adm-modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="adm-btn-danger"
                onClick={() => handleDelete(selectedImage.filename)}
              >
                Delete Image
              </button>
              <button
                type="button"
                className="adm-btn-secondary"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
