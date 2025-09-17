# Local Splash

Welcome to Local Splash, a vibrant marketplace fostering direct connections between emerging local artists and buyers looking for affordable, unique art. This project is built with a modern, production-ready tech stack, emphasizing a Pop Art aesthetic with an electric blue primary brand color.

## ✨ Features

- **Artist Profiles**: Showcase your work and story.
- **Artwork Listings**: Sell original pieces and prints.
- **Secure Authentication**: Safe and easy login/signup powered by Supabase Auth.
- **Artwork Gallery**: A clean, classic gallery view to browse local art.
- **Basic Search & Filter**: Find the perfect piece of art.
- **Responsive Design**: Fully accessible on any device, from mobile to desktop.
- **Dark Mode**: Beautiful on both light and dark themes.
- **Dynamic SEO**: Dynamic page titles, descriptions, and OpenGraph images for social sharing.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication & Database**: [Supabase](https://supabase.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/UI](https://ui.shadcn.com/)
- **State Management**: Zustand
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/) & [Supabase](https://supabase.io/)

## 📦 Getting Started

### 1. Prerequisites

- Node.js (v18 or later)
- pnpm (or npm/yarn)
- A Supabase account

### 2. Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/local-splash.git
    cd local-splash
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up Supabase:**

    - Create a new project on [Supabase](https://app.supabase.io).
    - Go to the **SQL Editor** and run the contents of `supabase/migrations/0001_initial_schema.sql` to set up your database tables and policies.
    - Go to **Project Settings > API** and find your Project URL and `anon` public key.

4.  **Configure Environment Variables:**

    - Copy the example environment file:

      ```bash
      cp .env.local.example .env.local
      ```

    - Add your Supabase credentials to `.env.local`:

      ```
      NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
      NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
      ```

### 3. Running the Development Server

    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment

This project is optimized for deployment on Vercel.

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Vercel will automatically detect that you are using Next.js and configure the build settings.
4.  Add your Supabase environment variables in the Vercel project settings.
5.  Deploy! Vercel's CI/CD will automatically redeploy your application on every push to the main branch.

