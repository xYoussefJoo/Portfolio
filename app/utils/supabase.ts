import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Type definitions
export interface SectionItem {
  id?: string;
  key: string;
  value: string;
  updated_at?: string;
}

export interface FeedbackItem {
  id: string;
  name: string;
  message: string;
  rating?: number | null;
  status: "pending" | "approved";
  avatar_url?: string | null;
  role?: string | null;
  company?: string | null;
  country?: string | null;
  created_at: string;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  created_at?: string;
}

const SUPABASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) ||
  "https://gunjvczafsqdxoonbxfz.supabase.co";

const SUPABASE_ANON_KEY =
  (typeof import.meta !== "undefined" &&
    (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
      import.meta.env?.VITE_SUPABASE_ANON_KEY)) ||
  (typeof process !== "undefined" &&
    (process.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
      process.env?.VITE_SUPABASE_ANON_KEY)) ||
  "sb_publishable_iJDOE_A-9EjhKJ5hN7IUvw_0Q4E4NAL";

export const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { SUPABASE_URL, SUPABASE_ANON_KEY };
