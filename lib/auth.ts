/**
 * Authentication service layer
 * 
 * This is a PLACEHOLDER implementation with mock data.
 * Replace these functions with real Supabase calls when ready.
 */

import { LoginCredentials, RegisterData, User } from "../types/user";
import { isSupabaseConfigured, supabase } from "./api";
import { clearAuthData, getUser, saveToken, saveUser } from "./storage";

/**
 * Mock user database for placeholder implementation
 */
const MOCK_USERS = [
  {
    id: "1",
    email: "jimmuell@aol.com",
    password: "12345678",
    role: "client" as const,
    fullName: "Jim Mueller",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "perry.mason@law.com",
    password: "12345678",
    role: "attorney" as const,
    fullName: "Perry Mason",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "admin@linktolawyers.com",
    password: "12345678",
    role: "admin" as const,
    fullName: "Admin User",
    createdAt: new Date().toISOString(),
  },
];

/**
 * Simulate API delay for realistic UX
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Login with email and password
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  if (isSupabaseConfigured()) {
    // Real Supabase implementation
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Login failed");

    // Fetch user role from your profiles table
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("role, full_name, email")
      .eq("id", data.user.id)
      .single();

    if (userError) {
      // If user data doesn't exist, sign out and throw error
      await supabase.auth.signOut();
      throw new Error("User profile not found. Please contact support.");
    }

    const user: User = {
      id: data.user.id,
      email: userData.email || data.user.email!,
      role: userData.role,
      fullName: userData.full_name,
      createdAt: data.user.created_at,
    };

    // Save user data locally for quick access
    await saveUser(user);

    return user;
  }

  // Mock implementation for development without Supabase
  await delay(800);
  const mockUser = MOCK_USERS.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!mockUser) {
    throw new Error("Invalid email or password");
  }

  const { password, ...userWithoutPassword } = mockUser;
  const user = userWithoutPassword as User;

  await saveToken(`mock-token-${user.id}`);
  await saveUser(user);

  return user;
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<User> {
  if (isSupabaseConfigured()) {
    // Real Supabase implementation
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          role: data.role,
        },
      },
    });

    if (error) throw new Error(error.message);
    if (!authData.user) throw new Error("Registration failed");

    // The user profile will be created automatically by the database trigger
    // Wait a moment for the trigger to complete
    await delay(500);

    // Fetch the created user profile
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("role, full_name, email")
      .eq("id", authData.user.id)
      .single();

    if (userError) {
      throw new Error("User profile creation failed. Please try again.");
    }

    const user: User = {
      id: authData.user.id,
      email: userData.email || data.email,
      role: userData.role,
      fullName: userData.full_name,
      createdAt: authData.user.created_at,
    };

    // Save user data locally for quick access
    await saveUser(user);

    return user;
  }

  // Mock implementation for development without Supabase
  await delay(1000);
  const existingUser = MOCK_USERS.find((u) => u.email === data.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user: User = {
    id: `mock-${Date.now()}`,
    email: data.email,
    role: data.role,
    fullName: data.fullName,
    createdAt: new Date().toISOString(),
  };

  await saveToken(`mock-token-${user.id}`);
  await saveUser(user);

  return user;
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
  if (isSupabaseConfigured()) {
    await supabase.auth.signOut();
  }

  await clearAuthData();
}

/**
 * Get currently logged in user
 */
export async function getCurrentUser(): Promise<User | null> {
  if (isSupabaseConfigured()) {
    // Check Supabase session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      await clearAuthData();
      return null;
    }

    // Try to get user from local storage first
    let user = await getUser();
    
    // If not in storage or email doesn't match, fetch from database
    if (!user || user.email !== session.user.email) {
      const { data: userData, error } = await supabase
        .from("profiles")
        .select("role, full_name, email")
        .eq("id", session.user.id)
        .single();

      if (error || !userData) {
        await clearAuthData();
        return null;
      }

      user = {
        id: session.user.id,
        email: userData.email || session.user.email!,
        role: userData.role,
        fullName: userData.full_name,
        createdAt: session.user.created_at,
      };

      await saveUser(user);
    }

    return user;
  }

  // Mock implementation
  return await getUser();
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'myapp://reset-password', // Deep link for mobile app
    });
    if (error) throw new Error(error.message);
    return;
  }

  // Mock implementation for development
  await delay(1000);
  console.log(`Password reset email sent to: ${email}`);
}

/**
 * Verify email with token
 */
export async function verifyEmail(token: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: "email",
    });
    if (error) throw new Error(error.message);
    return;
  }

  // Mock implementation for development
  await delay(1000);
  console.log(`Email verified with token: ${token}`);
}

