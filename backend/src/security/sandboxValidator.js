import { existsSync, statSync } from 'fs';
import { resolve } from 'path';

/**
 * Validador de seguridad para sandbox
 * Previene escapes y operaciones peligrosas
 */

class SandboxValidator {
  constructor(sandboxRoot) {
    this.sandboxRoot = resolve(sandboxRoot);
    this.MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    this.MAX_TOTAL_SIZE = 500 * 1024 * 1024; // 500MB
    this.TIMEOUT_MS = 30000; // 30 segundos max por comando
    this.MAX_OUTPUT_LINES = 10000;
    this.MAX_OUTPUT_SIZE = 5 * 1024 * 1024; // 5MB max output
  }

  /**
   * Valida que una ruta está dentro del sandbox
   */
  validatePathTraversal(requestedPath) {
    try {
      const resolvedPath = resolve(this.sandboxRoot, requestedPath);
      const resolvedRoot = resolve(this.sandboxRoot);

      if (!resolvedPath.startsWith(resolvedRoot + '/') &&
          resolvedPath !== resolvedRoot) {
        return {
          allowed: false,
          reason: 'Path traversal attempt detected'
        };
      }

      return { allowed: true };
    } catch (error) {
      return {
        allowed: false,
        reason: 'Invalid path format'
      };
    }
  }

  /**
   * Previene comandos que podrían escapar del contenedor
   */
  validateCommandInjection(command) {
    const dangerousPatterns = [
      // Shell metacharacters peligrosos (NO bloquear | que es para pipes)
      /[;&`]/,
      // Redirecciones a archivos del sistema
      />\s*\/etc|>\s*\/boot|>\s*\/sys|>\s*\/proc|>\s*\/dev/,
      // Intentos de acceso a Docker
      /docker|\/var\/run\/docker|sock|daemon/i,
      // Intentos de acceso a kernel
      /modprobe|insmod|rmmod|kmod/i,
      // Cambio de permisos peligroso
      /chmod\s+777.*\//,
      // Montajes
      /mount|umount/i,
      // Cambio de usuarios de forma peligrosa
      /usermod.*-u\s+0|useradd.*-u\s+0|groupmod.*-g\s+0/i
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(command)) {
        return {
          allowed: false,
          reason: 'Command contains dangerous patterns'
        };
      }
    }

    return { allowed: true };
  }

  /**
   * Valida argumentos del comando según la misión
   */
  validateCommandArguments(command, allowedFlags = []) {
    const parts = command.trim().split(/\s+/);
    const [cmd, ...args] = parts;

    // Si no hay flags permitidos, rechaza cualquier flag
    if (allowedFlags.length === 0) {
      for (const arg of args) {
        if (arg.startsWith('-')) {
          return {
            allowed: false,
            reason: `Flag ${arg} not allowed for this mission`
          };
        }
      }
    } else {
      // Valida que todos los flags estén en la lista permitida
      for (const arg of args) {
        if (arg.startsWith('-')) {
          const isAllowed = allowedFlags.some(flag =>
            arg === flag || arg.startsWith(flag)
          );
          if (!isAllowed) {
            return {
              allowed: false,
              reason: `Flag ${arg} not allowed. Allowed: ${allowedFlags.join(', ')}`
            };
          }
        }
      }
    }

    return { allowed: true };
  }

  /**
   * Detecta intentos de acceso a archivos sensibles del SISTEMA REAL
   * (no del sandbox que tiene sus propios /etc simulados)
   */
  detectSensitiveFileAccess(command) {
    // Solo bloquear acceso a archivos sensibles del SISTEMA REAL
    // No del sandbox (que tiene sus propios /etc, /var, etc.)
    const realSystemPatterns = [
      '/etc/shadow',
      '/etc/sudoers',
      '/root/',
      '/.ssh/',
      '/.dockerenv',
      '/proc/self/environ',
      '/proc/self/maps',
      '/proc/kcore',
      '/sys/kernel',
      '/sys/firmware',
      '/dev/mem',
      '/dev/kmem',
      '/dev/sd',
      '/dev/nvme',
      '/boot/',
    ];

    for (const pattern of realSystemPatterns) {
      if (command.includes(pattern)) {
        // Verificar que no es una ruta del sandbox (ej: /tmp/.../user_X/etc/...)
        // Las rutas del sandbox NO deberían contener /etc/shadow, /root, etc.
        // pero sí pueden contener /etc/passwd, /etc/group, etc.
        return {
          detected: true,
          file: pattern,
          message: `Acceso bloqueado a archivo sensible del sistema: ${pattern}`
        };
      }
    }

    return { detected: false };
  }

  /**
   * Valida límites de recursos
   */
  validateResourceLimits(executionTime, outputSize, outputLines) {
    const errors = [];

    if (executionTime > this.TIMEOUT_MS) {
      errors.push(`Command exceeded timeout: ${executionTime}ms > ${this.TIMEOUT_MS}ms`);
    }

    if (outputSize > this.MAX_OUTPUT_SIZE) {
      errors.push(`Output exceeded size limit: ${outputSize}B > ${this.MAX_OUTPUT_SIZE}B`);
    }

    if (outputLines > this.MAX_OUTPUT_LINES) {
      errors.push(`Output exceeded line limit: ${outputLines} > ${this.MAX_OUTPUT_LINES}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Extrae todas las rutas mencionadas en un comando
   */
  extractPaths(command) {
    const paths = [];
    const parts = command.trim().split(/\s+/);
    for (const part of parts) {
      if (part.startsWith('/') || part.startsWith('..') || part.startsWith('./') || part.startsWith('~')) {
        paths.push(part);
      }
    }
    return paths;
  }

  /**
   * Validación completa de un comando
   */
  fullValidate(command, questConfig = {}) {
    const results = {
      valid: true,
      errors: [],
      warnings: []
    };

    // 1. Inyección de comandos
    const injectionCheck = this.validateCommandInjection(command);
    if (!injectionCheck.allowed) {
      results.errors.push(injectionCheck.reason);
      results.valid = false;
    }

    // 2. Path traversal - BLOQUEA (no solo advierte)
    const paths = this.extractPaths(command);
    for (const path of paths) {
      const traversalCheck = this.validatePathTraversal(path);
      if (!traversalCheck.allowed) {
        results.errors.push(`Path traversal detected: ${path}`);
        results.valid = false;
      }
    }

    // 3. Acceso a archivos sensibles - BLOQUEA (no solo advierte)
    const sensitiveCheck = this.detectSensitiveFileAccess(command);
    if (sensitiveCheck.detected) {
      results.errors.push(sensitiveCheck.message);
      results.valid = false;
    }

    // 4. Argumentos según misión
    if (questConfig.allowedFlags) {
      const argsCheck = this.validateCommandArguments(command, questConfig.allowedFlags);
      if (!argsCheck.allowed) {
        results.errors.push(argsCheck.reason);
        results.valid = false;
      }
    }

    return results;
  }
}

export default SandboxValidator;
