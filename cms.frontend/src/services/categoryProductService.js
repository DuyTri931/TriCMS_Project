import axiosClient from "../api/axiosClient";

const categoryProductService = {
  getAllCategoryProducts: () => axiosClient.get("/CategoriesProducts"),
};

export default categoryProductService;
