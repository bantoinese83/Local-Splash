'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { toast } from 'sonner' // Temporarily disabled
import { Loader2, CreditCard, MapPin, User } from 'lucide-react'

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // For now, we'll simulate a successful checkout
      // In a real implementation, this would integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Order placed successfully! You will receive a confirmation email shortly.')
      router.push('/account/orders')
    } catch (error: any) {
      alert(`Error: ${error.message || 'Failed to process order'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid gap-8 md:grid-cols-2'>
      {/* Checkout Form */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <CreditCard className='h-5 w-5' />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Billing Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold flex items-center gap-2'>
                <User className='h-4 w-4' />
                Billing Information
              </h3>
              
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input id='firstName' name='firstName' required />
                </div>
                <div>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input id='lastName' name='lastName' required />
                </div>
              </div>
              
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' type='email' required />
              </div>
            </div>

            {/* Shipping Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold flex items-center gap-2'>
                <MapPin className='h-4 w-4' />
                Shipping Address
              </h3>
              
              <div>
                <Label htmlFor='address'>Street Address</Label>
                <Input id='address' name='address' required />
              </div>
              
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='city'>City</Label>
                  <Input id='city' name='city' required />
                </div>
                <div>
                  <Label htmlFor='state'>State</Label>
                  <Input id='state' name='state' required />
                </div>
              </div>
              
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='zipCode'>ZIP Code</Label>
                  <Input id='zipCode' name='zipCode' required />
                </div>
                <div>
                  <Label htmlFor='country'>Country</Label>
                  <Input id='country' name='country' defaultValue='United States' required />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Payment Details</h3>
              
              <div>
                <Label htmlFor='cardNumber'>Card Number</Label>
                <Input id='cardNumber' name='cardNumber' placeholder='1234 5678 9012 3456' required />
              </div>
              
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <Label htmlFor='expiryMonth'>Month</Label>
                  <Input id='expiryMonth' name='expiryMonth' placeholder='MM' required />
                </div>
                <div>
                  <Label htmlFor='expiryYear'>Year</Label>
                  <Input id='expiryYear' name='expiryYear' placeholder='YYYY' required />
                </div>
                <div>
                  <Label htmlFor='cvv'>CVV</Label>
                  <Input id='cvv' name='cvv' placeholder='123' required />
                </div>
              </div>
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Complete Purchase
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>$0.00</span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className='flex justify-between'>
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className='border-t pt-4'>
              <div className='flex justify-between text-lg font-semibold'>
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>
          
          <div className='mt-6 p-4 bg-muted rounded-lg'>
            <p className='text-sm text-muted-foreground'>
              <strong>Note:</strong> This is a demo checkout. No actual payment will be processed.
              In a production environment, this would integrate with Stripe for secure payment processing.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
