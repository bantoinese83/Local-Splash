'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ArtworkWithProfile } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function ArtworkCard({ artwork }: { artwork: ArtworkWithProfile }) {
  const artist = Array.isArray(artwork.profiles) ? artwork.profiles[0] : artwork.profiles

  return (
    <div className='group relative block animate-in fade-in slide-in-from-bottom-4 duration-300'>
      <Link href={`/art/${artwork.id}`}>
        <div className='overflow-hidden rounded-lg border-2 border-black shadow-[8px_8px_0px_#000] group-hover:shadow-none transition-shadow duration-200'>
          <Image
            src={artwork.image_url ?? 'https://placehold.co/600x600'}
            alt={artwork.title}
            width={600}
            height={600}
            className='aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
      </Link>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-base font-bold leading-tight uppercase tracking-tight'>
            <Link href={`/art/${artwork.id}`} className='hover:text-brand-blue transition-colors duration-200'>
              {artwork.title}
            </Link>
          </h3>
          {artist && (
             <Link href={`/artist/${artist.username}`} className='group/artist flex items-center gap-2 mt-1'>
               <Avatar className='h-6 w-6'>
                 <AvatarImage src={artist.avatar_url ?? undefined} />
                 <AvatarFallback>{artist.full_name?.charAt(0) ?? 'A'}</AvatarFallback>
               </Avatar>
               <p className='text-sm text-muted-foreground group-hover/artist:underline'>
                 {artist.full_name ?? artist.username}
               </p>
             </Link>
          )}
        </div>
        <div className='text-right'>
          <p className='text-lg font-bold text-brand-blue bg-brand-yellow px-2 py-1 rounded border border-black shadow-[2px_2px_0px_#000]'>
            ${artwork.price}
          </p>
        </div>
      </div>
    </div>
  )
}
