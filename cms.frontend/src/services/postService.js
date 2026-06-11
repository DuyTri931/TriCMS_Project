import axiosClient from "../api/axiosClient";

const postService = {
    getAllPosts: () => {
        return axiosClient.get("/Posts");
    },
};

export default postService;