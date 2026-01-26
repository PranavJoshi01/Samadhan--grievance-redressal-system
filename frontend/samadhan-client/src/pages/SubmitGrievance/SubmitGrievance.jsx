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

  // Fetch categories on mount
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
    
    // Create preview info
    const previews = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2)
    }));
    setMediaPreview(previews);
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!dept) {
      toast.error('Please select a department');
      return false;
    }
    if (!address.trim()) {
      toast.error('Address is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      
      const grievanceData = {
        title,
        description,
        deptId: parseInt(dept),
        address,
        media
      };

      await submitGrievance(grievanceData);

      toast.success('Grievance submitted successfully!');
      
      // Reset form
      resetForm();
      
      // Redirect after 2 seconds
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

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10 mb-10">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">
        Submit Grievance
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {/* Title */}
        <div>
          <label className="font-semibold">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={title}
            className="w-full border p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter grievance title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description <span className="text-red-500">*</span></label>
          <textarea
            rows={3}
            value={description}
            className="w-full border p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your grievance in detail"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Department Selection */}
        <div>
          <label className="font-semibold">Select Department <span className="text-red-500">*</span></label>
          <select
            value={dept}
            className="w-full border p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDept(e.target.value)}
            disabled={categoryLoading}
          >
            <option value="">
              {categoryLoading ? 'Loading departments...' : 'Choose Department'}
            </option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Address <span className="text-red-500">*</span></label>

          <input
            type="text"
            placeholder="Address"
            value={address}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Media Upload */}
        <div>
          <label className="font-semibold">Upload Images / Videos (Optional)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full border p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleMediaChange}
          />
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: JPG, PNG
          </p>
          
          {/* Media Preview */}
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="border border-gray-300 px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            onClick={handleCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default SubmitGrievance
