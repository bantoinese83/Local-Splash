import { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Palette, MapPin, Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Artists - Local Splash',
  description: 'Discover talented local artists and explore their unique creative journeys.',
}

export default async function ArtistsPage() {
  const supabase = createServerClient()
  
  const { data: artists } = await supabase
    .from('profiles')
    .select('*, artworks(id, title, image_url, price)')
    .eq('is_artist', true)
    .order('updated_at', { ascending: false })

  return (
    <div className='container mx-auto px-4 py-8 md:py-16'>
      <div className='text-center mb-12'>
        <h1 className='font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-brand-red'>
          Meet Our Artists
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
          Discover the talented creators behind the art. Each artist brings their unique vision and story to our community.
        </p>
      </div>

      {artists && artists.length > 0 ? (
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {artists.map((artist) => (
            <Card key={artist.id} className='group hover:shadow-lg transition-shadow duration-300 border-2 border-black hover:border-brand-red'>
              <CardHeader className='text-center'>
                <div className='flex justify-center mb-4'>
                  <Avatar className='h-20 w-20 border-2 border-black'>
                    <AvatarImage src={artist.avatar_url ?? undefined} />
                    <AvatarFallback className='text-2xl font-bold'>
                      {artist.full_name?.charAt(0) ?? artist.username?.charAt(0) ?? 'A'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className='text-xl group-hover:text-brand-blue transition-colors duration-200'>
                  {artist.full_name ?? artist.username}
                </CardTitle>
                {artist.artist_bio && (
                  <p className='text-muted-foreground text-sm line-clamp-3 mt-2'>
                    {artist.artist_bio}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Palette className='h-4 w-4' />
                    <span>{artist.artworks?.length ?? 0} artworks</span>
                  </div>
                  
                  {artist.website && (
                    <div className='flex items-center gap-2 text-sm'>
                      <Globe className='h-4 w-4 text-muted-foreground' />
                      <a 
                        href={artist.website} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='text-brand-blue hover:underline'
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  <div className='flex flex-wrap gap-2 mt-4'>
                    <Badge variant='secondary' className='text-xs font-bold border border-black shadow-[1px_1px_0px_#000]'>
                      Local Artist
                    </Badge>
                    {artist.artworks && artist.artworks.length > 0 && (
                      <Badge variant='outline' className='text-xs font-bold border border-black shadow-[1px_1px_0px_#000]'>
                        Active Creator
                      </Badge>
                    )}
                  </div>
                </div>

                <div className='mt-6'>
                  <Button asChild className='w-full font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-all duration-200 bg-brand-yellow hover:bg-brand-red text-black hover:text-white uppercase tracking-tight transform hover:-translate-x-1 hover:-translate-y-1'>
                    <Link href={`/artist/${artist.username}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='text-center py-16'>
          <Card className='inline-block p-8'>
            <CardContent>
              <Palette className='h-16 w-16 mx-auto text-muted-foreground mb-4' />
              <h3 className='text-2xl font-bold mb-4'>No Artists Yet</h3>
              <p className='text-muted-foreground mb-6 max-w-md'>
                We're building our community of talented artists. Be the first to join us!
              </p>
              <Button asChild size='lg' className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-all duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight transform hover:-translate-x-1 hover:-translate-y-1'>
                <Link href='/auth/signup'>Become an Artist</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className='text-center mt-16'>
        <Card className='inline-block p-8 bg-brand-yellow border-2 border-black'>
          <CardContent>
            <h3 className='text-2xl font-bold mb-4'>Join Our Community</h3>
            <p className='text-muted-foreground mb-6 max-w-md'>
              Are you a local artist? Join our platform and start selling your artwork to art lovers in your community.
            </p>
            <Button asChild size='lg' className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-all duration-200 bg-brand-red hover:bg-brand-blue text-white uppercase tracking-tight transform hover:-translate-x-1 hover:-translate-y-1'>
              <Link href='/auth/signup'>Start Selling Today</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
