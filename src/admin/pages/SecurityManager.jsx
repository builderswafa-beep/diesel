// src/admin/pages/SecurityManager.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function SecurityManager() {
  const { user, changePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsError(false);

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setStatusMessage('New passwords do not match. Please verify.');
      return;
    }

    if (newPassword.length < 8) {
      setIsError(true);
      setStatusMessage('Password must be at least 8 characters long.');
      return;
    }

    const res = await changePassword(currentPassword, newPassword);
    if (res.success) {
      setStatusMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setStatusMessage(''), 3000);
    } else {
      setIsError(true);
      setStatusMessage(res.error || 'Failed to update password.');
    }
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title-wrap">
          <h1 className="adm-page-title">Security &amp; Administrator Access</h1>
          <p className="adm-page-desc">Manage authentication credentials, password security, and database connection safety.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left: Change Password Form */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h2 className="adm-card-title">Change Admin Password</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="adm-card-body">
              {statusMessage && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '16px',
                    fontWeight: '600',
                    fontSize: '13px',
                    background: isError ? '#FEF2F2' : '#F0FDF4',
                    color: isError ? '#DC2626' : '#166534',
                    border: `1px solid ${isError ? '#FCA5A5' : '#86EFAC'}`,
                  }}
                >
                  {statusMessage}
                </div>
              )}

              <div className="adm-form-group">
                <label className="adm-form-label">Current Password</label>
                <input
                  type="password"
                  className="adm-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-form-label">New Secure Password (min 8 chars)</label>
                <input
                  type="password"
                  className="adm-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="adm-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="adm-card-header" style={{ justifyContent: 'flex-end', background: '#FAFAFA' }}>
              <button type="submit" className="adm-btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Right: Security & Database Architecture Info */}
        <div>
          <div className="adm-card">
            <div className="adm-card-header">
              <h2 className="adm-card-title">Database &amp; Hostinger Security Status</h2>
            </div>
            <div className="adm-card-body" style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span className="adm-status-dot"></span>
                <strong style={{ color: '#0A2246' }}>Hostinger MySQL Live Connection Active</strong>
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
                <div><strong>Database:</strong> <code>u136421965_dieseldb</code></div>
                <div><strong>Host IP:</strong> <code>194.59.164.108:3306</code> (srv547.hstgr.io)</div>
                <div><strong>User:</strong> <code>u136421965_dieseluser</code></div>
                <div><strong>Charset:</strong> <code>utf8mb4_unicode_ci</code></div>
              </div>

              <ul style={{ paddingLeft: '20px', margin: 0, color: '#64748B' }}>
                <li>All queries use prepared statements with parameter binding to prevent SQL injection.</li>
                <li>Passwords are hashed with SHA-256 and unique application salt.</li>
                <li>Bearer tokens protect all administrator API endpoints.</li>
                <li>Media uploads validate MIME types and file sizes to block malicious files.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
