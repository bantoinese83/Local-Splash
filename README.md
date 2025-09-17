<div align="center">

# 🎨 Local Splash

**A vibrant marketplace fostering direct connections between emerging local artists and buyers looking for affordable, unique art.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![Built with ❤️ by Monarch MVP Tech](https://img.shields.io/badge/Built%20with%20❤️%20by-Monarch%20MVP%20Tech-red?style=for-the-badge)](https://monarchmvp.tech)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-View_Now-blue?style=for-the-badge&logo=vercel)](https://local-splash.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bantoinese83/Local-Splash?style=for-the-badge&logo=github)](https://github.com/bantoinese83/Local-Splash)
[![GitHub Forks](https://img.shields.io/github/forks/bantoinese83/Local-Splash?style=for-the-badge&logo=github)](https://github.com/bantoinese83/Local-Splash/fork)

</div>

---

## 🌟 Overview

**Local Splash** is a modern, full-featured art marketplace that connects emerging local artists with art enthusiasts. Built with a **Pop Art aesthetic** featuring bold colors, energetic typography, and 3D shadow effects, it provides a vibrant platform for discovering and purchasing unique, affordable art.

### 🎯 **Mission**
To democratize art by making it accessible to everyone while providing emerging artists with a platform to showcase and sell their work directly to their community.

---

## ✨ Key Features

### 🎨 **For Artists**
- **Artist Profiles**: Create stunning profiles with bio, portfolio, and social links
- **Artwork Management**: Upload and manage original pieces and prints
- **Earnings Dashboard**: Track sales, commissions, and payouts
- **Order Management**: Handle purchase requests and shipping
- **Commission System**: 10% platform fee with transparent pricing

### 🛒 **For Buyers**
- **Art Discovery**: Browse curated collections and discover new artists
- **Advanced Search**: Filter by category, price, artist, and style
- **Secure Checkout**: Safe payment processing with order tracking
- **Artist Stories**: Learn about the creators behind the art
- **Wishlist**: Save favorite pieces for later

### 🏢 **Platform Features**
- **Blog System**: Artist interviews, art scene news, and community content
- **Responsive Design**: Perfect experience on all devices
- **SEO Optimized**: Dynamic sitemaps, OpenGraph images, and meta tags
- **Dark Mode**: Beautiful themes for every preference
- **Real-time Updates**: Live notifications and updates

---

## 🚀 Tech Stack

### **Frontend**
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/) [![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-Components-000000?style=flat-square)](https://ui.shadcn.com/)

### **Backend & Database**
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)](https://supabase.io/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://postgresql.org/) [![Row Level Security](https://img.shields.io/badge/RLS-Security-FF6B6B?style=flat-square)](https://supabase.com/docs/guides/auth/row-level-security)

### **State Management & Forms**
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-FF6B6B?style=flat-square)](https://zustand-demo.pmnd.rs/) [![React Hook Form](https://img.shields.io/badge/React_Hook_Form-Forms-EC5990?style=flat-square)](https://react-hook-form.com/) [![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?style=flat-square)](https://zod.dev/)

### **Deployment & Infrastructure**
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel)](https://vercel.com/) [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/bantoinese83/Local-Splash)

---

## 🎨 Design System

### **Pop Art Aesthetic**
- **Electric Blue** (`#0080FF`) - Primary brand color
- **Vivid Red** (`#FF4757`) - Secondary actions and highlights  
- **Sunny Yellow** (`#FFD700`) - Accent backgrounds and success states
- **Bold Black** - Outlines, text, and graphic definition

### **Typography**
- **Display Font**: Bungee - For headlines and hero text
- **Body Font**: Inter - For readable content
- **Style**: Bold, uppercase, tightly tracked for energetic feel

### **Visual Elements**
- **3D Shadows**: `shadow-[4px_4px_0px_#000]` for Pop Art depth
- **Bold Borders**: 2px black borders throughout
- **Pattern Backgrounds**: Dotted patterns for texture
- **Hover Animations**: Smooth transitions and interactive feedback

---

## 📊 Database Schema

### **Core Tables**
- **`profiles`** - User profiles and artist information
- **`artworks`** - Artwork listings with metadata
- **`categories`** - Art categories and classifications
- **`orders`** - Purchase tracking and commission management
- **`blog_posts`** - Community content and artist stories
- **`blog_comments`** - User engagement and discussions

### **Key Features**
- **Row Level Security (RLS)** - Secure data access
- **Real-time subscriptions** - Live updates
- **File storage** - Image uploads and management
- **Commission tracking** - Automated fee calculation

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- pnpm (or npm/yarn)
- Supabase account

### **1. Clone & Install**
```bash
git clone https://github.com/bantoinese83/Local-Splash.git
cd Local-Splash
pnpm install
```

### **2. Environment Setup**
```bash
cp .env.local.example .env.local
```

Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### **3. Database Setup**
1. Create a [Supabase project](https://app.supabase.io)
2. Run the migration files in SQL Editor:
   - `supabase/migrations/0001_initial_schema.sql`
   - `supabase/migrations/0002_add_commission_system.sql`
   - `supabase/migrations/0003_add_blog_system.sql`

### **4. Start Development**
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 📱 Application Routes

### **Public Pages**
- **`/`** - Homepage with featured art
- **`/art`** - Art gallery with search & filters
- **`/artists`** - Artist directory
- **`/blog`** - Community blog and stories
- **`/art/[id]`** - Individual artwork pages
- **`/artist/[username]`** - Artist profile pages

### **Authentication**
- **`/auth/login`** - User login
- **`/auth/signup`** - User registration
- **`/auth/callback`** - OAuth callback

### **User Dashboard**
- **`/account`** - User profile management
- **`/account/upload`** - Upload new artwork
- **`/account/orders`** - Order history
- **`/account/earnings`** - Sales analytics

### **E-commerce**
- **`/checkout`** - Secure checkout process

---

## 🛠️ Development

### **Available Scripts**
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### **Project Structure**
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── art/            # Artwork-related components
│   ├── auth/           # Authentication components
│   ├── blog/           # Blog system components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── lib/                # Utilities and configurations
│   ├── supabase/       # Database client setup
│   └── types.ts        # TypeScript definitions
└── middleware.ts       # Next.js middleware
```

---

## 🌐 Deployment

### **Vercel (Recommended)**
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

### **Environment Variables**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=your_domain
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Monarch MVP Tech** - Built with ❤️ by [Monarch MVP Tech](https://monarchmvp.tech)
- **Supabase** - Amazing backend-as-a-service platform
- **Vercel** - Seamless deployment and hosting
- **Shadcn/UI** - Beautiful, accessible component library
- **Next.js Team** - Incredible React framework

---

## 📞 Support

- **Documentation**: [Full Setup Guide](SUPABASE_SETUP.md)
- **Issues**: [GitHub Issues](https://github.com/bantoinese83/Local-Splash/issues)
- **Discussions**: [GitHub Discussions](https://github.com/bantoinese83/Local-Splash/discussions)

---

<div align="center">

**Made with ❤️ by [Monarch MVP Tech](https://monarchmvp.tech)**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/bantoinese83/Local-Splash)
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-View_Now-blue?style=for-the-badge&logo=vercel)](https://local-splash.vercel.app)

</div>

