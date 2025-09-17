import { type BlogPostWithDetails } from '@/lib/types'
import { BlogCard } from './blog-card'

interface BlogGridProps {
  posts: BlogPostWithDetails[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='bg-brand-yellow border-2 border-black rounded-lg p-8 shadow-[4px_4px_0px_#000]'>
          <h3 className='font-display text-2xl font-bold uppercase tracking-tighter text-black mb-4'>
            No Posts Yet
          </h3>
          <p className='text-black font-semibold'>
            Check back soon for exciting content from our community!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}
