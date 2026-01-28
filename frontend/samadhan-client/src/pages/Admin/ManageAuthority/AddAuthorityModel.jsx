// AddAuthorityModal.jsx
/*import React, { useState } from "react";

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
       
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Authority</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Create a new municipal authority user account
        </p>

       
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

export default AddAuthorityModel;*/



import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../services/grievanceService";

const AddAuthorityModel = ({ isOpen, onClose, onSave }) => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    departmentId: "",
    email: "",
    password: "",
  });

  // 🔹 FETCH categories when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCategories().then((res) => setCategories(res));
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!form.name || !form.departmentId || !form.email || !form.password) {
      alert("All fields required");
      return;
    }
    onSave(form);
    setForm({ name: "", departmentId: "", email: "", password: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Authority</h2>

        {/* Authority Name */}
        <input
          className="w-full border p-2 mb-3"
          placeholder="Authority Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* 🔽 Department DROPDOWN */}
        <select
          className="w-full border p-2 mb-3"
          value={form.departmentId}
          onChange={(e) =>
            setForm({ ...form, departmentId: e.target.value })
          }
        >
          <option value="">Select Department</option>
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
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Temporary Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

          
   
        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
type="button"
className="border px-4 py-2"
onClick={onClose}
>
Cancel
</button>


<button
type="button"
className="bg-blue-600 text-white px-4 py-2"
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
