'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { SITE_CONFIG } from '@/lib/constants'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/art', label: 'Art' },
  { href: '/artists', label: 'Artists' },
  { href: '/blog', label: 'Blog' },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className='md:hidden'>
      <button onClick={() => setIsOpen(true)} aria-label='Open navigation'>
        <Menu className='h-6 w-6' />
      </button>
      {isOpen && (
        <div
          className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300'
          onClick={() => setIsOpen(false)}
        >
          <div
            className='absolute left-0 top-0 h-full w-4/5 max-w-sm bg-background p-6 border-r border-black transform transition-transform duration-300 ease-out'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center'>
              <Link href='/' className='flex items-center space-x-2' onClick={() => setIsOpen(false)}>
                <Logo className='h-8 w-8' />
                <span className='font-display text-xl font-bold uppercase tracking-tighter'>{SITE_CONFIG.name}</span>
              </Link>
              <button onClick={() => setIsOpen(false)} aria-label='Close navigation'>
                <X className='h-6 w-6' />
              </button>
            </div>
            <nav className='mt-8 flex flex-col space-y-4'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='text-xl font-medium text-foreground/80 hover:text-foreground'
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
