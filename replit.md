# Portfolio Website

## Overview

This is a premium full-stack developer portfolio website built with modern web technologies. The application features a clean, soft-modern aesthetic with a focus on showcasing technical skills, projects, and professional experience. It's designed as a single-page application with smooth scrolling navigation and interactive elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state
- **Animations**: GSAP (GreenSock Animation Platform) for smooth animations and scroll effects

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)

### Design System
- **Typography**: Pacifico font for headings, Quicksand for body text
- **Color Palette**: 
  - Primary: #008BF9 (bright blue)
  - Secondary: #263959 (dark navy)
  - Accent: #36DB9F (green)
  - Background: #EDF7FE (soft pink/white)
  - Text: #696E77 (muted gray)
- **Theme**: Light/dark mode support with CSS custom properties

## Key Components

### Portfolio Sections
1. **Hero Section**: Full-screen introduction with animated elements and CTAs
2. **About Section**: Bio, tech stack with interactive icons, resume download
3. **Projects Section**: Filterable project grid with hover effects and case studies
4. **Services Section**: Four-column service offering grid
5. **Testimonials Section**: Auto-rotating carousel with client feedback
6. **Contact Section**: Contact form with social media links
7. **Footer**: Consistent branding and social links

### Technical Components
- **Navigation**: Fixed header with smooth scroll navigation and mobile hamburger menu
- **Theme Provider**: Context-based theme switching between light/dark modes
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Animation System**: GSAP-powered animations with scroll triggers
- **Form Handling**: React Hook Form with Zod validation

## Data Flow

### Client-Side Data Management
- Static content stored in TypeScript data files (`/client/src/data/`)
- Projects, services, and testimonials managed as typed interfaces
- Form state handled locally with React Hook Form
- Theme preferences persisted in localStorage

### Server-Side Data Flow
- Express.js server with middleware for logging and error handling
- Drizzle ORM for type-safe database operations
- Memory storage implementation for development (easily swappable)
- Session management with PostgreSQL backing store

### API Structure
- RESTful API endpoints prefixed with `/api`
- CRUD operations through storage interface abstraction
- JSON request/response format with proper error handling

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Query
- **UI Framework**: Radix UI components, Tailwind CSS
- **Animation**: GSAP with ScrollTrigger plugin
- **Forms**: React Hook Form, Hookform Resolvers
- **Database**: Drizzle ORM, Neon Database client
- **Validation**: Zod for schema validation

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **Code Quality**: ESLint, Prettier (implied by tooling)
- **Development Experience**: Replit-specific plugins for enhanced dev experience

### External Services
- **Database**: Neon PostgreSQL (serverless)
- **Fonts**: Google Fonts (Pacifico, Quicksand)
- **Icons**: Lucide React, React Icons (Simple Icons)
- **Images**: Unsplash for placeholder project images

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR
- **Database**: Environment-based DATABASE_URL configuration
- **Asset Serving**: Vite handles static assets with proper optimization

### Production Build
- **Frontend**: Vite build process creates optimized static assets
- **Backend**: esbuild bundles server code for Node.js deployment
- **Database Migration**: Drizzle Kit for schema management
- **Environment Variables**: DATABASE_URL required for production

### Hosting Considerations
- **Frontend**: Static files served from `/dist/public`
- **Backend**: Express server serves API and static files
- **Database**: PostgreSQL connection via environment configuration
- **Session Store**: PostgreSQL-backed session storage for scalability

### Performance Optimizations
- **Code Splitting**: Vite handles automatic code splitting
- **Image Optimization**: Responsive images with proper sizing
- **Animation Performance**: GSAP with hardware acceleration
- **Database**: Connection pooling through Neon serverless client
- **Caching**: Static asset caching and API response optimization

The application is structured as a monorepo with shared TypeScript types, making it easy to maintain consistency between frontend and backend while ensuring type safety throughout the entire stack.