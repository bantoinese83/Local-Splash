'use client'

import { type User } from '@supabase/supabase-js'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutDashboard, LogOut, User as UserIcon, Upload, Palette, DollarSign } from 'lucide-react'

export function UserNav({ user }: { user: User }) {
  const router = useRouter()
  const supabase = createClient()
  const [isArtist, setIsArtist] = useState(false)

  useEffect(() => {
    const checkArtistStatus = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_artist')
        .eq('id', user.id)
        .single()
      
      setIsArtist(profile?.is_artist || false)
    }
    
    checkArtistStatus()
  }, [user.id, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-none transition-all duration-200 bg-brand-yellow hover:bg-brand-red transform hover:-translate-x-0.5 hover:-translate-y-0.5'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user.user_metadata.avatar_url} alt={user.email ?? ''} />
            <AvatarFallback className='bg-brand-blue text-white font-bold'>{user.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 border-2 border-black shadow-[4px_4px_0px_#000] bg-brand-yellow' align='end' forceMount>
        <DropdownMenuLabel className='font-normal bg-brand-blue text-white'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-bold leading-none uppercase tracking-tight'>Signed In</p>
            <p className='text-xs leading-none text-brand-yellow font-semibold'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className='hover:bg-brand-red hover:text-white transition-colors duration-200'>
            <Link href='/account'>
              <UserIcon className='mr-2 h-4 w-4' />
              <span className='font-bold uppercase tracking-tight'>Profile</span>
            </Link>
          </DropdownMenuItem>
          {isArtist && (
            <>
              <DropdownMenuItem asChild className='hover:bg-brand-red hover:text-white transition-colors duration-200'>
                <Link href='/account/dashboard'>
                  <LayoutDashboard className='mr-2 h-4 w-4' />
                  <span className='font-bold uppercase tracking-tight'>Artist Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='hover:bg-brand-red hover:text-white transition-colors duration-200'>
                <Link href='/account/upload'>
                  <Upload className='mr-2 h-4 w-4' />
                  <span className='font-bold uppercase tracking-tight'>Upload Artwork</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='hover:bg-brand-red hover:text-white transition-colors duration-200'>
                <Link href='/account/earnings'>
                  <DollarSign className='mr-2 h-4 w-4' />
                  <span className='font-bold uppercase tracking-tight'>Earnings</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className='hover:bg-brand-red hover:text-white transition-colors duration-200'>
          <LogOut className='mr-2 h-4 w-4' />
          <span className='font-bold uppercase tracking-tight'>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
