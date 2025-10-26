/**
 * Platform-aware secure storage wrapper
 * Uses SecureStore on iOS/Android and localStorage on web
 * Provides type-safe methods for storing and retrieving auth data
 */

import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { CONFIG } from "../constants/config";
import { User } from "../types/user";

/**
 * Platform detection
 */
const isWeb = Platform.OS === "web";

/**
 * Platform-aware storage helpers
 */
async function setItemAsync(key: string, value: string): Promise<void> {
  if (isWeb) {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function getItemAsync(key: string): Promise<string | null> {
  if (isWeb) {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

async function deleteItemAsync(key: string): Promise<void> {
  if (isWeb) {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

/**
 * Save authentication token securely
 */
export async function saveToken(token: string): Promise<void> {
  try {
    await setItemAsync(CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
}

/**
 * Retrieve authentication token
 */
export async function getToken(): Promise<string | null> {
  try {
    return await getItemAsync(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

/**
 * Delete authentication token
 */
export async function deleteToken(): Promise<void> {
  try {
    await deleteItemAsync(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error("Error deleting token:", error);
  }
}

/**
 * Save user data securely
 */
export async function saveUser(user: User): Promise<void> {
  try {
    const userJson = JSON.stringify(user);
    await setItemAsync(CONFIG.STORAGE_KEYS.USER_DATA, userJson);
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
}

/**
 * Retrieve user data
 */
export async function getUser(): Promise<User | null> {
  try {
    const userJson = await getItemAsync(CONFIG.STORAGE_KEYS.USER_DATA);
    if (!userJson) return null;
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

/**
 * Delete user data
 */
export async function deleteUser(): Promise<void> {
  try {
    await deleteItemAsync(CONFIG.STORAGE_KEYS.USER_DATA);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

/**
 * Clear all auth data
 */
export async function clearAuthData(): Promise<void> {
  await Promise.all([deleteToken(), deleteUser()]);
}

/**
 * Supabase custom storage adapter
 * Uses SecureStore on native, localStorage on web
 */
export const SupabaseStorageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    return await getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await setItemAsync(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    await deleteItemAsync(key);
  },
};

