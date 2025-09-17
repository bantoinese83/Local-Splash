import { Paintbrush } from 'lucide-react'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-brand-blue text-white rounded-md p-1 ${className}`}>
      <Paintbrush className='w-full h-full' />
    </div>
  )
}
