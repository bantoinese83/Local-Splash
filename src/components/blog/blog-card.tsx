import Link from 'next/link'
import Image from 'next/image'
import { type BlogPostWithDetails } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface BlogCardProps {
  post: BlogPostWithDetails
}

export function BlogCard({ post }: BlogCardProps) {
  const author = post.profiles
  const category = post.categories

  return (
    <article className='group relative block animate-in fade-in slide-in-from-bottom-4 duration-300'>
      <Link href={`/blog/${post.slug}`}>
        <div className='overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] group-hover:shadow-none transition-shadow duration-200'>
          {post.featured_image_url ? (
            <Image
              src={post.featured_image_url}
              alt={post.title}
              width={600}
              height={400}
              className='aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          ) : (
            <div className='aspect-[3/2] w-full bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center'>
              <span className='text-white font-display text-2xl font-bold uppercase tracking-tighter'>
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className='mt-4 space-y-3'>
        <div className='flex items-center gap-2 flex-wrap'>
          {category && (
            <Badge 
              variant='secondary' 
              className='text-xs font-bold border border-black shadow-[1px_1px_0px_#000]'
              style={{ backgroundColor: category.color, color: 'white' }}
            >
              {category.name}
            </Badge>
          )}
          <time className='text-sm text-muted-foreground font-medium'>
            {new Date(post.published_at || post.created_at).toLocaleDateString()}
          </time>
        </div>

        <h3 className='text-xl font-bold leading-tight uppercase tracking-tight'>
          <Link href={`/blog/${post.slug}`} className='hover:text-brand-blue transition-colors duration-200'>
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className='text-muted-foreground line-clamp-3'>
            {post.excerpt}
          </p>
        )}

        {author && (
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8 border-2 border-black'>
              <AvatarImage src={author.avatar_url ?? undefined} />
              <AvatarFallback className='bg-brand-yellow text-black font-bold'>
                {author.full_name?.charAt(0) ?? author.username?.charAt(0) ?? 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-semibold text-foreground'>
                {author.full_name ?? author.username}
              </p>
              <p className='text-xs text-muted-foreground'>
                {post.blog_comments?.length || 0} comments
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
