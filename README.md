# FinLitGo — Capstone Dicoding

> Financial literacy platform for Gen-Z. Learn, manage, and grow — all in one place.

---

## About

**FinLitGo** is an education and money-management web app designed for the Gen-Z demographic. It combines gamified financial literacy (classes, blog, AI assistant) with a personal finance dashboard backed by a real database.

---

## Tech Stack

### Frontend (`client/`)

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | TailwindCSS 4 |
| Routing | React Router DOM v7 |
| Animation | Framer Motion, GSAP, Lenis (smooth scroll) |
| WebGL Background | OGL |
| Icons | Tabler Icons, React Icons |
| Auth + DB | **Supabase** (`@supabase/supabase-js`) |
| AI Assistant | Google Generative AI (`@google/generative-ai`) |
| Chat History | Firebase |
| Utilities | clsx, tailwind-merge |

### Backend (`server/`)

| Category | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Framework | Express 5 |
| Database | Supabase (`@supabase/supabase-js`) |
| Auth Admin | Firebase Admin SDK |
| Dev tooling | Nodemon, dotenv, cors |

---

## Database: Supabase (PostgreSQL)

FinLitGo uses **Supabase** as its primary database and authentication provider.

### Tables

#### `users`
Linked to `auth.users` via UUID. Auto-created on sign-up via a Postgres trigger.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK, references `auth.users` |
| `email` | TEXT | |
| `full_name` | TEXT | |
| `avatar_url` | TEXT | |
| `role` | TEXT | `'user'` or `'admin'` |
| `streak_count` | INTEGER | Default 0 |
| `points` | INTEGER | Default 0 |
| `created_at` | TIMESTAMPTZ | |
| `updated_at` | TIMESTAMPTZ | |

#### `transactions`
Personal income/expense records per user.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK, auto-generated |
| `user_id` | UUID | FK → `users.id` |
| `title` | TEXT | |
| `type` | TEXT | `'income'` or `'expense'` |
| `amount` | INTEGER | |
| `category` | TEXT | |
| `date` | DATE | |

#### `goals`
Savings goals per user.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `user_id` | UUID | FK → `users.id` |
| `name` | TEXT | |
| `current` | INTEGER | Progress amount |
| `target` | INTEGER | Goal amount |

#### `pockets`
Named money pockets that can be funded toward goals.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `user_id` | UUID | FK → `users.id` |
| `name` | TEXT | |
| `balance` | INTEGER | Default 0 |

> All tables have **Row Level Security (RLS)** enabled — users can only access their own data.

### Database Setup

Run the SQL in Supabase Dashboard → SQL Editor:

```bash
# Full schema (users + financial tables + RLS)
database_setup.sql

# Users table only + trigger (if you only need auth)
supabase_setup.sql
```

---

## Authentication Flow

1. **Sign up / Log in** via Supabase Auth (email + password or Google OAuth)
2. A Postgres **trigger** (`on_auth_user_created`) auto-inserts a row into `public.users`
3. On load, `AuthContext` fetches the user's profile from `public.users`
4. If profile is **not found** in the DB, the user is redirected to `/register?view=complete` to fill in their details
5. Admin role is detected via `users.role = 'admin'` or a known admin email

---

## Pages & Routes

| Route | Description | Access |
|---|---|---|
| `/` | Landing / Home | Public |
| `/login` | Login page | Public |
| `/register` | Register / Complete Profile | Public |
| `/class` | Class listing | Public |
| `/class/:moduleId` | Class detail / learning view | Public |
| `/blog` | Blog listing | Public |
| `/blog/:postId` | Blog post detail | Public |
| `/ai-assist` | AI Financial Assistant | Public |
| `/dashboard` | User or Admin overview | 🔒 Auth |
| `/dashboard/finance` | Financial dashboard (income, expenses, goals, pockets) | 🔒 Auth |
| `/dashboard/history` | AI Chat history | 🔒 Auth |
| `/dashboard/classes` | Class progress tracker | 🔒 Auth |
| `/dashboard/settings` | Account settings | 🔒 Auth |
| `/dashboard/manage-classes` | Admin: Class CRUD | 🔒 Admin |
| `/dashboard/manage-blog` | Admin: Blog CRUD | 🔒 Admin |

---

## Project Structure

```text
Capstone-Dicoding/
├── client/                      # Vite + React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Auth/            # AuthContainer, login/register forms
│   │   │   ├── common/          # ProtectedRoute, SmoothScroll, etc.
│   │   │   └── layout/          # Navbar, Footer, DashboardLayout
│   │   ├── data/                # Static data (blog posts, class modules)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility libraries
│   │   ├── pages/
│   │   │   ├── AIAssistPage/    # AI Assistant UI
│   │   │   ├── AuthPage/        # Login / Register
│   │   │   ├── Blog/            # BlogPostPage
│   │   │   ├── BlogPage/        # Blog listing
│   │   │   ├── Class/           # ClassDetailPage
│   │   │   ├── ClassPage/       # Class listing
│   │   │   ├── Dashboard/       # All dashboard pages + admin CRUDs
│   │   │   └── HomePage/        # Landing page
│   │   ├── services/
│   │   │   └── supabase.js      # Supabase client instance
│   │   ├── store/
│   │   │   └── AuthContext.jsx  # Global auth + profile state
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.jsx              # Routes definition
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── utils/
│   │   └── config/
│   ├── server.js                # Entry point
│   ├── index.js                 # Backward-compatible entry
│   └── package.json
│
├── shared/                      # Shared types / constants
├── database_setup.sql           # Full Supabase schema (users + financial tables)
├── supabase_setup.sql           # Users table + trigger only
├── .env.example                 # Environment variable template
├── .gitignore
├── package.json                 # Workspaces root (client + server)
└── README.md
```

---

## Requirements

- **Git**: https://git-scm.com/
- **Node.js LTS** (v20 or v22 recommended): https://nodejs.org/
- **npm** (comes with Node)
- **Supabase account**: https://supabase.com/ (free tier is fine)
- **Google Gemini API key**: https://aistudio.google.com/ (for AI assistant)

> ⚠️ Node v25+ may show engine warnings from some transitive dependencies (`superstatic`). The app still runs fine; LTS (v20/v22) is recommended.

---

## Environment Variables

### Client (`client/.env`)
Create `client/.env` (copy from `.env.example` and extend):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-anon-key
VITE_GEMINI_API_KEY=your-google-gemini-api-key
```

### Server (`server/.env` or root `.env`)
```env
PORT=5000
```

> **Never commit `.env` files.** Only `.env.example` is tracked.

---

## Setup & Run

### 1. Clone the repo

```bash
git clone <REPO_URL>
cd Capstone-Dicoding
```

### 2. Install all dependencies (from project root)

```bash
npm install
```

### 3. Set up environment variables

```bash
# Copy example and fill in your values
cp .env.example client/.env
```

Edit `client/.env` with your **Supabase URL**, **Supabase anon key**, and **Gemini API key**.

### 4. Set up the Supabase database

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Open **SQL Editor**
3. Run `database_setup.sql` to create all tables and RLS policies

### 5. Run development servers

```bash
# Terminal 1 — frontend (http://localhost:5173)
npm run dev:client

# Terminal 2 — backend (http://localhost:5000)
npm run dev:server
```

Or run both at once from root if a `dev` script is configured:
```bash
npm run dev
```

---

## GitHub Workflow

### Create a feature branch and push

```bash
git checkout main
git pull origin main
git checkout -b feature/my-change

git add .
git commit -m "feat: describe your change"
git push -u origin feature/my-change
```

Then open a **Pull Request** on GitHub: `feature/my-change` → `main`.

### Undo / revert changes

```bash
# Discard changes in one file (not committed)
git restore path/to/file

# Discard ALL local changes (not committed)
git restore .

# Unstage a file
git restore --staged path/to/file

# Undo last commit, keep code
git reset --soft HEAD~1

# Undo last commit, discard code (DANGEROUS)
git reset --hard HEAD~1

# Revert a pushed commit safely
git revert <commit_sha>
git push
```

---

## Notes for Contributors

- Work on **feature branches** — don't commit directly to `main`
- Make small commits with clear [conventional commit](https://www.conventionalcommits.org/) messages (`feat:`, `fix:`, `chore:`, etc.)
- Open a PR for review before merging
- All Supabase queries must respect **RLS** — never bypass `auth.uid()` checks
