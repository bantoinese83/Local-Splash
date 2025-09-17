'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type Category } from '@/lib/types'

export function FilterSidebar({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get('query') as string

    const current = new URLSearchParams(Array.from(searchParams.entries()))
    if (!query) {
      current.delete('query')
    } else {
      current.set('query', query)
    }
    const search = current.toString()
    const queryStr = search ? `?${search}` : ''
    router.push(`${pathname}${queryStr}`)
  }

  const handleCategoryFilter = (categoryName: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    if (current.get('category') === categoryName) {
        current.delete('category')
    } else {
        current.set('category', categoryName)
    }
    const search = current.toString()
    const queryStr = search ? `?${search}` : ''
    router.push(`${pathname}${queryStr}`)
  }

  return (
    <aside className='w-full md:w-64 lg:w-72'>
      <form onSubmit={handleSearch} className='mb-6'>
        <Input
          type='search'
          name='query'
          defaultValue={searchParams.get('query') || ''}
          placeholder='Search artworks...' 
          className='border-2 border-black'
        />
      </form>
      <div>
        <h3 className='text-lg font-semibold mb-3'>Categories</h3>
        <div className='flex flex-col space-y-2'>
          {categories.map(category => (
            <Button 
              key={category.id} 
              variant={searchParams.get('category') === category.name ? 'secondary' : 'ghost'}
              onClick={() => handleCategoryFilter(category.name)}
              className='justify-start'
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  )
}
