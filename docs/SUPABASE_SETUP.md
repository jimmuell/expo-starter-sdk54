# Supabase Setup - Quick Start Guide

## ✅ Completed Steps

Your app is now fully integrated with Supabase! Here's what was configured:

1. **Supabase Client** - Configured with secure storage adapter
2. **Authentication Flow** - Login, register, password reset, email verification
3. **Session Management** - Automatic token refresh and state synchronization
4. **Auth State Listener** - Real-time auth state changes across the app

## 🚀 Next Steps: Database Setup

To complete the integration, you need to set up your database schema in Supabase.

### 1. Access Supabase SQL Editor

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**

### 2. Apply Database Migrations

We use a migrations-based approach for database schema management.

**Run the migrations in order:**

1. **Initial Profiles Setup:**
   - Open `supabase/migrations/20250126000001_initial_profiles_setup.sql`
   - Copy entire file contents
   - Paste in SQL Editor and Run

2. **Storage Setup:**
   - Open `supabase/migrations/20250126000002_storage_setup.sql`
   - Copy entire file contents
   - Paste in SQL Editor and Run

These migrations will:
- ✅ Create/update profiles table with required columns (role, full_name, email)
- ✅ Set up Row Level Security policies
- ✅ Create trigger for automatic profile creation on signup
- ✅ Set up avatar storage bucket and policies
- ✅ Migrate any existing auth users to profiles table

See `supabase/migrations/README.md` for detailed migration documentation.

### 3. Configure Email Authentication

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable **Email** provider
3. Configure email templates (optional but recommended):
   - Confirmation email
   - Password recovery
   - Email change confirmation

### 4. Test Your Integration

#### Option A: Test with Real Registration

1. Start your Expo app: `npm start`
2. Go to the Register screen
3. Create a new account with your email
4. Check Supabase dashboard:
   - **Authentication** → **Users** (should see new user)
   - **Table Editor** → **profiles** (should see profile record with role)

#### Option B: Test with Mock Data (Development Mode)

If you haven't completed the database setup yet, the app will automatically use mock data:
- **Client:** `jimmuell@aol.com` / `12345678`
- **Attorney:** `perry.mason@law.com` / `12345678`
- **Admin:** `admin@linktolawyers.com` / `12345678`

The app detects whether real Supabase credentials are configured and switches automatically!

## 🔒 Security Notes

### Environment Variables
- ✅ Your `.env` file contains real credentials
- ⚠️ **NEVER** commit `.env` to git
- ✅ `.env` is already in `.gitignore`

### Row Level Security (RLS)
- ✅ Enabled on profiles table
- ✅ Users can only read/update their own data
- ✅ Admins can view all profiles

## 📱 Features Integrated

### Authentication
- ✅ Login with email/password
- ✅ Register new users with role selection
- ✅ Password reset via email
- ✅ Email verification (OTP)
- ✅ Automatic session refresh
- ✅ Secure token storage (SecureStore on native, localStorage on web)

### Session Management
- ✅ Auto-refresh tokens before expiration
- ✅ Persistent sessions across app restarts
- ✅ Real-time auth state synchronization
- ✅ Automatic logout on token expiration

### State Management
- ✅ Zustand store for auth state
- ✅ Auth state listener for real-time updates
- ✅ Loading states for async operations
- ✅ Error handling with user-friendly messages

## 🎯 User Roles

Your app supports three roles:

1. **Client** - Basic user with limited access
2. **Attorney** - Professional with elevated access
3. **Admin** - Full system access

Role-based routing is already configured in:
- `app/(protected)/dashboard/client/`
- `app/(protected)/dashboard/attorney/`
- `app/(protected)/dashboard/admin/`

## 🐛 Troubleshooting

### "User profile not found" error
- Run the database schema SQL (Step 2 above)
- Verify the trigger function is created
- Check Supabase logs for errors

### Email not sending
- Verify email provider is enabled in Supabase
- Check spam folder
- For production, configure custom SMTP

### Session not persisting
- Clear app data and test fresh install
- Verify SecureStore permissions
- Check browser console for errors (web)

### Development Mode (Mock Data)
If you see mock users (client@example.com), it means:
- Database schema not set up yet, OR
- Real credentials not properly configured

Run the SQL schema above to switch to real Supabase!

## 📚 Related Documentation

- [Full Supabase Integration Guide](./supabase-integration.md)
- [Authentication Structure](./auth-structure.md)
- [Implementation Guide](./implementation-guide.md)

## 🎉 You're All Set!

Once you run the SQL schema, your app will be fully connected to Supabase with:
- Real user authentication
- Secure session management
- Role-based access control
- Production-ready security

Happy coding! 🚀

