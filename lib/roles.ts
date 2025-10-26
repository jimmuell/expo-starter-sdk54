/**
 * Role-based access control utilities
 */

import { getDashboardRoute } from "../constants/routes";
import { UserRole } from "../types/user";

/**
 * Available user roles in the system
 */
export const ROLES: Record<string, UserRole> = {
  CLIENT: "client",
  ATTORNEY: "attorney",
  ADMIN: "admin",
} as const;

/**
 * Role hierarchy for permission checking
 * Higher number = more permissions
 */
const ROLE_HIERARCHY: Record<UserRole, number> = {
  client: 1,
  attorney: 2,
  admin: 3,
};

/**
 * Get the default dashboard route for a given role
 */
export function getRoleRoute(role: UserRole): string {
  return getDashboardRoute(role);
}

/**
 * Check if a user role has permission to access a required role
 * 
 * @param userRole - The user's current role
 * @param requiredRole - The role required to access a resource
 * @returns true if user has permission
 * 
 * @example
 * canAccessRoute('admin', 'client') // true - admin can access client routes
 * canAccessRoute('client', 'admin') // false - client cannot access admin routes
 */
export function canAccessRoute(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if user has any of the specified roles
 */
export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Get a human-readable label for a role
 */
export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    client: "Client",
    attorney: "Attorney",
    admin: "Administrator",
  };
  return labels[role];
}

/**
 * Get role-specific color (for UI badges, etc.)
 */
export function getRoleColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    client: "#3b82f6",    // Blue
    attorney: "#8b5cf6",  // Purple
    admin: "#ef4444",     // Red
  };
  return colors[role];
}

