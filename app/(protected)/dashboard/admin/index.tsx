import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { ProfileCard } from "../../../../components/ProfileCard";
import { Card } from "../../../../components/common/Card";
import { useRoleGuard } from "../../../../lib/hooks/useRoleGuard";

/**
 * Admin dashboard home
 * Main overview for admin users with system statistics
 */
export default function AdminDashboard() {
  useRoleGuard({ allowedRoles: ["admin"] });

  return (
    <View className="flex-1">
      <DashboardHeader />
      
      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          System Overview
        </Text>

        <View className="flex-row gap-4 mb-4">
          <Card className="flex-1">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Total Users
            </Text>
            <Text className="text-3xl font-bold text-red-600">
              156
            </Text>
          </Card>

          <Card className="flex-1">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Active Cases
            </Text>
            <Text className="text-3xl font-bold text-blue-600">
              89
            </Text>
          </Card>
        </View>

        <View className="flex-row gap-4 mb-4">
          <Card className="flex-1">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Attorneys
            </Text>
            <Text className="text-3xl font-bold text-purple-600">
              23
            </Text>
          </Card>

          <Card className="flex-1">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Clients
            </Text>
            <Text className="text-3xl font-bold text-green-600">
              133
            </Text>
          </Card>
        </View>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Recent Activity
          </Text>
          <View className="gap-2">
            <View className="py-2 border-b border-gray-200">
              <Text className="text-sm text-gray-900">New user registration</Text>
              <Text className="text-xs text-gray-500">2 minutes ago</Text>
            </View>
            <View className="py-2 border-b border-gray-200">
              <Text className="text-sm text-gray-900">Case created by attorney</Text>
              <Text className="text-xs text-gray-500">15 minutes ago</Text>
            </View>
            <View className="py-2">
              <Text className="text-sm text-gray-900">System backup completed</Text>
              <Text className="text-xs text-gray-500">1 hour ago</Text>
            </View>
          </View>
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Quick Actions
          </Text>
          <View className="gap-2 mt-2">
            <Link href="/(protected)/dashboard/admin/users" asChild>
              <Pressable className="bg-red-50 p-3 rounded-md">
                <Text className="text-red-700 font-medium">Manage Users</Text>
              </Pressable>
            </Link>
            <Link href="/(protected)/dashboard/admin/settings" asChild>
              <Pressable className="bg-gray-50 p-3 rounded-md">
                <Text className="text-gray-700 font-medium">System Settings</Text>
              </Pressable>
            </Link>
            <Link href="/(protected)/settings" asChild>
              <Pressable className="bg-gray-50 p-3 rounded-md">
                <Text className="text-gray-700 font-medium">My Settings</Text>
              </Pressable>
            </Link>
          </View>
        </Card>

        <ProfileCard />
      </ScrollView>
    </View>
  );
}

