import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_NOTIFICATION_BASE_URL } from "../../constants/apiConfig";


export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // FETCH NOTIFICATIONS FROM BACKEND

  async function fetchNotifications() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated");
        return;
      }

     const res = await fetch(`${API_NOTIFICATION_BASE_URL}/notifications`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch notifications error", err);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  // MARK NOTIFICATION AS READ (BACKEND)
  async function markAsRead(id) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const res = await fetch(`${API_NOTIFICATION_BASE_URL}/notifications`, {

        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Update UI after backend success
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    } catch (err) {
      console.error("Mark as read error", err);
      toast.error("Failed to mark notification as read");
    }
  }

  // UI

  if (loading) {
    return <div style={{ padding: 16 }}>Loading notifications...</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h2>Notifications</h2>

      {notifications.length === 0 && <div>No notifications.</div>}

      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginBottom: 8,
            background: n.read ? "#fff" : "#eef6ff",
          }}
        >
          <div style={{ fontWeight: 600 }}>{n.title}</div>
          <div style={{ fontSize: 12, color: "#555" }}>
            {new Date(n.createdAt).toLocaleString()}
          </div>
          <div style={{ marginTop: 6 }}>{n.message}</div>

          {!n.read && (
            <div style={{ marginTop: 8 }}>
              <button onClick={() => markAsRead(n.id)}>Mark as read</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
