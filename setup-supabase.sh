#!/bin/bash

# Local Splash Supabase Setup Script
echo "🎨 Setting up Local Splash with Supabase..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Supabase Configuration
# Replace these with your actual Supabase project credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe Configuration (for future payment integration)
# STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
# STRIPE_SECRET_KEY=your_stripe_secret_key
# STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email Configuration (for future transactional emails)
# SENDGRID_API_KEY=your_sendgrid_api_key
# FROM_EMAIL=noreply@localsplash.com

# Commission Configuration (for future monetization)
# COMMISSION_RATE=0.1
EOF
    echo "✅ .env.local file created!"
else
    echo "✅ .env.local file already exists"
fi

echo ""
echo "🚀 Next steps:"
echo "1. Go to https://supabase.com and create a new project"
echo "2. Copy your Project URL and anon key to .env.local"
echo "3. Run the database migrations in Supabase SQL Editor"
echo "4. Start your development server with: npm run dev"
echo ""
echo "📋 Database migrations to apply:"
echo "- supabase/migrations/0001_initial_schema.sql"
echo "- supabase/migrations/0002_add_commission_system.sql"
echo ""
echo "🎉 Setup complete! Happy coding!"
