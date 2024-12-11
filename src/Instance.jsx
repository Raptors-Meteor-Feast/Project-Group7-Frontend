import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 5000, // กำหนด timeout
});

export default api;