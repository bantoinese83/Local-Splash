import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your art purchase.',
}

export default async function CheckoutPage() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/login')
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      <h1 className='text-3xl font-display'>Checkout</h1>
      <p className='text-muted-foreground'>Complete your art purchase.</p>
      <div className='mt-8'>
        <CheckoutForm />
      </div>
    </div>
  )
}
