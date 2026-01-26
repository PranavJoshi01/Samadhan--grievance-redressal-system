import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const res = await fetch(`${API_BASE}/notifications?_sort=id&_order=desc`);
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch notifications error', err);
    }
  }

  async function markAsRead(id) {
    try {
      await fetch(`${API_BASE}/notifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      });
      setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
    } catch (err) {
      console.error('Mark read error', err);
      alert('Failed to mark as read.');
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2>Notifications</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={fetchNotifications}>Refresh</button>
      </div>

      {notifications.length === 0 && <div>No notifications.</div>}
      {notifications.map(n => (
        <div
          key={n.id}
          style={{
            border: '1px solid #ddd',
            padding: 10,
            marginBottom: 8,
            background: n.read ? '#fff' : '#eef6ff'
          }}
        >
          <div style={{ fontWeight: 600 }}>{n.title}</div>
          <div style={{ fontSize: 12, color: '#555' }}>{new Date(n.createdAt).toLocaleString()}</div>
          <div style={{ marginTop: 6 }}>{n.message}</div>
          {!n.read && (
            <div style={{ marginTop: 8 }}>
              <button onClick={() => markAsRead(n.id)}>Mark read</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
