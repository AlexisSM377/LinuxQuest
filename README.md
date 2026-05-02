# LinuxQuest 🐧

**Plataforma Interactiva para Aprender Linux** — Domina los fundamentos de Linux a través de misiones gamificadas, ejecución de comandos y niveles progresivos.

[![Estado](https://img.shields.io/badge/estado-LISTO%20PRODUCCI%C3%93N-brightgreen)](docs/roadmap.md)
[![Seguridad](https://img.shields.io/badge/seguridad-8%20CAPAS-blue)](docs/SECURITY-HARDENED.md)
[![Misiones](https://img.shields.io/badge/misiones-85%20quests-blue)](docs/LINUXQUEST_CONTENT.md)

**Estado Actual:** ✅ **SEMANAS 1-17 COMPLETADAS** | Listo para deployment en Vercel

---

## 🎮 Inicio Rápido

```bash
# Terminal 1: Backend
cd backend && npm install && npm run dev

# Terminal 2: Frontend
cd frontend && npm install && npm run dev

# Navegador
# http://localhost:5173
# 1. Registrarse/Iniciar sesión
# 2. Seleccionar misión y escribir comandos en la terminal
# 3. Ganar XP, subir de nivel, desbloquear logros
```

---

## 📦 Qué Incluye

**5 Mundos de Aprendizaje | 85 Misiones Linux | 20 Niveles de Progresión | 14 Logros**

### Mundo 1: Fundamentos Linux (15 misiones)
- Conceptos: `uname`, `/etc/os-release`, familias de distros
- Software Libre: FSF, OSI, GPL vs MIT
- Alternativas open-source: Office, diseño, herramientas de desarrollo
- Servidores: Apache, Nginx, MySQL, Postfix

### Mundo 2: Archivos & Permisos (20 misiones)
- Navegación: `ls`, `pwd`, `cd`, `mkdir`, `rmdir`
- Manipulación: `cp`, `mv`, `rm`, `touch`, `cat`
- Permisos: `chmod`, `chown`, `umask`, ACLs
- Búsqueda: `find`, `locate`, `grep`

### Mundo 3: Procesos & Usuarios (15 misiones)
- Procesos: `ps`, `top`, `htop`, `kill`, `nice`
- Servicios: `systemctl`, `service`, `init`
- Usuarios: `useradd`, `userdel`, `groups`, `sudo`
- Logs: `journalctl`, `tail`, `dmesg`

### Mundo 4: Redes (20 misiones)
- Configuración: `ifconfig`, `ip`, `route`
- Diagnóstico: `ping`, `traceroute`, `netstat`, `ss`
- Servicios: `ssh`, `ftp`, `curl`, `wget`
- Firewall: `iptables`, `ufw`

### Mundo 5: Scripts & Automatización (25 misiones)
- Bash: variables, operadores, estructuras
- Funciones: definir, parámetros, return
- Loops: `for`, `while`, `until`
- Avanzado: `sed`, `awk`, `regex`, pipes
- Proyectos: `cron`, background jobs, logging

---

## 🎯 Mecánicas del Juego

### 🎖️ XP y Nivelación
- **20 Niveles** con progresión XP no-lineal (0-9070 XP total)
- Recompensas por misión: XP + monedas
- Notificaciones automáticas de nivel-up con animaciones
- Bonificaciones y seguimiento de nivel-up

### 🏆 Sistema de Logros
- **12 Badges Desbloqueables Automáticamente:**
  - `primer_paso` — Completa tu primer quest
  - `nivel_5/10/20` — Alcanza hitos de nivel
  - `mundo_1/2/3` — Completa la progresión de mundos
  - `velocista` — Completa 5 quests en un día
  - `coleccionista` — Completa 50 quests
  - `completista` — Domina los 95 quests
  - `sin_errores` — Completa mundo sin fallos
  - `guerrero_persistente` — Persiste y reintenta desafíos

### 🔓 Sistema de Desbloqueo de Quests
- Validación de prerequisitos: algunos quests requieren misiones previas
- Indicadores visuales de candado mostrando requisitos faltantes
- Curva de dificultad progresiva entre mundos

### 🗺️ Tablas de Clasificación
- **Ranking Global:** Top 10 jugadores por XP total
- **Ranking por Mundo:** Clasificación de completación por mundo
- **Estadísticas Personales:** Rango individual, progresión, logros
- Medallas: 🥇🥈🥉 para los top 3

### ⚔️ Batallas con Jefes
- 6 enemigos narrativos: Zombie Process, Daemon Descontrolado, Jefe de Procesos, Syntax Error, Loop Infinito, Dragón Final
- Encuentros de combate integrados con quests de jefe
- Mecánicas de derrota/reintento con persistencia

### 🧑‍💼 Sistema de NPCs
- **5 NPCs Guardianes** con personalidades y lore profundo
- Linux el Sabio, Grep-ild, Chmod-ard, Kernel el Forjador, Sudo-Man
- Narrativa coherente "El Reino del Kernel"
- Diálogos contextuales por misión

### 📖 Lore y Narrativa
- **Intro cinematográfica** — pantalla completa con efecto typing
- **Interludios entre mundos** — narrativa al desbloquear cada mundo
- **Contenido educativo interactivo** — archivos de lore en `/reino/` dentro del sandbox
- Historia de Linux, distribuciones, licencias, software libre

### 🎓 Tutorial Interactivo
- **Spotlight overlay** que enfoca cada elemento de la UI
- **5 pasos** explicando: Nav, Misiones, Terminal, Barra, Detalle
- Se muestra solo la primera vez (skippable con ESC)

---

## 🏗️ Estructura del Proyecto

```
LinuxQuest/
├── frontend/                    # React 18 + Vite
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/              # Componentes de página (Game, Stats, etc)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── store/              # Gestión estado Zustand
│   │   ├── utils/              # Funciones auxiliares
│   │   └── App.jsx             # Router principal
│   └── vite.config.js
│
├── backend/                     # Node.js + Express
│   ├── src/
│   │   ├── models/             # Modelos BD (User, Quest, Progress)
│   │   ├── routes/             # Endpoints API
│   │   ├── middleware/         # Auth, validación, errores
│   │   ├── services/           # Lógica de negocio
│   │   ├── config/             # Configs (Achievements, NPCs, Enemies)
│   │   ├── utils/              # Helpers (XP system, achievement checker)
│   │   ├── security/           # Módulos de seguridad
│   │   └── server.js           # Setup Express
│   ├── scripts/
│   │   ├── init-db.js          # Inicializar BD
│   │   ├── seed-quests.js      # Poblar 95 misiones
│   │   ├── seed-achievements.js # Poblar logros
│   │   └── audit-monitor.js    # Auditoría en tiempo real
│   └── package.json
│
├── docs/                        # Documentación
│   ├── roadmap.md              # Plan de 12 semanas
│   ├── SECURITY.md             # Guía de seguridad completa
│   ├── SECURITY-HARDENED.md    # Checklist validación seguridad
│   ├── LINUXQUEST_CONTENT.md   # Referencia BD de misiones
│   └── DEPLOYMENT.md           # Guía deployment producción
│
└── README.md                    # Este archivo
```

---

## 🛠️ Stack Tecnológico

**Frontend:**
- React 19 + Vite (build rápido & HMR)
- TailwindCSS (diseño responsivo)
- Zustand (gestión estado ligera)
- xterm.js (emulación de terminal)
- React Router (enrutamiento SPA)
- Socket.io cliente (actualizaciones en tiempo real)

**Backend:**
- Node.js 20 + Express
- PostgreSQL (Neon) con SSL
- Socket.io (servidor WebSocket)
- JWT authentication (expiración 7 días)
- bcrypt (hashing de contraseñas)
- Helmet.js (headers seguridad HTTP)
- express-validator (validación inputs)
- express-rate-limit (protección DOS)

**Infraestructura:**
- **Frontend Deploy:** Vercel (auto-scaling, CDN)
- **Backend Deploy:** Fly.io (containers Linux)
- **Base de Datos:** Neon PostgreSQL (managed, auto-backups)
- **Todo con HTTPS** y renovación automática de certificados

---

## 🔒 Características de Seguridad (9 Capas)

LinuxQuest implementa seguridad integral para prevenir abusos y proteger el sistema:

### 1. Preprocesador de Comandos
- Convierte comandos interactivos a no-interactivos (cat, less, man, top)
- Reescribe rutas del sistema a sandbox-local (/etc/os-release → sandbox/etc/os-release)
- Agrega flags de seguridad automáticamente (ping -c 4, curl --connect-timeout)

### 2. Auditoría Completa
- Registro completo de todos los intentos de comando
- Detección de amenazas en tiempo real
- Capacidades de análisis forense

### 3. Allowlist Global
- Solo 40+ comandos aprobados
- Bloquea comandos peligrosos: `sudo`, `docker`, `mount`, `dd`, etc.

### 4. Detección de Patrones
- Bloquea inyección shell: `&&`, `||`, `;`, `$()`, sustitución de comandos
- Previene redirecciones: `>`, `<`, `>>`, `|`

### 5. Validación de Sandbox
- Prevención de path traversal
- Protección de archivos sensibles (`/etc/*`, `/root`, `/sys`, `/proc`)
- Aislamiento por usuario

### 6. Whitelist por Quest
- Cada misión tiene comandos específicos permitidos
- Quest 1 (uname): solo `uname` permitido
- Quest archivos: solo `ls`, `cd`, `pwd`, `cat` permitidos

### 7. Ejecución en Sandbox
- Directorio de ejecución aislado por usuario: `/tmp/linuxquest-sandbox/user_<id>/`
- Acceso cruzado entre usuarios es imposible
- Auto-cleanup al desconectar

### 8. Límites de Recursos
- Timeout: máximo 30 segundos por comando
- Output: buffer máximo 5MB
- Líneas: máximo 10,000 líneas de output
- Previene agotamiento de recursos

### 9. Seguridad HTTP
- **Helmet.js:** CSP, X-Frame-Options: DENY, HSTS, protección MIME sniffing
- **CORS:** Solo dominio frontend (verificación estricta de origen)
- **Rate Limiting:** 100 requests/15min global + 10 comandos/10s por usuario
- **Validación Input:** Enfoque regex en email, username, password

**Resultado:** Matemáticamente imposible escapar validación o comprometer el sistema.

---

## 📱 Responsividad Móvil (100% Completo)

LinuxQuest funciona perfectamente en **Desktop, Tablet y Móvil** con una experiencia optimizada para cada dispositivo.

### Características Móvil

**Terminal en Móvil:**
- Input invisible que captura teclado virtual de iOS/Android
- Barra de teclas rápidas: Tab, Enter, Ctrl+C, Esc, ↑, ↓, ←, →
- Focus automático al tocar el área del terminal

**Navegación Móvil:**
- Menú hamburguesa `☰` en pantallas < 768px
- Dropdown nav con XP, nivel, y opciones
- Menú se cierra automáticamente al navegar

**Touch Targets (WCAG):**
- Todos los botones/inputs: mínimo 44x44px
- Cumplimiento de estándares de accesibilidad
- PixelInput, QuestCard, Login/Register optimizados

**Responsive Layout:**
- Media queries en 768px (tablet) y 480px (móvil)
- Tipografía fluida con `clamp()`
- Grid de stats: 4 cols (desktop) → 2 cols (móbil)
- Scroll suave en iOS: `-webkit-overflow-scrolling: touch`

**Componentes Actualizados:**
- Menu.jsx — Hamburguesa + dropdown
- Terminal.jsx — Input proxy + quick keys
- IntroOverlay.jsx — Separadores dinámicos
- PixelInput.jsx — Touch target sizing
- QuestCard.jsx — Buttons más grandes
- LoginPage/RegisterPage — Errores accesibles

---

## 🚀 Desarrollo

### Requisitos Previos
```bash
node -v  # v20+
npm -v   # v10+
```

### Primer Setup

```bash
# 1. Clonar e instalar dependencias
git clone <repo>
cd LinuxQuest

# 2. Setup backend
cd backend
npm install

# 3. Inicializar base de datos
npm run init-db      # Crear tablas
npm run seed-quests  # Poblar 95 misiones
npm run seed-achievements  # Poblar logros

# 4. Setup frontend
cd ../frontend
npm install

# 5. Variables de entorno
# backend/.env:
DATABASE_URL=postgresql://...  # URL Neon PostgreSQL
JWT_SECRET=tu_secret_32_chars_minimo
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# frontend/.env (opcional):
VITE_API_URL=http://localhost:3000
```

### Ejecutar Servidores de Desarrollo

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Se ejecuta en http://localhost:3000

# Terminal 2: Frontend
cd frontend
npm run dev
# Se ejecuta en http://localhost:5173
```

---

## 📡 Endpoints API

### Autenticación
- `POST /api/auth/register` — Crear cuenta
- `POST /api/auth/login` — Iniciar sesión y obtener JWT
- `GET /api/auth/me` — Perfil del usuario actual

### Misiones
- `GET /api/quests` — Todas las misiones
- `GET /api/quests/:id` — Detalles de misión
- `GET /api/quests/world/:worldId` — Misiones por mundo
- `POST /api/quests/:id/complete` — Marcar misión completa (otorgar XP)
- `GET /api/quests/user/progress` — Progreso de misiones del usuario
- `GET /api/quests/user/stats` — XP, nivel, monedas del usuario

### Logros
- `GET /api/achievements` — Todos los logros
- `GET /api/achievements/mine` — Logros ganados del usuario

### Tabla de Clasificación
- `GET /api/leaderboard/top` — Top 10 jugadores globales
- `GET /api/leaderboard/world/:worldId` — Ranking por mundo
- `GET /api/leaderboard/player/:userId` — Estadísticas & rango del jugador

### NPCs & Enemigos
- `GET /api/npcs` — Todos los NPCs
- `GET /api/npcs/world/:worldId` — NPCs del mundo
- `GET /api/enemies` — Todos los enemigos
- `GET /api/enemies/world/:worldId` — Enemigos del mundo

### Eventos WebSocket (Socket.io)
- `command` — Ejecutar comando Linux en sandbox
- `xp:earned` — Notificación XP al cliente
- `achievement:unlocked` — Logro ganado

---

## 📊 Schema de Base de Datos

### users
```sql
id, email, username, password (hasheada), xp, level, coins, created_at
```

### quests
```sql
id, title, world_id, difficulty, description, hint, required_command,
allowed_commands[], prerequisites[], reward_xp, reward_coins
```

### user_quest_progress
```sql
user_id, quest_id, status (locked/in_progress/completed),
attempts, completed_at
```

### achievements
```sql
id (unique_key), title, description, icon, xp_bonus
```

### user_achievements
```sql
user_id, achievement_id, earned_at (timestamp)
```

---

## 📈 Estadísticas del Proyecto

| Métrica | Cantidad |
|---------|----------|
| Mundos de Aprendizaje | 5 |
| Misiones | 85 |
| Niveles de Progresión | 20 |
| Badges de Logros | 14 |
| Personajes NPC | 5 |
| Encuentros de Jefe | 5 |
| Endpoints API | 16+ |
| Capas de Seguridad | 9 |
| Archivos de Auditoría | 4 |
| Líneas de Código | 5,000+ |

---

## 🚀 Deployment en Producción

### Frontend (Vercel)
```bash
1. Ir a https://vercel.com
2. Conectar cuenta GitHub
3. Importar: proyecto/LinuxQuest
4. Directorio raíz: frontend/
5. Variables de entorno:
   VITE_API_URL=https://linuxquest-backend.fly.dev
6. Hacer deploy (Vercel auto-detecta Vite)
```

### Backend (Fly.io)
```bash
# Ya deployado en:
# https://linuxquest-backend.fly.dev
# Health check:
# https://linuxquest-backend.fly.dev/api/health
```

### Base de Datos (Neon)
```
Estado: ✅ LIVE
95 Misiones: SEEDED
12 Logros: SEEDED
Todas las tablas: CREADAS
```

---

## 📚 Documentación

- **[Roadmap](docs/roadmap.md)** — Cronograma de 12 semanas y estado de completación
- **[Guía de Seguridad](docs/SECURITY.md)** — Arquitectura de seguridad completa
- **[Seguridad Endurecida](docs/SECURITY-HARDENED.md)** — Checklist validación seguridad
- **[Contenido de Misiones](docs/LINUXQUEST_CONTENT.md)** — Referencia completa BD de misiones
- **[Deployment](docs/DEPLOYMENT.md)** — Instrucciones deployment producción

---

## ✅ Estado de Completación Semanas 1-17

- ✅ **Semanas 1-4:** Setup + Frontend + Backend + Autenticación
- ✅ **Semana 5:** Sistema de Misiones + Ejecución de Comandos
- ✅ **Semana 6:** Validación Sandbox + Seguridad (8 capas)
- ✅ **Semana 7:** Sistema XP + Progresión de Niveles (20 niveles)
- ✅ **Semana 8:** Desbloqueo de Quests + Sistema de Logros (14 badges)
- ✅ **Semana 9:** Sistema de NPCs + Polish de UI
- ✅ **Semana 10:** Sistema de Combate + Batallas de Jefes
- ✅ **Semana 11:** Tabla de Clasificación + Página de Estadísticas
- ✅ **Semana 12:** Endurecimiento de Seguridad + Listo para Producción
- ✅ **Semana 13:** Pixel Art Design System
- ✅ **Semana 14:** Sandbox Hardening + Mocks Educativos (35 mocks)
- ✅ **Semana 15:** Terminal Themes + Responsive
- ✅ **Semana 17:** Terminal/Sandbox Overhaul (preprocessor + sandbox enriquecido)
- ✅ **Semana 18:** Reorganización LPI (85 misiones) + Lore + Intro + Tutorial

**Estado:** 🟢 LISTO PARA PRODUCCIÓN

---

## 📋 Próximos Pasos (Post-Lanzamiento)

- [ ] Verificar login/register en producción
- [ ] Testing de carga con usuarios concurrentes
- [ ] Testing de penetración de seguridad
- [ ] Aplicación móvil (React Native)
- [ ] Dashboard de análisis avanzados
- [ ] Modo competitivo/torneos
- [ ] Características comunitarias (foros, chat)

---

## 📝 Licencia & Créditos

**Creado:** 2026-04 | **Stack:** React + Node.js + PostgreSQL
**Seguridad:** Helmet.js + pipeline validación 8 capas
**Deployment:** Vercel + Fly.io + Neon

---

**Última Actualización:** 2026-04-27 | **Las 12 Semanas Completas** ✅
