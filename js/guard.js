import { supabase } from "./supabase.js";

const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  window.location.href = "login.html";
}

const { data: profile } = await supabase
  .from("profiles")
  .select("role, approved")
  .eq("id", user.id)
  .single();

if (!profile.approved) {
  await supabase.auth.signOut();
  alert("Account not approved");
  window.location.href = "login.html";
}

// agent ممنوع يدخل صفحات approval
if (profile.role === "agent") {
  alert("Access denied");
  window.location.href = "index.html";
}
