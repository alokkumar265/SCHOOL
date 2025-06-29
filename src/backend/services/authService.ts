
import { User } from '@/types';
import api from './api';

/**
 * Authentication service for handling user login/logout
 */
export const authService = {
  /**
   * Login user with credentials
   */
  login: async (email: string, password: string): Promise<User> => {
    // This is a mock implementation
    // In a real application, this would use the api service to make a request
    
    // Mock logic for demonstration
    if (email === 'admin@school.edu' && password === 'admin') {
      const user: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@school.edu',
        role: 'admin',
        active: true,
      };
      return Promise.resolve(user);
    } else if (email === 'teacher@school.edu' && password === 'teacher') {
      const user: User = {
        id: '2',
        name: 'Teacher User',
        email: 'teacher@school.edu',
        role: 'teacher',
        department: 'Mathematics',
        active: true,
      };
      return Promise.resolve(user);
    } else if (email === 'student@school.edu' && password === 'student') {
      const user: User = {
        id: '3',
        name: 'Student User',
        email: 'student@school.edu',
        role: 'student',
        active: true,
      };
      return Promise.resolve(user);
    }
    
    return Promise.reject(new Error('Invalid credentials'));
  },
  
  /**
   * Get current user from storage
   */
  getCurrentUser: (): User | null => {
    const storedUser = localStorage.getItem('schoolUser');
    return storedUser ? JSON.parse(storedUser) : null;
  },
  
  /**
   * Save user to storage
   */
  saveUser: (user: User): void => {
    localStorage.setItem('schoolUser', JSON.stringify(user));
  },
  
  /**
   * Clear user from storage
   */
  clearUser: (): void => {
    localStorage.removeItem('schoolUser');
  }
};

export default authService;
