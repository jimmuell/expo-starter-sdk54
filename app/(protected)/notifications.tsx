import { ScrollView, Text, View } from "react-native";
import { Card } from "../../components/common/Card";

/**
 * Shared notifications screen
 * Shows notifications for all authenticated users
 */
export default function Notifications() {
  // Mock data - replace with real notifications from API
  const notifications = [
    {
      id: 1,
      title: "New message",
      message: "You have a new message from your attorney",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Case update",
      message: "Your case status has been updated",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Appointment reminder",
      message: "You have an appointment tomorrow at 2:00 PM",
      time: "1 day ago",
      read: true,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 px-6 py-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Notifications
      </Text>

      {notifications.length === 0 ? (
        <Card>
          <Text className="text-center text-gray-600">
            No notifications
          </Text>
        </Card>
      ) : (
        notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`mb-3 ${!notification.read ? "border-l-4 border-l-blue-500" : ""}`}
          >
            <View className="flex-row justify-between items-start mb-1">
              <Text className={`text-base font-semibold ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                {notification.title}
              </Text>
              {!notification.read && (
                <View className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </View>
            <Text className="text-sm text-gray-600 mb-2">
              {notification.message}
            </Text>
            <Text className="text-xs text-gray-500">
              {notification.time}
            </Text>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

