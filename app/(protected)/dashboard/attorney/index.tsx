import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { ProfileCard } from "../../../../components/ProfileCard";
import { Card } from "../../../../components/common/Card";
import { useRoleGuard } from "../../../../lib/hooks/useRoleGuard";

/**
 * Attorney dashboard home
 * Main overview for attorney users
 */
export default function AttorneyDashboard() {
  useRoleGuard({ allowedRoles: ["attorney"] });

  return (
    <View className="flex-1">
      <DashboardHeader />
      
      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Welcome, Attorney
        </Text>

        <View className="flex-row gap-4 mb-4">
          <Card className="flex-1">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Active Clients
            </Text>
            <Text className="text-3xl font-bold text-purple-600">
              12
            </Text>
          </Card>

          <Card className="flex-1">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Open Cases
            </Text>
            <Text className="text-3xl font-bold text-blue-600">
              18
            </Text>
          </Card>
        </View>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Today's Schedule
          </Text>
          <Text className="text-gray-600 mb-2">
            3 client meetings scheduled
          </Text>
          <Text className="text-sm text-gray-500">
            • 9:00 AM - Client consultation{"\n"}
            • 2:00 PM - Court hearing{"\n"}
            • 4:00 PM - Case review meeting
          </Text>
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Quick Actions
          </Text>
          <View className="gap-2 mt-2">
            <Link href="/(protected)/dashboard/attorney/clients" asChild>
              <Pressable className="bg-purple-50 p-3 rounded-md">
                <Text className="text-purple-700 font-medium">Manage Clients</Text>
              </Pressable>
            </Link>
            <Link href="/(protected)/dashboard/attorney/profile" asChild>
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

