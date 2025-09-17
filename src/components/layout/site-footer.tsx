import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail,
  Heart,
  ExternalLink
} from 'lucide-react'

const footerSections = [
  {
    title: 'Product',
    links: [
      { href: '/art', label: 'Browse Art' },
      { href: '/artists', label: 'Find Artists' },
      { href: '/auth/signup', label: 'Sell Your Art' },
      { href: '/checkout', label: 'How to Buy' },
    ]
  },
  {
    title: 'Company',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/careers', label: 'Careers' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { href: '/help', label: 'Help Center' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/shipping', label: 'Shipping Info' },
    ]
  },
  {
    title: 'Community',
    links: [
      { href: '/blog', label: 'Artist Stories' },
      { href: '/events', label: 'Local Events' },
      { href: '/guidelines', label: 'Community Guidelines' },
      { href: '/support', label: 'Support Artists' },
    ]
  }
]

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub', icon: Github },
  { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
]

export function SiteFooter() {
  return (
    <footer className='border-t-2 border-black bg-brand-yellow pattern-dots-md text-black'>
      <div className='container py-12 md:py-16'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <Link href='/' className='flex items-center space-x-2 mb-4 group'>
              <Logo className='h-8 w-8' />
              <span className='font-display text-2xl font-bold uppercase tracking-tighter group-hover:text-brand-blue transition-colors duration-200'>
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className='text-black font-semibold mb-6 max-w-sm'>
              Discover and buy unique, affordable art from emerging local artists in your community.
            </p>
            
            {/* Newsletter Signup */}
            <div className='space-y-3 bg-white border-2 border-black rounded-lg p-4 shadow-[4px_4px_0px_#000]'>
              <h3 className='font-bold text-sm uppercase tracking-wide text-black'>Stay Updated</h3>
              <div className='flex gap-2'>
                <Input 
                  type='email' 
                  placeholder='Enter your email' 
                  className='flex-1 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
                />
                <Button 
                  size='sm' 
                  className='shrink-0 font-bold border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-none transition-shadow duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight'
                >
                  <Mail className='h-4 w-4' />
                </Button>
              </div>
              <p className='text-xs text-black font-semibold'>
                Get notified about new artists and exclusive deals.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className='space-y-4'>
              <h3 className='font-bold text-sm uppercase tracking-wide text-black'>
                {section.title}
              </h3>
              <ul className='space-y-3'>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className='text-sm text-black font-semibold hover:text-brand-blue transition-colors duration-200 uppercase tracking-tight'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className='my-8 border-t-2 border-black' />

        {/* Bottom Section */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <p className='text-sm text-black font-bold'>
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.
            </p>
            <div className='flex items-center gap-1 text-sm text-black font-semibold'>
              <span>Built with</span>
              <Heart className='h-4 w-4 text-brand-red fill-current' />
              <span>by</span>
              <Link 
                href='https://monarchmvp.tech' 
                target='_blank' 
                rel='noopener noreferrer'
                className='font-bold text-brand-blue hover:text-brand-red transition-colors duration-200 flex items-center gap-1 uppercase tracking-tight'
              >
                Monarch MVP Tech
                <ExternalLink className='h-3 w-3' />
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className='flex items-center gap-4'>
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.href}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-black hover:text-brand-blue p-2 border-2 border-black rounded-md hover:shadow-[2px_2px_0px_#000] transition-all duration-200'
                  aria-label={social.label}
                >
                  <Icon className='h-5 w-5' />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
