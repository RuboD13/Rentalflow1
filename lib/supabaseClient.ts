import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://acesalquiler-supabase.igc7oi.easypanel.host"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "tu-anon-key-aqui"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
