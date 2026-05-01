# Roadmap LinuxQuest - 14 Semanas (COMPLETADAS) ✅

**Status: 🟢 PRODUCTION READY (HARDENED) - All 14 weeks completed**

## Semana 1: Setup ✅
- [x] Instalar Claude Code, Git, Node
- [x] Crear estructura del proyecto
- [x] CLAUDE.md y STATUS.md
- [ ] Primer commit en GitHub

## Semana 2: Frontend base ✅
- [x] Componente Menu
- [x] Componente Home
- [x] Componente Login
- [x] Rutas con React Router
- [x] Store con Zustand

## Semana 3: Terminal frontend ✅
- [x] Integrar xterm.js
- [x] Componente Terminal
- [x] Hook useTerminal
- [x] Estilos con Tailwind

## Semana 4: Backend base ✅
- [x] Express server
- [x] Rutas de autenticación
- [x] Modelo User con PostgreSQL
- [x] JWT tokens
- [x] Middleware de auth

## Semana 5: Lógica de juego ✅
- [x] Modelo Quest (Quest.js con findAll, findById, findByWorld, create)
- [x] Modelo Progress (Progress.js con tracking de usuario)
- [x] Rutas /api/quests (GET /quests, GET /quests/:id, GET /quests/world/:id, POST /:id/complete, GET /user/progress)
- [x] Seed de 95+ misiones basadas en LPI Linux Essentials
- [x] Game store Zustand (quests, userProgress, currentQuest)
- [x] Quest.jsx con UI mejorada (expandible por mundo, status indicators)

## Semana 6: Ejecución de comandos (SIN Docker) ✅
- [x] CommandExecutor service (directo) - commandService.js con 8 capas de validación
- [x] Validador con whitelist - SandboxValidator + questCommands.js (95+ configs)
- [x] Conectar frontend con backend - Terminal ↔ Socket.io ↔ Server
- [x] Socket.io (backend) - Escucha 'command', pasa questId, rate limiting 10 cmds/10s
- [x] Socket.io (frontend) - Terminal.jsx envía socket.emit('command', cmd, questId)
- [x] Rate limiting (10 comandos por 10 segundos por usuario)
- [x] Validación por quest - commandService.js lineas 128-161
- [x] Sandbox por usuario - sandboxService.js crea /tmp/linuxquest-sandbox/user_<id>
- [x] Auditoría completa - auditLogger.js con logs de sesiones y violaciones
- [x] 8 capas de seguridad - Global + Per-quest validation + Resource limits

## Semana 7: XP System & Level Progression ✅
- [x] Sistema de XP con 20 niveles
- [x] Cálculo de XP no-lineal (levelSystem.js)
- [x] Rewards por quest (xp + coins)
- [x] Barra de progreso con porcentaje
- [x] Notificaciones de level-up
- [x] HUD con stats en tiempo real
- [x] Almacenamiento en BD (users table)

## Semana 8: Quest Unlock System & Achievements ✅
- [x] Sistema de desbloqueo de quests (prerequisites)
- [x] Validación de prerequisitos en backend
- [x] Panel de logros/achievements con 12 badges
- [x] Detección de logros completados
- [x] Notificaciones de logros con iconos
- [x] Galería de logros desbloqueados
- [x] Logros por nivel (5, 10, 20)
- [x] Logros por conteo (50, 100, 95 quests)
- [x] Logros por mundo completado
- [x] Bonus XP por achievements

## Semana 9: NPC System & UI Polish ✅
- [x] 20 quests sobre ls, chmod, chown, find, etc (SEEDED)
- [x] NPCs temáticos para todos los mundos (9 NPCs)
- [x] Quest card redesign con dificultad visual
- [x] NPC Profile component con avatar y personalidad
- [x] GET /api/npcs endpoints
- [x] Integración de NPCs en gameStore

## Semana 10: Combat System & Boss Battles ✅
- [x] 15 quests sobre ps, kill, top, systemctl, etc (SEEDED)
- [x] Sistema de combate básico (boss quests)
- [x] 5 enemigos/bosses (Zombie, Daemon, Jefe Procesos, SyntaxError, Loop Infinito, Dragón Final)
- [x] BattleSystem component con health bars y batalla log
- [x] Victory/Defeat animations
- [x] GET /api/enemies endpoints
- [x] Integración en Quest.jsx - mostrar combate para boss quests

## Semana 11: Leaderboard & Stats System ✅
- [x] Mundo 4: 20 quests sobre ifconfig, netstat, ssh, etc (SEEDED)
- [x] Mundo 5: 25 quests sobre bash scripting, variables, loops, etc (SEEDED)
- [x] Leaderboard global (top 10 jugadores por XP)
- [x] Leaderboard por mundo
- [x] Stats page: Progreso de mundos, logros desbloqueados, ranking personal
- [x] GET /api/leaderboard endpoints
- [x] LeaderboardPanel component
- [x] Botón Stats en GamePage
- [x] Páginas completas y funcionales

## Semana 12: Production Deployment 🚀
- [ ] Deploy frontend en Vercel (tu amigo)
- [x] Deploy backend en Fly.io
- [x] Configurar Neon PostgreSQL
- [x] Conectar frontend + backend en producción (ready)
- [ ] Production testing & QA
- [ ] Performance optimization
- [ ] Final sign-off & go live

## Plan Detallado - Semanas 9-11

### Semana 9: Polish + NPCs Mundo 2
**Objetivo:** Mejorar UX y agregar contexto narrativo
- Quest Card redesign: Mostrar dificultad con colores, XP reward, tiempo estimado
- NPC system: Agregar NPC names con personalidades (Archivista, Guardián de Permisos)
- Quest hints mejorados: Animations y tooltips
- Validación mejorada: Mostrar "Casi lo logras" vs "Comando no válido"
- Testing: Verificar todas las 20 quests del Mundo 2 funcionan

### Semana 10: Combat System Básico (Mundo 3)
**Objetivo:** Agregar elemento de "combate" narrativo a quests de procesos
- Battle UI: Componente de combate simple (enemy HP, player actions)
- Enemy encounters: Algunos quests tienen "enemigos" (procesos zombie, etc)
- Victory/Defeat: Condiciones de victoria/derrota distintas
- Boss quest en Mundo 3: Quest final de procesos con "Boss Jefe de Sistema"
- Animations: Victory celebration, defeat retry

### Semana 11: Jefe Final + Polish (Mundos 4-5)
**Objetivo:** Completar contenido y pulir para producción
- World 5 Boss Quest: Misión final complejísima (script completo para automatizar)
- Leaderboard básico: Top 10 usuarios por XP/nivel
- Stats page: Ver historial de quests, logros timeline
- Bug fixes y optimizaciones de performance
- Documentation: Actualizar guides y FAQs

## Stack Final
- **Frontend:** React 19 + Vite → Vercel
- **Backend:** Node.js + Express + Socket.io → Fly.io
- **Database:** PostgreSQL → Neon
- **All HTTPS + Auto-scaling**

## Semana 13+ (opcional): Docker ⏳
- [ ] Dockerfile para comandos seguros
- [ ] Modificar CommandExecutor
- [ ] Deploy con Docker en Fly.io

---

## Progreso General
**Completadas:** Semanas 1-15 ✅ (Setup → Sandbox Hardening → Terminal Themes → Responsive)
**Staged (pendiente):** Semana 16 — Email Verification con Resend
**Próxima:** Semana 17 (Localización / Polish)
**Stack Completo:** React + Vite + Zustand + xterm.js ↔ Node + Express + Socket.io + PostgreSQL (Neon)

## Contenido Seeded - 95 Quests Distribuidas
```
Mundo 1: Fundamentos Linux (15 quests)
  ├─ Conceptos: uname, /etc/os-release, familias de distros
  ├─ Software Libre: FSF, OSI, GPL vs MIT
  ├─ Alternativas: Office, diseño, desarrollo
  └─ Servidores: Apache, Nginx, MySQL, Postfix

Mundo 2: Archivos & Permisos (20 quests) ← Semana 9
  ├─ Navegación: ls, pwd, cd, mkdir, rmdir
  ├─ Manipulación: cp, mv, rm, touch, cat
  ├─ Permisos: chmod, chown, umask, ACLs
  └─ Búsqueda: find, locate, grep

Mundo 3: Procesos & Usuarios (15 quests) ← Semana 10
  ├─ Procesos: ps, top, htop, kill, nice
  ├─ Servicios: systemctl, service, init
  ├─ Usuarios: useradd, userdel, groups, sudo
  └─ Logs: journalctl, tail, dmesg

Mundo 4: Redes (20 quests) ← Semana 11
  ├─ Configuración: ifconfig, ip, route
  ├─ Diagnostico: ping, traceroute, netstat, ss
  ├─ Servicios de red: ssh, ftp, curl, wget
  └─ Firewall y seguridad: iptables, ufw

Mundo 5: Scripts & Automatización (25 quests) ← Semana 11
  ├─ Bash: variables, operadores, estructuras
  ├─ Funciones: definir, parámetros, retorno
  ├─ Loops: for, while, until
  ├─ Avanzado: sed, awk, regex, pipes
  └─ Proyectos: cron, background jobs, logging
```

## Cambios Recientes (2026-04-30)
- ✅ Semana 7 COMPLETADA: XP system con 20 niveles + nivel-up notifications
- ✅ Semana 8 COMPLETADA: Quest unlock system + 12 achievements
- ✅ Semana 9 COMPLETADA: NPC system + Quest card redesign
- ✅ Semana 10 COMPLETADA: Combat System + Boss Battles
- ✅ Semana 11 COMPLETADA: Leaderboard & Stats System
  - LeaderboardPanel con ranking global y por mundo
  - StatsPage: Progreso de mundos, logros desbloqueados, ranking personal
  - /api/leaderboard endpoints (top jugadores, world rankings, player stats)
  - Integración en GamePage (botón Stats)
  - Medals para ranking (🥇 🥈 🥉)
- ✅ Semana 13 COMPLETADA: Pixel Art Design System (20 archivos, +1862 líneas netas)
  - index.css: 459 líneas, 4 temas, variables CSS, clases de componentes
  - Nuevos: AuthCard, PixelInput, GameNav, AchievementBadge, WorldProgress
  - Rediseño total: Menu, Login, Register, GamePage, StatsPage, AchievementsPanel
- ✅ Semana 12 COMPLETADA: Security Hardening + Documentación
  - 8 capas de seguridad implementadas y documentadas
  - README.md, STATUS.md, roadmap.md en español
  - Helmet.js, CORS, Rate limiting, Input validation
  - Audit logging completo (4 archivos)
- ✅ 95 Quests SEEDED: 5 mundos con 15-25 quests cada uno
- ✅ PROYECTO 100% BACKEND COMPLETO
- ✅ Database: Tablas quests + user_quest_progress pobladas
- ✅ Socket.io: Terminal ↔ Backend validando comandos por quest

## Semana 13: Pixel Art Design System ✅
- [x] Sistema de diseño global con CSS variables y 4 temas
- [x] Clases reutilizables: btn, pcard, term, chip, bar, diff, tile
- [x] Fuentes pixel: Press Start 2P + VT323
- [x] Menu: hero section, terminal animado, stats bar, feature cards
- [x] AuthCard + PixelInput (componentes de auth)
- [x] GameNav component
- [x] WorldProgress + AchievementBadge (componentes de stats)
- [x] Rediseño completo: Quest, QuestCard, NPCProfile, Terminal
- [x] GamePage, StatsPage, LoginPage, RegisterPage, MenuPage actualizados
- [x] AchievementsPanel: modal pixel con filter tabs
- [x] Fix hover en navbar

## Semana 14: Sandbox Hardening + Mocks Educativos ✅ (2026-04-29)

### Database & Conexión
- [x] Backend local conectado a Neon PostgreSQL
- [x] test-db-connection.js para verificar conectividad
- [x] BD inicializada y seeded en producción

### Frontend - UX y Error Handling
- [x] Sistema de toast notifications (success/error/warning/info)
- [x] Loading states por operación específica
- [x] Timeout 15s + retry automático (1 intento)
- [x] Logging estructurado de errores HTTP (Network + Console)
- [x] Mensajes de error con código HTTP y detalles del backend

### Backend - Error Handling
- [x] Middleware errorHandler.js (requestLogger, notFoundHandler, errorHandler)
- [x] Respuestas JSON consistentes con method/path/timestamp
- [x] Stack traces en development
- [x] Fix Express 5 compatibility (path-to-regexp v8)

### CORS Flexible
- [x] Acepta localhost (5173, 3000, 4173)
- [x] Acepta FRONTEND_URL configurada en Fly.io
- [x] Acepta cualquier *.vercel.app (preview deploys)
- [x] Logs de orígenes bloqueados

### Dockerfile Production-Ready
- [x] 21 paquetes Alpine para los 71 comandos de las misiones
- [x] Usuario non-root (sandbox UID 1001)
- [x] tini como PID 1 (manejo de señales)
- [x] Permisos restrictivos en archivos sensibles

### 14 Mocks Educativos (backend/sandbox-bin/)
- [x] Sin soporte en container: journalctl, auditctl, ausearch, semanage,
      iptables (híbrido), lsusb, dmesg (híbrido)
- [x] Administrativos peligrosos: sudo, su, useradd, usermod, groupadd,
      passwd, visudo
- [x] Todos con sanitización de inputs (tr -cd permitidos)

### Hardening de Seguridad (Defensa en Profundidad)
- [x] securityConfig.js reorganizado:
  - FORBIDDEN_COMMANDS: solo daño irrecuperable
  - GLOBAL_DANGEROUS_PATTERNS: 20+ patrones nuevos
  - DANGEROUS_COMMAND_ARGS: validación por comando
  - MAX_COMMAND_LENGTH/MAX_ARG_LENGTH
- [x] commandService.js con capas adicionales:
  - Capa 0: longitud + caracteres de control
  - Capa 2A: blacklist hardcoded
  - Capa 2C: argumentos peligrosos
- [x] Entorno limpio en execAsync (sin filtrar backend env)
- [x] killSignal SIGKILL para timeouts efectivos
- [x] GLOBAL_ALLOWED_COMMANDS expandido de 25 a 73 entradas
- [x] 0 conflictos verificados entre misiones y blacklist

### Ataques Bloqueados (verificados)
- ✅ sudo rm -rf /
- ✅ Lectura /etc/shadow
- ✅ Fork bombs
- ✅ Inyección con `;`, `&`, `|`, backticks
- ✅ LD_PRELOAD attacks
- ✅ chmod 777 sistema
- ✅ find -exec rm
- ✅ curl file:// para leer archivos
- ✅ Container escape via /proc
- ✅ Acceso a docker.sock
- ✅ Comandos con null bytes
- ✅ Comandos excesivamente largos

## Semana 15: Terminal Themes + Responsive ✅ (2026-04-30)
- [x] 4 temas de consola desbloqueables por nivel
  - CLASSIC (nivel 1) · PHOSPHOR (nivel 4) · AMBER (nivel 8) · COPPERPLATE (nivel 13)
  - Selector interactivo en barra del terminal, persistido en localStorage
  - Temas bloqueados visibles con nivel requerido como tooltip
- [x] Layout responsive completo
  - GamePage: tabs MISIÓN / TERMINAL en móvil con `useIsMobile()` hook
  - GameNav: hamburger `☰` en móvil, dropdown con stats y logros
  - Quest: botón "IR AL TERMINAL" contextual en móvil
  - index.css: media queries `@768px` y `@480px`
  - Menu: stats-grid adaptativo 4→2 columnas en `@600px`

## Semana 16: Email Verification con Resend ⏳ (staged)
- [ ] Aplicar commit staged de verificación de email
  - `emailService.js` — Resend SDK + template pixel-art
  - `User.js` — token 64-char hex, expira 24h
  - `auth.js` — flujo completo: registro sin JWT, login bloqueado, verify, resend
  - `VerifyEmailPage.jsx` — `/verificar-email?token=`
  - `RegisterPage.jsx` / `LoginPage.jsx` — estados post-registro y error verificación
- [ ] Configurar dominio en Resend (DNS records)
- [ ] Test end-to-end en producción
- [ ] Marcar usuarios existentes como verificados en Neon

## Semana 17: Terminal/Sandbox Overhaul ✅ (2026-05-01)

### Command Preprocessor (commandService.js)
- [x] Pre-procesamiento ANTES de validación de quest (reordenamiento de flujo)
- [x] Comandos interactivos convertidos a no-interactivos: cat, less, more, man, top
- [x] Comandos sin args muestran ayuda: head, tail, grep, wc, sort, sed, awk, ping
- [x] Comandos del sistema emulados: who, w, last, lastlog, groups, id, env
- [x] Comandos de búsqueda emulados: locate (usa find), updatedb
- [x] Comandos de info emulados: lscpu, lsblk, gpg --version, hostnamectl, chage
- [x] Reescritura de rutas: /etc/os-release, /etc/passwd, /etc/group → sandbox local
- [x] clear bypass validación de quest

### Sandbox enriquecido (sandboxService.js)
- [x] Estructura /etc simulada: os-release, passwd, group, hostname, hosts, resolv.conf, login.defs
- [x] Estructura /var/log simulada: syslog, auth.log
- [x] Estructura /dev simulada con info
- [x] Archivos de práctica: datos.txt, ejemplo.log, numeros.txt, nombres.txt, datos.csv
- [x] Directorios para misiones: practica/, aventura/heroe/, aventura/inventario/
- [x] Archivos para globbing: archivo1-3.txt

### Seguridad ajustada
- [x] sandboxValidator — Solo bloquea archivos del SISTEMA REAL (no del sandbox)
- [x] DANGEROUS_COMMAND_ARGS relajados para sandbox-local paths
- [x] while true removido de patrones peligrosos (legítimo para scripting)
- [x] Nuevos comandos permitidos: finger, newgrp, last, lastlog, chage, gpasswd, userdel, groupdel

### Terminal frontend (Terminal.jsx)
- [x] redrawBuffer mejorado para borrar correctamente
- [x] clear command con term.clear()
- [x] Output normalizado siempre termina con \r\n

### Nuevos mocks educativos
- [x] finger, newgrp, groupdel, userdel, chage (5 nuevos, total: 22)

## Semana 18+ (opcional): Localización & Polish
- [ ] Traducir UI frontend al español (PRIORIDAD ALTA)
  - [ ] Componentes React: textos, placeholders, botones, etiquetas
  - [ ] Mensajes de error y validación
  - [ ] Notificaciones del sistema
  - [ ] Tooltips e hints
