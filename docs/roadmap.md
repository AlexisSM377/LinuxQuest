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
**Completadas:** Semanas 1-8 ✅ (Setup, Frontend, Terminal, Backend, Quests, Ejecución, XP System, Achievements)
**Próximas:** Semanas 9-12 (Boss Battles, Inventory, Leaderboard, Deploy)
**Stack Completo:** React + Vite + Zustand + xterm.js ↔ Node + Express + Socket.io + PostgreSQL

## Cambios Recientes (2026-04-27)
- ✅ Semana 7 COMPLETADA: XP system con 20 niveles + nivel-up notifications
  - levelSystem.js: Cálculo XP no-lineal (0 a 9070 XP para nivel 20)
  - quests.js: POST /:id/complete otorga XP y actualiza nivel
  - XpNotification.jsx: Animaciones de level-up
  - GamePage.jsx: HUD con barra de progreso y stats
  
- ✅ Semana 8 COMPLETADA: Quest unlock system + 12 achievements
  - Progress.js: checkPrerequisites() valida desbloqueo de quests
  - achievementChecker.js: Detecta logros automáticamente
  - achievementsConfig.js: 12 badges (primer_paso, nivel_5/10/20, mundo_1/2/3, etc)
  - AchievementsPanel.jsx: Galería de logros desbloqueados/bloqueados
  - Quest.jsx: Muestra requisitos previos y candado visual
- ✅ Database: Tablas quests + user_quest_progress pobladas
- ✅ Socket.io: Terminal ↔ Backend validando comandos por quest
