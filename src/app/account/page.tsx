import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AccountForm } from '@/components/auth/account-form'

export default async function Account() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <h1 className='text-3xl font-display'>Account Settings</h1>
      <p className='text-muted-foreground'>Manage your profile and account information.</p>
      <div className='mt-8'>
        <AccountForm user={user} profile={profile} />
      </div>
    </div>
  )
}
