import { ScrollView, Text, View } from "react-native";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Button } from "../../../../components/common/Button";
import { Card } from "../../../../components/common/Card";
import { Input } from "../../../../components/common/Input";
import { useAuth } from "../../../../lib/contexts/AuthContext";
import { useRoleGuard } from "../../../../lib/hooks/useRoleGuard";

/**
 * Attorney profile page
 * Allows attorneys to view and edit their professional profile
 */
export default function AttorneyProfile() {
  useRoleGuard({ allowedRoles: ["attorney"] });
  const { user } = useAuth();

  if (!user) return null;

  return (
    <View className="flex-1">
      <DashboardHeader title="Profile" />
      
      <ScrollView className="flex-1 px-6 py-4">

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Professional Information
          </Text>
          
          <Input
            label="Full Name"
            value={user.fullName || ""}
            placeholder="Your full name"
          />
          
          <Input
            label="Email"
            value={user.email}
            placeholder="your@email.com"
            editable={false}
            className="bg-gray-50"
          />
          
          <Input
            label="Bar Number"
            placeholder="License number"
          />
          
          <Input
            label="Practice Areas"
            placeholder="e.g., Corporate Law, Real Estate"
          />
          
          <Button title="Save Changes" theme="primary" />
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Account Details
          </Text>
          <View className="py-2 border-b border-gray-200">
            <Text className="text-sm text-gray-600">Account Type</Text>
            <Text className="text-base font-medium text-gray-900">Attorney</Text>
          </View>
          <View className="py-2">
            <Text className="text-sm text-gray-600">Member Since</Text>
            <Text className="text-base font-medium text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

