'use client'

import { useTheme } from 'next-themes'

// Simple fallback toaster component
const Toaster = ({ ...props }: any) => {
  const { theme = 'system' } = useTheme()

  return (
    <div 
      className='toaster group fixed bottom-0 right-0 z-50'
      {...props}
    />
  )
}

export { Toaster }
