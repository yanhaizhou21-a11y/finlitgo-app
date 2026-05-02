# FinLitGo — Capstone Dicoding

> Financial literacy platform for Gen-Z. Learn, manage, and grow — all in one place.

---

## About

**FinLitGo** is an education and money-management web app designed for the Gen-Z demographic. It combines gamified financial literacy (classes, blog, AI assistant) with a personal finance dashboard backed by a real database.

- **Git**: `https://git-scm.com/`
- **Node.js (LTS recommended)**: `https://nodejs.org/` (Node 20+ recommended)
- **Package manager**: npm (comes with Node)

### Anggota Tim Capstone

| No  | ID Cohort    | Nama                         | Email                              | Asal Sekolah  |
| --- | ------------ | ---------------------------- | ---------------------------------- | ------------- |
| 1   | CFS022D6Y531 | Raafi Muhamad Fajar          | CFS022D6Y531@student.devacademy.id | SMKN 1 Ciomas |
| 2   | CFS022D6Y592 | Muhammad Abdel Razza Khoirie | CFS022D6Y592@student.devacademy.id | SMKN 1 Ciomas |
| 3   | CFS022D6Y616 | Amr Abdul Jabar Ar Royyan    | CFS022D6Y616@student.devacademy.id | SMKN 1 Ciomas |
| 4   | CFS022D6X636 | Siti Rahmah                  | CFS022D6X636@student.devacademy.id | SMKN 1 Ciomas |
| 5   | CFS022D6Y077 | Raihan Daffa                 | CFS022D6Y077@student.devacademy.id | SMKN 1 Ciomas |

---

## Tech Stack

### Frontend (`client/`)

| Category         | Technology                                 |
| ---------------- | ------------------------------------------ |
| Framework        | React 19 + Vite 8                          |
| Styling          | TailwindCSS 4                              |
| Routing          | React Router DOM v7                        |
| Animation        | Framer Motion, GSAP, Lenis (smooth scroll) |
| WebGL Background | OGL                                        |
| Icons            | Tabler Icons, React Icons                  |
| Auth + DB        | **Supabase** (`@supabase/supabase-js`)     |
| AI Assistant     | Groq (`llama-3.3-70b-versatile`)           |
| Chat History     | Local Storage                              |
| Utilities        | clsx, tailwind-merge                       |

### Backend (`server/`)

| Category    | Technology                         |
| ----------- | ---------------------------------- |
| Runtime     | Node.js (CommonJS)                 |
| Framework   | Express 5                          |
| Database    | Supabase (`@supabase/supabase-js`) |
| Auth Admin  | Firebase Admin SDK                 |
| Dev tooling | Nodemon, dotenv, cors              |

---

## Authentication Flow

1. **Sign up / Log in** via Supabase Auth (email + password or Google OAuth)
2. A Postgres **trigger** (`on_auth_user_created`) auto-inserts a row into `public.users`
3. On load, `AuthContext` fetches the user's profile from `public.users`
4. If profile is **not found** in the DB, the user is redirected to `/register?view=complete` to fill in their details
5. Admin role is detected via `users.role = 'admin'` or a known admin email

---

## Pages & Routes

| Route                       | Description                                            | Access   |
| --------------------------- | ------------------------------------------------------ | -------- |
| `/`                         | Landing / Home                                         | Public   |
| `/login`                    | Login page                                             | Public   |
| `/register`                 | Register / Complete Profile                            | Public   |
| `/class`                    | Class listing                                          | Public   |
| `/class/:moduleId`          | Class detail / learning view                           | Public   |
| `/blog`                     | Blog listing                                           | Public   |
| `/blog/:postId`             | Blog post detail                                       | Public   |
| `/ai-assist`                | AI Financial Assistant                                 | Public   |
| `/dashboard`                | User or Admin overview                                 | 🔒 Auth  |
| `/dashboard/finance`        | Financial dashboard (income, expenses, goals, pockets) | 🔒 Auth  |
| `/dashboard/history`        | AI Chat history                                        | 🔒 Auth  |
| `/dashboard/classes`        | Class progress tracker                                 | 🔒 Auth  |
| `/dashboard/settings`       | Account settings                                       | 🔒 Auth  |
| `/dashboard/manage-classes` | Admin: Class CRUD                                      | 🔒 Admin |
| `/dashboard/manage-blog`    | Admin: Blog CRUD                                       | 🔒 Admin |

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

> ⚠️ Node v25+ may show engine warnings from some transitive dependencies (`superstatic`). The app still runs fine; LTS (v20/v22) is recommended.

---

## Environment Variables

### Client (`client/.env`)

Create `client/.env` (copy from `.env.example` and extend):

```env
VITE_SUPABASE_URL=YOUR_URL
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=YOUR_KEY
VITE_GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Required for auth:

- `CLIENT_URL` (example: `http://localhost:5173`)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `JWT_SECRET`

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

Edit the `.env` file to include your database and API keys.

### 4. Run development servers

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

## Notes for Contributors

- Work on **feature branches** — don't commit directly to `main`
- Make small commits with clear [conventional commit](https://www.conventionalcommits.org/) messages (`feat:`, `fix:`, `chore:`, etc.)
- Open a PR for review before merging
- All Supabase queries must respect **RLS** — never bypass `auth.uid()` checks
