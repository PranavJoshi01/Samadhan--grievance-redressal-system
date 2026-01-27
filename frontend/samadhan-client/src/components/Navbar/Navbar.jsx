import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navConfig'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()

  const role = localStorage.getItem('role') || 'USER'
  const menuItems = NAV_ITEMS[role] || []

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navbar-logo">
        Samadhan
      </div>

      {/* Center menu */}
      <ul className="navbar-menu">
        {menuItems.map((item) => (
          <li key={item.path} className="navbar-item">
            <Link to={item.path} className="navbar-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right */}
      <div className="navbar-actions">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
