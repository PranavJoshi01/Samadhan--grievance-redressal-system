import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg w-full">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold hover:text-gray-200"
        >
          Samadhan
        </Link>

        <ul className="flex space-x-6 items-center text-sm font-medium">
          <li>
            <Link
              to="/feedback"
              className="hover:text-gray-200 transition"
            >
              Feedback
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
