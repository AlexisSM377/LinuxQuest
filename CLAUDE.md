# LinuxQuest

## Stack
- Frontend: React 19 + Vite + Zustand + xterm.js + Tailwind
- Backend: Node.js 20 + Express 5 + PostgreSQL + Socket.io
- Deploy: Vercel + Fly.io + Neon

## Estructura
- frontend/src/{components,pages,hooks,store,utils}
- backend/src/{controllers,routes,models,services,middleware}

## Convenciones
- Componentes: PascalCase
- Hooks: useXxx
- Commits: conventional commits (feat:, fix:, docs:)
- Comentarios: español
- Código: inglés

## Reglas clave
1. Async/await siempre
2. Try/catch explícito
3. Hooks funcionales (no clases)
4. Tailwind para CSS
5. Validar inputs
6. No git commits (el usuario los hace manualmente)
7. Todo debe ser emulable en sandbox (Alpine Docker)
8. 85 misiones alineadas con LPI Linux Essentials 010-160

## Archivos de referencia
- STATUS.md: progreso actual (sesiones, fixes pendientes)
- AGENTS.md: Quick start + architecture + conventions
- docs/roadmap.md: plan por semanas
- docs/REORGANIZATION_PLAN.md: estructura de 85 misiones LPI
- docs/LINUXQUEST_CONTENT.md: referencia educativa completa

## Al iniciar sesión
1. Lee STATUS.md para ver última sesión y qué falta
2. Lee AGENTS.md para contexto de arquitectura
3. Pregunta qué vamos a trabajar hoy
4. Propón 2-3 tareas del día
5. Confirma con usuario antes de ejecutar
