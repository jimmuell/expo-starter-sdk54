import { Text, TextInput, TextInputProps, View } from "react-native";
import { cn } from "../../utils/cn";

type InputProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
} & TextInputProps;

/**
 * Custom Input component with label and error states
 * Built with NativeWind for consistent styling
 */
export function Input({
  label,
  error,
  containerClassName,
  className,
  ...textInputProps
}: InputProps) {
  return (
    <View className={cn("mb-4", containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          "border rounded-md px-4 py-3 text-base bg-white",
          error ? "border-red-500" : "border-gray-300",
          "focus:border-blue-500",
          className,
        )}
        placeholderTextColor="#9ca3af"
        {...textInputProps}
      />
      {error && (
        <Text className="text-sm text-red-500 mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}

