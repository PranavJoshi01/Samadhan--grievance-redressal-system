import { useState } from "react";
import { updateIssue } from "../Admindashboard/components/AdminData";

export default function ManageIssueModal({ issue, close }) {
  const [status, setStatus] = useState(issue.status);
  const [dept, setDept] = useState(issue.department);
  const [note, setNote] = useState("");

  const saveNow = () => {
    const updated = {
      ...issue,
      status,
      department: dept,
      note,
    };

    updateIssue(updated);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white p-8 rounded-2xl w-[550px] overflow-y-auto max-h-[90vh]">

        <h2 className="text-2xl font-bold mb-2">Manage Issue</h2>
        <p className="text-gray-500 mb-4">Update issue status and assignment</p>

        <h3 className="text-xl font-semibold">{issue.title}</h3>
        <p className="text-gray-600 mb-4">{issue.description}</p>

        <img
          src="https://picsum.photos/500/250"
          className="rounded-xl mb-4"
        />

        {/* DETAILS */}
        <div className="space-y-3 text-gray-700">

          <p>📍 {issue.location}</p>
          <p>👤 {issue.reporter}</p>
          <p>📅 {issue.date}</p>
          <p className="bg-gray-200 inline-block px-3 py-1 rounded-lg">
            {issue.category}
          </p>
        </div>

        {/* FORM */}
        <div className="mt-6 space-y-4">

          <div>
            <label className="font-semibold">Assign to Authority</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            >
              <option>Road Department</option>
              <option>Sanitation Department</option>
              <option>Maintenance Department</option>
              <option>Electricity Department</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Notification Message (Optional)</label>
            <textarea
              rows="3"
              className="w-full border p-2 rounded mt-1"
              placeholder="Add a message to notify the authority…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-5 py-2 border rounded-lg"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-black text-white rounded-lg"
            onClick={saveNow}
          >
            Save & Notify Authority
          </button>
        </div>

      </div>
    </div>
  );
}
