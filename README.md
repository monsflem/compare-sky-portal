
# Skygruppen Compare Smart

A self-healing, production-ready comparison platform mirroring Bytt.no's structure, styled to match Skygruppen.no's branding.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Supabase (backend)
- React Query for data fetching and caching

## Setup

```bash
# Clone the repository
git clone [repo]

# Install dependencies
npm install

# Add .env.local with Supabase credentials
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start the development server
npm run dev
```

## Self-Healing Strategy

The platform implements a multi-layered self-healing strategy:

### Edge Function Layer
- Retry failed API calls up to 3 times with exponential backoff
- Log detailed errors to the database for monitoring
- Fall back to cached data when retries fail

### Frontend Layer
- React Query handles retries and caching automatically
- Provides fallback UI components when data is unavailable
- Maintains a consistent user experience despite backend issues

### Database Layer
- Automated PostgreSQL function to resolve stale errors
- Daily cron job marks errors older than 7 days as resolved
- Maintains database health and prevents log accumulation

## Deployment

### Frontend
```bash
vercel deploy
```

### Supabase Functions
```bash
supabase functions deploy fetch-providers
```

## Features

- **Comparison Tables**: Filter and sort providers across multiple categories
- **Provider Details**: Comprehensive information about each service provider
- **Affiliate Tracking**: Track clicks and append referral parameters
- **Admin Dashboard**: Monitor errors and system health
- **Responsive Design**: Optimized for all devices

## Project Structure

- `/components`: Reusable UI components
- `/pages`: Main application pages and routes
- `/data`: Mock data (will be replaced with Supabase integration)
- `/types`: TypeScript interfaces and types

