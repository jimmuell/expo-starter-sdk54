import { ScrollView, Text, View } from "react-native";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { Card } from "../../../../components/common/Card";
import { useRoleGuard } from "../../../../lib/hooks/useRoleGuard";

/**
 * Client cases list
 * Shows all cases for the current client
 */
export default function ClientCases() {
  useRoleGuard({ allowedRoles: ["client"] });

  // Mock data - replace with real data from API
  const cases = [
    {
      id: 1,
      title: "Contract Dispute",
      status: "In Progress",
      attorney: "Jane Attorney",
      lastUpdate: "2 days ago",
    },
    {
      id: 2,
      title: "Property Settlement",
      status: "Pending Review",
      attorney: "Jane Attorney",
      lastUpdate: "1 week ago",
    },
    {
      id: 3,
      title: "Business Formation",
      status: "Completed",
      attorney: "Jane Attorney",
      lastUpdate: "2 weeks ago",
    },
  ];

  return (
    <View className="flex-1">
      <DashboardHeader title="My Cases" />
      
      <ScrollView className="flex-1 px-6 py-4">

        {cases.map((caseItem) => (
          <Card key={caseItem.id} className="mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-semibold text-gray-900 flex-1">
                {caseItem.title}
              </Text>
              <View
                className={`px-3 py-1 rounded-full ${
                  caseItem.status === "Completed"
                    ? "bg-green-100"
                    : caseItem.status === "In Progress"
                    ? "bg-blue-100"
                    : "bg-yellow-100"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    caseItem.status === "Completed"
                      ? "text-green-700"
                      : caseItem.status === "In Progress"
                      ? "text-blue-700"
                      : "text-yellow-700"
                  }`}
                >
                  {caseItem.status}
                </Text>
              </View>
            </View>
            <Text className="text-sm text-gray-600 mb-1">
              Attorney: {caseItem.attorney}
            </Text>
            <Text className="text-xs text-gray-500">
              Last update: {caseItem.lastUpdate}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

