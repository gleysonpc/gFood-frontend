import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: AuthUser | null;
  loading: boolean;
  signIn(email: string): Promise<void>;
  signOut(): void;
}

interface AuthUser {
  id: number;
  name: string;
  email: string;
  store: UserStore;
}

interface UserStore {
  id: number;
  description: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    function loadStorageData() {
      const loggedUser = localStorage.getItem('@User');
      if (loggedUser) {
        setUser(JSON.parse(loggedUser));
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  async function signIn(email: string) {
    try {
      const res = await api.post('/auth/signin', { email: email });
      localStorage.setItem('@User', JSON.stringify(res.data));
      setLoading(false);
      setUser(res.data);
    } catch (error) {
      toast.error('Oops wrong email :(');
    }
  }

  function signOut() {
    localStorage.removeItem('@User');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
