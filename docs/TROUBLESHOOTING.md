# Troubleshooting Guide

## Common Issues and Solutions

### App Stuck in Loading Loop

**Symptom:** The app continuously shows a loading screen and never proceeds to the login or dashboard screen.

**Root Cause:** This issue was caused by Supabase auth events (`SIGNED_IN`, `INITIAL_SESSION`) firing repeatedly when Supabase credentials were configured but no user session existed. These events triggered state updates, causing navigation loops especially on faster devices.

**Solution:**
1. The auth system now ignores `INITIAL_SESSION` events by default
2. For development/testing with mock auth, comment out Supabase credentials in `.env`:
   ```env
   # EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   # EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Restart the Expo dev server after changing `.env`:
   ```bash
   # Press Ctrl+C, then:
   npm start
   ```

### Environment Variables Not Loading

**Symptom:** Changes to `.env` file don't take effect.

**Solution:** Expo caches environment variables. Always restart the dev server after changing `.env`:
```bash
npm start --clear
```

### Module Reloading Issues

**Symptom:** Components mounting multiple times or initialization running repeatedly.

**Solution:** The app uses React Context with module-level guards to prevent re-initialization:
- `globalHasInitialized` flag in `AuthContext.tsx` ensures single initialization
- This persists even if the component remounts due to Fast Refresh

### TypeScript Errors After Refactoring

**Symptom:** Import errors like `Cannot find module '../lib/hooks/useAuth'`.

**Solution:** The auth system was refactored from Zustand to React Context. Update imports:
```tsx
// Old (Zustand)
import { useAuth } from "../lib/hooks/useAuth";

// New (React Context)
import { useAuth } from "../lib/contexts/AuthContext";
```

## Development vs Production

### Mock Authentication (Development)

When Supabase credentials are commented out in `.env`, the app uses mock authentication:
- Pre-configured test users (see README.md)
- Passwords stored in SecureStore
- No network calls to Supabase

### Real Authentication (Production)

When Supabase credentials are uncommented in `.env`:
- Real user authentication via Supabase
- Session management with automatic refresh
- Auth state sync across devices
- Profile data from Supabase database

## Getting Help

1. Check the console logs for error messages
2. Review the [auth-structure.md](./auth-structure.md) documentation
3. Ensure all dependencies are installed: `npm install`
4. Try clearing cache: `npm start --clear`

## Recent Changes

### Migration from Zustand to React Context

The authentication system was refactored from Zustand to React Context for better stability and simpler state management. Key changes:

- **Before:** `lib/hooks/useAuth.ts` (Zustand store)
- **After:** `lib/contexts/AuthContext.tsx` (React Context)
- **Why:** React Context provides better lifecycle control and eliminates module reload issues

All functionality remains the same - only the import path changed.

