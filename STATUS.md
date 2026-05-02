# LinuxQuest - Status (2026-05-02) - 🟢 PRODUCTION READY

## ✅ WEEKS 1-6 COMPLETED

### Week 1-4: Foundation ✅
- [x] Setup, Frontend base, Terminal component, Backend auth
- [x] PostgreSQL + User model + JWT + Socket.io
- [x] Menu, Login, Game pages with React Router + Zustand
- [x] Deployed: Fly.io backend, Neon database

### Week 5: Quest System & Game Logic ✅ (COMPLETED TODAY)
- [x] Quest.js model - findAll(), findById(), findByWorld(), create()
- [x] Progress.js model - trackProgress, updateStatus, getStats, incrementAttempts
- [x] seed-quests.js - 95+ missions seeded to database
- [x] Routes /api/quests/* (GET/POST all, by world, progress, complete)
- [x] gameStore.js - Zustand store with fetchQuests, fetchUserProgress
- [x] Quest.jsx component - Full redesign with expandable worlds + status indicators

### Week 6: Command Execution & Validation ✅ (COMPLETED TODAY)
- [x] CommandExecutor service - commandService.js (274 lines, 8 layers)
- [x] Sandbox per user - sandboxService.js creates /tmp/linuxquest-sandbox/user_<id>
- [x] Socket.io backend - Listens 'command', passes questId
- [x] Socket.io frontend - Terminal.jsx emits socket.emit('command', cmd, questId, callback)
- [x] Rate limiting - 10 commands per 10 seconds per user
- [x] Quest validation - Each quest has allowedCommands whitelist in questCommands.js
- [x] 8-layer security validation pipeline
- [x] Audit logging - Complete trails of commands, threats, violations, sessions
- [x] Updated Terminal.jsx - Socket.io integration
- [x] Updated GamePage.jsx - Quest sidebar + Terminal display

## 🚀 Deployed
**Frontend:** Vercel (tu amigo se encarga)
**Backend:** https://linuxquest-backend.fly.dev (Fly.io - Linux)
**Database:** Neon PostgreSQL

## 🔧 Backend (Fly.io)
- Express server + health check ✅
- PostgreSQL pool + Neon ✅
- Auth routes: /register, /login, /me ✅
- JWT middleware ✅
- Bcrypt password hashing ✅
- Socket.io WebSocket server ✅
- Command executor with quest validation ✅
- Quest-specific command whitelisting ✅
- Per-user sandbox execution ✅
- Rate limiting (10 cmds/10s) ✅
- Quest routes (/api/quests/*) ✅

## 📱 Frontend (Local)
- Terminal component with xterm.js ✅
- Auth pages (Login/Register) ✅
- Game page with quest sidebar ✅
- Quest component with full info display ✅
- Zustand auth store ✅
- Zustand game store ✅
- Routing setup ✅
- Dynamic API URL configuration ✅
- **Pixel Art Design System** (index.css, 4 themes, CSS vars) ✅
- **AuthCard + PixelInput** components ✅
- **GameNav** component ✅
- **AchievementBadge + WorldProgress** stat components ✅
- Menu redesign: hero, animated terminal, stats bar, feature cards ✅
- GamePage: pixel Quest panel + Terminal wrapper ✅
- StatsPage: WorldProgress bars + LeaderboardPanel redesign ✅
- AchievementsPanel: pixel modal con filter tabs ✅

## 🔐 Security (COMPLETED - 8 LAYERS)
- [x] Sandbox Validator - Path traversal, injection, sensitive files
- [x] Audit Logger - Comprehensive logging of all actions
- [x] Security Config - Centralized policies and limits
- [x] Global patterns - Block shell injection, redirections, etc.
- [x] Resource limits - Timeout 30s, output 5MB, 10k lines max
- [x] Forbidden commands - sudo, docker, mount, dd, etc.
- [x] Forbidden paths - /etc/*, /root, /sys, /proc, /.docker
- [x] Per-mission restrictions - Different rules per quest
- [x] Audit trails - /tmp/linuxquest-audit/* logs (5 files)
- [x] Security documentation - Complete SECURITY.md + README.md
- [x] Integration in commandService.js - 8-layer validation pipeline
- [x] Integration in server.js - Session logging + sandbox audit
- [x] Complete audit trail - commands, threats, violations, sessions

### Week 7: XP System & Level Progression ✅ (COMPLETED 2026-04-27)
- [x] XP calculation system (levelSystem.js - 20 levels)
- [x] Per-quest rewards (xp + coins)
- [x] User stats tracking (xp, level, coins)
- [x] Progress bar with percentage
- [x] Level-up animations and notifications
- [x] Nonlinear XP scaling (cumulative to level 20)
- [x] HUD display with real-time stats

### Week 8: Quest Unlock System & Achievements ✅ (COMPLETED 2026-04-27)
- [x] Quest prerequisites validation
- [x] Unlock system - block quests until prerequisites met
- [x] Achievement system with 12 badges
- [x] Achievement detection on quest completion
- [x] Achievement panel/gallery view
- [x] Achievement notifications with icons
- [x] Level-based achievements (5, 10, 20)
- [x] Quest count milestones (50, 100, all 95)
- [x] World completion achievements
- [x] XP bonus per achievement

## 📋 Next Phase - Week 15+
- [x] Terminal theme selector (4 temas desbloqueables por nivel) ✅
- [x] Responsive layout (mobile tabs, hamburger menu, media queries) ✅
- [ ] Email verification con Resend (staged — pendiente de aplicar)
- [ ] Traducir UI frontend al español
- [ ] Settings/preferences (language, difficulty)
- [ ] Daily quests & streaks
- [ ] Performance monitoring dashboard
- [ ] Timed challenges

## Architecture
```
Vercel (Frontend React)
    ↓ HTTPS
Fly.io (Backend Node.js + Socket.io)
    ↓
Neon (PostgreSQL)
```

## 🛡️ Security Features Summary

```
8-LAYER SECURITY ARCHITECTURE
├─ Layer 1: Audit Logger (registra todos los intentos)
├─ Layer 2: Global Command Blacklist (sudo, docker, etc)
├─ Layer 3: Global Pattern Detection (injection, redirection)
├─ Layer 4: Sandbox Validator (path traversal, sensitive files)
├─ Layer 5: Per-Mission Allowlist (solo comandos específicos)
├─ Layer 6: Per-Mission Patterns (restricciones adicionales)
├─ Layer 7: Sandbox Execution (/tmp/linuxquest-sandbox/user_<id>)
└─ Layer 8: Resource Limits (timeout 30s, output 5MB)

AUDIT TRAILS
├─ commands.log (todos los intentos)
├─ security-threats.log (ataques bloqueados)
├─ security-violations.log (infracciones)
├─ sandbox-access.log (sandbox events)
└─ sessions.log (sesiones usuario)

MONITORING TOOLS
└─ scripts/audit-monitor.js (análisis en tiempo real)
```

## Documentation Files
- `docs/SECURITY.md` - Documentación completa (16KB)
- `docs/SECURITY-QUICKSTART.md` - Guía de inicio rápido
- `backend/src/security/README.md` - Referencia de APIs

## 🎯 Session 2026-04-27 Summary

### Session Tasks Completed

**Priority 1: Database Setup** ✅
```bash
npm run init-db        # Created: users, quests, user_quest_progress tables
npm run seed-quests    # Populated: 95 missions from LPI Linux Essentials
```

**Priority 2: Command Validation** ✅
Status: Already 100% implemented!
- commandService.js: 8-layer validation pipeline
  - Layer 1-2: Global blacklist + global patterns
  - Layer 3-4: Sandbox validation + path traversal
  - Layer 5: Per-quest command whitelist (questCommands.js)
  - Layer 6: Per-quest dangerous patterns
  - Layer 7-8: Sandbox execution + resource limits
- questCommands.js: 95+ quests with allowedCommands config
- server.js: Socket.io passes questId to executeCommand
- Terminal.jsx: Emits questId with each command

**Priority 3: UI Improvements** ✅
- Quest.jsx: Complete redesign
  - Expandible worlds list (click to expand/collapse)
  - Status indicators per quest (🔒 locked, ► in-progress, ✓ completed)
  - Independent scroll (details top, quest list bottom)
  - Better responsive layout
- gameStore.js: Updated fetchUserProgress
  - Uses auth token from localStorage
  - Calls /api/quests/user/progress
  - Sets userProgress array in store

### Files Modified
- frontend/src/components/Quest.jsx (complete rewrite)
- frontend/src/store/gameStore.js (fetchUserProgress updated)
- docs/roadmap.md (updated weeks 5-6 status)
- STATUS.md (this file)

## 🚀 Ready to Test End-to-End

```bash
# Terminal 1: Backend
npm run dev --prefix backend

# Terminal 2: Frontend  
npm run dev --prefix frontend

# Browser: http://localhost:5173
# 1. Register/Login
# 2. Select quest from list (expandible by world)
# 3. Type: uname
# 4. Server validates: only allowed for quest 1
# 5. See output in terminal
```

### Week 9: NPC System & Quest Card Redesign ✅ (COMPLETED 2026-04-27)
- [x] NPC system with 9 unique NPCs (one per theme)
- [x] NPC personalities and specialties
- [x] NPCProfile component with avatar and greeting
- [x] Quest card redesign with difficulty gradients
- [x] Show XP rewards on quest cards
- [x] Better NPC information display in quest details
- [x] GET /api/npcs endpoints
- [x] gameStore integration for fetching NPCs

## Week 7-8 Implementation Summary (2026-04-27)

### Backend Changes
- **Progress.js**: Added `checkPrerequisites()` method for quest unlock validation
- **quests.js**: Added prerequisite checking in POST /:id/complete endpoint
- **achievementChecker.js**: Detects earned achievements based on user progress
- **achievementsConfig.js**: 12 achievements with icons and XP bonuses
- **achievements.js routes**: GET /api/achievements, GET /api/achievements/mine
- **init-db.js**: Added achievements and user_achievements tables
- **seed-achievements.js**: Scripts to populate achievements database

### Frontend Changes
- **gameStore.js**: Added achievements state and fetch methods
- **Quest.jsx**: Shows lock state for prerequisites with list of missing quests
- **XpNotification.jsx**: Extended to show achievement badges
- **AchievementsPanel.jsx**: New component showing achievements gallery
- **GamePage.jsx**: Added achievements button and panel integration

### Week 11: Leaderboard & Stats System ✅ (COMPLETED 2026-04-27)
- [x] Leaderboard global con top 10 jugadores
- [x] Leaderboard por mundo
- [x] Stats page con progreso de mundos
- [x] Achievements timeline
- [x] Player ranking y estadísticas
- [x] GET /api/leaderboard endpoints
- [x] LeaderboardPanel component
- [x] StatsPage con navegación desde GamePage

## 🎯 PROJECT COMPLETION STATUS

### ✅ SEMANAS COMPLETADAS (1-12)
- Semana 1-4: Setup + Frontend + Backend ✅
- Semana 5-6: Quest System + Command Execution ✅
- Semana 7: XP System (20 niveles) ✅
- Semana 8: Quest Unlock + Achievements (12 badges) ✅
- Semana 9: NPC System + UI Polish (9 NPCs) ✅
- Semana 10: Combat System + Boss Battles (6 bosses) ✅
- Semana 11: Leaderboard + Stats Page ✅
- Semana 12: Security Hardening + Deployment Ready ✅

### 📊 STATISTICS
- **95 Quests** - 5 mundos (LPI Linux Essentials)
- **20 Levels** - XP nonlinear progression
- **12 Achievements** - Auto-unlocked badges
- **9 NPCs** - Unique personalities
- **6 Bosses** - Combat encounters
- **16 API Endpoints** - Full backend coverage
- **8 Security Layers** - Command validation
- **100% Audit Logging** - Complete trail

### 🔐 SECURITY IMPLEMENTED
- ✅ Helmet.js (HTTP security headers)
- ✅ CORS restringido (solo frontend URL)
- ✅ Input validation (express-validator)
- ✅ Rate limiting (100 req/15min + per-user)
- ✅ Parameterized queries (SQL injection prevention)
- ✅ Path traversal blocking (SandboxValidator)
- ✅ User isolation (/tmp/linuxquest-sandbox/user_<id>/)
- ✅ Password hashing (bcrypt salt 10)
- ✅ JWT tokens (7 day expiration)
- ✅ Audit logging (4 log files)

## DEPLOYMENT INSTRUCTIONS - Semana 12 (FINAL)

### Frontend Deployment (Vercel) - Tu amigo
```bash
1. Ir a https://vercel.com
2. Conectar GitHub account
3. Importar repositorio: proyecto/LinuxQuest
4. Root directory: frontend/
5. Environment variables:
   VITE_API_URL=https://linuxquest-backend.fly.dev
6. Click Deploy
7. Vercel auto-detecta: Vite + npm run build
```

### Backend Status (Fly.io) - LIVE
```
URL: https://linuxquest-backend.fly.dev
Health: https://linuxquest-backend.fly.dev/api/health
Status: ✅ RUNNING
Database: Neon PostgreSQL (SSL)
```

### Database (Neon) - LIVE
```
95 Quests: SEEDED
12 Achievements: SEEDED
9 NPCs: CONFIGURED
6 Bosses: CONFIGURED
All tables: CREATED
```

## 📋 TAREAS PENDIENTES - Semana 13

### Interfaz de Usuario (PRIORIDAD ALTA)
- [ ] Traducir toda la UI frontend al español
  - [ ] Textos en componentes React
  - [ ] Placeholders de inputs
  - [ ] Botones y etiquetas
  - [ ] Mensajes de error y validación
  - [ ] Notificaciones del sistema
  - [ ] Tooltips e hints

### Testing en Producción
- [ ] Verificar login/register
- [ ] Probar ejecución de comandos
- [ ] Verificar conexión Socket.io
- [ ] Probar ganancia de XP
- [ ] Probar desbloqueo de logros
- [ ] Probar tabla de clasificación
- [ ] Testing de carga (usuarios concurrentes)
- [ ] Testing de seguridad (penetration testing)

### Monitoreo
- [ ] Monitorear tiempos respuesta API
- [ ] Verificar tasa de errores
- [ ] Revisar logs de auditoría
- [ ] Monitorear actividad de usuarios
- [ ] Monitoreo de espacio disco (/tmp)
- [ ] Performance de base de datos

### Mejoras Futuras (Post-Lanzamiento)
- [ ] Aplicación móvil (React Native)
- [ ] Dashboard de análisis avanzados
- [ ] Modo competitivo/torneos
- [ ] Guardado persistente de progreso
- [ ] Creación de desafíos personalizados
- [ ] Ajustes de dificultad
- [ ] Características comunitarias (foros, chat)
- [ ] Badges de certificación

### Semana 13: Pixel Art Design System ✅ (COMPLETED 2026-04-28)
- [x] Sistema de diseño global (index.css - 459 líneas, 4 temas)
- [x] CSS variables: colores, fuentes, radios, sombras pixel
- [x] Clases de componentes: btn, pcard, term, chip, bar, diff, tile
- [x] Fuentes pixel: Press Start 2P, VT323
- [x] Menu: hero section, terminal animado, stats bar, feature cards
- [x] Auth: componentes AuthCard + PixelInput (Login + Register)
- [x] GamePage: GameNav, Quest panel pixel, Terminal con pixel wrapper
- [x] StatsPage: WorldProgress bars, AchievementBadge, LeaderboardPanel redesign
- [x] AchievementsPanel: modal pixel con filter tabs
- [x] QuestCard, NPCProfile, Quest: full pixel redesign
- [x] Fix navbar button hover (color explícito, button reset)
- [x] 20 archivos modificados, +1862 líneas netas

### Archivos Nuevos (Semana 13)
- `frontend/src/components/auth/AuthCard.jsx`
- `frontend/src/components/auth/PixelInput.jsx`
- `frontend/src/components/game/GameNav.jsx`
- `frontend/src/components/stats/AchievementBadge.jsx`
- `frontend/src/components/stats/WorldProgress.jsx`

### Semana 14: Sandbox Hardening + Mocks Educativos ✅ (COMPLETED 2026-04-29)

**Database & Conexión:**
- [x] Backend local conectado a Neon PostgreSQL (.env actualizado)
- [x] Script `backend/test-db-connection.js` para verificar conectividad
- [x] BD inicializada con 95 quests + 12 achievements

**Frontend - Error Handling y UX:**
- [x] Sistema de toast notifications (toastStore.js + Toast.jsx)
  - 4 tipos: success, error, warning, info — auto-dismiss + click para cerrar
  - Estilo pixel-art consistente, animación slide-in
- [x] Loading states por operación (gameStore.loadingStates)
- [x] Timeout 15s + retry automático (1 intento) en apiFetch
- [x] Logging estructurado en console (collapsible groups, color-coded por status)
- [x] LeaderboardPanel migrado a apiFetch con manejo de errores

**Backend - Error Handling:**
- [x] Middleware `backend/src/middleware/errorHandler.js`:
  - `requestLogger`, `notFoundHandler`, `errorHandler` global
- [x] Respuestas JSON consistentes: { error, code, method, path, timestamp }
- [x] Fix Express 5: middleware con `startsWith('/api/')` (en lugar de `/api/*`)

**CORS Flexible:**
- [x] Acepta localhost (5173, 3000, 4173)
- [x] Acepta `FRONTEND_URL` configurada en Fly.io
- [x] Acepta cualquier `*.vercel.app` (preview deploys incluidos)
- [x] Logs de orígenes bloqueados para debugging
- [x] Socket.io con misma lógica de CORS

**Dockerfile - 21 paquetes Alpine para 71 comandos:**
- [x] Reales: bash, coreutils, findutils, grep, sed, gawk, procps, util-linux,
  iproute2, net-tools, iputils, bind-tools, iptables, openssh-client,
  curl, less, gzip, tar, acl, shadow, sudo, mandoc, man-pages, usbutils
- [x] Helpers: su-exec, tini

**14 Mocks Educativos en `backend/sandbox-bin/`:**
- [x] Sin soporte en container (7): journalctl, auditctl, ausearch,
  semanage, iptables (híbrido), lsusb, dmesg (híbrido)
- [x] Comandos administrativos peligrosos (7): sudo, su, useradd,
  usermod, groupadd, passwd, visudo
- [x] Todos sanitizan inputs: `printf '%s' | tr -cd 'permitidos' | head -c N`

**Allowlist Global Expandida:**
- [x] `GLOBAL_ALLOWED_COMMANDS`: 25 → 73 entradas
- [x] 0 conflictos entre misiones y blacklist (verificado automáticamente)

**Hardening de Seguridad (Defensa en Profundidad):**
- [x] Usuario non-root: `sandbox` (UID 1001) ejecuta Node
- [x] `tini` como PID 1 (manejo correcto de señales, previene zombies)
- [x] Permisos restrictivos: `/etc/shadow` 600, sandboxes 700
- [x] `securityConfig.js` reorganizado:
  - `FORBIDDEN_COMMANDS`: solo daño irrecuperable (docker, mount, dd, mkfs, etc.)
  - `GLOBAL_DANGEROUS_PATTERNS`: 20+ patrones (fork bombs, escapes /proc, etc.)
  - `DANGEROUS_COMMAND_ARGS`: validación específica por comando
  - `MAX_COMMAND_LENGTH: 1000`, `MAX_ARG_LENGTH: 256`
- [x] `commandService.js` con nuevas capas:
  - Capa 0: longitud máxima + bloqueo de caracteres de control
  - Capa 2A: blacklist hardcoded (FORBIDDEN_COMMANDS) antes de allowlist
  - Capa 2C: validación de argumentos peligrosos por comando
- [x] Entorno limpio en `execAsync`: solo PATH/HOME/USER/LANG (no filtra backend env)
- [x] `killSignal: 'SIGKILL'` para timeouts efectivos

### Ataques Bloqueados (Verificación)
| Ataque | Bloqueado por |
|--------|---------------|
| `sudo rm -rf /` | mock + DANGEROUS_PATTERNS |
| `cat /etc/shadow` | DANGEROUS_COMMAND_ARGS + permisos 600 |
| Fork bomb | regex GLOBAL_DANGEROUS_PATTERNS |
| `cmd1; rm -rf /` | regex `/[;&|`]/` |
| `LD_PRELOAD=...` | env limpio + regex |
| `chmod 777 /etc` | DANGEROUS_COMMAND_ARGS |
| `find / -exec rm` | DANGEROUS_COMMAND_ARGS |
| `curl file:///etc/passwd` | DANGEROUS_COMMAND_ARGS |
| Escape vía /proc/self/exe | FORBIDDEN_PATHS + non-root |
| Acceso a docker.sock | regex GLOBAL_DANGEROUS_PATTERNS |
| Comando con null bytes | filtro `\x00-\x1F` en capa 0 |
| Comando >1000 chars | MAX_COMMAND_LENGTH |

### Archivos Nuevos (Semana 14)
- `backend/test-db-connection.js`
- `backend/.gitignore`
- `backend/Dockerfile` (rewrite completo)
- `backend/src/middleware/errorHandler.js`
- `backend/sandbox-bin/` (14 scripts mock)
- `frontend/src/store/toastStore.js`
- `frontend/src/components/Toast.jsx`

### Archivos Modificados (Semana 14)
- `backend/.env` (DATABASE_URL → Neon)
- `backend/src/server.js` (CORS flex, error middleware, fix Express 5)
- `backend/src/services/commandService.js` (capas 0, 2A, 2C, env limpio)
- `backend/src/security/securityConfig.js` (FORBIDDEN reorganizado, args validation)
- `frontend/src/utils/api.js` (timeout, retry, logging HTTP detallado)
- `frontend/src/store/gameStore.js` (loading states, toasts en errores)
- `frontend/src/components/LeaderboardPanel.jsx` (apiFetch + toast errores)
- `frontend/src/App.jsx` (ToastContainer global)

## Last Updated
2026-04-30 - Terminal Themes + Responsive + Email Verification (staged) ✅

### Session 2026-04-30 (2) — Terminal Themes + Responsive + Email Verification

**Terminal Themes (commiteado):**
- [x] 4 temas desbloqueables por nivel: CLASSIC (1), PHOSPHOR (4), AMBER (8), COPPERPLATE (13)
- [x] Selector en barra del terminal — botones clickeables, activo resaltado con foreground del tema
- [x] Temas bloqueados visibles pero no seleccionables (opacidad 35%, `cursor: not-allowed`, tooltip con nivel requerido)
- [x] Persistencia en `localStorage` (`linuxquest-terminal-theme`)
- [x] Validación al cambiar de nivel — regresa al mejor disponible si el seleccionado se bloquea

**Responsive Layout (commiteado):**
- [x] `useIsMobile()` hook — detecta `< 768px`, listener sin leak de memoria
- [x] GamePage: tabs MISIÓN / TERMINAL en móvil (ambos paneles montados, CSS display toggle)
- [x] GameNav: hamburger `☰` en móvil con dropdown (XP, coins, STATS, LOGROS); items ocultos con `.nav-hide-mobile`
- [x] Quest: botón `▶ IR AL TERMINAL` en móvil cuando hay comandos pendientes (`onGoToTerminal` prop)
- [x] index.css: media queries `@768px` (tipografía, nav, cards) y `@480px` (ultra-compacto)
- [x] Menu: `stats-grid` CSS class — 4 cols desktop → 2 cols en `@600px`
- [x] Nav brand: "LINUXQUEST" en desktop, "LQ" en móvil

**Email Verification con Resend (staged — NO commiteado):**
- [~] `emailService.js` — Resend SDK + template pixel-art verde, fallback a `console.warn` sin API key
- [~] `User.js` — token `crypto.randomBytes(32)`, expira 24h, métodos: findByVerificationToken, markEmailVerified, updateVerificationToken
- [~] `auth.js` — POST /register (sin JWT), POST /login (bloquea si no verificado), GET /verify-email, POST /resend-verification (cooldown 60s)
- [~] `add-email-verification.js` — script de migración (ya ejecutado en Neon ✅)
- [~] `VerifyEmailPage.jsx` — `/verificar-email?token=`, 3 estados: verifying / success / error
- [~] `RegisterPage.jsx` — muestra "revisa tu correo" post-registro
- [~] `LoginPage.jsx` — bloque EMAIL_NOT_VERIFIED con botón reenviar
- [~] `App.jsx` — ruta `/verificar-email`
- [~] `.env` — `RESEND_API_KEY` y `RESEND_FROM` configurados

### Session 2026-04-30 - Bugfix Marathon

**Backend Bugs Fixed:**
- [x] Transaction logic in quest completion (all queries now use `client`)
- [x] Achievement XP bonuses now applied when earned
- [x] Pipe validation now checks ALL commands in pipeline, not just first
- [x] Removed `wget` from contradictory ALLOWED + FORBIDDEN lists
- [x] Seed script now TRUNCATEs before inserting (idempotent)
- [x] Fixed Chinese characters in Spanish quest hints

**Frontend Bugs Fixed:**
- [x] Quest auto-complete tracks ALL required commands (not just one)
- [x] Battle hits only register for required commands
- [x] Boss battles only trigger on actual boss quests (IDs 15/35/50/70/90)
- [x] Terminal resize listener no longer leaks
- [x] Theme change no longer destroys/recreates terminal + socket
- [x] Victory/defeat timeouts properly cleaned up on unmount
- [x] `completeQuest` adds new progress entry if missing
- [x] Ref assignments moved out of render in Terminal.jsx

**Improvements:**
- [x] `validateToken()` called on App mount for session validation
- [x] Socket disconnect/reconnect UI indicators
- [x] `handleQuestComplete` memoized with `useCallback`
- [x] Shared constants extracted to `gameConfig.js`
- [x] ErrorBoundary component added
- [x] vi/nano/htop mock scripts added
- [x] AGENTS.md updated (fixed bugs removed, gotchas updated)

**PROJECT STATUS: 🟢 PRODUCTION READY**
**DEPLOYMENT: Frontend en Vercel, Backend listo para Fly.io redeploy**
**SECURITY: 10+ CAPAS DE DEFENSA EN PROFUNDIDAD + pipe validation completa**

### Session 2026-05-01 — Terminal/Sandbox Overhaul ✅

**Problema principal:** La terminal simulada tenía múltiples comandos que colgaban indefinidamente, comandos que fallaban sin razón, y el sandbox era demasiado básico para soportar las misiones educativas.

**Command Preprocessor (commandService.js — reescritura completa):**
- [x] Pre-procesamiento ANTES de validación de quest (reordenamiento de flujo)
- [x] `cat` sin args → mensaje de ayuda (antes colgaba esperando stdin)
- [x] `cat -n`/`cat -b` sin archivo → mensaje de ayuda
- [x] `less`/`more` → convertidos a `cat` (no son interactivos)
- [x] `man` → usa `MANPAGER=cat PAGER=cat` (no abre paginador)
- [x] `top` → batch mode `top -b -n 1` (no es interactivo)
- [x] `ping` → agrega `-c 4 -W 3` automáticamente
- [x] `curl` → agrega `--connect-timeout 5 -m 10`
- [x] `ssh-keygen` → modo no interactivo (`-t ed25519 -N ""`)
- [x] `head`/`tail`/`grep`/`wc`/`sort`/`sed`/`awk` sin archivo → mensaje de ayuda
- [x] `clear` → limpieza de terminal (bypass antes de validación de quest)
- [x] `history` → simulado con datos de ejemplo

**Emulación de comandos del sistema:**
- [x] `who`/`w`/`last`/`lastlog` → simulados con formato real
- [x] `groups` → "sandbox student wheel"
- [x] `id` → "uid=1001(sandbox) gid=1001(sandbox) groups=..."
- [x] `id <usuario>` → simulado para cualquier usuario
- [x] `env`/`printenv` → variables del sandbox
- [x] `locate` → usa `find` como alternativa + nota educativa
- [x] `updatedb` → simulado
- [x] `lscpu`/`lsblk` → simulados si no existen en container
- [x] `gpg --version` → simulado
- [x] `hostnamectl` → simulado
- [x] `chage -l` → simulado

**Reescritura de rutas del sistema a sandbox-local:**
- [x] `/etc/os-release` → `sandbox/etc/os-release`
- [x] `/etc/passwd` → `sandbox/etc/passwd`
- [x] `/etc/group` → `sandbox/etc/group`
- [x] `/etc/hostname` → `sandbox/etc/hostname`
- [x] `/etc/hosts` → `sandbox/etc/hosts`
- [x] `/etc/resolv.conf` → `sandbox/etc/resolv.conf`
- [x] `/etc/login.defs` → `sandbox/etc/login.defs`
- [x] `/var/log/syslog` → `sandbox/var/log/syslog`
- [x] `/var/log/auth.log` → `sandbox/var/log/auth.log`

**Sandbox enriquecido (sandboxService.js):**
- [x] Archivos de ejemplo: `datos.txt`, `ejemplo.log`, `numeros.txt`, `nombres.txt`, `datos.csv`, `script_demo.sh`
- [x] Estructura `/etc` simulada: os-release, passwd, group, hostname, hosts, resolv.conf, login.defs
- [x] Estructura `/var/log` simulada: syslog, auth.log
- [x] Estructura `/dev` simulada con info de dispositivos
- [x] Directorios de práctica: `practica/`, `aventura/heroe/`, `aventura/inventario/`
- [x] Archivos para globbing: `archivo1.txt`, `archivo2.txt`, `archivo3.txt`
- [x] Archivos para quests de copia/movimiento: `aventura.txt`, `original.txt`
- [x] `numeros_grandes.txt` para sort/wc

**Seguridad ajustada (securityConfig.js + sandboxValidator.js):**
- [x] `sandboxValidator.js` — Solo bloquea archivos sensibles del SISTEMA REAL (no del sandbox)
- [x] `cat` ya no bloquea `/etc/passwd`/`/etc/shadow` en DANGEROUS_COMMAND_ARGS
- [x] `head`/`tail`/`grep` args relajados para sandbox
- [x] `sed` solo bloquea `/etc/shadow`/`/etc/sudoers` in-place
- [x] `cp`/`mv`/`ln` ya no bloquean `/etc/` genérico (sandbox tiene su propio /etc)
- [x] `while true` removido de patrones peligrosos (legítimo para scripting Mundo 5)
- [x] Agregados a DEFAULT_ALLOWED_COMMANDS: `finger`, `newgrp`, `last`, `lastlog`, `chage`, `gpasswd`, `userdel`, `groupdel`

**Terminal frontend (Terminal.jsx):**
- [x] `redrawBuffer` mejorado — borra correctamente al editar en medio del buffer
- [x] Handle `clear` command — limpia pantalla con `term.clear()`
- [x] Handle `isClear` flag del servidor
- [x] Output normalizado — siempre termina con `\r\n`
- [x] Error/output display mejorado — no muestra "(sin salida)" innecesario

**Nuevos mocks educativos (sandbox-bin/):**
- [x] `finger` — información de usuarios simulada
- [x] `newgrp` — cambio de grupo simulado
- [x] `groupdel` — eliminación de grupo bloqueada
- [x] `userdel` — eliminación de usuario bloqueada
- [x] `chage` — aging de contraseña simulado

**Dockerfile actualizado:**
- [x] 5 nuevos mocks copiados: finger, newgrp, chage, groupdel, userdel
- [x] Total: 22 mocks educativos

**Verificación de seguridad:**
- [x] `rm -rf /` sigue bloqueado
- [x] Shell injection con `;` sigue bloqueado
- [x] Path traversal sigue bloqueado
- [x] Command substitution `$()` y backticks siguen bloqueados
- [x] Acceso a archivos reales del sistema sigue bloqueado
- [x] Fork bombs siguen bloqueadas
- [x] Frontend build: OK (sin errores nuevos)
- [x] Backend modules: OK (todos cargan correctamente)

### Session 2026-05-02 — Reorganización LPI + Lore + Tutorial

**Reorganización de 95 → 85 misiones alineadas con LPI Linux Essentials:**
- [x] `seed-quests.js` — 85 misiones reescritas (12+18+18+17+15+5 extras)
- [x] `questCommands.js` — 85 configs de allowedCommands actualizadas
- [x] `achievementsConfig.js` — count 95→85, guerrero_persistente 80→70
- [x] `enemiesConfig.js` — boss questIds 12,30,48,65,80 (ya correctos)
- [x] `levelSystem.js` — comentario actualizado a 85 quests
- [x] `Menu.jsx` — textos "85 misiones"

**Lore medieval-fantástico "El Reino del Kernel":**
- [x] 5 NPCs con backstory profundo en `npcConfig.js`
- [x] Historia por mundo: Castillo, Senderos, Torres, Forja, Bovedas
- [x] Misiones con narrativa coherente (cada comando tiene sentido en la historia)
- [x] Bosses con questIds sincronizados con enemiesConfig.js

**Contenido educativo en sandbox (`/reino/`):**
- [x] `sandboxService.js` — +200 líneas de archivos educativos
- [x] `/reino/historia/` — origen.txt, linus.txt, stallman.txt, gnu.txt, git.txt, futuro.txt
- [x] `/reino/distros/` — familias.txt, debian.txt, redhat.txt, arch.txt, suse.txt, embebidos.txt
- [x] `/reino/licencias/` — gpl.txt, mit.txt, bsd.txt, apache.txt
- [x] `/reino/software/` — escritorio.txt, servidores.txt, lenguajes.txt, escritorios.txt, seguridad.txt
- [x] `/misiones/` — servidores.log, usuarios.csv, config_ejemplo.conf

**Misiones dinámicas e interactivas:**
- [x] Misiones teóricas usan `ls /reino/` y `cat /reino/...` para explorar
- [x] Misiones de procesamiento usan `/misiones/servidores.log` y `/misiones/usuarios.csv`
- [x] Cada misión tiene sentido narrativo (no solo "ejecuta este comando")
- [x] Historia guía al usuario hacia la solución

**Intro narrativa (pantalla completa):**
- [x] `IntroOverlay.jsx` — componente nuevo, pantalla completa con efecto typing
- [x] Lore se escribe letra por letra (18-50ms por carácter)
- [x] "PRESIONA ENTER PARA CONTINUAR" al finalizar
- [x] Se muestra solo la primera vez (localStorage `lq-intro-shown`)

**Tutorial interactivo (spotlight):**
- [x] `GameTutorial.jsx` — componente nuevo con overlay + spotlight
- [x] 5 pasos: Nav, Detalle misión, Lista misiones, Barra terminal, Terminal
- [x] Retry logic: intenta 15 veces encontrar el elemento antes de saltar
- [x] ENTER/ESPACIO avanza, ESC salta
- [x] Se muestra después de la intro (no al mismo tiempo)

**Interludios narrativos entre mundos:**
- [x] Al completar boss quest → evento `world:unlock` → narrativa en terminal
- [x] 4 interludios: Mundo 2 (Grep-ild), Mundo 3 (Chmod-ard), Mundo 4 (Kernel), Mundo 5 (Sudo-Man)
- [x] Efecto typing en la terminal del juego

**Dockerfile:**
- [x] Agregado paquete `file` (para comando `file` en misiones)

**Documentación actualizada:**
- [x] `REORGANIZATION_PLAN.md` — plan final con 85 misiones
- [x] `LINUXQUEST_CONTENT.md` — distribución actualizada
- [x] `GUIA_ESTUDIO_LINUX_ESSENTIALS.md` — link a LinuxQuest

**Archivos nuevos:**
- `frontend/src/components/IntroOverlay.jsx`
- `frontend/src/components/GameTutorial.jsx`

**Archivos modificados:**
- `backend/scripts/seed-quests.js` (85 misiones)
- `backend/src/config/questCommands.js` (85 configs)
- `backend/src/config/achievementsConfig.js` (count 85)
- `backend/src/services/sandboxService.js` (archivos educativos)
- `backend/Dockerfile` (paquete file)
- `backend/src/utils/levelSystem.js` (comentario)
- `frontend/src/components/Terminal.jsx` (quitado intro, interludios)
- `frontend/src/components/Quest.jsx` (data-tutorial attrs)
- `frontend/src/components/GameTutorial.jsx` (spotlight fix)
- `frontend/src/pages/GamePage.jsx` (intro + tutorial integration)
- `frontend/src/components/Menu.jsx` (85 misiones)
- `docs/REORGANIZATION_PLAN.md`
- `docs/LINUXQUEST_CONTENT.md`
- `docs/GUIA_ESTUDIO_LINUX_ESSENTIALS.md`

**PROJECT STATUS: 🟢 PRODUCTION READY**
**PENDIENTE: commitear cambios y hacer npm run seed-quests**
