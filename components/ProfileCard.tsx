import { Pressable, Text, View } from "react-native";
import { useAuth } from "../lib/hooks/useAuth";
import { getRoleColor, getRoleLabel } from "../lib/roles";
import { cn } from "../utils/cn";
import { Card } from "./common/Card";

type ProfileCardProps = {
  className?: string;
};

/**
 * Profile card component with user information and logout
 * Displays name, email, role, ID, and logout button
 */
export function ProfileCard({ className }: ProfileCardProps) {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <Card className={cn("mb-4", className)}>
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900 mb-1">
            {user.fullName || "User"}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            {user.email}
          </Text>
          <Text className="text-xs text-gray-500 mb-2 font-mono">
            ID: {user.id}
          </Text>
        </View>
        
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: getRoleColor(user.role) + "20" }}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: getRoleColor(user.role) }}
          >
            {getRoleLabel(user.role)}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={signOut}
        className="bg-red-50 px-4 py-3 rounded-md border border-red-200 active:bg-red-100"
      >
        <Text className="text-red-600 font-semibold text-center">
          Logout
        </Text>
      </Pressable>
    </Card>
  );
}

