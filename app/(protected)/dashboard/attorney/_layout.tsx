import { Stack } from "expo-router";

/**
 * Attorney role layout
 */
export default function AttorneyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9fafb" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="clients" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}

