/**
 * Application configuration
 * 
 * Note: In production, these should come from environment variables
 * For now, these are placeholders for the structure implementation
 */

export const CONFIG = {
  // Supabase configuration (placeholder)
  SUPABASE: {
    URL: process.env.EXPO_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
  },
  
  // App metadata
  APP: {
    NAME: "Legal App",
    VERSION: "1.0.0",
  },
  
  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: "auth_token",
    USER_DATA: "user_data",
    REFRESH_TOKEN: "refresh_token",
  },
} as const;

