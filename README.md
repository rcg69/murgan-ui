# Murgan — E-commerce Frontend

A responsive e-commerce web application for browsing products, managing a shopping cart, placing orders, and administering catalog and store data.

**Live application:** https://murgan-ui.vercel.app  
**Backend:** [murgan_backend](https://github.com/rcg69/murgan_backend)

## Overview

Murgan is implemented with the Next.js App Router and React. The frontend communicates with a separate Spring Boot REST API and keeps common application concerns in reusable contexts and API utilities.

## Features represented in the application

- Product listing, product details, search, filtering, sorting, and pagination
- Customer registration and sign-in
- Shopping cart and checkout flows
- Customer order pages
- Admin pages for dashboard, products, categories, users, and orders
- Shared authentication, cart, and admin state
- Centralized API request handling and API error handling

Feature availability depends on the connected backend and its configuration.

## Technology

- **Frontend:** Next.js 16, React 19, JavaScript
- **Styling and UI:** Tailwind CSS 4, Bootstrap 5, Radix UI icons
- **Client-side utilities:** TanStack Query, Framer Motion, Recharts
- **API integration:** Fetch-based REST client
- **Backend:** [Spring Boot, Java 17, Spring Data JPA, Spring Security, PostgreSQL](https://github.com/rcg69/murgan_backend)

## Architecture

```text
src/
├── app/          # App Router pages (products, cart, checkout, account, admin)
├── components/   # Reusable UI and product components
├── config/       # Frontend configuration
├── context/      # Authentication, cart, and admin contexts
├── lib/          # API client, errors, DTOs, token and pagination utilities
├── data/         # Local product data
├── hooks/        # Shared React hooks
└── styles/       # Component styles
```

The frontend uses a centralized API client for HTTP requests, query parameters, bearer-token headers, JSON handling, and normalized API errors. The backend owns persistence, business rules, and authorization.

## Run locally

### Prerequisites

- Node.js compatible with the installed Next.js version
- npm
- The Murgan Spring Boot API and a configured PostgreSQL database for full end-to-end flows

### Install and start

```bash
git clone https://github.com/rcg69/murgan-ui.git
cd murgan-ui
npm ci
npm run dev
```

Open http://localhost:3000.

### Environment

Create a local `.env.local` file and configure the backend API base URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

Use the correct API base URL for your backend environment. Do not commit real credentials, access tokens, or private environment files.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Related repository

The REST API is maintained separately in [rcg69/murgan_backend](https://github.com/rcg69/murgan_backend). Refer to that repository for database setup, authentication configuration, and API endpoint details.
