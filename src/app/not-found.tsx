import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center'>
      <h1 className='text-8xl md:text-9xl font-display text-brand-blue'>404</h1>
      <h2 className='mt-4 text-3xl font-semibold tracking-tight'>Page Not Found</h2>
      <p className='mt-2 text-lg text-muted-foreground'>Sorry, we couldn’t find the page you’re looking for.</p>
      <Button asChild className='mt-6'>
        <Link href='/'>Go back home</Link>
      </Button>
    </div>
  )
}
