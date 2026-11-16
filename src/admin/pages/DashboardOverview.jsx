// src/admin/pages/DashboardOverview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';

export default function DashboardOverview() {
  const { user } = useAuth();
  const { inquiries, projects, services, blog, media, activityLogs } = useCms();

  const totalContacts = inquiries?.contacts?.length || 0;
  const totalQuotes = inquiries?.quotes?.length || 0;
  const totalLeads = totalContacts + totalQuotes;

  // Combine recent inquiries for quick feed
  const recentInquiries = [
    ...(inquiries?.quotes || []).map((q) => ({
      id: q.id,
      type: 'Quote Request',
      name: q.contact_person,
      company: q.company_name || 'Individual / Business',
      email: q.email,
      phone: q.phone,
      detail: q.fuel_product + (q.quantity ? ` (${q.quantity})` : ''),
      created_at: q.created_at,
    })),
    ...(inquiries?.contacts || []).map((c) => ({
      id: c.id,
      type: 'Contact Inquiry',
      name: c.name,
      company: 'General Inquiry',
      email: c.email,
      phone: c.phone,
      detail: c.subject || c.message?.substring(0, 40) + '...',
      created_at: c.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  return (
    <div>
      {/* Welcome Bar */}
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Welcome back, {user?.full_name?.split(' ')[0] || 'Admin'}</h1>
          <p className="adm-page-desc">Here is the real-time operational overview of your Dubai Diesel website and customer inquiries.</p>
        </div>
        <div className="adm-page-actions">
          <Link to="/admin/pages" className="adm-btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>
            <span>Edit Pages</span>
          </Link>
          <Link to="/admin/media" className="adm-btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="adm-kpi-grid">
        {/* Inquiries */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-icon red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="22" height="22">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="adm-kpi-content">
            <span className="adm-kpi-label">Customer Leads &amp; Quotes</span>
            <span className="adm-kpi-val">{totalLeads}</span>
          </div>
        </div>

        {/* Projects */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-icon navy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="22" height="22">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div className="adm-kpi-content">
            <span className="adm-kpi-label">Active Projects</span>
            <span className="adm-kpi-val">{projects?.length || 6}</span>
          </div>
        </div>

        {/* Services */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="22" height="22">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="adm-kpi-content">
            <span className="adm-kpi-label">Core Fuel Services</span>
            <span className="adm-kpi-val">{services?.length || 6}</span>
          </div>
        </div>

        {/* Media Assets */}
        <div className="adm-kpi-card">
          <div className="adm-kpi-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="22" height="22">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="adm-kpi-content">
            <span className="adm-kpi-label">Media Assets</span>
            <span className="adm-kpi-val">{media?.length || 45}+</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Inquiries + Activity */}
      <div className="adm-grid-2">
        {/* Left: Recent Customer Inquiries */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h2 className="adm-card-title">Recent Customer Inquiries</h2>
            <Link to="/admin/inquiries" style={{ fontSize: '12px', fontWeight: '600', color: '#D51F26', textDecoration: 'none' }}>
              View All ({totalLeads}) &rarr;
            </Link>
          </div>
          <div className="adm-table-wrap">
            {recentInquiries.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
                No customer inquiries received yet. Submissions from Contact Us and Request a Quote will appear here in real time.
              </div>
            ) : (
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Customer Name</th>
                    <th>Contact Info</th>
                    <th>Requirement</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInquiries.map((inq, i) => (
                    <tr key={i}>
                      <td>
                        <span className={`adm-badge ${inq.type === 'Quote Request' ? 'adm-badge-danger' : 'adm-badge-navy'}`}>
                          {inq.type}
                        </span>
                      </td>
                      <td>
                        <strong>{inq.name}</strong>
                        {inq.company && <div style={{ fontSize: '11px', color: '#64748B' }}>{inq.company}</div>}
                      </td>
                      <td>
                        <div>{inq.email}</div>
                        {inq.phone && <div style={{ fontSize: '11px', color: '#64748B' }}>{inq.phone}</div>}
                      </td>
                      <td>
                        <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {inq.detail}
                        </div>
                      </td>
                      <td style={{ fontSize: '11.5px', color: '#64748B' }}>
                        {new Date(inq.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right: Quick Shortcuts & Live Activity */}
        <div>
          {/* Quick Shortcuts */}
          <div className="adm-card" style={{ marginBottom: '20px' }}>
            <div className="adm-card-header">
              <h2 className="adm-card-title">Quick Actions</h2>
            </div>
            <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/admin/pages" className="adm-btn-secondary" style={{ justifyContent: 'flex-start' }}>
                <span>📄</span>
                <span>Edit Hero Banners &amp; Headings</span>
              </Link>
              <Link to="/admin/projects" className="adm-btn-secondary" style={{ justifyContent: 'flex-start' }}>
                <span>🏗️</span>
                <span>Update Project Details</span>
              </Link>
              <Link to="/admin/media" className="adm-btn-secondary" style={{ justifyContent: 'flex-start' }}>
                <span>🖼️</span>
                <span>Upload New Photos to Media Library</span>
              </Link>
              <Link to="/admin/settings" className="adm-btn-secondary" style={{ justifyContent: 'flex-start' }}>
                <span>⚙️</span>
                <span>Change Contact Info &amp; WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="adm-card">
            <div className="adm-card-header">
              <h2 className="adm-card-title">Recent Activity</h2>
              <Link to="/admin/activity" style={{ fontSize: '12px', fontWeight: '600', color: '#0A2246', textDecoration: 'none' }}>
                History &rarr;
              </Link>
            </div>
            <div className="adm-card-body" style={{ padding: '12px 16px' }}>
              {(!activityLogs || activityLogs.length === 0) ? (
                <div style={{ fontSize: '12.5px', color: '#64748B', textAlign: 'center', padding: '16px 0' }}>
                  System initialized. All actions are logged.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {activityLogs.slice(0, 5).map((log, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12.5px' }}>
                      <span style={{ fontSize: '15px' }}>⚡</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: '#0A2246' }}>{log.description}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          By {log.user_name} · {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
