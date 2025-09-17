import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createServerClient()
  const { data: artwork } = await supabase
    .from('artworks')
    .select('title, description, image_url')
    .eq('id', params.id)
    .single()

  if (!artwork) {
    return {
      title: 'Artwork Not Found',
    }
  }

  return {
    title: artwork.title,
    description: artwork.description,
    openGraph: {
      title: artwork.title,
      description: artwork.description ?? undefined,
      images: [artwork.image_url],
    },
  }
}

export default async function ArtworkDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const { data: artwork } = await supabase
    .from('artworks')
    .select('*, profiles(username, avatar_url, full_name, artist_bio)')
    .eq('id', params.id)
    .single()

  if (!artwork) {
    notFound()
  }

  const artist = Array.isArray(artwork.profiles) ? artwork.profiles[0] : artwork.profiles

  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='grid md:grid-cols-2 gap-8 md:gap-12'>
        <div className='border-2 border-black dark:border-white rounded-lg overflow-hidden'>
          <Image
            src={artwork.image_url ?? 'https://placehold.co/800x800'}
            alt={artwork.title}
            width={800}
            height={800}
            className='w-full h-auto object-cover'
          />
        </div>
        <div>
          <h1 className='text-3xl md:text-5xl font-display uppercase tracking-tight'>{artwork.title}</h1>
          {artist && (
            <Link href={`/artist/${artist.username}`} className='group inline-flex items-center gap-2 mt-4'>
              <Avatar>
                <AvatarImage src={artist.avatar_url ?? undefined} />
                <AvatarFallback>{artist.full_name?.charAt(0) ?? 'A'}</AvatarFallback>
              </Avatar>
              <span className='font-semibold group-hover:underline'>{artist.full_name ?? artist.username}</span>
            </Link>
          )}
          <p className='text-3xl font-bold text-brand-blue mt-6'>
            ${artwork.price}
          </p>
          <div className='mt-6 prose dark:prose-invert max-w-full'>
            <p>{artwork.description}</p>
          </div>
          <div className='mt-6 space-y-2 text-sm text-muted-foreground'>
            {artwork.type && <p><strong>Type:</strong> <span className='capitalize'>{artwork.type}</span></p>}
            {artwork.dimensions && <p><strong>Dimensions:</strong> {artwork.dimensions}</p>}
          </div>
          <Button asChild size='lg' className='mt-8 w-full md:w-auto font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-all duration-200 bg-brand-red hover:bg-brand-blue text-white uppercase tracking-tight transform hover:-translate-x-1 hover:-translate-y-1'>
            <Link href='/checkout'>Buy Now</Link>
          </Button>
        </div>
      </div>

      {artist && (
        <div className='mt-16 pt-8 border-t'>
          <h2 className='text-2xl font-display'>About the Artist</h2>
          <div className='flex items-start gap-4 mt-4'>
            <Avatar className='h-16 w-16'>
              <AvatarImage src={artist.avatar_url ?? undefined} />
              <AvatarFallback>{artist.full_name?.charAt(0) ?? 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className='font-bold text-lg'>{artist.full_name ?? artist.username}</h3>
              <p className='text-muted-foreground mt-1 max-w-prose'>{artist.artist_bio ?? 'This artist has not provided a bio yet.'}</p>
              <Button asChild variant='link' className='p-0 h-auto mt-2 text-brand-blue hover:text-brand-red font-bold uppercase tracking-tight transition-colors duration-200'>
                <Link href={`/artist/${artist.username}`}>View Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
