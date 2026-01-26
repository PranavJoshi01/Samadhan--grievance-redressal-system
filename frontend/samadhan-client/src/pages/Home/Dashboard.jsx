import React from 'react'
import { useGrievances, useGrievanceStats } from '../../hooks/useGrievance'
import './Dashboard.css'

const Dashboard = () => {
  // Fetch data from backend fetch 10 record from backend 
  const { grievances, loading: grievanceLoading, currentPage, totalPages, totalElements, pageSize, goToPage } = useGrievances(0, 10)
  // fetch total counts 
  const { stats, loading: statsLoading } = useGrievanceStats()

  const handleNextPage = () => {
    goToPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) goToPage(currentPage - 1)
  }

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
          <h3>{statsLoading ? '...' : stats?.totalCount || 0}</h3>
        </div>

        <div className="stat-card">
          <p>Pending</p>
          <h3 className="pending">{statsLoading ? '...' : stats?.statusWiseCount?.PENDING || 0}</h3>
        </div>

        <div className="stat-card">
          <p>In Progress</p>
          <h3 className="progress">{statsLoading ? '...' : stats?.statusWiseCount?.ASSIGNED || 0}</h3>
        </div>

        <div className="stat-card">
          <p>Resolved</p>
          <h3 className="resolved">{statsLoading ? '...' : stats?.statusWiseCount?.RESOLVED || 0}</h3>
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

        {grievanceLoading && <p>Loading grievances...</p>}

        {/* Table */}
        {!grievanceLoading && grievances.length > 0 && (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {grievances.map((grievance) => (
                    <tr key={grievance.grievanceId}>
                      <td>
                        <strong>{grievance.title}</strong>
                        <p className="desc">{grievance.description?.substring(0, 50)}...</p>
                      </td>
                      <td><span className="chip-gray">{grievance.category?.categoryName}</span></td>
                      <td>
                        {grievance.status === 'PENDING' && <span className="chip-orange">Pending</span>}
                        {grievance.status === 'ASSIGNED' && <span className="chip-blue">In Progress</span>}
                        {grievance.status === 'RESOLVED' && <span className="chip-green">Resolved</span>}
                      </td>
                      <td>{new Date(grievance.createdAt).toLocaleDateString()}</td>
                      <td>📄</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Page {currentPage + 1} of {totalPages}</span>
              <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 0} style={{ marginRight: '10px' }}>
                  ← Previous
                </button>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                  Next →
                </button>
              </div>
            </div>
          </>
        )}

        {!grievanceLoading && grievances.length === 0 && (
          <p>No grievances found</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
