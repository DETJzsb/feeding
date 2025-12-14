import { supabase } from "./supabase.js";

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 1️⃣ Signup (Auth only)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  // 2️⃣ Insert signup request
  const { error: dbError } = await supabase
    .from("signup_requests")
    .insert({
      id: user.id,        // نفس id متاع auth
      email: email,
      status: "pending",
    });

  if (dbError) {
    alert("Database error saving new user");
    console.error(dbError);
    return;
  }

  alert("Signup request sent. Wait for approval.");
}
