# NativeWind v4 Installation Guide for Expo Projects

This guide provides step-by-step instructions for installing and configuring NativeWind v4 in an Expo project.

## Prerequisites

- Expo project (SDK 54 or compatible version)
- Node.js and npm installed
- TypeScript configured (recommended)

## Installation Steps

### 1. Install NativeWind and Tailwind CSS

Install the required packages:

```bash
npm install nativewind@^4.0.0 tailwindcss@^3.3.2
```

**Note:** The project should already have `react-native-reanimated` and `react-native-safe-area-context` as dependencies (included with Expo).

---

### 2. Initialize Tailwind CSS

Generate a `tailwind.config.js` file:

```bash
npx tailwindcss init
```

---

### 3. Configure `tailwind.config.js`

Update the generated file to include your app paths and the NativeWind preset:

**File: `tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Important:** 
- The `content` array tells Tailwind where to look for class names
- The `presets` array includes the NativeWind preset which adapts Tailwind for React Native
- Adjust paths based on your project structure

---

### 4. Create Global CSS File

Create a `global.css` file in the project root with Tailwind directives:

**File: `global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 5. Create/Modify `babel.config.js` ⚠️ CRITICAL STEP

This step is **essential** and often forgotten. Create or modify your Babel configuration:

**File: `babel.config.js`**

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'nativewind/babel'
    ],
  };
};
```

**Why this matters:** The `nativewind/babel` preset transforms `className` props into React Native styles. Without this, NativeWind will not work.

---

### 6. Create/Modify `metro.config.js`

Configure Metro bundler to work with NativeWind:

**File: `metro.config.js`**

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

**Note:** The `input` option should point to your global CSS file created in step 4.

---

### 7. Create TypeScript Definitions (TypeScript Projects Only)

Create a type definitions file for NativeWind:

**File: `nativewind-env.d.ts`**

```typescript
/// <reference types="nativewind/types" />
```

**⚠️ Important naming constraints:**
- Do NOT name this file `nativewind.d.ts`
- Do NOT use the same name as an existing file or folder
- Do NOT use names that conflict with `node_modules` directories

---

### 8. Import Global CSS in Root Layout

Import the global CSS file in your root layout component:

**File: `app/_layout.tsx`**

```typescript
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

**Note:** Import must be at the top of the file, before other imports.

---

## Testing Your Installation

Create or update a test screen to verify NativeWind is working:

**File: `app/index.tsx`**

```typescript
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to NativeWind v4!
      </Text>
      <Text className="text-sm text-gray-600 mt-2">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
```

---

## Running Your App

After installation, **clear the Metro bundler cache** before running:

```bash
npm start -- --clear
```

Then start your app normally:

```bash
npm start
```

---

## Verification Checklist

Before considering the installation complete, verify:

- ✅ `nativewind` and `tailwindcss` installed in `package.json`
- ✅ `tailwind.config.js` exists with correct content paths and preset
- ✅ `global.css` exists with Tailwind directives
- ✅ **`babel.config.js` includes `nativewind/babel` preset** (most commonly forgotten)
- ✅ `metro.config.js` uses `withNativeWind` wrapper
- ✅ `nativewind-env.d.ts` exists (TypeScript projects)
- ✅ `global.css` is imported in root layout
- ✅ Metro bundler cache cleared before first run

---

## Common Issues & Solutions

### Issue: Styles not applying

**Solution:** 
1. Ensure `babel.config.js` includes `nativewind/babel` preset
2. Clear Metro cache: `npm start -- --clear`
3. Restart the development server

### Issue: TypeScript errors on `className` prop

**Solution:**
1. Verify `nativewind-env.d.ts` exists and has correct content
2. Restart TypeScript server in your editor
3. Check that file is not named `nativewind.d.ts`

### Issue: Metro bundler errors

**Solution:**
1. Ensure `metro.config.js` is properly configured
2. Check that `global.css` path in metro config is correct
3. Try deleting `node_modules` and reinstalling

---

## File Structure After Installation

Your project should have these files:

```
project-root/
├── app/
│   ├── _layout.tsx          (imports global.css)
│   └── index.tsx            (uses className)
├── components/              (your components using className)
├── babel.config.js          ⚠️ CRITICAL
├── metro.config.js
├── tailwind.config.js
├── global.css
├── nativewind-env.d.ts      (TypeScript only)
└── package.json
```

---

## Usage Example

Once installed, use Tailwind classes via the `className` prop:

```typescript
import { View, Text, Pressable } from "react-native";

export function MyComponent() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Hello NativeWind!
      </Text>
      <Pressable className="bg-blue-500 p-4 rounded-lg active:bg-blue-600">
        <Text className="text-white text-center font-semibold">
          Press Me
        </Text>
      </Pressable>
    </View>
  );
}
```

---

## Additional Resources

- [NativeWind v4 Documentation](https://www.nativewind.dev/v4/getting-started/installation)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Expo Documentation](https://docs.expo.dev/)

---

## Version Information

This guide was created for:
- **NativeWind:** v4.x
- **Tailwind CSS:** v3.3.2+
- **Expo SDK:** 54+
- **React Native:** 0.81.5+

---

**Last Updated:** October 26, 2025

