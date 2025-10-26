import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getDashboardRoute } from "../constants/routes";
import { useAuth } from "../lib/contexts/AuthContext";

/**
 * Landing page / entry point
 * Redirects users based on authentication state:
 * - Not authenticated -> Login screen
 * - Authenticated -> Role-specific dashboard
 */
export default function Index() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Only navigate once when loading is complete
    if (!isLoading && !hasNavigated.current) {
      hasNavigated.current = true;
      
      if (!isAuthenticated || !user) {
        router.replace("/(auth)/login");
      } else {
        const dashboardRoute = getDashboardRoute(user.role);
        router.replace(dashboardRoute as any);
      }
    }
  }, [isLoading, isAuthenticated, user]);

  // Show loading state
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="text-gray-600 mt-4">Loading...</Text>
    </View>
  );
}
