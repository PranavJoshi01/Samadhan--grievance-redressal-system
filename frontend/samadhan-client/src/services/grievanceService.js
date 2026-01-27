import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/apiConfig";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Fetch all grievance categories
 * @returns {Promise<Array>} Array of categories
 */
export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.CATEGORY.GET_ALL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Submit a new grievance with media files
 * @param {Object} grievanceData - Grievance form data
 * @param {string} grievanceData.title - Grievance title
 * @param {string} grievanceData.description - Grievance description
 * @param {number} grievanceData.deptId - Department ID
 * @param {string} grievanceData.address - Address
 * @param {File[]} grievanceData.media - Media files array
 * @returns {Promise<Object>} Response from server
 */
export const submitGrievance = async (grievanceData) => {
  try {
    const formData = new FormData();
    const grievanceDto = {
    title: grievanceData.title,
    description: grievanceData.description,
    deptId: grievanceData.deptId,
    address: grievanceData.address
  };

  // 🔹 Append DTO as JSON blob (IMPORTANT)
  formData.append(
    "data",
    new Blob([JSON.stringify(grievanceDto)], {
      type: "application/json",
    })
  );
    
    // Append media files
    if (grievanceData.media && grievanceData.media.length > 0) {
      grievanceData.media.forEach((file) => {
        formData.append('media', file);
      });
    }

    const response = await axiosInstance.post(
      API_ENDPOINTS.GRIEVANCE.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error submitting grievance:', error);
    throw error;
  }
};

/**
 * Get all grievances with pagination
 * @param {number} page - Page number
 * @param {number} size - Page size
 * @returns {Promise<Object>} Paginated grievances
 */
export const getAllGrievances = async (page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GRIEVANCE.GET_ALL, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching grievances:', error);
    throw error;
  }
};

/**
 * Update an existing grievance
 * @param {number} id - Grievance ID
 * @param {Object} grievanceData - Updated grievance data (title, description, address, deptId)
 * @returns {Promise<Object>} Updated grievance
 */
export const updateGrievance = async (id, grievanceData) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.GRIEVANCE.UPDATE(id),
      grievanceData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating grievance:', error);
    throw error;
  }
};

/**
 * Delete a grievance
 * @param {number} id - Grievance ID
 * @returns {Promise<void>}
 */
export const deleteGrievance = async (id) => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.GRIEVANCE.DELETE(id));
  } catch (error) {
    console.error('Error deleting grievance:', error);
    throw error;
  }
};
/**
 * Fetch grievances with pagination
 * @param {Object} filters - Filter options { page, size, status }
 * @returns {Promise<Object>} Paginated response
 */
export const fetchGrievancesWithFilters = async (filters = {}) => {
  try {
    const params = {
      page: filters.page || 0,
      size: filters.size || 10,
    };
    // Add status filter if provided
    if (filters.status) {
      params.status = filters.status;
    }
    const response = await axiosInstance.get(API_ENDPOINTS.GRIEVANCE.GET_ALL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching grievances:', error);
    throw error;
  }
};

/**
 * Fetch grievance statistics
 * @returns {Promise<Object>} Stats object with counts
 */
export const fetchGrievanceStats = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GRIEVANCE.GET_COUNT);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

/**
 * Update grievance status
 * @param {number} grievanceId - Grievance ID
 * @param {string} status - New status (PENDING, ASSIGNED, RESOLVED, CLOSED)
 * @returns {Promise<Object>} Updated grievance
 */
export const updateGrievanceStatus = async (grievanceId, status) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.GRIEVANCE.STATUS_CHANGE,
      { grievanceId, status },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating grievance status:', error);
    throw error;
  }



};



/**
 * Add new department / category
 * @param {Object} data - { categoryName, description }
 * @returns {Promise<Object>}
 */
// services/grievanceService.js

export const addDepartment = async (data) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.CATEGORY.ADD_DEPARTMENT,
    data
  );
  return response.data;

};