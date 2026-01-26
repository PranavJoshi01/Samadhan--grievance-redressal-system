// AddAuthorityModal.jsx
import React, { useState } from "react";

const AddAuthorityModel = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.name || !form.department || !form.email || !form.password)
      return alert("All fields are required");

    onSave(form);
    setForm({ name: "", department: "", email: "", password: "" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Authority</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Create a new municipal authority user account
        </p>

        {/* INPUTS */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Authority Name</label>
            <input
              type="text"
              placeholder="e.g., Road Department"
              className="w-full border rounded p-2 mt-1"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Department</label>
            <input
              type="text"
              placeholder="e.g., Road & Transportation"
              className="w-full border rounded p-2 mt-1"
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="department@city.gov"
              className="w-full border rounded p-2 mt-1"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Temporary Password
            </label>
            <input
              type="password"
              placeholder="••••••"
              className="w-full border rounded p-2 mt-1"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
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
