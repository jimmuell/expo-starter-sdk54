/**
 * Supabase API client initialization
 * 
 * This is a placeholder implementation with mock credentials.
 * Replace with real Supabase URL and anon key when ready.
 */

import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "../constants/config";
import { SupabaseStorageAdapter } from "./storage";

/**
 * Supabase client instance
 * 
 * To use real Supabase:
 * 1. Create a project at https://supabase.com
 * 2. Get your project URL and anon key
 * 3. Add them to .env file
 * 4. The CONFIG will automatically use them
 */
export const supabase = createClient(
  CONFIG.SUPABASE.URL,
  CONFIG.SUPABASE.ANON_KEY,
  {
    auth: {
      // Enable auto refresh token for production use
      autoRefreshToken: true,
      persistSession: true,
      // Use SecureStore on native, localStorage on web
      storage: SupabaseStorageAdapter,
      detectSessionInUrl: false, // Disable for React Native
    },
  }
);

/**
 * Check if Supabase is configured with real credentials
 */
export function isSupabaseConfigured(): boolean {
  return (
    CONFIG.SUPABASE.URL !== "https://placeholder.supabase.co" &&
    CONFIG.SUPABASE.ANON_KEY !== "placeholder-anon-key"
  );
}

