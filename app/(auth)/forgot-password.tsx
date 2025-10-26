import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { resetPassword } from "../../lib/auth";

/**
 * Forgot password screen
 * Allows users to request a password reset email
 */
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      Alert.alert(
        "Success",
        "Password reset instructions have been sent to your email",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Reset Password"
      subtitle="Enter your email to receive reset instructions"
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

        <Button
          title={isLoading ? "Sending..." : "Send Reset Link"}
          onPress={handleResetPassword}
          disabled={isLoading}
          theme="primary"
        />

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Remember your password? </Text>
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

