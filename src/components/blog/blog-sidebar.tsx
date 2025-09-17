import { type BlogCategory, type BlogTag } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BlogSidebarProps {
  categories: BlogCategory[]
  tags: BlogTag[]
  selectedCategory?: string
  selectedTag?: string
  onCategorySelect: (categorySlug: string | null) => void
  onTagSelect: (tagSlug: string | null) => void
}

export function BlogSidebar({ 
  categories, 
  tags, 
  selectedCategory, 
  selectedTag, 
  onCategorySelect, 
  onTagSelect 
}: BlogSidebarProps) {
  return (
    <div className='space-y-6'>
      {/* Categories */}
      <Card className='border-2 border-black shadow-[4px_4px_0px_#000]'>
        <CardHeader className='pb-3'>
          <CardTitle className='font-display text-lg font-bold uppercase tracking-tighter text-black'>
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <button
            onClick={() => onCategorySelect(null)}
            className={`w-full text-left px-3 py-2 rounded font-semibold transition-colors duration-200 ${
              !selectedCategory
                ? 'bg-brand-blue text-white'
                : 'hover:bg-brand-yellow hover:text-black'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.slug)}
              className={`w-full text-left px-3 py-2 rounded font-semibold transition-colors duration-200 ${
                selectedCategory === category.slug
                  ? 'bg-brand-blue text-white'
                  : 'hover:bg-brand-yellow hover:text-black'
              }`}
            >
              {category.name}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card className='border-2 border-black shadow-[4px_4px_0px_#000]'>
        <CardHeader className='pb-3'>
          <CardTitle className='font-display text-lg font-bold uppercase tracking-tighter text-black'>
            Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() => onTagSelect(null)}
              className={`px-3 py-1 rounded text-sm font-bold border border-black shadow-[1px_1px_0px_#000] transition-all duration-200 ${
                !selectedTag
                  ? 'bg-brand-red text-white'
                  : 'bg-brand-yellow text-black hover:bg-brand-red hover:text-white'
              }`}
            >
              All Tags
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagSelect(tag.slug)}
                className={`px-3 py-1 rounded text-sm font-bold border border-black shadow-[1px_1px_0px_#000] transition-all duration-200 ${
                  selectedTag === tag.slug
                    ? 'bg-brand-red text-white'
                    : 'bg-brand-yellow text-black hover:bg-brand-red hover:text-white'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
