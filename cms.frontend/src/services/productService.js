import axiosClient from "../api/axiosClient";

const productService = {
  getAllProducts: () => axiosClient.get("/Products"),
  getProductById: (id) => axiosClient.get(`/Products/${id}`),
  getByCategoryProduct: (categoryProductId) =>
    axiosClient.get(`/Products/categoryproduct/${categoryProductId}`),
};

export default productService;
