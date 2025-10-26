# Implementation Guide: Future Auth + Role-Based Systems

This guide helps you replicate this authentication and role-based routing structure in future projects.

## Quick Start Checklist

Use this checklist when implementing auth in a new Expo project:

### Phase 1: Dependencies (15 minutes)

- [ ] Install core packages:
  ```bash
  npm install zustand @supabase/supabase-js expo-secure-store
  ```
- [ ] Verify expo-router is installed
- [ ] Ensure NativeWind is configured (if using)

### Phase 2: Type System (10 minutes)

- [ ] Create `types/user.ts` with:
  - [ ] UserRole type
  - [ ] User interface
  - [ ] AuthState interface
  - [ ] LoginCredentials, RegisterData interfaces

### Phase 3: Constants (10 minutes)

- [ ] Create `constants/routes.ts` with all route paths
- [ ] Create `constants/config.ts` with environment variables
- [ ] Create `constants/colors.ts` (optional, for theming)

### Phase 4: Infrastructure (30 minutes)

- [ ] Create `lib/storage.ts` - SecureStore wrapper
- [ ] Create `lib/api.ts` - Supabase client initialization
- [ ] Create `lib/roles.ts` - Role utilities and permissions
- [ ] Create `lib/auth.ts` - Auth service layer

### Phase 5: State Management (20 minutes)

- [ ] Create `lib/hooks/useAuth.ts` - Zustand auth store
- [ ] Create `lib/hooks/useRoleGuard.ts` - Route protection hook

### Phase 6: Components (30 minutes)

- [ ] Create common components:
  - [ ] `components/common/Button.tsx`
  - [ ] `components/common/Input.tsx`
  - [ ] `components/common/Text.tsx`
  - [ ] `components/common/Card.tsx`
- [ ] Create feature components:
  - [ ] `components/AuthForm.tsx`
  - [ ] `components/DashboardHeader.tsx`
  - [ ] `components/RoleGate.tsx`

### Phase 7: Auth Routes (45 minutes)

- [ ] Create `app/(auth)/_layout.tsx`
- [ ] Create `app/(auth)/login.tsx`
- [ ] Create `app/(auth)/register.tsx`
- [ ] Create `app/(auth)/forgot-password.tsx`
- [ ] Create `app/(auth)/verify-email.tsx` (optional)

### Phase 8: Protected Routes (60 minutes)

- [ ] Create `app/(protected)/_layout.tsx` with auth guard
- [ ] Create `app/(protected)/dashboard/_layout.tsx`
- [ ] For each role, create:
  - [ ] `app/(protected)/dashboard/{role}/index.tsx`
  - [ ] `app/(protected)/dashboard/{role}/...` (feature screens)
- [ ] Create shared screens:
  - [ ] `app/(protected)/settings.tsx`
  - [ ] `app/(protected)/notifications.tsx`

### Phase 9: Root Configuration (15 minutes)

- [ ] Update `app/_layout.tsx` to initialize auth
- [ ] Update `app/index.tsx` with redirect logic
- [ ] Create `app/+not-found.tsx`

### Phase 10: Environment & Docs (20 minutes)

- [ ] Create `.env.example`
- [ ] Document auth flow
- [ ] Document Supabase setup steps
- [ ] Update README with structure

**Total time: ~4-5 hours** for complete implementation

---

## Architecture Patterns

### File Structure Pattern

```
/{feature}/
├── _layout.tsx       # Layout/navigation for feature
├── index.tsx         # Default/home screen
├── {subfeature}.tsx  # Feature screens
└── {nested}/         # Nested features
    └── ...
```

### Route Group Pattern

Use parentheses for logical grouping without URL segments:

```
app/
├── (auth)/          # URL: /login, /register
├── (protected)/     # URL: /dashboard/...
```

### Component Pattern

```tsx
// 1. Imports
import { View } from "react-native";
import { useRoleGuard } from "../lib/hooks/useRoleGuard";

// 2. Type definitions
type MyScreenProps = {
  // ...
};

// 3. Component
export default function MyScreen() {
  // 4. Role guard (if protected)
  useRoleGuard({ allowedRoles: ["admin"] });
  
  // 5. State & hooks
  // ...
  
  // 6. Render
  return <View>...</View>;
}
```

### Auth Flow Pattern

```
Initialize → Check Storage → Set State → Redirect
```

Always follow this pattern:
1. Call `initialize()` in root layout
2. Check `isLoading` before rendering
3. Redirect based on `isAuthenticated`
4. Provide loading UI during checks

---

## Code Snippets Library

### Protected Screen Template

```tsx
import { View, Text } from "react-native";
import { useRoleGuard } from "../../lib/hooks/useRoleGuard";

export default function ProtectedScreen() {
  useRoleGuard({ allowedRoles: ["admin"] });
  
  return (
    <View>
      <Text>Protected Content</Text>
    </View>
  );
}
```

### Auth Form Template

```tsx
import { useState } from "react";
import { AuthForm } from "../../components/AuthForm";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <AuthForm title="Welcome" subtitle="Sign in to continue">
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleLogin} />
    </AuthForm>
  );
}
```

### Role-Based Tab Layout

```tsx
import { Tabs } from "expo-router";
import { useAuth } from "../../lib/hooks/useAuth";

export default function TabLayout() {
  const { user } = useAuth();
  
  return (
    <Tabs>
      <Tabs.Screen
        name="client"
        options={{
          href: user?.role === "client" ? undefined : null,
        }}
      />
      <Tabs.Screen
        name="attorney"
        options={{
          href: user?.role === "attorney" ? undefined : null,
        }}
      />
    </Tabs>
  );
}
```

---

## Common Customizations

### Adding a New Role

1. Update type:
```tsx
// types/user.ts
export type UserRole = "client" | "attorney" | "admin" | "manager";
```

2. Add to hierarchy:
```tsx
// lib/roles.ts
const ROLE_HIERARCHY: Record<UserRole, number> = {
  client: 1,
  attorney: 2,
  manager: 3,
  admin: 4,
};
```

3. Create routes:
```
app/(protected)/dashboard/manager/
```

### Custom Auth Provider (Not Supabase)

Replace `lib/auth.ts` with your provider's SDK:

```tsx
import { yourAuthProvider } from "your-sdk";

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await yourAuthProvider.signIn(credentials);
  const user = transformToUser(response);
  await saveUser(user);
  return user;
}
```

### Social Auth (Google, Apple, etc.)

Add to `app/(auth)/login.tsx`:

```tsx
import * as Google from "expo-auth-session/providers/google";

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_CLIENT_ID",
  });
  
  // Handle response and create user
}
```

### Multi-Step Registration

Create wizard pattern:

```
app/(auth)/register/
├── _layout.tsx          # Stack navigator
├── step1.tsx            # Email & password
├── step2.tsx            # Personal info
├── step3.tsx            # Role selection
└── complete.tsx         # Success screen
```

---

## Testing Strategy

### Unit Tests

```typescript
// lib/roles.test.ts
describe("canAccessRoute", () => {
  it("allows admin to access client routes", () => {
    expect(canAccessRoute("admin", "client")).toBe(true);
  });
  
  it("blocks client from admin routes", () => {
    expect(canAccessRoute("client", "admin")).toBe(false);
  });
});
```

### Integration Tests

```typescript
// Test auth flow
it("redirects to dashboard after login", async () => {
  await login({ email: "test@example.com", password: "password" });
  expect(getCurrentRoute()).toBe("/dashboard/client");
});
```

### Manual Testing Checklist

- [ ] Login with each role
- [ ] Verify correct dashboard loads
- [ ] Test role guards (try accessing unauthorized routes)
- [ ] Test logout and re-login
- [ ] Test app restart (auth persistence)
- [ ] Test password reset flow
- [ ] Test registration for each role

---

## Performance Optimization

### Lazy Loading Dashboards

```tsx
// app/(protected)/dashboard/_layout.tsx
import { lazy, Suspense } from "react";

const ClientDashboard = lazy(() => import("./client"));
const AttorneyDashboard = lazy(() => import("./attorney"));
const AdminDashboard = lazy(() => import("./admin"));
```

### Memoize Role Checks

```tsx
// lib/hooks/useRoleGuard.ts
import { useMemo } from "react";

export function useRoleGuard(options: UseRoleGuardOptions) {
  const hasAccess = useMemo(
    () => hasRole(user.role, allowedRoles),
    [user, allowedRoles]
  );
}
```

---

## Security Best Practices

### ✅ DO

- Store tokens in SecureStore
- Use HTTPS for all API calls
- Validate user input
- Implement rate limiting
- Use Row Level Security in Supabase
- Log security events
- Rotate API keys regularly

### ❌ DON'T

- Store passwords in plain text
- Commit .env files
- Trust client-side validation alone
- Expose admin endpoints without checks
- Use weak password requirements
- Skip email verification in production

---

## Migration Guide

### From Firebase Auth

1. Replace `lib/api.ts` with Firebase config
2. Update `lib/auth.ts` auth methods:
   - `login()` → `signInWithEmailAndPassword()`
   - `register()` → `createUserWithEmailAndPassword()`
3. Store custom claims for roles in Firestore
4. Update role fetching logic

### From Custom Backend

1. Update `lib/api.ts` with your API client
2. Replace auth methods in `lib/auth.ts`
3. Adjust User type to match your API
4. Update token storage format if needed

---

## Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| Auth not initializing | Check `initialize()` is called in root layout |
| Infinite redirect loop | Verify route paths in constants |
| Role guard not working | Ensure hook is called at component top level |
| Type errors | Run `npx tsc --noEmit` to check all types |
| Storage errors | Check SecureStore permissions in app.json |

---

## Resources & References

- [Expo Router Docs](https://expo.github.io/router)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [React Native Security](https://reactnative.dev/docs/security)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)

---

## Support & Community

For help implementing this pattern:

1. Check existing docs in `docs/` folder
2. Review code comments in implementation
3. Search issues in project repository
4. Ask in Expo/React Native community

---

## Version History

- **v1.0.0** (Oct 2024): Initial implementation
  - Supabase auth with placeholder mode
  - Three-role system (client, attorney, admin)
  - Full route structure with guards
  - NativeWind styling throughout

---

**Happy coding! 🚀**

