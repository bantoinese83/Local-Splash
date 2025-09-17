# Product Requirements Document: Local Splash

## 1. Overview

- **Project Name**: Local Splash
- **Core Vision**: A vibrant marketplace fostering direct connections between emerging local artists and buyers looking for affordable, unique art.
- **Target Audience**: Emerging local artists and buyers seeking affordable, unique art.

## 2. Design & Branding

- **Visual Style**: Pop Art: Bold, vibrant, and fun, with strong graphics and an energetic atmosphere.
- **Brand Colors**: Bright primary colors (electric blue, vivid red, sunny yellow) with bold black outlines.
- **UI/UX**: A classic, clean gallery view with easy-to-read text and a focus on individual artwork details, infused with Pop Art vibrancy through graphic accents and energetic typography outside the main gallery.

## 3. Core Features (MVP)

- **Artist Profiles**: Public pages for artists to showcase their bio and portfolio.
- **Product Listings**: Artists can list original works and prints for sale.
- **Search & Filter**: Basic search and filtering capabilities for buyers to discover art.
- **Secure Checkout**: A secure process for purchasing artwork.

## 4. Future Enhancements

- **Blog**: A content section featuring artist stories, interviews, and local art scene news to foster community.

## 5. Technical Specifications

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Data Model**: Detailed model including `Artist`, `Buyer`, `Artwork`, `Category`, `Order`, and `Review` tables.
- **Monetization**: A percentage-based commission on each sale.
- **Integrations**: Stripe/PayPal for payments; SendGrid/Mailgun for transactional emails.
- **Testing**: Basic unit tests for critical functions and manual testing of key user flows.
- **Deployment**: Automated deployments via Git pushes to a main branch, hosted on Vercel (frontend) and Supabase (backend).
- **Documentation**: A detailed `README.md` for project setup and reference.
