import { type Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']

export type Profile = Tables<'profiles'>
export type Artwork = Tables<'artworks'>
export type Category = Tables<'categories'>

export type ArtworkWithProfile = Artwork & {
  profiles: Profile | Profile[] | null
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  created_at: string
  updated_at: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  color: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_url?: string
  category_id?: string
  author_id: string
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  created_at: string
  updated_at: string
}

export interface BlogPostWithDetails extends BlogPost {
  categories?: BlogCategory
  profiles?: Profile
  blog_tags?: BlogTag[]
  blog_comments?: BlogComment[]
}

export interface BlogComment {
  id: string
  post_id: string
  author_id: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface BlogCommentWithProfile extends BlogComment {
  profiles?: Profile
}
