import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitGrievance() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dept, setDept] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [media, setMedia] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dept) {
      alert("Please fill all required fields!");
      return;
    }

    // create grievance object
    const grievance = {
      id: Date.now(), // unique id
      title,
      description,
      dept,
      address,
      latitude,
      longitude,
      status: "Pending",
      media: media ? URL.createObjectURL(media) : null,
    };

    // old data
    const oldList = JSON.parse(localStorage.getItem("grievances")) || [];

    // new updated list
    const updatedList = [...oldList, grievance];

    // save to localStorage
    localStorage.setItem("grievances", JSON.stringify(updatedList));

    alert("Grievance Submitted Successfully!");

    // redirect to My Grievances page
    navigate("/my-grievances");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">
        Submit Grievance
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {/* Title */}
        <div>
          <label className="font-semibold">Title *</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg mt-1"
            placeholder="Enter issue title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description *</label>
          <textarea
            rows={3}
            className="w-full border p-3 rounded-lg mt-1"
            placeholder="Describe your issue"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Department */}
        <div>
          <label className="font-semibold">Select Department *</label>
          <select
            className="w-full border p-3 rounded-lg mt-1"
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="">Choose department</option>
            <option value="Sanitation">Sanitation Department</option>
            <option value="Maintenance">Maintenance Department</option>
            <option value="Road">Road Department</option>
            <option value="Electricity">Electricity Department</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location</label>

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg mt-2 w-full"
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              placeholder="Latitude"
              className="border p-3 rounded-lg"
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="text"
              placeholder="Longitude"
              className="border p-3 rounded-lg"
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </div>

        {/* Upload Media */}
        <div>
          <label className="font-semibold">Upload Image</label>
          <input
            type="file"
            className="w-full border p-3 rounded-lg mt-1"
            accept="image/*"
            onChange={(e) => setMedia(e.target.files[0])}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="border px-6 py-2 rounded-lg"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}