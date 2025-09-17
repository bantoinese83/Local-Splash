import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArtworkGrid } from '@/components/art/artwork-grid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Upload, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artist Dashboard',
  description: 'Manage your artwork and track your sales.',
}

export default async function ArtistDashboard() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile?.is_artist) {
    return redirect('/account')
  }

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*, profiles(username, avatar_url, full_name)')
    .eq('artist_id', user.id)
    .order('created_at', { ascending: false })

  // Get some basic stats
  const totalArtworks = artworks?.length || 0
  const totalValue = artworks?.reduce((sum, artwork) => sum + artwork.price, 0) || 0

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
        <div>
          <h1 className='text-3xl font-display'>Artist Dashboard</h1>
          <p className='text-muted-foreground'>Manage your artwork and track your sales.</p>
        </div>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <Button asChild>
            <Link href='/account/upload'>
              <Plus className='mr-2 h-4 w-4' />
              Upload Artwork
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Artworks</CardTitle>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalArtworks}</div>
            <p className='text-xs text-muted-foreground'>Pieces uploaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Value</CardTitle>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalValue.toFixed(2)}</div>
            <p className='text-xs text-muted-foreground'>Combined value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Recent Uploads</CardTitle>
            <Upload className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{artworks?.slice(0, 3).length || 0}</div>
            <p className='text-xs text-muted-foreground'>Last 3 uploads</p>
          </CardContent>
        </Card>
      </div>

      {/* Artwork Management */}
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-display'>Your Artwork</h2>
          <Button asChild variant='outline'>
            <Link href='/account/upload'>
              <Plus className='mr-2 h-4 w-4' />
              Add New
            </Link>
          </Button>
        </div>
        
        {artworks && artworks.length > 0 ? (
          <ArtworkGrid artworks={artworks} />
        ) : (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-12'>
              <Upload className='h-12 w-12 text-muted-foreground mb-4' />
              <h3 className='text-lg font-semibold mb-2'>No artwork yet</h3>
              <p className='text-muted-foreground text-center mb-4'>
                Start building your portfolio by uploading your first piece of art.
              </p>
              <Button asChild>
                <Link href='/account/upload'>
                  <Plus className='mr-2 h-4 w-4' />
                  Upload Your First Artwork
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
