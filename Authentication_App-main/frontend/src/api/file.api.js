import api from "./axios";

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/files/upload", formData);
};

export const getFiles = () => api.get("/files");
export const deleteFile = (id) => api.delete(`/files/${id}`);
