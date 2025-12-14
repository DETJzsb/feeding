<script>
async function login(email, password) {
const { error } = await supabase.auth.signInWithPassword({ email, password })
if (!error) window.location.href = 'index.html'
else alert(error.message)
}


async function signup(email, password) {
const { error } = await supabase.auth.signUp({ email, password })
if (!error) window.location.href = 'index.html'
else alert(error.message)
}


async function logout() {
await supabase.auth.signOut()
window.location.href = 'login.html'
}
</script>
