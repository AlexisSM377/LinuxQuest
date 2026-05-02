# AGENTS.md — LinuxQuest

## Quick Start

```bash
# Backend
cd backend && npm install && npm run dev    # http://localhost:3000

# Frontend (separate terminal)
cd frontend && npm install && npm run dev   # http://localhost:5173
```

Database setup (first time only, requires Neon DATABASE_URL in backend/.env):
```bash
cd backend && npm run init-db && npm run seed-quests && npm run seed-achievements
```

## Commands

| What | Command |
|------|---------|
| Dev backend | `npm run dev` (in `backend/`, uses nodemon) |
| Dev frontend | `npm run dev` (in `frontend/`, Vite) |
| Init DB | `npm run init-db` (backend, creates tables) |
| Seed quests | `npm run seed-quests` (backend, 85 missions) |
| Seed achievements | `npm run seed-achievements` (backend) |
| Lint frontend | `npm run lint` (in `frontend/`, ESLint) |
| Build frontend | `npm run build` (in `frontend/`) |
| No tests exist | backend `test` script is a placeholder |

## Architecture

```
Frontend (Vercel)          Backend (Fly.io)           DB (Neon)
React 19 + Vite  ------>  Express + Socket.io  --->  PostgreSQL
Port 5173                 Port 3000
```

- Frontend connects to backend via REST (`apiFetch` in `frontend/src/utils/api.js`) and WebSocket (`socket.io-client` in `Terminal.jsx`)
- Backend runs user-submitted Linux commands in a per-user sandbox (`/tmp/linuxquest-sandbox/user_<id>/`) inside a Docker container (Alpine)
- Backend uses Express 5 (not 4) — watch for middleware signature differences

## Env Vars

**backend/.env** (required):
- `DATABASE_URL` — Neon PostgreSQL connection string (with `sslmode=require`)
- `JWT_SECRET` — Random string, 32+ chars
- `FRONTEND_URL` — `http://localhost:5173` in dev
- `NODE_ENV` — `development` or `production`
- `PORT` — defaults to 3000

**frontend/.env** (optional):
- `VITE_API_URL` — Backend URL, defaults to `http://localhost:3000`

## Known Bugs (all fixed — don't re-introduce)

All previously known bugs have been fixed in this session:
- ~~Route shadowing~~ → Routes `/user/progress` and `/user/stats` now defined BEFORE `/:id`
- ~~Duplicate `progress` key~~ → Now uses `questProgress` and `progressPercent`
- ~~fly.toml `[processes]`~~ → Commented out, `tini` works as PID 1
- ~~vercel.json SPA rewrite~~ → Added `{ "source": "/((?!assets/).*)", "destination": "/index.html" }`

## Security Architecture (9 layers)

Commands go through validation in `backend/src/services/commandService.js` before execution:
1. Special command handling (clear, help)
2. Command preprocessor (interactive→non-interactive, path rewriting)
3. Audit logging (all attempts)
4. Global command blacklist (`securityConfig.js` FORBIDDEN_COMMANDS)
5. Global pattern detection (shell injection, redirections)
6. Sandbox validator (path traversal, sensitive files)
7. Per-quest command allowlist (`config/questCommands.js`)
8. Per-quest dangerous patterns
9. Sandbox execution (isolated `/tmp` directory per user)
10. Resource limits (30s timeout, 5MB output, 10k lines)

All commands in a pipe are validated individually (not just the first one).

Logs written to `/tmp/linuxquest-audit/` (commands.log, security-threats.log, etc.)

## Conventions

- **Language**: Code in English, comments in Spanish, commit messages in English
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`)
- **Components**: PascalCase files, functional components only, hooks prefixed `use`
- **CSS**: Tailwind utility classes + custom pixel-art design system in `index.css` (CSS custom properties, 4 themes)
- **State**: Zustand stores (`authStore.js`, `gameStore.js`, `toastStore.js`)
- **API**: Centralized fetch wrapper in `frontend/src/utils/api.js` (15s timeout, 1 retry, structured logging)
- **Backend models**: Classes with static methods (User, Quest, Progress) — not ideal but established pattern
- **ES modules**: Both packages use `"type": "module"` — use `import`/`export`, not `require`

## Deployment

- **Frontend**: Vercel — auto-detects Vite, root dir = `frontend/`, set `VITE_API_URL` env var
- **Backend**: Fly.io — `fly deploy` from `backend/`, uses Dockerfile (Alpine + 21 system packages + 35 mock scripts)
- **Backend runs as non-root user** (`sandbox`, UID 1001) inside Docker
- Mock scripts in `backend/sandbox-bin/` are installed to `/usr/local/bin/` in the container for educational command responses (journalctl, sudo, etc.)
- Command preprocessor converts interactive commands to non-interactive and rewrites system paths to sandbox-local

## File Map (key files)

```
backend/src/
  server.js              — Express + Socket.io setup, CORS, rate limiting
  db.js                  — PostgreSQL pool (Neon)
  services/commandService.js — 10-layer command validation + execution (with preprocessor)
  services/sandboxService.js — Per-user sandbox creation/cleanup
  security/securityConfig.js — Blacklists, dangerous patterns, limits, DEFAULT_ALLOWED_COMMANDS
  security/sandboxValidator.js — Path traversal, arg validation
  security/auditLogger.js — File-based audit logging
  config/questCommands.js — Per-quest allowed commands (85 quests, IDs 1-90)
  config/achievementsConfig.js — 14 achievements (primer_paso, mundo_1-5, nivel_5/10/20, etc)
  config/npcConfig.js     — 5 NPCs (one per world, matches seed-quests.js)
  config/enemiesConfig.js — 15 enemies + 5 bosses (one boss per world)
  utils/levelSystem.js    — 20 levels, nonlinear XP (max 9070 XP)
  utils/achievementChecker.js — Checks all 5 worlds for completion
  routes/quests.js       — Quest CRUD + completion + progress
  routes/auth.js         — Register, login, /me
  middleware/errorHandler.js — Error handling middleware

backend/scripts/
  seed-quests.js          — 85 quests (12+18+18+17+15+5), every quest has a real command
  seed-achievements.js    — Seeds 14 achievements from achievementsConfig.js

frontend/src/
  App.jsx                — Router (5 routes, no protected routes)
  utils/api.js           — Fetch wrapper (timeout, retry, logging)
  store/authStore.js     — Auth state + localStorage token
  store/gameStore.js     — Quests, progress, achievements, NPCs, enemies
  store/toastStore.js    — Toast notifications
  config/gameConfig.js   — DIFF_MAP, WORLD_COLORS (shared constants)
  components/Terminal.jsx — xterm.js + Socket.io terminal + world unlock interludes
  components/Quest.jsx   — Quest panel with world expansion + data-tutorial attrs
  components/BattleSystem.jsx — Boss battle (ref-based comm with Terminal)
  components/IntroOverlay.jsx — Full-screen lore intro with typing effect
  components/GameTutorial.jsx — 5-step spotlight overlay tutorial
  components/ErrorBoundary.jsx — React error boundary
  pages/GamePage.jsx     — Main game layout (orchestrates intro → tutorial → game)
```

## Quest System Structure

- **85 quests** across 5 worlds (12+18+18+17+15) + 5 extras (91-95)
- Every quest has a **real, executable Linux command** (no placeholder `pwd` for understanding quests)
- Quest IDs are sequential: World 1 (1-15), World 2 (16-35), World 3 (36-50), World 4 (51-70), World 5 (71-90), Extras (91-95)
- `questCommands.js` maps each quest ID to allowed commands, flags, and dangerous patterns
- `DEFAULT_ALLOWED_COMMANDS` in `securityConfig.js` contains 100+ commands available globally
- Boss quests (15, 35, 50, 70, 90) require completing all previous quests in the world
- Understanding-type quests use related commands (e.g., `cat /etc/os-release` for distribution concepts, `which` for software concepts)

## Gotchas

- Express 5 is used (not 4) — route params work differently, middleware must use `next()` carefully
- `backend/.env` is gitignored but may contain real Neon credentials — never commit it
- Frontend reads token from `localStorage` directly in multiple stores (not centralized)
- `DIFF_MAP` and `WORLD_COLORS` extracted to `frontend/src/config/gameConfig.js` (was duplicated)
- `axios` removed from frontend dependencies (was dead weight)
- `npm ci --omit=dev` used in Dockerfile (fixed from deprecated `--only=production`)
