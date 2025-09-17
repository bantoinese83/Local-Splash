import { createServerClient } from '@/lib/supabase/server'
import { ArtworkGrid } from '@/components/art/artwork-grid'
import { FilterSidebar } from '@/components/art/filter-sidebar'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Art',
  description: 'Browse, search, and filter unique artwork from local artists.',
}

export default async function ArtPage({ searchParams }: {
  searchParams?: {
    query?: string
    category?: string
  }
}) {
  const supabase = createServerClient()
  const query = searchParams?.query || ''
  const category = searchParams?.category || ''

  let supabaseQuery

  if (category) {
    // If filtering by category, join with categories table
    supabaseQuery = supabase
      .from('artworks')
      .select('*, profiles(username, avatar_url, full_name), categories(name)')
      .eq('categories.name', category)
      .order('id', { ascending: false })
  } else {
    // Default query without category filter
    supabaseQuery = supabase
      .from('artworks')
      .select('*, profiles(username, avatar_url, full_name)')
      .order('id', { ascending: false })
  }

  if (query) {
    supabaseQuery = supabaseQuery.textSearch('title', query, { type: 'websearch' })
  }

  const { data: artworks, error } = await supabaseQuery
  const { data: categories } = await supabase.from('categories').select('*')

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className='mb-8'>
        <h1 className='text-4xl md:text-5xl font-display uppercase text-brand-blue'>Art Gallery</h1>
        <p className='text-lg text-muted-foreground mt-2'>Find your next favorite piece of art.</p>
      </header>
      <div className='flex flex-col md:flex-row gap-8'>
        <FilterSidebar categories={categories ?? []} />
        <main className='flex-1'>
          {artworks && artworks.length > 0 ? (
            <ArtworkGrid artworks={artworks} />
          ) : (
            <div className='text-center py-16 border-2 border-dashed rounded-lg'>
              <h2 className='text-2xl font-semibold'>No Artwork Found</h2>
              <p className='text-muted-foreground mt-2'>Try adjusting your search or filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
