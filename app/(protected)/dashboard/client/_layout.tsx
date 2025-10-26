import { Stack } from "expo-router";

/**
 * Client role layout
 */
export default function ClientLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9fafb" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="cases" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}

