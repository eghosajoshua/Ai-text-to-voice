import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://oihsbnidciwfdtznmxdo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9paHNibmlkY2l3ZmR0em5teGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMTQyODEsImV4cCI6MjAyOTg5MDI4MX0.GZSPntrPaGIjH-9quG8fasU0fNttvH5hc-7tRlsgpz4"
);
export default supabase;
