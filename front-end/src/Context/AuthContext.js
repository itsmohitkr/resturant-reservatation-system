// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    isLoading: true, // Add a loading state
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:5001/auth/verify", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent with the request
        });

        if (response.ok) {
          const data = await response.json();

          setAuthState({
            isAuthenticated: true,
            user: data.data.user.email,
            isLoading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
