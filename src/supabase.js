import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://niuikeniimuzyxqsafgk.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdWlrZW5paW11enl4cXNhZmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMTk0OTksImV4cCI6MjA5MDY5NTQ5OX0.DdxJd73brzD9wYXC_DVtHlayemW747WRxmrn64d7AyE"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)