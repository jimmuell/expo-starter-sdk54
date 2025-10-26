/**
 * Centralized route definitions for type-safe navigation
 */

export const ROUTES = {
  // Public routes
  LANDING: "/",
  
  // Auth routes
  AUTH: {
    LOGIN: "/(auth)/login",
    REGISTER: "/(auth)/register",
    FORGOT_PASSWORD: "/(auth)/forgot-password",
    VERIFY_EMAIL: "/(auth)/verify-email",
  },
  
  // Protected routes - Client
  CLIENT: {
    DASHBOARD: "/(protected)/dashboard/client",
    CASES: "/(protected)/dashboard/client/cases",
    PROFILE: "/(protected)/dashboard/client/profile",
  },
  
  // Protected routes - Attorney
  ATTORNEY: {
    DASHBOARD: "/(protected)/dashboard/attorney",
    CLIENTS: "/(protected)/dashboard/attorney/clients",
    PROFILE: "/(protected)/dashboard/attorney/profile",
  },
  
  // Protected routes - Admin
  ADMIN: {
    DASHBOARD: "/(protected)/dashboard/admin",
    USERS: "/(protected)/dashboard/admin/users",
    SETTINGS: "/(protected)/dashboard/admin/settings",
  },
  
  // Shared protected routes
  PROTECTED: {
    SETTINGS: "/(protected)/settings",
    NOTIFICATIONS: "/(protected)/notifications",
  },
} as const;

/**
 * Helper to get the default dashboard route for a given role
 */
export const getDashboardRoute = (role: "client" | "attorney" | "admin"): string => {
  switch (role) {
    case "client":
      return ROUTES.CLIENT.DASHBOARD;
    case "attorney":
      return ROUTES.ATTORNEY.DASHBOARD;
    case "admin":
      return ROUTES.ADMIN.DASHBOARD;
    default:
      return ROUTES.AUTH.LOGIN;
  }
};

