import { supabase } from "./supabase.js";

/* signup */
window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("full_name").value;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return alert(error.message);

  const { error: dbError } = await supabase
    .from("signup_requests")
    .insert({ email, full_name: fullName, status: "pending" });

  if (dbError) return alert("Database error");

  alert("Signup request sent");
};

/* login */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert(error.message);

  const { data: user } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (!user) {
    await supabase.auth.signOut();
    return alert("Account not approved yet");
  }

  window.location.href = "index.html";
};
