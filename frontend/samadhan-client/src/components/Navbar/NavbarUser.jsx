import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";

function NavbarUser() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    // Dispatch custom event to trigger navbar update
    window.dispatchEvent(new Event("logout"));
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg w-full">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
          Samadhan
        </Link>

        {/* Menu */}
        <ul className="flex space-x-8 items-center text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-gray-200 transition flex items-center gap-2">
              <FaHome /> Home
            </Link>
          </li>

          <li>
            <Link
              to="/user/home/dashboard"
              className="hover:text-gray-200 transition"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/user/home/raise-grievance"
              className="hover:text-gray-200 transition"
            >
              Raise Grievance
            </Link>
          </li>

          <li>
            <Link
              to="/user/home/my-grievances"
              className="hover:text-gray-200 transition"
            >
              My Grievances
            </Link>
          </li>

          <li>
            <Link
              to="/user/home/notifications"
              className="hover:text-gray-200 transition flex items-center gap-2"
            >
              <FaBell /> Notifications
            </Link>
          </li>

          <li>
            <Link
              to="/user/home/feedback"
              className="hover:text-gray-200 transition"
            >
              Feedback
            </Link>
          </li>

          {/* Profile Icon */}
          <li>
            <Link
              to="/profile"
              className="hover:text-gray-200 transition text-lg"
            >
              <FaUser />
            </Link>
          </li>

          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer font-semibold"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarUser;
