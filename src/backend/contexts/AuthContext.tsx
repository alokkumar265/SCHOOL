import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const defaultUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@school.edu',
  role: 'admin',
  active: true,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (using localStorage in this mock version)
    const storedUser = localStorage.getItem('schoolUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login for demonstration
      // In a real app, you would authenticate with a backend server
      if (email === 'admin@school.edu' && password === 'admin') {
        setUser(defaultUser);
        localStorage.setItem('schoolUser', JSON.stringify(defaultUser));
      } else if (email === 'teacher@school.edu' && password === 'teacher') {
        const teacherUser: User = {
          id: '2',
          name: 'Teacher User',
          email: 'teacher@school.edu',
          role: 'teacher',
          department: 'Mathematics',
          active: true,
        };
        setUser(teacherUser);
        localStorage.setItem('schoolUser', JSON.stringify(teacherUser));
      } else if (email === 'student@school.edu' && password === 'student') {
        const studentUser: User = {
          id: '3',
          name: 'Student User',
          email: 'student@school.edu',
          role: 'student',
          active: true,
        };
        setUser(studentUser);
        localStorage.setItem('schoolUser', JSON.stringify(studentUser));
      } else if (email === 'alumni@school.edu' && password === 'alumni') {
        const alumniUser: User = {
          id: '4',
          name: 'Alumni User',
          email: 'alumni@school.edu',
          role: 'alumni',
          active: true,
          joiningDate: '2015-06-15',
          phoneNumber: '+91 98765 43210',
          address: 'Mumbai, Maharashtra',
        };
        setUser(alumniUser);
        localStorage.setItem('schoolUser', JSON.stringify(alumniUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schoolUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
