// src/services/supabase.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("dummy-supabase-url")
);

// Provide a dummy fallback client if not configured so the app doesn't crash on load
const activeUrl = isSupabaseConfigured ? supabaseUrl : "https://dummy-supabase-url.supabase.co";
const activeKey = isSupabaseConfigured ? supabaseAnonKey : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15In0.dummy";

export const supabase = createClient(
  activeUrl,
  activeKey
);