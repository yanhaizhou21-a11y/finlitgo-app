## Capstone Dicoding

**About Finlitgo:**
Finlitgo is an education and money management site designed for the Gen-Z demographic, making financial literacy engaging and accessible.

**Key Frontend Dependencies:**
- `framer-motion` & `motion`: For advanced UI animations
- `ogl`: For lightweight WebGL backgrounds
- `@tabler/icons-react`: For scalable UI icons
- `tailwind-merge` & `clsx`: For dynamic Tailwind class management (shadcn/ui standard)

Monorepo:
- `client/` = Vite + React frontend
- `server/` = Express backend
- `shared/` = shared constants/types (optional)

## Requirements

- **Git**: `https://git-scm.com/`
- **Node.js (LTS recommended)**: `https://nodejs.org/` (Node 20+ recommended)
- **Package manager**: npm (comes with Node)

## Clone the repository

```bash
# HTTPS
git clone <REPO_URL>
cd Capstone-Dicoding

# or SSH
# git clone git@github.com:<username>/<repo>.git
```

To see your remotes:

```bash
git remote -v
```

## Project setup & run

### Folder structure

```text
project-root/
├── client/                 # Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── utils/
│   │   ├── config/
│   │   └── app.js
│   ├── server.js           # Entry point
│   ├── index.js            # Backward-compatible entrypoint
│   └── package.json
│
├── shared/
│   ├── types/
│   └── constants/
│
├── .env.example
├── .gitignore
├── package.json            # Workspaces (client + server)
└── README.md
```

### Environment variables

Copy `.env.example` to `.env` (don’t commit `.env`):

```bash
cp .env.example .env
```

Required for auth:

- `CLIENT_URL` (example: `http://localhost:5173`)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `JWT_SECRET`

### Install dependencies (from project root)

```bash
npm install
```

### Run development servers

Run these in **two terminals**:

```bash
# terminal 1: frontend
npm run dev:client
```

```bash
# terminal 2: backend
npm run dev:server
```

Backend default: `http://localhost:5000`

## GitHub workflow (clone, branch, push, revert)

### Create a new branch and push it to GitHub

```bash
# make sure you're on the latest main (or master)
git checkout main
git pull origin main

# create & switch to a new branch
git checkout -b feature/my-change

# stage and commit
git add .
git commit -m "Describe your change"

# push the branch to GitHub
git push -u origin feature/my-change
```

Then open a Pull Request (PR) on GitHub from `feature/my-change` → `main`.

### Push changes to a different branch (after you already edited files)

If you made changes on the wrong branch (example: you edited on `main` by mistake), you can move those changes to a new branch:

```bash
# create a new branch from your current state (keeps your changes)
git checkout -b fix/move-changes

# commit and push
git add .
git commit -m "Move changes to correct branch"
git push -u origin fix/move-changes
```

If you want to clean up `main` after moving changes, see “Undo changes” below.

## Undo / revert changes (common cases)

### 1) Discard changes in ONE file (not committed yet)

```bash
git restore path/to/file
```

### 2) Discard ALL local changes (not committed yet)

```bash
git restore .
```

If you also created new untracked files and want to delete them:

```bash
git clean -fd
```

### 3) Unstage a file (you ran git add, but not committed)

```bash
git restore --staged path/to/file
```

### 4) Undo the last commit but keep the code changes locally

```bash
git reset --soft HEAD~1
```

### 5) Undo the last commit and discard the code changes (DANGEROUS)

```bash
git reset --hard HEAD~1
```

### 6) Revert a commit (safe for shared branches)

This creates a **new commit** that undoes an older commit (recommended if you already pushed):

```bash
git revert <commit_sha>
git push
```

## Quick tips

- **Check current branch**:

```bash
git branch
```

- **See what changed**:

```bash
git status
git diff
```

- **Pull latest updates**:

```bash
git pull
```

## Notes for contributors

- Work on feature branches (don’t commit directly to `main`).
- Make small commits with clear messages.
- Open a PR for review/merge.
