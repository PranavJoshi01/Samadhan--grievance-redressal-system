import { useState } from "react";

export default function ManageIssueModal({ issue, close }) {
  if (!issue) return null;

  const [status, setStatus] = useState(issue.status || "PENDING");
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl w-[550px] overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-2">Manage Grievance</h2>
        <p className="text-gray-500 mb-4">Update grievance status</p>

        <h3 className="text-xl font-semibold">{issue.title}</h3>

        <div className="mt-4 space-y-2 text-gray-700 text-sm">
          <p><strong>ID:</strong> {issue.grievanceId}</p>
          <p><strong>Status:</strong> {issue.status}</p>
          <p>
            <strong>Created:</strong>{" "}
            {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : "—"}
          </p>
        </div>

        {/* ⭐ Feedback (Admin View Only) */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm">
          <p>
            <strong>Rating:</strong>{" "}
            {issue.feedbackRating !== null && issue.feedbackRating !== undefined
              ? `⭐ ${issue.feedbackRating}/5`
              : "—"}
          </p>
          <p>
            <strong>Feedback:</strong>{" "}
            {issue.feedbackMessage && issue.feedbackMessage.trim() !== ""
              ? issue.feedbackMessage
              : "No feedback yet"}
          </p>
        </div>

        {/* Status Update */}
        <div className="mt-6">
          <label className="font-semibold">Update Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        {/* Admin Note */}
        <div className="mt-4">
          <label className="font-semibold">Admin Note</label>
          <textarea
            rows="3"
            className="w-full border p-2 rounded mt-1"
            placeholder="Optional note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            onClick={close}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
