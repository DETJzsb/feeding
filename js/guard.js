import { supabase } from "./supabase.js";

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Wrong email or password");
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("approved, role")
    .eq("id", data.user.id)
    .single();

  if (!profile.approved) {
    await supabase.auth.signOut();
    alert("Account not approved yet");
    return;
  }

  window.location.href = "index.html";
};
