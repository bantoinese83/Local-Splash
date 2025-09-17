'use client'

import { useState, useEffect } from 'react'
import { type Metadata } from 'next'
import { createClient } from '@/lib/supabase/client'
import { type BlogPostWithDetails, type BlogCategory, type BlogTag } from '@/lib/types'
import { BlogGrid } from '@/components/blog/blog-grid'
import { BlogSidebar } from '@/components/blog/blog-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostWithDetails[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [postsResult, categoriesResult, tagsResult] = await Promise.all([
        supabase
          .from('blog_posts')
          .select(`
            *,
            categories:blog_categories(*),
            profiles(*),
            blog_tags(*),
            blog_comments(*)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false }),
        supabase
          .from('blog_categories')
          .select('*')
          .order('name'),
        supabase
          .from('blog_tags')
          .select('*')
          .order('name')
      ])

      if (postsResult.data) setPosts(postsResult.data as BlogPostWithDetails[])
      if (categoriesResult.data) setCategories(categoriesResult.data)
      if (tagsResult.data) setTags(tagsResult.data)
    } catch (error) {
      console.error('Error fetching blog data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || post.categories?.slug === selectedCategory
    const matchesTag = !selectedTag || post.blog_tags?.some(tag => tag.slug === selectedTag)
    
    return matchesSearch && matchesCategory && matchesTag
  })

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8 md:py-16'>
        <div className='text-center'>
          <div className='bg-brand-yellow border-2 border-black rounded-lg p-8 shadow-[4px_4px_0px_#000]'>
            <h2 className='font-display text-2xl font-bold uppercase tracking-tighter text-black'>
              Loading Blog Posts...
            </h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8 md:py-16'>
      <div className='text-center mb-12'>
        <h1 className='font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-brand-blue'>
          Local Splash Blog
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto font-semibold'>
          Stories, insights, and updates from our vibrant community of artists and art lovers.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-3/4'>
          <div className='mb-8'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                type='text'
                placeholder='Search blog posts...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
              />
            </div>
          </div>

          <BlogGrid posts={filteredPosts} />
        </div>

        <div className='lg:w-1/4'>
          <BlogSidebar
            categories={categories}
            tags={tags}
            selectedCategory={selectedCategory}
            selectedTag={selectedTag}
            onCategorySelect={setSelectedCategory}
            onTagSelect={setSelectedTag}
          />
        </div>
      </div>
    </div>
  )
}