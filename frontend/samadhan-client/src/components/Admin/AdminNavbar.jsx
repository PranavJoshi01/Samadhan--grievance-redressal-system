import { Link } from "react-router-dom";

function AdminNavbar({ onAddDepartment }) {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* App Logo / Name */}
        <Link
          to="/admin/dashboard"
          className="text-xl font-bold hover:text-gray-200"
        >
          Samadhan Admin
        </Link>

        {/* Menu */}
        <ul className="flex space-x-6 items-center text-sm font-medium">

          <li>
            <Link
              to="/admin/dashboard"
              className="hover:text-gray-200 transition"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/manage-authority"
              className="hover:text-gray-200 transition"
            >
              Manage Authorities
            </Link>
          </li>

          <li>
            <Link
              to="/admin/manage-issues"
              className="hover:text-gray-200 transition"
            >
              Manage Issues
            </Link>
            </li>
            <li>
              <button
  onClick={onAddDepartment}
  className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium"
>
  + Add Department
</button>
            </li>

          {/* Logout */}
          <li>
            <Link
              to="/login"
              className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;
