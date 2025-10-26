import { Stack } from "expo-router";

/**
 * Dashboard layout - Stack navigation for role-specific dashboards
 */
export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f9fafb" },
      }}
    >
      <Stack.Screen name="client" />
      <Stack.Screen name="attorney" />
      <Stack.Screen name="admin" />
    </Stack>
  );
}

