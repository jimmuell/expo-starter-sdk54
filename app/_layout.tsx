import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../lib/contexts/AuthContext";

/**
 * Root layout for the entire application
 * Wraps app with AuthProvider for authentication state
 */
export default function RootLayout() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
