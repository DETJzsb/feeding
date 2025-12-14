
async function guardRole(expectedRole) {
const { data: { user } } = await supabase.auth.getUser()
if (!user) {
window.location.href = "login.html"
return
}


const { data } = await supabase
.from('users')
.select('roles(code)')
.eq('id', user.id)
.single()


if (data.roles.code !== expectedRole) {
alert('Access denied')
window.location.href = "index.html"
}
}
