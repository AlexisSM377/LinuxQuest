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

## Archivos de referencia
- STATUS.md: progreso actual
- docs/roadmap.md: plan 12 semanas

## Al iniciar sesión
1. Lee STATUS.md
2. Pregunta qué vamos a trabajar hoy
3. Propón 2-3 tareas del día
4. Confirma con usuario antes de ejecutar
