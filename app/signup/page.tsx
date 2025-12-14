'use client'

import { useState } from 'react'
import { supabase } from '@/src/lib/supabase'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signup() {
    await supabase.auth.signUp({
      email,
      password,
    })
    window.location.href = '/dashboard'
  }

  return (
    <div>
      <h1>Signup</h1>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Create account</button>
    </div>
  )
}
