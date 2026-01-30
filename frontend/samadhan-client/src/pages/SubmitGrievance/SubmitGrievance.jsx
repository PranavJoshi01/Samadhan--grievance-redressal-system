import { jwtDecode } from "jwt-decode";


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { submitGrievance, fetchCategories } from '../../services/grievanceService';

const SubmitGrievance = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dept, setDept] = useState("");
  const [address, setAddress] = useState("");
  const [media, setMedia] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mediaPreview, setMediaPreview] = useState([]);

  

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setCategoryLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load departments');
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);

    const previews = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2)
    }));
    setMediaPreview(previews);
  };

  const validateForm = () => {
    if (!title.trim()) return toast.error('Title is required'), false;
    if (!description.trim()) return toast.error('Description is required'), false;
    if (!dept) return toast.error('Please select a department'), false;
    if (!address.trim()) return toast.error('Address is required'), false;
    return true;
  };

  const getUserEmailFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded JWT:", decoded); // 🔍 helps us verify structure
    return decoded.sub; // most JWTs store email in "sub"
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userEmail = getUserEmailFromToken();

if (!userEmail) {
  toast.error("Session expired. Please login again.");
  return;
}


    try {
      setSubmitting(true);

      const grievanceData = {
  title,
  description,
  deptId: parseInt(dept),
  address,
  userEmail: userEmail, 
  media,
};


      await submitGrievance(grievanceData);

      toast.success('Grievance submitted successfully!');
      resetForm();

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      console.error('Error submitting grievance:', error);
      toast.error('Failed to submit grievance. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDept("");
    setAddress("");
    setMedia([]);
    setMediaPreview([]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10 mb-10">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">Submit Grievance</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>

        <div>
          <label className="font-semibold">Title *</label>
          <input type="text" value={title} className="w-full border p-3 rounded-lg mt-1"
            placeholder="Enter grievance title" onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label className="font-semibold">Description *</label>
          <textarea rows={3} value={description} className="w-full border p-3 rounded-lg mt-1"
            placeholder="Describe your grievance in detail"
            onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label className="font-semibold">Select Department *</label>
          <select value={dept} className="w-full border p-3 rounded-lg mt-1"
            onChange={(e) => setDept(e.target.value)} disabled={categoryLoading}>
            <option value="">{categoryLoading ? 'Loading...' : 'Choose Department'}</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Address *</label>
          <input type="text" value={address} className="border p-3 rounded-lg w-full"
            placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div>
          <label className="font-semibold">Upload Images (Optional)</label>
          <input type="file" multiple accept="image/*"
            className="w-full border p-3 rounded-lg mt-1"
            onChange={handleMediaChange} />
          {mediaPreview.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Selected Files: {mediaPreview.length}</h4>
              <ul className="space-y-1">
                {mediaPreview.map((file, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    📄 {file.name} ({file.size} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button type="button" className="border px-6 py-2 rounded-lg"
            onClick={resetForm} disabled={submitting}>Cancel</button>
          <button type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-blue-400"
            disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default SubmitGrievance;
