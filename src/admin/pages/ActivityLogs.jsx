// src/admin/pages/ActivityLogs.jsx
import React from 'react';
import { useCms } from '../../context/CmsContext';

export default function ActivityLogs() {
  const { activityLogs } = useCms();

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Activity Audit Trail</h1>
          <p className="adm-page-desc">Complete chronological record of all administrative changes, logins, and content updates.</p>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <h2 className="adm-card-title">Recent System Actions ({activityLogs?.length || 0})</h2>
        </div>
        <div className="adm-table-wrap">
          {(!activityLogs || activityLogs.length === 0) ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              No audit records yet. All logins, edits, and file uploads are logged here automatically.
            </div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Administrator</th>
                  <th>Action</th>
                  <th>Target Entity</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {activityLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontSize: '12px', color: '#64748B', whiteSpace: 'nowrap' }}>
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td>
                      <strong>{log.user_name}</strong>
                    </td>
                    <td>
                      <span className="adm-badge adm-badge-navy">{log.action}</span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#64748B' }}>
                      <code>{log.entity_type}{log.entity_id ? ` #${log.entity_id}` : ''}</code>
                    </td>
                    <td style={{ color: '#0A2246', fontWeight: '500' }}>
                      {log.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
