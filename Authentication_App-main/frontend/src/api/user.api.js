import api from "./axios";

export const getProfile = () => api.get("/user/me");
export const updateProfile = (data) => api.put("/user/me", data);
export const deleteUser = () => api.delete("/user/me");
