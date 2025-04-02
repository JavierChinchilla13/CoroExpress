import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

const getProfiles = () => api.get("/profile");
const deletePost = (id) => api.delete(`/profile/${id}`);
const createPost = (post) => api.post("/profile", post);
const uploadImage = (image) => api.post("/profile/uploads", image);
const updatePost = (id, post) => api.patch(`/profile/${id}`, post);

export { getProfiles, deletePost, createPost, updatePost, uploadImage };
