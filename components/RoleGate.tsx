import { ReactNode } from "react";
import { useAuth } from "../lib/hooks/useAuth";
import { hasRole } from "../lib/roles";
import { UserRole } from "../types/user";

type RoleGateProps = {
  /**
   * Roles allowed to see the children
   */
  allowedRoles: UserRole[];
  
  /**
   * Content to show if user has required role
   */
  children: ReactNode;
  
  /**
   * Optional fallback to show if user doesn't have permission
   * If not provided, nothing is rendered
   */
  fallback?: ReactNode;
};

/**
 * Conditional rendering component based on user role
 * Wraps children and only shows them if user has one of the allowed roles
 * 
 * @example
 * <RoleGate allowedRoles={['admin']}>
 *   <AdminOnlyButton />
 * </RoleGate>
 * 
 * @example
 * <RoleGate allowedRoles={['attorney', 'admin']} fallback={<Text>Access Denied</Text>}>
 *   <SensitiveData />
 * </RoleGate>
 */
export function RoleGate({ allowedRoles, children, fallback = null }: RoleGateProps) {
  const { user, isAuthenticated } = useAuth();

  // Not authenticated
  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  // Check if user has required role
  if (!hasRole(user.role, allowedRoles)) {
    return <>{fallback}</>;
  }

  // User has permission - render children
  return <>{children}</>;
}

