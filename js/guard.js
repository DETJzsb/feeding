async function guardRole(expectedRole) {
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

  if (error || data.roles.code !== expectedRole) {
    alert("Access denied")
    window.location.href = "index.html"
  }
}

// استعملها هكّا في body onload
// <body onload="guardRole('agent')">
