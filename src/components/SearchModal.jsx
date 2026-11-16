import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCatalog } from '../data/catalog';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const matches = searchCatalog.filter(
    (item) =>
      item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
  );

  const handleItemClick = (item) => {
    onClose();
    if (item.productKey && onSelectProduct) {
      onSelectProduct(item.productKey);
    }
    if (item.href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const hash = item.href.replace('/#', '');
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (item.href.includes('#')) {
      const [path, hash] = item.href.split('#');
      navigate(path);
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(item.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="modal-backdrop search-backdrop"
      id="search-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Search site"
      onClick={(e) => {
        if (e.target.id === 'search-modal') onClose();
      }}
    >
      <div className="search-card">
        <div className="search-input-row">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            id="search-input"
            placeholder="Search diesel 10ppm, bulk delivery, marine gas oil..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="search-close"
            id="close-search-btn"
            aria-label="Close search"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="search-results" id="search-results">
          {matches.length > 0 ? (
            matches.map((item, idx) => (
              <div
                key={idx}
                className="search-result-item"
                style={{ cursor: 'pointer' }}
                onClick={() => handleItemClick(item)}
              >
                <div>
                  <small>{item.category}</small>
                  <strong>{item.title}</strong>
                </div>
                <span>&rarr;</span>
              </div>
            ))
          ) : (
            <p style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '13.5px' }}>
              No matching fuels or services found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
