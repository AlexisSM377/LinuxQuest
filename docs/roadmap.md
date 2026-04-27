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
**Completadas:** Semanas 1-11 ✅ (Setup, Frontend, Terminal, Backend, Quests, Ejecución, XP System, Achievements, NPCs, Combat, Leaderboard)
**Próxima:** Semana 12 (Deploy en producción)
**Stack Completo:** React + Vite + Zustand + xterm.js ↔ Node + Express + Socket.io + PostgreSQL

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

## Cambios Recientes (2026-04-27)
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
- ✅ 95 Quests SEEDED: 5 mundos con 15-25 quests cada uno
- ✅ PROYECTO 92% COMPLETO - Solo falta deploy en Semana 12
- ✅ Database: Tablas quests + user_quest_progress pobladas
- ✅ Socket.io: Terminal ↔ Backend validando comandos por quest
