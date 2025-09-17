# 🎨 Local Splash - Supabase Setup Guide

This guide will help you set up your Local Splash project with Supabase using the MCP tool and CLI.

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Select your organization
4. Enter project details:
   - **Name**: `local-splash`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait for the project to be provisioned (2-3 minutes)

### 2. Get Project Credentials

Once your project is ready:
1. Go to **Project Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJ...` (starts with eyJ)

### 3. Set Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
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
```

### 4. Apply Database Migrations

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the first migration:

```sql
-- Copy and paste the entire content from supabase/migrations/0001_initial_schema.sql
-- Then click "Run"
```

4. Run the second migration:

```sql
-- Copy and paste the entire content from supabase/migrations/0002_add_commission_system.sql
-- Then click "Run"
```

### 5. Verify Database Setup

After running both migrations, you should have these tables:
- ✅ `profiles` - User profiles and artist information
- ✅ `categories` - Art categories
- ✅ `artworks` - Artwork listings
- ✅ `orders` - Purchase tracking
- ✅ `commission_settings` - Monetization settings

### 6. Test the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000`

4. Test the features:
   - Create an account
   - Become an artist
   - Upload artwork
   - Browse the gallery

## 🔧 Alternative: Using Supabase CLI

If you prefer using the CLI:

### Install Supabase CLI
```bash
npm install -g supabase
```

### Login to Supabase
```bash
supabase login
```

### Link to your project
```bash
supabase link --project-ref your-project-id
```

### Apply migrations
```bash
supabase db push
```

## 🎯 Features Ready to Use

Once set up, your Local Splash application includes:

- ✅ **Artist Registration & Profiles**
- ✅ **Artwork Upload & Management**
- ✅ **Art Gallery with Search & Filters**
- ✅ **Checkout System** (ready for Stripe integration)
- ✅ **Commission System** (10% platform fee)
- ✅ **Order Management**
- ✅ **Earnings Dashboard**
- ✅ **Responsive Design** with Pop Art styling

## 🐛 Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Check your `.env.local` file has the correct Supabase URL and anon key

2. **"Table doesn't exist" error**
   - Make sure you've run both migration files in the SQL Editor

3. **Image upload not working**
   - Check that the `artworks` storage bucket exists in Supabase Storage

4. **Authentication not working**
   - Verify your Supabase project URL and anon key are correct

### Getting Help:

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the migration files in `supabase/migrations/`
- Check the console for error messages

## 🎉 You're All Set!

Your Local Splash marketplace is now ready for artists and art lovers! 🎨✨
