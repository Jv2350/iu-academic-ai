# IU Academic AI

## Overview

IU Academic AI is a student-focused Academic Copilot prototype. It brings
exams, timetable, attendance, assignments, notices, events, library guidance,
study tools, and grounded academic conversations into one workspace.

This prototype was created for the **IU School AI Platform Development Team
selection task**.

## Problem Statement

Students often need to search across timetables, examination notices,
assignment instructions, attendance records, policies, and study material before
they can answer a simple academic question. Generic chatbots do not know which
information is authoritative and may confidently invent university-specific
details.

## Solution

IU Academic AI combines authenticated student data, a curated academic
knowledge base, intent detection, and a server-side LLM abstraction. The
assistant identifies the request type, retrieves relevant context, cites the
source when available, and clearly reports when reliable information cannot be
found.

The primary flow is:

```text
Login → Dashboard → Ask Academic AI → Retrieve context → Answer → Source → Action
```

## Features

- Supabase email/password authentication
- Clearly labeled demo student account
- Protected student application routes
- Responsive sidebar and application shell
- Student dashboard with academic overview
- Exams, timetable, attendance, assignments, notices, events, and library modules
- Academic Assistant at `/chat`
- Structured chat responses with intent and source metadata
- Chat history with new, rename, delete, and continue actions
- AI Study Mode at `/study`
- Interactive MCQ practice and scoring
- Contextual “Ask AI” actions from academic modules
- Markdown-like assistant responses, copying, feedback controls, and loading states
- Academic knowledge base with clickable source pages
- Keyword retrieval fallback with a pgvector-ready architecture
- Contact Support workflow
- Light, dark, and system themes
- Prototype indicator: `Prototype • Demo Academic Data`

Demo content is intentionally labeled as demonstration information and must
not be treated as official university policy or records.

## Architecture

The project uses the Next.js App Router and keeps UI, API, AI, retrieval, and
data concerns separate:

```text
app/                 Pages and Route Handlers
components/          Reusable UI, layout, chat, study, and support components
data/                Replaceable demo data sources
lib/ai/              LLM provider, prompts, intent, and study services
lib/knowledge/       Document loading, chunking, and retrieval
lib/rag/             Retrieval and citation contracts
lib/services/        Shared authentication and API helpers
lib/supabase/        Browser and server Supabase clients
knowledge/           Demonstration academic documents
supabase/migrations/ PostgreSQL schema, pgvector, and RLS policies
```

The UI does not call an LLM provider directly. Browser requests go through
Next.js Route Handlers, which keep provider credentials on the server.

## Technology Stack

### Frontend

- Next.js 16 App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-compatible components
- Lucide React icons

### Backend

- Next.js Route Handlers
- Server-side TypeScript services
- Vercel-compatible deployment model

### Database and authentication

- Supabase Auth
- Supabase PostgreSQL
- PostgreSQL Row Level Security
- pgvector-compatible knowledge chunk storage

### AI

- Provider-neutral `LlmProvider` abstraction
- OpenAI-compatible server-side provider implementation
- Replaceable embedding provider interface

## AI Architecture

The central AI contracts live in [`lib/ai/`](/Users/jayesh/CS/Projects/iu-academic-ai.worktrees/tech-stack-setup-nextjs-supabase/lib/ai):

1. Validate the incoming question.
2. Resolve the authenticated Supabase user.
3. Classify intent.
4. Retrieve student-specific and academic context.
5. Build the centralized academic system prompt.
6. Call the server-only LLM provider.
7. Return a structured response:

```json
{
  "message": "Your next exam is...",
  "sources": [
    {
      "title": "Examination Guidelines",
      "section": "Exam Requirements"
    }
  ],
  "intent": "exam"
}
```

The supported intent categories include exams, timetable, attendance,
assignments, notices, events, library, syllabus, academic policy, study help,
general academic, and unsupported requests.

## RAG Pipeline

The retrieval design is modular:

```text
Document
  → Text loading
  → Section-aware chunking
  → Embedding provider
  → Vector storage
  → Semantic search
  → Relevant context
  → LLM response
  → Source citation
```

The current demo uses a deterministic keyword retrieval fallback in
[`lib/knowledge/retrieval.ts`](/Users/jayesh/CS/Projects/iu-academic-ai.worktrees/tech-stack-setup-nextjs-supabase/lib/knowledge/retrieval.ts).
Supabase pgvector contracts and migration support are available for semantic
retrieval when embeddings and database infrastructure are configured.

Documents currently live in [`knowledge/`](/Users/jayesh/CS/Projects/iu-academic-ai.worktrees/tech-stack-setup-nextjs-supabase/knowledge):

- Exam guidelines
- Examination rules
- Attendance policy
- Library rules
- Assignment policy
- Academic calendar

The assistant does not fabricate citations. A source card is only rendered
when the backend returns source metadata.

## Database Schema

The Supabase migrations define:

- `students`
- `subjects`
- `exams`
- `timetable`
- `attendance`
- `assignments`
- `notices`
- `events`
- `library_items`
- `knowledge_documents`
- `knowledge_chunks`
- `chat_sessions`
- `chat_messages`
- `support_requests`

The academic schema is in
[`supabase/migrations/20260914171200_academic_schema.sql`](/Users/jayesh/CS/Projects/iu-academic-ai.worktrees/tech-stack-setup-nextjs-supabase/supabase/migrations/20260914171200_academic_schema.sql).

## Authentication

Supabase Auth manages student sessions. The Next.js `proxy.ts` refreshes and
checks sessions at the application boundary:

- Public landing page: `/`
- Login page: `/login`
- Protected student routes: dashboard, chat, study, modules, settings, and support
- Authenticated users visiting `/login` or `/` are redirected to `/dashboard`
- Unauthenticated users visiting protected routes are redirected to `/login`

Student-specific queries use the authenticated Supabase identity rather than
trusting a `student_id` supplied by the browser.

## Security

- LLM keys are server-only environment variables.
- Browser code communicates with application Route Handlers, not the LLM.
- Request bodies are validated before processing.
- Supabase RLS protects student profiles, attendance, assignments, chat history,
  and support requests.
- Public academic data has authenticated read policies where appropriate.
- Technical failures are logged server-side and sanitized for users.
- Demo passwords are never stored in source code.
- Demo data is clearly labeled and is not presented as official university data.

## Installation

Requirements:

- Node.js 20 or newer
- npm
- A Supabase project for authentication and database features
- An OpenAI-compatible LLM provider for live AI responses

Install dependencies:

```bash
npm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

Apply the SQL files in `supabase/migrations/` to the Supabase project. Enable
the `vector` extension if pgvector retrieval is being used.

## Environment Variables

Create `.env.local` from [`.env.example`](/Users/jayesh/CS/Projects/iu-academic-ai.worktrees/tech-stack-setup-nextjs-supabase/.env.example):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Server-only. Never expose these with NEXT_PUBLIC_.
LLM_API_KEY=
LLM_MODEL=
LLM_BASE_URL=https://api.openai.com/v1

# Server-only demo account configured in Supabase Auth.
DEMO_STUDENT_EMAIL=
DEMO_STUDENT_PASSWORD=
```

Never commit `.env.local` or provider secrets.

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
```

## Demo Account

Create a student user in Supabase Auth, then configure its credentials through:

```env
DEMO_STUDENT_EMAIL=
DEMO_STUDENT_PASSWORD=
```

Use the **Continue with demo account** button on `/login`. The credentials are
not embedded in the application.

The interface identifies its records as demo data through the footer label:

> Prototype • Demo Academic Data

## Screenshots

Screenshots can be added here when the prototype is deployed or reviewed in a
browser. The main screens to capture are:

- Public landing page
- Login
- Student dashboard
- Academic Assistant with source card
- Study Mode and MCQ practice
- Academic modules
- Settings with theme switcher

## Future Improvements

- Connect every module to Supabase queries instead of demo data.
- Add production document ingestion and PDF text extraction.
- Generate and persist embeddings for all knowledge chunks.
- Replace keyword fallback with pgvector semantic search.
- Add streaming LLM responses.
- Add rate limiting and abuse monitoring for chat endpoints.
- Add server-side preference persistence.
- Add richer citation page/paragraph metadata.
- Add faculty and admin roles after the student experience is complete.

## Limitations

- Academic records are demonstration data.
- The keyword retriever is not a substitute for production semantic search.
- The MCQ bank is a small curated prototype set.
- Some controls, such as library catalogue search and notifications, are
  visual prototype interactions.
- A configured Supabase project and LLM provider are required for live
  authenticated AI requests.
- The prototype does not claim official university policies, dates, venues,
  thresholds, or notices.

## Author

IU Academic AI was created as a prototype for the **IU School AI Platform
Development Team selection task**.
