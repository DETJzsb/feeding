document.getElementById("signupBtn").addEventListener("click", signup)

async function signup() {
  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()

  console.log("EMAIL =", email)
  console.log("PASSWORD =", password)

  if (!email || !password) {
    alert("Email and password required")
    return
  }

  const { data, error } = await window.supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    alert("Signup OK")
    window.location.href = "login.html"
  }
}
