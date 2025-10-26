# Supabase Integration Guide

This guide walks you through connecting your app to a real Supabase backend.

## Prerequisites

- A Supabase account (free tier works)
- Basic understanding of SQL and authentication

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project:
   - Project name: `your-app-name`
   - Database password: (save this securely)
   - Region: Choose closest to your users

Wait 2-3 minutes for project creation.

## Step 2: Get API Credentials

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon public** key (safe to use in mobile app)

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Restart your development server:
```bash
npm start
```

## Step 4: Set Up Database Schema

### Create Users Table

Run this SQL in Supabase SQL Editor:

```sql
-- Create users table with role information
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text not null check (role in ('client', 'attorney', 'admin')),
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;

-- Create policy: Users can read their own data
create policy "Users can view own user data"
  on public.users
  for select
  using (auth.uid() = id);

-- Create policy: Users can update their own data
create policy "Users can update own user data"
  on public.users
  for update
  using (auth.uid() = id);

-- Create policy: Admins can view all users
create policy "Admins can view all users"
  on public.users
  for select
  using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create trigger to automatically create user record
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, role, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create user record on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## Step 5: Update Auth Functions

The app is already configured to use real Supabase! The `lib/auth.ts` file automatically detects when real credentials are provided.

### How it works:

1. `lib/api.ts` checks if credentials are real or placeholder
2. `lib/auth.ts` switches between mock and real Supabase based on config
3. No code changes needed - just add credentials!

### Verify Integration

Check `lib/api.ts`:
```tsx
export function isSupabaseConfigured(): boolean {
  return (
    CONFIG.SUPABASE.URL !== "https://placeholder.supabase.co" &&
    CONFIG.SUPABASE.ANON_KEY !== "placeholder-anon-key"
  );
}
```

When configured, all auth functions will use real Supabase.

## Step 6: Configure Email Settings (Optional)

### Enable Email Auth

1. Go to Authentication → Providers
2. Enable "Email" provider
3. Configure email templates:
   - Confirmation email
   - Password recovery
   - Magic link

### Custom SMTP (Production)

For production, configure custom SMTP:

1. Go to Project Settings → Auth
2. Scroll to "SMTP Settings"
3. Add your SMTP credentials:
   - Host: smtp.sendgrid.net (or your provider)
   - Port: 587
   - Username: apikey
   - Password: your-sendgrid-api-key

## Step 7: Test Authentication

### Test Registration

1. Open app and go to Register
2. Fill in details and select a role
3. Check Supabase dashboard:
   - Authentication → Users (should see new user)
   - Table Editor → users (should see user record with role)

### Test Login

1. Log in with registered credentials
2. Should redirect to role-specific dashboard
3. Check browser/app storage for auth token

### Test Role-Based Access

1. Log in as client
2. Try accessing attorney routes (should be blocked)
3. Log out and log in as admin
4. Should access all routes

## Step 8: Advanced Configuration

### Refresh Tokens

Update `lib/api.ts` to enable auto-refresh:

```tsx
export const supabase = createClient(
  CONFIG.SUPABASE.URL,
  CONFIG.SUPABASE.ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,  // Enable this
      persistSession: true,     // Enable this
    },
  }
);
```

### Session Persistence

The app already uses SecureStore for token persistence. Sessions survive app restarts.

### Multi-Factor Authentication (MFA)

To enable MFA:

1. Update Supabase settings to enable MFA
2. Add MFA screens to app/(auth)
3. Update login flow in lib/auth.ts

## Step 9: Production Checklist

Before going live:

- [ ] Enable Row Level Security on all tables
- [ ] Configure custom SMTP for emails
- [ ] Set up password policies in Supabase
- [ ] Enable email verification requirement
- [ ] Add rate limiting for auth endpoints
- [ ] Set up monitoring and alerts
- [ ] Test all auth flows thoroughly
- [ ] Secure .env file (never commit it!)
- [ ] Use different Supabase projects for dev/staging/prod

## Troubleshooting

### "Invalid API Key" Error

- Verify EXPO_PUBLIC_SUPABASE_ANON_KEY is correct
- Check for extra spaces in .env file
- Restart expo with `npm start --reset-cache`

### Users Table Not Created

- Run the SQL schema in Step 4
- Check SQL editor for errors
- Ensure RLS is enabled

### Registration Works But No User Record

- Check the trigger function is created
- Verify function has SECURITY DEFINER
- Check Supabase logs for errors

### Email Not Sending

- Verify email provider is enabled
- Check SMTP settings
- Test email in Supabase dashboard
- Check spam folder

### Auth State Not Persisting

- Verify SecureStore permissions
- Check initialize() is called in root layout
- Clear app data and test fresh install

## Database Schema Examples

### Cases Table

```sql
create table public.cases (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.users(id) not null,
  attorney_id uuid references public.users(id),
  title text not null,
  status text not null check (status in ('pending', 'in_progress', 'completed')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.cases enable row level security;

-- Clients can view their own cases
create policy "Clients can view own cases"
  on public.cases for select
  using (client_id = auth.uid());

-- Attorneys can view assigned cases
create policy "Attorneys can view assigned cases"
  on public.cases for select
  using (attorney_id = auth.uid());

-- Admins can view all cases
create policy "Admins can view all cases"
  on public.cases for select
  using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth with React Native](https://supabase.com/docs/guides/auth/quickstarts/react-native)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)

## Next Steps

1. **Set up database tables** for your specific use case
2. **Configure RLS policies** for data security
3. **Add API functions** in lib/ for CRUD operations
4. **Test thoroughly** with all three user roles
5. **Deploy to production** with proper environment separation

