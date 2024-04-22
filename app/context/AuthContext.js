'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [businessUser, setBusinessUser] = useState(null);

  // Function to "log in" a user
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
    setUser(userData);
  };

  // Function to "log out" a user
  const logout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    setUser(null);
  };

  // Function to "log in" a business user
  const loginBusiness = (buserData) => {
    localStorage.setItem('businessUser', JSON.stringify(buserData)); // Store business user data in localStorage
    setBusinessUser(buserData);
  };

  // Function to "log out" a business user
  const logoutBusiness = () => {
    localStorage.removeItem('businessUser'); // Clear business user data from localStorage
    setBusinessUser(null);
  };

  // Effect to handle initializing state from localStorage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedBusinessUser = localStorage.getItem('businessUser');
    if (storedBusinessUser) {
      setBusinessUser(JSON.parse(storedBusinessUser));
    }
  }, []);

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
