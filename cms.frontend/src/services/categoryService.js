import axiosClient from "../api/axiosClient";

const categoryService = {
    getAllCategories: () => {
        return axiosClient.get("/Categories");
    },
};

export default categoryService;