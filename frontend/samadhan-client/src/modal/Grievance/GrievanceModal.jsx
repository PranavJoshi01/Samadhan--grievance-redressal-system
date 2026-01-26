import React, { useEffect, useState } from 'react'
import './GrievanceModal.css'
import defaultImage from '../../assets/default-grievance.jpg'

const GrievanceModal = ({ isOpen, onClose, grievance, mode }) => {
  if (!isOpen) return null;


  const isViewMode = mode === 'view'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    setTitle(grievance.title || '')
    setDescription(grievance.description || '')
    setAddress(grievance.address || '')
  }, [grievance])

  // Image logic
  const imageUrl = grievance.media?.mediaUrl || defaultImage

  const handleSave = () => {
    console.log('Saving updated grievance:', {
      title,
      description,
      address,
    })

    // 🔴 Later: call update grievance API here
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">

        {/* ❌ Close icon (ONLY VIEW MODE) */}
        {isViewMode && (
          <div className="modal-header">
            <button className="close-btn" onClick={onClose}>✖</button>
          </div>
        )}

        {/* 🖼 IMAGE SECTION */}
        <div className="modal-image-wrapper">

  <img
    src={imageUrl}
    alt="Grievance"
    className="modal-image"
  />

  <span className={`image-status-chip ${grievance.status?.toLowerCase()}`}>
   Status: {grievance.status}
  </span>

</div>


        {/* 📄 DETAILS */}
        <div className="modal-body">

         <label>Title</label>
{isViewMode ? (
  <p className="view-text title-text">{title}</p>
) : (
  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
)}
<br/>
         
       <label>Description</label>
{isViewMode ? (
  <p className="view-text description-text">{description}</p>
) : (
  <textarea
    rows={3}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
)}
<br/>

         <label>Address</label>
{isViewMode ? (
  <p className="view-text address-text">{address}</p>
) : (
  <input
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />
)}


        

        </div>

        {/* ✅ FOOTER (ONLY EDIT MODE) */}
        {!isViewMode && (
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default GrievanceModal
