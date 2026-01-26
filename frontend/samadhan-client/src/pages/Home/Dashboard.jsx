import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Page Title */}
      <div className="page-title-section">
        <h2 className="dashboard-title">User Dashboard</h2>
        <p className="dashboard-subtitle">Manage your reported grievances and track their progress</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <p>Total Grievances</p>
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

      {/* View Toggle */}
      <div className="view-toggle">
        <button className="view-active">🔳 Table View</button>
        <button className="view-button">🗺 Map View</button>
      </div>

      {/* My Grievances Section */}
      <div className="grievances-section">
        <h3 className="grievances-title">My Grievances</h3>
        <p className="grievances-subtitle">Complete list of grievances you've reported</p>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>Pothole on Main Street</strong>
                  <p className="desc">Large pothole causing traffic hazard near the intersection...</p>
                </td>
                <td><span className="chip-gray">Road Maintenance</span></td>
                <td><span className="chip-blue">In Progress</span></td>
                <td>Oct 1, 2023</td>
                <td>📄</td>
              </tr>

              <tr>
                <td>
                  <strong>Broken Street Light</strong>
                  <p className="desc">Street light not working for the past week...</p>
                </td>
                <td><span className="chip-gray">Utilities</span></td>
                <td><span className="chip-orange">Pending</span></td>
                <td>Oct 3, 2023</td>
                <td>📄</td>
              </tr>

              <tr>
                <td>
                  <strong>Illegal Dumping</strong>
                  <p className="desc">Construction waste dumped illegally in the park...</p>
                </td>
                <td><span className="chip-gray">Sanitation</span></td>
                <td><span className="chip-green">Resolved</span></td>
                <td>Sep 28, 2023</td>
                <td>📄</td>
              </tr>

              <tr>
                <td>
                  <strong>Water Leakage</strong>
                  <p className="desc">Pipe burst causing water leakage on the sidewalk...</p>
                </td>
                <td><span className="chip-gray">Water Supply</span></td>
                <td><span className="chip-blue">In Progress</span></td>
                <td>Sep 25, 2023</td>
                <td>📄</td>
              </tr>

              <tr>
                <td>
                  <strong>Traffic Signal Malfunction</strong>
                  <p className="desc">Traffic signal at the junction is not functioning properly...</p>
                </td>
                <td><span className="chip-gray">Traffic Management</span></td>
                <td><span className="chip-orange">Pending</span></td>
                <td>Sep 20, 2023</td>
                <td>📄</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
