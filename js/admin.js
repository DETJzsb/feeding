import { supabase } from "./supabase.js";

// 🔒 protect page (no agent)
const { data: sessionData } = await supabase.auth.getSession();
if (!sessionData.session) {
  window.location.href = "login.html";
}

const userId = sessionData.session.user.id;

// get my role
const { data: myProfile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", userId)
  .single();

if (myProfile.role === "agent") {
  alert("Access denied");
  window.location.href = "index.html";
}

// load users not approved
const { data: users } = await supabase
  .from("profiles")
  .select("id, role")
  .eq("approved", false);

const table = document.getElementById("users-table");

for (const user of users) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${user.id}</td>
    <td>${user.role}</td>
    <td>
      <button data-id="${user.id}">Approve</button>
    </td>
  `;

  tr.querySelector("button").onclick = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ approved: true })
      .eq("id", user.id);

    if (error) {
      alert("You are not allowed");
    } else {
      alert("User approved");
      tr.remove();
    }
  };

  table.appendChild(tr);
}
