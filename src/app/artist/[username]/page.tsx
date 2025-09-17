import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArtworkGrid } from '@/components/art/artwork-grid'
import { Globe } from 'lucide-react'

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const supabase = createServerClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, artist_bio, avatar_url')
    .eq('username', params.username)
    .single()

  if (!profile) {
    return { title: 'Artist Not Found' }
  }

  return {
    title: profile.full_name ?? params.username,
    description: profile.artist_bio,
    openGraph: {
      title: profile.full_name ?? params.username,
      description: profile.artist_bio ?? undefined,
      images: profile.avatar_url ? [profile.avatar_url] : [],
    },
  }
}

export default async function ArtistProfilePage({ params }: { params: { username: string } }) {
  const supabase = createServerClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single()

  if (!profile) {
    notFound()
  }

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*, profiles(username, avatar_url, full_name)')
    .eq('artist_id', profile.id)
    .order('created_at', { ascending: false })

  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <header className='flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12'>
        <Avatar className='h-32 w-32 border-4 border-black dark:border-white'>
          <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.full_name ?? ''} />
          <AvatarFallback className='text-4xl'>{profile.full_name?.charAt(0) ?? 'A'}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className='text-4xl md:text-5xl font-display'>{profile.full_name ?? profile.username}</h1>
          <p className='mt-2 text-muted-foreground max-w-prose'>{profile.artist_bio ?? 'A passionate local artist.'}</p>
          {profile.website && (
            <a href={profile.website} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 mt-3 text-sm text-brand-blue hover:underline'>
              <Globe size={16} />
              {profile.website}
            </a>
          )}
        </div>
      </header>

      <main>
        <h2 className='text-3xl font-display uppercase text-brand-blue'>Artwork</h2>
        <div className='mt-6'>
          {artworks && artworks.length > 0 ? (
            <ArtworkGrid artworks={artworks} />
          ) : (
            <p className='text-muted-foreground py-8 text-center border-2 border-dashed rounded-lg'>This artist hasn't uploaded any artwork yet.</p>
          )}
        </div>
      </main>
    </div>
  )
}
