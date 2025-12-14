(async () => {
  console.log("redirect.js loaded")

  const { data: { user } } = await window.supabase.auth.getUser()

  if (!user) {
    window.location.href = "login.html"
    return
  }

  const { data, error } = await window.supabase
    .from("users")
    .select("roles(code)")
    .eq("id", user.id)
    .single()

  if (error) {
    console.error(error)
    alert("DB error")
    return
  }

  const role = data.roles.code

  if (role === "agent") window.location.href = "agent.html"
  else if (role === "admin") window.location.href = "admin.html"
  else alert("Unknown role")
})()
