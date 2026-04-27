# 🔒 Guía Rápida de Seguridad - LinuxQuest

## Inicio Rápido

LinuxQuest implementa **8 capas de seguridad** automáticamente. No requiere configuración adicional.

## Cómo Funciona

Cuando un usuario ejecuta un comando en el terminal:

```
Terminal (Usuario) 
    ↓
    Comando enviado via Socket.io
    ↓
1️⃣ Auditoría inicial - se registra el intento
2️⃣ Validación global - ¿es comando prohibido? (sudo, docker, etc.)
3️⃣ Patrones globales - ¿contiene inyección? (`;`, `|`, `$()`)
4️⃣ Sandbox Validator - ¿intenta path traversal? (../../etc/passwd)
5️⃣ Validación por misión - ¿es permitido en esta misión?
6️⃣ Patrones por misión - ¿contiene patrón específico bloqueado?
7️⃣ Ejecución en sandbox - ejecuta en /tmp/linuxquest-sandbox/user_<id>
8️⃣ Límites de recursos - ¿excedió timeout o output?
    ↓
Resultado enviado al usuario
    ↓
Auditoría registra resultado
```

## Monitoreo de Seguridad

### Ver resumen de todos los intentos de ataque:
```bash
node backend/scripts/audit-monitor.js summary
```

### Ver amenazas por usuario:
```bash
node backend/scripts/audit-monitor.js users
```

### Ver análisis de amenazas detectadas:
```bash
node backend/scripts/audit-monitor.js threats
```

### Ver comandos ejecutados:
```bash
node backend/scripts/audit-monitor.js commands
```

### Ver sesiones de usuarios:
```bash
node backend/scripts/audit-monitor.js sessions
```

### Ver todo:
```bash
node backend/scripts/audit-monitor.js all
```

## Archivos de Auditoría

Se encuentran en: `/tmp/linuxquest-audit/`

```
commands.log              # Todos los comandos ejecutados
security-threats.log      # Intentos de ataque bloqueados
security-violations.log   # Infracciones de seguridad
sandbox-access.log        # Creación/eliminación de sandboxes
sessions.log              # Inicio/fin de sesiones
```

## Lo que está protegido

### ✅ Automaticamente bloqueado:

```javascript
// Comandos prohibidos
sudo comando
docker exec
mount /dev/sda1
modprobe modulo
rm -rf /
shutdown now

// Shell injection
ls; nc attacker.com
echo $(cat /etc/shadow)
cat /etc/passwd && reboot

// Path traversal
cd ../../etc
cat ../../../etc/shadow

// Redirecciones peligrosas
echo data > /etc/hosts
whoami >> /var/log/auth.log

// Acceso a archivos sensibles
cat /etc/shadow
grep root /etc/passwd
```

### ✅ Limitado por misión:

Cada misión tiene restricciones específicas:

```javascript
// Misión 1: Solo puede usar 'uname'
allowedCommands: ['uname', 'help']

// Misión 84: Solo 'chmod' con restricciones
allowedCommands: ['chmod', 'ls', 'help']
allowedFlags: ['-', 'R']
dangerousPatterns: [/chmod\s*4[0-9]{3}/] // Bloquea SUID
```

### ✅ Aislado en sandbox:

Todos los comandos se ejecutan en:
```
/tmp/linuxquest-sandbox/user_<userid>/
```

- No puede acceder a `/etc`, `/root`, `/sys`, etc.
- Máximo 100MB de espacio por usuario
- Timeout de 30 segundos por comando
- Máximo 5MB de output

## Ejemplos de Seguridad en Acción

### Ejemplo 1: Usuario intenta rm -rf /

```
Usuario ejecuta: rm -rf /

1. Auditoría registra intento
2. Validator detecta patrón peligroso: /rm\s+(-r|-f)[\s\*\/]/
3. BLOQUEADO: "Comando bloqueado: contiene operaciones peligrosas"
4. Auditoría registra como DANGEROUS_PATTERN_DETECTED
5. Log en /tmp/linuxquest-audit/security-threats.log
```

### Ejemplo 2: Usuario intenta acceder a /etc/passwd

```
Usuario ejecuta: cat /etc/passwd

1. Auditoría registra intento
2. Validator detecta acceso a archivo sensible
3. BLOQUEADO: "Intento de acceso a archivo sensible"
4. Auditoría registra como SENSITIVE_FILE_ACCESS
5. Log en /tmp/linuxquest-audit/security-violations.log
```

### Ejemplo 3: Misión 84 - Usuario intenta chmod en binarios

```
Misión 84 permite: chmod, ls

Usuario ejecuta: chmod 4755 /bin/bash

1. Auditoría registra intento
2. Quest config tiene patrón: /chmod\s*4[0-9]{3}\s*\/bin/
3. BLOQUEADO: "Comando bloqueado para esta misión"
4. Auditoría registra como DANGEROUS_PATTERN_IN_QUEST
```

### Ejemplo 4: Misión 1 - Usuario intenta usar comando no permitido

```
Misión 1 permite: uname, help

Usuario ejecuta: ls -la

1. Auditoría registra intento
2. Validator ve que 'ls' no está en allowedCommands
3. BLOQUEADO: "Para esta misión solo puedes usar: uname, help"
4. Auditoría registra como COMMAND_NOT_ALLOWED_FOR_QUEST
```

## Responding to Incidents

### Si ves actividad sospechosa:

```bash
# 1. Ver qué usuario fue
grep "userId.*suspicious_pattern" /tmp/linuxquest-audit/security-threats.log

# 2. Ver todos sus intentos
grep "userId.*particular_user" /tmp/linuxquest-audit/*.log

# 3. Limpiar su sandbox si es necesario
rm -rf /tmp/linuxquest-sandbox/user_<id>

# 4. Analizar patrones
node backend/scripts/audit-monitor.js threats
```

## Configuración de Misiones Seguras

Al crear una nueva misión, siempre define:

```javascript
{
  // Comandos que el usuario PUEDE usar
  allowedCommands: ['comando_principal', 'help'],
  
  // Flags específicos permitidos
  allowedFlags: ['-', 'a', 'l'],
  
  // Patrones específicos a bloquear
  dangerousPatterns: [
    /comando_principal\s+-x/i  // Bloquea flag -x
  ],
  
  // Mensaje de advertencia
  warningMessage: 'Este comando es peligroso. Úsalo solo en el sandbox.'
}
```

## Detalles Técnicos

### Clases de Seguridad:

1. **SandboxValidator** (`src/security/sandboxValidator.js`)
   - Valida path traversal
   - Detecta command injection
   - Valida argumentos
   - Detecta acceso a archivos sensibles

2. **AuditLogger** (`src/security/auditLogger.js`)
   - Registra todos los intentos
   - Detecta patrones maliciosos
   - Analiza nivel de amenaza

3. **SecurityConfig** (`src/security/securityConfig.js`)
   - Define comandos prohibidos globalmente
   - Define directorios prohibidos
   - Define límites de recursos

### Configuración Modificable:

Si necesitas cambiar límites, edita `src/security/securityConfig.js`:

```javascript
COMMAND_LIMITS: {
  MAX_EXECUTION_TIME: 30000,    // Segundos
  MAX_OUTPUT_SIZE: 5*1024*1024, // Bytes
  MAX_OUTPUT_LINES: 10000,
}

USER_LIMITS: {
  MAX_SANDBOX_SIZE: 100*1024*1024,
  COMMANDS_PER_MINUTE: 60,
}

FORBIDDEN_COMMANDS: [
  'sudo', 'docker', 'mount', ...
]
```

## Testing de Seguridad

Para verificar que la seguridad funciona:

```bash
# Terminal con comandos que DEBEN bloquearse:
rm -rf /
$(cat /etc/shadow)
../../../etc/passwd
sudo bash
docker exec
nc attacker.com
cat > /etc/hosts

# Todos deberían retornar: "Comando bloqueado"
```

## FAQ

**P: ¿Puede un usuario salir del sandbox?**
A: No. Las validaciones de path traversal lo impiden completamente.

**P: ¿Qué pasa si un usuario ejecuta un comando de larga duración?**
A: Se aborta después de 30 segundos (configurable en SECURITY_CONFIG).

**P: ¿Se registra cada intento?**
A: Sí. Cada intento se registra en los logs de auditoría con timestamp y usuario.

**P: ¿Qué son los patrones peligrosos?**
A: Regex que detectan comandos como `;rm`, `$(...)`, backticks, etc.

**P: ¿Puedo permitir sudo en una misión?**
A: No. `sudo` está en FORBIDDEN_COMMANDS globalmente (no se puede permitir).

**P: ¿Cómo veo qué usuario intentó atacar?**
A: `node backend/scripts/audit-monitor.js users`

## Más Información

- Documentación completa: `docs/SECURITY.md`
- Código de validadores: `src/security/`
- Ejemplo de integración: `src/services/commandService.js`
- Script de monitoreo: `scripts/audit-monitor.js`

---

**LinuxQuest es seguro por defecto. Disfruta enseñando Linux sin preocupaciones.** 🔒
