import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { type BlogPostWithDetails, type BlogCommentWithProfile } from '@/lib/types'
import { BlogComment } from '@/components/blog/blog-comment'
import { BlogCommentForm } from '@/components/blog/blog-comment-form'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = createServerClient()
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select(`
      *,
      categories:blog_categories(*),
      profiles(*),
      blog_tags(*),
      blog_comments!inner(
        *,
        profiles(*)
      )
    `)
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    notFound()
  }

  const comments = post.blog_comments?.filter(comment => comment.status === 'approved') as BlogCommentWithProfile[] || []

  return (
    <div className='container mx-auto px-4 py-8 md:py-16'>
      <div className='max-w-4xl mx-auto'>
        {/* Back Button */}
        <Button asChild variant='outline' className='mb-8 font-bold border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-none transition-shadow duration-200'>
          <Link href='/blog'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <header className='mb-8'>
          <div className='flex items-center gap-2 mb-4 flex-wrap'>
            {post.categories && (
              <Badge 
                variant='secondary' 
                className='text-sm font-bold border border-black shadow-[2px_2px_0px_#000]'
                style={{ backgroundColor: post.categories.color, color: 'white' }}
              >
                {post.categories.name}
              </Badge>
            )}
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <time>{new Date(post.published_at || post.created_at).toLocaleDateString()}</time>
              </div>
              <div className='flex items-center gap-1'>
                <MessageCircle className='h-4 w-4' />
                <span>{comments.length} comments</span>
              </div>
            </div>
          </div>

          <h1 className='font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase text-black mb-6'>
            {post.title}
          </h1>

          {post.excerpt && (
            <p className='text-xl text-muted-foreground font-semibold leading-relaxed mb-6'>
              {post.excerpt}
            </p>
          )}

          {post.profiles && (
            <div className='flex items-center gap-3'>
              <Avatar className='h-12 w-12 border-2 border-black'>
                <AvatarImage src={post.profiles.avatar_url ?? undefined} />
                <AvatarFallback className='bg-brand-yellow text-black font-bold'>
                  {post.profiles.full_name?.charAt(0) ?? post.profiles.username?.charAt(0) ?? 'A'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='font-bold text-black uppercase tracking-tight'>
                  {post.profiles.full_name ?? post.profiles.username}
                </p>
                <p className='text-sm text-muted-foreground'>
                  Author
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.featured_image_url && (
          <div className='mb-8'>
            <div className='overflow-hidden rounded-lg border-2 border-black shadow-[8px_8px_0px_#000]'>
              <Image
                src={post.featured_image_url}
                alt={post.title}
                width={800}
                height={400}
                className='w-full aspect-[2/1] object-cover'
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className='prose prose-lg max-w-none mb-12'>
          <div 
            className='text-black font-medium leading-relaxed'
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </article>

        {/* Tags */}
        {post.blog_tags && post.blog_tags.length > 0 && (
          <div className='mb-12'>
            <h3 className='font-display text-lg font-bold uppercase tracking-tighter text-black mb-4'>
              Tags
            </h3>
            <div className='flex flex-wrap gap-2'>
              {post.blog_tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant='secondary'
                  className='text-sm font-bold border border-black shadow-[1px_1px_0px_#000]'
                  style={{ backgroundColor: tag.color, color: 'white' }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <section className='space-y-8'>
          <h2 className='font-display text-2xl font-bold uppercase tracking-tighter text-black'>
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <BlogCommentForm postId={post.id} />

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className='space-y-4'>
              {comments.map((comment) => (
                <BlogComment key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <div className='bg-brand-yellow border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_#000]'>
                <p className='text-black font-semibold'>
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
