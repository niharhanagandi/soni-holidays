import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          source_page: string | null;
          name: string;
          email: string;
          phone: string | null;
          trip_type: string | null;
          destination: string | null;
          start_date: string | null;
          end_date: string | null;
          budget: string | null;
          group_size: number | null;
          pace: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'> & { id?: string };
      };
      admins: {
        Row: { id: string; email: string; name: string | null; role: 'owner' | 'editor'; password_hash?: string | null };
        Insert: Partial<Database['public']['Tables']['admins']['Row']> & { email: string };
      };
    };
  };
};

export function createServerSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/ANON_KEY');
  }
  return createClient<Database>(url, key, { auth: { persistSession: false } });
}

