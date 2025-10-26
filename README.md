# Expo Starter - Multi-Role Auth & Dashboard

A production-ready Expo (SDK 54) starter template with authentication, role-based routing, and beautiful NativeWind styling.

## 🎯 Features

- ✅ **Multi-Role Authentication** - Client, Attorney, and Admin roles
- ✅ **Supabase Integration** - Backend-ready with placeholder mode for development
- ✅ **Role-Based Routing** - File-based routing with route guards
- ✅ **State Management** - Zustand for global auth state
- ✅ **Secure Storage** - Encrypted token storage with SecureStore
- ✅ **NativeWind v4** - Tailwind CSS for React Native
- ✅ **TypeScript** - Fully typed throughout
- ✅ **Production Ready** - Tested patterns and best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo Go app (for testing on device)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd expo-starter-sdk54

# Install dependencies
npm install

# Start development server
npm start
```

### Demo Credentials

The app runs in **placeholder mode** with mock authentication:

```
Client Account:
Email: client@example.com
Password: password123

Attorney Account:
Email: attorney@example.com
Password: password123

Admin Account:
Email: admin@example.com
Password: password123
```

## 📁 Project Structure

```
expo-starter-sdk54/
├── app/                          # Expo Router routes
│   ├── (auth)/                   # Public auth screens
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── forgot-password.tsx
│   │   └── verify-email.tsx
│   ├── (protected)/              # Authenticated routes
│   │   ├── dashboard/
│   │   │   ├── client/           # Client-specific screens
│   │   │   ├── attorney/         # Attorney-specific screens
│   │   │   └── admin/            # Admin-specific screens
│   │   ├── settings.tsx
│   │   └── notifications.tsx
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Landing page with redirects
│
├── components/                   # Reusable components
│   ├── common/                   # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Text.tsx
│   │   └── Card.tsx
│   ├── AuthForm.tsx              # Auth screen wrapper
│   ├── DashboardHeader.tsx       # Dashboard header with logout
│   └── RoleGate.tsx              # Conditional rendering by role
│
├── lib/                          # Core business logic
│   ├── hooks/
│   │   ├── useAuth.ts            # Zustand auth store
│   │   └── useRoleGuard.ts       # Route protection hook
│   ├── auth.ts                   # Auth service layer
│   ├── api.ts                    # Supabase client
│   ├── storage.ts                # SecureStore wrapper
│   └── roles.ts                  # Role utilities
│
├── types/                        # TypeScript definitions
│   └── user.ts
│
├── constants/                    # App configuration
│   ├── routes.ts                 # Centralized route paths
│   ├── config.ts                 # Environment config
│   └── colors.ts                 # Color palette
│
├── docs/                         # Documentation
│   ├── auth-structure.md         # Auth system overview
│   ├── supabase-integration.md   # Supabase setup guide
│   └── implementation-guide.md   # Future implementation guide
│
└── utils/
    └── cn.ts                     # Tailwind className utility
```

## 🎨 Tech Stack

- **Expo SDK 54** - Latest Expo framework
- **React Native 0.81.5** - Mobile framework
- **Expo Router v6** - File-based navigation
- **NativeWind v4** - Tailwind CSS for React Native
- **Zustand** - Lightweight state management
- **Supabase** - Backend as a Service (ready to connect)
- **TypeScript** - Type safety
- **Expo SecureStore** - Encrypted storage

## 🔐 Authentication Flow

```
App Launch
    ↓
Initialize Auth (check SecureStore)
    ↓
    ├─ Not Authenticated → /login
    │       ↓
    │   Login/Register
    │       ↓
    └─ Authenticated → /dashboard/{role}
            ↓
        ├─ Client Dashboard
        ├─ Attorney Dashboard
        └─ Admin Dashboard
```

## 🛡️ Role-Based Access Control

### Role Hierarchy

```
Admin (Level 3) - Full system access
    ↓
Attorney (Level 2) - Manage clients, access attorney features
    ↓
Client (Level 1) - Access own cases and profile
```

### Protecting Routes

Use the `useRoleGuard` hook:

```tsx
import { useRoleGuard } from "../../lib/hooks/useRoleGuard";

export default function AdminScreen() {
  useRoleGuard({ allowedRoles: ["admin"] });
  
  return <View>Admin Only Content</View>;
}
```

### Conditional Rendering

Use the `RoleGate` component:

```tsx
import { RoleGate } from "../components/RoleGate";

<RoleGate allowedRoles={["admin", "attorney"]}>
  <Button title="Manage Users" />
</RoleGate>
```

## 🔌 Connecting to Supabase

The app works out of the box with mock data. To connect to real Supabase:

### Quick Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Add your credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Run the database schema (see `docs/supabase-integration.md`)

5. Restart the app:
```bash
npm start --reset-cache
```

**Detailed guide:** See [docs/supabase-integration.md](docs/supabase-integration.md)

## 📱 Available Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 🎯 Key Components

### useAuth Hook

Global auth state management:

```tsx
import { useAuth } from "../lib/hooks/useAuth";

const { user, isAuthenticated, signIn, signOut } = useAuth();
```

### Button Component

Themed button with NativeWind:

```tsx
import { Button } from "../components/common/Button";

<Button 
  title="Submit" 
  theme="primary"
  onPress={handleSubmit}
/>
```

### Input Component

Form input with validation:

```tsx
import { Input } from "../components/common/Input";

<Input
  label="Email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
/>
```

## 📚 Documentation

- **[Auth Structure](docs/auth-structure.md)** - Authentication system overview
- **[Supabase Integration](docs/supabase-integration.md)** - Backend setup guide
- **[Implementation Guide](docs/implementation-guide.md)** - Replicate this structure

## 🔧 Customization

### Adding a New Role

1. Update `types/user.ts`:
```tsx
export type UserRole = "client" | "attorney" | "admin" | "newrole";
```

2. Add to hierarchy in `lib/roles.ts`
3. Create route directory: `app/(protected)/dashboard/newrole/`
4. Add to `constants/routes.ts`

### Changing Design

The app uses NativeWind (Tailwind) for styling:

```tsx
<View className="flex-1 bg-white p-4">
  <Text className="text-xl font-bold text-gray-900">
    Hello World
  </Text>
</View>
```

Customize in `tailwind.config.js` or `constants/colors.ts`.

## 🐛 Troubleshooting

### Auth not persisting
- Check SecureStore permissions in `app.json`
- Verify `initialize()` is called in root layout

### Routes not working
- Run `npm start --reset-cache`
- Check route paths in `constants/routes.ts`

### Type errors
- Run `npx tsc --noEmit` to see all errors
- Ensure all dependencies are installed

## 📄 License

MIT License - feel free to use this template for any project!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
1. Check the [documentation](docs/)
2. Search existing issues
3. Create a new issue with details

## ⭐ Features Roadmap

- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] Profile image upload
- [ ] Push notifications
- [ ] Dark mode support
- [ ] Offline support
- [ ] Biometric authentication
- [ ] Multi-language support

---

**Built with ❤️ using Expo, React Native, and NativeWind**
