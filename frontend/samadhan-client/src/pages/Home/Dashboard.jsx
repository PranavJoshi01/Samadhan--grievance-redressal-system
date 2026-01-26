import React from 'react'
import { useGrievances, useGrievanceStats } from '../../hooks/useGrievance'
import './Dashboard.css'
import { FaEye, FaEdit, FaTimesCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { updateGrievanceStatus } from '../../services/grievanceService'
import GrievanceModal from '../../modal/Grievance/GrievanceModal';




const Dashboard = () => {
  // Status filter state
  const [selectedStatus, setSelectedStatus] = useState('')
  
  // Fetch data from backend fetch 10 record from backend 
  const { grievances, loading: grievanceLoading, currentPage, totalPages, totalElements, pageSize, goToPage, refetch: refetchGrievances } = useGrievances(0, 10, selectedStatus)
  // fetch total counts 
  const { stats, loading: statsLoading, refetch: refetchStats } = useGrievanceStats()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGrievance, setSelectedGrievance] = useState(null)
  const [modalMode, setModalMode] = useState('view')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [grievanceToClose, setGrievanceToClose] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

const handleView = (grievance) => {
  setSelectedGrievance(grievance) // data set
  setModalMode('view')            // view mode
  setIsModalOpen(true)            // modal open
}
const handleEdit = (grievance) => {
  setSelectedGrievance(grievance)
  setModalMode('edit')
  setIsModalOpen(true)
}


  const handleNextPage = () => {
    goToPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) goToPage(currentPage - 1)
  }

  // Reset to first page when status filter changes
  useEffect(() => {
    if (currentPage !== 0) {
      goToPage(0)
    }
  }, [selectedStatus])

 



const handleClose = (id) => {
  setGrievanceToClose(id)
  setShowConfirmation(true)
}

const handleConfirmClose = async () => {
  try {
    setIsClosing(true)
    await updateGrievanceStatus(grievanceToClose, 'CLOSED')
    toast.success('Grievance closed successfully')
    setShowConfirmation(false)
    setGrievanceToClose(null)
    // Refetch the current page to show updated data
    await refetchGrievances()
    // Also refetch stats to update the counts
    await refetchStats()
  } catch (error) {
    toast.error('Failed to close grievance. Please try again.')
    console.error(error)
  } finally {
    setIsClosing(false)
  }
}

const handleCancelClose = () => {
  setShowConfirmation(false)
  setGrievanceToClose(null)
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

      {/* Status Filter */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontWeight: '600' }}>Filter by Status:</label>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{ 
            padding: '8px 12px', 
            borderRadius: '6px', 
            border: '1px solid #d1d5db',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="ASSIGNED">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
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
                        {grievance.status === 'CLOSED' && <span className="chip-gray">Closed</span>}
                      </td>
                      <td>{new Date(grievance.createdAt).toLocaleDateString()}</td>
                     <td className="action-icons">
  {/* View */}
  <FaEye
    className="icon view-icon"
    title="View Grievance"
    onClick={() => handleView(grievance)}
  />

  {/* Edit - Disabled for CLOSED status */}
  <FaEdit
    className={`icon edit-icon ${grievance.status === 'CLOSED' ? 'disabled' : ''}`}
    title={grievance.status === 'CLOSED' ? 'Closed grievances cannot be edited' : 'Edit Grievance'}
    onClick={grievance.status === 'CLOSED' ? undefined : () => handleEdit(grievance)}
    style={{
      cursor: grievance.status === 'CLOSED' ? 'not-allowed' : 'pointer',
      opacity: grievance.status === 'CLOSED' ? 0.4 : 1
    }}
  />

  {/* Close - Only enabled for PENDING status */}
  <FaTimesCircle
    className={`icon close-icon ${grievance.status !== 'PENDING' ? 'disabled' : ''}`}
    title={grievance.status === 'PENDING' ? 'Close Grievance' : 'Only pending grievances can be closed'}
    onClick={grievance.status === 'PENDING' ? () => handleClose(grievance.grievanceId) : undefined}
    style={{
      cursor: grievance.status === 'PENDING' ? 'pointer' : 'not-allowed',
      opacity: grievance.status === 'PENDING' ? 1 : 0.4
    }}
  />
</td>

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
      <GrievanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        grievance={selectedGrievance}
        mode={modalMode}
        onUpdateSuccess={async () => {
          // Refresh grievances and stats after successful update
          await refetchGrievances()
          await refetchStats()
        }}
      />

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-header">
              <h3>Close Grievance</h3>
            </div>
            <div className="confirmation-body">
              <p>Are you sure you want to close this grievance?</p>
              <p className="confirmation-subtitle">This action cannot be undone.</p>
            </div>
            <div className="confirmation-footer">
              <button 
                className="btn-secondary" 
                onClick={handleCancelClose}
                disabled={isClosing}
              >
                Cancel
              </button>
              <button 
                className="btn-danger" 
                onClick={handleConfirmClose}
                disabled={isClosing}
              >
                {isClosing ? 'Closing...' : 'Yes, Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard
