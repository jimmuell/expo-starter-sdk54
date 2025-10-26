# UI Components

This directory contains reusable UI components built with NativeWind (Tailwind CSS for React Native).

## Available Components

Place your custom UI components here. Components should:
- Use TypeScript for type safety
- Support NativeWind className prop
- Be fully documented with JSDoc comments
- Export from individual files for tree-shaking

## Example Component Structure

```tsx
import { View, ViewProps } from "react-native";
import { cn } from "../../utils/cn";

interface CardProps extends ViewProps {
  className?: string;
}

/**
 * Card component with rounded corners and shadow
 */
export function Card({ className, children, ...props }: CardProps) {
  return (
    <View 
      className={cn(
        "bg-white rounded-lg shadow-md p-4",
        className
      )} 
      {...props}
    >
      {children}
    </View>
  );
}
```

## Best Practices

1. Always use the `cn()` utility for className merging
2. Extend appropriate React Native component props
3. Provide default styling that can be overridden
4. Document props and usage with JSDoc
5. Keep components focused and single-purpose

