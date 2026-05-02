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

    // ============================================
    // CONTENIDO EDUCATIVO — El Reino del Kernel
    // ============================================

    const reinoDir = join(sandboxDir, 'reino');
    if (!existsSync(reinoDir)) mkdirSync(reinoDir, { recursive: true });

    // --- Historia de Linux ---
    const historiaDir = join(reinoDir, 'historia');
    if (!existsSync(historiaDir)) mkdirSync(historiaDir, { recursive: true });
    writeFileSync(join(historiaDir, 'origen.txt'),
      '=== EL ORIGEN DEL REINO ===\n\n' +
      'En 1991, un joven estudiante finlandes llamado Linus Torvalds\n' +
      'anuncio en comp.os.minix que estaba creando un sistema\n' +
      'operativo "solo por diversion". Ese proyecto se convirtio\n' +
      'en el kernel Linux.\n\n' +
      'Linux NO contiene codigo de Unix. Es un proyecto independiente\n' +
      'mantenido por una comunidad internacional de programadores.\n' +
      'Disponible gratuitamente sin restricciones.\n\n' +
      'Richard Stallman y la FSF (Free Software Foundation) crearon\n' +
      'el movimiento del software libre y las herramientas GNU que\n' +
      'complementan el kernel Linux.\n'
    );
    writeFileSync(join(historiaDir, 'linus.txt'),
      '=== LINUS TORVALDS ===\n\n' +
      'Nombre: Linus Benedict Torvalds\n' +
      'Nacimiento: 28 de diciembre de 1969, Helsinki, Finlandia\n' +
      'Logro: Creo el kernel Linux en 1991\n' +
      'Licencia: GPL v2 (GNU General Public License)\n\n' +
      'Tambien creo Git en 2005 para gestionar el desarrollo\n' +
      'del kernel Linux.\n'
    );
    writeFileSync(join(historiaDir, 'stallman.txt'),
      '=== RICHARD STALLMAN ===\n\n' +
      'Nombre: Richard Matthew Stallman (RMS)\n' +
      'Fundador: Free Software Foundation (FSF) en 1985\n' +
      'Proyecto: GNU (GNU is Not Unix)\n\n' +
      'Creo las 4 libertades del software libre:\n' +
      '  0. Usar el programa para cualquier proposito\n' +
      '  1. Estudiar como funciona y modificarlo\n' +
      '  2. Distribuir copias\n' +
      '  3. Distribuir versiones modificadas\n\n' +
      'Mnemonic: UEDM - Usar, Estudiar, Distribuir, Modificar\n'
    );
    writeFileSync(join(historiaDir, 'gnu.txt'),
      '=== EL PROYECTO GNU ===\n\n' +
      'GNU (GNU is Not Unix) fue lanzado por Richard Stallman en 1983.\n' +
      'El objetivo: crear un sistema operativo completo y libre.\n\n' +
      'Herramientas GNU creadas:\n' +
      '  - GCC (GNU Compiler Collection)\n' +
      '  - GDB (GNU Debugger)\n' +
      '  - Bash (Bourne Again Shell)\n' +
      '  - Coreutils (ls, cp, mv, rm, cat, echo...)\n' +
      '  - Grep, Sed, Awk, Make\n\n' +
      'En 1991, el kernel Linux de Linus Torvalds completo el sistema.\n' +
      'La combinacion GNU + Linux = GNU/Linux (aunque muchos dicen solo "Linux").\n'
    );
    writeFileSync(join(historiaDir, 'git.txt'),
      '=== GIT — El Control de Versiones ===\n\n' +
      'Creado por Linus Torvalds en 2005.\n' +
      'Motivo: Necesitaba gestionar el desarrollo del kernel Linux.\n\n' +
      'Git es un sistema de control de versiones distribuido:\n' +
      '  - Cada desarrollador tiene una copia completa del historial\n' +
      '  - Permite trabajar sin conexion a internet\n' +
      '  - Ramas (branches) para experimentar sin romper el codigo\n' +
      '  - Merge para combinar cambios de diferentes desarrolladores\n\n' +
      'GitHub (2008) popularizo Git con una plataforma web social.\n' +
      'Hoy Git es el estandar de la industria.\n'
    );
    writeFileSync(join(historiaDir, 'futuro.txt'),
      '=== EL FUTURO DEL REINO ===\n\n' +
      'Linux domina en:\n' +
      '  - Servidores web (90%+ de internet)\n' +
      '  - Supercomputacion (100% del Top 500)\n' +
      '  - Cloud computing (AWS, Azure, GCP)\n' +
      '  - Sistemas embebidos (routers, IoT, smart TVs)\n' +
      '  - Movil (Android = kernel Linux modificado)\n' +
      '  - Contenedores (Docker, Kubernetes)\n' +
      '  - Inteligencia Artificial (la mayoria de frameworks)\n\n' +
      'El kernel Linux tiene mas de 28 millones de lineas de codigo\n' +
      'y mas de 20,000 contribuidores.\n\n' +
      'La filosofia del software libre sigue viva:\n' +
      '  "Dame las libertades o dame la muerte."\n'
    );

    // --- Familias de distribuciones ---
    const distrosDir = join(reinoDir, 'distros');
    if (!existsSync(distrosDir)) mkdirSync(distrosDir, { recursive: true });
    writeFileSync(join(distrosDir, 'familias.txt'),
      '=== LAS GRANDES FAMILIAS DEL REINO ===\n\n' +
      '1. DEBIAN (gestor: apt/dpkg, formato: .deb)\n' +
      '   Fundada: 1993 por Ian Murdock\n' +
      '   Derivadas: Ubuntu, Linux Mint, Kali, Pop!_OS\n' +
      '   Filosofia: Estabilidad, software libre\n\n' +
      '2. RED HAT (gestor: yum/dnf/rpm, formato: .rpm)\n' +
      '   RHEL: Comercial (IBM en 2019)\n' +
      '   Derivadas: Fedora, CentOS, Rocky Linux, AlmaLinux\n' +
      '   Filosofia: Empresarial, soporte comercial\n\n' +
      '3. ARCH (gestor: pacman)\n' +
      '   Derivadas: Manjaro, EndeavourOS\n' +
      '   Filosofia: Rolling release, KISS, control total\n\n' +
      '4. SUSE (gestor: zypper/rpm)\n' +
      '   Fundada: 1992 en Alemania\n' +
      '   Derivadas: openSUSE Leap, openSUSE Tumbleweed\n' +
      '   Herramienta: YaST (configuracion)\n'
    );
    writeFileSync(join(distrosDir, 'README.txt'),
      'Directorio: /reino/distros/\n' +
      'Explora los archivos de cada familia de distribuciones.\n' +
      'Usa: cat /reino/distros/debian.txt\n' +
      '     cat /reino/distros/redhat.txt\n' +
      '     cat /reino/distros/arch.txt\n' +
      '     cat /reino/distros/suse.txt\n'
    );
    writeFileSync(join(distrosDir, 'debian.txt'),
      '=== FAMILIA DEBIAN ===\n\n' +
      'Gestor de paquetes: apt (alto nivel), dpkg (bajo nivel)\n' +
      'Formato: .deb\n' +
      'Fundador: Ian Murdock (1993)\n\n' +
      'Distribuciones derivadas:\n' +
      '  - Ubuntu (2004, Mark Shuttleworth, Canonical)\n' +
      '    LTS cada 2 años, lanzamientos cada 6 meses\n' +
      '  - Linux Mint (basada en Ubuntu, familiar para Windows)\n' +
      '  - Kali Linux (seguridad, penetration testing)\n' +
      '  - Pop!_OS (System76, para desarrolladores)\n' +
      '  - Debian Stable (solo software libre, muy estable)\n\n' +
      'Comandos basicos apt:\n' +
      '  sudo apt update          # Actualizar lista\n' +
      '  sudo apt install pkg     # Instalar\n' +
      '  sudo apt remove pkg      # Desinstalar\n' +
      '  sudo apt upgrade         # Actualizar todo\n'
    );
    writeFileSync(join(distrosDir, 'redhat.txt'),
      '=== FAMILIA RED HAT ===\n\n' +
      'Gestor de paquetes: yum (clasico), dnf (moderno), rpm\n' +
      'Formato: .rpm\n' +
      'Adquirida por IBM en 2019\n\n' +
      'Distribuciones derivadas:\n' +
      '  - RHEL (Red Hat Enterprise Linux) - Comercial\n' +
      '  - CentOS (compilada de RHEL, sin soporte comercial)\n' +
      '  - Fedora (banco de pruebas para RHEL)\n' +
      '  - Rocky Linux (sucesor de CentOS)\n' +
      '  - AlmaLinux (alternativa a CentOS)\n\n' +
      'Comandos basicos yum/dnf:\n' +
      '  sudo dnf install pkg     # Instalar\n' +
      '  sudo dnf remove pkg      # Desinstalar\n' +
      '  sudo dnf update          # Actualizar\n' +
      '  sudo dnf search palabra  # Buscar\n'
    );
    writeFileSync(join(distrosDir, 'arch.txt'),
      '=== FAMILIA ARCH ===\n\n' +
      'Gestor de paquetes: pacman\n' +
      'Filosofia: KISS (Keep It Simple, Stupid)\n' +
      'Modelo: Rolling release (actualizaciones continuas)\n\n' +
      'Distribuciones derivadas:\n' +
      '  - Manjaro (user-friendly, basada en Arch)\n' +
      '  - EndeavourOS (sucesor de Antergos)\n' +
      '  - Arch Linux (para usuarios avanzados)\n\n' +
      'Comandos basicos pacman:\n' +
      '  sudo pacman -S pkg       # Instalar\n' +
      '  sudo pacman -R pkg       # Desinstalar\n' +
      '  sudo pacman -Syu         # Actualizar sistema\n' +
      '  pacman -Ss palabra       # Buscar\n'
    );
    writeFileSync(join(distrosDir, 'suse.txt'),
      '=== FAMILIA SUSE ===\n\n' +
      'Gestor de paquetes: zypper, rpm\n' +
      'Fundada: 1992 en Alemania\n' +
      'Herramienta caracteristica: YaST (configuracion)\n\n' +
      'Distribuciones:\n' +
      '  - SUSE Linux Enterprise Server (SLES) - Comercial\n' +
      '  - openSUSE Leap (estable, basada en SLES)\n' +
      '  - openSUSE Tumbleweed (rolling release)\n\n' +
      'Comandos basicos zypper:\n' +
      '  sudo zypper install pkg  # Instalar\n' +
      '  sudo zypper remove pkg   # Desinstalar\n' +
      '  sudo zypper update       # Actualizar\n'
    );

    // --- Sistemas embebidos y cloud ---
    writeFileSync(join(distrosDir, 'embebidos.txt'),
      '=== SISTEMAS EMBEBIDOS ===\n\n' +
      'Android:\n' +
      '  - Desarrollado por Google (adquirido en 2005)\n' +
      '  - Usa kernel Linux MODIFICADO (no es Linux puro)\n' +
      '  - Componentes propietarios: Play Store, Chrome, Maps\n' +
      '  - Examen tip: Android NO es una distro Linux estandar\n\n' +
      'Raspberry Pi:\n' +
      '  - Computadora del tamano de tarjeta de credito\n' +
      '  - Procesador ARM\n' +
      '  - Raspbian: distro basada en Debian optimizada\n' +
      '  - Usos: educacion, hobby, IoT, robotica\n\n' +
      'Cloud Computing:\n' +
      '  - 90% de la carga de trabajo publica corre Linux\n' +
      '  - Proveedores: AWS, Azure, GCP\n' +
      '  - Linux se ofrece como IaaS\n' +
      '  - Ventajas: escalabilidad, pago por uso, alta disponibilidad\n'
    );

    // --- Licencias ---
    const licenciasDir = join(reinoDir, 'licencias');
    if (!existsSync(licenciasDir)) mkdirSync(licenciasDir, { recursive: true });
    writeFileSync(join(licenciasDir, 'README.txt'),
      'Directorio: /reino/licencias/\n' +
      'Explora los pergaminos de licencias del reino.\n' +
      'Usa: cat /reino/licencias/gpl.txt\n' +
      '     cat /reino/licencias/mit.txt\n' +
      '     cat /reino/licencias/bsd.txt\n' +
      '     cat /reino/licencias/apache.txt\n'
    );
    writeFileSync(join(licenciasDir, 'gpl.txt'),
      '=== GPL - GNU General Public License ===\n\n' +
      'Tipo: Copyleft (el software derivado DEBE permanecer libre)\n' +
      'Creador: Richard Stallman / FSF\n' +
      'Usada por: kernel Linux, GCC, GIMP\n\n' +
      'Versiones:\n' +
      '  GPL v2: Usada por el kernel Linux\n' +
      '  GPL v3: Version moderna, cierra agujeros sobre patentes y DRM\n' +
      '  AGPL: Para servicios web (cierra el loophole de ASP)\n' +
      '  LGPL: Para librerias (permite enlazar desde propietario)\n\n' +
      'Idea clave: Cualquiera puede modificar pero las modificaciones\n' +
      'deben distribuirse bajo GPL.\n'
    );
    writeFileSync(join(licenciasDir, 'mit.txt'),
      '=== MIT License ===\n\n' +
      'Tipo: Permisiva\n' +
      'Restricciones minimas: Solo conserva aviso de copyright\n' +
      'Permite: Uso comercial, modificacion, distribucion, privado\n' +
      'Usada por: jQuery, Node.js, React, Angular\n\n' +
      'Diferencia con GPL:\n' +
      '  - GPL: Las modificaciones DEBEN ser libres (copyleft)\n' +
      '  - MIT: Las modificaciones pueden ser propietarias\n'
    );
    writeFileSync(join(licenciasDir, 'bsd.txt'),
      '=== BSD License ===\n\n' +
      'Tipo: Permisiva (similar a MIT)\n' +
      'Variantes:\n' +
      '  - 2-clausulas: Simplificada\n' +
      '  - 3-clausulas: Prohibe uso del nombre del autor\n' +
      '  - 4-clausulas: Incluye clausula de publicidad\n\n' +
      'Usada por: FreeBSD, OpenBSD, NetBSD\n'
    );
    writeFileSync(join(licenciasDir, 'apache.txt'),
      '=== Apache License 2.0 ===\n\n' +
      'Tipo: Permisiva con clausula de patentes\n' +
      'Creador: Apache Software Foundation\n' +
      'Usada por: Android, Kubernetes, TensorFlow\n\n' +
      'Incluye: Clausula explicita de patentes (protege contra\n' +
      'demandas de patentes de los contribuidores)\n'
    );

    // --- Software libre ---
    const softwareDir = join(reinoDir, 'software');
    if (!existsSync(softwareDir)) mkdirSync(softwareDir, { recursive: true });
    writeFileSync(join(softwareDir, 'README.txt'),
      'Directorio: /reino/software/\n' +
      'Descubre las herramientas libres del reino.\n' +
      'Usa: cat /reino/software/escritorio.txt\n' +
      '     cat /reino/software/servidores.txt\n' +
      '     cat /reino/software/lenguajes.txt\n'
    );
    writeFileSync(join(softwareDir, 'escritorio.txt'),
      '=== SOFTWARE DE ESCRITORIO LIBRE ===\n\n' +
      'Suite ofimatica:\n' +
      '  LibreOffice Writer    = Microsoft Word\n' +
      '  LibreOffice Calc      = Microsoft Excel\n' +
      '  LibreOffice Impress   = Microsoft PowerPoint\n\n' +
      'Multimedia:\n' +
      '  GIMP                  = Adobe Photoshop\n' +
      '  Inkscape              = Adobe Illustrator\n' +
      '  Blender               = 3DS Max, Maya\n' +
      '  Audacity              = Adobe Audition\n' +
      '  VLC                   = Windows Media Player\n\n' +
      'Navegadores:\n' +
      '  Firefox               = Chrome (sin tracking)\n' +
      '  Chromium              = Chrome (base open source)\n'
    );
    writeFileSync(join(softwareDir, 'servidores.txt'),
      '=== SOFTWARE DE SERVIDOR LIBRE ===\n\n' +
      'Servidores web:\n' +
      '  Apache                = Servidor web veterano\n' +
      '  Nginx                 = Servidor web moderno\n\n' +
      'Bases de datos:\n' +
      '  MySQL                 = Base de datos relacional\n' +
      '  PostgreSQL            = Base de datos avanzada\n\n' +
      'Correo:\n' +
      '  Postfix               = Servidor de correo\n' +
      '  Sendmail              = Servidor de correo clasico\n\n' +
      'Otros:\n' +
      '  Samba                 = Compartir archivos con Windows\n' +
      '  OpenSSH               = Acceso remoto seguro\n' +
      '  CUPS                  = Sistema de impresion\n'
    );
    writeFileSync(join(softwareDir, 'lenguajes.txt'),
      '=== LENGUAJES DE PROGRAMACION LIBRES ===\n\n' +
      'C/C++: Bajo nivel, sistemas (Linux mismo esta en C)\n' +
      'Python: Versatil, muy popular, facil de aprender\n' +
      'Perl: El padre de los scripts del sistema\n' +
      'PHP: Web dinamica\n' +
      'Java: Multiplataforma, empresarial\n' +
      'Bash: Shell scripting\n' +
      'Ruby, Go, Rust: Modernos\n\n' +
      'Shell (Bash) es el lenguaje que usaremos en este curso\n' +
      'para escribir scripts y automatizar tareas.\n'
    );

    // --- Interfaces graficas ---
    writeFileSync(join(softwareDir, 'escritorios.txt'),
      '=== ENTORNOS DE ESCRITORIO ===\n\n' +
      'GNOME: Predeterminado en Ubuntu, Fedora. Moderno, simple.\n' +
      'KDE Plasma: Configurable, potente, muchas opciones.\n' +
      'XFCE: Ligero, rapido, ideal para hardware antiguo.\n' +
      'Cinnamon: Linux Mint. Familiar para usuarios de Windows.\n' +
      'MATE: Continuacion de GNOME 2 clasico.\n' +
      'LXDE/LXQt: Ultra ligeros.\n'
    );

    // --- Seguridad y privacidad ---
    writeFileSync(join(softwareDir, 'seguridad.txt'),
      '=== SEGURIDAD Y PRIVACIDAD ===\n\n' +
      'Cifrado:\n' +
      '  Simetrico: Misma llave para cifrar y descifrar (AES, DES)\n' +
      '  Asimetrico: Llave publica + privada (RSA, ECC)\n' +
      '  Hash: Funcion unidireccional (SHA-256, MD5)\n\n' +
      'GPG/PGP: Criptografia asimetrica para:\n' +
      '  - Firmar archivos/emails\n' +
      '  - Cifrar comunicaciones\n' +
      '  - Verificar identidad\n\n' +
      'Privacidad en internet:\n' +
      '  HTTPS: HTTP cifrado (el candado del navegador)\n' +
      '  VPN: Tunel cifrado, oculta tu IP\n' +
      '  Tor: Red de anonimato, multiples nodos cifrados\n'
    );

    // --- Archivos de datos para misiones de procesamiento ---
    const datosDir = join(sandboxDir, 'misiones');
    if (!existsSync(datosDir)) mkdirSync(datosDir, { recursive: true });
    writeFileSync(join(datosDir, 'servidores.log'),
      '2026-05-01 08:00:01 INFO  web-server-1: Servicio iniciado\n' +
      '2026-05-01 08:00:05 INFO  db-server-1: PostgreSQL activo\n' +
      '2026-05-01 08:01:12 WARNING  web-server-1: CPU al 85%\n' +
      '2026-05-01 08:02:30 ERROR  db-server-1: Conexion perdida\n' +
      '2026-05-01 08:02:35 INFO  db-server-1: Reconectando...\n' +
      '2026-05-01 08:02:40 INFO  db-server-1: Conexion restaurada\n' +
      '2026-05-01 08:05:00 INFO  web-server-1: Request completado\n' +
      '2026-05-01 08:05:01 INFO  web-server-2: Servicio iniciado\n' +
      '2026-05-01 08:10:00 WARNING  web-server-2: Memoria al 90%\n' +
      '2026-05-01 08:15:00 ERROR  web-server-2: Timeout en request\n' +
      '2026-05-01 08:15:05 INFO  web-server-2: Reiniciando servicio\n' +
      '2026-05-01 08:15:10 INFO  web-server-2: Servicio restaurado\n'
    );
    writeFileSync(join(datosDir, 'usuarios.csv'),
      'nombre,edad,ciudad,departamento\n' +
      'Ana,25,Madrid,Desarrollo\n' +
      'Carlos,30,Barcelona,DevOps\n' +
      'Elena,28,Valencia,Seguridad\n' +
      'David,35,Sevilla,Redes\n' +
      'Beatriz,22,Madrid,Desarrollo\n' +
      'Fernando,40,Barcelona,DevOps\n' +
      'Gabriela,27,Valencia,Desarrollo\n' +
      'Hugo,33,Sevilla,Seguridad\n' +
      'Isabel,29,Madrid,Redes\n' +
      'Javier,31,Barcelona,Desarrollo\n'
    );
    writeFileSync(join(datosDir, 'config_ejemplo.conf'),
      '# Archivo de configuracion de ejemplo\n' +
      '# Lineas con # son comentarios\n' +
      'servidor=linuxquest-sandbox\n' +
      'puerto=8080\n' +
      'max_conexiones=100\n' +
      'timeout=30\n' +
      '# Base de datos\n' +
      'db_host=localhost\n' +
      'db_port=5432\n' +
      'db_name=linuxquest\n' +
      '# Logs\n' +
      'log_nivel=INFO\n' +
      'log_archivo=/var/log/app.log\n'
    );

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
