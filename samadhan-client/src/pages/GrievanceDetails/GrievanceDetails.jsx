import React from 'react'
import { useParams } from "react-router-dom";


const GrievanceDetails = () => {
  const { id } = useParams(); // get id from URL

  // load all grievances
  const allGrievances = JSON.parse(localStorage.getItem("grievances")) || [];

  // find the grievance that matches the ID
  const grievance = allGrievances.find((g) => g.id == id);

  // if invalid ID
  if (!grievance) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl">
        Grievance Not Found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Grievance Details
      </h2>

      {/* TITLE */}
      <div className="mb-4">
        <label className="font-semibold">Title</label>
        <p className="border p-3 rounded-lg mt-1">{grievance.title}</p>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-4">
        <label className="font-semibold">Description</label>
        <p className="border p-3 rounded-lg mt-1">{grievance.description}</p>
      </div>

      {/* DEPARTMENT */}
      <div className="mb-4">
        <label className="font-semibold">Department</label>
        <p className="border p-3 rounded-lg mt-1">{grievance.dept}</p>
      </div>

      {/* STATUS */}
      <div className="mb-4">
        <label className="font-semibold">Status</label>
        <p className="border p-3 rounded-lg mt-1">{grievance.status}</p>
      </div>

      {/* LOCATION */}
      <div className="mb-4">
        <label className="font-semibold">Location</label>
        <p className="border p-3 rounded-lg mt-1">
          {grievance.address || "No address provided"}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Lat: {grievance.latitude || "N/A"} · Long: {grievance.longitude || "N/A"}
        </p>
      </div>

      {/* IMAGE */}
      {grievance.media && (
        <div className="mb-4">
          <label className="font-semibold">Image</label>
          <img
            src={grievance.media}
            alt="Issue"
            className="rounded-xl mt-2"
          />
        </div>
      )}
    </div>
  );
}

export default GrievanceDetails
