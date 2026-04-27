# 🚀 Guía de Deployment - LinuxQuest

## Stack Completo

```
Frontend (Vercel)         ← React 18 + Vite
          ↓ HTTPS
Backend (Fly.io)          ← Node.js 20 + Express + Socket.io
          ↓ SSL
Database (Neon)           ← PostgreSQL
```

## Checklist Pre-Deployment

### 1. Verificar Sistema Localmente

```bash
# En backend/
node scripts/verify-setup.js
```

Expected output:
```
✅ Conexión a base de datos
✅ Tabla de usuarios existe
✅ Tabla de quests existe
✅ Tabla de progreso existe
❌ Misiones en base de datos (0 encontradas - normal antes de seed)
✅ Archivo: sandboxValidator.js
✅ Archivo: auditLogger.js
✅ Archivo: securityConfig.js
✅ Archivo: questCommands.js
✅ Archivo: seed-quests.js
... (14 más)
```

### 2. Poblar Base de Datos Localmente

```bash
cd backend
npm run init-db          # Crear tablas
npm run seed-quests      # Poblar con 95 misiones
```

Expected output:
```
✅ 95 quests seeded successfully based on LPI Linux Essentials curriculum
```

### 3. Test Local

```bash
# Terminal 1: Backend
cd backend
npm run dev              # Debe mostrar: "Servidor corriendo en http://localhost:3000"

# Terminal 2: Frontend
cd frontend
npm run dev              # Debe mostrar: "Local: http://localhost:5173"
```

Verifica en browser:
- [ ] Página de login carga
- [ ] Puedes registrarte
- [ ] Puedes logearte
- [ ] Terminal aparece
- [ ] Puedes ejecutar `pwd`
- [ ] Puedes ejecutar `ls`
- [ ] `sudo` se bloquea
- [ ] `rm -rf /` se bloquea

### 4. Commit Cambios

```bash
git add -A
git commit -m "feat: security system and quest infrastructure complete"
git push origin main
```

---

## Deployment a Fly.io (Backend)

### Prerequisites
- Cuenta en Fly.io
- CLI instalada: `flyctl auth login`
- GitHub repo conectado

### Paso 1: Crear App en Fly.io

```bash
cd backend

# Si no existe app aún
flyctl launch

# Cuando pregunte:
# - Name: linuxquest-backend (o el que uses)
# - Region: dfw (Dallas) o tu preferencia
# - Database: No (usamos Neon)
# - Redis: No
```

### Paso 2: Configurar Variables de Entorno

```bash
flyctl secrets set \
  DATABASE_URL="postgresql://user:pass@host:5432/db" \
  JWT_SECRET="tu-secreto-super-largo-aleatorio" \
  NODE_ENV="production"
```

Obtén DATABASE_URL de Neon:
```
# En dashboard.neon.tech
# Copia la full connection string
postgresql://neondb_owner:xxxx@ep-xxx.us-east-1.neon.tech/neondb
```

### Paso 3: Actualizar fly.toml

```toml
[build]
  builder = "dockerfile"

[env]
  PORT = "3000"

[[services]]
  internal_port = 3000
  protocol = "tcp"

  [services.http_checks]
    enabled = true
    grace_period = "10s"
    interval = "30s"
    min_recovery_duration = "5s"
    timeout = "5s"
    path = "/api/health"
    protocol = "http"

  [[services.ports]]
    port = 80
    handlers = ["http"]
    force_https = true

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

### Paso 4: Deploy

```bash
# Desde backend/
flyctl deploy

# Monitorea logs
flyctl logs -f
```

Expected logs:
```
Servidor corriendo en http://localhost:3000
```

### Paso 5: Seed Database en Producción

```bash
# Ejecuta script en servidor remoto
flyctl ssh console

# En el servidor:
cd /app
npm run seed-quests

# Verifica
npm run verify-setup.js
```

### Paso 6: Verificar Deployment

```bash
# Desde tu máquina
curl https://linuxquest-backend.fly.dev/api/health

# Expected:
# {"status":"Backend running","timestamp":"2026-04-27T..."}
```

---

## Deployment a Vercel (Frontend)

### Prerequisite
- Cuenta en Vercel
- GitHub repo conectado

### Paso 1: Conectar Repo

```bash
# En Vercel Dashboard:
# New Project → Import Git Repository → tu-repo

# O via CLI:
cd frontend
vercel
```

### Paso 2: Configurar Variables

En Vercel Dashboard:
```
Settings → Environment Variables

VITE_API_URL=https://linuxquest-backend.fly.dev
```

### Paso 3: Deploy

```bash
git push origin main
# Vercel deploya automáticamente
```

Expected:
- Build pasa
- Site disponible en `linuxquest.vercel.app` (o tu dominio)

---

## Testing Post-Deployment

### 1. Verificar Endpoints

```bash
# Health check
curl https://linuxquest-backend.fly.dev/api/health

# Quests API
curl https://linuxquest-backend.fly.dev/api/quests | jq '.[] | select(.id == 1)'

# Expected:
# {
#   "id": 1,
#   "title": "El Despertar del Iniciado",
#   "world": 1,
#   ...
# }
```

### 2. Test Full Flow

1. Abre frontend en browser
2. Registra usuario
3. Login
4. Ve que aparecen las 95 misiones en el sidebar
5. Haz click en Misión 1
6. Ejecuta `uname -a` en terminal
7. Verifica que funciona
8. Intenta `sudo` - debe bloquearse
9. Verifica que aparece error de seguridad

### 3. Verificar Auditoría

```bash
# En servidor Fly.io
flyctl ssh console

ls -la /tmp/linuxquest-audit/
cat /tmp/linuxquest-audit/commands.log | jq . | head -5
```

### 4. Load Test Básico

```bash
# Instala autocannon
npm install -g autocannon

# Test backend
autocannon https://linuxquest-backend.fly.dev/api/health -d 10 -c 10
```

---

## Monitoreo Continuo

### Logs en Tiempo Real

```bash
# Backend
flyctl logs -f

# Buscar errores
flyctl logs -f --level warning
flyctl logs -f --level error
```

### Auditoría de Seguridad

```bash
# En servidor
flyctl ssh console

# Ver amenazas
tail -f /tmp/linuxquest-audit/security-threats.log | jq .

# Contar intentos por usuario
node /app/scripts/audit-monitor.js users
```

### Métricas

```bash
# CPU/Memoria
flyctl monitor

# Logs de deploy
flyctl history

# Estado actual
flyctl status
```

---

## Troubleshooting

### Backend no inicia

```bash
# Ver logs detallados
flyctl logs -f

# Conectar a consola
flyctl ssh console

# Verificar environment
echo $DATABASE_URL
echo $JWT_SECRET
```

### Base de datos no conecta

```bash
# Verifica connection string
flyctl secrets list

# Test conexión
psql $DATABASE_URL -c "SELECT NOW();"
```

### Socket.io no conecta

```bash
# Verifica CORS
curl -H "Origin: https://linuxquest.vercel.app" \
  https://linuxquest-backend.fly.dev/

# Revisa server.js CORS config
```

### Misiones no aparecen

```bash
# Verifica que fueron seeded
flyctl ssh console
psql $DATABASE_URL -c "SELECT COUNT(*) FROM quests;"
# Debe mostrar: 95
```

---

## Rollback

### Si algo va mal

```bash
# Ver versión anterior
flyctl history

# Rollback a versión anterior
flyctl releases list
flyctl releases rollback <version-id>

# O redeploy
flyctl deploy --image <image-id>
```

---

## Maintenance

### Backup Database

```bash
# Neon automáticamente hace backups
# Pero puedes hacer manual:
pg_dump $DATABASE_URL > backup.sql
```

### Actualizar Dependencias

```bash
# Backend
cd backend
npm update
npm run test  # Si existen tests

# Frontend
cd frontend
npm update
npm run build  # Verifica que build pasa

git commit -m "deps: update dependencies"
git push origin main
```

### Monitoreo de Seguridad

```bash
# Daily
flyctl ssh console
node /app/scripts/audit-monitor.js summary

# Weekly
node /app/scripts/audit-monitor.js all > weekly-report.txt
```

---

## Escalado

Si necesitas más capacidad:

```bash
# Aumentar recursos
flyctl scale vm shared-cpu-1x --count 2

# O machine types
flyctl machine-type list
flyctl scale vm shared-cpu-4x
```

---

## URLs en Producción

```
Frontend:  https://linuxquest.vercel.app
Backend:   https://linuxquest-backend.fly.dev
Database:  postgresql://... (Neon - privada)
```

---

## Checklist Final

- [ ] npm run verify-setup.js pasa completamente
- [ ] npm run seed-quests ejecuta sin errores
- [ ] Tests locales pasan
- [ ] Backend desplegado en Fly.io
- [ ] Database poblada en producción
- [ ] Frontend desplegado en Vercel
- [ ] Health checks pasan
- [ ] Full flow testing completado
- [ ] Auditoría funcionando
- [ ] Monitoreo configurado

---

**LinuxQuest está listo para producción. ¡Bienvenidos a la era del aprendizaje seguro de Linux!** 🚀
