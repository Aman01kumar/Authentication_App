import api from "./axios";

export const signupUser = (data) => api.post("/auth/signup", data);
export const verifyUser = (data) => api.post("/auth/verify", data);
export const loginUser = (data) => api.post("/auth/login", data);
