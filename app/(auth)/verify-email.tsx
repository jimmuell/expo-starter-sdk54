import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { verifyEmail } from "../../lib/auth";

/**
 * Email verification screen
 * Allows users to verify their email with a token/OTP
 */
export default function VerifyEmailScreen() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!token) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(token);
      Alert.alert(
        "Success",
        "Your email has been verified!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(auth)/login"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Verification Failed",
        error instanceof Error ? error.message : "Invalid verification code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Verify Email"
      subtitle="Enter the verification code sent to your email"
    >
      <View>
        <Input
          label="Verification Code"
          placeholder="000000"
          value={token}
          onChangeText={setToken}
          keyboardType="number-pad"
          autoComplete="one-time-code"
          maxLength={6}
        />

        <Button
          title={isLoading ? "Verifying..." : "Verify Email"}
          onPress={handleVerify}
          disabled={isLoading}
          theme="primary"
        />
      </View>
    </AuthForm>
  );
}

