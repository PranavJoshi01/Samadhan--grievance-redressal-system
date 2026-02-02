import { useEffect, useState } from "react";
import ManageIssueModal from "./ManageIssueModal";
import { getAllAdminGrievances } from "../../../services/grievanceService";

export default function ManageIssues() {
    console.log("✅ ManageIssues component is rendering");
  const [issues, setIssues] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ManageIssues component mounted");
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      console.log("Calling admin grievances API...");
      const data = await getAllAdminGrievances();
      console.log("Fetched data:", data);
      setIssues(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching grievances:", err);
      setError("Failed to load grievances");
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-10">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => window.history.back()} className="text-lg">
            ← Back
          </button>
          <h1 className="text-3xl font-bold">Manage Issues</h1>
        </div>

        <p className="text-gray-500 mb-6">
          Assign issues to authorities and monitor feedback
        </p>

        {loading && <p className="text-gray-500">Loading grievances...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && issues.length === 0 && !error && (
          <p className="text-gray-500">No grievances found.</p>
        )}

        <div className="space-y-6">
          {issues.map(issue => (
            <div
              key={issue.grievanceId}
              className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between"
            >
              <div className="flex gap-5">
                <img
                  src="https://picsum.photos/160/120"
                  className="w-40 h-28 rounded-lg object-cover"
                  alt="Grievance"
                />

                <div>
                  <h2 className="text-xl font-semibold">{issue.title}</h2>

                  <div className="flex gap-3 mt-3">
                    <span className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
                      {issue.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-gray-600 text-sm">
                    <span>🆔 {issue.grievanceId}</span>
                    <span>
                      📅{" "}
                      {issue.createdAt
                        ? new Date(issue.createdAt).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>

                  {/* ⭐ Feedback Section */}
                  <div className="mt-3 text-sm">
                    <p>
                      <strong>Rating:</strong>{" "}
                      {issue.feedbackRating !== null &&
                      issue.feedbackRating !== undefined
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
                </div>
              </div>

              <button
                onClick={() => setSelected(issue)}
                className="text-xl hover:text-blue-600"
              >
                ✏
              </button>
            </div>
          ))}
        </div>

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
