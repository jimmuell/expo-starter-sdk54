/**
 * User role types for role-based access control
 */
export type UserRole = "client" | "attorney" | "admin";

/**
 * User data structure from Supabase auth
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  avatar?: string;
  createdAt: string;
}

/**
 * Authentication state interface
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}

