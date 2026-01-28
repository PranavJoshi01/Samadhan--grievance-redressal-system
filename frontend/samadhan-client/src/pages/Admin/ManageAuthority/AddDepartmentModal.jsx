import React, { useState } from "react";
import { addDepartment } from "../../../services/grievanceService";

const AddDepartmentModal = ({ onClose, onSuccess }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    await addDepartment({
      categoryName: departmentName,
      description: description,
    });

    alert("Department added ✅");
    onSuccess(); // parent ko bole: close + refresh
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-96 rounded">
        <h2 className="text-xl mb-4">Add Department</h2>

        {/* Department Name */}
        <input
          className="border w-full p-2 mb-3"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="border w-full p-2 mb-4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
type="button"
onClick={onClose}
>
Cancel
</button>


<button
type="button"
className="bg-blue-600 text-white px-3 py-1"
onClick={handleSave}
>
Save
</button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;