# Components Directory Setup Guide

This guide provides complete instructions for recreating the components directory structure and all its files in a new project.

## Overview

The components directory contains reusable UI components built with NativeWind (Tailwind CSS for React Native) and TypeScript. All components use a `cn()` utility function for className merging.

## Prerequisites

- NativeWind v4 installed and configured (see `nativewind-v4-installation.md`)
- TypeScript configured
- React Native project with Expo

## Directory Structure

```
components/
├── ui/
│   └── README.md
├── AppText.tsx
├── Button.tsx
└── (your custom components)

utils/
└── cn.ts
```

---

## Step 1: Create the Utils Directory and cn Utility

First, create the `utils` directory and the `cn` utility function that all components depend on.

### Create Directory

```bash
mkdir utils
```

### Create `utils/cn.ts`

This utility merges className strings, filtering out falsy values (useful for conditional classes).

**File: `utils/cn.ts`**

```typescript
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

### Install Required Dependency

The `cn` utility requires the `clsx` package:

```bash
npm install clsx
```

**Note:** If you want to use `tailwind-merge` for better Tailwind class merging (handles conflicts like `px-2 px-4`), you can use this alternative:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Then install both packages:

```bash
npm install clsx tailwind-merge
```

---

## Step 2: Create the Components Directory Structure

```bash
mkdir -p components/ui
```

---

## Step 3: Create Base Components

### 3.1 AppText Component

A flexible text component with preset sizes, colors, and styling options.

**File: `components/AppText.tsx`**

```typescript
import { Text } from "react-native";
import { cn } from "../utils/cn";

type AppTextProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "heading";
  bold?: boolean;
  color?: "primary" | "secondary" | "tertiary";
  center?: boolean;
  className?: string;
};

export function AppText({
  children,
  size = "medium",
  bold = false,
  color = "primary",
  center = false,
  className,
}: AppTextProps) {
  return (
    <Text
      className={cn(
        size === "small" && "text-sm mb-2",
        size === "medium" && "text-base mb-3",
        size === "large" && "text-lg mb-4",
        size === "heading" && "text-xl mb-5",
        bold && "font-bold",
        color === "primary" && "text-black",
        color === "secondary" && "text-gray-500",
        color === "tertiary" && "text-gray-400",
        center && "text-center",
        className,
      )}
    >
      {children}
    </Text>
  );
}
```

**Usage:**

```typescript
import { AppText } from "@/components/AppText";

// Basic usage
<AppText>Hello World</AppText>

// With props
<AppText size="heading" bold color="primary" center>
  Welcome!
</AppText>

// With custom className
<AppText className="text-blue-500 underline">
  Custom styled text
</AppText>
```

---

### 3.2 Button Component

A customizable button component with multiple themes and states.

**File: `components/Button.tsx`**

```typescript
import { Pressable, PressableProps, Text } from "react-native";
import React from "react";
import { cn } from "../utils/cn";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  theme?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
} & PressableProps;

// from SDK 53 (React 19) onwards, forwardRef is no longer needed, as ref is now a prop
export function Button({
  title,
  onPress,
  theme = "primary",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-md px-5 py-3 mb-4 border",
        theme === "primary" && "bg-[#007AFF] border-[#007AFF]",
        theme === "secondary" && "bg-white border-gray-300",
        theme === "tertiary" && "bg-transparent border-transparent",
        disabled && "opacity-50",
      )}
      disabled={disabled}
      {...rest}
    >
      <Text
        className={cn(
          "font-semibold text-lg tracking-wider",
          theme === "secondary" && "text-black",
          theme === "primary" && "text-white",
          theme === "tertiary" && "text-gray-800",
        )}
      >
        {title}
      </Text>
    </Pressable>
  );
}
```

**Usage:**

```typescript
import { Button } from "@/components/Button";

// Primary button (default)
<Button title="Click Me" onPress={() => console.log("Pressed!")} />

// Secondary button
<Button title="Cancel" theme="secondary" onPress={handleCancel} />

// Tertiary button (minimal)
<Button title="Skip" theme="tertiary" onPress={handleSkip} />

// Disabled button
<Button title="Submit" disabled onPress={handleSubmit} />

// With additional Pressable props
<Button 
  title="Long Press"
  onLongPress={handleLongPress}
  delayLongPress={500}
/>
```

---

## Step 4: Create UI Directory README

**File: `components/ui/README.md`**

```markdown
# UI Components

This directory contains reusable UI components built with NativeWind (Tailwind CSS for React Native).

## Available Components

Place your custom UI components here. Components should:
- Use TypeScript for type safety
- Support NativeWind className prop
- Be fully documented with JSDoc comments
- Export from individual files for tree-shaking

## Example Component Structure

\`\`\`tsx
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
\`\`\`

## Best Practices

1. Always use the `cn()` utility for className merging
2. Extend appropriate React Native component props
3. Provide default styling that can be overridden
4. Document props and usage with JSDoc
5. Keep components focused and single-purpose
```

---

## Component Features & Design Patterns

### AppText Component

**Features:**
- Preset text sizes (small, medium, large, heading)
- Color variants (primary, secondary, tertiary)
- Bold styling option
- Text alignment (center)
- Custom className support for overrides
- Automatic bottom margins based on size

**Design Philosophy:**
- Provides consistent typography throughout the app
- Reduces repetitive styling code
- Easy to maintain text styling in one place

---

### Button Component

**Features:**
- Three theme variants (primary, secondary, tertiary)
- Disabled state with visual feedback
- Extends all PressableProps for flexibility
- Accessible and follows React Native best practices
- iOS-style primary color (#007AFF)

**Design Philosophy:**
- Consistent button styling across the app
- Supports all native Pressable functionality
- Easy to extend with new themes
- Built-in disabled state handling

---

## Path Aliases (Optional but Recommended)

To use cleaner imports like `@/components/Button` instead of `../../components/Button`, configure path aliases:

### Update `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Update `babel.config.js`

Install babel-plugin-module-resolver:

```bash
npm install --save-dev babel-plugin-module-resolver
```

Then update your babel config:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'nativewind/babel'
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
      ],
    ],
  };
};
```

---

## Full Installation Script

Here's a complete bash script to set up everything:

```bash
#!/bin/bash

# Install dependencies
npm install clsx

# Create directories
mkdir -p utils
mkdir -p components/ui

# Create cn utility
cat > utils/cn.ts << 'EOF'
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
EOF

# Create AppText component
cat > components/AppText.tsx << 'EOF'
import { Text } from "react-native";
import { cn } from "../utils/cn";

type AppTextProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "heading";
  bold?: boolean;
  color?: "primary" | "secondary" | "tertiary";
  center?: boolean;
  className?: string;
};

export function AppText({
  children,
  size = "medium",
  bold = false,
  color = "primary",
  center = false,
  className,
}: AppTextProps) {
  return (
    <Text
      className={cn(
        size === "small" && "text-sm mb-2",
        size === "medium" && "text-base mb-3",
        size === "large" && "text-lg mb-4",
        size === "heading" && "text-xl mb-5",
        bold && "font-bold",
        color === "primary" && "text-black",
        color === "secondary" && "text-gray-500",
        color === "tertiary" && "text-gray-400",
        center && "text-center",
        className,
      )}
    >
      {children}
    </Text>
  );
}
EOF

# Create Button component
cat > components/Button.tsx << 'EOF'
import { Pressable, PressableProps, Text } from "react-native";
import React from "react";
import { cn } from "../utils/cn";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  theme?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
} & PressableProps;

export function Button({
  title,
  onPress,
  theme = "primary",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-md px-5 py-3 mb-4 border",
        theme === "primary" && "bg-[#007AFF] border-[#007AFF]",
        theme === "secondary" && "bg-white border-gray-300",
        theme === "tertiary" && "bg-transparent border-transparent",
        disabled && "opacity-50",
      )}
      disabled={disabled}
      {...rest}
    >
      <Text
        className={cn(
          "font-semibold text-lg tracking-wider",
          theme === "secondary" && "text-black",
          theme === "primary" && "text-white",
          theme === "tertiary" && "text-gray-800",
        )}
      >
        {title}
      </Text>
    </Pressable>
  );
}
EOF

# Create UI README
cat > components/ui/README.md << 'EOF'
# UI Components

This directory contains reusable UI components built with NativeWind (Tailwind CSS for React Native).

## Available Components

Place your custom UI components here. Components should:
- Use TypeScript for type safety
- Support NativeWind className prop
- Be fully documented with JSDoc comments
- Export from individual files for tree-shaking

## Example Component Structure

\`\`\`tsx
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
\`\`\`

## Best Practices

1. Always use the `cn()` utility for className merging
2. Extend appropriate React Native component props
3. Provide default styling that can be overridden
4. Document props and usage with JSDoc
5. Keep components focused and single-purpose
EOF

echo "✅ Components directory setup complete!"
```

Save this script as `setup-components.sh`, make it executable with `chmod +x setup-components.sh`, and run it with `./setup-components.sh`.

---

## Testing Your Components

Create a test screen to verify all components work:

**File: `app/test-components.tsx`**

```typescript
import { View, ScrollView } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";

export default function TestComponents() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* AppText Tests */}
        <AppText size="heading" bold>
          AppText Component
        </AppText>
        
        <AppText size="small">Small text</AppText>
        <AppText size="medium">Medium text (default)</AppText>
        <AppText size="large">Large text</AppText>
        <AppText size="heading">Heading text</AppText>
        
        <AppText color="primary">Primary color</AppText>
        <AppText color="secondary">Secondary color</AppText>
        <AppText color="tertiary">Tertiary color</AppText>
        
        <AppText bold>Bold text</AppText>
        <AppText center>Centered text</AppText>
        
        {/* Button Tests */}
        <AppText size="heading" bold className="mt-8">
          Button Component
        </AppText>
        
        <Button title="Primary Button" onPress={() => console.log("Primary pressed")} />
        <Button title="Secondary Button" theme="secondary" onPress={() => console.log("Secondary pressed")} />
        <Button title="Tertiary Button" theme="tertiary" onPress={() => console.log("Tertiary pressed")} />
        <Button title="Disabled Button" disabled onPress={() => console.log("Should not fire")} />
      </View>
    </ScrollView>
  );
}
```

---

## Customization Guide

### Adding New Text Sizes to AppText

```typescript
// Add to AppTextProps type
size?: "small" | "medium" | "large" | "heading" | "title";

// Add to className logic
size === "title" && "text-3xl mb-6",
```

### Adding New Button Themes

```typescript
// Add to ButtonProps type
theme?: "primary" | "secondary" | "tertiary" | "danger";

// Add to Pressable className
theme === "danger" && "bg-red-500 border-red-500",

// Add to Text className
theme === "danger" && "text-white",
```

### Creating a Card Component

Following the pattern, create `components/ui/Card.tsx`:

```typescript
import { View, ViewProps } from "react-native";
import { cn } from "../../utils/cn";

interface CardProps extends ViewProps {
  className?: string;
  variant?: "elevated" | "outlined" | "filled";
}

export function Card({ 
  className, 
  variant = "elevated",
  children, 
  ...props 
}: CardProps) {
  return (
    <View 
      className={cn(
        "bg-white rounded-lg p-4",
        variant === "elevated" && "shadow-md",
        variant === "outlined" && "border border-gray-300",
        variant === "filled" && "bg-gray-100",
        className
      )} 
      {...props}
    >
      {children}
    </View>
  );
}
```

---

## Troubleshooting

### Issue: Cannot find module '../utils/cn'

**Solution:** Ensure you created the `utils/cn.ts` file and installed `clsx`:

```bash
npm install clsx
```

### Issue: TypeScript errors on ClassValue type

**Solution:** Install type definitions for clsx:

```bash
npm install --save-dev @types/clsx
```

### Issue: Path alias @/ not working

**Solution:** 
1. Verify `tsconfig.json` has the paths configuration
2. Install and configure `babel-plugin-module-resolver`
3. Restart Metro bundler with cache clear: `npm start -- --clear`

---

## Dependencies Summary

Required packages:

```json
{
  "dependencies": {
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "babel-plugin-module-resolver": "^5.0.0" // Optional, for path aliases
  }
}
```

---

## File Checklist

Before considering setup complete, verify:

- ✅ `utils/cn.ts` created
- ✅ `clsx` package installed
- ✅ `components/AppText.tsx` created
- ✅ `components/Button.tsx` created
- ✅ `components/ui/README.md` created
- ✅ No TypeScript errors in component files
- ✅ Test screen created and components render correctly

---

**Last Updated:** October 26, 2025

