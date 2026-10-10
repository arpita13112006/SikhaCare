import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const DEFAULT_USER = {
  name: 'Ananya',
  email: 'ananya@sakhicare.org',
  mode: 'Girl Mode', // 'Girl Mode' | 'Woman Mode'
  isLoggedIn: true
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sakhi_user');
      return savedUser ? JSON.parse(savedUser) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sakhi_user', JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save user to localStorage:', err);
    }
  }, [user]);

  const login = (userData) => {
    setUser({
      name: userData.name || (userData.email ? userData.email.split('@')[0] : 'User'),
      email: userData.email,
      mode: userData.mode || user.mode || 'Girl Mode',
      isLoggedIn: true
    });
  };

  const register = (userData) => {
    setUser({
      name: userData.name || 'Friend',
      email: userData.email,
      mode: userData.mode || 'Girl Mode',
      isLoggedIn: true
    });
  };

  const logout = () => {
    setUser({
      name: '',
      email: '',
      mode: 'Girl Mode',
      isLoggedIn: false
    });
    localStorage.removeItem('sakhi_user');
  };

  const setMode = (mode) => {
    setUser((prev) => ({
      ...prev,
      mode: mode
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, setMode }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
