import axios from "axios";

const API_URL = "http://localhost:5001"; // your backend URL

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const getComplaints = async () => {
  return await axios.get(`${API_URL}/complaints`);
};

export const submitComplaint = async (data) => {
  return await axios.post(`${API_URL}/complaints`, data);
};
