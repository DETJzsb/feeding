import { supabase } from "./supabase.js";

export async function approveUser(userId) {
  const { error } = await supabase
    .from("profiles")
    .update({ approved: true })
    .eq("id", userId);

  if (error) {
    alert("You are not allowed to approve users");
    console.error(error);
    return;
  }

  alert("User approved successfully");
  location.reload();
}
