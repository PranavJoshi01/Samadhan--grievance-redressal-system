import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const GrievanceDetails = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submittedFeedbackIds, setSubmittedFeedbackIds] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Get logged-in user's ID from JWT
  const getUserId = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId; // your backend stores userId in token
    } catch {
      return null;
    }
  };

  const userId = getUserId();

  // 🔹 Fetch grievances from backend
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/grievance?page=0&size=50",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const all = res.data.content || res.data;

        // Show only grievances created by logged-in user
        const mine = all.filter((g) => g.createdByUserId === userId);

        setGrievances(mine);
      } catch (err) {
        console.error("Error loading grievances", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, [token, userId]);

  if (loading) return <div className="text-center mt-10">Loading grievances...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        My Grievances
      </h2>

      {grievances.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No grievances found.{" "}
          <Link to="/user/home/raise-grievance" className="text-blue-600 underline">
            Raise your first grievance
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grievances.map((grievance) => (
            <div key={grievance.grievanceId} className="bg-white shadow-lg rounded-xl p-6">

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {grievance.title}
              </h3>

              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  grievance.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                  grievance.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' :
                  grievance.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {grievance.status}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{grievance.description}</p>

              <div className="mb-3">
                <span className="font-medium text-gray-700">Department:</span>
                <span className="ml-2 text-gray-600">
                  {grievance.category?.categoryName}
                </span>
              </div>

              <div className="mb-3">
                <span className="font-medium text-gray-700">Location:</span>
                <p className="text-gray-600 text-sm mt-1">{grievance.address}</p>
              </div>

              {grievance.mediaUrls && grievance.mediaUrls.length > 0 && (
                <div className="mb-4">
                  <img
                    src={grievance.mediaUrls[0]}
                    alt="Issue"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="text-sm text-gray-500">
                Submitted on: {new Date(grievance.createdAt).toLocaleDateString()}
              </div>

              {/* Feedback Button */}
              {grievance.status === "RESOLVED" &&
                !submittedFeedbackIds.includes(grievance.grievanceId) && (
                  <button
                    className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
                    onClick={() => {
                      setSelectedGrievanceId(grievance.grievanceId);
                      setShowFeedbackModal(true);
                    }}
                  >
                    ⭐ Give Feedback
                  </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Give Feedback</h3>

            <label className="block mb-2 text-sm font-medium">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border p-2 rounded mb-4"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Very Poor</option>
            </select>

            <label className="block mb-2 text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              rows="3"
              placeholder="Write your feedback..."
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowFeedbackModal(false)} className="px-3 py-1 bg-gray-300 rounded">
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await axios.post(
                      "http://localhost:8080/feedback",
                      { grievanceId: selectedGrievanceId, rating, message },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );

                    alert("✅ Feedback submitted successfully!");
                    setSubmittedFeedbackIds(prev => [...prev, selectedGrievanceId]);
                    setShowFeedbackModal(false);
                    setMessage("");
                    setRating(5);
                  } catch {
                    alert("❌ Error submitting feedback");
                  }
                }}
                className="px-3 py-1 bg-purple-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceDetails;
