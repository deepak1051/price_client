import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.log('Invalid token', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        credentials
      );
      const { token } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const decoded = jwtDecode(token);
      setUser(decoded);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message || 'Login failed',
      };
    }
  };

  const signup = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/signup',
        data
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message || 'Signup failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
