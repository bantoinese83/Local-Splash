import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/art', label: 'Art' },
  { href: '/artists', label: 'Artists' },
  { href: '/blog', label: 'Blog' },
]

export function MainNav() {
  return (
    <div className='hidden md:flex gap-6 md:gap-10'>
      <Link href='/' className='flex items-center space-x-2'>
        <Logo className='h-8 w-8' />
        <span className='inline-block font-display text-2xl font-bold uppercase tracking-tighter'>{SITE_CONFIG.name}</span>
      </Link>
      <nav className='flex gap-6 items-center'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center text-lg font-bold text-muted-foreground sm:text-sm hover:text-brand-blue transition-colors duration-200 uppercase tracking-tight'
            )}
          >
            {item.label}
          </Link>
        ))}
        <Button asChild size='sm' className='font-bold border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-none transition-shadow duration-200'>
          <Link href='/auth/signup'>Become an Artist</Link>
        </Button>
      </nav>
    </div>
  )
}
