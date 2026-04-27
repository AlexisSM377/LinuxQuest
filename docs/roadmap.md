# Roadmap LinuxQuest - 12 semanas

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

## Semana 7-8: Mundo 1 completo ⏳
- [ ] Tema 1: Comandos básicos
- [ ] 4 misiones completas
- [ ] NPCs del tema 1
- [ ] Sistema de XP
- [ ] Sistema de niveles

## Semana 9-10: Mundos 2-3 ⏳
- [ ] Tema 2: Archivos y permisos
- [ ] Tema 3: Procesos
- [ ] Sistema de combate
- [ ] Enemigos y bosses

## Semana 11: Mundos 4-5 ⏳
- [ ] Tema 4: Redes
- [ ] Tema 5: Scripts
- [ ] Jefe final
- [ ] Polish y bug fixes

## Semana 12: Deploy 🟡
- [ ] Deploy frontend en Vercel (tu amigo)
- [x] Deploy backend en Fly.io
- [x] Configurar Neon PostgreSQL
- [ ] Conectar frontend + backend en producción
- [ ] Dominio personalizado (opcional)
- [ ] Anuncio público

## Stack Final
- **Frontend:** React 18 + Vite → Vercel
- **Backend:** Node.js + Express + Socket.io → Fly.io
- **Database:** PostgreSQL → Neon
- **All HTTPS + Auto-scaling**

## Semana 13+ (opcional): Docker ⏳
- [ ] Dockerfile para comandos seguros
- [ ] Modificar CommandExecutor
- [ ] Deploy con Docker en Fly.io

---

## Progreso General
**Completadas:** Semanas 1-6 ✅ (Setup, Frontend, Terminal, Backend, Quests, Ejecución)
**En progreso:** Semana 7-8 (XP system, progresión visible)
**Stack Completo:** React + Vite + Zustand + xterm.js ↔ Node + Express + Socket.io + PostgreSQL

## Cambios Recientes (2026-04-27)
- ✅ Semana 5 COMPLETADA: 95+ quests seeded a BD
- ✅ Semana 6 COMPLETADA: 8-layer validation + per-quest command whitelisting
- ✅ questCommands.js: Configuración para cada quest (allowedCommands, patterns)
- ✅ commandService.js: Validación multi-capa (líneas 58-274)
- ✅ Quest.jsx UI: Rediseñado con estado visual (🔒 locked, ► in-progress, ✓ completed)
- ✅ gameStore.js: fetchUserProgress con autenticación
- ✅ Database: Tablas quests + user_quest_progress pobladas
- ✅ Socket.io: Terminal ↔ Backend validando comandos por quest
