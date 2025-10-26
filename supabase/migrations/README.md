# Database Migrations

This folder contains SQL migration files for your Supabase database schema.

## Migration Files

Migrations are named with the following convention:
```
YYYYMMDDHHMMSS_description.sql
```

Example: `20250126000001_initial_profiles_setup.sql`

### Current Migrations

1. **`20250126000001_initial_profiles_setup.sql`**
   - Creates/updates `profiles` table with all required columns
   - Sets up Row Level Security (RLS) policies
   - Creates trigger for automatic profile creation on user signup
   - Backfills existing users with profiles

2. **`20250126000002_storage_setup.sql`**
   - Creates `avatars` storage bucket
   - Sets up storage policies for user avatar uploads
   - Allows users to upload/update/delete their own avatars

## How to Apply Migrations

### Option 1: Manual Application (Current Setup)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of a migration file
5. Paste and click **Run**

### Option 2: Using Supabase CLI (Recommended for Production)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push

# Or apply specific migration
supabase migration up
```

### Option 3: Automated Migrations (CI/CD)

You can run these migrations as part of your deployment process:

```bash
# In your CI/CD pipeline
supabase db push --linked
```

## Migration Best Practices

1. **Never modify existing migrations** - Create new ones instead
2. **Always test migrations** on a development database first
3. **Make migrations idempotent** - Use `IF NOT EXISTS`, `DROP IF EXISTS`, etc.
4. **Add rollback instructions** if needed
5. **Version control** - Commit migrations to git

## Creating New Migrations

When you need to make database changes:

1. Create a new file with timestamp:
   ```bash
   touch supabase/migrations/$(date +%Y%m%d%H%M%S)_your_description.sql
   ```

2. Write your SQL changes

3. Test locally or on dev database

4. Apply to production

## Schema Overview

### Tables

- **`profiles`** - User profile data
  - `id` (uuid, PK) - References auth.users
  - `email` (text) - User email
  - `full_name` (text) - User's full name
  - `username` (text) - Unique username
  - `role` (text) - User role: client, attorney, admin
  - `avatar_url` (text) - Avatar image URL
  - `website` (text) - User website
  - `phone` (text) - Phone number
  - `created_at` (timestamp) - Account creation date
  - `updated_at` (timestamp) - Last update date

### Storage Buckets

- **`avatars`** - User profile pictures
  - Public read access
  - Users can only modify their own avatars

### Functions

- **`handle_new_user()`** - Automatically creates profile when user signs up

### Triggers

- **`on_auth_user_created`** - Fires `handle_new_user()` on user creation

## Troubleshooting

### Migration Already Applied

If you see "already exists" errors, the migration may have been partially applied. Check:

```sql
-- Check if table exists
SELECT * FROM information_schema.tables WHERE table_name = 'profiles';

-- Check if function exists
SELECT * FROM pg_proc WHERE proname = 'handle_new_user';

-- Check if trigger exists
SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';
```

### Rollback

To rollback changes (be careful!):

```sql
-- Drop trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop function
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
-- ... etc
```

## Resources

- [Supabase Migrations Docs](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli/introduction)
- [SQL Editor](https://supabase.com/docs/guides/database/overview#sql-editor)

