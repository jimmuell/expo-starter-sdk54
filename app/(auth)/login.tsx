import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useAuth } from "../../lib/hooks/useAuth";

/**
 * Login screen
 * Allows users to sign in with email and password
 */
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      await signIn({ email, password });
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error instanceof Error ? error.message : "Please try again"
      );
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your account"
    >
      <View>
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
          autoComplete="password"
        />

        <Link href="/(auth)/forgot-password" asChild>
          <Pressable className="mb-6">
            <Text className="text-blue-600 text-sm text-right">
              Forgot password?
            </Text>
          </Pressable>
        </Link>

        <Button
          title={isLoading ? "Signing in..." : "Sign In"}
          onPress={handleLogin}
          disabled={isLoading}
          theme="primary"
        />

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <Pressable>
              <Text className="text-blue-600 font-medium">Sign up</Text>
            </Pressable>
          </Link>
        </View>

        {/* Demo credentials hint */}
        <View className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-200">
          <Text className="text-xs text-blue-800 font-medium mb-2">
            Demo Credentials (tap to fill):
          </Text>
          
          <View className="gap-2">
            <View className="flex-row items-center">
              <Text className="text-xs text-blue-700 w-20">Client:</Text>
              <Pressable onPress={() => {
                setEmail("jimmuell@aol.com");
                setPassword("12345678");
              }}>
                <Text className="text-xs text-blue-600 font-medium underline">
                  jimmuell@aol.com
                </Text>
              </Pressable>
            </View>

            <View className="flex-row items-center">
              <Text className="text-xs text-blue-700 w-20">Attorney:</Text>
              <Pressable onPress={() => {
                setEmail("perry.mason@law.com");
                setPassword("12345678");
              }}>
                <Text className="text-xs text-blue-600 font-medium underline">
                  perry.mason@law.com
                </Text>
              </Pressable>
            </View>

            <View className="flex-row items-center">
              <Text className="text-xs text-blue-700 w-20">Admin:</Text>
              <Pressable onPress={() => {
                setEmail("admin@linktolawyers.com");
                setPassword("12345678");
              }}>
                <Text className="text-xs text-blue-600 font-medium underline">
                  admin@linktolawyers.com
                </Text>
              </Pressable>
            </View>

            <View className="flex-row items-center mt-1 pt-1 border-t border-blue-200">
              <Text className="text-xs text-blue-700">
                Password for all: 12345678
              </Text>
            </View>
          </View>
        </View>
      </View>
    </AuthForm>
  );
}

