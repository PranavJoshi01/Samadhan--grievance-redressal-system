import { useState } from "react";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-40 h-14 bg-blue-600 text-white flex items-center justify-between px-6">
        <h1 className="font-semibold text-lg">Admin Dashboard</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
        >
          + Add Department
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-[380px] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Add Department</h2>

            <div className="mb-3">
              <label className="text-sm font-medium">Department Name</label>
              <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1 border rounded text-sm"
              >
                Cancel
              </button>

              <button
                className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PUSH CONTENT BELOW NAVBAR */}
      <div className="h-14"></div>
    </>
  );
}