import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg w-full">
      <div className="w-full px-6 py-4 flex items-center justify-between">

        {/* App Logo / Name */}
        <Link
          to="/user/home"
          className="text-xl font-bold hover:text-gray-200"
        >
          Samadhan
        </Link>

        {/* Menu */}
        <ul className="flex space-x-6 items-center text-sm font-medium">

          <li>
            <Link
              to="/user/home"
              className="hover:text-gray-200 transition"
            >
              <FaHome />
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
              className="hover:text-gray-200 transition"
            >
              Notifications
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

export default Navbar;
