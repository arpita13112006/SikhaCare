import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const DEFAULT_ACCOUNTS = [
  {
    email: 'ananya@sakhicare.org',
    name: 'Ananya',
    mode: 'Girl Mode',
    password: 'password123'
  },
  {
    email: 'ananya@sakhi.org',
    name: 'Ananya',
    mode: 'Girl Mode',
    password: 'password123'
  },
  {
    email: 'priya@sakhicare.org',
    name: 'Priya',
    mode: 'Woman Mode',
    password: 'password123'
  },
  {
    email: 'priya@sakhi.org',
    name: 'Priya',
    mode: 'Woman Mode',
    password: 'password123'
  }
];

const DEFAULT_USER = {
  name: 'Ananya',
  email: 'ananya@sakhicare.org',
  mode: 'Girl Mode',
  isLoggedIn: true
};

export function UserProvider({ children }) {
  // Store all registered accounts to enforce strict permanent mode binding
  const [accounts, setAccounts] = useState(() => {
    try {
      const savedAccounts = localStorage.getItem('sakhi_accounts');
      return savedAccounts ? JSON.parse(savedAccounts) : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  });

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
      localStorage.setItem('sakhi_accounts', JSON.stringify(accounts));
    } catch (err) {
      console.error('Failed to save accounts to localStorage:', err);
    }
  }, [accounts]);

  useEffect(() => {
    try {
      localStorage.setItem('sakhi_user', JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save user to localStorage:', err);
    }
  }, [user]);

  const normalizeMode = (mode) => {
    if (!mode) return 'Girl Mode';
    if (mode.toLowerCase().includes('girl')) return 'Girl Mode';
    return 'Woman Mode';
  };

  /**
   * Login with strict Mode Verification:
   * A Girl Mode account is NOT allowed to log in under Woman Mode.
   * A Woman Mode account is NOT allowed to log in under Girl Mode.
   */
  const login = ({ email, password, mode }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const selectedMode = normalizeMode(mode);

    // Look for existing account
    const existingAccount = accounts.find(
      (acc) => acc.email.trim().toLowerCase() === cleanEmail
    );

    if (existingAccount) {
      if (existingAccount.mode !== selectedMode) {
        return {
          success: false,
          error: `Access Denied: This account is permanently registered as "${existingAccount.mode}". You are not allowed to log in under "${selectedMode}".`
        };
      }

      const loggedInUser = {
        name: existingAccount.name || cleanEmail.split('@')[0],
        email: existingAccount.email,
        mode: existingAccount.mode,
        isLoggedIn: true
      };
      setUser(loggedInUser);
      return { success: true, mode: existingAccount.mode, user: loggedInUser };
    }

    // If new user email, register and lock account to this selected mode
    const newAccount = {
      email: cleanEmail,
      name: cleanEmail.split('@')[0],
      mode: selectedMode,
      password: password || 'password123'
    };

    setAccounts((prev) => [...prev, newAccount]);

    const newUser = {
      name: newAccount.name,
      email: newAccount.email,
      mode: newAccount.mode,
      isLoggedIn: true
    };
    setUser(newUser);

    return { success: true, mode: selectedMode, user: newUser };
  };

  /**
   * Registration locks the account permanently to the chosen mode.
   */
  const register = ({ name, email, mode, password }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const selectedMode = normalizeMode(mode);

    const existingAccount = accounts.find(
      (acc) => acc.email.trim().toLowerCase() === cleanEmail
    );

    if (existingAccount) {
      return {
        success: false,
        error: `An account with this email is already registered under "${existingAccount.mode}". Please log in with "${existingAccount.mode}".`
      };
    }

    const newAccount = {
      name: name || 'Friend',
      email: cleanEmail,
      mode: selectedMode,
      password: password || 'password123'
    };

    setAccounts((prev) => [...prev, newAccount]);

    const newUser = {
      name: newAccount.name,
      email: newAccount.email,
      mode: newAccount.mode,
      isLoggedIn: true
    };
    setUser(newUser);

    return { success: true, mode: selectedMode, user: newUser };
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

  return (
    <UserContext.Provider value={{ user, login, register, logout, accounts }}>
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
