import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { createServerClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient()

  // Fetch dynamic routes
  const { data: artworks } = await supabase.from('artworks').select('id, created_at')
  const { data: artists } = await supabase.from('profiles').select('username, updated_at').eq('is_artist', true)

  const artworkRoutes = artworks?.map(({ id, created_at }) => ({
    url: `${SITE_CONFIG.url}/art/${id}`,
    lastModified: new Date(created_at).toISOString(),
  })) ?? []

  const artistRoutes = artists?.map(({ username, updated_at }) => ({
    url: `${SITE_CONFIG.url}/artist/${username}`,
    lastModified: updated_at ? new Date(updated_at).toISOString() : new Date().toISOString(),
  })) ?? []

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${SITE_CONFIG.url}/art`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date().toISOString(),
    },
  ]

  return [...staticRoutes, ...artworkRoutes, ...artistRoutes]
}
