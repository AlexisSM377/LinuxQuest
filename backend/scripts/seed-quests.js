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

  // ==========================================
  // MUNDO 3: TORRES ANTIGUAS DEL PODER (18 misiones)
  // Tema 3 LPI: Poder de la línea de comandos (peso 9)
  // ==========================================
  {
    id: 31,
    title: 'Variables del Shell',
    description: 'Aprende a usar variables para almacenar datos',
    world: 3, order: 1, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Las variables son cajas mágicas que almacenan datos. $USER = tu usuario. $HOME = tu directorio. $PATH = dónde busca comandos. Accede con $ y manipulalas con export."',
    instructions: [
      '📖 Las variables guardan datos: nombre=valor (sin espacios)',
      '📖 Acceso con $nombre: echo $HOME muestra tu directorio',
      '🔧 Los comandos pueden leer variables: echo "Soy $USER"',
      '🔧 export nombre=valor hace la variable "global" (heredada a subprocesos)',
      '▶ Paso 1: Ejecuta exactamente: echo $HOME',
      '▶ Paso 2: Luego ejecuta: echo $USER'
    ],
    hints: [
      '$HOME = tu directorio de usuario',
      '$USER = tu nombre de usuario',
      '$PATH = lista de directorios donde busca comandos'
    ],
    requiredCommands: ['echo'],
    objectives: [
      {
        id: 1,
        description: 'Muestra tu directorio home',
        type: 'command_output',
        expectedCommand: 'echo $HOME',
        validationFn: 'output.includes("/")'
      },
      {
        id: 2,
        description: 'Muestra tu nombre de usuario',
        type: 'command_output',
        expectedCommand: 'echo $USER',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [30],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 32,
    title: 'Editores de Texto: nano vs vi',
    description: 'Aprende a usar nano y vi para editar archivos',
    world: 3, order: 2, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"Editar archivos es fundamental. nano es simple y amigable. vi es poderoso pero complejo. Domina ambos y nunca estarás atrapado sin editor."',
    instructions: [
      '📖 nano es editor simple: nano archivo',
      '📖 vi es editor poderoso pero con curva de aprendizaje',
      '🔧 nano: Ctrl+X para salir, Ctrl+O para guardar',
      '🔧 vi: ESC para modo comando, :wq para guardar-salir',
      '▶ Ejecuta exactamente: nano prueba_editor.txt'
    ],
    hints: [
      'En nano: Ctrl+X pregunta si guardar',
      'En vi: presiona i para insertar texto, ESC para salir',
      'nano es más segura para principiantes'
    ],
    requiredCommands: ['nano'],
    objectives: [
      {
        id: 1,
        description: 'Crea un archivo con nano',
        type: 'command_output',
        expectedCommand: 'nano prueba_editor.txt',
        validationFn: 'output.length >= 0'
      }
    ],
    prerequisites: [31],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 33,
    title: 'Sustituciones y Comillas',
    description: 'Aprende las diferencias entre comillas simples, dobles y backticks',
    world: 3, order: 3, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"Las comillas controlan cómo bash interpreta strings. Comillas simples = literal. Comillas dobles = variables expandidas. Backticks = comando ejecutado. La maestría está en los detalles."',
    instructions: [
      '📖 Comillas simples (\') = literal exacto, sin expansión',
      '📖 Comillas dobles (") = expande variables y comandos',
      '📖 Backticks (`) o $() = ejecuta comando y usa output',
      '🔧 echo \'$USER\' = imprime literalmente: $USER',
      '🔧 echo "$USER" = imprime el usuario: root',
      '🔧 echo `whoami` = ejecuta whoami y muestra resultado',
      '▶ Paso 1: Ejecuta exactamente: echo \'$HOME\'',
      '▶ Paso 2: Luego ejecuta: echo "$HOME"'
    ],
    hints: [
      'Las comillas simples previenen expansión',
      'Las comillas dobles permiten expansión',
      'Los backticks ejecutan comandos en subshell'
    ],
    requiredCommands: ['echo'],
    objectives: [
      {
        id: 1,
        description: 'Usa comillas simples (sin expansión)',
        type: 'command_output',
        expectedCommand: 'echo \'$HOME\'',
        validationFn: 'output.includes("$HOME")'
      },
      {
        id: 2,
        description: 'Usa comillas dobles (con expansión)',
        type: 'command_output',
        expectedCommand: 'echo "$HOME"',
        validationFn: 'output.includes("/")'
      }
    ],
    prerequisites: [32],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 34,
    title: 'sed: Editor de Streams',
    description: 'Aprende sed para buscar y reemplazar texto',
    world: 3, order: 4, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"sed es el editor de streams (flujos). Busca y reemplaza sin tocar el archivo. sed \'s/viejo/nuevo/g\' archivo aplica la magia de sustitución a todo el flujo."',
    instructions: [
      '📖 sed = stream editor, no toca archivo original',
      '📖 sed \'s/buscar/reemplazar/\' archivo',
      '📖 s = substitute (reemplazar)',
      '📖 g = global (todas las ocurrencias en la línea)',
      '▶ Paso 1: Ejecuta exactamente: echo "hola mundo" | sed \'s/mundo/LinuxQuest/\'',
      '▶ Paso 2: Luego ejecuta: sed \'s/Linux/GNU+Linux/g\' /etc/os-release'
    ],
    hints: [
      'sed no modifica el archivo, solo muestra el resultado',
      'Usa sed -i para modificar "in place" (cuidado!)',
      'g al final = global (todas, no solo la primera)'
    ],
    requiredCommands: ['sed', 'echo'],
    objectives: [
      {
        id: 1,
        description: 'Usa sed con pipe para reemplazar',
        type: 'command_output',
        expectedCommand: 'echo "hola mundo" | sed \'s/mundo/LinuxQuest/\'',
        validationFn: 'output.includes("LinuxQuest")'
      },
      {
        id: 2,
        description: 'Usa sed en un archivo real',
        type: 'command_output',
        expectedCommand: 'sed \'s/Linux/GNU+Linux/g\' /etc/os-release',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [33],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 35,
    title: '👹 BOSS: El Mago del Shell',
    description: 'Demuestra dominio avanzado del shell y procesamiento de texto',
    world: 3, order: 5, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"El Mago del Shell evalúa tu maestría: variables, comillas, pipes, redirecciones, sed, awk. Combina todo en una sola hazaña: procesar datos como un verdadero mago del shell."',
    instructions: [
      '📖 Prueba final de Mundo 3: dominio completo del shell avanzado',
      '🔧 Debes combinar variables, pipes, sed, redirección',
      '▶ Ejecuta: cat /reino/retos/mundo3-final.txt'
    ],
    hints: [
      'Piensa en pipes: comando1 | comando2 | comando3',
      'Las variables se expanden con comillas dobles',
      'sed busca y reemplaza en streams'
    ],
    requiredCommands: ['cat', 'grep', 'sed'],
    objectives: [
      {
        id: 1,
        description: 'Lee el reto final del Mago',
        type: 'command_output',
        expectedCommand: 'cat /reino/retos/mundo3-final.txt',
        validationFn: 'output.includes("reto") || output.length > 0'
      }
    ],
    prerequisites: [34],
    rewards: { xp: 200, coins: 75 }
  },

  // Misiones 36-48: Continuación Mundo 3
  {
    id: 36,
    title: 'awk: Procesador de Campos',
    description: 'Aprende awk para procesar columnas de datos',
    world: 3, order: 6, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"awk divide líneas en campos (columnas). $1=$primera, $2=$segunda, etc. Perfecto para procesar CSVs, logs, datos estructurados. El procesamiento de datos empieza con awk."',
    instructions: [
      '📖 awk divide líneas en campos separados por espacios',
      '📖 $1 = primer campo, $2 = segundo, etc.',
      '🔧 awk \'{print $1}\' = imprime primer campo',
      '🔧 awk \'{print $1, $3}\' = imprime campos 1 y 3',
      '▶ Ejecuta exactamente: echo "uno dos tres" | awk \'{print $2}\''
    ],
    hints: [
      'Los campos se separan por espacios por defecto',
      '-F: establece separador (ej: -F: para dos puntos)',
      'awk es muy poderosa para datos tabulares'
    ],
    requiredCommands: ['awk', 'echo'],
    objectives: [
      {
        id: 1,
        description: 'Usa awk para imprimir el segundo campo',
        type: 'command_output',
        expectedCommand: 'echo "uno dos tres" | awk \'{print $2}\'',
        validationFn: 'output.includes("dos")'
      }
    ],
    prerequisites: [35],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 37,
    title: 'xargs: Constructor de Comandos',
    description: 'Aprende xargs para pasar output como argumentos',
    world: 3, order: 7, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"xargs es especial: toma la salida de un comando y la convierte en argumentos para otro. find archivos | xargs rm = borra encontrados. Es el pegamento del shell."',
    instructions: [
      '📖 xargs convierte stdin en argumentos',
      '📖 comando1 | xargs comando2 = usa output de comando1 como args de comando2',
      '🔧 find . -name "*.txt" | xargs wc -l = cuenta líneas de todos los .txt',
      '▶ Ejecuta exactamente: echo "archivo1.txt archivo2.txt" | xargs wc'
    ],
    hints: [
      'xargs es muy útil con find',
      '-I {} permite especificar dónde van los argumentos',
      'Cuidado: xargs puede ejecutar comandos peligrosos'
    ],
    requiredCommands: ['xargs', 'echo'],
    objectives: [
      {
        id: 1,
        description: 'Usa xargs con echo',
        type: 'command_output',
        expectedCommand: 'echo "archivo1.txt archivo2.txt" | xargs wc',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [36],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 38,
    title: 'Globbing y Wildcards',
    description: 'Domina * ? [ ] para seleccionar múltiples archivos',
    world: 3, order: 8, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"* significa "cualquier cosa". ? significa "un carácter". [abc] significa "a o b o c". Con globbing seleccionas múltiples archivos elegantemente."',
    instructions: [
      '📖 * = cero o más caracteres',
      '📖 ? = exactamente un carácter',
      '📖 [abc] = solo a, b, o c',
      '📖 [0-9] = números del 0 al 9',
      '🔧 ls *.txt = lista todos los .txt',
      '🔧 ls archivo?.txt = archivo1.txt, archivo2.txt, etc.',
      '▶ Ejecuta exactamente: ls /reino/*.txt'
    ],
    hints: [
      'El globbing es expandido por bash ANTES de pasar al comando',
      'Usa comillas simples para prevenir globbing: echo \'*.txt\'',
      'Los patrones se expanden solo si existen archivos coincidentes'
    ],
    requiredCommands: ['ls'],
    objectives: [
      {
        id: 1,
        description: 'Lista archivos con patrón *.txt',
        type: 'command_output',
        expectedCommand: 'ls /reino/*.txt',
        validationFn: 'output.includes(".txt")'
      }
    ],
    prerequisites: [37],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 39,
    title: 'Alias: Atajos de Comandos',
    description: 'Crea alias para simplificar comandos largos',
    world: 3, order: 9, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"¿Escribir "ls -la" cada vez? Crea un alias: alias ll="ls -la". Así ll ejecuta lo largo. Los alias ahorran tiempo y protegen contra errores."',
    instructions: [
      '📖 alias nombre="comando" crea un atajo',
      '📖 alias ll="ls -la" permite escribir ll en lugar de ls -la',
      '📖 alias sin argumentos lista todos los alias',
      '▶ Paso 1: Ejecuta exactamente: alias ll="ls -la"',
      '▶ Paso 2: Luego ejecuta: ll'
    ],
    hints: [
      'Los alias son temporales (se pierden al cerrar shell)',
      'Para permanentes, añade a ~/.bashrc',
      'Los alias deben estar sin espacios alrededor de ='
    ],
    requiredCommands: ['alias', 'ls'],
    objectives: [
      {
        id: 1,
        description: 'Crea un alias',
        type: 'command_output',
        expectedCommand: 'alias ll="ls -la"',
        validationFn: 'output.length === 0'
      },
      {
        id: 2,
        description: 'Usa el alias',
        type: 'command_output',
        expectedCommand: 'll',
        validationFn: 'output.includes("total") || output.includes("drwx")'
      }
    ],
    prerequisites: [38],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 40,
    title: 'Control de Procesos: fg y bg',
    description: 'Aprende a ejecutar procesos en foreground y background',
    world: 3, order: 10, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Los procesos pueden ejecutarse adelante (foreground, bloqueante) o atrás (background, paralelo). Ctrl+Z pausa. fg vuelve al frente. bg sigue atrás. Paralelismo sin threads."',
    instructions: [
      '📖 Foreground = comando bloquea hasta terminar',
      '📖 Background = comando corre paralelo (comando &)',
      '📖 Ctrl+Z pausa el foreground',
      '📖 fg = vuelve a foreground',
      '📖 bg = continúa en background',
      '📖 jobs = lista procesos actuales',
      '▶ Ejecuta exactamente: jobs'
    ],
    hints: [
      'sleep 100 & = ejecuta sleep en background',
      'Ctrl+Z pausa (no termina), bg lo continúa',
      'Útil para ejecutar múltiples comandos simultáneamente'
    ],
    requiredCommands: ['jobs'],
    objectives: [
      {
        id: 1,
        description: 'Lista los procesos de tu shell',
        type: 'command_output',
        expectedCommand: 'jobs',
        validationFn: 'output.length >= 0'
      }
    ],
    prerequisites: [39],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 41,
    title: 'Loops: for en Bash',
    description: 'Aprende loops for para iterar sobre datos',
    world: 3, order: 11, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"for es el loop fundamental. Itera sobre una lista de valores. for i in 1 2 3; do echo $i; done. Automatización pura. La repetición es el poder."',
    instructions: [
      '📖 for variable in lista; do comando; done',
      '📖 for i in 1 2 3 4 5 imprime cada número',
      '🔧 for archivo in *.txt; do echo $archivo; done lista archivos',
      '▶ Ejecuta exactamente: for i in 1 2 3; do echo "Número: $i"; done'
    ],
    hints: [
      'La lista puede ser explícita (1 2 3) o resultado de comando',
      'do y done delimitan el cuerpo del loop',
      'for es esencial para scripts'
    ],
    requiredCommands: ['echo'],
    objectives: [
      {
        id: 1,
        description: 'Ejecuta un for loop simple',
        type: 'command_output',
        expectedCommand: 'for i in 1 2 3; do echo "Número: $i"; done',
        validationFn: 'output.includes("Número")'
      }
    ],
    prerequisites: [40],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 42,
    title: 'Condicionales: if/then/else',
    description: 'Aprende if para tomar decisiones en scripts',
    world: 3, order: 12, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"if test condición; then hazesto; else hazaestotro; fi. La lógica condicional da poder. Scripts inteligentes que toman decisiones. La IA del shell empieza aquí."',
    instructions: [
      '📖 if [ condición ]; then comando; fi',
      '📖 if [ "$USER" = "root" ]; then echo "Eres root"; fi',
      '🔧 [ = test, -eq = igual numérico, = igual string',
      '▶ Ejecuta exactamente: if [ "$USER" = "root" ]; then echo "Eres root"; else echo "No eres root"; fi'
    ],
    hints: [
      'Los espacios dentro de [ ] son OBLIGATORIOS',
      '= compara strings, -eq compara números',
      '[ -f archivo ] = archivo existe?'
    ],
    requiredCommands: ['echo'],
    objectives: [
      {
        id: 1,
        description: 'Ejecuta un if/then/else',
        type: 'command_output',
        expectedCommand: 'if [ "$USER" = "root" ]; then echo "root"; else echo "no root"; fi',
        validationFn: 'output.includes("root")'
      }
    ],
    prerequisites: [41],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 43,
    title: 'Funciones en Bash',
    description: 'Aprende a crear funciones reutilizables',
    world: 3, order: 13, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"Las funciones agrupan código reutilizable. function nombre { comandos; }. Defines una vez, usas muchas. El código limpio empieza con funciones."',
    instructions: [
      '📖 function nombre { comando; }',
      '📖 O: nombre() { comando; }',
      '🔧 Las funciones pueden tomar argumentos: $1, $2, etc.',
      '▶ Ejecuta exactamente: mifuncion() { echo "Hola desde función"; }; mifuncion'
    ],
    hints: [
      'Los argumentos en funciones se pasan como: mifuncion arg1 arg2',
      'Acceso con $1, $2 igual que en scripts',
      'Úsalas en loops y condicionales'
    ],
    requiredCommands: ['echo'],
    objectives: [
      {
        id: 1,
        description: 'Define y ejecuta una función',
        type: 'command_output',
        expectedCommand: 'mifuncion() { echo "Hola desde función"; }; mifuncion',
        validationFn: 'output.includes("Hola")'
      }
    ],
    prerequisites: [42],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 44,
    title: 'Contar Archivos',
    description: 'Usa wc y find para contar archivos y líneas',
    world: 3, order: 14, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"¿Cuántos archivos .txt tienes? find | wc -l. ¿Cuántas líneas en total? find | xargs wc -l. Los números revelan patrones."',
    instructions: [
      '📖 find . -name "*.txt" | wc -l cuenta archivos',
      '📖 find . -name "*.txt" | xargs wc -l cuenta líneas totales',
      '▶ Paso 1: Ejecuta exactamente: find /reino -name "*.txt" -type f | wc -l',
      '▶ Paso 2: Luego ejecuta: find /reino -name "*.txt" -type f | head -5'
    ],
    hints: [
      'wc -l cuenta líneas',
      'find + wc = análisis de código',
      'head -5 muestra primeros 5'
    ],
    requiredCommands: ['find', 'wc'],
    objectives: [
      {
        id: 1,
        description: 'Cuenta archivos .txt en /reino',
        type: 'command_output',
        expectedCommand: 'find /reino -name "*.txt" -type f | wc -l',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [43],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 45,
    title: 'Búsqueda Avanzada con find',
    description: 'Domina find con filtros por tipo, tamaño, fecha',
    world: 3, order: 15, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"find es más poderosa que parece. find -type f -size +1M = archivos mayores a 1MB. find -mtime -7 = modificados en últimos 7 días. Las búsquedas revelan secretos."',
    instructions: [
      '📖 find -type f = solo archivos',
      '📖 find -type d = solo directorios',
      '📖 find -size +1M = mayores a 1MB',
      '📖 find -mtime -7 = modificados hace menos de 7 días',
      '▶ Paso 1: Ejecuta exactamente: find /etc -type f -name "*.conf" 2>/dev/null | head -5',
      '▶ Paso 2: Luego ejecuta: find /reino -type f -size +0'
    ],
    hints: [
      '2>/dev/null oculta errores de permiso',
      '-mtime = modification time (en días)',
      '-atime = access time'
    ],
    requiredCommands: ['find'],
    objectives: [
      {
        id: 1,
        description: 'Busca archivos de configuración',
        type: 'command_output',
        expectedCommand: 'find /etc -type f -name "*.conf" 2>/dev/null | head -5',
        validationFn: 'output.length >= 0'
      },
      {
        id: 2,
        description: 'Busca archivos en /reino',
        type: 'command_output',
        expectedCommand: 'find /reino -type f -size +0',
        validationFn: 'output.includes(".txt") || output.length > 0'
      }
    ],
    prerequisites: [44],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 46,
    title: 'Búsqueda de Texto Global',
    description: 'Usa grep recursivo para buscar en múltiples archivos',
    world: 3, order: 16, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"grep -r busca en todos los archivos de un directorio. Busca patrones globales. grep -r "TODO" . encuentra tareas pendientes en tu código."',
    instructions: [
      '📖 grep -r patrón directorio busca recursivamente',
      '📖 grep -n patrón archivo = muestra números de línea',
      '📖 grep -i patrón = insensible a mayúsculas',
      '▶ Paso 1: Ejecuta exactamente: grep -r "NAME" /reino --include="*.txt"',
      '▶ Paso 2: Luego ejecuta: grep -n "Linux" /etc/os-release'
    ],
    hints: [
      '--include="*.txt" limita búsqueda a .txt',
      '--exclude=".git" excluye directorios',
      '-c = cuenta líneas que coinciden'
    ],
    requiredCommands: ['grep'],
    objectives: [
      {
        id: 1,
        description: 'Busca "NAME" recursivamente en /reino',
        type: 'command_output',
        expectedCommand: 'grep -r "NAME" /reino --include="*.txt"',
        validationFn: 'output.includes("NAME") || output.length > 0'
      },
      {
        id: 2,
        description: 'Busca con números de línea',
        type: 'command_output',
        expectedCommand: 'grep -n "Linux" /etc/os-release',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [45],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 47,
    title: 'Procesamiento de Datos en Masa',
    description: 'Combina find, grep, sed para procesamiento masivo',
    world: 3, order: 17, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"Eres un mago verdadero cuando combinas herramientas. find archivos | grep patrones | sed modificaciones. La magia se materializa en pipelines."',
    instructions: [
      '📖 find | grep | sed = búsqueda + filtro + reemplazo',
      '📖 find . -name "*.txt" | xargs grep "error" = busca "error" en todos los .txt',
      '▶ Ejecuta exactamente: find /reino -type f -name "*.txt" | head -10'
    ],
    hints: [
      'Ordena tus pipelines: buscar → filtrar → procesar',
      'Prueba con head -10 para ver primeros 10 resultados',
      'Los pipelines pueden ser muy largos'
    ],
    requiredCommands: ['find', 'grep', 'sed'],
    objectives: [
      {
        id: 1,
        description: 'Combina find con head',
        type: 'command_output',
        expectedCommand: 'find /reino -type f -name "*.txt" | head -10',
        validationFn: 'output.includes(".txt")'
      }
    ],
    prerequisites: [46],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 48,
    title: 'Documentación y Help',
    description: 'Aprende man, info, --help para obtener ayuda',
    world: 3, order: 18, difficulty: 1,
    npc: 'Linux el Sabio',
    story: '"¿Olvidaste una opción? man comando. ¿Necesitas ejemplos? info comando. ¿Solo la sintaxis? comando --help. La ayuda siempre está ahí para los que la buscan."',
    instructions: [
      '📖 man comando = manual detallado',
      '📖 info comando = más detallado que man',
      '📖 comando --help = ayuda rápida',
      '📖 whatis comando = descripción de una línea',
      '📖 apropos palabraClave = busca comandos relacionados',
      '▶ Ejecuta exactamente: man ls | head -20'
    ],
    hints: [
      'En man: q = salir, / = buscar, n = siguiente',
      '--help funciona en casi todos los comandos GNU',
      'apropos es útil cuando no recuerdas el nombre del comando'
    ],
    requiredCommands: ['man'],
    objectives: [
      {
        id: 1,
        description: 'Lee el manual de ls',
        type: 'command_output',
        expectedCommand: 'man ls | head -20',
        validationFn: 'output.includes("LS") || output.includes("ls")'
      }
    ],
    prerequisites: [47],
    rewards: { xp: 70, coins: 15 }
  },

  // ==========================================
  // MUNDO 4: NÚCLEO DEL REINO (17 misiones)
  // Tema 4 LPI: Sistema operativo Linux (peso 8)
  // ==========================================
  {
    id: 49,
    title: 'Procesos: ps y top',
    description: 'Aprende a ver procesos en ejecución',
    world: 4, order: 1, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"Cada programa en ejecución es un proceso. ps muestra procesos actuales. top muestra en tiempo real. El kernel maneja miles. Domina su observación."',
    instructions: [
      '📖 ps = muestra procesos actuales',
      '📖 ps aux = muestra todos los procesos con detalles',
      '📖 top = monitor en tiempo real (Ctrl+C para salir)',
      '🔧 ps aux | grep nombre busca un proceso específico',
      '▶ Paso 1: Ejecuta exactamente: ps',
      '▶ Paso 2: Luego ejecuta: ps aux | head -10'
    ],
    hints: [
      'PID = Process ID (identificador único)',
      'USER = propietario del proceso',
      'COMMAND = qué comando es el proceso'
    ],
    requiredCommands: ['ps', 'top'],
    objectives: [
      {
        id: 1,
        description: 'Muestra procesos del usuario',
        type: 'command_output',
        expectedCommand: 'ps',
        validationFn: 'output.includes("PID") || output.includes("CMD")'
      },
      {
        id: 2,
        description: 'Muestra todos los procesos',
        type: 'command_output',
        expectedCommand: 'ps aux | head -10',
        validationFn: 'output.includes("root") || output.includes("USER")'
      }
    ],
    prerequisites: [48],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 50,
    title: '👹 BOSS: El Gobernador de Procesos',
    description: 'Controla procesos: kill, nice, daemon',
    world: 4, order: 2, difficulty: 3,
    npc: 'Kernel el Forjador',
    story: '"El Gobernador de Procesos te enseña a terminar procesos, cambiar prioridades, crear daemons. kill -9 = ejecución sumaria. nice = ajusta prioridad. El control del kernel es poder absoluto."',
    instructions: [
      '📖 kill PID termina un proceso (graceful)',
      '📖 kill -9 PID termina forzado (SIGKILL)',
      '📖 nice -n 10 comando ejecuta con baja prioridad',
      '📖 renice prioridad -p PID cambia prioridad',
      '▶ Ejecuta exactamente: ps aux | grep bash'
    ],
    hints: [
      'Señales: SIGTERM (15) = graceful, SIGKILL (9) = forzado',
      'nice values: -20 (alta prioridad) a 19 (baja)',
      'Solo root puede aumentar prioridad (valores negativos)'
    ],
    requiredCommands: ['kill', 'ps', 'nice'],
    objectives: [
      {
        id: 1,
        description: 'Lista procesos bash',
        type: 'command_output',
        expectedCommand: 'ps aux | grep bash',
        validationFn: 'output.includes("bash")'
      }
    ],
    prerequisites: [49],
    rewards: { xp: 150, coins: 50 }
  },

  {
    id: 51,
    title: 'Empaquetamiento: tar y gzip',
    description: 'Aprende tar para crear archives y gzip para comprimir',
    world: 4, order: 3, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"tar agrupa múltiples archivos en uno. gzip los comprime. tar + gzip = .tar.gz. La distribución de software depende de esto."',
    instructions: [
      '📖 tar -cf archivo.tar directorio crea archivo tar',
      '📖 tar -xf archivo.tar extrae',
      '📖 tar -czf archivo.tar.gz directorio crea tar comprimido',
      '📖 tar -tzf archivo.tar.gz lista contenido',
      '▶ Paso 1: Ejecuta exactamente: tar -czf prueba.tar.gz /reino --exclude=.git 2>/dev/null',
      '▶ Paso 2: Luego ejecuta: tar -tzf prueba.tar.gz | head -10'
    ],
    hints: [
      'c = create, x = extract, f = file, z = gzip, v = verbose',
      'tar.gz es estándar en Linux',
      'zip es más común en Windows'
    ],
    requiredCommands: ['tar', 'gzip'],
    objectives: [
      {
        id: 1,
        description: 'Crea un tar.gz',
        type: 'command_output',
        expectedCommand: 'tar -czf prueba.tar.gz /reino --exclude=.git 2>/dev/null',
        validationFn: 'output.length === 0 || output.length > 0'
      },
      {
        id: 2,
        description: 'Lista contenido del tar.gz',
        type: 'command_output',
        expectedCommand: 'tar -tzf prueba.tar.gz | head -10',
        validationFn: 'output.includes("/")'
      }
    ],
    prerequisites: [50],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 52,
    title: 'Información del Sistema',
    description: 'Aprende uname, uptime, free, df, du',
    world: 4, order: 4, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"¿Cuánto tiempo lleva corriendo? uptime. ¿Cuánta RAM libre? free. ¿Cuánto espacio disco? df. ¿Qué es tan grande? du. Los números revelan el estado del reino."',
    instructions: [
      '📖 uname -a = sistema operativo',
      '📖 uptime = cuánto tiempo corriendo',
      '📖 free -h = memoria libre (human-readable)',
      '📖 df -h = espacio en disco (por filesystem)',
      '📖 du -sh directorio = tamaño del directorio',
      '▶ Paso 1: Ejecuta exactamente: uptime',
      '▶ Paso 2: Luego ejecuta: free -h'
    ],
    hints: [
      '-h = human-readable (MB, GB, etc)',
      'df muestra por filesystem',
      'du = disk usage (qué carpeta ocupa espacio)'
    ],
    requiredCommands: ['uname', 'uptime', 'free', 'df', 'du'],
    objectives: [
      {
        id: 1,
        description: 'Muestra uptime del sistema',
        type: 'command_output',
        expectedCommand: 'uptime',
        validationFn: 'output.includes("up")'
      },
      {
        id: 2,
        description: 'Muestra memoria libre',
        type: 'command_output',
        expectedCommand: 'free -h',
        validationFn: 'output.includes("Mem")'
      }
    ],
    prerequisites: [51],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 53,
    title: 'Información de Hardware',
    description: 'Usa lscpu, lsmem, lsblk para hardware',
    world: 4, order: 5, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"lscpu muestra CPU. lsmem muestra RAM. lsblk muestra discos. Son los sentidos del kernel hacia el hardware."',
    instructions: [
      '📖 lscpu = información de procesador',
      '📖 lsmem = información de memoria',
      '📖 lsblk = información de bloques (discos)',
      '📖 cat /proc/cpuinfo = CPU (nivel kernel)',
      '▶ Paso 1: Ejecuta exactamente: lscpu | head -10',
      '▶ Paso 2: Luego ejecuta: lsblk'
    ],
    hints: [
      '/proc/cpuinfo es muy detallado',
      'lscpu es resumen amigable',
      'lsblk muestra jerarquía disco/particiones'
    ],
    requiredCommands: ['lscpu', 'lsblk'],
    objectives: [
      {
        id: 1,
        description: 'Muestra CPU info',
        type: 'command_output',
        expectedCommand: 'lscpu | head -10',
        validationFn: 'output.includes("CPU")'
      },
      {
        id: 2,
        description: 'Muestra discos/particiones',
        type: 'command_output',
        expectedCommand: 'lsblk',
        validationFn: 'output.includes("NAME") || output.length > 0'
      }
    ],
    prerequisites: [52],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 54,
    title: 'Gestión de Archivos: file y stat',
    description: 'Identifica tipo de archivo y metadatos',
    world: 4, order: 6, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"file identifica tipo de archivo (texto, binario, imagen, etc.). stat muestra metadatos (tamaño, permisos, timestamps). Los detalles importan."',
    instructions: [
      '📖 file archivo = tipo de archivo',
      '📖 stat archivo = metadatos detallados',
      '📖 file -i archivo = tipo MIME',
      '▶ Paso 1: Ejecuta exactamente: file /etc/os-release',
      '▶ Paso 2: Luego ejecuta: stat /etc/os-release'
    ],
    hints: [
      'file usa "magia" (bytes especiales) para identificar',
      'stat muestra: tamaño, permisos, propietario, timestamps',
      'MIME = tipo de contenido (text/plain, application/json, etc.)'
    ],
    requiredCommands: ['file', 'stat'],
    objectives: [
      {
        id: 1,
        description: 'Identifica tipo de /etc/os-release',
        type: 'command_output',
        expectedCommand: 'file /etc/os-release',
        validationFn: 'output.includes("text") || output.includes("ASCII")'
      },
      {
        id: 2,
        description: 'Muestra metadatos',
        type: 'command_output',
        expectedCommand: 'stat /etc/os-release',
        validationFn: 'output.includes("Size") || output.includes("Access")'
      }
    ],
    prerequisites: [53],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 55,
    title: 'Búsqueda de Comandos',
    description: 'Usa which, whereis, type para localizar programas',
    world: 4, order: 7, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"which encuentra un programa en PATH. whereis busca más ampliamente. type muestra si es comando builtin o externo. Localizar es necesario."',
    instructions: [
      '📖 which comando = ruta del programa en PATH',
      '📖 whereis comando = búsqueda más amplia',
      '📖 type comando = tipo (builtin, alias, comando)',
      '▶ Paso 1: Ejecuta exactamente: which bash',
      '▶ Paso 2: Luego ejecuta: type ls'
    ],
    hints: [
      'which falla si no existe el comando',
      'whereis busca man pages también',
      'Builtins (cd, echo) no tienen "ruta" en which'
    ],
    requiredCommands: ['which', 'whereis', 'type'],
    objectives: [
      {
        id: 1,
        description: 'Localiza bash',
        type: 'command_output',
        expectedCommand: 'which bash',
        validationFn: 'output.includes("/bash")'
      },
      {
        id: 2,
        description: 'Determina tipo de ls',
        type: 'command_output',
        expectedCommand: 'type ls',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [54],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 56,
    title: 'Ayuda en Línea: apropos y whatis',
    description: 'Busca comandos relacionados por palabra clave',
    world: 4, order: 8, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"apropos palabra busca comandos relacionados. whatis comando da descripción breve. Para aprender nuevos comandos sin Google."',
    instructions: [
      '📖 apropos palabra = busca comando por descripción',
      '📖 whatis comando = descripción de una línea',
      '📖 apropos file = encuentra comandos relacionados con archivos',
      '▶ Paso 1: Ejecuta exactamente: apropos directory',
      '▶ Paso 2: Luego ejecuta: whatis ls'
    ],
    hints: [
      'apropos es excelente para descubrir comandos',
      'whatis requiere database actualizada (updatedb)',
      'Búsquedas específicas funcionan mejor'
    ],
    requiredCommands: ['apropos', 'whatis'],
    objectives: [
      {
        id: 1,
        description: 'Busca comandos sobre directorios',
        type: 'command_output',
        expectedCommand: 'apropos directory',
        validationFn: 'output.length > 0'
      },
      {
        id: 2,
        description: 'Obtén descripción de ls',
        type: 'command_output',
        expectedCommand: 'whatis ls',
        validationFn: 'output.includes("list")'
      }
    ],
    prerequisites: [55],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 57,
    title: 'Gestión de Paquetes (1/2)',
    description: 'Aprende apt/apk para instalar software',
    world: 4, order: 9, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"apt es el gestor de Debian. apk es el de Alpine. Instalan, actualizan, desinstalan. apt update, apt install, apt remove. La automatización del software."',
    instructions: [
      '📖 apt update = actualiza lista de paquetes',
      '📖 apt install paquete = instala',
      '📖 apt remove paquete = desinstala',
      '📖 apt search palabra = busca paquetes',
      '📖 apk (Alpine) = mismo concepto',
      '▶ Ejecuta exactamente: apt search bash 2>/dev/null | head -10'
    ],
    hints: [
      'Requiere permisos root (sudo)',
      'apt update primero, siempre',
      'apk es más rápido (Alpine es más pequeño)'
    ],
    requiredCommands: ['apt'],
    objectives: [
      {
        id: 1,
        description: 'Busca paquetes bash',
        type: 'command_output',
        expectedCommand: 'apt search bash 2>/dev/null | head -10',
        validationFn: 'output.length >= 0'
      }
    ],
    prerequisites: [56],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 58,
    title: 'Gestión de Paquetes (2/2)',
    description: 'Domina apt upgrade y dpkg',
    world: 4, order: 10, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"apt upgrade actualiza paquetes instalados. dpkg maneja archivos .deb directamente. Mantener software actualizado es seguridad."',
    instructions: [
      '📖 apt upgrade = actualiza paquetes',
      '📖 apt full-upgrade = upgrade más agresivo',
      '📖 dpkg -l = lista paquetes instalados',
      '📖 dpkg -S archivo = qué paquete contiene archivo',
      '▶ Paso 1: Ejecuta exactamente: dpkg -l | head -10',
      '▶ Paso 2: Luego ejecuta: dpkg -S /bin/bash'
    ],
    hints: [
      'dpkg = Debian Package (bajo nivel)',
      'apt = gestor de alto nivel sobre dpkg',
      'apt es más seguro (resuelve dependencias)'
    ],
    requiredCommands: ['dpkg'],
    objectives: [
      {
        id: 1,
        description: 'Lista paquetes instalados',
        type: 'command_output',
        expectedCommand: 'dpkg -l | head -10',
        validationFn: 'output.includes("ii")'
      },
      {
        id: 2,
        description: 'Encuentra paquete de /bin/bash',
        type: 'command_output',
        expectedCommand: 'dpkg -S /bin/bash',
        validationFn: 'output.includes("bash")'
      }
    ],
    prerequisites: [57],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 59,
    title: 'Redes: Conectividad Básica',
    description: 'Aprende ping, ifconfig, netstat para redes',
    world: 4, order: 11, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"Las redes conectan reinos. ping verifica conectividad. ifconfig ve interfaces. netstat ve conexiones. La comunicación a través del cable (o aire)."',
    instructions: [
      '📖 ping host = verifica conectividad (Ctrl+C para parar)',
      '📖 ifconfig = configuración de interfaces (o: ip addr)',
      '📖 netstat = tabla de conexiones (o: ss)',
      '📖 ip route = tabla de ruteo',
      '▶ Paso 1: Ejecuta exactamente: ping -c 3 127.0.0.1',
      '▶ Paso 2: Luego ejecuta: ifconfig 2>/dev/null || ip addr'
    ],
    hints: [
      'ping -c 3 = solo 3 pings (no infinito)',
      '127.0.0.1 = localhost (tu máquina)',
      'ifconfig es antiguo, ip addr es nuevo'
    ],
    requiredCommands: ['ping', 'ifconfig'],
    objectives: [
      {
        id: 1,
        description: 'Ping a localhost',
        type: 'command_output',
        expectedCommand: 'ping -c 3 127.0.0.1',
        validationFn: 'output.includes("127.0.0.1") || output.includes("packets")'
      },
      {
        id: 2,
        description: 'Muestra interfaces',
        type: 'command_output',
        expectedCommand: 'ifconfig 2>/dev/null || ip addr',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [58],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 60,
    title: 'DNS y Resolución de Nombres',
    description: 'Usa nslookup y dig para consultar DNS',
    world: 4, order: 12, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"DNS traduce nombres (google.com) a IPs (142.250.x.x). nslookup y dig hacen esas búsquedas. Internet depende de DNS."',
    instructions: [
      '📖 nslookup dominio = busca IP',
      '📖 dig dominio = información detallada de DNS',
      '📖 host dominio = versión simple',
      '▶ Paso 1: Ejecuta exactamente: nslookup localhost',
      '▶ Paso 2: Luego ejecuta: host localhost 2>/dev/null || echo "No disponible"'
    ],
    hints: [
      '127.0.0.1 resuelve a localhost',
      'dig muestra más detalles que nslookup',
      'DNS es fundamental para internet'
    ],
    requiredCommands: ['nslookup', 'dig'],
    objectives: [
      {
        id: 1,
        description: 'Busca localhost',
        type: 'command_output',
        expectedCommand: 'nslookup localhost',
        validationFn: 'output.includes("localhost") || output.includes("127")'
      }
    ],
    prerequisites: [59],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 61,
    title: 'Transferencia de Archivos: scp y rsync',
    description: 'Copia archivos entre máquinas remotas',
    world: 4, order: 13, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"scp copia archivos por SSH. rsync sincroniza directorios. Son el correo postal del reino: entregan datos a lugares lejanos."',
    instructions: [
      '📖 scp archivo usuario@host:ruta = copia a remoto',
      '📖 scp usuario@host:ruta archivo = copia desde remoto',
      '📖 rsync -avz origen destino = sincroniza',
      '▶ Ejecuta exactamente: which scp'
    ],
    hints: [
      'Requiere SSH configurado',
      'rsync es más eficiente (copia solo cambios)',
      'scp usa SSH, es seguro'
    ],
    requiredCommands: ['scp', 'rsync'],
    objectives: [
      {
        id: 1,
        description: 'Verifica que scp existe',
        type: 'command_output',
        expectedCommand: 'which scp',
        validationFn: 'output.includes("scp")'
      }
    ],
    prerequisites: [60],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 62,
    title: 'Servicios y Daemons',
    description: 'Controla servicios con systemctl',
    world: 4, order: 14, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"Los servicios son programas que corren en background. systemctl start/stop/restart los controla. El reino funciona gracias a daemons silenciosos."',
    instructions: [
      '📖 systemctl status servicio = estado',
      '📖 systemctl start servicio = inicia',
      '📖 systemctl stop servicio = detiene',
      '📖 systemctl restart servicio = reinicia',
      '📖 systemctl list-units --type=service = lista servicios',
      '▶ Ejecuta exactamente: systemctl list-units --type=service 2>/dev/null | head -10'
    ],
    hints: [
      'Requiere permisos root',
      'systemd gestiona servicios en sistemas modernos',
      'Los servicios corren en background'
    ],
    requiredCommands: ['systemctl'],
    objectives: [
      {
        id: 1,
        description: 'Lista servicios',
        type: 'command_output',
        expectedCommand: 'systemctl list-units --type=service 2>/dev/null | head -10',
        validationFn: 'output.length >= 0'
      }
    ],
    prerequisites: [61],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 63,
    title: 'Logs del Sistema',
    description: 'Revisa journalctl y /var/log para logs',
    world: 4, order: 15, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"Todo se registra en logs. journalctl muestra logs del sistema. /var/log contiene archivos de log. Los investigadores leen logs para entender qué pasó."',
    instructions: [
      '📖 journalctl = logs del sistema',
      '📖 journalctl -u servicio = logs de un servicio',
      '📖 journalctl -f = sigue logs (tail -f)',
      '📖 ls /var/log = archivos de log tradicionales',
      '▶ Paso 1: Ejecuta exactamente: journalctl --no-pager -n 10',
      '▶ Paso 2: Luego ejecuta: ls /var/log | head -10'
    ],
    hints: [
      'journalctl es nuevo (systemd)',
      '/var/log es tradicional',
      'Los logs son cruciales para debugging'
    ],
    requiredCommands: ['journalctl'],
    objectives: [
      {
        id: 1,
        description: 'Lee últimos 10 logs',
        type: 'command_output',
        expectedCommand: 'journalctl --no-pager -n 10',
        validationFn: 'output.length > 0'
      },
      {
        id: 2,
        description: 'Lista directorio de logs',
        type: 'command_output',
        expectedCommand: 'ls /var/log | head -10',
        validationFn: 'output.includes("log") || output.length > 0'
      }
    ],
    prerequisites: [62],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 64,
    title: 'Configuración del Sistema',
    description: 'Archivos en /etc para configuración global',
    world: 4, order: 16, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"Todo está configurado en /etc. hostname, resolv.conf, fstab, passwd. Cambiar /etc es cambiar el reino. Cuidado con las manos."',
    instructions: [
      '📖 /etc/hostname = nombre de la máquina',
      '📖 /etc/resolv.conf = servidores DNS',
      '📖 /etc/fstab = puntos de montaje',
      '📖 /etc/passwd = usuarios del sistema',
      '▶ Paso 1: Ejecuta exactamente: cat /etc/hostname',
      '▶ Paso 2: Luego ejecuta: head -10 /etc/passwd'
    ],
    hints: [
      'No modificar /etc sin saber qué haces',
      'Backup antes de cambios en /etc',
      'Muchos servicios leen de /etc al iniciar'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Lee hostname',
        type: 'command_output',
        expectedCommand: 'cat /etc/hostname',
        validationFn: 'output.length > 0'
      },
      {
        id: 2,
        description: 'Lee usuarios del sistema',
        type: 'command_output',
        expectedCommand: 'head -10 /etc/passwd',
        validationFn: 'output.includes(":")'
      }
    ],
    prerequisites: [63],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 65,
    title: '👹 BOSS: El Guardián del Núcleo',
    description: 'Demuestra dominio del sistema operativo Linux',
    world: 4, order: 17, difficulty: 3,
    npc: 'Kernel el Forjador',
    story: '"El Guardián del Núcleo te pone última prueba: gestión de procesos, información del sistema, redes, servicios, logs. Solo los verdaderos maestros del kernel avanzan al Mundo 5."',
    instructions: [
      '📖 Prueba final del Mundo 4: dominio del SO Linux',
      '🔧 Debes demostrar: procesos, hardware, redes, servicios, logs',
      '▶ Ejecuta: cat /reino/retos/mundo4-final.txt'
    ],
    hints: [
      'Recuerda: ps, top, lscpu, ping, systemctl, journalctl',
      'Todas las herramientas de Mundo 4 en una prueba',
      'El Guardián es justo pero exigente'
    ],
    requiredCommands: ['cat'],
    objectives: [
      {
        id: 1,
        description: 'Lee el reto final del Guardián',
        type: 'command_output',
        expectedCommand: 'cat /reino/retos/mundo4-final.txt',
        validationFn: 'output.includes("reto") || output.length > 0'
      }
    ],
    prerequisites: [64],
    rewards: { xp: 200, coins: 75 }
  },

  // ==========================================
  // MUNDO 5: BÓVEDAS SECRETAS (15 misiones)
  // Tema 5 LPI: Seguridad y permisos (peso 7)
  // ==========================================
  {
    id: 66,
    title: 'Usuarios y Grupos',
    description: 'Aprende whoami, id, groups para identidades',
    world: 5, order: 1, difficulty: 1,
    npc: 'Sudo-Man el Vigilante',
    story: '"Cada usuario tiene identidad. whoami te dice quién eres. id muestra UID/GID. groups muestra de qué grupos eres miembro. La identidad es la base de la seguridad."',
    instructions: [
      '📖 whoami = quién eres',
      '📖 id = ID de usuario y grupos',
      '📖 groups = grupos de tu usuario',
      '📖 id usuario = información de otro usuario',
      '▶ Paso 1: Ejecuta exactamente: whoami',
      '▶ Paso 2: Luego ejecuta: id'
    ],
    hints: [
      'UID = User ID (número único)',
      'GID = Group ID',
      'root = UID 0'
    ],
    requiredCommands: ['whoami', 'id', 'groups'],
    objectives: [
      {
        id: 1,
        description: 'Muestra tu usuario',
        type: 'command_output',
        expectedCommand: 'whoami',
        validationFn: 'output.length > 0'
      },
      {
        id: 2,
        description: 'Muestra tu información de identidad',
        type: 'command_output',
        expectedCommand: 'id',
        validationFn: 'output.includes("uid") || output.includes("gid")'
      }
    ],
    prerequisites: [65],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 67,
    title: 'El Archivo de Contraseñas',
    description: 'Entiende /etc/passwd y /etc/shadow',
    world: 5, order: 2, difficulty: 2,
    npc: 'Sudo-Man el Vigilante',
    story: '"Las contraseñas no se guardan en /etc/passwd (es visible). Se guardan en /etc/shadow (solo root). /etc/passwd contiene: usuario:x:UID:GID:nombre:home:shell."',
    instructions: [
      '📖 /etc/passwd = información de usuarios (visible)',
      '📖 /etc/shadow = hash de contraseñas (root solo)',
      '📖 Formato /etc/passwd: usuario:x:UID:GID:GECOS:HOME:SHELL',
      '▶ Paso 1: Ejecuta exactamente: cat /etc/passwd | head -5',
      '▶ Paso 2: Luego ejecuta: head -5 /etc/shadow 2>/dev/null || echo "Permisos insuficientes"'
    ],
    hints: [
      'x en /etc/passwd = contraseña en /etc/shadow',
      '/etc/shadow requiere permisos root',
      'Los hashes son irreversibles (seguridad)'
    ],
    requiredCommands: ['cat', 'head'],
    objectives: [
      {
        id: 1,
        description: 'Lee primeros usuarios de /etc/passwd',
        type: 'command_output',
        expectedCommand: 'cat /etc/passwd | head -5',
        validationFn: 'output.includes(":")'
      }
    ],
    prerequisites: [66],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 68,
    title: 'Crear Usuarios Locales',
    description: 'Usa useradd para crear nuevos usuarios',
    world: 5, order: 3, difficulty: 2,
    npc: 'Sudo-Man el Vigilante',
    story: '"useradd crea nuevos usuarios. useradd -m -s /bin/bash usuario crea con home y shell. Solo root puede hacerlo. Nuevas vidas en el reino."',
    instructions: [
      '📖 useradd opciones usuario = crea usuario',
      '📖 useradd -m = crea directorio home',
      '📖 useradd -s /bin/bash = shell login',
      '📖 useradd -G grupo = agrupa desde inicio',
      '▶ Ejecuta exactamente: cat /etc/passwd | grep -E "^(root|sandbox)"'
    ],
    hints: [
      'Requiere permisos root (sudo)',
      '-m es importante (sin home = no funciona)',
      'userdel usuario lo elimina'
    ],
    requiredCommands: ['useradd', 'cat', 'grep'],
    objectives: [
      {
        id: 1,
        description: 'Lista usuarios existentes',
        type: 'command_output',
        expectedCommand: 'cat /etc/passwd | grep -E "^(root|sandbox)"',
        validationFn: 'output.includes(":")'
      }
    ],
    prerequisites: [67],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 69,
    title: 'Crear Grupos',
    description: 'Usa groupadd para crear grupos de usuarios',
    world: 5, order: 4, difficulty: 2,
    npc: 'Sudo-Man el Vigilante',
    story: '"Los grupos agrupan usuarios. groupadd crea grupos. usermod -aG grupo usuario agrega usuario a grupo. Un usuario puede estar en múltiples grupos."',
    instructions: [
      '📖 groupadd grupo = crea grupo',
      '📖 usermod -aG grupo usuario = agrega usuario a grupo',
      '📖 /etc/group lista grupos',
      '📖 /etc/gshadow = grupo passwords (raro)',
      '▶ Paso 1: Ejecuta exactamente: cat /etc/group | head -10',
      '▶ Paso 2: Luego ejecuta: groups'
    ],
    hints: [
      'GID = Group ID',
      'Un usuario tiene grupo principal + grupos secundarios',
      'usermod -aG (append) NO reemplaza'
    ],
    requiredCommands: ['groupadd', 'cat', 'groups'],
    objectives: [
      {
        id: 1,
        description: 'Lista primeros grupos',
        type: 'command_output',
        expectedCommand: 'cat /etc/group | head -10',
        validationFn: 'output.includes(":")'
      },
      {
        id: 2,
        description: 'Lista tus grupos',
        type: 'command_output',
        expectedCommand: 'groups',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [68],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 70,
    title: '👹 BOSS: El Guardián de Seguridad',
    description: 'Controla usuarios, grupos y sudo',
    world: 5, order: 5, difficulty: 3,
    npc: 'Sudo-Man el Vigilante',
    story: '"El Guardián de Seguridad prueba tu dominio: crear usuarios, grupos, sudo. Solo masters de seguridad avanzan. La defensa del reino depende de ti."',
    instructions: [
      '📖 Debes demostrar: crear usuarios, grupos, configure sudo',
      '🔧 sudo permite ejecutar como root sin ser root',
      '▶ Ejecuta: cat /etc/sudoers 2>/dev/null | head -10'
    ],
    hints: [
      'NUNCA edites /etc/sudoers directamente',
      'Usa visudo (editor seguro)',
      'sudo -l lista permisos'
    ],
    requiredCommands: ['cat', 'sudo'],
    objectives: [
      {
        id: 1,
        description: 'Lee sudoers',
        type: 'command_output',
        expectedCommand: 'cat /etc/sudoers 2>/dev/null | head -10',
        validationFn: 'output.length >= 0'
      }
    ],
    prerequisites: [69],
    rewards: { xp: 150, coins: 50 }
  },

  {
    id: 71,
    title: 'SSH Keys: Autenticación Sin Contraseña',
    description: 'Genera ssh-keygen para autenticación por clave',
    world: 5, order: 6, difficulty: 2,
    npc: 'Sudo-Man el Vigilante',
    story: '"SSH keys son más seguras que contraseñas. ssh-keygen genera pares público/privado. La llave privada es secreto. La pública la das. Criptografía asimétrica."',
    instructions: [
      '📖 ssh-keygen -t rsa = genera claves RSA',
      '📖 ~/.ssh/id_rsa = clave privada (SECRETO)',
      '📖 ~/.ssh/id_rsa.pub = clave pública',
      '📖 ~/.ssh/authorized_keys = claves permitidas',
      '▶ Ejecuta exactamente: ls -la ~/.ssh 2>/dev/null || echo "No SSH keys yet"'
    ],
    hints: [
      'Never share id_rsa!',
      'id_rsa.pub es lo que compartes',
      'ssh copia clave pública al servidor remoto'
    ],
    requiredCommands: ['ssh-keygen', 'ls'],
    objectives: [
      {
        id: 1,
        description: 'Verifica SSH keys existentes',
        type: 'command_output',
        expectedCommand: 'ls -la ~/.ssh 2>/dev/null || echo "No SSH keys yet"',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [70],
    rewards: { xp: 80, coins: 20 }
  },

  {
    id: 72,
    title: 'Firewalls: Aceptar/Rechazar Puertos',
    description: 'Aprende ufw para gestionar firewall',
    world: 5, order: 7, difficulty: 2,
    npc: 'Sudo-Man el Vigilante',
    story: '"El firewall es el guardaespaldas de la máquina. Rechaza puertos no permitidos. ufw permite/deniega por puerto. La red está llena de ataques."',
    instructions: [
      '📖 ufw status = estado del firewall',
      '📖 ufw allow 22/tcp = permite SSH',
      '📖 ufw deny 23 = deniega telnet',
      '📖 ufw enable/disable = activa/desactiva',
      '▶ Ejecuta exactamente: ufw status 2>/dev/null || echo "ufw no disponible"'
    ],
    hints: [
      'Puerto 22 = SSH (crucial mantener abierto)',
      'Puerto 80 = HTTP, 443 = HTTPS',
      'Cuidado: un deny mal puede bloquear acceso'
    ],
    requiredCommands: ['ufw'],
    objectives: [
      {
        id: 1,
        description: 'Verifica estado del firewall',
        type: 'command_output',
        expectedCommand: 'ufw status 2>/dev/null || echo "ufw no disponible"',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [71],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 73,
    title: 'Auditoria de Seguridad',
    description: 'Revisa logs de seguridad para ataques',
    world: 5, order: 8, difficulty: 2,
    npc: 'Sudo-Man el Vigilante',
    story: '"Los atacantes dejan rastros en logs. grep "Failed\\" /var/log/auth.log revela intentos fallidos. Un vigilante alerta lee logs constantemente."',
    instructions: [
      '📖 /var/log/auth.log = intentos de login',
      '📖 grep "Failed" /var/log/auth.log = logins fallidos',
      '📖 journalctl -u sshd = logs de SSH',
      '▶ Ejecuta exactamente: grep -c "Failed" /var/log/auth.log 2>/dev/null || echo "0"'
    ],
    hints: [
      'Los logs son la evidencia del crimen',
      'tail -f para monitoring en tiempo real',
      'Demasiados Failed = ataque de fuerza bruta'
    ],
    requiredCommands: ['grep'],
    objectives: [
      {
        id: 1,
        description: 'Cuenta logins fallidos',
        type: 'command_output',
        expectedCommand: 'grep -c "Failed" /var/log/auth.log 2>/dev/null || echo "0"',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [72],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 74,
    title: 'Contraseñas Seguras: passwd',
    description: 'Cambia tu contraseña de forma segura',
    world: 5, order: 9, difficulty: 1,
    npc: 'Sudo-Man el Vigilante',
    story: '"passwd cambia tu contraseña. Una contraseña fuerte: >8 chars, mayús, núm, símbolos. Cambiarla regularmente es seguridad básica. Nunca compartas contraseñas."',
    instructions: [
      '📖 passwd = cambia tu contraseña',
      '📖 passwd usuario = cambiar otra (solo root)',
      '📖 Buena contraseña: mixta, larga, única',
      '📖 Mala: 123456, password, nombre',
      '▶ Ejecuta exactamente: passwd --help 2>&1 | head -10'
    ],
    hints: [
      'Bash: ninguna contraseña almacenada (solo hashes)',
      'Cambiar password frecuentemente (recomendado)',
      'Usa password manager para múltiples contraseñas'
    ],
    requiredCommands: ['passwd'],
    objectives: [
      {
        id: 1,
        description: 'Lee ayuda de passwd',
        type: 'command_output',
        expectedCommand: 'passwd --help 2>&1 | head -10',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [73],
    rewards: { xp: 60, coins: 10 }
  },

  {
    id: 75,
    title: 'SELinux y AppArmor',
    description: 'Aprende sobre MAC (Mandatory Access Control)',
    world: 5, order: 10, difficulty: 3,
    npc: 'Sudo-Man el Vigilante',
    story: '"SELinux y AppArmor son "sandboxes". Limitan incluso a root. Política de seguridad fina. Advanced security para aplicaciones no confiadas."',
    instructions: [
      '📖 SELinux = Security-Enhanced Linux (Red Hat)',
      '📖 AppArmor = alternativa (Debian)',
      '📖 getenforce = muestra estado SELinux',
      '📖 setenforce = cambia modo (Enforcing/Permissive)',
      '▶ Ejecuta exactamente: getenforce 2>/dev/null || echo "SELinux no disponible"'
    ],
    hints: [
      'Enforcing = activo, Permissive = log solo',
      'MAC = control a nivel kernel',
      'Avanzado: no necesario para principiantes'
    ],
    requiredCommands: ['getenforce'],
    objectives: [
      {
        id: 1,
        description: 'Verifica estado SELinux',
        type: 'command_output',
        expectedCommand: 'getenforce 2>/dev/null || echo "SELinux no disponible"',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [74],
    rewards: { xp: 80, coins: 20 }
  },

  {
    id: 76,
    title: 'Escaneo de Vulnerabilidades Locales',
    description: 'Audita tu sistema con herramientas de seguridad',
    world: 5, order: 11, difficulty: 3,
    npc: 'Sudo-Man el Vigilante',
    story: '"Los buenos samaritanos auditan su propio sistema. Buscan vulnerabilidades antes que los atacantes. rkhunter, lynis, aide: herramientas de auditoría."',
    instructions: [
      '📖 rkhunter = busca rootkits',
      '📖 lynis = auditoría de seguridad',
      '📖 aide = integridad de archivos',
      '📖 Instalación: apt install rkhunter',
      '▶ Ejecuta exactamente: which rkhunter 2>/dev/null || echo "rkhunter no instalado"'
    ],
    hints: [
      'Requiere permisos root',
      'Estas herramientas previenen compromisos',
      'Auditoría regular es buena práctica'
    ],
    requiredCommands: ['which'],
    objectives: [
      {
        id: 1,
        description: 'Verifica rkhunter',
        type: 'command_output',
        expectedCommand: 'which rkhunter 2>/dev/null || echo "rkhunter no instalado"',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [75],
    rewards: { xp: 80, coins: 20 }
  },

  {
    id: 77,
    title: 'Encriptación: gpg y openssl',
    description: 'Encripta archivos y datos sensibles',
    world: 5, order: 12, difficulty: 3,
    npc: 'Sudo-Man el Vigilante',
    story: '"gpg encripta archivos con PGP. openssl es más flexible. Archivos cifrados: imposible leer sin clave. Para datos verdaderamente sensibles."',
    instructions: [
      '📖 gpg -c archivo = encripta con contraseña',
      '📖 gpg archivo.gpg = desencripta',
      '📖 openssl enc -aes-256-cbc -in archivo = encripta',
      '▶ Ejecuta exactamente: which gpg'
    ],
    hints: [
      'gpg usa claves asimétricas (público/privado)',
      'openssl usa simétrico (una contraseña)',
      'Criptografía: ciencia de la privacidad'
    ],
    requiredCommands: ['gpg', 'openssl'],
    objectives: [
      {
        id: 1,
        description: 'Verifica gpg',
        type: 'command_output',
        expectedCommand: 'which gpg',
        validationFn: 'output.includes("gpg")'
      }
    ],
    prerequisites: [76],
    rewards: { xp: 80, coins: 20 }
  },

  {
    id: 78,
    title: 'Listas de Control de Acceso (ACLs)',
    description: 'Permisos granulares más allá de rwx',
    world: 5, order: 13, difficulty: 3,
    npc: 'Sudo-Man el Vigilante',
    story: '"chmod rwx es grueso. ACLs permiten control fino: "dar permiso de lectura a usuario X solo a archivo Y". setfacl y getfacl: granularidad total."',
    instructions: [
      '📖 setfacl -m u:usuario:rx archivo = permisos granulares',
      '📖 getfacl archivo = lee ACLs',
      '📖 setfacl -x usuario archivo = revoca',
      '▶ Ejecuta exactamente: getfacl / 2>/dev/null | head -10'
    ],
    hints: [
      'ACL = Access Control List',
      'Más control que permisos tradicionales',
      'Útil para ambientes complejos'
    ],
    requiredCommands: ['setfacl', 'getfacl'],
    objectives: [
      {
        id: 1,
        description: 'Lee ACLs de raíz',
        type: 'command_output',
        expectedCommand: 'getfacl / 2>/dev/null | head -10',
        validationFn: 'output.length >= 0'
      }
    ],
    prerequisites: [77],
    rewards: { xp: 80, coins: 20 }
  },

  {
    id: 79,
    title: 'Copias de Seguridad',
    description: 'Estrategia de backup con tar y rsync',
    world: 5, order: 14, difficulty: 2,
    npc: 'Sudo-Man el Vigilante',
    story: '"Los datos perdidos = desastre. Backups son seguros. tar crea snapshots. rsync sincroniza incremental. 3-2-1 rule: 3 copias, 2 medios, 1 offsite."',
    instructions: [
      '📖 tar -czf backup.tar.gz directorio = crea backup',
      '📖 rsync -avz --backup --delete origen/ destino/ = sync incremental',
      '📖 Prueba restaurar regularmente (importante!)',
      '▶ Ejecuta exactamente: tar -tzf backup.tar.gz 2>/dev/null | head -5 || echo "Sin backup aún"'
    ],
    hints: [
      '3-2-1: 3 copias, 2 medios diferentes, 1 offsite',
      'Verificar backups regularmente (restores)',
      'Sin backup = vulnerabilidad crítica'
    ],
    requiredCommands: ['tar', 'rsync'],
    objectives: [
      {
        id: 1,
        description: 'Verifica backup',
        type: 'command_output',
        expectedCommand: 'tar -tzf backup.tar.gz 2>/dev/null | head -5 || echo "Sin backup aún"',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [78],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 80,
    title: 'Bug Bounty y Responsabilidad',
    description: 'Reporta vulnerabilidades responsablemente',
    world: 5, order: 15, difficulty: 2,
    npc: 'Sudo-Man el Vigilante',
    story: '"Si encuentras vulnerabilidades: NO explotes. Reporta responsablemente. Bug bounty programs pagan por reportes. El hacker ético ayuda a defender."',
    instructions: [
      '📖 Responsible disclosure: privado primero, público después',
      '📖 HackerOne, Bugcrowd: plataformas de bug bounty',
      '📖 CVE = Common Vulnerabilities and Exposures',
      '▶ Ejecuta exactamente: echo "Seguridad responsable es la mejor práctica"'
    ],
    hints: [
      'Never use vulnerabilities for evil',
      'Bug bounty: legal y pagado',
      'The best hackers protect systems'
    ],
    requiredCommands: ['echo'],
    objectives: [
      {
        id: 1,
        description: 'Aprende sobre seguridad responsable',
        type: 'command_output',
        expectedCommand: 'echo "Seguridad responsable"',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [79],
    rewards: { xp: 100, coins: 25 }
  },

  // ==========================================
  // EXTRAS: REFUERZO (5 misiones)
  // IDs 81-85
  // ==========================================
  {
    id: 81,
    title: 'Refuerzo: Comandos Básicos Repaso',
    description: 'Repasa ls, cd, pwd, cat, cp, mv, rm',
    world: 0, order: 1, difficulty: 1,
    npc: 'Linux el Sabio',
    story: '"La práctica hace perfecto. Repasemos los fundamentales sin los cuales no hay maestría. Básicos, pero absolutamente esenciales."',
    instructions: [
      '📖 ls = lista archivos',
      '📖 cd = cambiar directorio',
      '📖 pwd = ver ubicación actual',
      '📖 cat/head/tail = leer archivos',
      '📖 cp/mv/rm = copiar/mover/eliminar',
      '▶ Práctica: ejecuta 5 comandos diferentes'
    ],
    hints: [
      'Practica en /reino/test/',
      'Combina comandos con pipes',
      'La velocidad viene con repetición'
    ],
    requiredCommands: ['ls', 'cd', 'pwd', 'cat'],
    objectives: [
      {
        id: 1,
        description: 'Lista tu directorio actual',
        type: 'command_output',
        expectedCommand: 'ls',
        validationFn: 'output.length > 0'
      }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },

  {
    id: 82,
    title: 'Refuerzo: Búsqueda y Procesamiento',
    description: 'Repasa find, grep, sed, awk',
    world: 0, order: 2, difficulty: 2,
    npc: 'Grep-ild el Rastreador',
    story: '"Buscar y procesar datos son habilidades clave. find localiza. grep filtra. sed y awk transforman. El poder de los datos está en tu mano."',
    instructions: [
      '📖 find = buscar archivos',
      '📖 grep = filtrar por contenido',
      '📖 sed = buscar-reemplazar',
      '📖 awk = procesador de columnas',
      '▶ Práctica: busca un patrón en /reino/'
    ],
    hints: [
      'Combina find | grep | sed',
      'Los pipelines hacen la magia',
      'Practica con datos reales'
    ],
    requiredCommands: ['find', 'grep', 'sed'],
    objectives: [
      {
        id: 1,
        description: 'Busca en /reino',
        type: 'command_output',
        expectedCommand: 'find /reino -name "*.txt" -type f | head -5',
        validationFn: 'output.includes(".txt")'
      }
    ],
    prerequisites: [81],
    rewards: { xp: 70, coins: 15 }
  },

  {
    id: 83,
    title: 'Refuerzo: Scripting Bash',
    description: 'Repasa loops, condicionales, funciones',
    world: 0, order: 3, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"Los scripts automatizan. for loops, if condicionales, funciones: la trilogía del scripting. Automatización = poder."',
    instructions: [
      '📖 for i in lista; do comando; done',
      '📖 if [ condición ]; then; else; fi',
      '📖 function nombre { comando; }',
      '📖 Variables: nombre=valor, acceso: $nombre',
      '▶ Crea un script que use todas'
    ],
    hints: [
      'Los scripts son programas bash',
      'chmod +x hace ejecutable',
      'Debug: bash -x script.sh'
    ],
    requiredCommands: ['bash', 'echo'],
    objectives: [
      {
        id: 1,
        description: 'Ejecuta un for loop',
        type: 'command_output',
        expectedCommand: 'for i in 1 2 3 4 5; do echo $i; done',
        validationFn: 'output.includes("1") && output.includes("5")'
      }
    ],
    prerequisites: [82],
    rewards: { xp: 100, coins: 25 }
  },

  {
    id: 84,
    title: 'Refuerzo: Permisos y Seguridad',
    description: 'Repasa chmod, chown, permisos',
    world: 0, order: 4, difficulty: 2,
    npc: 'Chmod-ard el Guardián de Permisos',
    story: '"La seguridad empieza con permisos. chmod controla acceso. chown cambia propietario. Errores = brechas de seguridad."',
    instructions: [
      '📖 chmod 755 = rwxr-xr-x',
      '📖 chmod 644 = rw-r--r--',
      '📖 chmod -R = recursivo',
      '📖 chown usuario:grupo archivo',
      '▶ Práctica: cambia permisos en /tmp/'
    ],
    hints: [
      '7=rwx, 6=rw-, 5=r-x, 4=r--, 0=---',
      '755 = ejecutable, 644 = archivo',
      'Permisos son la base de Unix'
    ],
    requiredCommands: ['chmod', 'chown'],
    objectives: [
      {
        id: 1,
        description: 'Crea archivo con permisos 644',
        type: 'command_output',
        expectedCommand: 'touch permisos.txt && chmod 644 permisos.txt && ls -la permisos.txt',
        validationFn: 'output.includes("644") || output.includes("rw-r--r--")'
      }
    ],
    prerequisites: [83],
    rewards: { xp: 80, coins: 20 }
  },

  {
    id: 85,
    title: '🏆 FINAL: Maestre de Linux',
    description: 'Demuestra tu dominio completo de Linux',
    world: 0, order: 5, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"Completaste el Reino del Kernel. 85 misiones, 5 mundos, 5 bosses. Ahora eres Maestre de Linux. El viaje fue largo, pero valió cada paso. Bienvenido al círculo de los verdaderos guerreros del terminal."',
    instructions: [
      '📖 Felicitaciones: completaste LinuxQuest',
      '📖 Aprendiste 75+ comandos y conceptos clave de LPI Linux Essentials 010-160',
      '📖 Ahora puedes: administrar sistemas, automatizar tareas, asegurar infraestructura',
      '🏆 Eres ahora un Maestre certificado en nuestro reino digital'
    ],
    hints: [
      'Este viaje es solo el comienzo',
      'Linux es infinito: sigue aprendiendo',
      'Practica: la clave de la maestría'
    ],
    requiredCommands: ['echo'],
    objectives: [
      {
        id: 1,
        description: 'Celebra tu logro',
        type: 'command_output',
        expectedCommand: 'echo "Soy Maestre de Linux"',
        validationFn: 'output.includes("Linux")'
      }
    ],
    prerequisites: [84],
    rewards: { xp: 500, coins: 200 }
  }
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
    console.log(`✅ Seeded ${quests.length} quests (85 total: 12+18+18+17+15+5)`);
  } catch (e) {
    console.error('❌ Seed error:', e.message);
  } finally {
    client.release();
  }
}

seedQuests();

seedQuests();
