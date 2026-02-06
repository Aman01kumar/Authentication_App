import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { setAuthToken } from "../api/axios";

export const AuthProvider = ({ children }) => {
  const savedToken = localStorage.getItem("token");

  const [token, setToken] = useState(savedToken);

  useEffect(() => {
    if (savedToken) {
      setAuthToken(savedToken);
    }
  }, [savedToken]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setAuthToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
