import axiosClient from "../api/axiosClient";

const blogService = {
  getAllPosts: () => axiosClient.get("/Posts"),
  getPostById: (id) => axiosClient.get(`/Posts/${id}`),
  getPostsByCategory: (categoryId) => axiosClient.get(`/Posts/category/${categoryId}`),
};

export default blogService;
