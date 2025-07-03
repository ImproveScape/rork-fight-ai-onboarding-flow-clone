import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rbbudfcsthzgdwdwvpln.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiYnVkZmNzdGh6Z2R3ZHd2cGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk4NTgsImV4cCI6MjA2NTc5NTg1OH0.9DMns-wx4DUP9MvPB_oKy4Pfqa7gJB0bbfeAh2aCdNc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);