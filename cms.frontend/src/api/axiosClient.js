import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7057/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error("Lỗi kết nối API:", error);
        return Promise.reject(error);
    }
);

export default axiosClient;