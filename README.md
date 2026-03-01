# pim

Small React + Vite app with Tailwind CSS and Supabase.

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm

## Install

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

## Start

```bash
npm run dev
```

Default local URL: `http://localhost:5173`

## Other Scripts

- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Dependencies

Runtime dependencies:

- `react`
- `react-dom`
- `react-router-dom`
- `react-responsive`
- `lucide-react`
- `@supabase/supabase-js`
- `tailwindcss`
- `@tailwindcss/vite`

Dev dependencies:

- `vite`
- `typescript`
- `eslint` and related ESLint plugins
- `@vitejs/plugin-react`
- `postcss`
- `autoprefixer`
- `ts-loader`
