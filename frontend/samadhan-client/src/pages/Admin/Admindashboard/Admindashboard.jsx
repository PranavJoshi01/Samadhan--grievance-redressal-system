import React, { useState } from "react";   // ✅ ADD: useState ONLY
import "./Admindashbord.css";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import { addDepartment } from "../../../services/grievanceService";

export default function Admindashboard() {
  const navigate = useNavigate();

  // ✅ ADD: modal state (sirf ye line add)
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
const [departmentName, setDepartmentName] = useState("");
const [description, setDescription] = useState("");

const handleAddDepartment = async () => {
  console.log("sending to backend", departmentName, description);

  await addDepartment({
    categoryName: departmentName, // ⚠️ backend field
    description: description,
  });

  alert("Department added ✅");

  setDepartmentName("");
  setDescription("");
  setShowAddDeptModal(false);
};


  return (
    <div className="min-h-screen bg-gray-100">
      {/* <AdminNavbar  onAddDepartment={() => setShowAddDeptModal(true)} /> */}

      {/* Page Title */}
      <div className="page-title-section">
        <h2 className="admin-title">Admin Dashboard</h2>
        <p className="admin-subtitle">Manage all reported issues and authorities</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <p>Total Issues</p>
          <h3>5</h3>
        </div>

        <div className="stat-card">
          <p>Pending</p>
          <h3 className="pending">2</h3>
        </div>

        <div className="stat-card">
          <p>In Progress</p>
          <h3 className="progress">2</h3>
        </div>

        <div className="stat-card">
          <p>Resolved</p>
          <h3 className="resolved">1</h3>
        </div>
      </div>

      {/* Table & Map View Buttons */}
      <div className="view-toggle">
        <button className="view-active">🔳 Table View</button>
        <button className="view-button">🗺 Map View</button>
      </div>

      {/* All Issues Section */}
      <div className="issues-section">
        <h3 className="issues-title">All Issues</h3>
        <p className="issues-subtitle">Complete list of reported issues</p>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Category</th>
                <th>Status</th>
                <th>Reporter</th>
                <th>Authority</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>Pothole on Main Street</strong>
                  <p className="desc">Large pothole causing traffic hazard…</p>
                </td>
                <td><span className="chip-gray">Road Maintenance</span></td>
                <td><span className="chip-blue">In Progress</span></td>
                <td>John Doe</td>
                <td>Road Department</td>
                <td>Oct 1</td>
                <td>📄</td>
              </tr>

              <tr>
                <td>
                  <strong>Broken Street Light</strong>
                  <p className="desc">Street light not working…</p>
                </td>
                <td><span className="chip-gray">Utilities</span></td>
                <td><span className="chip-orange">Pending</span></td>
                <td>Jane Smith</td>
                <td><i className="unassigned">Unassigned</i></td>
                <td>Oct 3</td>
                <td>📄</td>
              </tr>

              <tr>
                <td>
                  <strong>Illegal Dumping</strong>
                  <p className="desc">Construction waste dumped…</p>
                </td>
                <td><span className="chip-gray">Sanitation</span></td>
                <td><span className="chip-green">Resolved</span></td>
                <td>John Doe</td>
                <td>Sanitation Department</td>
                <td>Sep 28</td>
                <td>📄</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================== ADD DEPARTMENT MODAL (ONLY ADDITION) ===================== */}
      {showAddDeptModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className="bg-white w-[360px] rounded-lg shadow-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Add Department</h2>

      <div className="mb-3">
        <label className="text-sm font-medium">Department Name</label>
        <input
type="text"
value={departmentName}
onChange={(e) => setDepartmentName(e.target.value)}
className="w-full mt-1 border rounded px-3 py-2"
/>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Description</label>
        <textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
className="w-full mt-1 border rounded px-3 py-2"
/>
      </div>

      <div className="flex justify-end gap-3">
        {/* Cancel */}
        <button
          onClick={() => setShowAddDeptModal(false)}
          className="px-4 py-1 border rounded text-sm"
        >
          Cancel
        </button>

        {/* Submit */}
        <button
  onClick={handleAddDepartment}
  className="px-4 py-1 bg-blue-600 text-white rounded text-sm"
>
  Add Department
</button>
      </div>
    </div>
  </div>
)}

</div>
);
}