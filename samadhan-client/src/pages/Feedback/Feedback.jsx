import React, { useEffect, useState } from 'react';

/*
  NOTE: This uses a simple API base for local testing.
  If your backend runs elsewhere, change API_BASE to the backend URL.
  If your team already has an api helper file, replace fetch calls with that helper.
*/
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
      // Friendly message for users
      // If your backend is on a different port remove the API_BASE or update it.
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
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Submit Feedback</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            style={{ padding: 8 }}
          >
            <option value="general">General</option>
            <option value="service">Service</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: 8 }}>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={5}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      <h3>Recent feedback</h3>
      {feedbacks.length === 0 && <div>No feedback yet.</div>}
      {feedbacks.map(f => (
        <div key={f.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{f.title}</div>
          <div style={{ fontSize: 12, color: '#555' }}>{f.type} • {new Date(f.createdAt).toLocaleString()}</div>
          <div style={{ marginTop: 6 }}>{f.description}</div>
        </div>
      ))}
    </div>
  );
}
