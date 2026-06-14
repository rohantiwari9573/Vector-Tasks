import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-1-ndia.onrender.com/api/",
  timeout: 15000,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;