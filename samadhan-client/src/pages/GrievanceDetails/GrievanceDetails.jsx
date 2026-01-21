import React from 'react'
import { Link } from "react-router-dom";

const GrievanceDetails = () => {
  // load all grievances
  const allGrievances = JSON.parse(localStorage.getItem("grievances")) || [];

  // For demo, assume current user is "John Doe" - in real app, get from auth
  const currentUser = "John Doe";
  const userGrievances = allGrievances.filter((g) => g.userName === currentUser);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        My Grievances
      </h2>

      {userGrievances.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No grievances found. <Link to="/user/home/raise-grievance" className="text-blue-600 underline">Raise your first grievance</Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userGrievances.map((grievance) => (
            <div key={grievance.id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {grievance.title}
              </h3>

              {/* Status Badge */}
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  grievance.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  grievance.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  grievance.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {grievance.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {grievance.description}
              </p>

              {/* Department */}
              <div className="mb-3">
                <span className="font-medium text-gray-700">Department:</span>
                <span className="ml-2 text-gray-600">{grievance.dept}</span>
              </div>

              {/* Location */}
              <div className="mb-3">
                <span className="font-medium text-gray-700">Location:</span>
                <p className="text-gray-600 text-sm mt-1">
                  {grievance.address || "No address provided"}
                </p>
                {(grievance.latitude || grievance.longitude) && (
                  <p className="text-xs text-gray-500">
                    Lat: {grievance.latitude || "N/A"} · Long: {grievance.longitude || "N/A"}
                  </p>
                )}
              </div>

              {/* User Name */}
              <div className="mb-4">
                <span className="font-medium text-gray-700">Raised by:</span>
                <span className="ml-2 text-gray-600">{grievance.userName}</span>
              </div>

              {/* Image */}
              {grievance.media && (
                <div className="mb-4">
                  <img
                    src={grievance.media}
                    alt="Issue"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Date */}
              <div className="text-sm text-gray-500">
                Submitted on: {new Date(grievance.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GrievanceDetails
