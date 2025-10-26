import { ScrollView, Text, View } from "react-native";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Card } from "../../../../components/common/Card";
import { useRoleGuard } from "../../../../lib/hooks/useRoleGuard";

/**
 * Attorney clients list
 * Shows all clients managed by the attorney
 */
export default function AttorneyClients() {
  useRoleGuard({ allowedRoles: ["attorney"] });

  // Mock data - replace with real data from API
  const clients = [
    {
      id: 1,
      name: "John Client",
      email: "client@example.com",
      activeCases: 3,
      status: "Active",
      joinedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      activeCases: 1,
      status: "Active",
      joinedDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      activeCases: 0,
      status: "Inactive",
      joinedDate: "2023-11-10",
    },
  ];

  return (
    <View className="flex-1">
      <DashboardHeader title="Clients" />
      
      <ScrollView className="flex-1 px-6 py-4">

        {clients.map((client) => (
          <Card key={client.id} className="mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">
                  {client.name}
                </Text>
                <Text className="text-sm text-gray-600 mb-1">
                  {client.email}
                </Text>
              </View>
              <View
                className={`px-3 py-1 rounded-full ${
                  client.status === "Active" ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    client.status === "Active" ? "text-green-700" : "text-gray-700"
                  }`}
                >
                  {client.status}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
              <Text className="text-sm text-gray-600">
                Active Cases: <Text className="font-medium">{client.activeCases}</Text>
              </Text>
              <Text className="text-xs text-gray-500">
                Joined: {new Date(client.joinedDate).toLocaleDateString()}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

