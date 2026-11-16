// src/admin/pages/InquiriesManager.jsx
import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { useAuth } from '../../context/AuthContext';

export default function InquiriesManager() {
  const { inquiries, deleteInquiry } = useCms();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('quotes');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const quotes = inquiries?.quotes || [];
  const contacts = inquiries?.contacts || [];

  const handleDelete = async (type, id) => {
    if (!window.confirm('Delete this inquiry record from the database?')) return;
    setStatusMessage('Deleting inquiry record...');
    const res = await deleteInquiry(type, id, user?.full_name);
    if (res.success) {
      setSelectedInquiry(null);
      setStatusMessage('Record deleted.');
      setTimeout(() => setStatusMessage(''), 2000);
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Customer Leads &amp; Inquiries</h1>
          <p className="adm-page-desc">All customer submissions from the Request a Quote modal and Contact Us page stored directly in Hostinger MySQL.</p>
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
          className={`adm-tab-btn ${activeTab === 'quotes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          Quote Requests ({quotes.length})
        </button>
        <button
          type="button"
          className={`adm-tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contact Form Enquiries ({contacts.length})
        </button>
      </div>

      {/* Content Table */}
      <div className="adm-card">
        <div className="adm-table-wrap">
          {activeTab === 'quotes' ? (
            quotes.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                No quote requests submitted yet. Customers requesting quotes on your website will appear here in real-time.
              </div>
            ) : (
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Company / Contact</th>
                    <th>Product</th>
                    <th>Quantity / Volume</th>
                    <th>Emirate / Location</th>
                    <th>Email &amp; Phone</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr key={q.id}>
                      <td>
                        <strong>{q.contact_person}</strong>
                        {q.company_name && <div style={{ fontSize: '11.5px', color: '#64748B' }}>{q.company_name}</div>}
                      </td>
                      <td>
                        <span className="adm-badge adm-badge-danger">{q.fuel_product}</span>
                      </td>
                      <td>{q.quantity || 'Standard'}</td>
                      <td>
                        <div>{q.emirate || 'Dubai'}</div>
                        {q.delivery_location && <div style={{ fontSize: '11px', color: '#64748B' }}>{q.delivery_location}</div>}
                      </td>
                      <td>
                        <div><a href={`mailto:${q.email}`} style={{ color: '#0A2246', textDecoration: 'none' }}>{q.email}</a></div>
                        <div><a href={`tel:${q.phone}`} style={{ color: '#D51F26', textDecoration: 'none', fontSize: '11.5px' }}>{q.phone}</a></div>
                      </td>
                      <td style={{ fontSize: '12px', color: '#64748B' }}>
                        {new Date(q.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="adm-btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11.5px' }}
                            onClick={() => setSelectedInquiry({ type: 'quote', data: q })}
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            className="adm-btn-danger"
                            style={{ padding: '4px 8px', fontSize: '11.5px' }}
                            onClick={() => handleDelete('quote', q.id)}
                          >
                            &times;
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            contacts.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                No contact enquiries received yet. Messages sent through the Contact Us form will appear here.
              </div>
            ) : (
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Sender Name</th>
                    <th>Subject</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message Excerpt</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id}>
                      <td><strong>{c.name}</strong></td>
                      <td>
                        <span className="adm-badge adm-badge-navy">{c.subject || 'Inquiry'}</span>
                      </td>
                      <td><a href={`mailto:${c.email}`} style={{ color: '#0A2246', textDecoration: 'none' }}>{c.email}</a></td>
                      <td><a href={`tel:${c.phone}`} style={{ color: '#D51F26', textDecoration: 'none', fontSize: '11.5px' }}>{c.phone || 'N/A'}</a></td>
                      <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.message}
                      </td>
                      <td style={{ fontSize: '12px', color: '#64748B' }}>
                        {new Date(c.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="adm-btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11.5px' }}
                            onClick={() => setSelectedInquiry({ type: 'contact', data: c })}
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            className="adm-btn-danger"
                            style={{ padding: '4px 8px', fontSize: '11.5px' }}
                            onClick={() => handleDelete('contact', c.id)}
                          >
                            &times;
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="adm-modal-backdrop" onClick={() => setSelectedInquiry(null)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">
                {selectedInquiry.type === 'quote' ? 'Quote Request Details' : 'Contact Message Details'}
              </h2>
              <button type="button" className="adm-modal-close" onClick={() => setSelectedInquiry(null)}>&times;</button>
            </div>

            <div className="adm-modal-body">
              {selectedInquiry.type === 'quote' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div><strong>Company:</strong> {selectedInquiry.data.company_name || 'N/A'}</div>
                    <div><strong>Contact Person:</strong> {selectedInquiry.data.contact_person}</div>
                    <div><strong>Email:</strong> <a href={`mailto:${selectedInquiry.data.email}`}>{selectedInquiry.data.email}</a></div>
                    <div><strong>Phone:</strong> <a href={`tel:${selectedInquiry.data.phone}`}>{selectedInquiry.data.phone}</a></div>
                    <div><strong>Product:</strong> {selectedInquiry.data.fuel_product}</div>
                    <div><strong>Volume:</strong> {selectedInquiry.data.quantity || 'Not specified'}</div>
                    <div><strong>Emirate:</strong> {selectedInquiry.data.emirate}</div>
                    <div><strong>Delivery Location:</strong> {selectedInquiry.data.delivery_location || 'Not specified'}</div>
                  </div>
                  {selectedInquiry.data.notes && (
                    <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px' }}>
                      <strong>Additional Notes:</strong>
                      <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#334155' }}>{selectedInquiry.data.notes}</p>
                    </div>
                  )}
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                    Received on {new Date(selectedInquiry.data.created_at).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div><strong>Name:</strong> {selectedInquiry.data.name}</div>
                    <div><strong>Subject:</strong> {selectedInquiry.data.subject}</div>
                    <div><strong>Email:</strong> <a href={`mailto:${selectedInquiry.data.email}`}>{selectedInquiry.data.email}</a></div>
                    <div><strong>Phone:</strong> <a href={`tel:${selectedInquiry.data.phone}`}>{selectedInquiry.data.phone || 'N/A'}</a></div>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '6px' }}>
                    <strong>Message:</strong>
                    <p style={{ margin: '8px 0 0 0', fontSize: '13.5px', color: '#1E293B', whiteSpace: 'pre-wrap' }}>
                      {selectedInquiry.data.message}
                    </p>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                    Received on {new Date(selectedInquiry.data.created_at).toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            <div className="adm-modal-footer">
              <button type="button" className="adm-btn-secondary" onClick={() => setSelectedInquiry(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
