import React, { useEffect, useState } from 'react';
import './Feedback.css';

const API_BASE = 'http://localhost:4000';

export default function Feedback() {
  const [form, setForm] = useState({ title: '', type: 'general', description: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      const res = await fetch(`${API_BASE}/feedbacks?_sort=id&_order=desc`);
      const data = await res.json();
      setFeedbacks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Load feedbacks error', err);
      
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || form.description.trim().length < 5) {
      alert('Please add a title and at least 5 characters of description.');
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, createdAt: new Date().toISOString() };
      await fetch(`${API_BASE}/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setForm({ title: '', type: 'general', description: '' });
      await fetchList();
    } catch (err) {
      console.error('Submit feedback error', err);
      alert('Failed to submit feedback. Check console for details.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Submit Feedback</h2>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <select
            className="form-select"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <option value="general">General</option>
            <option value="service">Service</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={5}
          />
        </div>

        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      <h3 className="recent-feedback-title">Recent feedback</h3>
      {feedbacks.length === 0 && <div className="no-feedback">No feedback yet.</div>}
      {feedbacks.map(f => (
        <div key={f.id} className="feedback-item">
          <div className="feedback-title-item">{f.title}</div>
          <div className="feedback-meta">{f.type} • {new Date(f.createdAt).toLocaleString()}</div>
          <div className="feedback-description">{f.description}</div>
        </div>
      ))}
    </div>
  );
}
