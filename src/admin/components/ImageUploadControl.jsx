// src/admin/components/ImageUploadControl.jsx
import React, { useState, useRef } from 'react';

/**
 * Reusable Image Upload & Selector Control for Admin Dashboard
 * Supports:
 * 1. Direct Computer File Upload (PNG, JPG, WEBP, SVG up to 10MB) via FileReader + base64 /api/media
 * 2. Live Image Preview with Clear / Remove action
 * 3. Quick-pick horizontal strip from recent Media Library uploads
 * 4. Custom manual URL / path text input
 */
export default function ImageUploadControl({
  label = 'Image',
  value = '',
  onChange,
  media = [],
  uploadImage,
  userName = 'Admin',
  aspectRatio = 'auto',
  helpText = '',
}) {
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG, WEBP, SVG).');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10MB limit. Please choose a smaller image.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading to server...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const dataUrl = event.target.result;
        if (!uploadImage) {
          throw new Error('Image uploader function is not available.');
        }
        const res = await uploadImage(file.name, dataUrl, userName);
        if (res && res.success && res.url) {
          onChange(res.url);
          setUploadStatus('Uploaded successfully!');
          setTimeout(() => setUploadStatus(''), 2500);
        } else {
          alert('Upload failed: ' + (res?.error || 'Server error occurred.'));
          setUploadStatus('');
        }
      } catch (err) {
        console.error('Image upload error:', err);
        alert('Upload failed: ' + (err.message || 'Check network connection.'));
        setUploadStatus('');
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.onerror = () => {
      alert('Failed to read file from computer.');
      setIsUploading(false);
      setUploadStatus('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '14px',
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: '700', color: '#0A2246', margin: 0 }}>
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#DC2626',
              fontSize: '11.5px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '2px 6px',
            }}
            title="Clear current image"
          >
            Clear Image
          </button>
        )}
      </div>

      {helpText && (
        <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 10px 0', lineHeight: 1.4 }}>
          {helpText}
        </p>
      )}

      {/* Live Image Preview Card */}
      {value ? (
        <div
          style={{
            position: 'relative',
            height: aspectRatio === 'banner' ? '90px' : '130px',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#07162C',
            marginBottom: '12px',
            border: '1px solid #CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={value}
            alt="Current selection"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '8px',
              right: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                background: 'rgba(10, 34, 70, 0.85)',
                backdropFilter: 'blur(4px)',
                color: '#ffffff',
                fontSize: '10.5px',
                fontWeight: '600',
                padding: '3px 8px',
                borderRadius: '4px',
                maxWidth: '75%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {value}
            </span>
            <span
              style={{
                background: '#16A34A',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: '700',
                padding: '2px 6px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              Active
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: '75px',
            borderRadius: '8px',
            border: '2px dashed #CBD5E1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            fontSize: '12px',
            marginBottom: '12px',
            background: '#FFFFFF',
          }}
        >
          <span>No image currently selected</span>
          <span style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>Upload from computer or pick below</span>
        </div>
      )}

      {/* Action Row: Text Input + Direct Upload Button */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          className="adm-input"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/my-image.png or /images/sample.jpg"
          style={{ flex: 1, fontSize: '12.5px' }}
        />

        <label
          className="adm-btn-primary"
          style={{
            cursor: isUploading ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            padding: '9px 14px',
            fontSize: '12.5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            opacity: isUploading ? 0.7 : 1,
            userSelect: 'none',
          }}
          title="Upload image directly from your local computer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>{isUploading ? 'Uploading...' : 'Upload from Computer'}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>

      {uploadStatus && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: uploadStatus.includes('failed') ? '#DC2626' : '#166534',
            fontWeight: '600',
            marginTop: '8px',
          }}
        >
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: uploadStatus.includes('failed') ? '#DC2626' : '#16A34A' }} />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Quick Select from Recent Media Library */}
      {media && media.length > 0 && (
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '600' }}>
              Quick Pick from Media Library:
            </span>
            <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>
              Click thumbnail to select
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
            }}
          >
            {media.slice(0, 12).map((m, i) => {
              const isSelected = value === m.url;
              return (
                <div
                  key={m.id || i}
                  onClick={() => onChange(m.url)}
                  title={`${m.filename || 'Image'} (Click to use)`}
                  style={{
                    position: 'relative',
                    width: '56px',
                    height: '42px',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #D51F26' : '1px solid #CBD5E1',
                    boxShadow: isSelected ? '0 0 0 2px rgba(213, 31, 38, 0.2)' : 'none',
                    transition: 'all 0.15s ease',
                    background: '#0A2246',
                  }}
                >
                  <img
                    src={m.url}
                    alt={m.filename || 'Media'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: '#D51F26',
                        color: '#fff',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        fontWeight: '900',
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
