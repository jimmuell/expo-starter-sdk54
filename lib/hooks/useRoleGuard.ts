/**
 * Role-based access control hook
 * 
 * Protects routes by checking user role and redirecting if unauthorized
 */

import { router } from "expo-router";
import { useEffect } from "react";
import { UserRole } from "../../types/user";
import { canAccessRoute, hasRole } from "../roles";
import { useAuth } from "./useAuth";

interface UseRoleGuardOptions {
  /**
   * Required role(s) to access this route
   * If array, user must have at least one of the roles
   */
  allowedRoles?: UserRole[];
  
  /**
   * Minimum role required (uses role hierarchy)
   */
  minimumRole?: UserRole;
  
  /**
   * Where to redirect if unauthorized
   * Defaults to login screen
   */
  redirectTo?: string;
  
  /**
   * If true, only redirects when loading is complete
   * Set to false to redirect immediately
   */
  waitForAuth?: boolean;
}

/**
 * Hook to guard routes based on user role
 * 
 * @example
 * // Only allow admins
 * useRoleGuard({ allowedRoles: ['admin'] });
 * 
 * @example
 * // Allow attorney or admin
 * useRoleGuard({ allowedRoles: ['attorney', 'admin'] });
 * 
 * @example
 * // Allow attorney and above (attorney, admin)
 * useRoleGuard({ minimumRole: 'attorney' });
 */
export function useRoleGuard(options: UseRoleGuardOptions = {}) {
  const {
    allowedRoles,
    minimumRole,
    redirectTo = "/(auth)/login",
    waitForAuth = true,
  } = options;

  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Wait for auth to initialize if requested
    if (waitForAuth && isLoading) {
      return;
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated || !user) {
      router.replace(redirectTo);
      return;
    }

    // Check allowed roles
    if (allowedRoles && !hasRole(user.role, allowedRoles)) {
      console.warn(`Access denied: User role '${user.role}' not in allowed roles`);
      router.replace(redirectTo);
      return;
    }

    // Check minimum role
    if (minimumRole && !canAccessRoute(user.role, minimumRole)) {
      console.warn(`Access denied: User role '${user.role}' below minimum '${minimumRole}'`);
      router.replace(redirectTo);
      return;
    }
  }, [user, isLoading, isAuthenticated, allowedRoles, minimumRole, redirectTo, waitForAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
    hasAccess: isAuthenticated && !!user,
  };
}

