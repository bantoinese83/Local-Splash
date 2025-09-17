import { AuthForm } from '@/components/auth/auth-form'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to your Local Splash account.',
}

export default function LoginPage() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-brand-blue to-brand-red'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px]'>
        <div className='flex flex-col space-y-4 text-center'>
          <h1 className='font-display text-4xl font-bold tracking-tighter uppercase text-white'>
            Welcome Back
          </h1>
          <p className='text-lg text-white font-semibold'>
            Enter the vibrant world of local art
          </p>
        </div>
        <AuthForm />
        <div className='text-center'>
          <p className='text-white text-sm'>
            Don't have an account?{' '}
            <a href='/auth/signup' className='font-bold text-brand-yellow hover:text-brand-red transition-colors duration-200 uppercase tracking-tight'>
              Join the Art Community
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
