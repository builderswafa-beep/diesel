// src/admin/pages/BlogManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import ImageUploadControl from '../components/ImageUploadControl';

export default function BlogManager() {
  const { blog, saveBlogPost, deleteBlogPost, media, uploadImage } = useCms();
  const { user } = useAuth();

  const [editingPost, setEditingPost] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAddNew = () => {
    setEditingPost({
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      cover_image: '/images/blog-hero-banner.jpg',
      author: 'Dubai Diesel Energy Insights',
      category: 'Fuel Industry',
      read_time: '5 min read',
      status: 'published',
    });
    setStatusMessage('');
  };

  const handleEdit = (p) => {
    setEditingPost({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || '',
      content: p.content || '',
      cover_image: p.cover_image || p.coverImage || '',
      author: p.author || 'Dubai Diesel Insights',
      category: p.category || 'Industry Insights',
      read_time: p.read_time || p.readTime || '5 min read',
      status: p.status || 'published',
    });
    setStatusMessage('');
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete post: "${title}"?`)) return;
    setStatusMessage('Deleting post...');
    const res = await deleteBlogPost(id, user?.full_name);
    if (res.success) {
      setStatusMessage('Post deleted successfully.');
      setTimeout(() => setStatusMessage(''), 2000);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMessage('Saving post to Hostinger MySQL...');
    const res = await saveBlogPost(editingPost, user?.full_name);
    if (res.success) {
      setStatusMessage('Post saved successfully!');
      setTimeout(() => {
        setEditingPost(null);
        setStatusMessage('');
      }, 700);
    } else {
      setStatusMessage('Error saving post.');
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Blog &amp; Articles Management</h1>
          <p className="adm-page-desc">Create, edit, and publish energy insights and regulatory guides on the Dubai Diesel website.</p>
        </div>
        <div className="adm-page-actions">
          <button type="button" className="adm-btn-primary" onClick={handleAddNew}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div style={{ padding: '12px 18px', background: '#F0FDF4', color: '#166534', borderRadius: '8px', marginBottom: '18px', fontWeight: '600', fontSize: '13.5px' }}>
          {statusMessage}
        </div>
      )}

      <div className="adm-card">
        <div className="adm-card-header">
          <h2 className="adm-card-title">All Articles ({blog?.length || 0})</h2>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title &amp; Slug</th>
                <th>Category</th>
                <th>Author</th>
                <th>Read Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blog.map((p) => (
                <tr key={p.id}>
                  <td style={{ width: '80px' }}>
                    <img
                      src={p.cover_image || p.coverImage || '/images/blog-hero-banner.jpg'}
                      alt={p.title}
                      style={{ width: '70px', height: '46px', objectFit: 'cover', borderRadius: '4px', background: '#0A2246' }}
                    />
                  </td>
                  <td>
                    <strong style={{ color: '#0A2246' }}>{p.title}</strong>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>/blog/{p.slug}</div>
                  </td>
                  <td>
                    <span className="adm-badge adm-badge-navy">{p.category}</span>
                  </td>
                  <td style={{ fontSize: '12px' }}>{p.author}</td>
                  <td style={{ fontSize: '12px' }}>{p.read_time || p.readTime || '5 min'}</td>
                  <td>
                    <span className={`adm-badge ${p.status === 'published' ? 'adm-badge-success' : 'adm-badge-warning'}`}>
                      {p.status || 'published'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        className="adm-btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '11.5px' }}
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="adm-btn-danger"
                        style={{ padding: '5px 10px', fontSize: '11.5px' }}
                        onClick={() => handleDelete(p.id, p.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Editor Modal */}
      {editingPost && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal" style={{ maxWidth: '780px' }}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{editingPost.id ? 'Edit Article' : 'Write New Article'}</h2>
              <button type="button" className="adm-modal-close" onClick={() => setEditingPost(null)}>&times;</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label className="adm-form-label">Article Title *</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={editingPost.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      setEditingPost({ ...editingPost, title, slug: editingPost.id ? editingPost.slug : slug });
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">URL Slug *</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Category</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Author Name</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={editingPost.author}
                      onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Read Time Estimate</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={editingPost.read_time}
                      onChange={(e) => setEditingPost({ ...editingPost, read_time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Excerpt / Short Summary *</label>
                  <textarea
                    className="adm-textarea"
                    rows={2}
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Full Article Content (Markdown or HTML)</label>
                  <textarea
                    className="adm-textarea"
                    rows={8}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  />
                </div>

                <ImageUploadControl
                  label="Cover Image *"
                  value={editingPost.cover_image}
                  onChange={(url) => setEditingPost({ ...editingPost, cover_image: url })}
                  media={media}
                  uploadImage={uploadImage}
                  userName={user?.full_name}
                  helpText="Hero cover image for this article. Upload from computer or pick from library."
                />

                <div className="adm-form-group">
                  <label className="adm-form-label">Publishing Status</label>
                  <select
                    className="adm-select"
                    value={editingPost.status}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Work in Progress)</option>
                  </select>
                </div>
              </div>

              <div className="adm-modal-footer">
                <button type="button" className="adm-btn-secondary" onClick={() => setEditingPost(null)}>Cancel</button>
                <button type="submit" className="adm-btn-primary">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
