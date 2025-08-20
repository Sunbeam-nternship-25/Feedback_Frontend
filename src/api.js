// src/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001", // change port if backend running on another port
});

export default api;
