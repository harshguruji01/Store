import { createClient as createClientEsm } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const SUPABASE_URL = 'https://wumdbpyhpblvgjttsbpv.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_xLqKY9N62MXb6ELG-5trig_RlJs_n-l';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_ANON_KEY;

// Initialize Supabase: Re-use window.supabaseClient if already created, or create via ESM/window.supabase
let client = null;
if (typeof window !== 'undefined' && window.supabaseClient) {
  client = window.supabaseClient;
} else {
  try {
    client = createClientEsm(supabaseUrl, supabaseKey);
  } catch (err) {
    if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
      client = window.supabase.createClient(supabaseUrl, supabaseKey);
    } else {
      console.error('Failed to initialize Supabase client:', err);
    }
  }
}

export const supabase = client;

// Expose to window for global access across scripts
if (typeof window !== 'undefined') {
  window.supabaseClient = client;
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
}

export default supabase;
