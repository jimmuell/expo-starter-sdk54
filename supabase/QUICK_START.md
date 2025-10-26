# Quick Start - Supabase Database Setup

## 🚀 Apply Migrations to Your Database

### Step 1: Open Supabase SQL Editor

1. Go to https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **+ New Query**

### Step 2: Run Migration 1 - Profiles Setup

1. Open: `supabase/migrations/20250126000001_initial_profiles_setup.sql`
2. Copy **entire file** contents
3. Paste into SQL Editor
4. Click **Run** (or Cmd/Ctrl + Enter)
5. ✅ Should see "Success. No rows returned"

### Step 3: Run Migration 2 - Storage Setup

1. Open: `supabase/migrations/20250126000002_storage_setup.sql`
2. Copy **entire file** contents
3. Paste into SQL Editor
4. Click **Run** (or Cmd/Ctrl + Enter)
5. ✅ Should see "Success. No rows returned"

### Step 4: Verify Setup

**Check Profiles Table:**
- Go to **Table Editor** → **profiles**
- Should see columns: id, email, full_name, role, etc.

**Check Trigger:**
- Go to **Database** → **Triggers**
- Should see: `on_auth_user_created`

**Check Storage:**
- Go to **Storage**
- Should see bucket: `avatars`

## ✅ Done!

Your database is now ready. Try creating a user in your app!

## 📚 Need More Info?

- Full docs: `supabase/migrations/README.md`
- Setup guide: `SETUP_INSTRUCTIONS.md`
- Supabase integration: `docs/SUPABASE_SETUP.md`

