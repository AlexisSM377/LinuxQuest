# Deployment Guide

## Frontend - Vercel

### Setup en Vercel

1. **Conectar repositorio**
   - Ir a https://vercel.com/new
   - Conectar tu GitHub, GitLab o Bitbucket
   - Seleccionar este repositorio

2. **Configuración de build**
   - Framework: Vite (auto-detectado)
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

3. **Variables de entorno**
   - En Settings → Environment Variables
   - Agregar: `VITE_API_URL` = URL del backend (ej: https://api.tu-dominio.com)

### Local Development

```bash
cd frontend
npm install
npm run dev
```

Acceder a http://localhost:5173

Para desarrollo con backend local:
```bash
# .env.local ya está configurado para localhost:3000
npm run dev
```

### Build

```bash
cd frontend
npm run build
npm run preview  # Previsualizar build de producción
```

## Backend - Fly.io

### Setup en Fly.io

```bash
fly auth login
fly launch  # En el directorio backend
```

Configurar:
- App Name
- Region
- Postgres (si es necesario)

### Variables de entorno

```bash
fly secrets set \
  DATABASE_URL=postgresql://... \
  JWT_SECRET=tu-secret-seguro \
  NODE_ENV=production \
  VITE_API_URL=https://tu-app.fly.dev
```

### Deploy

```bash
fly deploy
```

## Database - Neon

1. Crear cuenta en https://neon.tech
2. Crear nuevo proyecto
3. Copiar la connection string
4. Compartir con el backend en Fly.io como DATABASE_URL

## Checklist Final

- [ ] Frontend build sin errores: `npm run build`
- [ ] Variables de entorno en Vercel configuradas
- [ ] Backend deployado en Fly.io
- [ ] Database en Neon accesible
- [ ] VITE_API_URL apunta al backend correcto
- [ ] CORS configurado en backend
- [ ] JWT_SECRET configurado en ambos lados
