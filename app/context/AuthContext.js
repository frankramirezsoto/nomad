'use client'

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [businessUser, setBusinessUser] = useState(null);

  // Function to "log in" a user
  const login = (userData) => {
    setUser(userData);
  };

  // Function to "log out" a user
  const logout = () => {
    setUser(null);
  };

  // Function to "log in" a user
  const loginBusiness = (buserData) => {
    setBusinessUser(buserData);
  };

  // Function to "log out" a user
  const logoutBusiness = () => {
    setBusinessUser(null);
  };

  const value = {
    user,
    businessUser,
    login,
    logout,
    loginBusiness,
    logoutBusiness
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
