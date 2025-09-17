import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UploadArtworkForm } from '@/components/art/upload-artwork-form'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Artwork',
  description: 'Upload your artwork to Local Splash marketplace.',
}

export default async function UploadArtworkPage() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile?.is_artist) {
    return redirect('/account')
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <h1 className='text-3xl font-display'>Upload Artwork</h1>
      <p className='text-muted-foreground'>Share your art with the world.</p>
      <div className='mt-8'>
        <UploadArtworkForm categories={categories ?? []} />
      </div>
    </div>
  )
}
