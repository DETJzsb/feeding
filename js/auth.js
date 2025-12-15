import { supabase } from "./supabase.js";

window.signup = async function () {
  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  await supabase.from("profiles").insert({
    id: data.user.id,
    full_name: fullName,
    role: "agent",
    approved: false
  });

  alert("Account created, waiting for approval");
  window.location.href = "login.html";
};
