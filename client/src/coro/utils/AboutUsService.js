import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});  

const getProducts = () => api.get("/posts");
const deletePost = (id) => api.delete(`/posts/${id}`);
const createPost = (post) => api.post("/posts", post);
const uploadImage = (image) => api.post("/posts/uploads", image);
const updatePost = (id, post) => api.patch(`/posts/${id}`, post);


export { getProducts, deletePost, createPost, updatePost, uploadImage };
