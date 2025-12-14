'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'

export default function AgentProfile() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data)
    }

    loadProfile()
  }, [])

  if (!profile) return <p>Loading...</p>

  return (
    <div>
      <h1>My Profile</h1>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  )
}
