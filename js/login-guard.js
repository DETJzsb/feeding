import { supabase } from "./supabaseClient.js";

const { data: { session } } = await supabase.auth.getSession();

// إذا user déjà connecté → نبعثوه للـ dashboard
if (session) {
  window.location.replace("/dashboard.html");
}
