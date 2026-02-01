import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import AddAuthorityModel from "./AddAuthorityModel";
import AddDepartmentModal from "./AddDepartmentModal";
import { fetchCategories } from "../../../services/grievanceService";
import { toast } from "react-toastify";
import { getAllAuthorities } from "../../../services/authService";

const ManageAuthority = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAddDept, setOpenAddDept] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authorities, setAuthorities] = useState([]);

  const loadCategories = () => {
    fetchCategories()
      .then((res) => setCategories(res))
      .catch(() => setCategories([]));
  };

  const loadAuthorities = () => {
    getAllAuthorities()
      .then((res) => {
        setAuthorities(Array.isArray(res) ? res : []);
      })
      .catch((err) => {
        console.error("Failed to load authorities", err);
        setAuthorities([]);
      });
  };

  useEffect(() => {
    loadAuthorities();
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Manage Authorities
            </h1>
            <p className="text-gray-500">
              Add and manage municipal authority users
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenAddDept(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Department
            </button>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Authority
            </button>
          </div>
        </div>

        {/* Authority Table */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {authorities.map((auth) => (
                <tr key={auth.id}>
                  <td className="p-3 border">{auth.name}</td>
                  <td className="p-3 border">{auth.department}</td>
                  <td className="p-3 border">{auth.email}</td>
                  <td className="p-3 border">{auth.status}</td>
                </tr>
              ))}

              {authorities.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No authority added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Authority Modal */}
        {openModal && (
          <AddAuthorityModel
            isOpen={openModal}
            categories={categories}
            onClose={() => {
              setOpenModal(false);
              loadAuthorities(); // refresh list after creation
            }}
          />
        )}

        {/* Add Department Modal */}
        {openAddDept && (
          <AddDepartmentModal
            onClose={() => setOpenAddDept(false)}
            onSuccess={() => {
              setOpenAddDept(false);
              loadCategories();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ManageAuthority;
