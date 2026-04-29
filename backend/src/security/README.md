# 🔐 Módulo de Seguridad - LinuxQuest

## Descripción

Componentes de seguridad avanzada para aislar y proteger la ejecución de comandos Linux en sandbox.

## Archivos

### `sandboxValidator.js`
Valida la seguridad de cada comando antes de ejecutarlo.

**Métodos principales:**
- `validatePathTraversal(path)` - Previene `../../../etc/passwd`
- `validateCommandInjection(cmd)` - Detecta `;`, `|`, backticks, `$()`
- `validateCommandArguments(cmd, flags)` - Valida flags permitidos
- `detectSensitiveFileAccess(cmd)` - Detecta acceso a archivos críticos
- `validateResourceLimits()` - Verifica timeout y tamaño de output
- `fullValidate()` - Validación completa

**Ejemplo:**
```javascript
import SandboxValidator from './sandboxValidator.js';

const validator = new SandboxValidator('/tmp/linuxquest-sandbox/user_1');

const result = validator.fullValidate('ls -la', {
  allowedFlags: ['-', 'l', 'a']
});

if (!result.valid) {
  console.log('Errores:', result.errors);
  console.log('Avisos:', result.warnings);
}
```

### `auditLogger.js`
Registra todas las acciones para auditoría y detección de amenazas.

**Métodos principales:**
- `logCommandAttempt(userId, questId, cmd, result)` - Registra ejecución
- `logSecurityViolation()` - Registra intentos de ataque
- `logSandboxAccess()` - Registra creación/eliminación de sandbox
- `logSessionStart/End()` - Registra sesiones

**Logs generados:**
```
/tmp/linuxquest-audit/
├─ commands.log              # Historial de todos los comandos
├─ security-threats.log      # Intentos de ataque bloqueados
├─ security-violations.log   # Infracciones de seguridad
├─ sandbox-access.log        # Eventos de sandbox
└─ sessions.log              # Inicio/fin de sesiones
```

### `securityConfig.js`
Configuración centralizada de todas las políticas de seguridad.

**Exports:**
- `SECURITY_CONFIG` - Objeto de configuración
- `isGloballyAllowedCommand()` - Valida comando global
- `getAllowedCommandsForMission()` - Obtiene comandos permitidos
- `getTimeoutForMission()` - Obtiene timeout de misión
