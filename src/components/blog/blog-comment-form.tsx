'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

interface BlogCommentFormProps {
  postId: string
  onCommentAdded?: () => void
}

export function BlogCommentForm({ postId, onCommentAdded }: BlogCommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Please log in to comment')
        return
      }

      const { error } = await supabase
        .from('blog_comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content: content.trim()
        })

      if (error) {
        alert(`Error: ${error.message}`)
        return
      }

      setContent('')
      if (onCommentAdded) {
        onCommentAdded()
      } else {
        // Refresh the page to show the new comment
        window.location.reload()
      }
      alert('Comment submitted! It will appear after approval.')
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to submit comment'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-brand-yellow border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_#000]'>
      <h3 className='font-display text-xl font-bold uppercase tracking-tighter text-black mb-4'>
        Leave a Comment
      </h3>
      
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Label htmlFor='comment' className='text-black font-bold uppercase tracking-tight'>
            Your Comment
          </Label>
          <Textarea
            id='comment'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Share your thoughts on this post...'
            className='mt-2 border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
            rows={4}
            required
          />
        </div>
        
        <Button
          type='submit'
          disabled={isSubmitting || !content.trim()}
          className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-shadow duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight'
        >
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </Button>
      </form>
    </div>
  )
}
