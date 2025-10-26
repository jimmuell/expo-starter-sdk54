import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import { initializeAuthListener, useAuth } from "../lib/hooks/useAuth";

/**
 * Root layout for the entire application
 * Initializes authentication and provides navigation structure
 */
export default function RootLayout() {
  const { initialize } = useAuth();

  useEffect(() => {
    // Initialize Supabase auth state listener
    initializeAuthListener();
    
    // Initialize auth state from storage on app launch
    initialize();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(protected)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
