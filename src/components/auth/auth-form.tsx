'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { toast } from 'sonner' // Temporarily disabled
import { Loader2 } from 'lucide-react'

export function AuthForm({ view = 'sign_in' }: { view?: 'sign_in' | 'sign_up' }) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    let error
    if (view === 'sign_in') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      error = signInError
    } else {
      const { error: signUpError } = await supabase.auth.signUp({ email, password })
      if (!signUpError) {
        alert('Check your email for the confirmation link.')
      } 
      error = signUpError
    }

    if (error) {
      alert(`Error: ${error.message}`)
    }
    
    setIsLoading(false)
  }

  return (
    <div className='bg-brand-yellow border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_#000]'>
      <form onSubmit={handleAuth} className='grid gap-6'>
        <div className='grid gap-2'>
          <Label htmlFor='email' className='text-black font-bold uppercase tracking-tight'>
            Email Address
          </Label>
          <Input 
            id='email' 
            name='email' 
            type='email' 
            placeholder='your@email.com' 
            required 
            className='border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password' className='text-black font-bold uppercase tracking-tight'>
            Password
          </Label>
          <Input 
            id='password' 
            name='password' 
            type='password' 
            required 
            className='border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
          />
        </div>
        <Button 
          type='submit' 
          className='w-full font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-all duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight transform hover:-translate-x-1 hover:-translate-y-1' 
          disabled={isLoading}
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {view === 'sign_in' ? 'Enter the Art Zone' : 'Join the Community'}
        </Button>
      </form>
    </div>
  )
}
