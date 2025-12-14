import { supabase } from "./supabase.js";

/* ========== SIGNUP ========== */
window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("full_name").value;

  // 1. create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // 2. insert signup request (PENDING)
  const { error: dbError } = await supabase
    .from("signup_requests")
    .insert({
      email: email,
      full_name: fullName,
      status: "pending"
    });

  if (dbError) {
    alert("Database error saving new user");
    return;
  }

  alert("Signup request sent. Wait for approval.");
};

/* ========== LOGIN ========== */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // check approval
  const { data: req } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (!req) {
    alert("Account not approved yet");
    await supabase.auth.signOut();
    return;
  }

  window.location.href = "index.html";
};
