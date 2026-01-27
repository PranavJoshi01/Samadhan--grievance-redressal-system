import React, { useState } from "react";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import AddAuthorityModel from "./AddAuthorityModel";

const ManageAuthority = () => {
  const [openModal, setOpenModal] = useState(false);

  const [authorities, setAuthorities] = useState([
    {
      id: 1,
      name: "Road Department",
      department: "Road & Transportation",
      email: "roads@city.gov",
      assignedIssue: "3 issues",
      status: "Active",
    },
    {
      id: 2,
      name: "Sanitation Department",
      department: "Waste & Sanitation",
      email: "sanitation@city.gov",
      assignedIssue: "1 issues",
      status: "Active",
    },
    {
      id: 3,
      name: "Maintenance Department",
      department: "Public Maintenance",
      email: "maintenance@city.gov",
      assignedIssue: "2 issues",
      status: "Active",
    },
    {
      id: 4,
      name: "Utilities Department",
      department: "Utilities & Power",
      email: "utilities@city.gov",
      assignedIssue: "0 issues",
      status: "Active",
    },
  ]);

  // Summary data
  const totalAuthorities = authorities.length;
  const activeAssignments = authorities.reduce(
    (total, a) => total + parseInt(a.assignedIssue),
    0
  );
  const availableAuthorities = authorities.filter((a) => a.status === "Active")
    .length;

  const handleEdit = (id) => {
    console.log("Edit authority:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      

      <div className="p-8">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Manage Authorities
            </h1>
            <p className="text-gray-500">
              Add and manage municipal authority users
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
          >
            + Add Authority
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-600 font-medium">Total Authorities</h2>
            <p className="text-2xl font-bold mt-2">{totalAuthorities}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-600 font-medium">Active Assignments</h2>
            <p className="text-2xl font-bold mt-2">{activeAssignments}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-600 font-medium">Available Authorities</h2>
            <p className="text-2xl font-bold mt-2">{availableAuthorities}</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <h3 className="px-6 pt-6 text-lg font-semibold text-gray-800">
            Authority Users
          </h3>
          <p className="px-6 mb-4 text-gray-500 text-sm">
            List of all registered municipal authorities
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Department</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Assigned Issues</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {authorities.map((auth) => (
                  <tr key={auth.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{auth.name}</td>
                    <td className="p-3 border">{auth.department}</td>
                    <td className="p-3 border">{auth.email}</td>
                    <td className="p-3 border">{auth.assignedIssue}</td>

                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          auth.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {auth.status}
                      </span>
                    </td>

                    <td className="p-3 border">
                      <button
                        onClick={() => handleEdit(auth.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}

                {authorities.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No authority added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {openModal && (
          <AddAuthorityModel
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onSave={(form) => {
              const newId = authorities.length
                ? Math.max(...authorities.map((a) => a.id)) + 1
                : 1;
              const newAuth = {
                id: newId,
                name: form.name,
                department: form.department,
                email: form.email,
                assignedIssue: "0",
                status: "Active",
              };
              setAuthorities((prev) => [...prev, newAuth]);
              setOpenModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ManageAuthority;
