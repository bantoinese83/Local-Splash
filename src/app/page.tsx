import { createServerClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArtworkGrid } from '@/components/art/artwork-grid'
import { SITE_CONFIG } from '@/lib/constants'

export default async function HomePage() {
  const supabase = createServerClient()
  const { data: artworks } = await supabase
    .from('artworks')
    .select('*, profiles(username, avatar_url, full_name)')
    .limit(8)
    .order('id', { ascending: false })

  return (
    <div className='container mx-auto px-4 py-8 md:py-16'>
      <section className='text-center py-16 md:py-24 border-2 border-black rounded-lg bg-brand-yellow pattern-dots-md text-black'>
        <h1 className='font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase'>
          Art for Everyone
        </h1>
        <p className='mt-4 text-lg md:text-xl max-w-2xl mx-auto font-semibold'>
          Discover and buy unique, affordable art from emerging local artists in your community.
        </p>
        <div className='mt-8 flex justify-center gap-4'>
          <Button asChild size='lg' className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-all duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight transform hover:-translate-x-1 hover:-translate-y-1'>
            <Link href='/art'>Explore Art</Link>
          </Button>
          <Button asChild size='lg' variant='secondary' className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-all duration-200 bg-brand-yellow hover:bg-brand-blue text-black hover:text-white uppercase tracking-tight transform hover:-translate-x-1 hover:-translate-y-1'>
            <Link href='/auth/signup'>Become an Artist</Link>
          </Button>
        </div>
      </section>

      <section className='py-16'>
        <div className='flex justify-between items-baseline mb-8'>
           <h2 className='text-3xl md:text-4xl font-display uppercase text-brand-blue'>Newest Splashes</h2>
           <Button asChild variant='link' className='text-base text-brand-blue hover:text-brand-red font-bold uppercase tracking-tight transition-colors duration-200'>
             <Link href='/art'>View All &rarr;</Link>
           </Button>
        </div>
        <ArtworkGrid artworks={artworks ?? []} />
      </section>
    </div>
  )
}
