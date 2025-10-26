import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useAuth } from "../../lib/hooks/useAuth";
import { UserRole } from "../../types/user";

/**
 * Registration screen
 * Allows new users to create an account with role selection
 */
export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("client");
  const { signUp, isLoading } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await signUp({ email, password, fullName, role });
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error instanceof Error ? error.message : "Please try again"
      );
    }
  };

  return (
    <AuthForm
      title="Create Account"
      subtitle="Sign up to get started"
    >
      <View>
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={fullName}
          onChangeText={setFullName}
          autoComplete="name"
        />

        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password-new"
        />

        {/* Role selection */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            I am a:
          </Text>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setRole("client")}
              className={`flex-1 py-3 px-4 rounded-md border ${
                role === "client"
                  ? "bg-blue-50 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  role === "client" ? "text-blue-700" : "text-gray-700"
                }`}
              >
                Client
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setRole("attorney")}
              className={`flex-1 py-3 px-4 rounded-md border ${
                role === "attorney"
                  ? "bg-purple-50 border-purple-500"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  role === "attorney" ? "text-purple-700" : "text-gray-700"
                }`}
              >
                Attorney
              </Text>
            </Pressable>
          </View>
        </View>

        <Button
          title={isLoading ? "Creating account..." : "Sign Up"}
          onPress={handleRegister}
          disabled={isLoading}
          theme="primary"
        />

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text className="text-blue-600 font-medium">Sign in</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </AuthForm>
  );
}

