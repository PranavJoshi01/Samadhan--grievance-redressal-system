import React, { useState } from "react";
import "./Feedback.css";
import { submitFeedback } from "../../services/feedbackService";

export default function Feedback({ grievanceId }) {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!grievanceId) {
      alert("Invalid grievance selected");
      return;
    }

    if (!message.trim()) {
      alert("Please enter feedback message");
      return;
    }

    setLoading(true);

    try {
      await submitFeedback({
        grievanceId,
        rating,
        message,
      });

      alert("✅ Feedback submitted successfully");
      setMessage("");
      setRating(5);

    } catch (err) {
  alert("⚠ " + err.message);
}

  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Give Feedback</h2>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label>Rating</label>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
            <option value={4}>⭐⭐⭐⭐ Good</option>
            <option value={3}>⭐⭐⭐ Average</option>
            <option value={2}>⭐⭐ Poor</option>
            <option value={1}>⭐ Very Bad</option>
          </select>
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
        </div>

        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
