import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { ProfileCard } from "../../../../components/ProfileCard";
import { Card } from "../../../../components/common/Card";
import { useRoleGuard } from "../../../../lib/hooks/useRoleGuard";

/**
 * Client dashboard home
 * Main overview for client users
 */
export default function ClientDashboard() {
  useRoleGuard({ allowedRoles: ["client"] });

  return (
    <View className="flex-1">
      <DashboardHeader />
      
      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Your Dashboard
        </Text>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Active Cases
          </Text>
          <Text className="text-3xl font-bold text-blue-600 mb-2">
            3
          </Text>
          <Link href="/(protected)/dashboard/client/cases" asChild>
            <Pressable>
              <Text className="text-blue-600 font-medium">View all cases →</Text>
            </Pressable>
          </Link>
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Upcoming Appointments
          </Text>
          <Text className="text-gray-600 mb-2">
            No upcoming appointments
          </Text>
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Quick Actions
          </Text>
          <View className="gap-2 mt-2">
            <Link href="/(protected)/dashboard/client/cases" asChild>
              <Pressable className="bg-blue-50 p-3 rounded-md">
                <Text className="text-blue-700 font-medium">View Cases</Text>
              </Pressable>
            </Link>
            <Link href="/(protected)/dashboard/client/profile" asChild>
              <Pressable className="bg-gray-50 p-3 rounded-md">
                <Text className="text-gray-700 font-medium">Edit Profile</Text>
              </Pressable>
            </Link>
            <Link href="/(protected)/settings" asChild>
              <Pressable className="bg-gray-50 p-3 rounded-md">
                <Text className="text-gray-700 font-medium">Settings</Text>
              </Pressable>
            </Link>
          </View>
        </Card>

        <ProfileCard />
      </ScrollView>
    </View>
  );
}

