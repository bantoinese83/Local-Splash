import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { MainNav } from '@/components/layout/main-nav'
import { UserNav } from '@/components/auth/user-nav'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { MobileNav } from '@/components/layout/mobile-nav'

export async function SiteHeader() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className='sticky top-0 z-50 w-full border-b border-black bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center'>
        <MainNav />
        <MobileNav />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            {user ? (
              <UserNav user={user} />
            ) : (
              <Button asChild variant='outline' className='border-2 border-black font-bold'>
                <Link href='/auth/login'>Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
