import React from "react";
import "./Admindashbord.css";
import { useNavigate } from "react-router-dom";

export default function Admindashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-wrapper">

      {/* Header */}
      <header className="admin-header">
        <div className="left-header">
          <h1 className="logo">Samadhan</h1>
          <p className="portal-text">Admin Portal</p>
        </div>

        <div className="right-header">
          <button className="manage-authorities-btn">👤 Manage Authorities</button>
          <button className="manage-issues-btn" onClick={() => navigate("/admin/manage-issues")}>
            ⚙ Manage Issues
          </button>
        </div>
      </header>

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
    </div>
  );
}


