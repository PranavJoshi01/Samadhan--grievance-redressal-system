import axios from "axios";

const API_BASE = "http://localhost:8080/feedback";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated. Please login again.");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Submit feedback
export const submitFeedback = async (data) => {
  try {
    const response = await axios.post(API_BASE, data, getAuthHeader());
    return response.data;
  } catch (error) {
    // Backend may send string OR object
    if (error.response && error.response.data) {
      const message =
        typeof error.response.data === "string"
          ? error.response.data
          : JSON.stringify(error.response.data);

      throw new Error(message);
    }

    throw new Error("Unable to submit feedback. Please try again.");
  }
};

// Get feedback by grievance
export const getFeedbackByGrievance = async (grievanceId) => {
  try {
    const response = await axios.get(
      `${API_BASE}/grievance/${grievanceId}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const message =
        typeof error.response.data === "string"
          ? error.response.data
          : JSON.stringify(error.response.data);

      throw new Error(message);
    }

    throw new Error("Unable to load feedback.");
  }
};
