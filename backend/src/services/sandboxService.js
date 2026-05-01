import { mkdirSync, rmSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';

const TEMP_BASE = join(tmpdir(), 'linuxquest-sandbox');
const MAX_SANDBOX_SIZE = 10 * 1024 * 1024; // 10MB per user

const initializeSandbox = (sandboxDir) => {
  try {
    // Archivos raíz del sandbox
    writeFileSync(
      join(sandboxDir, 'README.txt'),
      'Bienvenido a LinuxQuest\nEste es tu espacio de trabajo temporal.\nPractica comandos de Linux aquí.\n'
    );
    writeFileSync(
      join(sandboxDir, 'datos.txt'),
      'Línea 1: Datos de ejemplo\nLínea 2: Para practicar grep\nLínea 3: Y otros comandos\nLínea 4: Linux es poderoso\nLínea 5: Open source es libertad\n'
    );
    writeFileSync(
      join(sandboxDir, 'ejemplo.log'),
      '2026-04-30 10:00:01 INFO  Sistema iniciado correctamente\n2026-04-30 10:00:05 INFO  Conexión establecida\n2026-04-30 10:01:12 WARNING  Memoria al 75%\n2026-04-30 10:02:30 ERROR  Fallo al conectar con servicio externo\n2026-04-30 10:03:00 INFO  Reintentando conexión\n2026-04-30 10:03:05 INFO  Conexión restaurada\n2026-04-30 10:05:00 INFO  Tarea completada exitosamente\n'
    );
    writeFileSync(
      join(sandboxDir, 'numeros.txt'),
      '42\n7\n15\n3\n28\n91\n56\n12\n67\n34\n'
    );
    writeFileSync(
      join(sandboxDir, 'nombres.txt'),
      'Ana\nCarlos\nBeatriz\nDavid\nElena\nFernando\nGabriela\nHugo\nIsabel\nJavier\n'
    );
    writeFileSync(
      join(sandboxDir, 'script_demo.sh'),
      '#!/bin/bash\necho "Este es un script de ejemplo"\necho "Fecha: $(date)"\necho "Usuario: $(whoami)"\n'
    );

    // Crear subdirectorio de práctica
    const practicaDir = join(sandboxDir, 'practica');
    if (!existsSync(practicaDir)) {
      mkdirSync(practicaDir, { recursive: true });
    }
    writeFileSync(
      join(practicaDir, 'notas.txt'),
      'Mis notas de Linux\nComandos aprendidos: ls, cd, pwd, cat, grep\n'
    );

    // Crear estructura para misiones de mundo 2
    const aventuraDir = join(sandboxDir, 'aventura');
    const heroeDir = join(aventuraDir, 'heroe');
    const inventarioDir = join(aventuraDir, 'inventario');
    if (!existsSync(heroeDir)) mkdirSync(heroeDir, { recursive: true });
    if (!existsSync(inventarioDir)) mkdirSync(inventarioDir, { recursive: true });
    writeFileSync(join(aventuraDir, 'historia.txt'), 'Érase una vez un aprendiz de Linux...\n');
    writeFileSync(join(heroeDir, 'ficha.txt'), 'Nombre: Aprendiz\nNivel: 1\nClase: Explorador\n');
    writeFileSync(join(inventarioDir, 'items.txt'), 'Espada básica\nEscudo de madera\nPoción de salud\n');

    // Crear archivos para misiones de copia/movimiento
    writeFileSync(join(sandboxDir, 'aventura.txt'), 'Contenido del archivo aventura\n');
    writeFileSync(join(sandboxDir, 'original.txt'), 'Este es un archivo original para copiar\n');

    // Crear archivos numéricos para misiones de sort/wc
    writeFileSync(join(sandboxDir, 'numeros_grandes.txt'),
      '1024\n2048\n512\n4096\n256\n8192\n128\n16384\n64\n32768\n'
    );

    // Crear archivos para globbing
    writeFileSync(join(sandboxDir, 'archivo1.txt'), 'Archivo 1\n');
    writeFileSync(join(sandboxDir, 'archivo2.txt'), 'Archivo 2\n');
    writeFileSync(join(sandboxDir, 'archivo3.txt'), 'Archivo 3\n');
    writeFileSync(join(sandboxDir, 'datos.csv'), 'nombre,edad,ciudad\nAna,25,Madrid\nCarlos,30,Barcelona\nElena,28,Valencia\nDavid,35,Sevilla\n');

    // Crear directorio /etc simulado dentro del sandbox para quests
    const etcDir = join(sandboxDir, 'etc');
    if (!existsSync(etcDir)) mkdirSync(etcDir, { recursive: true });
    writeFileSync(join(etcDir, 'os-release'),
      'NAME="Alpine Linux"\nVERSION_ID=3.19\nID=alpine\nPRETTY_NAME="Alpine Linux v3.19"\nHOME_URL="https://alpinelinux.org/"\nBUG_REPORT_URL="https://gitlab.alpinelinux.org/alpine/aports/-/issues"\n'
    );
    writeFileSync(join(etcDir, 'passwd'),
      'root:x:0:0:root:/root:/bin/ash\nsandbox:x:1001:1001:LinuxQuest Sandbox:/home/sandbox:/bin/bash\nstudent:x:1000:1000:Student:/home/student:/bin/bash\nnobody:x:65534:65534:nobody:/nonexistent:/sbin/nologin\n'
    );
    writeFileSync(join(etcDir, 'group'),
      'root:x:0:\nsandbox:x:1001:\nstudent:x:1000:\nnobody:x:65534:\nwheel:x:10:root,sandbox\n'
    );
    writeFileSync(join(etcDir, 'hostname'), 'linuxquest-sandbox\n');
    writeFileSync(join(etcDir, 'hosts'),
      '127.0.0.1\tlocalhost\n::1\t\tlocalhost\n127.0.0.1\tlinuxquest-sandbox\n'
    );
    writeFileSync(join(etcDir, 'resolv.conf'),
      'nameserver 8.8.8.8\nnameserver 8.8.4.4\n'
    );
    writeFileSync(join(etcDir, 'login.defs'),
      '# Login definitions\nPASS_MAX_DAYS\t99999\nPASS_MIN_DAYS\t0\nPASS_MIN_LEN\t5\nPASS_WARN_AGE\t7\nUID_MIN\t\t\t1000\nUID_MAX\t\t\t60000\nGID_MIN\t\t\t1000\nGID_MAX\t\t\t60000\nENCRYPT_METHOD\tSHA512\n'
    );

    // Crear /var/log simulado
    const varLogDir = join(sandboxDir, 'var', 'log');
    if (!existsSync(varLogDir)) mkdirSync(varLogDir, { recursive: true });
    writeFileSync(join(varLogDir, 'syslog'),
      'Apr 30 10:00:01 linuxquest kernel: [    0.000000] Linux version 6.1.0\nApr 30 10:00:02 linuxquest systemd[1]: Started Sandbox Service\nApr 30 10:00:05 linuxquest sshd[856]: Server listening on 0.0.0.0 port 22\nApr 30 10:01:00 linuxquest cron[200]: (root) CMD (/usr/sbin/anacron -s)\n'
    );
    writeFileSync(join(varLogDir, 'auth.log'),
      'Apr 30 10:00:10 linuxquest sshd[856]: Accepted publickey for student from 192.168.1.100\nApr 30 10:05:00 linuxquest sudo: student : TTY=pts/0 ; PWD=/home/student ; USER=root ; COMMAND=/bin/ls\n'
    );

    // Crear /dev simulado (solo lectura)
    const devDir = join(sandboxDir, 'dev');
    if (!existsSync(devDir)) mkdirSync(devDir, { recursive: true });
    writeFileSync(join(devDir, 'null_info'), '/dev/null - Dispositivo nulo (descarta toda escritura)\n');
    writeFileSync(join(devDir, 'zero_info'), '/dev/zero - Genera bytes nulos infinitos\n');
    writeFileSync(join(devDir, 'random_info'), '/dev/random - Genera datos aleatorios\n');

    // Crear directorio /tmp simulado
    const tmpDir = join(sandboxDir, 'tmp');
    if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });
    writeFileSync(join(tmpDir, 'test.txt'), 'Archivo temporal de prueba\n');

  } catch (error) {
    console.error('Error initializing sandbox files:', error);
  }
};

export const createUserSandbox = (userId) => {
  const userSandboxDir = join(TEMP_BASE, `user_${userId}`);

  try {
    mkdirSync(userSandboxDir, { recursive: true });
    initializeSandbox(userSandboxDir);
    console.log(`Sandbox created for user ${userId}: ${userSandboxDir}`);
    return userSandboxDir;
  } catch (error) {
    console.error(`Error creating sandbox for user ${userId}:`, error);
    throw error;
  }
};

export const deleteUserSandbox = (userId) => {
  const userSandboxDir = join(TEMP_BASE, `user_${userId}`);

  try {
    rmSync(userSandboxDir, { recursive: true, force: true });
    console.log(`Sandbox deleted for user ${userId}`);
  } catch (error) {
    console.error(`Error deleting sandbox for user ${userId}:`, error);
  }
};

export const getSandboxPath = (userId) => {
  return join(TEMP_BASE, `user_${userId}`);
};

export const validateSandboxPath = (sandboxDir, requestedPath) => {
  try {
    const resolvedPath = resolve(sandboxDir, requestedPath);
    const resolvedBase = resolve(sandboxDir);

    return resolvedPath.startsWith(resolvedBase);
  } catch {
    return false;
  }
};

export const cleanupUserSandbox = (userId) => {
  const userSandboxDir = join(TEMP_BASE, `user_${userId}`);

  try {
    rmSync(userSandboxDir, { recursive: true, force: true });
    createUserSandbox(userId);
    console.log(`Sandbox cleaned for user ${userId}`);
  } catch (error) {
    console.error(`Error cleaning sandbox for user ${userId}:`, error);
  }
};
