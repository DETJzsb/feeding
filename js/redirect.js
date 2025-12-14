<script>
async function redirectUser() {
const { data: { user } } = await supabase.auth.getUser()
if (!user) {
window.location.href = 'login.html'
return
}


const { data } = await supabase
.from('users')
.select('roles(code)')
.eq('id', user.id)
.single()


const role = data.roles.code


if (role === 'agent') window.location.href = 'agent.html'
if (role === 'admin') window.location.href = 'admin.html'
}


redirectUser()
</script>
