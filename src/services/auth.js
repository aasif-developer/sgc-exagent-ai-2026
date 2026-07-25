// src/services/auth.js

import { supabase } from "./supabase";

/**
 * Login with email & password
 */
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    data,
    error,
  };
};

/**
 * Logout current user
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  return {
    error,
  };
};

/**
 * Get current logged-in user
 */
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    user,
    error,
  };
};

/**
 * Get current session
 */
export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return {
    session,
    error,
  };
};

/**
 * Listen for authentication state changes
 * (login, logout, session refresh)
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};

/**
 * Get logged-in user's profile
 */
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return {
    data,
    error,
  };
};