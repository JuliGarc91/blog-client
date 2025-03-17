import { createClient } from '@supabase/supabase-js';

// Use the correct VITE_ prefixed environment variable
const supabaseUrl = 'https://fsfiittqvisqdeekwssh.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Use import.meta.env for Vite

if (!supabaseKey) {
  throw new Error('Supabase key is missing!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;