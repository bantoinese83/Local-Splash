'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { toast } from 'sonner' // Temporarily disabled
import { Loader2, Upload, X } from 'lucide-react'
import { type Category } from '@/lib/types'
import Image from 'next/image'

export function UploadArtworkForm({ categories }: { categories: Category[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!imageFile) {
      toast.error('Please select an image')
      return
    }

    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    
    try {
      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `artworks/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, imageFile)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath)

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Insert artwork into database
      const { error: insertError } = await supabase
        .from('artworks')
        .insert({
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          price: parseFloat(formData.get('price') as string),
          image_url: publicUrl,
          artist_id: user.id,
          category_id: formData.get('category') ? parseInt(formData.get('category') as string) : null,
          type: formData.get('type') as string,
          dimensions: formData.get('dimensions') as string,
        })

      if (insertError) {
        throw insertError
      }

      alert('Artwork uploaded successfully!')
      router.push('/account/dashboard')
    } catch (error: any) {
      alert(`Error: ${error.message || 'Failed to upload artwork'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Artwork</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Image Upload */}
          <div className='space-y-2'>
            <Label htmlFor='image'>Artwork Image *</Label>
            {!imagePreview ? (
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors'>
                <Upload className='mx-auto h-12 w-12 text-gray-400' />
                <div className='mt-4'>
                  <Label htmlFor='image' className='cursor-pointer'>
                    <span className='text-sm font-medium text-brand-blue hover:text-brand-blue/80'>
                      Click to upload
                    </span>
                    <input
                      id='image'
                      name='image'
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      className='hidden'
                      required
                    />
                  </Label>
                  <p className='text-xs text-gray-500 mt-1'>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className='relative'>
                <Image
                  src={imagePreview}
                  alt='Preview'
                  width={400}
                  height={400}
                  className='w-full h-64 object-cover rounded-lg border-2 border-black dark:border-white'
                />
                <Button
                  type='button'
                  variant='destructive'
                  size='sm'
                  className='absolute top-2 right-2'
                  onClick={removeImage}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className='space-y-2'>
            <Label htmlFor='title'>Title *</Label>
            <Input
              id='title'
              name='title'
              placeholder='Enter artwork title'
              required
            />
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <textarea
              id='description'
              name='description'
              placeholder='Describe your artwork...'
              className='w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            />
          </div>

          {/* Price and Type */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='price'>Price ($) *</Label>
              <Input
                id='price'
                name='price'
                type='number'
                step='0.01'
                min='0'
                placeholder='0.00'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='type'>Type *</Label>
              <select
                id='type'
                name='type'
                className='w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                required
              >
                <option value='original'>Original</option>
                <option value='print'>Print</option>
              </select>
            </div>
          </div>

          {/* Category and Dimensions */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <select
                id='category'
                name='category'
                className='w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                <option value=''>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='dimensions'>Dimensions</Label>
              <Input
                id='dimensions'
                name='dimensions'
                placeholder='e.g., 12x16 inches'
              />
            </div>
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Upload Artwork
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
