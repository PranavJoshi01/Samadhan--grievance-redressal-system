import { useState } from "react";
import { issuesMap } from "../Admindashboard/components/AdminData";
import ManageIssueModal from "./ManageIssueModel";
import AdminNavbar from "../../../components/Admin/AdminNavbar";

export default function ManageIssues() {
  const [selected, setSelected] = useState(null);
  const issues = [...issuesMap.values()];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="p-10">

      {/* BACK + TITLE */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => window.history.back()} className="text-lg">
          ← Back
        </button>
        <h1 className="text-3xl font-bold">Manage Issues</h1>
      </div>

      <p className="text-gray-500 mb-6">
        Assign issues to authorities and update status
      </p>

      {/* ISSUE LIST */}
      <div className="space-y-6">

        {issues.map(issue => (
          <div
            key={issue.id}
            className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between"
          >
            {/* LEFT: IMAGE + DETAILS */}
            <div className="flex gap-5">

              <img
                src="https://picsum.photos/160/120"
                className="w-40 h-28 rounded-lg object-cover"
              />

              <div>
                <h2 className="text-xl font-semibold">{issue.title}</h2>
                <p className="text-gray-500 text-sm w-96">
                  {issue.description}
                </p>

                <div className="flex gap-3 mt-3">
                  <span className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
                    {issue.category}
                  </span>
                </div>

                <div className="flex items-center gap-6 mt-4 text-gray-600 text-sm">
                  <span>👤 {issue.reporter}</span>
                  <span>📅 {issue.date}</span>
                  <span className="text-blue-600">{issue.department}</span>
                </div>
              </div>
            </div>

            {/* STATUS + EDIT BUTTON */}
            <div className="flex flex-col items-end gap-3">
              <span
                className={`px-3 py-1 rounded-lg text-sm ${
                  issue.status === "Pending"
                    ? "bg-orange-100 text-orange-600"
                    : issue.status === "In Progress"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {issue.status}
              </span>

              {/* Pencil Button */}
              <button
                onClick={() => setSelected(issue)}
                className="text-xl hover:text-blue-600"
              >
                ✏
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* OPEN MODAL */}
      {selected && (
        <ManageIssueModal
          issue={selected}
          close={() => setSelected(null)}
        />
      )}
      </div>
    </div>
  );
}

