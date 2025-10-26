import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "../components/common/Button";

/**
 * 404 Not Found screen
 * Shown when user navigates to a route that doesn't exist
 */
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-6xl mb-4">404</Text>
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Link href="/" asChild>
          <Button title="Go to Home" theme="primary" />
        </Link>
      </View>
    </>
  );
}

