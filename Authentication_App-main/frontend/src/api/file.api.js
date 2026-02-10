import api from "./axios";

// ✅ Upload FormData directly
export const uploadFile = (formData) => {
  return api.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFiles = () => api.get("/files");

export const deleteFile = (id) => api.delete(`/files/${id}`);
