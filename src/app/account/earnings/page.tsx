import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Metadata } from 'next'
import { DollarSign, TrendingUp, Package, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Earnings',
  description: 'Track your earnings and commission from art sales.',
}

export default async function EarningsPage() {
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

  // For now, we'll show placeholder data since we don't have orders yet
  // In a real implementation, this would query the orders table

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-display'>Earnings Dashboard</h1>
      <p className='text-muted-foreground'>Track your earnings and commission from art sales.</p>
      
      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-8'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Earnings</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$0.00</div>
            <p className='text-xs text-muted-foreground'>All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>This Month</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$0.00</div>
            <p className='text-xs text-muted-foreground'>+0% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Sales</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <p className='text-xs text-muted-foreground'>Artworks sold</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Commission Rate</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>10%</div>
            <p className='text-xs text-muted-foreground'>Platform fee</p>
          </CardContent>
        </Card>
      </div>

      {/* Commission Information */}
      <div className='mt-8'>
        <Card>
          <CardHeader>
            <CardTitle>Commission Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Platform Commission</span>
                <Badge variant='outline'>10%</Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Your Earnings</span>
                <Badge variant='outline'>90%</Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Minimum Commission</span>
                <Badge variant='outline'>$0.50</Badge>
              </div>
            </div>
            
            <div className='mt-6 p-4 bg-muted rounded-lg'>
              <h4 className='font-semibold mb-2'>How it works:</h4>
              <ul className='text-sm text-muted-foreground space-y-1'>
                <li>• We take a 10% commission on each sale</li>
                <li>• You receive 90% of the sale price</li>
                <li>• Payments are processed monthly</li>
                <li>• Minimum payout is $25.00</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <div className='mt-8'>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center justify-center py-12'>
              <Package className='h-12 w-12 text-muted-foreground mb-4' />
              <h3 className='text-lg font-semibold mb-2'>No sales yet</h3>
              <p className='text-muted-foreground text-center'>
                Your sales will appear here once customers start purchasing your artwork.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
