import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have valid environment variables
const hasValidConfig = 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder-key' &&
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co');

// Create a mock client that throws helpful errors when Supabase is not configured
const createMockClient = () => {
  const mockError = () => {
    throw new Error('Supabase is not configured. Please set up your Supabase project and update the environment variables in .env file.');
  };

  return {
    auth: {
      signUp: mockError,
      signInWithPassword: mockError,
      signOut: mockError,
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: mockError,
      insert: mockError,
      update: mockError,
      delete: mockError,
      upsert: mockError
    })
  };
};

export const supabase = hasValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient() as any;

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          priority: 'high' | 'medium' | 'low';
          status: 'pending' | 'completed';
          due_date: string | null;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          priority?: 'high' | 'medium' | 'low';
          status?: 'pending' | 'completed';
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          priority?: 'high' | 'medium' | 'low';
          status?: 'pending' | 'completed';
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
        };
      };
    };
  };
};