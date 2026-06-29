import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('collectai_token');
    const savedBusiness = localStorage.getItem('collectai_business');
    if (token && savedBusiness) {
      try {
        setBusiness(JSON.parse(savedBusiness));
        setUser({ token });
      } catch (e) {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('collectai_token', data.token);
    localStorage.setItem('collectai_business', JSON.stringify(data.business));
    setUser({ token: data.token });
    setBusiness(data.business);
    return data;
  };

  const signup = async (formData) => {
    const { data } = await api.post('/auth/signup', formData);
    localStorage.setItem('collectai_token', data.token);
    localStorage.setItem('collectai_business', JSON.stringify(data.business));
    setUser({ token: data.token });
    setBusiness(data.business);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('collectai_token');
    localStorage.removeItem('collectai_business');
    setUser(null);
    setBusiness(null);
  };

  const refreshBusiness = async () => {
    try {
      const { data } = await api.get('/api/business');
      localStorage.setItem('collectai_business', JSON.stringify(data));
      setBusiness(data);
    } catch (e) { /* ignore */ }
  };

  return (
    <AuthContext.Provider value={{ user, business, loading, login, signup, logout, refreshBusiness }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
