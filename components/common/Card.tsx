import { View, ViewProps } from "react-native";
import { cn } from "../../utils/cn";

type CardProps = {
  className?: string;
  children: React.ReactNode;
} & ViewProps;

/**
 * Card component with rounded corners and shadow
 * Provides a consistent container for content
 */
export function Card({ className, children, ...viewProps }: CardProps) {
  return (
    <View
      className={cn(
        "bg-white rounded-lg p-4 shadow-sm border border-gray-200",
        className,
      )}
      {...viewProps}
    >
      {children}
    </View>
  );
}

