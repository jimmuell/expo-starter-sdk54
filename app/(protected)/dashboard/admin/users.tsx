import { ScrollView, Text, View } from "react-native";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Card } from "../../../../components/common/Card";
import { useRoleGuard } from "../../../../lib/hooks/useRoleGuard";

/**
 * Admin user management
 * Allows admins to view and manage all system users
 */
export default function AdminUsers() {
  useRoleGuard({ allowedRoles: ["admin"] });

  // Mock data - replace with real data from API
  const users = [
    {
      id: 1,
      name: "John Client",
      email: "client@example.com",
      role: "client",
      status: "Active",
      joinedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Attorney",
      email: "attorney@example.com",
      role: "attorney",
      status: "Active",
      joinedDate: "2023-12-01",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "Active",
      joinedDate: "2023-10-10",
    },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";
      case "attorney":
        return "bg-purple-100 text-purple-700";
      case "client":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <View className="flex-1">
      <DashboardHeader title="Users" />
      
      <ScrollView className="flex-1 px-6 py-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-900">
            All Users
          </Text>
          <Text className="text-sm text-gray-600">
            {users.length} total
          </Text>
        </View>

        {users.map((user) => (
          <Card key={user.id} className="mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">
                  {user.name}
                </Text>
                <Text className="text-sm text-gray-600 mb-2">
                  {user.email}
                </Text>
              </View>
            </View>
            <View className="flex-row gap-2 items-center">
              <View className={`px-3 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
                <Text className="text-xs font-medium">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Text>
              </View>
              <View
                className={`px-3 py-1 rounded-full ${
                  user.status === "Active" ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    user.status === "Active" ? "text-green-700" : "text-gray-700"
                  }`}
                >
                  {user.status}
                </Text>
              </View>
              <Text className="text-xs text-gray-500 ml-auto">
                Joined: {new Date(user.joinedDate).toLocaleDateString()}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

