import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { cn } from "../utils/cn";
import { Text } from "./common/Text";

type AuthFormProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Reusable authentication form container
 * Provides consistent layout for login, register, and password reset screens
 */
export function AuthForm({ title, subtitle, children, className }: AuthFormProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName={cn(
          "flex-1 justify-center px-6 py-12",
          className
        )}
        keyboardShouldPersistTaps="handled"
      >
        <View className="max-w-md w-full mx-auto">
          <View className="mb-8">
            <Text size="heading" bold className="text-3xl mb-2">
              {title}
            </Text>
            {subtitle && (
              <Text color="secondary" className="text-base">
                {subtitle}
              </Text>
            )}
          </View>

          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

