import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* App Logo / Name */}
        <Link
          to="/dashboard"
          className="text-xl font-bold hover:text-gray-200"
        >
          Samadhan
        </Link>

        {/* Menu */}
        <ul className="flex space-x-6 items-center text-sm font-medium">

          <li>
            <Link
              to="/dashboard"
              className="hover:text-gray-200 transition"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/raise-grievance"
              className="hover:text-gray-200 transition"
            >
              Raise Grievance
            </Link>
          </li>

          <li>
            <Link
              to="/my-grievances"
              className="hover:text-gray-200 transition"
            >
              My Grievances
            </Link>
          </li>

          <li>
            <Link
              to="/notifications"
              className="hover:text-gray-200 transition"
            >
              Notifications
            </Link>
          </li>

          <li>
            <Link
              to="/feedback"
              className="hover:text-gray-200 transition"
            >
              Feedback
            </Link>
          </li>

          {/* Logout */}
          <li>
            <button className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition">
              <Link
              to="/"
              className="hover:text-gray-200 transition"
            >
              Logout
            </Link>
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
