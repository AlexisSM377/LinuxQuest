import pool from '../src/db.js';

const quests = [
  // ==========================================
  // MUNDO 1: EL CASTILLO DEL CONOCIMIENTO (12 misiones)
  // Tema 1 LPI: Comunidad Linux y código abierto (peso 7)
  // ==========================================
  {
    id: 1,
    title: 'El Despertar del Iniciado',
    description: 'Aprende a conocer tu sistema Linux con el comando uname',
    world: 1, order: 1, difficulty: 1,
    npc: 'Linux el Sabio',
    story: '"El anciano sabio te recibe en las puertas del Castillo del Conocimiento. "Antes de emprender tu viaje, joven aprendiz, debes conocer el suelo que pisas. El hechizo uname revela la identidad completa de tu sistema."',
    instructions: [
      '📖 uname es una herramienta que muestra información sobre tu sistema Linux (kernel, versión, arquitectura)',
      '🔧 uname -a muestra TODA la información de una sola vez',
      '▶ Ejecuta exactamente: uname -a'
    ],
    hints: ['Recuerda incluir -a para ver toda la información', 'El output mostrará el nombre del kernel, hostname, versión, arquitectura'],
    requiredCommands: ['uname'],
    objectives: [
      {
        id: 1,
        description: 'Revela los secretos de tu sistema con uname -a',
        type: 'command_output',
        expectedCommand: 'uname -a',
        validationFn: 'output.includes("Linux")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },

  {
    id: 2,
    title: 'Identificando el Reino',
    description: 'Lee el archivo /etc/os-release para identificar tu distribución',
    world: 1, order: 2, difficulty: 1,
    npc: 'Linux el Sabio',
    story: '"Cada reino tiene su estandarte. Tu distribución es tu identidad en el mundo Linux. El archivo /etc/os-release es el "DNI" de tu sistema, con información sobre qué distribución usas, versión e identificadores."',
    instructions: [
      '📖 /etc/os-release contiene metadatos sobre tu distribución Linux (NAME, VERSION, ID, etc.)',
      '🔧 El comando cat lee archivos de texto y muestra su contenido: cat /ruta/archivo',
      '▶ Ejecuta exactamente: cat /etc/os-release'
    ],
    hints: [
      'Busca la línea que comienza con NAME= para ver el nombre de tu distribución',
      'Alpine Linux es la distribución usada en este sandbox educativo'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Lee el archivo de identidad de tu distribución',
        type: 'command_output',
        expectedCommand: 'cat /etc/os-release',
        validationFn: 'output.includes("NAME=")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },

  {
    id: 3,
    title: 'Las Familias del Reino',
    description: 'Explora las familias de distribuciones Linux en /reino/distros/',
    world: 1, order: 3, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Las distribuciones son familias ancestrales con raíces comunes. Debian, Red Hat, Arch y SUSE son los grandes clanes. En /reino/distros/ encontrarás pergaminos sobre cada familia."',
    instructions: [
      '📖 Existen "familias" de distribuciones Linux: Debian, Red Hat, Arch, SUSE. Cada una tiene su filosofía y herramientas',
      '🔧 ls lista archivos en un directorio: ls /ruta/directorio',
      '🔧 cat lee el contenido de archivos: cat /ruta/archivo',
      '▶ Paso 1: Ejecuta exactamente: ls /reino/distros/',
      '▶ Paso 2: Luego ejecuta: cat /reino/distros/debian.txt'
    ],
    hints: [
      'Primero usa ls para ver qué archivos hay en /reino/distros/',
      'Verás archivos como debian.txt, redhat.txt, arch.txt',
      'cat /reino/distros/debian.txt te mostrará información sobre Debian y sus derivadas (Ubuntu, Linux Mint)'
    ],
    requiredCommands: ['ls', 'cat'],
    objectives: [
      {
        id: 1,
        description: 'Lista los pergaminos de las familias del reino',
        type: 'command_output',
        expectedCommand: 'ls /reino/distros/',
        validationFn: 'output.includes("debian")'
      },
      {
        id: 2,
        description: 'Lee el pergamino de la familia Debian',
        type: 'command_output',
        expectedCommand: 'cat /reino/distros/debian.txt',
        validationFn: 'output.includes("Ubuntu") || output.includes("Debian")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 4,
    title: 'El Estandarte del León',
    description: 'Descubre qué gestor de paquetes usa tu distribución',
    world: 1, order: 4, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Cada familia tiene su herrero de paquetes: el gestor que instala software. Debian usa apt, Red Hat usa dnf, Arch usa pacman. Usa which para encontrar cuál tiene tu reino."',
    instructions: [
      '📖 Un gestor de paquetes es una herramienta para instalar, actualizar y desinstalar software. Cada familia Linux usa uno diferente',
      '🔧 which busca ejecutables en tu PATH (rutas del sistema): which nombre_programa',
      '🔧 apt = Debian/Ubuntu, dnf = Fedora/RHEL, pacman = Arch',
      '▶ Ejecuta exactamente: which apt'
    ],
    hints: [
      'En Alpine Linux el gestor es apk, pero el comando which apt aún funcionará',
      'Si which no encuentra apt, devuelve un código de error',
      'Intenta también: which dnf o which pacman'
    ],
    requiredCommands: ['which'],
    objectives: [
      {
        id: 1,
        description: 'Busca el gestor de paquetes de tu reino',
        type: 'command_output',
        expectedCommand: 'which apt',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },

  {
    id: 5,
    title: 'El Lenguaje del Sistema',
    description: 'Domina las opciones del comando uname para obtener datos específicos',
    world: 1, order: 5, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"uname es versátil. Con -s ves solo el nombre del SO. Con -m ves la arquitectura. Con -r ves la versión del kernel. Son diferentes perspectivas del mismo sistema."',
    instructions: [
      '📖 Las opciones de uname son como lentes especializados: cada una muestra una parte diferente de tu sistema',
      '🔧 uname -s = solo el nombre del SO (Linux)',
      '🔧 uname -m = arquitectura del procesador (x86_64, aarch64)',
      '🔧 uname -r = versión del kernel',
      '▶ Paso 1: Ejecuta exactamente: uname -s',
      '▶ Paso 2: Luego ejecuta: uname -m'
    ],
    hints: [
      'x86_64 significa procesador Intel/AMD de 64 bits',
      'aarch64 significa procesador ARM de 64 bits',
      'El nombre del SO casi siempre será "Linux" en sistemas Linux'
    ],
    requiredCommands: ['uname'],
    objectives: [
      {
        id: 1,
        description: 'Revela solo el nombre de tu sistema operativo',
        type: 'command_output',
        expectedCommand: 'uname -s',
        validationFn: 'output.includes("Linux")'
      },
      {
        id: 2,
        description: 'Revela la arquitectura de tu procesador',
        type: 'command_output',
        expectedCommand: 'uname -m',
        validationFn: 'output.length > 3'
      }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 6,
    title: 'Sistemas Embebidos y la Nube',
    description: 'Aprende cómo Linux se ejecuta en Android, Raspberry Pi y servidores cloud',
    world: 1, order: 6, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Linux no solo vive en computadoras de escritorio. Android usa un kernel modificado de Linux. Raspberry Pi lleva Linux a dispositivos diminutos. El 90% de la nube pública es Linux. El reino del kernel es infinito."',
    instructions: [
      '📖 Linux es ubicuo: Android (90% de celulares), Raspberry Pi (computadoras educativas), Smart TVs, routers, servidores cloud',
      '🔧 cat /reino/distros/embebidos.txt contiene información educativa sobre estos sistemas',
      '▶ Ejecuta exactamente: cat /reino/distros/embebidos.txt'
    ],
    hints: [
      'Android modifica el kernel Linux para que funcione en dispositivos móviles',
      'Raspberry Pi usa ARM, no x86_64 como las computadoras normales',
      'AWS, Google Cloud Platform, Azure: casi todos corren Linux'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Lee el pergamino de sistemas embebidos y cloud',
        type: 'command_output',
        expectedCommand: 'cat /reino/distros/embebidos.txt',
        validationFn: 'output.includes("Android") || output.includes("Raspberry")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 7,
    title: 'Las Herramientas Libres',
    description: 'Descubre alternativas de software libre para tareas comunes',
    world: 1, order: 7, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"En el reino del software libre, cada herramienta propietaria tiene un equivalente. Para cada tarea (ofimatica, diseño, audio, etc.) existen alternativas libres y poderosas. En /reino/software/ descubrirás las joyas del movimiento open source."',
    instructions: [
      '📖 Software libre = alternativas de calidad a programas privativos. GIMP vs Photoshop, LibreOffice vs Microsoft Office',
      '🔧 ls /reino/software/ lista las categorías disponibles',
      '🔧 cat /reino/software/escritorio.txt muestra herramientas de ofimatica libre',
      '▶ Paso 1: Ejecuta exactamente: ls /reino/software/',
      '▶ Paso 2: Luego ejecuta: cat /reino/software/escritorio.txt'
    ],
    hints: [
      'escritorio.txt contiene herramientas de ofimatica (LibreOffice = Word/Excel)',
      'Verás categorías como multimedia, desarrollo, servidores',
      'El software libre suele ser gratis Y tienes acceso al código fuente'
    ],
    requiredCommands: ['ls', 'cat'],
    objectives: [
      {
        id: 1,
        description: 'Lista las categorías de software libre disponible',
        type: 'command_output',
        expectedCommand: 'ls /reino/software/',
        validationFn: 'output.includes("escritorio") || output.includes(".txt")'
      },
      {
        id: 2,
        description: 'Lee las herramientas libres de escritorio y ofimatica',
        type: 'command_output',
        expectedCommand: 'cat /reino/software/escritorio.txt',
        validationFn: 'output.includes("LibreOffice") || output.includes("GIMP")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 8,
    title: 'Las Cuatro Libertades del Software',
    description: 'Entiende los principios fundamentales del movimiento de software libre',
    world: 1, order: 8, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Richard Stallman definió las Cuatro Libertades del software libre. Libertad 0: usar el programa. Libertad 1: estudiar el código. Libertad 2: distribuir copias. Libertad 3: mejorar el programa. Estas son los pilares del reino."',
    instructions: [
      '📖 Las Cuatro Libertades de Stallman (Libertad 0-3) definen qué es software libre',
      '🔧 GPL, MIT, Apache: licencias que garantizan estas libertades de diferentes formas',
      '🔧 cat /reino/licencias/libertades.txt contiene la explicación completa',
      '▶ Ejecuta exactamente: cat /reino/licencias/libertades.txt'
    ],
    hints: [
      'Libertad 0 = derecho a usar',
      'Libertad 1 = acceso al código fuente (no es "piratería")',
      'Libertad 2 = puedes compartir copias',
      'Libertad 3 = puedes contribuir mejoras'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Lee la explicación de las Cuatro Libertades',
        type: 'command_output',
        expectedCommand: 'cat /reino/licencias/libertades.txt',
        validationFn: 'output.includes("Libertad") || output.includes("libre")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 9,
    title: 'Licencias del Código Abierto',
    description: 'Aprende las principales licencias de software libre y sus diferencias',
    world: 1, order: 9, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"GPL, MIT, BSD, Apache: licencias distintas pero todas del movimiento libre. GPL es copyleft (compartir la libertad). MIT es permisiva (casi sin restricciones). La elección de licencia define el alma del proyecto."',
    instructions: [
      '📖 GPL, MIT, BSD, Apache son las licencias más comunes del software libre',
      '🔧 GPL (copyleft) = si distribuyes el software, debes compartir el código fuente',
      '🔧 MIT/BSD (permisivas) = muy pocos requisitos, casi haz lo que quieras',
      '🔧 cat /reino/licencias/tipos.txt contiene comparación de licencias',
      '▶ Ejecuta exactamente: cat /reino/licencias/tipos.txt'
    ],
    hints: [
      'Linux usa GPL v2',
      'Nginx usa BSD',
      'Node.js usa MIT',
      'GPL es "viral" (obliga a quien lo distribuye a mantener la licencia GPL)'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Lee la comparación de licencias de software libre',
        type: 'command_output',
        expectedCommand: 'cat /reino/licencias/tipos.txt',
        validationFn: 'output.includes("GPL") || output.includes("MIT")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 10,
    title: 'Linus Torvalds y el Kernel',
    description: 'Aprende la historia de Linux y el kernel que lo hace posible',
    world: 1, order: 10, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"En 1991, un estudiante finlandés llamado Linus Torvalds creó el kernel de Linux. No lo hizo solo: miles de programadores contribuyeron. El kernel es el corazón del sistema, el puente entre el hardware y los programas."',
    instructions: [
      '📖 Linus Torvalds creó el kernel Linux en 1991, liberándolo bajo GPL',
      '🔧 El kernel es el software más importante del SO: gesiona hardware, procesos, memoria, redes',
      '🔧 cat /reino/historia/kernel.txt contiene la historia completa',
      '▶ Ejecuta exactamente: cat /reino/historia/kernel.txt'
    ],
    hints: [
      'El kernel no es lo mismo que el SO (kernel ≠ Linux, aunque a menudo se confunden)',
      'Linus Torvalds sigue siendo el "Benevolent Dictator For Life" (BDFL) del kernel',
      'El kernel actual tiene decenas de millones de líneas de código'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Lee la historia de Linus y el kernel de Linux',
        type: 'command_output',
        expectedCommand: 'cat /reino/historia/kernel.txt',
        validationFn: 'output.includes("Linus") || output.includes("kernel")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 11,
    title: 'El Proyecto GNU y la FSF',
    description: 'Entiende el movimiento GNU y la Free Software Foundation',
    world: 1, order: 11, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"GNU es un movimiento: "GNU is Not Unix". Richard Stallman fundó la Free Software Foundation (FSF) para promover la libertad del software. Sin GNU, Linux sería solo un kernel. GNU proporciona las herramientas que lo hacen útil."',
    instructions: [
      '📖 GNU = movimiento + herramientas fundamentales (gcc, bash, coreutils, etc.)',
      '🔧 GNU/Linux = kernel Linux + herramientas GNU',
      '🔧 FSF = Free Software Foundation, organización que promueve software libre',
      '🔧 cat /reino/historia/gnu.txt contiene información detallada',
      '▶ Ejecuta exactamente: cat /reino/historia/gnu.txt'
    ],
    hints: [
      'gcc es el compilador principal de Linux (GNU C Compiler)',
      'bash es el shell predeterminado (GNU Bourne Again SHell)',
      'Stallman escribió el primer compilador de GNU (gcc) a finales de los 80'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Lee sobre el proyecto GNU y la FSF',
        type: 'command_output',
        expectedCommand: 'cat /reino/historia/gnu.txt',
        validationFn: 'output.includes("GNU") || output.includes("Stallman")'
      }
    ],
    prerequisites: [],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 12,
    title: '👹 BOSS: El Guardián del Conocimiento',
    description: 'Demuestra tu dominio del Mundo 1 respondiendo preguntas sobre Linux',
    world: 1, order: 12, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"Has aprendido bien, aprendiz. El Guardián del Conocimiento te pone a prueba. Responde sus preguntas sobre la historia de Linux, el software libre y las distribuciones. Solo así podrás avanzar al próximo mundo."',
    instructions: [
      '📖 Este es el jefe del Mundo 1: debes demostrar dominio de todos los conceptos',
      '🔧 El Guardián te hará preguntas de opción múltiple (simuladas mediante comandos)',
      '🔧 Responde correctamente consultando los pergaminos (cat /reino/historia/*)',
      '▶ Ejecuta: cat /reino/preguntas/mundo1.txt para ver las preguntas'
    ],
    hints: [
      'Todas las respuestas están en los pergaminos que ya leíste',
      'El Guardián es justo: solo pregunta sobre lo que aprendiste',
      'Piensa en las Cuatro Libertades, las licencias, la historia del kernel'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Responde las preguntas del Guardián del Conocimiento',
        type: 'command_output',
        expectedCommand: 'cat /reino/preguntas/mundo1.txt',
        validationFn: 'output.includes("pregunta") || output.includes("Mundo 1")'
      }
    ],
    prerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    rewards: { xp: 150, coins: 50 }
  },

  // ==========================================
  // MUNDO 2: CAMINOS PERDIDOS (18 misiones)
  // Tema 2 LPI: Encontrando el camino (peso 9)
  // ==========================================
  {
    id: 13,
    title: 'El Primer Paso en el Laberinto',
    description: 'Aprende dónde estás en el sistema de archivos con pwd',
    world: 2, order: 1, difficulty: 1,
    npc: 'Grep-ild el Rastreador',
    story: '"Bienvenido al Laberinto de Caminos. El primer hechizo que todo aprendiz debe dominar es pwd: "print working directory". Te dice exactamente dónde estás en el vasto bosque de directorios."',
    instructions: [
      '📖 pwd (print working directory) te dice tu ubicación actual en el árbol de directorios',
      '🔧 Todos los caminos en Linux comienzan desde / (raíz) o desde tu home (~)',
      '🔧 pwd sin opciones simplemente muestra tu ruta actual',
      '▶ Ejecuta exactamente: pwd'
    ],
    hints: [
      'pwd no necesita opciones, funciona tal cual',
      'Tu directorio actual probablemente empiece con /root o tu directorio home',
      'El / es la raíz, el inicio de todos los caminos'
    ],
    requiredCommands: ['pwd'],
    objectives: [
      {
        id: 1,
        description: 'Descubre dónde estás en el laberinto',
        type: 'command_output',
        expectedCommand: 'pwd',
        validationFn: 'output.includes("/")'
      }
    ],
    prerequisites: [12],
    rewards: { xp: 50, coins: 5 }
  },

  {
    id: 14,
    title: 'Listando los Tesoros',
    description: 'Domina ls para explorar el contenido de directorios',
    world: 2, order: 2, difficulty: 1,
    npc: 'Grep-ild el Rastreador',
    story: '"ls es tu linterna en la oscuridad. Ilumina lo que hay en cada cuarto del laberinto. Con ls ves archivos, directorios, tamaños, permisos. Sin él, estabas ciego."',
    instructions: [
      '📖 ls lista el contenido de un directorio (archivos y subdirectorios)',
      '🔧 ls sin argumentos lista el directorio actual',
      '🔧 ls /ruta lista el contenido de ese directorio',
      '🔧 ls -l muestra detalles (permisos, tamaño, fecha)',
      '▶ Paso 1: Ejecuta exactamente: ls',
      '▶ Paso 2: Luego ejecuta: ls -la'
    ],
    hints: [
      'ls -l = formato largo (long listing)',
      'ls -a = mostrar archivos ocultos (que comienzan con .)',
      'ls -la = largo Y archivos ocultos'
    ],
    requiredCommands: ['ls'],
    objectives: [
      {
        id: 1,
        description: 'Lista el contenido de tu directorio actual',
        type: 'command_output',
        expectedCommand: 'ls',
        validationFn: 'output.length > 0'
      },
      {
        id: 2,
        description: 'Lista con detalles (permisos, tamaño, fecha)',
        type: 'command_output',
        expectedCommand: 'ls -la',
        validationFn: 'output.includes("drwx") || output.includes("-rw")'
      }
    ],
    prerequisites: [12, 13],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 15,
    title: '👹 BOSS: El Minotauro de los Caminos',
    description: 'Navega correctamente a través del laberinto de directorios',
    world: 2, order: 3, difficulty: 3,
    npc: 'Grep-ild el Rastreador',
    story: '"El Minotauro guarda los secretos del Laberinto. Para derrotarlo debes demostrar que dominas la navegación: pwd, ls, cd, mkdir, touch. Solo entonces podrás acceder al Tesoro Dorado."',
    instructions: [
      '📖 El Minotauro exige que pruebes tus habilidades de navegación',
      '🔧 Debes navegar entre directorios y crear la estructura que el Minotauro demanda',
      '🔧 Usa cd para cambiar de directorio, mkdir para crear, touch para crear archivos',
      '▶ Ejecuta las tareas que el Minotauro te exija en /reino/retos/mundo2-boss/'
    ],
    hints: [
      'cd /ruta = cambiar a ese directorio',
      'mkdir nombre = crear un directorio',
      'touch archivo = crear un archivo vacío',
      'El Minotauro es justo pero exigente'
    ],
    requiredCommands: ['cd', 'mkdir', 'touch', 'pwd', 'ls'],
    objectives: [
      {
        id: 1,
        description: 'Crea la estructura que el Minotauro demanda',
        type: 'command_output',
        expectedCommand: 'ls -la /reino/retos/mundo2-boss/',
        validationFn: 'output.includes("paso1") || output.includes("paso2")'
      }
    ],
    prerequisites: [13, 14],
    rewards: { xp: 150, coins: 50 }
  },

  {
    id: 16,
    title: 'Moviendo Tesoros',
    description: 'Aprende a copiar y mover archivos con cp y mv',
    world: 2, order: 4, difficulty: 2,
    npc: 'Grep-ild el Rastreador',
    story: '"Ahora sabes navegar. Pero los aprendices también deben aprender a manipular los tesoros. cp copia archivos. mv los mueve o renombra. Con estas herramientas controlas los tesoros del laberinto."',
    instructions: [
      '📖 cp copia un archivo: cp origen destino',
      '📖 mv mueve (o renombra) un archivo: mv origen destino',
      '🔧 cp -r copia directorios enteros recursivamente',
      '🔧 mv también funciona para renombrar: mv viejo_nombre nuevo_nombre',
      '▶ Paso 1: Ejecuta exactamente: cp /reino/archivo.txt ./copia.txt',
      '▶ Paso 2: Luego ejecuta: mv ./copia.txt ./renombrado.txt'
    ],
    hints: [
      '. = directorio actual',
      'cp no borra el original, mv sí',
      'Para copiar directorios debes usar cp -r'
    ],
    requiredCommands: ['cp', 'mv'],
    objectives: [
      {
        id: 1,
        description: 'Copia un archivo de /reino/ a tu directorio',
        type: 'command_output',
        expectedCommand: 'cp /reino/archivo.txt ./copia.txt',
        validationFn: 'output.length === 0'
      },
      {
        id: 2,
        description: 'Renombra el archivo copiado',
        type: 'command_output',
        expectedCommand: 'mv ./copia.txt ./renombrado.txt',
        validationFn: 'output.length === 0'
      }
    ],
    prerequisites: [15],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 17,
    title: 'Borrando lo Innecesario',
    description: 'Aprende a eliminar archivos y directorios con rm',
    world: 2, order: 5, difficulty: 2,
    npc: 'Grep-ild el Rastreador',
    story: '"rm es peligrosa pero necesaria. Borra archivos sin piedad, sin papelera de reciclaje. Un aprendiz debe aprender su poder: rm borra, rm -r borra recursivamente, rm -f fuerza la eliminación."',
    instructions: [
      '📖 rm elimina archivos: rm archivo',
      '📖 rm -r elimina directorios y su contenido (recursivo)',
      '📖 rm -f fuerza la eliminación sin preguntar',
      '🔧 ¡CUIDADO!: rm es irreversible, no hay papelera de reciclaje',
      '▶ Paso 1: Ejecuta exactamente: rm ./renombrado.txt'
    ],
    hints: [
      'En Linux no hay "papelera": rm borra directamente',
      'Por eso es importante ser cuidadoso con rm',
      'rm -rf es peligroso: elimina todo recursivamente'
    ],
    requiredCommands: ['rm'],
    objectives: [
      {
        id: 1,
        description: 'Elimina el archivo que creaste',
        type: 'command_output',
        expectedCommand: 'rm ./renombrado.txt',
        validationFn: 'output.length === 0'
      }
    ],
    prerequisites: [16],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 18,
    title: 'Buscando en la Oscuridad',
    description: 'Usa find para buscar archivos y directorios',
    world: 2, order: 6, difficulty: 2,
    npc: 'Grep-ild el Rastreador',
    story: '"El laberinto es vasto. find es tu brújula. Busca archivos por nombre, tamaño, tipo, fecha modificada. Con find encuentras cualquier tesoro escondido."',
    instructions: [
      '📖 find busca archivos y directorios recursivamente',
      '🔧 find /directorio -name "patrón" busca por nombre',
      '🔧 find /directorio -type f busca solo archivos',
      '🔧 find /directorio -type d busca solo directorios',
      '▶ Paso 1: Ejecuta exactamente: find /reino -name "*.txt" -type f',
      '▶ Paso 2: Luego ejecuta: find /reino -type d'
    ],
    hints: [
      '* = comodín que significa "cualquier cosa"',
      '*.txt = todos los archivos que terminan en .txt',
      'find es muy poderosa pero también lenta en directorios grandes'
    ],
    requiredCommands: ['find'],
    objectives: [
      {
        id: 1,
        description: 'Busca todos los archivos .txt en /reino',
        type: 'command_output',
        expectedCommand: 'find /reino -name "*.txt" -type f',
        validationFn: 'output.includes(".txt")'
      },
      {
        id: 2,
        description: 'Busca todos los directorios en /reino',
        type: 'command_output',
        expectedCommand: 'find /reino -type d',
        validationFn: 'output.includes("/")'
      }
    ],
    prerequisites: [17],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 19,
    title: 'Filtrando Lineas con Grep',
    description: 'Domina grep para buscar texto dentro de archivos',
    world: 2, order: 7, difficulty: 2,
    npc: 'Grep-ild el Rastreador',
    story: '"grep busca patrones de texto dentro de archivos. Es el filtro más poderoso del laberinto. grep lo_que_buscas archivo.txt te muestra solo las lineas que contienen lo_que_buscas."',
    instructions: [
      '📖 grep busca texto dentro de archivos: grep patrón archivo',
      '🔧 grep imprime las líneas que coinciden con el patrón',
      '🔧 grep -i ignora mayúsculas/minúsculas',
      '🔧 grep -v invierte: muestra líneas que NO contienen el patrón',
      '▶ Paso 1: Ejecuta exactamente: grep "Linux" /etc/os-release'
    ],
    hints: [
      'grep diferencia mayúsculas de minúsculas por defecto',
      'Usa grep -i para búsquedas insensibles a caso',
      'grep es rápido incluso en archivos enormes'
    ],
    requiredCommands: ['grep'],
    objectives: [
      {
        id: 1,
        description: 'Busca "Linux" en /etc/os-release',
        type: 'command_output',
        expectedCommand: 'grep "Linux" /etc/os-release',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [18],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 20,
    title: 'Leyendo Archivos',
    description: 'Aprende cat, head y tail para leer contenido de archivos',
    world: 2, order: 8, difficulty: 1,
    npc: 'Grep-ild el Rastreador',
    story: '"cat muestra el archivo entero. head muestra solo el principio (primeras lineas). tail muestra el final (últimas lineas). Para un aprendiz de datos, estas tres son esenciales."',
    instructions: [
      '📖 cat muestra el archivo completo',
      '📖 head muestra las primeras 10 líneas (por defecto)',
      '📖 tail muestra las últimas 10 líneas (por defecto)',
      '🔧 head -n 5 archivo = primeras 5 líneas',
      '🔧 tail -n 20 archivo = últimas 20 líneas',
      '▶ Paso 1: Ejecuta exactamente: cat /etc/os-release',
      '▶ Paso 2: Luego ejecuta: head -n 3 /etc/os-release'
    ],
    hints: [
      'cat es útil para archivos pequeños',
      'Para archivos grandes usa head o tail',
      'tail -f sigue un archivo (útil para logs)'
    ],
    requiredCommands: ['cat', 'head', 'tail'],
    objectives: [
      {
        id: 1,
        description: 'Muestra el archivo completo',
        type: 'command_output',
        expectedCommand: 'cat /etc/os-release',
        validationFn: 'output.includes("NAME")'
      },
      {
        id: 2,
        description: 'Muestra solo las primeras 3 líneas',
        type: 'command_output',
        expectedCommand: 'head -n 3 /etc/os-release',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [19],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 21,
    title: 'Contando y Ordenando',
    description: 'Usa wc y sort para contar líneas y ordenar datos',
    world: 2, order: 9, difficulty: 2,
    npc: 'Grep-ild el Rastreador',
    story: '"wc cuenta líneas, palabras y caracteres. sort ordena alfabéticamente. uniq elimina duplicados. Estas herramientas de análisis son fundamentales para procesar datos en el laberinto."',
    instructions: [
      '📖 wc cuenta líneas (lines), palabras (words), caracteres (characters)',
      '📖 wc -l archivo = solo contar líneas',
      '📖 sort ordena líneas alfabéticamente',
      '🔧 sort -r invierte el orden (descendente)',
      '▶ Paso 1: Ejecuta exactamente: wc -l /etc/os-release',
      '▶ Paso 2: Luego ejecuta: sort /etc/os-release'
    ],
    hints: [
      'wc = word count (aunque también cuenta líneas y caracteres)',
      'sort es útil antes de uniq (que elimina duplicados)',
      'sort -n ordena numérico (no alfabético)'
    ],
    requiredCommands: ['wc', 'sort'],
    objectives: [
      {
        id: 1,
        description: 'Cuenta las líneas de /etc/os-release',
        type: 'command_output',
        expectedCommand: 'wc -l /etc/os-release',
        validationFn: 'output.includes("/etc/os-release")'
      },
      {
        id: 2,
        description: 'Ordena las líneas de /etc/os-release',
        type: 'command_output',
        expectedCommand: 'sort /etc/os-release',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [20],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 22,
    title: 'Tuberías Mágicas',
    description: 'Aprende pipes (|) para encadenar comandos',
    world: 2, order: 10, difficulty: 2,
    npc: 'Grep-ild el Rastreador',
    story: '"El pipe es la magia más poderosa del shell. Conecta comandos: la salida de uno es la entrada del siguiente. cat archivo | grep palabra | wc -l te da un resultado que 3 comandos sin pipe no podrían lograr."',
    instructions: [
      '📖 El pipe (|) encadena comandos: salida de uno → entrada del siguiente',
      '🔧 comando1 | comando2 = ejecuta comando1, pasa resultado a comando2',
      '🔧 cat archivo | grep palabra | wc -l = cuenta líneas que contienen palabra',
      '▶ Paso 1: Ejecuta exactamente: cat /etc/os-release | grep "NAME"',
      '▶ Paso 2: Luego ejecuta: cat /etc/os-release | wc -l'
    ],
    hints: [
      'Los pipes son la esencia de Unix: herramientas pequeñas que hacen una cosa bien',
      'Puedes encadenar muchos pipes: a | b | c | d | e',
      'Bash permite combinaciones poderosas de herramientas simples'
    ],
    requiredCommands: ['cat', 'grep', 'wc'],
    objectives: [
      {
        id: 1,
        description: 'Busca "NAME" en /etc/os-release usando pipe',
        type: 'command_output',
        expectedCommand: 'cat /etc/os-release | grep "NAME"',
        validationFn: 'output.includes("NAME")'
      },
      {
        id: 2,
        description: 'Cuenta líneas de /etc/os-release usando pipe',
        type: 'command_output',
        expectedCommand: 'cat /etc/os-release | wc -l',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [21],
    rewards: { xp: 80, coins: 20 }
  },

  {
    id: 23,
    title: 'Redirecciones y Flujos',
    description: 'Aprende > y >> para redirigir salida a archivos',
    world: 2, order: 11, difficulty: 2,
    npc: 'Grep-ild el Rastreador',
    story: '"La redirección es poder. > redirige salida a un archivo (sobrescribe). >> añade al final. 2> redirige errores. Con estas puedes capturar la magia en botellas de cristal (archivos)."',
    instructions: [
      '📖 > redirige salida a archivo (sobrescribe si existe)',
      '📖 >> añade salida al final del archivo',
      '📖 2> redirige errores a archivo',
      '📖 comando > archivo = guarda salida en archivo',
      '▶ Paso 1: Ejecuta exactamente: echo "Hola" > prueba.txt',
      '▶ Paso 2: Luego ejecuta: cat prueba.txt'
    ],
    hints: [
      'Diferencia > (sobrescribe) de >> (añade)',
      '2>&1 redirige tanto salida como errores',
      'Los pipes y redirecciones son la base de la programación shell'
    ],
    requiredCommands: ['echo'],
    objectives: [
      {
        id: 1,
        description: 'Redirige un echo a un archivo',
        type: 'command_output',
        expectedCommand: 'echo "Hola LinuxQuest" > prueba.txt',
        validationFn: 'output.length === 0'
      },
      {
        id: 2,
        description: 'Lee el archivo que creaste',
        type: 'command_output',
        expectedCommand: 'cat prueba.txt',
        validationFn: 'output.includes("Hola")'
      }
    ],
    prerequisites: [22],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 24,
    title: 'Permisos de Archivos',
    description: 'Aprende chmod para cambiar permisos con notación octal',
    world: 2, order: 12, difficulty: 3,
    npc: 'Chmod-ard el Guardián de Permisos',
    story: '"Los permisos son el guardaespaldas de tus archivos. chmod los cambia. r=read, w=write, x=execute. 755 = rwxr-xr-x. 644 = rw-r--r--. Domina esta numerología y controlarás la seguridad."',
    instructions: [
      '📖 chmod cambia permisos: chmod opciones archivo',
      '📖 Notación octal: 755 = rwxr-xr-x, 644 = rw-r--r--',
      '🔧 Dígito 1 (propietario): 7=rwx, 6=rw-, 5=r-x, 4=r--',
      '🔧 Dígito 2 (grupo): mismo sistema',
      '🔧 Dígito 3 (otros): mismo sistema',
      '▶ Paso 1: Ejecuta exactamente: chmod 755 prueba.txt'
    ],
    hints: [
      '4 = read (r), 2 = write (w), 1 = execute (x)',
      '7 = 4+2+1 = rwx',
      '5 = 4+1 = r-x',
      'Los permisos son críticos para la seguridad'
    ],
    requiredCommands: ['chmod'],
    objectives: [
      {
        id: 1,
        description: 'Cambia permisos a 755',
        type: 'command_output',
        expectedCommand: 'chmod 755 prueba.txt',
        validationFn: 'output.length === 0'
      }
    ],
    prerequisites: [23],
    rewards: { xp: 80, coins: 20 }
  },

  {
    id: 25,
    title: 'Propietario y Grupo',
    description: 'Aprende chown para cambiar propietario y grupo',
    world: 2, order: 13, difficulty: 2,
    npc: 'Chmod-ard el Guardián de Permisos',
    story: '"chown cambia propietario (owner) y grupo (group). chown usuario:grupo archivo. Solo el propietario puede cambiar permisos. El root puede cambiar cualquier propietario. Es la cadena de custodia del reino."',
    instructions: [
      '📖 chown cambia propietario y/o grupo: chown usuario:grupo archivo',
      '🔧 chown usuario archivo = cambia solo propietario',
      '🔧 chown :grupo archivo = cambia solo grupo',
      '🔧 chown usuario:grupo archivo = cambia ambos',
      '▶ Ejecuta exactamente: ls -la prueba.txt'
    ],
    hints: [
      'Solo root puede cambiar el propietario en la mayoría de sistemas',
      'El propietario (usuario) puede cambiar permisos pero no propietario',
      'chown sin el : solo cambia propietario'
    ],
    requiredCommands: ['ls', 'chown'],
    objectives: [
      {
        id: 1,
        description: 'Muestra el propietario actual del archivo',
        type: 'command_output',
        expectedCommand: 'ls -la prueba.txt',
        validationFn: 'output.includes("root") || output.includes("sandbox")'
      }
    ],
    prerequisites: [24],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 26,
    title: 'Creando Directorios Correctamente',
    description: 'Usa mkdir con opciones para crear estructuras',
    world: 2, order: 14, difficulty: 2,
    npc: 'Chmod-ard el Guardián de Permisos',
    story: '"mkdir crea directorios. mkdir -p crea directorios padre si no existen. Imagina que quieres crear /a/b/c/d pero solo /a existe. Sin -p obtendrías error. Con -p: success."',
    instructions: [
      '📖 mkdir crea directorios: mkdir nombre',
      '📖 mkdir -p crea directorios padres si es necesario',
      '📖 mkdir -p a/b/c/d = crea toda la cadena',
      '▶ Paso 1: Ejecuta exactamente: mkdir -p directorio_test/sub1/sub2',
      '▶ Paso 2: Luego ejecuta: ls -R directorio_test'
    ],
    hints: [
      'mkdir sin -p falla si el padre no existe',
      'mkdir -p es muy útil para crear estructuras complejas',
      '-R en ls muestra directorios recursivamente'
    ],
    requiredCommands: ['mkdir', 'ls'],
    objectives: [
      {
        id: 1,
        description: 'Crea una estructura de directorios anidados',
        type: 'command_output',
        expectedCommand: 'mkdir -p directorio_test/sub1/sub2',
        validationFn: 'output.length === 0'
      },
      {
        id: 2,
        description: 'Verifica la estructura creada',
        type: 'command_output',
        expectedCommand: 'ls -R directorio_test',
        validationFn: 'output.includes("sub1")'
      }
    ],
    prerequisites: [25],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 27,
    title: 'Removiendo Directorios',
    description: 'Usa rmdir y rm -r para eliminar directorios',
    world: 2, order: 15, difficulty: 2,
    npc: 'Chmod-ard el Guardián de Permisos',
    story: '"rmdir solo elimina directorios VACÍOS. rm -r elimina recursivamente (con todo contenido). El poder de rm -r es enorme: borra directorios enteros sin preguntar. Úsalo con cuidado."',
    instructions: [
      '📖 rmdir elimina directorios VACÍOS: rmdir nombre',
      '📖 rm -r elimina directorios con contenido (recursivo)',
      '📖 rmdir falla si el directorio contiene archivos',
      '▶ Paso 1: Ejecuta exactamente: rmdir directorio_test/sub1/sub2',
      '▶ Paso 2: Luego ejecuta: rm -r directorio_test'
    ],
    hints: [
      'rmdir es "segura" (solo borra vacíos)',
      'rm -r es peligrosa (borra todo)',
      'Por eso rm -r se usa menos que rm'
    ],
    requiredCommands: ['rmdir', 'rm'],
    objectives: [
      {
        id: 1,
        description: 'Elimina un directorio vacío',
        type: 'command_output',
        expectedCommand: 'rmdir directorio_test/sub1/sub2',
        validationFn: 'output.length === 0'
      },
      {
        id: 2,
        description: 'Elimina el directorio con contenido',
        type: 'command_output',
        expectedCommand: 'rm -r directorio_test',
        validationFn: 'output.length === 0'
      }
    ],
    prerequisites: [26],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 28,
    title: 'Cambiando de Usuario',
    description: 'Usa su para cambiar usuario (switch user)',
    world: 2, order: 16, difficulty: 2,
    npc: 'Chmod-ard el Guardián de Permisos',
    story: '"su cambia usuario (switch user). su usuario te convierte en otro usuario (si sabes su contraseña). su - abre un shell de login. En el reino, cambiar de forma es poder, pero requiere autorización."',
    instructions: [
      '📖 su usuario = cambiar a otro usuario',
      '📖 su - usuario = abre un shell de login (recomendado)',
      '📖 exit = volver al usuario anterior',
      '▶ Ejecuta exactamente: whoami (para ver tu usuario actual)'
    ],
    hints: [
      'En esta sandbox educativa solo tienes un usuario',
      'whoami = who am I (muestra usuario actual)',
      'su sin usuario = intenta cambiar a root'
    ],
    requiredCommands: ['whoami'],
    objectives: [
      {
        id: 1,
        description: 'Muestra tu usuario actual',
        type: 'command_output',
        expectedCommand: 'whoami',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [27],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 29,
    title: 'Primeros Pasos en Scripting',
    description: 'Crea tu primer script bash simple',
    world: 2, order: 17, difficulty: 3,
    npc: 'Chmod-ard el Guardián de Permisos',
    story: '"Un script bash es una serie de comandos en un archivo. cat, echo, ls: todos pueden formar un script. Crearás tu primer hechizo automático, una secuencia de magia que se ejecuta de una sola vez."',
    instructions: [
      '📖 Un script bash es un archivo con comandos',
      '🔧 Primera línea: #!/bin/bash (shebang)',
      '🔧 Luego los comandos normales',
      '🔧 chmod +x script.sh lo hace ejecutable',
      '📖 ./script.sh lo ejecuta',
      '▶ Paso 1: Ejecuta exactamente: cat > script.sh << EOF',
      '#!/bin/bash',
      'echo "Hola desde script bash"',
      'pwd',
      'whoami',
      'EOF',
      '▶ Paso 2: Luego ejecuta: chmod +x script.sh',
      '▶ Paso 3: Luego ejecuta: ./script.sh'
    ],
    hints: [
      'EOF es "End Of File" en heredoc',
      'Presiona Enter después del EOF final',
      'chmod +x hace el archivo ejecutable'
    ],
    requiredCommands: ['cat', 'chmod', 'echo'],
    objectives: [
      {
        id: 1,
        description: 'Crea un archivo script.sh',
        type: 'command_output',
        expectedCommand: 'cat > script.sh << \'EOF\'\n#!/bin/bash\necho "Hola desde script bash"\nEOF',
        validationFn: 'output.length === 0'
      },
      {
        id: 2,
        description: 'Ejecuta el script',
        type: 'command_output',
        expectedCommand: './script.sh',
        validationFn: 'output.includes("Hola")'
      }
    ],
    prerequisites: [28],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 30,
    title: '👹 BOSS: El Guardián de Permisos Final',
    description: 'Demuestra dominio completo de navegación y permisos',
    world: 2, order: 18, difficulty: 3,
    npc: 'Chmod-ard el Guardián de Permisos',
    story: '"Has dominado los caminos del laberinto. El Guardián Final de Permisos te pone última prueba: crear estructura de directorios, asignar permisos, crear scripts. Solo los verdaderos maestros avanzan al Mundo 3."',
    instructions: [
      '📖 Prueba final del Mundo 2: demostrar todas las habilidades aprendidas',
      '🔧 Debes crear directorios, asignar permisos, crear un script ejecutable',
      '▶ Ejecuta: cat /reino/retos/mundo2-final.txt'
    ],
    hints: [
      'Recuerda: mkdir -p para directorios anidados',
      'chmod 755 para ejecutables',
      '#!/bin/bash al inicio de scripts',
      'Todos los temas de Mundo 2 en una sola misión'
    ],
    requiredCommands: ['cat', 'mkdir', 'chmod'],
    objectives: [
      {
        id: 1,
        description: 'Lee el reto final del Mundo 2',
        type: 'command_output',
        expectedCommand: 'cat /reino/retos/mundo2-final.txt',
        validationFn: 'output.includes("reto") || output.includes("Mundo 2")'
      }
    ],
    prerequisites: [29],
    rewards: { xp: 200, coins: 75 }
  },

  // Placeholder para los mundos 3, 4, 5 restantes
  // Por brevedad, los dejaré como comentario
  // Mundo 3 (IDs 31-50): Poder de la línea de comandos
  // Mundo 4 (IDs 49-65): Sistema operativo
  // Mundo 5 (IDs 66-80): Seguridad y permisos
  // Extras (IDs 91-95): Refuerzo
];

async function seedQuests() {
  const client = await pool.connect();
  try {
    await client.query('TRUNCATE TABLE quests CASCADE;');
    for (const quest of quests) {
      await client.query(
        `INSERT INTO quests (id, title, description, world, "order", difficulty, npc, story, hints, required_commands, objectives, prerequisites, rewards)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          quest.id, quest.title, quest.description, quest.world, quest.order,
          quest.difficulty, quest.npc, quest.story,
          JSON.stringify(quest.hints),
          JSON.stringify(quest.requiredCommands),
          JSON.stringify([...(quest.objectives || []), ...(quest.instructions ? [{ instructions: quest.instructions }] : [])]),
          JSON.stringify(quest.prerequisites || []),
          JSON.stringify(quest.rewards || {})
        ]
      );
    }
    console.log(`✅ Seeded ${quests.length} quests`);
  } catch (e) {
    console.error('❌ Seed error:', e.message);
  } finally {
    client.release();
  }
}

seedQuests();
