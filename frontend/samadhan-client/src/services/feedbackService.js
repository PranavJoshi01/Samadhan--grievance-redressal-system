import axios from "axios";

const API_BASE = "http://localhost:8080/feedback";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const submitFeedback = (data) =>
  axios.post(API_BASE, data, getAuthHeader());

export const getFeedbackByGrievance = (grievanceId) =>
  axios.get(`${API_BASE}/grievance/${grievanceId}`, getAuthHeader());
