import { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Button } from "../../../../components/common/Button";
import { Card } from "../../../../components/common/Card";
import { useRoleGuard } from "../../../../lib/hooks/useRoleGuard";

/**
 * Admin system settings
 * Allows admins to configure global system settings
 */
export default function AdminSettings() {
  useRoleGuard({ allowedRoles: ["admin"] });

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <View className="flex-1">
      <DashboardHeader title="System Settings" />
      
      <ScrollView className="flex-1 px-6 py-4">

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            General Settings
          </Text>
          
          <View className="py-3 border-b border-gray-200 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Email Notifications
              </Text>
              <Text className="text-sm text-gray-600">
                Send system emails to users
              </Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
            />
          </View>

          <View className="py-3 border-b border-gray-200 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Automatic Backups
              </Text>
              <Text className="text-sm text-gray-600">
                Daily database backups
              </Text>
            </View>
            <Switch
              value={autoBackup}
              onValueChange={setAutoBackup}
            />
          </View>

          <View className="py-3 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Maintenance Mode
              </Text>
              <Text className="text-sm text-gray-600">
                Disable access for non-admins
              </Text>
            </View>
            <Switch
              value={maintenanceMode}
              onValueChange={setMaintenanceMode}
            />
          </View>
        </Card>

        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            System Information
          </Text>
          <View className="py-2 border-b border-gray-200">
            <Text className="text-sm text-gray-600">Version</Text>
            <Text className="text-base font-medium text-gray-900">1.0.0</Text>
          </View>
          <View className="py-2 border-b border-gray-200">
            <Text className="text-sm text-gray-600">Environment</Text>
            <Text className="text-base font-medium text-gray-900">Development</Text>
          </View>
          <View className="py-2">
            <Text className="text-sm text-gray-600">Last Backup</Text>
            <Text className="text-base font-medium text-gray-900">
              {new Date().toLocaleString()}
            </Text>
          </View>
        </Card>

        <Button title="Save Settings" theme="primary" />
      </ScrollView>
    </View>
  );
}

