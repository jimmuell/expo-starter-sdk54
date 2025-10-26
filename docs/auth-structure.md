# Authentication & Role-Based Routing Structure

This document explains the authentication system and role-based routing structure implemented in this app.

## Overview

The app uses a multi-role authentication system with three user types:
- **Client**: End users who consume services
- **Attorney**: Service providers who manage clients
- **Admin**: System administrators with full access

## Architecture

### Authentication Flow

```
App Launch
    ↓
Initialize Auth (check storage)
    ↓
    ├─ Not Authenticated → Login Screen
    │       ↓
    │   Login/Register
    │       ↓
    │   Save to Storage
    │       ↓
    └─ Authenticated → Role-specific Dashboard
            ↓
        ├─ Client Dashboard
        ├─ Attorney Dashboard
        └─ Admin Dashboard
```

### Tech Stack

- **Supabase**: Authentication backend (placeholder mode enabled)
- **Zustand**: Global state management for auth
- **Expo Router**: File-based routing with route groups
- **SecureStore**: Encrypted local storage for tokens

## Directory Structure

### Route Groups

```
app/
├── (auth)/              # Public authentication routes
│   ├── login.tsx        # Login screen
│   ├── register.tsx     # Registration with role selection
│   ├── forgot-password.tsx
│   └── verify-email.tsx
│
└── (protected)/         # Authenticated routes
    ├── dashboard/
    │   ├── client/      # Client-specific routes
    │   ├── attorney/    # Attorney-specific routes
    │   └── admin/       # Admin-specific routes
    ├── settings.tsx     # Shared settings
    └── notifications.tsx
```

### Key Files

**Authentication Core**
- `lib/auth.ts`: Auth service (login, register, logout)
- `lib/hooks/useAuth.ts`: Zustand store for auth state
- `lib/hooks/useRoleGuard.ts`: Route protection hook
- `lib/storage.ts`: SecureStore wrapper
- `lib/roles.ts`: Role utilities and permissions

**Type Definitions**
- `types/user.ts`: User, Role, AuthState types

**Configuration**
- `constants/routes.ts`: Centralized route definitions
- `constants/config.ts`: App configuration

## Usage

### Protecting Routes

Use the `useRoleGuard` hook in any screen that requires authentication:

```tsx
import { useRoleGuard } from "../../lib/hooks/useRoleGuard";

export default function ClientDashboard() {
  // Only allow clients
  useRoleGuard({ allowedRoles: ["client"] });
  
  return <View>...</View>;
}
```

### Conditional Rendering by Role

Use the `RoleGate` component to show/hide UI elements:

```tsx
import { RoleGate } from "../components/RoleGate";

<RoleGate allowedRoles={["admin", "attorney"]}>
  <Button title="Manage Users" />
</RoleGate>
```

### Accessing Auth State

Use the `useAuth` hook anywhere in the app:

```tsx
import { useAuth } from "../lib/contexts/AuthContext";

export default function MyComponent() {
  const { user, isAuthenticated, signOut } = useAuth();
  
  return (
    <View>
      <Text>{user?.email}</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}
```

## Placeholder vs Production Mode

### Current State (Placeholder)

The app currently runs in **placeholder mode**:
- Mock user database with 3 demo accounts
- No real API calls to Supabase
- Auth state persisted to SecureStore
- All auth logic works end-to-end

### Demo Credentials

```
Client:
  Email: client@example.com
  Password: password123

Attorney:
  Email: attorney@example.com
  Password: password123

Admin:
  Email: admin@example.com
  Password: password123
```

### Switching to Production

See `docs/supabase-integration.md` for detailed steps to connect real Supabase.

## Role Hierarchy

Roles have a hierarchy for permission checking:

```
Admin (level 3)
  ↑
Attorney (level 2)
  ↑
Client (level 1)
```

Higher roles can access lower role features:
- Admin can access all routes
- Attorney can access client routes
- Client can only access client routes

## Navigation

The app uses Expo Router's file-based routing:

### Route URLs

```
Public Routes:
  /login
  /register
  /forgot-password
  /verify-email

Protected Routes:
  /dashboard/client          (Client home)
  /dashboard/client/cases
  /dashboard/client/profile
  
  /dashboard/attorney        (Attorney home)
  /dashboard/attorney/clients
  /dashboard/attorney/profile
  
  /dashboard/admin           (Admin home)
  /dashboard/admin/users
  /dashboard/admin/settings
  
  /settings                  (Shared)
  /notifications             (Shared)
```

### Automatic Redirects

The app automatically redirects users:
1. Landing page (`/`) → Login or dashboard based on auth
2. Protected routes → Login if not authenticated
3. Login success → Role-specific dashboard
4. Logout → Login screen

## Security Considerations

### Current Implementation

✅ Encrypted token storage (SecureStore)  
✅ Role-based access control  
✅ Protected routes with guards  
✅ Auth state persistence  
✅ Type-safe throughout  

### Production Checklist

Before deploying to production:

- [ ] Connect real Supabase instance
- [ ] Set up Row Level Security (RLS) in Supabase
- [ ] Configure email verification
- [ ] Add password reset functionality
- [ ] Implement refresh token logic
- [ ] Add rate limiting
- [ ] Enable MFA (optional)
- [ ] Set up monitoring and logging

## Extending the System

### Adding a New Role

1. Update `types/user.ts`:
```tsx
export type UserRole = "client" | "attorney" | "admin" | "newrole";
```

2. Add role to hierarchy in `lib/roles.ts`:
```tsx
const ROLE_HIERARCHY: Record<UserRole, number> = {
  client: 1,
  attorney: 2,
  newrole: 3,
  admin: 4,
};
```

3. Create route directory:
```
app/(protected)/dashboard/newrole/
```

4. Add routes to `constants/routes.ts`

### Adding Protected Screens

1. Create screen in appropriate directory
2. Add `useRoleGuard` hook
3. Add route to constants if needed

### Customizing Auth Flow

Edit `lib/auth.ts` to modify:
- Login logic
- Registration process
- Password reset flow
- Token handling

## Troubleshooting

### Auth not persisting
- Check SecureStore permissions
- Verify initialize() is called in root layout

### Redirects not working
- Check route paths in constants/routes.ts
- Verify Expo Router configuration
- Check console for navigation errors

### Role guard not blocking access
- Ensure useRoleGuard is called at top of component
- Check role spelling (case-sensitive)
- Verify user role in state

## Next Steps

1. **Test the flow**: Run the app and test all three user roles
2. **Connect Supabase**: Follow supabase-integration.md
3. **Customize screens**: Add your specific business logic
4. **Style components**: Adjust NativeWind classes as needed
5. **Add features**: Build on this foundation

