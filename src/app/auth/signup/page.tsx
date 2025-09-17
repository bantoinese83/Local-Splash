import { AuthForm } from '@/components/auth/auth-form'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create an account to start buying and selling local art.',
}

export default function SignupPage() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-brand-red to-brand-yellow'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px]'>
        <div className='flex flex-col space-y-4 text-center'>
          <h1 className='font-display text-4xl font-bold tracking-tighter uppercase text-black'>
            Join the Art Revolution
          </h1>
          <p className='text-lg text-black font-semibold'>
            Start your creative journey with local artists
          </p>
        </div>
        <AuthForm view='sign_up' />
        <div className='text-center'>
          <p className='text-black text-sm'>
            Already have an account?{' '}
            <a href='/auth/login' className='font-bold text-brand-blue hover:text-brand-red transition-colors duration-200 uppercase tracking-tight'>
              Enter the Art Zone
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
