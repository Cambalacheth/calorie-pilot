// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jehbyuwhcqxzxbxlkcpi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplaGJ5dXdoY3F4enhieGxrY3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNjk1ODksImV4cCI6MjA1NTY0NTU4OX0.jBZC2BEjyD0DIQMdoTomdliTSe9SCpBh_OY0fjS51Gc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);