import React, { useState, useEffect } from 'react';

export default function QuoteModal({ isOpen, onClose, initialProduct = '' }) {
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    phone: '',
    email: '',
    emirate: 'Dubai',
    product: 'Ultra Low Sulfur Diesel (10ppm)',
    quantity: '5,000 - 15,000 Liters',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [successInfo, setSuccessInfo] = useState({ contact: '', product: '', emirate: '' });

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({ ...prev, product: initialProduct }));
    }
    if (isOpen) {
      setSubmitted(false);
    }
  }, [initialProduct, isOpen]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessInfo({
      contact: formData.contact || 'Partner',
      product: formData.product || 'Diesel Fuel',
      emirate: formData.emirate || 'Dubai',
    });
    setSubmitted(true);
    try {
      await fetch('/api/quote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (_) {
      // Graceful fallback for offline / static client environment
    }
  };

  return (
    <div
      className="modal-backdrop"
      id="quote-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-title"
      onClick={(e) => {
        if (e.target.id === 'quote-modal') onClose();
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <small>Dubai Diesel Trading LLC</small>
            <h3 id="quote-title">Request a Fuel Quote</h3>
          </div>
          <button
            type="button"
            className="modal-close"
            id="close-quote-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {!submitted ? (
          <form id="quote-form" className="modal-body" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Company Name *
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Al Wasl Contracting LLC"
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>
              <label>
                Contact Person *
                <input
                  type="text"
                  name="contact"
                  required
                  placeholder="Rashid Al Nuaimi"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Phone / WhatsApp *
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email Address *
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="procurement@company.ae"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Delivery Emirate
                <select name="emirate" value={formData.emirate} onChange={handleChange}>
                  <option>Dubai</option>
                  <option>Abu Dhabi</option>
                  <option>Sharjah</option>
                  <option>Ajman</option>
                  <option>Ras Al Khaimah</option>
                  <option>Fujairah</option>
                  <option>Umm Al Quwain</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Fuel Product
                <select name="product" id="quote-product-select" value={formData.product} onChange={handleChange}>
                  <option>Ultra Low Sulfur Diesel (10ppm)</option>
                  <option>Industrial Gas Oil</option>
                  <option>Marine Gas Oil (MGO)</option>
                  <option>AdBlue &amp; Fleet Lubricants</option>
                </select>
              </label>
              <label>
                Estimated Volume
                <select name="quantity" value={formData.quantity} onChange={handleChange}>
                  <option>1,000 - 5,000 Liters</option>
                  <option>5,000 - 15,000 Liters</option>
                  <option>15,000 - 45,000 Liters</option>
                  <option>Monthly Contract Supply</option>
                </select>
              </label>
            </div>
            <label className="full-width">
              Delivery Location / Notes
              <textarea
                name="notes"
                rows="2"
                placeholder="Jebel Ali Industrial Area / site timing..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </label>
            <button type="submit" className="btn-primary full-btn">
              Submit Quote Request &rarr;
            </button>
          </form>
        ) : (
          <div id="quote-success" className="modal-success">
            <div className="success-badge">&#10003;</div>
            <h4>Quote Request Received</h4>
            <p id="quote-success-msg">
              Thank you, {successInfo.contact}. Our Dubai dispatch desk will contact you shortly with competitive rates for {successInfo.product} in {successInfo.emirate}.
            </p>
            <button type="button" className="btn-primary" id="done-quote-btn" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
