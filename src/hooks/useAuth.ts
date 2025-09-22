import { useState, useCallback } from 'react';
import { User, LoginData, RegisterData } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  });

  const login = useCallback(async (data: LoginData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // TODO: Replace with actual authentication API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - will be replaced with NextAuth.js
      if (data.email === 'demo@example.com' && data.password === 'password') {
        const mockUser: User = {
          id: '1',
          email: data.email,
          name: 'Demo User',
          avatar: undefined,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setState({
          user: mockUser,
          isLoading: false,
          error: null,
          isAuthenticated: true,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // TODO: Replace with actual registration API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - will be replaced with actual API
      const mockUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        avatar: undefined,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setState({
        user: mockUser,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
    clearError,
  };
}