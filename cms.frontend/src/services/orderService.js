import axiosClient from "../api/axiosClient";

const orderService = {
  createOrder: (data) => axiosClient.post("/Orders", data),
};

export default orderService;
