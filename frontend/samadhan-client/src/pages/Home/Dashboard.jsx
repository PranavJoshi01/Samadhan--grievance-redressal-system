import React from 'react'
import { useGrievances, useGrievanceStats } from '../../hooks/useGrievance'
import './Dashboard.css'
import { FaEye, FaEdit, FaTimesCircle, FaUserEdit } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { fetchCategories } from '../../services/grievanceService'
import GrievanceModal from '../../modal/Grievance/GrievanceModal';

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [role, setRole] = useState("");
  const [statusDropdownId, setStatusDropdownId] = useState(null);
  const [assignDropdownId, setAssignDropdownId] = useState(null);
  const [statusSelectValue, setStatusSelectValue] = useState("");
  const [assignSelectValue, setAssignSelectValue] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  
  const { grievances, loading: grievanceLoading, currentPage, totalPages, goToPage, refetch: refetchGrievances } = useGrievances(0, 10, selectedStatus)
  const { stats, loading: statsLoading, refetch: refetchStats } = useGrievanceStats()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGrievance, setSelectedGrievance] = useState(null)
  const [modalMode, setModalMode] = useState('view')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [grievanceToClose, setGrievanceToClose] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await fetchCategories();
      setDepartments(data);
    } catch (error) {
      toast.error('Failed to load departments');
    }
  };

  const handleView = (grievance) => {
    setSelectedGrievance(grievance)
    setModalMode('view')
    setIsModalOpen(true)
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
      await import('../../services/grievanceService').then(mod => mod.updateGrievanceStatus(grievanceToClose, 'CLOSED'));
      toast.success('Grievance closed successfully')
      setShowConfirmation(false)
      setGrievanceToClose(null)
      await refetchGrievances()
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
      <div className="page-title-section">
        <h2 className="dashboard-title">{role === "ADMIN" ? "Admin" : role === "AUTHORITY" ? "Authority" : "User"} Dashboard</h2>
        <p className="dashboard-subtitle">Manage your reported grievances and track their progress</p>
      </div>

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
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div className="grievances-section">
        <h3 className="grievances-title">{role === "ADMIN" ? "All Grievances" : role === "AUTHORITY" ? "Assigned Grievances" : "My Grievances"}</h3>
        <p className="grievances-subtitle">{role === "ADMIN" ? "Complete list of all grievances" : role === "AUTHORITY" ? "Grievances assigned to your department" : "Complete list of grievances you've reported"}</p>

        {grievanceLoading && <p>Loading grievances...</p>}

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
                        {grievance.status === 'IN_PROGRESS' && <span className="chip-blue">In Progress</span>}
                        {grievance.status === 'RESOLVED' && <span className="chip-green">Resolved</span>}
                        {grievance.status === 'CLOSED' && <span className="chip-gray">Closed</span>}
                      </td>
                      <td>{new Date(grievance.createdAt).toLocaleDateString()}</td>
                      <td className="action-icons">
                        {role === 'ADMIN' && (
                          <>
                            <FaEye className="icon view-icon" title="View Grievance" onClick={() => handleView(grievance)} />
                            <span style={{ position: 'relative' }}>
                              <FaEdit className={`icon edit-icon ${grievance.status === 'CLOSED' ? 'disabled' : ''}`} title={grievance.status === 'CLOSED' ? 'Cannot change status for closed grievances' : 'Change Status'} onClick={grievance.status !== 'CLOSED' ? () => { setStatusDropdownId(statusDropdownId === grievance.grievanceId ? null : grievance.grievanceId); setStatusSelectValue(grievance.status); } : undefined} style={{ cursor: grievance.status === 'CLOSED' ? 'not-allowed' : 'pointer', marginLeft: 8, opacity: grievance.status === 'CLOSED' ? 0.4 : 1 }} />
                              {statusDropdownId === grievance.grievanceId && grievance.status !== 'CLOSED' && (
                                  <div style={{ position: 'absolute', top: 30, left: 0, zIndex: 20, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '18px 20px 14px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                    <label style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Change Status</label>
                                    <select value={statusSelectValue} onChange={e => setStatusSelectValue(e.target.value)} disabled={statusLoading} style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, marginBottom: 14, outline: 'none', background: '#f9fafb' }}>
                                      <option value="">Select Status</option>
                                      <option value="PENDING">Pending</option>
                                      <option value="IN_PROGRESS">In Progress</option>
                                      <option value="RESOLVED">Resolved</option>
                                      <option value="CLOSED">Closed</option>
                                    </select>
                                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                      <button style={{ padding: '6px 14px', borderRadius: 5, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 13, cursor: statusLoading || !statusSelectValue || statusSelectValue === grievance.status ? 'not-allowed' : 'pointer', opacity: statusLoading || !statusSelectValue || statusSelectValue === grievance.status ? 0.6 : 1 }} disabled={statusLoading || !statusSelectValue || statusSelectValue === grievance.status} onClick={async () => { setStatusLoading(true); try { await import('../../services/grievanceService').then(mod => mod.updateGrievanceStatus(grievance.grievanceId, statusSelectValue)); toast.success('Status updated'); setStatusDropdownId(null); await refetchGrievances(); await refetchStats(); } catch (err) { toast.error('Failed to update status'); } finally { setStatusLoading(false); } }}>Update</button>
                                      <button style={{ padding: '6px 14px', borderRadius: 5, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer' }} onClick={() => setStatusDropdownId(null)}>Cancel</button>
                                    </div>
                                  </div>
                                )}
                            </span>
                            <span style={{ position: 'relative' }}>
                              <FaUserEdit className={`icon assign-icon ${grievance.status === 'CLOSED' ? 'disabled' : ''}`} title={grievance.status === 'CLOSED' ? 'Cannot change assignment for closed grievances' : 'Change Assignment'} onClick={grievance.status !== 'CLOSED' ? () => { setAssignDropdownId(assignDropdownId === grievance.grievanceId ? null : grievance.grievanceId); setAssignSelectValue(""); } : undefined} style={{ marginLeft: 8, cursor: grievance.status === 'CLOSED' ? 'not-allowed' : 'pointer', opacity: grievance.status === 'CLOSED' ? 0.4 : 1 }} />
                              {assignDropdownId === grievance.grievanceId && grievance.status !== 'CLOSED' && (
                                  <div style={{ position: 'absolute', top: 30, left: 0, zIndex: 20, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '18px 20px 14px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                    <label style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Change Assignment</label>
                                    <select value={assignSelectValue} onChange={e => setAssignSelectValue(e.target.value)} disabled={assignLoading} style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, marginBottom: 14, outline: 'none', background: '#f9fafb' }}>
                                      <option value="">Select Department</option>
                                      {departments.map((dept) => (<option key={dept.categoryId} value={dept.categoryId}>{dept.categoryName}</option>))}
                                    </select>
                                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                      <button style={{ padding: '6px 14px', borderRadius: 5, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 13, cursor: assignLoading || !assignSelectValue ? 'not-allowed' : 'pointer', opacity: assignLoading || !assignSelectValue ? 0.6 : 1 }} disabled={assignLoading || !assignSelectValue} onClick={async () => { if (!assignSelectValue) return; setAssignLoading(true); try { await import('../../services/grievanceService').then(mod => mod.assignGrievance(grievance.grievanceId, assignSelectValue)); toast.success('Assignment updated'); setAssignDropdownId(null); await refetchGrievances(); } catch (err) { toast.error('Failed to update assignment'); } finally { setAssignLoading(false); } }}>Update</button>
                                      <button style={{ padding: '6px 14px', borderRadius: 5, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer' }} onClick={() => setAssignDropdownId(null)}>Cancel</button>
                                    </div>
                                  </div>
                                )}
                              </span>
                          </>
                        )}
                        {role === 'AUTHORITY' && (
                          <>
                            <FaEye className="icon view-icon" title="View Grievance" onClick={() => handleView(grievance)} />
                            <span style={{ position: 'relative' }}>
                              <FaEdit className={`icon edit-icon ${grievance.status === 'CLOSED' ? 'disabled' : ''}`} title={grievance.status === 'CLOSED' ? 'Cannot change status for closed grievances' : 'Change Status'} onClick={grievance.status !== 'CLOSED' ? () => { setStatusDropdownId(statusDropdownId === grievance.grievanceId ? null : grievance.grievanceId); setStatusSelectValue(grievance.status); } : undefined} style={{ cursor: grievance.status === 'CLOSED' ? 'not-allowed' : 'pointer', marginLeft: 8, opacity: grievance.status === 'CLOSED' ? 0.4 : 1 }} />
                              {statusDropdownId === grievance.grievanceId && grievance.status !== 'CLOSED' && (
                                <div style={{ position: 'absolute', top: 30, left: 0, zIndex: 20, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '18px 20px 14px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                  <label style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Change Status</label>
                                  <select value={statusSelectValue} onChange={e => setStatusSelectValue(e.target.value)} disabled={statusLoading} style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, marginBottom: 14, outline: 'none', background: '#f9fafb' }}>
                                    <option value="">Select Status</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="RESOLVED">Resolved</option>
                                    <option value="CLOSED">Closed</option>
                                  </select>
                                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                    <button style={{ padding: '6px 14px', borderRadius: 5, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 13, cursor: statusLoading || !statusSelectValue || statusSelectValue === grievance.status ? 'not-allowed' : 'pointer', opacity: statusLoading || !statusSelectValue || statusSelectValue === grievance.status ? 0.6 : 1 }} disabled={statusLoading || !statusSelectValue || statusSelectValue === grievance.status} onClick={async () => { setStatusLoading(true); try { await import('../../services/grievanceService').then(mod => mod.updateGrievanceStatus(grievance.grievanceId, statusSelectValue)); toast.success('Status updated'); setStatusDropdownId(null); await refetchGrievances(); await refetchStats(); } catch (err) { toast.error('Failed to update status'); } finally { setStatusLoading(false); } }}>Update</button>
                                    <button style={{ padding: '6px 14px', borderRadius: 5, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer' }} onClick={() => setStatusDropdownId(null)}>Cancel</button>
                                  </div>
                                </div>
                              )}
                            </span>
                          </>
                        )}
                        {role === 'USER' && (
                          <>
                            <FaEye className="icon view-icon" title="View Grievance" onClick={() => handleView(grievance)} />
                            <FaEdit className={`icon edit-icon ${grievance.status === 'CLOSED' ? 'disabled' : ''}`} title={grievance.status === 'CLOSED' ? 'Closed grievances cannot be edited' : 'Edit Grievance'} onClick={grievance.status === 'CLOSED' ? undefined : () => handleEdit(grievance)} style={{ cursor: grievance.status === 'CLOSED' ? 'not-allowed' : 'pointer', opacity: grievance.status === 'CLOSED' ? 0.4 : 1 }} />
                            <FaTimesCircle className={`icon close-icon ${grievance.status !== 'PENDING' ? 'disabled' : ''}`} title={grievance.status === 'PENDING' ? 'Close Grievance' : 'Only pending grievances can be closed'} onClick={grievance.status === 'PENDING' ? () => handleClose(grievance.grievanceId) : undefined} style={{ cursor: grievance.status === 'PENDING' ? 'pointer' : 'not-allowed', opacity: grievance.status === 'PENDING' ? 1 : 0.4 }} />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Page {currentPage + 1} of {totalPages}</span>
              <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 0} style={{ marginRight: '10px' }}>← Previous</button>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Next →</button>
              </div>
            </div>
          </>
        )}

        {!grievanceLoading && grievances.length === 0 && <p>No grievances found</p>}
      </div>

      <GrievanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} grievance={selectedGrievance} mode={modalMode} onUpdateSuccess={async () => { await refetchGrievances(); await refetchStats(); }} />

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-header"><h3>Close Grievance</h3></div>
            <div className="confirmation-body"><p>Are you sure you want to close this grievance?</p><p className="confirmation-subtitle">This action cannot be undone.</p></div>
            <div className="confirmation-footer">
              <button className="btn-secondary" onClick={handleCancelClose} disabled={isClosing}>Cancel</button>
              <button className="btn-danger" onClick={handleConfirmClose} disabled={isClosing}>{isClosing ? 'Closing...' : 'Yes, Close'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
