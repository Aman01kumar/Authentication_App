import api from "./axios";

export const getAccount = () => api.get("/account");
export const updateBalance = (amount) =>
  api.put("/account/balance", { amount });

export const transferBalance = (data) =>
  api.post("/account/transfer", data);
