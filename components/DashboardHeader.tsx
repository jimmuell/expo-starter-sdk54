import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../lib/contexts/AuthContext";
import { UserRole } from "../types/user";
import { cn } from "../utils/cn";

type DashboardHeaderProps = {
  title?: string;
  className?: string;
};

/**
 * Get dashboard title based on user role
 */
function getDashboardTitle(role: UserRole | undefined): string {
  switch (role) {
    case "client":
      return "Client Dashboard";
    case "attorney":
      return "Attorney Dashboard";
    case "admin":
      return "Administrator Dashboard";
    default:
      return "Dashboard";
  }
}

/**
 * Dashboard header component
 * Automatically displays role-specific title or accepts custom title
 */
export function DashboardHeader({
  title,
  className,
}: DashboardHeaderProps) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  
  // Use custom title if provided, otherwise use role-based title
  const displayTitle = title || getDashboardTitle(user?.role);

  return (
    <View
      className={cn("bg-white border-b border-gray-200", className)}
      style={{ paddingTop: insets.top }}
    >
      <View className="px-6 py-4 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-900">
          {displayTitle}
        </Text>
      </View>
    </View>
  );
}

