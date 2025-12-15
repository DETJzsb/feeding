import { supabase } from "./supabase.js";

const { data: session } = await supabase.auth.getSession();

if (!session.session) {
  window.location.href = "login.html";
}

const { data: profile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", session.session.user.id)
  .single();

if (profile.role === "agent") {
  window.location.href = "agent.html";
} else {
  window.location.href = "admin.html";
}
