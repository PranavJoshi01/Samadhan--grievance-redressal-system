import React, { useEffect, useState } from "react";
import AddAuthorityModal from "./AddAuthorityModal"; // ✅ fixed name
import AddDepartmentModal from "./AddDepartmentModal";
import { fetchCategories } from "../../../services/grievanceService";
import { getAllAuthorities } from "../../../services/authService";

const ManageAuthority = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAddDept, setOpenAddDept] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authorities, setAuthorities] = useState([]);

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(Array.isArray(res) ? res : []);
    } catch {
      setCategories([]);
    }
  };

  const loadAuthorities = async () => {
    try {
      const res = await getAllAuthorities();
      setAuthorities(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Failed to load authorities", err);
      setAuthorities([]);
    }
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Department
            </button>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
              {authorities.map((auth, index) => (
                <tr key={auth.userId || auth.email || index}>
                  <td className="p-3 border">{auth.name || "—"}</td>
                  <td className="p-3 border">{auth.deptName || "—"}</td>
                  <td className="p-3 border">{auth.email || "—"}</td>
                  <td className="p-3 border">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      ACTIVE
                    </span>
                  </td>
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
          <AddAuthorityModal
            isOpen={openModal}
            categories={categories}
            onClose={() => setOpenModal(false)}
            onSuccess={loadAuthorities} // ✅ refresh after success
          />
        )}

        {/* Add Department Modal */}
        {openAddDept && (
          <AddDepartmentModal
            categories={categories}
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
