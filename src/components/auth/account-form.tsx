'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { toast } from 'sonner' // Temporarily disabled
import { Loader2 } from 'lucide-react'

export function AccountForm({ user, profile }: { user: User, profile: any }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [is_artist, setIsArtist] = useState<boolean>(false)
  const [artist_bio, setArtistBio] = useState<string | null>(null)

  useEffect(() => {
    if (profile) {
      setFullname(profile.full_name)
      setUsername(profile.username)
      setWebsite(profile.website)
      setAvatarUrl(profile.avatar_url)
      setIsArtist(profile.is_artist || false)
      setArtistBio(profile.artist_bio)
    }
    setLoading(false)
  }, [user, profile])

  async function updateProfile(
    event: React.FormEvent<HTMLFormElement>,
    {
      username,
      website,
      avatar_url,
      is_artist,
      artist_bio,
    }: { username: string | null; fullname: string | null; website: string | null; avatar_url: string | null; is_artist: boolean; artist_bio: string | null }
  ) {
    event.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('profiles').upsert({
      id: user.id as string,
      full_name: fullname,
      username,
      website,
      avatar_url,
      is_artist,
      artist_bio,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      alert(`Error: ${error.message}`)
    } else {
      alert('Profile updated successfully!')
    }
    setLoading(false)
  }

  return (
    <div className='bg-brand-yellow border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_#000]'>
      <h2 className='font-display text-2xl font-bold tracking-tighter uppercase text-black mb-6'>
        Profile Settings
      </h2>
      <form onSubmit={(e) => updateProfile(e, { fullname, username, website, avatar_url, is_artist, artist_bio })} className='space-y-6'>
        <div>
          <Label htmlFor='email' className='text-black font-bold uppercase tracking-tight'>Email</Label>
          <Input 
            id='email' 
            type='text' 
            value={user?.email} 
            disabled 
            className='border-2 border-black bg-gray-100'
          />
        </div>
        <div>
          <Label htmlFor='fullName' className='text-black font-bold uppercase tracking-tight'>Full Name</Label>
          <Input
            id='fullName'
            type='text'
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
            className='border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
          />
        </div>
        <div>
          <Label htmlFor='username' className='text-black font-bold uppercase tracking-tight'>Username</Label>
          <Input
            id='username'
            type='text'
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
          />
        </div>
        <div>
          <Label htmlFor='website' className='text-black font-bold uppercase tracking-tight'>Website</Label>
          <Input
            id='website'
            type='url'
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            className='border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
          />
        </div>

        <div className='space-y-4 border-t-2 border-black pt-4'>
          <h3 className='text-lg font-bold uppercase tracking-tight text-black'>Artist Settings</h3>
        
          <div className='flex items-center space-x-2'>
            <input
              id='is_artist'
              type='checkbox'
              checked={is_artist}
              onChange={(e) => setIsArtist(e.target.checked)}
              className='h-4 w-4 rounded border-2 border-black accent-brand-blue'
            />
            <Label htmlFor='is_artist' className='text-black font-bold uppercase tracking-tight'>
              I am an artist and want to sell my artwork
            </Label>
          </div>

          {is_artist && (
            <div>
              <Label htmlFor='artist_bio' className='text-black font-bold uppercase tracking-tight'>Artist Bio</Label>
              <textarea
                id='artist_bio'
                value={artist_bio || ''}
                onChange={(e) => setArtistBio(e.target.value)}
                placeholder='Tell us about yourself as an artist...'
                className='w-full min-h-[100px] px-3 py-2 border-2 border-black bg-background rounded-md text-sm focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'
              />
            </div>
          )}
      </div>

        <div>
          <Button 
            type='submit' 
            className='w-full md:w-auto font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-shadow duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight' 
            disabled={loading}
            onClick={(e) => updateProfile(e, { username, fullname, website, avatar_url, is_artist, artist_bio })}
          >
            {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating...</> : 'Update Profile'}
          </Button>
        </div>
      </form>
    </div>
  )
}
