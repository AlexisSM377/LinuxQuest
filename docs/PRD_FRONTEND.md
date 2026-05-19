# PRD — LinuxQuest Frontend

**Product Requirements Document**
**Versión:** 1.0
**Fecha:** 2026-05
**Estado:** Producción ✅
**Autor:** Equipo LinuxQuest

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Objetivo del Producto](#2-objetivo-del-producto)
3. [Usuarios Objetivo](#3-usuarios-objetivo)
4. [Stack Tecnológico](#4-stack-tecnológico)
5. [Arquitectura del Frontend](#5-arquitectura-del-frontend)
6. [Páginas y Rutas](#6-páginas-y-rutas)
7. [Componentes](#7-componentes)
8. [Estado Global (Stores)](#8-estado-global-stores)
9. [Sistema de Comunicación con Backend](#9-sistema-de-comunicación-con-backend)
10. [Sistema de Diseño (Design System)](#10-sistema-de-diseño-design-system)
11. [Funcionalidades por Módulo](#11-funcionalidades-por-módulo)
12. [Responsividad Móvil](#12-responsividad-móvil)
13. [Accesibilidad](#13-accesibilidad)
14. [Rendimiento y Build](#14-rendimiento-y-build)
15. [Deployment](#15-deployment)
16. [Variables de Entorno](#16-variables-de-entorno)
17. [Convenciones de Código](#17-convenciones-de-código)
18. [Métricas de Completación](#18-métricas-de-completación)

---

## 1. Resumen Ejecutivo

LinuxQuest Frontend es una Single Page Application (SPA) construida en **React 19 + Vite** que ofrece una experiencia gamificada para aprender Linux. El usuario interactúa mediante una terminal real integrada en el navegador (xterm.js + Socket.io) y avanza a través de 85 misiones distribuidas en 5 mundos temáticos, ganando XP, desbloqueando logros y enfrentando jefes.

La aplicación comunica con un backend Express/PostgreSQL via REST y WebSocket, y está desplegada en Vercel con CDN global.

---

## 2. Objetivo del Producto

| Objetivo | Descripción |
|----------|-------------|
| **Educativo** | Enseñar comandos Linux reales ejecutándolos en una terminal sandbox segura |
| **Gamificado** | Mantener la motivación del usuario con XP, niveles, logros, jefes y narrativa |
| **Accesible** | Funcionar perfectamente en desktop y móvil (iOS y Android) |
| **Seguro** | El frontend no ejecuta comandos directamente; toda validación ocurre en el backend |
| **Escalable** | Arquitectura preparada para añadir nuevos mundos, quests y mecánicas |

---

## 3. Usuarios Objetivo

| Perfil | Descripción |
|--------|-------------|
| **Estudiante Linux** | Aprende para certificación LPI Linux Essentials |
| **Desarrollador junior** | Quiere mejorar su fluencia en la terminal |
| **Usuario de escritorio** | Trabaja principalmente en PC con pantallas grandes |
| **Usuario móvil** | Practica en tablet o smartphone en transporte |

---

## 4. Stack Tecnológico

```
React 19.2.5           — UI con hooks funcionales
Vite 8.0               — Build tool, HMR, bundler
React Router DOM 7.x   — Enrutamiento SPA
Zustand 5.x            — Estado global (3 stores)
xterm.js 5.3 / @xterm/addon-fit 0.11  — Emulación de terminal
socket.io-client 4.8   — WebSocket para ejecución de comandos
TailwindCSS 4.x        — Utilidades CSS
PostCSS + Autoprefixer — Procesamiento CSS
ESLint 10 + plugins    — Linting estático
```

**Sin dependencias pesadas adicionales:** axios fue eliminado; se usa el `fetch` nativo envuelto en `apiFetch`.

---

## 5. Arquitectura del Frontend

```
frontend/
├── index.html                   — Entry point HTML
├── vite.config.js               — Config Vite (plugin React)
├── tailwind.config.js           — Config TailwindCSS
├── postcss.config.js            — Config PostCSS
├── eslint.config.js             — Config ESLint
├── vercel.json                  — SPA rewrite rules
└── src/
    ├── main.jsx                 — ReactDOM.render + StrictMode
    ├── App.jsx                  — Router raíz (5 rutas)
    ├── App.css                  — Reset mínimo
    ├── index.css                — Design system completo
    ├── assets/                  — Imágenes estáticas
    ├── config/
    │   └── gameConfig.js        — DIFF_MAP, WORLD_COLORS (constantes compartidas)
    ├── store/
    │   ├── authStore.js         — Auth: user, token, login/logout
    │   ├── gameStore.js         — Game: quests, progress, stats, NPCs, enemies
    │   └── toastStore.js        — Notificaciones toast
    ├── utils/
    │   └── api.js               — apiFetch (timeout 15s, 1 retry, logging)
    ├── pages/
    │   ├── MenuPage.jsx         — Landing / Home
    │   ├── LoginPage.jsx        — Formulario de login
    │   ├── RegisterPage.jsx     — Formulario de registro
    │   ├── GamePage.jsx         — Página principal del juego
    │   └── StatsPage.jsx        — Estadísticas y leaderboard
    └── components/
        ├── auth/                — (carpeta reservada)
        ├── game/
        │   └── GameNav.jsx      — Barra de navegación del juego
        ├── stats/
        │   ├── AchievementBadge.jsx  — Badge individual de logro
        │   └── WorldProgress.jsx     — Progreso por mundo
        ├── AchievementsPanel.jsx     — Modal galería de logros
        ├── BattleSystem.jsx          — Sistema de combate contra jefes
        ├── ErrorBoundary.jsx         — Error boundary global
        ├── GameTutorial.jsx          — Tutorial spotlight 5 pasos
        ├── IntroOverlay.jsx          — Intro cinematográfica typing
        ├── LeaderboardPanel.jsx      — Tabla de clasificación
        ├── Menu.jsx                  — Componente de la landing
        ├── NPCProfile.jsx            — Perfil del NPC guardián
        ├── Quest.jsx                 — Panel de misiones (lista + detalle)
        ├── QuestCard.jsx             — Tarjeta individual de misión
        ├── Terminal.jsx              — Terminal xterm.js + Socket.io
        ├── Toast.jsx                 — Container de notificaciones
        └── XpNotification.jsx        — Notificación XP/level-up
```

### Flujo de datos

```
Usuario
  │
  ▼
MenuPage ──── (no auth) ──► LoginPage / RegisterPage
  │
  │ (auth)
  ▼
GamePage
  ├── GameNav (stats en vivo desde gameStore)
  ├── Quest (panel izquierdo)
  │     ├── QuestCard × N (lista de misiones)
  │     ├── QuestInfo (detalle: story, objectives, hints)
  │     ├── NPCProfile (guardián del mundo)
  │     └── BattleSystem (solo en boss quests)
  └── Terminal (panel derecho)
        ├── xterm.js (UI terminal)
        └── socket.io (comandos → backend → respuesta)
```

---

## 6. Páginas y Rutas

| Ruta | Componente | Descripción | Auth requerida |
|------|-----------|-------------|----------------|
| `/` | `MenuPage` | Landing con opciones Nuevo Juego / Continuar | No |
| `/login` | `LoginPage` | Formulario login con JWT | No |
| `/register` | `RegisterPage` | Formulario registro con validación | No |
| `/game` | `GamePage` | Juego principal (quest + terminal) | Sí (redirect a `/`) |
| `/stats` | `StatsPage` | Estadísticas, logros, leaderboard | Sí (redirect a `/`) |

**SPA Routing:** `vercel.json` redirige toda ruta a `index.html` para que React Router maneje la navegación:

```json
{ "source": "/((?!assets/).*)", "destination": "/index.html" }
```

**Validación de token:** En `App.jsx`, `useEffect` llama a `validateToken()` al montar, que verifica el JWT con `GET /api/auth/me`. Si el token expiró, se limpia el estado y se redirige.

---

## 7. Componentes

### 7.1 GamePage

**Archivo:** `src/pages/GamePage.jsx`

Orquesta la experiencia completa del juego. Gestiona:

- **Layout responsivo:** Split 50/50 (desktop) o tabs MISIÓN/TERMINAL (móvil)
- **Flujo de onboarding:** `IntroOverlay` → `GameTutorial` (primera vez)
- **Validación de objetivos:** `handleCommandExec` verifica si los comandos ejecutados completan los objetivos de la misión
- **Autocompletar misión:** Cuando todos los objetivos están cumplidos, llama a `completeQuest()` automáticamente
- **Integración BattleSystem:** `battleRef` permite comunicación ref-based entre Terminal y BattleSystem

**Estado local:**

| State | Tipo | Propósito |
|-------|------|-----------|
| `notification` | Object/null | Datos para XpNotification |
| `showAchievements` | Boolean | Toggle del modal de logros |
| `introDone` | Boolean | Control de intro (sessionStorage) |
| `showTutorial` | Boolean | Control del tutorial spotlight |
| `canComplete` | Boolean | Habilita el botón "Completar Misión" |
| `activeTab` | 'quest'/'terminal' | Tab activa en móvil |

**Hook personalizado `useIsMobile`:** Escucha `resize` y devuelve `true` si `window.innerWidth < 768`.

---

### 7.2 Terminal

**Archivo:** `src/components/Terminal.jsx`

Componente más complejo del frontend. Integra xterm.js con Socket.io para una terminal interactiva real.

#### Características

| Feature | Implementación |
|---------|----------------|
| Emulación terminal | xterm.js 5.3 + FitAddon |
| Comunicación en tiempo real | socket.io-client (evento `command`) |
| Historial de comandos | Array ref + índice, navegable con ↑/↓ |
| Buffer de texto | Ref mutable para edición in-line |
| Cursor posicional | Soporte movimiento ← → y backspace |
| Temas visuales | 4 temas desbloqueables por nivel |
| Interludes entre mundos | Textos cinematográficos al desbloquear mundo |
| Input móvil | `<input>` proxy invisible + barra de teclas rápidas |
| Reconexión | Socket.io gestiona reconexiones automáticamente |

#### Temas de terminal

| ID | Nombre | Nivel mínimo | Estilo |
|----|--------|--------------|--------|
| 1 | DEFAULT | 1 | Fondo oscuro, verde clásico |
| 4 | MATRIX | 4 | Verde neón sobre negro |
| 8 | AMBER | 8 | Ámbar sobre negro |
| 13 | CATPPUCCIN | 13 | Paleta pastel morada |

El tema activo se persiste en `localStorage` bajo `lq-terminal-theme-{userId}`.

#### Interludes entre mundos

Al completar una boss quest, el backend emite `world:unlock` via evento `CustomEvent`. Terminal escucha este evento y muestra un texto cinematográfico al desbloquear cada mundo (2, 3, 4, 5), describirendo la narrativa del nuevo dominio.

#### Protocolo Socket.io

```
Cliente                          Backend
  │                                 │
  ├── connect ──────────────────────►│
  ├── auth: { token } ──────────────►│
  │                                 │
  ├── command: { questId, cmd } ────►│
  │                                 │  [validación 10 capas]
  │◄── response: { output, error } ──│
  │                                 │
  ├── disconnect ───────────────────►│
```

---

### 7.3 Quest

**Archivo:** `src/components/Quest.jsx`

Panel izquierdo del juego. Dividido verticalmente en:

1. **QuestInfo (scrollable):** Historia, instrucciones, objetivos, comandos permitidos, recompensas, pistas
2. **BattleSystem (condicional):** Solo aparece en boss quests (IDs: 15, 35, 50, 70, 90)
3. **Botón de acción:** "Completar Misión" (activo), "Ejecuta los comandos primero" (bloqueado), "Misión Bloqueada" + prereqs
4. **Lista de mundos (accordion):** Todos los mundos colapsables, cada uno con sus QuestCards

**Lógica de desbloqueo:**
- Una misión está desbloqueada si todos sus `prerequisites` están completados en `userProgress`
- Misiones bloqueadas muestran qué quests previas faltan

**Enriquecimiento con NPC:** Antes de renderizar `QuestInfo`, se enriquece `currentQuest` con el objeto NPC completo (buscando por nombre en el store).

---

### 7.4 BattleSystem

**Archivo:** `src/components/BattleSystem.jsx`

Sistema de combate por turnos activado en boss quests.

**Mecánica:**
- El jefe tiene HP inicial configurable (del objeto `enemy`)
- El jugador siempre arranca con 100 HP
- Comando correcto → daño aleatorio 20-50 al jefe + contraataque aleatorio 10-30 al jugador
- Comando incorrecto → el jefe ataca directamente (5-20 daño al jugador)
- Comunicación via `battleRef` (ref-based, no props): `battleRef.current.handleCorrectCommand()` / `handleIncorrectCommand()`

**Estados:** `battleActive`, `animation` ('player-attack', 'player-hurt', 'enemy-hurt'), barras de HP animadas, log de batalla scrollable.

---

### 7.5 IntroOverlay

**Archivo:** `src/components/IntroOverlay.jsx`

Intro cinematográfica de pantalla completa con efecto typing.

| Característica | Detalle |
|----------------|---------|
| Tipado caracter a caracter | `setInterval` con velocidad configurable |
| Velocidad adaptativa | 40% más lento en desktop, 60% en móvil |
| Cancelación inmediata | `cancelledRef` permite saltar en cualquier momento |
| Botón SALTAR | Siempre visible en top-right, min-height 44px |
| Persistencia | `localStorage('lq-intro-shown')` + `sessionStorage('lq-intro-session')` |
| Trigger | Se borra en cada `login()` → se muestra cada vez que el usuario inicia sesión |
| Fuente | VT323 para el texto, Press Start 2P para el prompt |

**Contenido narrativo:** Historia del Reino del Kernel, los 5 guardianes, las amenazas del Caos Propietario y la misión del jugador como Aprendiz del Código.

---

### 7.6 GameTutorial

**Archivo:** `src/components/GameTutorial.jsx`

Tutorial interactivo de 5 pasos con spotlight overlay.

| Paso | Target `data-tutorial` | Qué explica |
|------|----------------------|-------------|
| 1 | `nav` | Barra de navegación (XP, nivel, monedas) |
| 2 | `quest-detail` | Detalle de misión (historia, comandos, pistas) |
| 3 | `quest-list` | Lista de misiones con estados |
| 4 | `terminal-bar` | Barra de la terminal y temas |
| 5 | `terminal` | Terminal y cómo ejecutar comandos |

**Implementación:** Usa `getBoundingClientRect()` para posicionar el spotlight y el tooltip. En móvil, cambia de tab automáticamente al llegar al paso 3+ (terminal). Persiste en `localStorage('lq-tutorial-done')`.

---

### 7.7 GameNav

**Archivo:** `src/components/game/GameNav.jsx`

Barra de navegación sticky del juego.

| Elemento | Desktop | Móvil |
|----------|---------|-------|
| ◀ MAPA | Visible | Visible |
| LINUXQUEST | Texto completo | "LQ" |
| NIV XX | Visible | Visible |
| XP XXXXX | Visible | Oculto |
| ◈ Coins | Visible | Oculto |
| Barra XP | Visible (140px) | Oculta |
| STATS ↗ | Botón visible | En dropdown |
| LOGROS | Botón visible | En dropdown |
| ☰ Menú | Oculto | Visible |
| SALIR | Visible | Visible |

**Menú hamburguesa:** En `< 768px`, el botón `☰` abre un dropdown con XP+coins resumidos, STATS y LOGROS.

---

### 7.8 StatsPage

**Archivo:** `src/pages/StatsPage.jsx`

Página completa de estadísticas del jugador.

**Secciones:**

1. **Hero del jugador:** Avatar hexagonal, username, barra de progreso total, botones "Continuar" y "Logros"
2. **Stats strip:** 5 celdas: NIVEL, XP TOTAL, MISIONES (completadas/total), MONEDAS, LOGROS
3. **Progreso por mundo:** `WorldProgress` con barra por cada uno de los 5 mundos
4. **Logros recientes:** Top 5 logros con `AchievementBadge`
5. **Clasificación:** `LeaderboardPanel` embebido

---

### 7.9 LeaderboardPanel

**Archivo:** `src/components/LeaderboardPanel.jsx`

Tabla de clasificación con tabs por scope.

| Tab | Endpoint | Datos |
|-----|----------|-------|
| GLOBAL | `/api/leaderboard/top?limit=10` | Top 10 por XP total |
| M1-M5 | `/api/leaderboard/world/:id` | Ranking por mundo |

**Tu posición:** Si se pasa `userId`, se carga `/api/leaderboard/player/:userId` y muestra un panel con RANK, NIV, MISIONES y LOGROS del jugador actual. El jugador actual se resalta con fondo diferente y `▶` prefix.

**Medallas:** Posiciones 1-3 con colores ámbar, gris y rojo respectivamente.

---

### 7.10 AchievementsPanel

**Archivo:** `src/components/AchievementsPanel.jsx`

Modal overlay con galería completa de logros.

**Filtros:** TODOS / DESBLOQUEADOS / BLOQUEADOS

**Diseño de cada badge:** Icono (44×44px), título, descripción, estado. Los bloqueados tienen `opacity: 0.45` y `filter: grayscale`. Barra de progreso global en el header.

---

### 7.11 XpNotification

**Archivo:** `src/components/XpNotification.jsx`

Sistema de notificaciones de recompensa post-quest.

| Caso | Presentación |
|------|-------------|
| XP + Coins normal | Slide-in desde la derecha (bottom-right), 3 seg |
| Level-up | Modal centrado con escala, fondo ámbar, 4 seg |
| Logro desbloqueado | Modal centrado apilado (junto a level-up si aplica), fondo plum |

---

### 7.12 ErrorBoundary

**Archivo:** `src/components/ErrorBoundary.jsx`

Clase React que captura errores de renderizado no manejados y muestra una pantalla de error amigable en lugar de una pantalla en blanco. Envuelve toda la aplicación en `App.jsx`.

---

### 7.13 Toast

**Archivo:** `src/components/Toast.jsx`

Contenedor de notificaciones toast (éxito / error) consumiendo `toastStore`. Renderizado en `App.jsx` fuera del Router para disponibilidad global.

---

## 8. Estado Global (Stores)

### 8.1 authStore

**Archivo:** `src/store/authStore.js`

| Key | Tipo | Descripción |
|-----|------|-------------|
| `user` | Object/null | Datos del usuario (`id`, `username`, `email`) |
| `token` | String/null | JWT almacenado en localStorage |
| `isAuthenticated` | Boolean | Derivado de la existencia de token |

**Acciones:**

| Acción | Efecto |
|--------|--------|
| `login(userData, token)` | Guarda token en localStorage, limpia flags de intro/tutorial |
| `register(userData, token)` | Igual que login |
| `logout()` | Borra token y estado, limpia flags |
| `validateToken()` | `GET /api/auth/me` → actualiza user o hace logout |
| `getToken()` | Devuelve token desde state o localStorage |

**Nota de seguridad:** `login()` y `register()` eliminan `lq-intro-shown` y `lq-tutorial-done` de localStorage para forzar re-onboarding en cada sesión nueva.

---

### 8.2 gameStore

**Archivo:** `src/store/gameStore.js`

| Key | Tipo | Descripción |
|-----|------|-------------|
| `currentQuestId` | Number/null | ID de la misión activa |
| `currentQuest` | Object/null | Objeto completo de la misión activa |
| `quests` | Array | Todas las misiones (85+) |
| `userProgress` | Array | Progreso del usuario por misión (`quest_id`, `status`, `completed_at`) |
| `userStats` | Object | `{ xp, level, coins, xpToNext, progress }` |
| `achievements` | Array | Catálogo completo de logros |
| `userAchievements` | Array | Logros ganados por el usuario |
| `npcs` | Array | NPCs guardianes |
| `enemies` | Array | Enemigos y jefes |
| `loading` | Boolean | Loading global |
| `loadingStates` | Object | Loading granular por operación |

**Acciones principales:**

| Acción | Endpoint | Efecto |
|--------|----------|--------|
| `fetchQuests()` | `GET /api/quests` | Carga todas las misiones |
| `fetchUserProgress()` | `GET /api/quests/user/progress` | Carga progreso del usuario |
| `fetchUserStats()` | `GET /api/quests/user/stats` | Carga XP, nivel, monedas |
| `completeQuest(id)` | `POST /api/quests/:id/complete` | Marca completa, actualiza stats localmente, dispara `world:unlock` si es boss |
| `fetchAchievements()` | `GET /api/achievements` | Carga catálogo |
| `fetchUserAchievements()` | `GET /api/achievements/mine` | Carga logros del usuario |
| `fetchNPCs()` | `GET /api/npcs` | Carga NPCs |
| `fetchEnemies()` | `GET /api/enemies` | Carga enemigos |

**Optimismo local en `completeQuest`:** Antes de esperar confirmación del servidor, actualiza `userProgress`, `userStats` y `coins` localmente con los valores recibidos en la respuesta. Esto elimina el lag visual entre completar y ver las recompensas.

---

### 8.3 toastStore

**Archivo:** `src/store/toastStore.js`

Acciones: `success(msg)`, `error(msg)`, `info(msg)`. Las toasts se auto-dismissan.

---

## 9. Sistema de Comunicación con Backend

### 9.1 apiFetch (REST)

**Archivo:** `src/utils/api.js`

Wrapper sobre `fetch` nativo con:

| Feature | Valor |
|---------|-------|
| Timeout | 15 segundos (AbortController) |
| Reintentos | 1 reintento con delay 1000ms |
| Logging HTTP | `console.groupCollapsed` con color por status code |
| Error labels | Mensajes descriptivos para códigos 400-504 |

```
GET/POST → fetchWithRetry → fetchWithTimeout → fetch nativo
                         ↓ error HTTP
                    logHttpError (consola)
```

**Base URL:** `import.meta.env.VITE_API_URL` o `http://localhost:3000` como fallback.

### 9.2 Socket.io (WebSocket)

La terminal se conecta via `socket.io-client` con autenticación JWT en el handshake:

```js
socket = io(API_URL, { auth: { token } })
socket.emit('command', { questId, command })
socket.on('response', ({ output, error }) => { ... })
```

El backend crea un sandbox aislado por usuario en `/tmp/linuxquest-sandbox/user_{id}/` y devuelve el output o error del comando.

### 9.3 Autenticación

Todas las peticiones autenticadas incluyen el header:
```
Authorization: Bearer <JWT>
```

El token se lee de `localStorage('token')` tanto en los stores como en el cliente Socket.io.

---

## 10. Sistema de Diseño (Design System)

**Archivo principal:** `src/index.css`

### 10.1 Temas CSS

Cuatro temas con CSS custom properties. El tema activo se aplica con `data-theme` en el `<html>`:

| Tema | Prop `data-theme` | Paleta | Estilo |
|------|-------------------|--------|--------|
| Pixel (default) | — | Púrpura oscuro + ámbar | Cálido, 8-bit retro |
| Terminal | `terminal` | Verde sobre negro | Matrix/hacker |
| Amber | `amber` | Ámbar sobre negro | Fósforo vintage |
| IDE | `ide` | Catppuccin Mocha | Moderno frío |

### 10.2 Variables de Color

```css
--bg, --bg-2, --bg-3        /* Fondos anidados */
--parchment, --parchment-2  /* Textos principales */
--ink                       /* Borde y sombra primaria */
--amber, --amber-2          /* Acento primario (ámbar) */
--leaf, --leaf-2            /* Éxito/naturaleza (verde) */
--blood, --blood-2          /* Peligro/error (rojo) */
--sky, --sky-2              /* Información (azul) */
--plum                      /* Logros (morado) */
--shadow                    /* Sombra */
--grid                      /* Grid de fondo */
```

### 10.3 Tipografía

| Variable | Fuente | Uso |
|----------|--------|-----|
| `--font-display` | Press Start 2P | Títulos, botones, UI labels |
| `--font-body` | VT323 | Texto narrativo, descripciones |
| `--font-code` | JetBrains Mono | Terminal, código |

`image-rendering: pixelated` y `-webkit-font-smoothing: none` para estética pixel-art auténtica.

### 10.4 Componentes CSS Reutilizables

| Clase | Descripción |
|-------|-------------|
| `.btn` | Botón pixel-art con sombra 4-side |
| `.btn-amber`, `.btn-leaf`, `.btn-blood`, `.btn-ghost` | Variantes de color |
| `.pcard` | Card con borde 4px, inset shadow y sombra offset |
| `.bar > i` | Barra de progreso con rayas diagonales |
| `.chip` | HUD chip inline (XP, coins, etc.) |
| `.diff` | Pill de dificultad (`.diff-fac`, `.diff-med`, `.diff-dif`) |
| `.term`, `.term-bar`, `.term-body` | Componentes de terminal |
| `.nav`, `.nav-item`, `.nav-brand` | Navegación sticky |
| `.tile`, `.locked` | Cards seleccionables y bloqueadas |
| `.vt`, `.tiny`, `.muted`, `.up` | Utilidades tipográficas |

### 10.5 Grid de Fondo

El `body` tiene un grid SVG-like mediante `background-image` con líneas de 32×32px en `rgba` muy tenue, que refuerza la estética retro.

---

## 11. Funcionalidades por Módulo

### 11.1 Autenticación

| Funcionalidad | Detalle |
|---------------|---------|
| Registro | Email único, username, password; validación en el frontend antes de enviar |
| Login | Devuelve JWT con 7 días de expiración |
| Persistencia | Token en localStorage, validado al montar App |
| Auto-logout | Si el token falla la validación, se limpia el estado automáticamente |
| Intro/Tutorial reset | Cada nuevo login fuerza re-onboarding |

### 11.2 Sistema de Misiones

| Funcionalidad | Detalle |
|---------------|---------|
| 85 quests | 5 mundos (12+18+18+17+15 + 5 extras) |
| Estados | `locked` → `in_progress` → `completed` |
| Prerequisitos | Validados localmente en `isQuestUnlocked()` |
| Objetivos automáticos | `handleCommandExec` detecta comandos correctos y auto-completa |
| Boss quests | IDs: 15, 35, 50, 70, 90 — activan `BattleSystem` |
| Pistas | Botón toggle "PEDIR PISTA" oculta/muestra hints |

### 11.3 Sistema de XP y Niveles

| Funcionalidad | Detalle |
|---------------|---------|
| 20 niveles | Progresión XP no-lineal (0-9070 XP total) |
| Notificación XP | Slide-in inmediato al completar |
| Level-up | Modal centrado con escala si el nivel cambia |
| Barra de progreso | En `GameNav` (desktop) y `StatsPage` |

### 11.4 Sistema de Logros

| Funcionalidad | Detalle |
|---------------|---------|
| 14 logros | Desbloqueados automáticamente por el backend |
| Notificación | Modal centrado con ícono y descripción |
| Galería | `AchievementsPanel` con filtros y barra de progreso |
| Badges | `AchievementBadge` con fecha de obtención |

### 11.5 Sistema de NPCs

| NPC | Mundo | Rol |
|-----|-------|-----|
| Linux el Sabio | 1 | El Castillo del Conocimiento |
| Grep-ild | 2 | Los Senderos del Sistema |
| Chmod-ard | 3 | Las Torres del Procesamiento |
| Kernel el Forjador | 4 | La Forja del Núcleo |
| Sudo-Man | 5 | Las Bóvedas de la Seguridad |

Cada quest muestra el NPC de su mundo con `NPCProfile`.

### 11.6 Leaderboard

| Funcionalidad | Detalle |
|---------------|---------|
| Global | Top 10 por XP total |
| Por mundo | Ranking de completación en cada mundo |
| Mi posición | Panel con RANK, NIV, MISIONES y LOGROS del usuario |
| Medallas | 🥇🥈🥉 para posiciones 1-3 |

---

## 12. Responsividad Móvil

### 12.1 Breakpoints

| Breakpoint | Cambios |
|-----------|---------|
| `<= 768px` | Layout de tabs, hamburguesa, tipografía reducida, touch targets 44px |
| `<= 600px` | Stats grid 4→2 columnas |
| `<= 480px` | Tipografía ultra-compacta, botones aún más pequeños |

### 12.2 Layout adaptativo

**Desktop (>768px):**
```
┌──────────────────────────────────────────────┐
│  GameNav (sticky)                            │
├──────────────────────┬───────────────────────┤
│  Quest Panel (50%)   │  Terminal Panel (50%) │
│  - QuestInfo         │  - xterm.js           │
│  - BattleSystem      │  - Terminal bar       │
│  - Complete button   │  - Mobile keys bar    │
│  - Quest list        │                       │
└──────────────────────┴───────────────────────┘
```

**Móvil (<768px):**
```
┌──────────────────────────────────────────────┐
│  GameNav (sticky, hamburguesa)               │
├──────────────────────────────────────────────┤
│  Panel activo (100%)                         │
│  [MISIÓN] o [TERMINAL]                       │
├──────────────────────────────────────────────┤
│  Tab bar: [MISIÓN] | [TERMINAL]              │
└──────────────────────────────────────────────┘
```

### 12.3 Terminal en móvil

| Feature | Implementación |
|---------|----------------|
| Input virtual | `<input>` invisible (`opacity: 0`, `position: absolute`) que captura el teclado iOS/Android |
| Barra de teclas | 8 botones: Tab, Enter, Ctrl+C, Esc, ↑, ↓, ←, → |
| Focus automático | `onClick` en el área del terminal llama `focusMobileInput()` |
| Velocidad typing | 40% más rápido en la intro |

### 12.4 Touch targets (WCAG)

Todos los botones e inputs cumplen mínimo 44×44px:
```css
.nav-item button, .mobile-keys-bar button, .btn {
  min-height: 44px;
}
```

El selector es intencionalmente específico para no interferir con los botones de tema del terminal.

---

## 13. Accesibilidad

| Criterio | Implementación |
|----------|----------------|
| Touch targets | 44×44px mínimo en todos los controles |
| Contraste | Paletas con relación de contraste > 4.5:1 |
| Navegación teclado | Tutorial soporta `Enter`/`Espacio` (siguiente) y `Escape` (saltar) |
| Intro skip | Botón "SALTAR" siempre visible con `minHeight: 44px` |
| `aria-label` | Menú hamburguesa tiene `aria-label="Menú"` |
| Scroll suave | `-webkit-overflow-scrolling: touch` en iOS |
| Error boundary | Previene pantalla blanca con mensaje explicativo |

---

## 14. Rendimiento y Build

### 14.1 Vite

- **HMR** en desarrollo (< 50ms de actualización)
- **Build:** `vite build` → `dist/` con chunks optimizados
- **Preview:** `vite preview` para validar build local

### 14.2 Optimizaciones implementadas

| Técnica | Donde |
|---------|-------|
| `useCallback` | `handleCommandExec`, `handleQuestComplete`, `selectTheme`, `focusMobileInput` |
| Refs para estado mutable | `commandBuffer`, `historyIndex`, `questIdRef`, `executedCommandsRef`, `completedObjectivesRef` |
| Lazy loading implícito | React Router (sin `lazy()` explícito — páginas pequeñas) |
| `useEffect` con dependencias | Evitar re-renders innecesarios |
| Fetch con abort | Timeout de 15s con `AbortController` |
| Event listener cleanup | Todos los `addEventListener` tienen su `removeEventListener` en cleanup |

### 14.3 Carga de datos

Al montar `GamePage`, se disparan 6 fetches en paralelo (sin `await`):
```js
fetchQuests()
fetchUserStats()
fetchAchievements()
fetchUserAchievements()
fetchNPCs()
fetchEnemies()
```

---

## 15. Deployment

### 15.1 Vercel (producción)

| Config | Valor |
|--------|-------|
| Root dir | `frontend/` |
| Build cmd | `npm run build` |
| Output dir | `dist/` |
| Framework | Vite (auto-detectado) |
| Env var requerida | `VITE_API_URL=https://linuxquest-backend.fly.io` |

`vercel.json`:
```json
{
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

### 15.2 Flujo CI/CD

Vercel despliega automáticamente en cada push a `main`. Los previews de PR también se generan automáticamente.

---

## 16. Variables de Entorno

| Variable | Requerida | Default | Descripción |
|----------|-----------|---------|-------------|
| `VITE_API_URL` | No | `http://localhost:3000` | URL base del backend |

Las variables `VITE_*` se inyectan en tiempo de build. **No incluir secretos en variables VITE** porque son públicas en el bundle.

---

## 17. Convenciones de Código

| Convención | Regla |
|-----------|-------|
| **Idioma de código** | Inglés |
| **Comentarios** | Español |
| **Commits** | Conventional commits (`feat:`, `fix:`, `docs:`) |
| **Componentes** | PascalCase, funcionales, un archivo por componente |
| **Hooks** | Prefijo `use` (e.g., `useIsMobile`) |
| **Stores** | Zustand con `create()`, un archivo por dominio |
| **CSS** | Tailwind utilities + custom properties en `index.css` |
| **ES Modules** | `import`/`export`, sin `require`. `"type": "module"` en `package.json` |
| **No axios** | Solo `apiFetch` del wrapper nativo |
| **Constantes compartidas** | En `src/config/gameConfig.js` (`DIFF_MAP`, `WORLD_COLORS`) |

### 17.1 Estructura de un componente típico

```jsx
// Importaciones externas
import { useState, useEffect, useCallback } from 'react';

// Importaciones internas
import { useGameStore } from '../store/gameStore';

// Componente
export default function MiComponente({ prop1, prop2 }) {
  // Estado local
  const [estado, setEstado] = useState(false);

  // Store
  const { dato } = useGameStore();

  // Efectos
  useEffect(() => { /* efecto */ }, [dep]);

  // Handlers (useCallback cuando se pasan como props)
  const handleClick = useCallback(() => { /* ... */ }, [dep]);

  return (
    <div style={{ /* inline styles con CSS vars */ }}>
      {/* JSX */}
    </div>
  );
}
```

### 17.2 Estilos

- **Estilos principales:** Inline con `style={}` usando `var(--...)` para respetar el tema activo
- **Clases CSS:** Solo para componentes del design system (`.btn`, `.pcard`, `.bar`, etc.)
- **Tailwind:** Usado muy esporádicamente; el design system custom es dominante
- **No CSS Modules:** Todo en `index.css` como sistema centralizado

---

## 18. Métricas de Completación

| Área | Estado |
|------|--------|
| Autenticación (login/register/logout) | ✅ Completo |
| Sistema de misiones (85 quests, 5 mundos) | ✅ Completo |
| Terminal interactiva (xterm.js + socket.io) | ✅ Completo |
| Sistema de XP y 20 niveles | ✅ Completo |
| Sistema de logros (14 badges) | ✅ Completo |
| Sistema de NPCs (5 guardianes) | ✅ Completo |
| Sistema de enemigos y jefes (5 boss fights) | ✅ Completo |
| Leaderboard global y por mundo | ✅ Completo |
| Página de estadísticas | ✅ Completo |
| IntroOverlay cinematográfico | ✅ Completo |
| Tutorial spotlight 5 pasos | ✅ Completo |
| Temas de terminal (4 temas) | ✅ Completo |
| Interludes entre mundos | ✅ Completo |
| Design system pixel-art (4 temas CSS) | ✅ Completo |
| Responsividad móvil (iOS/Android) | ✅ Completo |
| Touch targets WCAG (44px mínimo) | ✅ Completo |
| Menú hamburguesa móvil | ✅ Completo |
| Terminal móvil (input proxy + quick keys) | ✅ Completo |
| Error boundary | ✅ Completo |
| Toast notifications | ✅ Completo |
| SPA routing (vercel.json) | ✅ Completo |
| Build y deploy en Vercel | ✅ Completo |

**Completación total:** 23/23 funcionalidades ✅

---

## Apéndice A — Mapa de Archivos Rápido

```
src/App.jsx                    → Router (5 rutas)
src/main.jsx                   → Entry point
src/index.css                  → Design system + temas
src/config/gameConfig.js       → DIFF_MAP, WORLD_COLORS
src/store/authStore.js         → Auth state
src/store/gameStore.js         → Game state (quests, stats, NPCs...)
src/store/toastStore.js        → Toast state
src/utils/api.js               → apiFetch wrapper
src/pages/MenuPage.jsx         → Landing /
src/pages/LoginPage.jsx        → Login /login
src/pages/RegisterPage.jsx     → Register /register
src/pages/GamePage.jsx         → Game /game ← PÁGINA PRINCIPAL
src/pages/StatsPage.jsx        → Stats /stats
src/components/Terminal.jsx    → Terminal xterm.js + socket.io
src/components/Quest.jsx       → Panel de misiones
src/components/QuestCard.jsx   → Tarjeta de misión
src/components/BattleSystem.jsx → Combate contra jefes
src/components/IntroOverlay.jsx → Intro cinematográfica
src/components/GameTutorial.jsx → Tutorial spotlight
src/components/game/GameNav.jsx → Navegación del juego
src/components/LeaderboardPanel.jsx → Leaderboard
src/components/AchievementsPanel.jsx → Modal de logros
src/components/XpNotification.jsx → Notificación XP/level-up
src/components/NPCProfile.jsx  → Perfil NPC
src/components/Menu.jsx        → Landing UI
src/components/Toast.jsx       → Container toasts
src/components/ErrorBoundary.jsx → Error boundary
src/components/stats/WorldProgress.jsx → Progreso por mundo
src/components/stats/AchievementBadge.jsx → Badge de logro
```

---

## Apéndice B — Flujos de Usuario Clave

### Flujo: Primera vez

```
1. Usuario visita /
2. MenuPage → click "NUEVO JUEGO" → navega a /register
3. RegisterPage → POST /api/auth/register → recibe JWT
4. authStore.register() → guarda token, limpia intro/tutorial flags
5. Navega a /game (GamePage)
6. IntroOverlay se muestra (lq-intro-shown no existe)
7. Usuario presiona ENTER o SALTAR
8. GameTutorial se muestra (lq-tutorial-done no existe)
9. Tutorial 5 pasos → localStorage.lq-tutorial-done = '1'
10. Juego comienza: primera misión seleccionada automáticamente
```

### Flujo: Completar una misión

```
1. Usuario ve QuestInfo en panel izquierdo
2. Escribe comando en terminal → socket.emit('command', {questId, cmd})
3. Backend valida → ejecuta en sandbox → responde con output
4. Terminal muestra output
5. handleCommandExec() verifica si el comando cumple objetivos
6. Todos los objetivos ✓ → setCanComplete(true) → auto-llama handleQuestComplete()
7. POST /api/quests/:id/complete → respuesta con XP, coins, achievements
8. gameStore actualiza userProgress, userStats localmente
9. XpNotification aparece (slide-in o modal si level-up)
10. Si hay achievements nuevos → modal de logros
11. Si era boss quest → CustomEvent 'world:unlock' → Terminal muestra interlude
```

### Flujo: Boss Fight

```
1. Usuario selecciona boss quest (ID 15, 35, 50, 70 o 90)
2. Quest.jsx detecta boss → busca enemy donde world=currentQuest.world y isBoss=true
3. BattleSystem renderiza con el enemy encontrado
4. battleRef conecta Terminal ↔ BattleSystem
5. Comando correcto → Terminal.onCommandExec → battleRef.handleCorrectCommand()
6. BattleSystem reduce HP del enemigo, anima, enemigo contraataca
7. Enemigo HP=0 → onVictory() → questComplete()
8. Jugador HP=0 → onDefeat() → mensaje "DERROTA — Intenta de nuevo"
```

---

*Documento generado: 2026-05 | LinuxQuest Frontend v1.0 | Estado: Producción ✅*
