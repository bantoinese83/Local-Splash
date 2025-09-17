import { type BlogCommentWithProfile } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface BlogCommentProps {
  comment: BlogCommentWithProfile
}

export function BlogComment({ comment }: BlogCommentProps) {
  const author = comment.profiles

  return (
    <div className='border-2 border-black rounded-lg p-4 bg-brand-yellow shadow-[2px_2px_0px_#000]'>
      <div className='flex items-start gap-3'>
        <Avatar className='h-10 w-10 border-2 border-black'>
          <AvatarImage src={author?.avatar_url ?? undefined} />
          <AvatarFallback className='bg-brand-blue text-white font-bold'>
            {author?.full_name?.charAt(0) ?? author?.username?.charAt(0) ?? 'A'}
          </AvatarFallback>
        </Avatar>
        
        <div className='flex-1 space-y-2'>
          <div className='flex items-center gap-2'>
            <h4 className='font-bold text-black uppercase tracking-tight'>
              {author?.full_name ?? author?.username ?? 'Anonymous'}
            </h4>
            <Badge 
              variant='secondary' 
              className='text-xs font-bold border border-black shadow-[1px_1px_0px_#000]'
            >
              {comment.status}
            </Badge>
          </div>
          
          <p className='text-black font-medium leading-relaxed'>
            {comment.content}
          </p>
          
          <time className='text-sm text-black/70 font-semibold'>
            {new Date(comment.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </time>
        </div>
      </div>
    </div>
  )
}
