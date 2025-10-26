import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../lib/hooks/useAuth";

/**
 * Protected routes layout
 * Ensures user is authenticated before accessing any protected content
 */
export default function ProtectedLayout() {
  const { isAuthenticated, isLoading, initialize } = useAuth();

  useEffect(() => {
    // Initialize auth on mount
    initialize();
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading]);

  // Show nothing while checking auth
  if (isLoading) {
    return null;
  }

  // Not authenticated - will redirect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9fafb" },
      }}
    >
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="settings" options={{ headerShown: true, title: "Settings" }} />
      <Stack.Screen name="notifications" options={{ headerShown: true, title: "Notifications" }} />
    </Stack>
  );
}

