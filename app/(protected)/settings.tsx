import { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { useAuth } from "../../lib/contexts/AuthContext";

/**
 * Shared settings screen
 * Available to all authenticated users regardless of role
 */
export default function Settings() {
  const { user } = useAuth();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <ScrollView className="flex-1 bg-gray-50 px-6 py-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Settings
      </Text>

      <Card className="mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Notifications
        </Text>
        
        <View className="py-3 border-b border-gray-200 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-base font-medium text-gray-900">
              Push Notifications
            </Text>
            <Text className="text-sm text-gray-600">
              Receive push notifications
            </Text>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
        </View>

        <View className="py-3 flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-base font-medium text-gray-900">
              Email Updates
            </Text>
            <Text className="text-sm text-gray-600">
              Receive email updates
            </Text>
          </View>
          <Switch
            value={emailUpdates}
            onValueChange={setEmailUpdates}
          />
        </View>
      </Card>

      <Card className="mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Account Information
        </Text>
        <View className="py-2 border-b border-gray-200">
          <Text className="text-sm text-gray-600">Email</Text>
          <Text className="text-base font-medium text-gray-900">{user?.email}</Text>
        </View>
        <View className="py-2">
          <Text className="text-sm text-gray-600">Account Type</Text>
          <Text className="text-base font-medium text-gray-900 capitalize">
            {user?.role}
          </Text>
        </View>
      </Card>

      <Button title="Save Preferences" theme="primary" />
    </ScrollView>
  );
}

