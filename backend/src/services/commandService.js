import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { getQuestCommandConfig } from '../config/questCommands.js';
import SandboxValidator from '../security/sandboxValidator.js';
import auditLogger from '../security/auditLogger.js';
import SECURITY_CONFIG, {
  isGloballyAllowedCommand,
  validateCommandArgs,
  getAllowedCommandsForMission,
  getTimeoutForMission
} from '../security/securityConfig.js';

const execAsync = promisify(exec);

const GLOBAL_ALLOWED_COMMANDS = {
  help: 'Muestra comandos disponibles',
  cd: 'Cambia de directorio',
  pwd: 'Directorio actual',
  echo: 'Imprime texto',
  date: 'Fecha y hora',
  ls: 'Lista archivos',
  cat: 'Muestra contenido de archivo',
  mkdir: 'Crea un directorio',
  touch: 'Crea un archivo vacío',
  rm: 'Elimina archivo o directorio',
  cp: 'Copia archivo',
  mv: 'Mueve o renombra',
  ln: 'Crea enlaces',
  chmod: 'Cambia permisos',
  chown: 'Cambia propietario',
  getfacl: 'Lee ACLs',
  setfacl: 'Modifica ACLs',
  find: 'Busca archivos',
  grep: 'Busca texto en archivos',
  sed: 'Editor de flujo de texto',
  awk: 'Procesador de patrones',
  cut: 'Extrae columnas',
  sort: 'Ordena líneas',
  uniq: 'Filtra duplicados',
  wc: 'Cuenta líneas, palabras, caracteres',
  head: 'Muestra primeras líneas',
  tail: 'Muestra últimas líneas',
  tee: 'Lee de stdin y escribe a stdout/archivo',
  less: 'Visor de archivos paginado',
  more: 'Visor de archivos simple',
  gzip: 'Compresión gzip',
  gunzip: 'Descomprime gzip',
  bzip2: 'Compresión bzip2',
  bunzip2: 'Descomprime bzip2',
  xz: 'Compresión xz',
  unxz: 'Descomprime xz',
  tar: 'Archivado tar',
  zip: 'Compresión zip',
  unzip: 'Descomprime zip',
  uname: 'Información del sistema',
  whoami: 'Usuario actual',
  id: 'IDs de usuario y grupo',
  who: 'Usuarios conectados',
  w: 'Quién está y qué hace',
  uptime: 'Tiempo de arranque del sistema',
  df: 'Uso de disco por sistema de archivos',
  du: 'Uso de espacio por archivo/directorio',
  free: 'Uso de memoria',
  lsblk: 'Lista dispositivos de bloque',
  lscpu: 'Información de CPU',
  lsusb: 'Lista dispositivos USB',
  dmesg: 'Mensajes del kernel',
  ps: 'Procesos en ejecución',
  top: 'Monitor de procesos',
  kill: 'Termina un proceso',
  ip: 'Configuración de red',
  ss: 'Estado de sockets',
  netstat: 'Estado de la red',
  route: 'Tabla de rutas',
  ifconfig: 'Configuración de red (legacy)',
  ping: 'Prueba de conectividad',
  curl: 'Cliente HTTP',
  dig: 'Consulta DNS',
  host: 'Consulta DNS',
  nslookup: 'Consulta DNS',
  traceroute: 'Ruta de paquetes',
  iptables: 'Firewall',
  useradd: 'Crea un usuario',
  usermod: 'Modifica un usuario',
  userdel: 'Elimina un usuario',
  groupadd: 'Crea un grupo',
  groupdel: 'Elimina un grupo',
  gpasswd: 'Administra grupos',
  passwd: 'Cambia contraseña',
  su: 'Cambia de usuario',
  sudo: 'Ejecuta como otro usuario',
  visudo: 'Edita configuración de sudo',
  chage: 'Cambia aging de contraseña',
  ssh: 'Cliente SSH',
  'ssh-keygen': 'Genera claves SSH',
  which: 'Ubica comandos en PATH',
  seq: 'Genera secuencia de números',
  man: 'Manual de comandos',
  apropos: 'Busca en el manual',
  whatis: 'Descripción corta de comando',
  gpg: 'Cifrado y firmas GPG',
  auditctl: 'Control del subsistema de auditoría',
  ausearch: 'Búsqueda en logs de auditoría',
  journalctl: 'Logs del sistema (systemd)',
  semanage: 'Gestión de SELinux',
  chgrp: 'Cambia grupo propietario',
  locate: 'Busca archivos en base de datos',
  updatedb: 'Actualiza base de datos de locate',
  mtr: 'Diagnóstico de red (traceroute mejorado)',
  lsof: 'Lista archivos abiertos',
  groups: 'Muestra grupos de un usuario',
  newgrp: 'Cambia grupo efectivo',
  last: 'Historial de logins',
  lastlog: 'Último login por usuario',
  cal: 'Calendario',
  file: 'Tipo de archivo',
  stat: 'Stats de archivo',
  tac: 'Cat inverso',
  rev: 'Invierte líneas',
  nl: 'Numera líneas',
  od: 'Dump octal',
  strings: 'Imprime strings imprimibles',
  base64: 'Codifica/decodifica base64',
  md5sum: 'Hash MD5',
  sha256sum: 'Hash SHA256',
  vi: 'Editor de texto vi (mock)',
  vim: 'Editor de texto vim (mock)',
  nano: 'Editor de texto nano (mock)',
  htop: 'Monitor de procesos mejorado (mock)',
  hostname: 'Nombre del host',
  nproc: 'Número de procesadores',
  clear: 'Limpia la pantalla',
  history: 'Historial de comandos',
  type: 'Tipo de comando',
  true: 'Retorna éxito',
  false: 'Retorna fallo',
  printf: 'Imprime formateado',
  env: 'Variables de entorno',
  printenv: 'Imprime variables de entorno',
  sleep: 'Pausa ejecución',
  test: 'Evalúa condición',
  xargs: 'Construye argumentos de stdin',
  tr: 'Traduce o elimina caracteres',
  paste: 'Combina líneas de archivos',
  comm: 'Compara archivos ordenados',
  diff: 'Muestra diferencias',
  column: 'Formatea en columnas',
  fmt: 'Formatea texto',
  fold: 'Ajusta líneas al ancho',
  nohup: 'Ejecuta sin hangup',
  jobs: 'Trabajos en background',
  bg: 'Envía a background',
  fg: 'Trae a foreground',
  alias: 'Crea alias',
  unalias: 'Elimina alias',
  export: 'Exporta variable',
  set: 'Configura opciones',
  unset: 'Elimina variable',
  umask: 'Máscara de permisos',
  timeout: 'Ejecuta con timeout',
  yes: 'Repite string infinitamente',
  tac: 'Concatena en reversa',
  head: 'Primeras líneas',
  tail: 'Últimas líneas',
};

/**
 * Pre-procesa comandos interactivos para que no cuelguen
 * Convierte comandos que esperan stdin en versiones no-interactivas
 */
const preprocessCommand = (cmd, sandboxDir) => {
  let processed = cmd.trim();

  // cat sin argumentos (o solo con flags sin archivo) → mostrar ayuda
  if (processed === 'cat' || processed === 'cat -') {
    return { command: `echo "(Usa 'cat <archivo>' para ver el contenido de un archivo)"`, handled: true };
  }
  // cat con flags pero sin archivo (ej: cat -n, cat -b, cat -v)
  if (/^cat\s+-\S+\s*$/.test(processed)) {
    return { command: `echo "(Usa '${processed} <archivo>' para ver el contenido con opciones)"`, handled: true };
  }

  // less/more → convertir a cat (mostrar contenido sin paginación)
  if (/^(less|more)\s+/.test(processed)) {
    processed = processed.replace(/^(less|more)/, 'cat');
  }
  if (processed === 'less' || processed === 'more') {
    return { command: `echo "(Usa '${processed} <archivo>' para ver el contenido de un archivo)"`, handled: true };
  }
  // less/more con flags pero sin archivo
  if (/^(less|more)\s+-\S+\s*$/.test(processed)) {
    const cmdName = processed.match(/^(less|more)/)[1];
    return { command: `echo "(Usa '${cmdName} <archivo>' para ver el contenido de un archivo)"`, handled: true };
  }

  // man → usar MANPAGER=cat para no abrir paginador
  if (/^man\s+/.test(processed)) {
    processed = `MANPAGER=cat PAGER=cat ${processed} 2>/dev/null || echo "No manual entry for ${processed.replace('man ', '').trim()}. Try: man --help"`;
  }
  if (processed === 'man') {
    return { command: `echo "(Usa 'man <comando>' para ver el manual de un comando)"`, handled: true };
  }

  // top → batch mode, 1 iteración
  if (/^top\s*$/.test(processed)) {
    processed = 'top -b -n 1 2>/dev/null || ps aux --sort=-%cpu | head -15';
  }
  if (/^top\s+/.test(processed) && !/-b/.test(processed)) {
    // Agregar -b -n 1 si no los tiene
    processed = processed.replace('top', 'top -b -n 1');
  }

  // htop → ya tiene mock que no cuelga

  // head/tail sin archivo → no esperar stdin
  if (/^head\s*$/.test(processed) || /^head\s+-\S+\s*$/.test(processed)) {
    return { command: `echo "(Usa 'head <archivo>' para ver las primeras líneas)"`, handled: true };
  }
  if (/^tail\s*$/.test(processed) || /^tail\s+-\S+\s*$/.test(processed)) {
    return { command: `echo "(Usa 'tail <archivo>' para ver las últimas líneas)"`, handled: true };
  }

  // grep sin archivo → no esperar stdin
  if (/^grep\s+/.test(processed)) {
    const parts = processed.split(/\s+/);
    const hasFile = parts.some((p, i) => i > 0 && !p.startsWith('-'));
    if (!hasFile) {
      return { command: `echo "(Usa 'grep <patrón> <archivo>' para buscar texto)"`, handled: true };
    }
  }

  // wc/sort/uniq/sed/awk/cut/tr solos (sin pipe, sin archivo) → no esperar stdin
  // Solo si el comando NO tiene pipe (|)
  if (!processed.includes('|')) {
    if (/^wc\s*$/.test(processed)) {
      return { command: `echo "(Usa 'wc <archivo>' para contar líneas, palabras y caracteres)"`, handled: true };
    }
    if (/^sort\s*$/.test(processed)) {
      return { command: `echo "(Usa 'sort <archivo>' para ordenar líneas)"`, handled: true };
    }
    if (/^uniq\s*$/.test(processed)) {
      return { command: `echo "(Usa 'uniq <archivo>' para filtrar duplicados)"`, handled: true };
    }
    if (/^sed\s+/.test(processed)) {
      // sed 's/old/new/' sin archivo
      const afterScript = processed.replace(/^sed\s+'[^']*'\s*/, '');
      if (!afterScript || afterScript.trim().startsWith('-')) {
        return { command: `echo "(Usa 'sed 's/old/new/' <archivo>' para reemplazar texto)"`, handled: true };
      }
    }
    if (/^awk\s+/.test(processed)) {
      // awk '{print $1}' sin archivo
      const afterScript = processed.replace(/^awk\s+'[^']*'\s*/, '');
      if (!afterScript || afterScript.trim().startsWith('-')) {
        return { command: `echo "(Usa 'awk '{print \$1}' <archivo>' para procesar texto)"`, handled: true };
      }
    }
  }

  // apropos → puede fallar si no hay db, usar fallback
  if (/^apropos\s+/.test(processed)) {
    const searchTerm = processed.replace('apropos', '').trim();
    processed = `apropos ${searchTerm} 2>/dev/null || man -k ${searchTerm} 2>/dev/null || echo "No se encontraron entradas para '${searchTerm}'"`;
  }

  // ssh-keygen → modo no interactivo
  if (/^ssh-keygen\s*$/.test(processed)) {
    processed = 'ssh-keygen -t ed25519 -f /tmp/linuxquest-sandbox/id_test -N "" -q 2>/dev/null && echo "Clave SSH generada: /tmp/linuxquest-sandbox/id_test" || echo "Error generando clave"';
  }

  // vi/vim/nano → mostrar info educativa (ya tienen mock)
  // ping sin -c → agregar -c 4
  if (/^ping\s+/.test(processed) && !/-c\s/.test(processed)) {
    processed = processed.replace('ping', 'ping -c 4 -W 3');
  }
  if (processed === 'ping') {
    return { command: `echo "(Usa 'ping <host>' para probar conectividad)"`, handled: true };
  }

  // curl sin timeout → agregar timeout
  if (/^curl\s/.test(processed) && !/--connect-timeout/.test(processed) && !/-m\s/.test(processed)) {
    processed = processed.replace('curl', 'curl --connect-timeout 5 -m 10');
  }

  // Reescribir rutas del sistema a rutas del sandbox
  // Esto permite que los quests funcionen con rutas "reales"
  const sandboxEtc = join(sandboxDir, 'etc');
  const sandboxVar = join(sandboxDir, 'var');

  // /etc/os-release → sandbox/etc/os-release
  if (existsSync(join(sandboxEtc, 'os-release'))) {
    processed = processed.replace(/\/etc\/os-release/g, join(sandboxEtc, 'os-release'));
  }
  // /etc/passwd → sandbox/etc/passwd
  if (existsSync(join(sandboxEtc, 'passwd'))) {
    processed = processed.replace(/\/etc\/passwd/g, join(sandboxEtc, 'passwd'));
  }
  // /etc/group → sandbox/etc/group
  if (existsSync(join(sandboxEtc, 'group'))) {
    processed = processed.replace(/\/etc\/group/g, join(sandboxEtc, 'group'));
  }
  // /etc/hostname → sandbox/etc/hostname
  if (existsSync(join(sandboxEtc, 'hostname'))) {
    processed = processed.replace(/\/etc\/hostname/g, join(sandboxEtc, 'hostname'));
  }
  // /etc/hosts → sandbox/etc/hosts
  if (existsSync(join(sandboxEtc, 'hosts'))) {
    processed = processed.replace(/\/etc\/hosts/g, join(sandboxEtc, 'hosts'));
  }
  // /etc/resolv.conf → sandbox/etc/resolv.conf
  if (existsSync(join(sandboxEtc, 'resolv.conf'))) {
    processed = processed.replace(/\/etc\/resolv\.conf/g, join(sandboxEtc, 'resolv.conf'));
  }
  // /etc/login.defs → sandbox/etc/login.defs
  if (existsSync(join(sandboxEtc, 'login.defs'))) {
    processed = processed.replace(/\/etc\/login\.defs/g, join(sandboxEtc, 'login.defs'));
  }
  // /var/log/syslog → sandbox/var/log/syslog
  if (existsSync(join(sandboxVar, 'log', 'syslog'))) {
    processed = processed.replace(/\/var\/log\/syslog/g, join(sandboxVar, 'log', 'syslog'));
  }
  // /var/log/auth.log → sandbox/var/log/auth.log
  if (existsSync(join(sandboxVar, 'log', 'auth.log'))) {
    processed = processed.replace(/\/var\/log\/auth\.log/g, join(sandboxVar, 'log', 'auth.log'));
  }

  // ls -ld /tmp → mostrar info del sandbox tmp
  if (/^ls\s+.*\/tmp\s*$/.test(processed)) {
    processed = `ls -ld ${join(sandboxDir, 'tmp')} 2>/dev/null || echo "drwxrwxrwt 2 sandbox sandbox 4096 /tmp"`;
  }

  // who → simular
  if (processed === 'who') {
    processed = `echo "sandbox  pts/0        $(date '+%Y-%m-%d %H:%M') (:0)"`;
  }

  // w → simular
  if (processed === 'w') {
    processed = `echo " $(date '+%H:%M:%S') up 1 day,  3:42,  1 user,  load average: 0.00, 0.01, 0.05"
echo "USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT"
echo "sandbox  pts/0    :0               $(date '+%H:%M')    0.00s  0.05s  0.01s w"`;
  }

  // last → simular
  if (processed === 'last') {
    processed = `echo "sandbox  pts/0        :0               $(date '+%a %b %d %H:%M')   still logged in"
echo ""
echo "wtmp begins $(date '+%a %b %d %H:%M:%S %Y')"`;
  }

  // lastlog → simular
  if (processed === 'lastlog') {
    processed = `echo "Username         Port     From             Latest"
echo "root             pts/0    :0               $(date -d '1 day ago' '+%a %b %d %H:%M:%S %z %Y' 2>/dev/null || date '+%a %b %d %H:%M:%S')"
echo "sandbox          pts/0    :0               $(date '+%a %b %d %H:%M:%S %z %Y' 2>/dev/null || date '+%a %b %d %H:%M:%S')"
echo "student          pts/0    192.168.1.100    $(date -d '2 hours ago' '+%a %b %d %H:%M:%S %z %Y' 2>/dev/null || date '+%a %b %d %H:%M:%S')"`;
  }

  // locate → simular (no hay updatedb real)
  if (/^locate\s+/.test(processed)) {
    const term = processed.replace('locate', '').trim().replace(/[^a-zA-Z0-9_.*\-\/ ]/g, '');
    processed = `find ${sandboxDir} -name "*${term}*" 2>/dev/null | head -20; echo ""; echo "[NOTA: 'locate' usa una base de datos pre-construida. En este sandbox se usa 'find' como alternativa]"`;
  }
  if (processed === 'locate') {
    return { command: `echo "(Usa 'locate <patrón>' para buscar archivos)"`, handled: true };
  }

  // updatedb → simular
  if (processed === 'updatedb') {
    return { command: `echo "updatedb: Base de datos actualizada (simulado en sandbox)"`, handled: true };
  }

  // lscpu → simular si no existe
  if (processed === 'lscpu' && !existsSync('/usr/bin/lscpu')) {
    processed = `cat /proc/cpuinfo 2>/dev/null | head -20 || echo "Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
CPU(s):              $(nproc 2>/dev/null || echo 4)
Model name:          LinuxQuest Sandbox CPU"`;
  }

  // lsblk → simular si no existe
  if (processed === 'lsblk' && !existsSync('/bin/lsblk')) {
    processed = `echo "NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT"
echo "sda      8:0    0    20G  0 disk"
echo "├─sda1   8:1    0    18G  0 part /"
echo "└─sda2   8:2    0     2G  0 part [SWAP]"
echo "sr0     11:0    1  1024M  0 rom"`;
  }

  // lsusb → usar mock si existe
  if (processed === 'lsusb' && existsSync('/usr/local/bin/lsusb')) {
    // El mock ya está en PATH
  }

  // groups sin argumento → mostrar grupos del usuario
  if (processed === 'groups') {
    processed = `echo "sandbox student wheel"`;
  }

  // id → simular con datos del sandbox
  if (processed === 'id') {
    processed = `echo "uid=1001(sandbox) gid=1001(sandbox) groups=1001(sandbox),10(wheel),1000(student)"`;
  }

  // id <usuario> → simular
  if (/^id\s+/.test(processed)) {
    const user = processed.replace('id', '').trim().replace(/[^a-zA-Z0-9_\-]/g, '');
    processed = `echo "uid=1000(${user}) gid=1000(${user}) groups=1000(${user})"`;
  }

  // hostnamectl → simular
  if (processed === 'hostnamectl') {
    processed = `echo "   Static hostname: linuxquest-sandbox"
echo "         Icon name: computer-container"
echo "           Chassis: container"
echo "        Machine ID: $(cat /etc/hostname 2>/dev/null || echo 'linuxquest')"
echo "           Boot ID: $(date +%s)"
echo "  Operating System: Alpine Linux v3.19"
echo "            Kernel: Linux $(uname -r 2>/dev/null || echo '6.1.0')"
echo "      Architecture: x86_64"`;
  }

  // gpg --version → simular
  if (/^gpg\s+--version/.test(processed)) {
    processed = `echo "gpg (GnuPG) 2.2.40"
echo "libgcrypt 1.10.1"
echo "Copyright (C) 2022 g10 Code GmbH"
echo "License GNU GPL-3.0-or-later <https://gnu.org/licenses/gpl.html>"
echo ""
echo "Home: /home/sandbox/.gnupg"
echo "Supported algorithms:"
echo "Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA"
echo "Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256"
echo "Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224"
echo "Compression: Uncompressed, ZIP, ZLIB, BZIP2"`;
  }

  // clear → enviar código de limpiar pantalla
  if (processed === 'clear') {
    return { command: 'clear', handled: true, isClear: true };
  }

  // history → no tiene sentido en sandbox
  if (processed === 'history') {
    return { command: `echo "  1  pwd"
echo "  2  ls -la"
echo "  3  cat README.txt"
echo "  4  help"
echo "(Historial simulado en sandbox)"`, handled: true };
  }

  // env/printenv → mostrar variables del sandbox
  if (processed === 'env' || processed === 'printenv') {
    processed = `echo "PATH=/usr/local/bin:/usr/bin:/bin"
echo "HOME=${sandboxDir}"
echo "USER=sandbox"
echo "SHELL=/bin/bash"
echo "TERM=xterm-256color"
echo "LANG=C.UTF-8"
echo "PWD=${sandboxDir}"
echo "HOSTNAME=linuxquest-sandbox"`;
  }

  return { command: processed, handled: false };
};

const sanitizeOutput = (output, maxLines = 500) => {
  if (!output) return '';
  return output
    .split('\n')
    .slice(0, maxLines)
    .join('\n');
};

/**
 * Ejecuta un comando en el sandbox del usuario con múltiples capas de seguridad
 */
export const executeCommand = async (command, userSandboxDir, questId = null, userId = null) => {
  const startTime = Date.now();

  try {
    const trimmedCmd = command.trim();

    if (!trimmedCmd) {
      return { error: 'Comando vacío', output: '' };
    }

    // CAPA 0: Limitar longitud
    if (trimmedCmd.length > SECURITY_CONFIG.COMMAND_LIMITS.MAX_COMMAND_LENGTH) {
      return { error: 'Comando excede longitud máxima permitida', output: '' };
    }

    // Bloquear caracteres de control / null bytes
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(trimmedCmd)) {
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'CONTROL_CHARS_DETECTED', {
          command: trimmedCmd.replace(/[\x00-\x1F]/g, '?')
        });
      }
      return { error: 'Comando contiene caracteres no permitidos', output: '' };
    }

    // ========== COMANDOS ESPECIALES (antes de toda validación) ==========
    if (trimmedCmd === 'clear') {
      return { output: '\x1b[2J\x1b[H', error: '', isClear: true };
    }

    // ========== PRE-PROCESAMIENTO DE COMANDOS ==========
    // Convierte comandos interactivos a no-interactivos y reescribe rutas
    const preprocessed = preprocessCommand(trimmedCmd, userSandboxDir);
    const processedCmd = preprocessed.command;

    // Si el preprocessor devolvió un handled (comando ya resuelto)
    if (preprocessed.handled) {
      // Help especial
      if (trimmedCmd === 'help') {
        // Se procesa después de la validación de quest
      } else {
        // Ejecutar directamente el comando preprocesado
        try {
          const cleanEnv = {
            PATH: '/usr/local/bin:/usr/bin:/bin:/sbin:/usr/sbin',
            HOME: userSandboxDir,
            USER: 'sandbox',
            SHELL: '/bin/bash',
            TERM: 'xterm-256color',
            LANG: 'C.UTF-8',
            LC_ALL: 'C.UTF-8',
            PWD: userSandboxDir,
            HOSTNAME: 'linuxquest-sandbox',
            MANPAGER: 'cat',
            PAGER: 'cat',
          };
          const result = await execAsync(processedCmd, {
            cwd: userSandboxDir,
            timeout: 10000,
            maxBuffer: SECURITY_CONFIG.COMMAND_LIMITS.MAX_OUTPUT_SIZE,
            shell: '/bin/bash',
            env: cleanEnv,
            killSignal: 'SIGKILL',
            windowsHide: true
          });
          const output = result.stdout || '';
          const sanitized = sanitizeOutput(output, SECURITY_CONFIG.COMMAND_LIMITS.MAX_OUTPUT_LINES);
          if (userId) {
            auditLogger.logCommandAttempt(userId, questId, trimmedCmd, {
              error: null,
              output: sanitized.substring(0, 200)
            });
          }
          return { output: sanitized || '', error: result.stderr || '' };
        } catch (e) {
          return { error: e.stderr || e.message || 'Error ejecutando comando', output: '' };
        }
      }
    }

    // Extraer comandos del pipe (del comando preprocesado)
    const pipeSegments = processedCmd.split(/\s*\|\s*/);
    const allCmdNames = pipeSegments.map(seg => seg.trim().split(/\s+/)[0]).filter(Boolean);
    const cmdName = allCmdNames[0];

    // ========== CAPA 1: Auditoría Inicial ==========
    if (userId) {
      auditLogger.logCommandAttempt(userId, questId, trimmedCmd, { status: 'ATTEMPT' });
    }

    // ========== CAPA 2A: Blacklist Global Hardcoded ==========
    for (const cmd of allCmdNames) {
      if (!isGloballyAllowedCommand(cmd)) {
        const error = `Comando bloqueado por seguridad: ${cmd}`;
        if (userId) {
          auditLogger.logSecurityViolation(userId, questId, 'HARDCODED_FORBIDDEN_COMMAND', {
            command: cmd,
            reason: 'Command in FORBIDDEN_COMMANDS blacklist'
          });
        }
        return { error, output: '' };
      }
    }

    // ========== CAPA 2B: Allowlist Global ==========
    for (const cmd of allCmdNames) {
      if (!GLOBAL_ALLOWED_COMMANDS[cmd]) {
        const error = `Comando no permitido: ${cmd}. Usa 'help' para ver disponibles.`;
        if (userId) {
          auditLogger.logSecurityViolation(userId, questId, 'FORBIDDEN_COMMAND', {
            command: cmd,
            reason: 'Command not in global allowlist'
          });
        }
        return { error, output: '' };
      }
    }

    // ========== CAPA 2C: Validar argumentos peligrosos ==========
    const argsValidation = validateCommandArgs(processedCmd);
    if (!argsValidation.safe) {
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'DANGEROUS_ARGUMENTS', {
          command: processedCmd,
          reason: argsValidation.reason
        });
      }
      return { error: argsValidation.reason, output: '' };
    }

    // ========== CAPA 3: Validación Global de Patrones Peligrosos ==========
    for (const pattern of SECURITY_CONFIG.GLOBAL_DANGEROUS_PATTERNS) {
      if (pattern.test(processedCmd)) {
        const error = 'Comando bloqueado: contiene operaciones peligrosas.';
        if (userId) {
          auditLogger.logSecurityViolation(userId, questId, 'DANGEROUS_PATTERN_DETECTED', {
            command: processedCmd,
            pattern: pattern.toString()
          });
        }
        return { error, output: '' };
      }
    }

    // ========== CAPA 4: Sandbox Validator ==========
    const validator = new SandboxValidator(userSandboxDir);
    const fullValidation = validator.fullValidate(processedCmd, {});

    if (!fullValidation.valid) {
      const error = fullValidation.errors[0] || 'Comando validación fallida';
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'VALIDATION_FAILED', {
          command: processedCmd,
          errors: fullValidation.errors
        });
      }
      return { error, output: '' };
    }

    if (fullValidation.warnings.length > 0) {
      console.warn(`[WARN] ${fullValidation.warnings.join(', ')}`);
    }

    // ========== CAPA 5: Configuración por Misión ==========
    let questConfig = null;
    let allowedCommands = getAllowedCommandsForMission(questId);
    let timeoutMs = getTimeoutForMission(questId) || SECURITY_CONFIG.COMMAND_LIMITS.MAX_EXECUTION_TIME;

    if (questId) {
      questConfig = getQuestCommandConfig(questId);
      if (questConfig) {
        allowedCommands = questConfig.allowedCommands || allowedCommands;
        timeoutMs = questConfig.timeout || timeoutMs;

        // Validar que TODOS los comandos del pipe estén permitidos
        // Usar los comandos del comando preprocesado
        for (const cmd of allCmdNames) {
          if (!allowedCommands.includes(cmd)) {
            const error = `Para esta misión solo puedes usar: ${allowedCommands.join(', ')}`;
            if (userId) {
              auditLogger.logSecurityViolation(userId, questId, 'COMMAND_NOT_ALLOWED_FOR_QUEST', {
                command: cmd,
                allowedCommands
              });
            }
            return { error, output: '' };
          }
        }

        // Validar contra patrones específicos de la misión
        if (questConfig.dangerousPatterns && questConfig.dangerousPatterns.length > 0) {
          for (const pattern of questConfig.dangerousPatterns) {
            if (pattern.test(processedCmd)) {
              const error = questConfig.warningMessage || 'Comando bloqueado para esta misión.';
              if (userId) {
                auditLogger.logSecurityViolation(userId, questId, 'DANGEROUS_PATTERN_IN_QUEST', {
                  command: processedCmd,
                  pattern: pattern.toString()
                });
              }
              return { error, output: '' };
            }
          }
        }
      }
    }

    // ========== COMANDO ESPECIAL: HELP (después de saber allowedCommands) ==========
    if (cmdName === 'help') {
      const helpText = allowedCommands
        .map(cmd => `  ${cmd.padEnd(12)} - ${GLOBAL_ALLOWED_COMMANDS[cmd] || 'Sin descripción'}`)
        .join('\n');
      const output = `Comandos disponibles para esta misión:\n${helpText}\n\nEscribe "help all" para ver TODOS los comandos disponibles.`;
      if (userId) {
        auditLogger.logCommandAttempt(userId, questId, trimmedCmd, {
          error: null,
          output: output.substring(0, 100)
        });
      }
      return { output, error: '' };
    }

    if (trimmedCmd === 'help all') {
      const allCmds = Object.entries(GLOBAL_ALLOWED_COMMANDS)
        .map(([cmd, desc]) => `  ${cmd.padEnd(12)} - ${desc}`)
        .join('\n');
      return { output: `Todos los comandos disponibles:\n${allCmds}`, error: '' };
    }

    // ========== CAPA 6: EJECUCIÓN EN SANDBOX ==========
    let stdout = '';
    let stderr = '';
    let executionTime = 0;

    try {
      const execStartTime = Date.now();
      const cleanEnv = {
        PATH: '/usr/local/bin:/usr/bin:/bin:/sbin:/usr/sbin',
        HOME: userSandboxDir,
        USER: 'sandbox',
        SHELL: '/bin/bash',
        TERM: 'xterm-256color',
        LANG: 'C.UTF-8',
        LC_ALL: 'C.UTF-8',
        PWD: userSandboxDir,
        HOSTNAME: 'linuxquest-sandbox',
        LOGNAME: 'sandbox',
        MAIL: '/var/mail/sandbox',
        MANPAGER: 'cat',
        PAGER: 'cat',
        EDITOR: 'nano',
        VISUAL: 'nano',
      };

      const result = await execAsync(processedCmd, {
        cwd: userSandboxDir,
        timeout: timeoutMs,
        maxBuffer: SECURITY_CONFIG.COMMAND_LIMITS.MAX_OUTPUT_SIZE,
        shell: '/bin/bash',
        env: cleanEnv,
        killSignal: 'SIGKILL',
        windowsHide: true
      });
      executionTime = Date.now() - execStartTime;
      stdout = result.stdout || '';
      stderr = result.stderr || '';
    } catch (execError) {
      executionTime = Date.now() - startTime;

      if (execError.code === 'ERR_CHILD_PROCESS_TIMEOUT') {
        const error = `Comando excedió tiempo límite: ${timeoutMs}ms`;
        if (userId) {
          auditLogger.logSecurityViolation(userId, questId, 'TIMEOUT_EXCEEDED', {
            command: processedCmd,
            timeout: timeoutMs,
            actual: executionTime
          });
        }
        return { error, output: '' };
      }

      if (execError.code === 'ENOENT') {
        return { error: 'Comando no encontrado', output: '' };
      }

      // grep exit code 1 = no matches (no es un error real)
      if (allCmdNames.includes('grep') && execError.code === 1) {
        stdout = execError.stdout || '';
        stderr = '';
      } else if (execError.stdout) {
        stdout = execError.stdout;
        stderr = execError.stderr || '';
      } else {
        stderr = execError.stderr || execError.message || 'Error ejecutando comando';
      }
    }

    // ========== CAPA 7: Validar Límites de Output ==========
    const outputLines = stdout.split('\n').length;
    const outputSize = Buffer.byteLength(stdout, 'utf8');

    const resourceCheck = validator.validateResourceLimits(
      executionTime,
      outputSize,
      outputLines
    );

    if (!resourceCheck.valid) {
      const error = resourceCheck.errors[0] || 'Output excedió límites';
      if (userId) {
        auditLogger.logSecurityViolation(userId, questId, 'RESOURCE_LIMIT_EXCEEDED', {
          command: processedCmd,
          errors: resourceCheck.errors
        });
      }
      return { error, output: '' };
    }

    // ========== CAPA 8: Sanitizar Output ==========
    const sanitized = sanitizeOutput(stdout || '', SECURITY_CONFIG.COMMAND_LIMITS.MAX_OUTPUT_LINES);

    // ========== AUDITORÍA FINAL ==========
    if (userId) {
      auditLogger.logCommandAttempt(userId, questId, trimmedCmd, {
        error: stderr || null,
        output: sanitized.substring(0, 200),
        executionTime,
        outputSize,
        outputLines
      });
    }

    // ========== RESPUESTA ==========
    if (stderr && !stdout) {
      return { error: stderr, output: '' };
    }

    if (stderr && stdout) {
      return { output: sanitized, error: stderr };
    }

    return { output: sanitized || '', error: '' };

  } catch (error) {
    const executionTime = Date.now() - startTime;

    if (userId) {
      auditLogger.logSecurityViolation(userId, questId, 'EXECUTION_ERROR', {
        command,
        error: error.message,
        executionTime
      });
    }

    console.error('Command execution error:', error);
    return { error: error.message || 'Error ejecutando comando', output: '' };
  }
};
