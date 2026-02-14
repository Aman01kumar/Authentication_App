import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { setAuthToken } from "../api/axios";
import { getProfile } from "../api/user.api";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {

    const loadUser = async () => {
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      try {

        setAuthToken(token);

        const res = await getProfile();
        setUser(res.data.data);
        
      } catch (err) {

        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setAuthToken(null);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loadingUser,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
