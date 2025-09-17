'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { type BlogPost, type BlogCategory, type BlogTag } from '@/lib/types'

interface BlogPostFormProps {
  post?: BlogPost
  onSave: () => void
  onCancel: () => void
}

export function BlogPostForm({ post, onSave, onCancel }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featured_image_url || '')
  const [categoryId, setCategoryId] = useState(post?.category_id || '')
  const [status, setStatus] = useState(post?.status || 'draft')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
    fetchTags()
  }, [])

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')
    setCategories(data || [])
  }

  const fetchTags = async () => {
    const { data } = await supabase
      .from('blog_tags')
      .select('*')
      .order('name')
    setTags(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Please log in to create/edit posts')
        return
      }

      const postData = {
        title: title.trim(),
        excerpt: excerpt.trim() || null,
        content: content.trim(),
        featured_image_url: featuredImageUrl.trim() || null,
        category_id: categoryId || null,
        author_id: user.id,
        status: status as 'draft' | 'published' | 'archived',
        published_at: status === 'published' && !post?.published_at ? new Date().toISOString() : post?.published_at
      }

      let result
      if (post) {
        result = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id)
      } else {
        result = await supabase
          .from('blog_posts')
          .insert(postData)
      }

      if (result.error) {
        alert(`Error: ${result.error.message}`)
        return
      }

      // Handle tags
      if (result.data && selectedTags.length > 0) {
        const postId = post?.id || result.data[0].id
        
        // Remove existing tags
        await supabase
          .from('blog_post_tags')
          .delete()
          .eq('post_id', postId)

        // Add new tags
        const tagInserts = selectedTags.map(tagId => ({
          post_id: postId,
          tag_id: tagId
        }))

        await supabase
          .from('blog_post_tags')
          .insert(tagInserts)
      }

      onSave()
      alert(post ? 'Post updated successfully!' : 'Post created successfully!')
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to save post'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-brand-yellow border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_#000]'>
      <h2 className='font-display text-2xl font-bold tracking-tighter uppercase text-black mb-6'>
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <Label htmlFor='title' className='text-black font-bold uppercase tracking-tight'>
            Title *
          </Label>
          <Input
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-2 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
            required
          />
        </div>

        <div>
          <Label htmlFor='excerpt' className='text-black font-bold uppercase tracking-tight'>
            Excerpt
          </Label>
          <Textarea
            id='excerpt'
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className='mt-2 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor='content' className='text-black font-bold uppercase tracking-tight'>
            Content *
          </Label>
          <Textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='mt-2 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
            rows={10}
            required
          />
        </div>

        <div>
          <Label htmlFor='featuredImage' className='text-black font-bold uppercase tracking-tight'>
            Featured Image URL
          </Label>
          <Input
            id='featuredImage'
            type='url'
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            className='mt-2 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='category' className='text-black font-bold uppercase tracking-tight'>
              Category
            </Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className='mt-2 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=''>No Category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor='status' className='text-black font-bold uppercase tracking-tight'>
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className='mt-2 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='draft'>Draft</SelectItem>
                <SelectItem value='published'>Published</SelectItem>
                <SelectItem value='archived'>Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className='text-black font-bold uppercase tracking-tight'>
            Tags
          </Label>
          <div className='mt-2 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <button
                key={tag.id}
                type='button'
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag.id) 
                      ? prev.filter(id => id !== tag.id)
                      : [...prev, tag.id]
                  )
                }}
                className={`px-3 py-1 rounded text-sm font-bold border border-black shadow-[1px_1px_0px_#000] transition-all duration-200 ${
                  selectedTags.includes(tag.id)
                    ? 'bg-brand-red text-white'
                    : 'bg-brand-yellow text-black hover:bg-brand-blue hover:text-white'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <div className='flex gap-4'>
          <Button
            type='submit'
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-shadow duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight'
          >
            {isSubmitting ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-shadow duration-200'
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
