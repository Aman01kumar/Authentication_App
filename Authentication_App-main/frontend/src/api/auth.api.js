import api from "./axios";

export const signup = (data) => api.post("/auth/signup", data);
export const verifyAccount = (data) => api.post("/auth/verify", data);
export const login = (data) => api.post("/auth/login", data);
