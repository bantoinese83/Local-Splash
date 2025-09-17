import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Metadata } from 'next'
import { Package, Calendar, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Order History',
  description: 'View your order history and track your purchases.',
}

export default async function OrdersPage() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/login')
  }

  // For now, we'll show a placeholder since we don't have orders table yet
  // In a real implementation, this would query the orders table

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-display'>Order History</h1>
      <p className='text-muted-foreground'>Track your art purchases and orders.</p>
      
      <div className='mt-8'>
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <Package className='h-12 w-12 text-muted-foreground mb-4' />
            <h3 className='text-lg font-semibold mb-2'>No orders yet</h3>
            <p className='text-muted-foreground text-center mb-4'>
              You haven't made any purchases yet. Start exploring our art collection!
            </p>
            <div className='flex gap-2'>
              <Badge variant='outline' className='flex items-center gap-1'>
                <Calendar className='h-3 w-3' />
                Order tracking coming soon
              </Badge>
              <Badge variant='outline' className='flex items-center gap-1'>
                <DollarSign className='h-3 w-3' />
                Payment history coming soon
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
