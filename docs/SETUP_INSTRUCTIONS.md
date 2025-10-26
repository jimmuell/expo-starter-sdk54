# 🚀 Setup Instructions for New Supabase Database

You've created a fresh Supabase database! Follow these steps to complete the setup.

## ✅ What You've Already Done

1. ✅ Created new Supabase project
2. ✅ Updated `.env` file with new credentials
3. ✅ Created `profiles` table with basic schema
4. ✅ Set up trigger for automatic profile creation

## 🔧 What You Need to Do Now

### Step 1: Apply Database Migrations

Your database needs to be set up with the required schema for the app.

**Run Migrations in Supabase SQL Editor:**

1. Go to https://app.supabase.com
2. Select your project
3. Click **SQL Editor** → **New Query**
4. Open `supabase/migrations/20250126000001_initial_profiles_setup.sql`
5. Copy and paste the entire contents
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Repeat for `supabase/migrations/20250126000002_storage_setup.sql`

This will:
- ✅ Create/update `profiles` table with all required columns
- ✅ Add `role` column (for client/attorney/admin access control)
- ✅ Add `email` column (for faster lookups)
- ✅ Set up Row Level Security policies
- ✅ Create trigger for automatic profile creation
- ✅ Set up avatar storage bucket
- ✅ Backfill data for any existing users

### Step 2: Test Your Setup

#### Option A: Create a New User in Your App

1. Start your app: `npm start`
2. Go to the Register screen
3. Fill in the form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: 12345678
   - Role: Client or Attorney
4. Submit the form

#### Option B: Use Demo Credentials

On the login screen, tap one of the demo credentials:
- **Client:** jimmuell@aol.com / 12345678
- **Attorney:** perry.mason@law.com / 12345678
- **Admin:** admin@linktolawyers.com / 12345678

**Note:** Demo credentials only work in mock mode. For real Supabase, create a real user.

### Step 3: Verify in Supabase Dashboard

After creating a user, check:

1. **Authentication → Users**
   - Should see your new user

2. **Table Editor → profiles**
   - Should see a profile with:
     - ✅ `id` (matching auth.users.id)
     - ✅ `email` (from user signup)
     - ✅ `full_name` (from user signup)
     - ✅ `role` (client, attorney, or admin)
     - ✅ `created_at` (timestamp)

## 🎯 What Changed in the App

I've updated the code to work with Supabase's default profile schema:

### Column Mapping:
- `full_name` (Supabase default) → `fullName` (in app)
- Added `email` column for consistency
- Added `role` column for role-based access control

### Files Updated:
- ✅ `lib/auth.ts` - Now queries `full_name`, `email`, `role`
- ✅ `update-profiles-table.sql` - Adds missing columns
- ✅ Trigger function - Populates all required fields

## 📋 Current Database Schema

After running the SQL update, your `profiles` table will have:

```sql
profiles (
  id uuid PRIMARY KEY,              -- References auth.users
  email text,                       -- User email (added)
  username text UNIQUE,             -- Optional username
  full_name text,                   -- User's full name
  role text DEFAULT 'client',       -- client|attorney|admin (added)
  avatar_url text,                  -- Profile picture URL
  website text,                     -- User website
  phone text,                       -- Phone number (added)
  created_at timestamp,             -- Created timestamp (added)
  updated_at timestamp              -- Updated timestamp
)
```

## 🔒 Security (RLS Policies)

Your existing RLS policies are good:
- ✅ Everyone can view profiles
- ✅ Users can insert their own profile
- ✅ Users can update their own profile

These work perfectly with our app!

## 🐛 Troubleshooting

### "User profile not found" error
- Make sure you ran `update-profiles-table.sql`
- Check that the trigger exists: Go to **Database → Functions** → should see `handle_new_user`
- Try creating a user directly in Supabase dashboard to test trigger

### Profile created but missing role/email
- Run the SQL update script again
- It will backfill existing profiles with missing data

### App crashes on login
- Clear app storage/cache
- Make sure `.env` file has correct credentials
- Restart the dev server: `npm start --reset-cache`

## ✨ You're All Set!

Once you run `update-profiles-table.sql`, you'll have:
- ✅ Full Supabase authentication
- ✅ Role-based access control (client, attorney, admin)
- ✅ Automatic profile creation on signup
- ✅ Secure token storage
- ✅ Session persistence

Happy coding! 🎉

