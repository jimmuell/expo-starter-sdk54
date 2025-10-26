import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getDashboardRoute } from "../constants/routes";
import { useAuth } from "../lib/hooks/useAuth";

/**
 * Landing page / entry point
 * Redirects users based on authentication state:
 * - Not authenticated -> Login screen
 * - Authenticated -> Role-specific dashboard
 */
export default function Index() {
  const { isAuthenticated, isLoading, user, initialize } = useAuth();

  useEffect(() => {
    // Ensure auth is initialized
    initialize();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4">Loading...</Text>
      </View>
    );
  }

  // Redirect to appropriate screen based on auth state
  if (!isAuthenticated || !user) {
    return <Redirect href="/(auth)/login" />;
  }

  // Redirect to role-specific dashboard
  const dashboardRoute = getDashboardRoute(user.role);
  return <Redirect href={dashboardRoute as any} />;
}
