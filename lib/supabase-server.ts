import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || "https://acesalquiler-supabase.igc7oi.easypanel.host"
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "tu-service-role-key-aqui"

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
