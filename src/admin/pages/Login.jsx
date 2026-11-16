// src/admin/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../adminStyles.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@Diesel2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      const dest = location.state?.from?.pathname || '/admin';
      navigate(dest, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(username, password);
    setLoading(false);

    if (res.success) {
      const dest = location.state?.from?.pathname || '/admin';
      navigate(dest, { replace: true });
    } else {
      setError(res.error || 'Invalid credentials. Please verify and try again.');
    }
  };

  return (
    <div className="adm-login-page">
      <div className="adm-login-box">
        <div className="adm-login-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '26px' }}>⛽</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#0A2246', letterSpacing: '-0.3px' }}>DUBAI DIESEL</span>
          </div>
          <h1 className="adm-login-title">Admin Management Portal</h1>
          <p className="adm-login-sub">Sign in with your administrator credentials</p>
        </div>

        <form className="adm-login-form" onSubmit={handleSubmit}>
          {error && <div className="adm-login-alert">{error}</div>}

          <div className="adm-form-group">
            <label className="adm-form-label" htmlFor="username">Username or Email</label>
            <input
              id="username"
              type="text"
              className="adm-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin or info@dubaidiesel.ae"
              required
              autoFocus
            />
          </div>

          <div className="adm-form-group">
            <label className="adm-form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="adm-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <div style={{ marginTop: '24px' }}>
            <button
              type="submit"
              className="adm-btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              disabled={loading}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" width="16" height="16">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </div>

          <div style={{ marginTop: '20px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', fontSize: '11.5px', color: '#64748B', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <strong>Default Hostinger CMS Credentials:</strong><br />
            User: <code>admin</code> &nbsp;|&nbsp; Pass: <code>Admin@Diesel2026!</code>
          </div>
        </form>
      </div>
    </div>
  );
}
