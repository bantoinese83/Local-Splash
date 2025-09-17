'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type BlogPostWithDetails } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPostWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select(`
          *,
          categories:blog_categories(*),
          profiles(*),
          blog_tags(*),
          blog_comments(*)
        `)
        .order('created_at', { ascending: false })

      if (data) setPosts(data as BlogPostWithDetails[])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId)

      if (error) {
        alert(`Error: ${error.message}`)
        return
      }

      setPosts(posts.filter(post => post.id !== postId))
      alert('Post deleted successfully!')
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to delete post'}`)
    }
  }

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <div className='bg-brand-yellow border-2 border-black rounded-lg p-8 shadow-[4px_4px_0px_#000]'>
            <h2 className='font-display text-2xl font-bold uppercase tracking-tighter text-black'>
              Loading Posts...
            </h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='font-display text-3xl font-bold tracking-tighter uppercase text-black'>
          Blog Management
        </h1>
        <Button
          onClick={() => setShowCreateForm(true)}
          className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-shadow duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight'
        >
          <Plus className='mr-2 h-4 w-4' />
          New Post
        </Button>
      </div>

      {showCreateForm && (
        <div className='mb-8'>
          <Card className='border-2 border-black shadow-[4px_4px_0px_#000]'>
            <CardHeader>
              <CardTitle className='font-display text-xl font-bold uppercase tracking-tighter text-black'>
                Create New Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-4'>
                Blog post creation form would go here. This is a placeholder for the full implementation.
              </p>
              <div className='flex gap-2'>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  className='font-bold border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-none transition-shadow duration-200'
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className='space-y-4'>
        {posts.length === 0 ? (
          <div className='text-center py-12'>
            <div className='bg-brand-yellow border-2 border-black rounded-lg p-8 shadow-[4px_4px_0px_#000]'>
              <h3 className='font-display text-xl font-bold uppercase tracking-tighter text-black mb-4'>
                No Posts Yet
              </h3>
              <p className='text-black font-semibold mb-4'>
                Create your first blog post to get started!
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-shadow duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight'
              >
                <Plus className='mr-2 h-4 w-4' />
                Create First Post
              </Button>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className='border-2 border-black shadow-[2px_2px_0px_#000]'>
              <CardContent className='p-6'>
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Badge
                        variant='secondary'
                        className='text-xs font-bold border border-black shadow-[1px_1px_0px_#000]'
                        style={{ 
                          backgroundColor: post.categories?.color || '#000000', 
                          color: 'white' 
                        }}
                      >
                        {post.categories?.name || 'No Category'}
                      </Badge>
                      <Badge
                        variant='outline'
                        className='text-xs font-bold border border-black'
                      >
                        {post.status}
                      </Badge>
                    </div>
                    
                    <h3 className='text-xl font-bold text-black mb-2'>
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className='text-muted-foreground mb-3 line-clamp-2'>
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <span>By {post.profiles?.full_name || post.profiles?.username || 'Unknown'}</span>
                      <span>•</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.blog_comments?.length || 0} comments</span>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-2 ml-4'>
                    <Button asChild size='sm' variant='outline' className='border-2 border-black'>
                      <Link href={`/blog/${post.slug}`}>
                        <Eye className='h-4 w-4' />
                      </Link>
                    </Button>
                    <Button size='sm' variant='outline' className='border-2 border-black'>
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => deletePost(post.id)}
                      className='border-2 border-black text-red-600 hover:bg-red-50'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
