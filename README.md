# IU Academic AI

Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase, and a provider-neutral
server-side LLM integration for academic assistance.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add Supabase project credentials and a server-only LLM API key/model.
4. Apply the SQL in `supabase/migrations/` to a Supabase project with the
   `vector` extension enabled.
5. Start the app with `npm run dev`.

The browser only calls `/api/chat`; `LLM_API_KEY` and provider requests remain
inside the Next.js server route. The LLM client is abstracted behind
`LlmProvider`, and document retrieval is abstracted behind `DocumentRetriever`
so providers and indexing strategies can be changed independently.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
