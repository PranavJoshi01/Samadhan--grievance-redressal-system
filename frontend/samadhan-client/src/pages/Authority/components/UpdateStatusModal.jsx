// src/pages/Authority/components/UpdateStatusModal.jsx
import { useState } from "react";

export default function UpdateStatusModal({ issue, onClose, onSuccess }) {
  const [status, setStatus] = useState(issue.status);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl w-[420px] p-6 relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold">Update Issue Status</h2>
        <p className="text-sm text-gray-500 mb-4">
          Update progress and notify the citizen
        </p>

        <h3 className="font-medium">{issue.title}</h3>
        <p className="text-sm text-gray-600">{issue.description}</p>

        <img
          src={issue.image}
          className="w-full h-40 rounded-lg object-cover my-4"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <textarea
          placeholder="Enter a message to notify the citizen..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg p-2 h-20 mb-4"
        />

        <p className="text-xs text-gray-500 mb-4">
          This message will be sent to {issue.user}
        </p>

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={onSuccess}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Update & Notify
          </button>
        </div>
      </div>
    </div>
  );
}