// src/admin/pages/ProjectsManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';
import ImageUploadControl from '../components/ImageUploadControl';

export default function ProjectsManager() {
  const { projects, saveProject, deleteProject, media, uploadImage } = useCms();
  const { user } = useAuth();

  const [editingProject, setEditingProject] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'construction', label: 'Construction' },
    { key: 'manufacturing', label: 'Manufacturing' },
    { key: 'logistics', label: 'Logistics' },
    { key: 'power', label: 'Power Generation' },
    { key: 'marine', label: 'Marine & Shipping' },
    { key: 'oil-gas', label: 'Oil & Gas' },
  ];

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.categoryKey === activeCategory);

  const handleAddNew = () => {
    setEditingProject({
      project_id: '',
      title: '',
      category_key: 'construction',
      category_label: 'Construction',
      description: '',
      image: '/images/project-construction.jpg',
      category_icon: 'crane',
      wave_color: '#D51F26',
      detail_link: '/projects',
      status: 'published',
      order_index: projects.length + 1,
    });
    setStatusMessage('');
  };

  const handleEdit = (p) => {
    setEditingProject({
      id: p.dbId,
      project_id: p.id,
      title: p.title,
      category_key: p.categoryKey,
      category_label: p.categoryLabel,
      description: p.desc,
      image: p.image,
      category_icon: p.categoryIcon,
      wave_color: p.waveColor,
      detail_link: p.detailLink,
      status: p.status || 'published',
      order_index: p.orderIndex || 0,
    });
    setStatusMessage('');
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete project: "${title}"?`)) return;
    setStatusMessage('Deleting project from database...');
    const res = await deleteProject(id, user?.full_name);
    if (res.success) {
      setStatusMessage('Project deleted successfully.');
      setTimeout(() => setStatusMessage(''), 2000);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMessage('Saving project to Hostinger MySQL...');

    // Match label to category key
    const foundCat = categories.find((c) => c.key === editingProject.category_key);
    const payload = {
      ...editingProject,
      category_label: foundCat ? foundCat.label : editingProject.category_label,
    };

    const res = await saveProject(payload, user?.full_name);
    if (res.success) {
      setStatusMessage('Project saved successfully!');
      setTimeout(() => {
        setEditingProject(null);
        setStatusMessage('');
      }, 700);
    } else {
      setStatusMessage('Error saving project.');
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Projects Management</h1>
          <p className="adm-page-desc">Manage all projects displayed on the Our Projects page, homepage, and category filters.</p>
        </div>
        <div className="adm-page-actions">
          <button type="button" className="adm-btn-primary" onClick={handleAddNew}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div style={{ padding: '12px 18px', background: '#F0FDF4', color: '#166534', borderRadius: '8px', marginBottom: '18px', fontWeight: '600', fontSize: '13.5px' }}>
          {statusMessage}
        </div>
      )}

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {categories.map((c) => (
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
              padding: '6px 14px',
            }}
            onClick={() => setActiveCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Projects Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '22px' }}>
        {filtered.map((proj) => (
          <div
            key={proj.id}
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
              {/* Image thumbnail with floating category badge */}
              <div style={{ position: 'relative', height: '180px', background: '#0A2246' }}>
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#FFFFFF',
                    color: '#0A2246',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                >
                  {proj.categoryLabel}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: proj.waveColor || '#D51F26',
                  }}
                ></span>
              </div>

              {/* Body */}
              <div style={{ padding: '16px 18px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0A2246', margin: '0 0 6px 0' }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.45', margin: 0 }}>
                  {proj.desc}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: '12px 18px', borderTop: '1px solid #F1F5F9', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                Order #{proj.orderIndex || 0}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="adm-btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => handleEdit(proj)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="adm-btn-danger"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => handleDelete(proj.dbId, proj.title)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Editor Modal */}
      {editingProject && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">
                {editingProject.id ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
              </h2>
              <button type="button" className="adm-modal-close" onClick={() => setEditingProject(null)}>&times;</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label className="adm-form-label">Project Title *</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Category *</label>
                    <select
                      className="adm-select"
                      value={editingProject.category_key}
                      onChange={(e) => setEditingProject({ ...editingProject, category_key: e.target.value })}
                    >
                      <option value="construction">Construction</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="logistics">Logistics</option>
                      <option value="power">Power Generation</option>
                      <option value="marine">Marine &amp; Shipping</option>
                      <option value="oil-gas">Oil &amp; Gas</option>
                    </select>
                  </div>

                  <div className="adm-form-group">
                    <label className="adm-form-label">Accent Wave Color</label>
                    <select
                      className="adm-select"
                      value={editingProject.wave_color}
                      onChange={(e) => setEditingProject({ ...editingProject, wave_color: e.target.value })}
                    >
                      <option value="#D51F26">Crimson Red (#D51F26)</option>
                      <option value="#0A2246">Corporate Navy (#0A2246)</option>
                    </select>
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-form-label">Description / Scope *</label>
                  <textarea
                    className="adm-textarea"
                    rows={3}
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    required
                  />
                </div>

                <ImageUploadControl
                  label="Project Image *"
                  value={editingProject.image}
                  onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                  media={media}
                  uploadImage={uploadImage}
                  userName={user?.full_name}
                  helpText="Choose a photo representing this project. You can upload from computer, pick from library, or paste a URL."
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Display Order</label>
                    <input
                      type="number"
                      className="adm-input"
                      value={editingProject.order_index}
                      onChange={(e) => setEditingProject({ ...editingProject, order_index: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-form-label">Status</label>
                    <select
                      className="adm-select"
                      value={editingProject.status}
                      onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="adm-modal-footer">
                <button type="button" className="adm-btn-secondary" onClick={() => setEditingProject(null)}>Cancel</button>
                <button type="submit" className="adm-btn-primary">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
