# Ecoyaan Checkout Flow

A simplified multi-step checkout flow built with Next.js (App Router), React, Tailwind CSS, and Zustand.

## What this project does

The app simulates a checkout journey with four states:
1. Cart / Order Summary
2. Shipping Address
3. Payment Confirmation
4. Success

It uses server-rendered cart data for initial load, then manages the flow on the client.

## Architecture choices

- **Next.js App Router + SSR data fetch**
  - `app/checkout/page.tsx` fetches initial cart data on the server using `getCartDataSSR()`.
  - This satisfies the SSR requirement and ensures the page starts with populated cart data.

- **Global state with Zustand (persisted)**
  - Store: `store/useCheckoutStore.tsx`
  - Holds `cartData`, `shippingAddress`, and current `step`.
  - Uses Zustand `persist` middleware so flow state survives refresh/navigation.
  - `initializeCheckout(initialCartData)` seeds store once from SSR payload.

- **Reusable, modular UI by step**
  - `components/checkout/CartView.tsx`
  - `components/checkout/AddressForm.tsx`
  - `components/checkout/PaymentView.tsx`
  - `components/checkout/SuccessView.tsx`
  - `components/checkout/CheckoutFlow.tsx` controls which step renders.

- **Single source of truth for cart badge**
  - `components/layout/AppBar.tsx` reads cart quantity from the same Zustand store.
  - Cart count stays synced with quantity updates.

- **Mock backend/data**
  - Mock data source: `lib/mockCart.ts`
  - API route available at `pages/api/cart.ts`

## Run locally

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm

### Install and start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

- Landing page: `/`
- Checkout flow: `/checkout`

## Useful scripts

```bash
npm run dev    # start dev server
npm run lint   # run ESLint
npm run build  # production build
npm run start  # run production server
```

## Notes

- Cart and address state are intentionally persisted in browser storage for assignment behavior.
- If you want a fresh flow, use the "Start New Checkout" action in the success screen.
