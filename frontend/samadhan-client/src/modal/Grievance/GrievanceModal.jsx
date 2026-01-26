import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateGrievanceStatus, updateGrievance } from '../../services/grievanceService'
import './GrievanceModal.css'
import defaultImage from '../../assets/default-grievance.jpg'

const GrievanceModal = ({ isOpen, onClose, grievance, mode, onUpdateSuccess }) => {
  if (!isOpen) return null;

  const isViewMode = mode === 'view'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setTitle(grievance?.title || '')
    setDescription(grievance?.description || '')
    setAddress(grievance?.address || '')
  }, [grievance])

  // Image logic
  const imageUrl =
    grievance.mediaUrls && grievance.mediaUrls.length > 0
      ? grievance.mediaUrls[0]
      : defaultImage

  // Get status chip styling
  const getStatusChipClass = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower === 'pending') return 'chip-pending'
    if (statusLower === 'assigned') return 'chip-assigned'
    if (statusLower === 'resolved') return 'chip-resolved'
    if (statusLower === 'closed') return 'chip-closed'
    return 'chip-default'
  }

  const handleCloseClick = async () => {
    try {
      await updateGrievanceStatus(grievance.grievanceId, 'CLOSED')
      toast.success('Grievance closed successfully')
      onClose()
    } catch (error) {
      toast.error('Failed to close. Please try again.')
      console.error(error)
    }
  }

  const handleSave = async () => {
    // Validation
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    if (!description.trim()) {
      toast.error('Description is required')
      return
    }

    if (!address.trim()) {
      toast.error('Address is required')
      return
    }

    try {
      setIsSaving(true)
      
      // Prepare the update data matching GrievanceDto structure
      // Note: deptId in the DTO is actually the categoryId
      const categoryId = grievance?.category?.categoryId || grievance?.categoryId || 1
      
      const updateData = {
        title: title.trim(),
        description: description.trim(),
        address: address.trim(),
        deptId: categoryId, // deptId in DTO maps to categoryId
      }

      // Call the update API
      await updateGrievance(grievance.grievanceId, updateData)
      
      toast.success('Grievance updated successfully')
      
      // Close modal
      onClose()
      
      // Trigger refresh callback if provided
      if (onUpdateSuccess) {
        onUpdateSuccess()
      }
    } catch (error) {
      console.error('Error updating grievance:', error)
      toast.error(error.response?.data?.message || 'Failed to update grievance. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header with Status and Close button */}
        <div className="modal-header-section">
          <div className="modal-header-left">
            <h2 className="modal-title">Grievance Details</h2>
            <span className={`status-badge ${getStatusChipClass(grievance.status)}`}>
              {grievance.status || 'N/A'}
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Image Section */}
        <div className="modal-image-wrapper">
          <img
            src={imageUrl}
            alt="Grievance"
            className="modal-image"
            onError={(e) => {
              e.target.src = defaultImage
            }}
          />
        </div>

        {/* Details Section */}
        <div className="modal-body">
          {/* Category and Date Info */}
          <div className="modal-meta-info">
            {grievance.category && (
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{grievance.category.categoryName || grievance.category}</span>
              </div>
            )}
            {grievance.createdAt && (
              <div className="meta-item">
                <span className="meta-label">Date:</span>
                <span className="meta-value">{new Date(grievance.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
          </div>

          {/* Title Field */}
          <div className="form-field">
            <label className="field-label">Title</label>
            {isViewMode ? (
              <div className="view-field">
                {title || 'N/A'}
              </div>
            ) : (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="modal-input"
                placeholder="Enter title"
              />
            )}
          </div>

          {/* Description Field */}
          <div className="form-field">
            <label className="field-label">Description</label>
            {isViewMode ? (
              <div className="view-field view-field-description">
                {description || 'No description provided'}
              </div>
            ) : (
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="modal-textarea"
                placeholder="Enter description"
              />
            )}
          </div>

          {/* Address Field */}
          <div className="form-field">
            <label className="field-label">Address</label>
            {isViewMode ? (
              <div className="view-field">
                {address || 'N/A'}
              </div>
            ) : (
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="modal-input"
                placeholder="Enter address"
              />
            )}
          </div>
        </div>

        {/* Footer (Only in Edit Mode) */}
        {!isViewMode && (
          <div className="modal-footer">
            <button 
              className="btn-secondary" 
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              className="btn-primary" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GrievanceModal
