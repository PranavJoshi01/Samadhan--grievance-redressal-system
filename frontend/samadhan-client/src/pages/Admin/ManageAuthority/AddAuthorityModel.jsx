import React, { useState } from "react";
import { createAuthority } from "../../../services/authService"; // adjust path if needed

const AddAuthorityModel = ({ isOpen, onClose, categories = [] }) => {
  const [form, setForm] = useState({
    name: "",
    departmentId: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.name || !form.departmentId || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      // Find department name using selected ID
      const selectedDept = categories.find(
        (cat) => String(cat.categoryId) === String(form.departmentId)
      );

      await createAuthority(
        form.name,
        form.email,
        form.password,
        form.departmentId,
        selectedDept?.categoryName || ""
      );

      alert("✅ Authority created successfully");

      // Reset form
      setForm({
        name: "",
        departmentId: "",
        email: "",
        password: "",
      });

      onClose(); // close modal after success
    } catch (error) {
      console.error(error);
      alert(error || "Failed to create authority");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Authority</h2>

        {/* Authority Name */}
        <input
          className="w-full border p-2 mb-3"
          placeholder="Authority Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Department Dropdown */}
        <select
          className="w-full border p-2 mb-3"
          value={form.departmentId}
          onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
        >
          <option value="">
            {categories.length === 0
              ? "No departments available"
              : "Select Department"}
          </option>

          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        {/* Email */}
        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Temporary Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="border px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Create Authority
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAuthorityModel;
