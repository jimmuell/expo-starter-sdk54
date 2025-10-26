/**
 * React Context for authentication state management
 * Replaces Zustand to avoid module reload issues
 */

import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getDashboardRoute } from "../../constants/routes";
import { LoginCredentials, RegisterData, User } from "../../types/user";
import { isSupabaseConfigured, supabase } from "../api";
import * as authService from "../auth";

interface AuthContextType {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Module-level flag to prevent initialization across component remounts
 * This persists even if AuthProvider remounts
 */
let globalHasInitialized = false;
let globalAuthListener: { unsubscribe: () => void } | null = null;

/**
 * Auth Provider Component
 * Wrap your app with this to provide auth state
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Initialize auth state on mount
  useEffect(() => {
    if (globalHasInitialized) {
      setIsLoading(false);
      return;
    }
    globalHasInitialized = true;

    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize');
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize auth first
    initializeAuth();

    // Set up Supabase auth listener ONLY if configured with real credentials
    // AND only if not already set up globally
    if (isSupabaseConfigured() && !globalAuthListener) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          // Ignore INITIAL_SESSION events - they're just checking for existing sessions
          if (event === 'INITIAL_SESSION') {
            return;
          }

          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session?.user) {
              const currentUser = await authService.getCurrentUser();
              if (currentUser) {
                setUser(currentUser);
              }
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );

      // Store globally to prevent duplicate subscriptions
      globalAuthListener = subscription;

      // Cleanup subscription on unmount
      return () => {
        if (globalAuthListener) {
          globalAuthListener.unsubscribe();
          globalAuthListener = null;
        }
      };
    }
  }, []);

  /**
   * Sign in with email and password
   */
  const signIn = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const loggedInUser = await authService.login(credentials);
      setUser(loggedInUser);
      setIsLoading(false);

      // Navigate to role-specific dashboard
      router.replace(getDashboardRoute(loggedInUser.role));
    } catch (err) {
      console.error('Sign in error:', err);
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
  };

  /**
   * Sign up new user
   */
  const signUp = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await authService.register(data);
      setUser(newUser);
      setIsLoading(false);

      // Navigate to role-specific dashboard
      router.replace(getDashboardRoute(newUser.role));
    } catch (err) {
      console.error('Sign up error:', err);
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    }
  };

  /**
   * Sign out current user
   */
  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
      setUser(null);
      setIsLoading(false);

      // Reset global initialization flag to allow re-initialization after logout
      globalHasInitialized = false;

      // Navigate to login
      router.replace("/(auth)/login");
    } catch (err) {
      console.error('Sign out error:', err);
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 * Use this in components instead of the old useAuth
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

