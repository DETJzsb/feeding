(async () => {
  // 1️⃣ نتحقّق user موجود
  const { data: { user } } = await window.supabase.auth.getUser()

  if (!user) {
    window.location.href = "login.html"
    return
  }

  // 2️⃣ نجيب profile من DB
  const { data, error } = await window.supabase
    .from("users")
    .select(`
      matricule,
      full_name,
      roles (
        label
      )
    `)
    .eq("id", user.id)
    .single()

  if (error) {
    console.error(error)
    document.getElementById("profile").innerText = "Error loading profile"
    return
  }

  // 3️⃣ نعرض البيانات
  document.getElementById("profile").innerHTML = `
    <p><strong>Matricule:</strong> ${data.matricule || "-"}</p>
    <p><strong>Full name:</strong> ${data.full_name || "-"}</p>
    <p><strong>Role:</strong> ${data.roles.label}</p>
  `
})()
