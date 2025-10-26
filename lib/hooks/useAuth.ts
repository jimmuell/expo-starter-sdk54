/**
 * Zustand auth store for managing authentication state
 * 
 * This hook provides:
 * - User authentication state
 * - Login, logout, register actions
 * - Automatic initialization from secure storage
 */

import { router } from "expo-router";
import { create } from "zustand";
import { getDashboardRoute } from "../../constants/routes";
import { LoginCredentials, RegisterData, User } from "../../types/user";
import { isSupabaseConfigured, supabase } from "../api";
import * as authService from "../auth";

interface AuthStore {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

/**
 * Global auth store using Zustand
 */
export const useAuth = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  /**
   * Initialize auth state from storage
   * Call this on app launch
   */
  initialize: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await authService.getCurrentUser();
      
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch (error) {
      console.error("Initialize auth error:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to initialize",
      });
    }
  },

  /**
   * Sign in with email and password
   */
  signIn: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });
      const user = await authService.login(credentials);
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      // Navigate to role-specific dashboard
      router.replace(getDashboardRoute(user.role));
    } catch (error) {
      console.error("Sign in error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      });
      throw error;
    }
  },

  /**
   * Sign up new user
   */
  signUp: async (data: RegisterData) => {
    try {
      set({ isLoading: true, error: null });
      const user = await authService.register(data);
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      // Navigate to role-specific dashboard
      router.replace(getDashboardRoute(user.role));
    } catch (error) {
      console.error("Sign up error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Registration failed",
      });
      throw error;
    }
  },

  /**
   * Sign out current user
   */
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await authService.logout();
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      // Navigate to login
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Sign out error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Logout failed",
      });
    }
  },

  /**
   * Clear error message
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Set user directly (used by auth state listener)
   */
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },
}));

/**
 * Set up Supabase auth state listener
 * Call this once when the app starts
 */
let authListenerInitialized = false;

export function initializeAuthListener() {
  if (authListenerInitialized || !isSupabaseConfigured()) {
    return;
  }

  authListenerInitialized = true;

  // Listen for auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state change:', event);

    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      if (session?.user) {
        // Fetch user data and update store
        const user = await authService.getCurrentUser();
        if (user) {
          useAuth.getState().setUser(user);
        }
      }
    } else if (event === 'SIGNED_OUT') {
      // Clear user data
      useAuth.getState().setUser(null);
    }
  });
}

