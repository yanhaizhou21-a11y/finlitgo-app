## Capstone Dicoding

Project capstone repository.

## Requirements

- **Git**: install from `https://git-scm.com/`
- **Code editor**: Cursor / VS Code recommended

If this project uses a specific runtime (Node/Python/Java/etc.), add it here (example):
- **Node.js (LTS)**: `https://nodejs.org/`

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

Because setups differ per project, use the matching section below.

### If this is a Node.js project

```bash
# install dependencies
npm install

# run (pick one that exists in package.json)
npm run dev
# or
npm start
```

### If this is a Python project

```bash
python -m venv .venv

# Windows PowerShell
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
python main.py
```

If none of these match your project, update this README with the correct commands.

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
