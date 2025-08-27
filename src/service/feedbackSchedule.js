import axios from "axios";

const BASE_URL = "http://localhost:4003/feedbackSchedule";


// Create new schedule (default export)
const createFeedback = (data) => {
  return axios.post(`${BASE_URL}/createFeedback`, data);
};
export default createFeedback;

// Get active schedules
export const getActiveFeedbacks = () => {
  return axios.get(`${BASE_URL}/activeFeedback`);
};

// Get deactive schedules
export const getDeactiveFeedbacks = () => {
  return axios.get(`${BASE_URL}/deActiveFeedback`);
};

// Update schedule
export const updateFeedback = (id, data) => {
  return axios.put(`${BASE_URL}/updateFeedback/${id}`, data);
};

// Delete schedule
export const deleteFeedback = (id) => {
  return axios.delete(`${BASE_URL}/deleteFeedback/${id}`);
};
