import pool from '../src/db.js';

const quests = [
  // ==========================================
  // MUNDO 1: EL CASTILLO DEL CONOCIMIENTO (12 misiones)
  // Tema 1 LPI: Comunidad Linux y código abierto (peso 7)
  // ==========================================
  {
    id: 1,
    title: 'El Despertar del Iniciado',
    description: 'Usa uname para revelar los secretos de tu sistema',
    world: 1, order: 1, difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'El anciano sabio te recibe en las puertas del Castillo del Conocimiento. "Antes de emprender tu viaje, joven aprendiz, debes conocer el suelo que pisas. El hechizo uname revela la identidad completa de tu sistema: kernel, version, arquitectura."',
    hints: ['uname -a muestra TODO: kernel, version, arquitectura, SO', 'uname sin opciones muestra solo el nombre del kernel', 'uname -r muestra solo la version del kernel'],
    requiredCommands: ['uname'],
    objectives: [
      { id: 1, description: 'Revela los secretos de tu sistema con uname -a', type: 'command_output', command: 'uname -a', validationFn: 'output.includes("Linux")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 2,
    title: 'Identificando el Reino',
    description: 'Lee el pergamino /etc/os-release para conocer tu distribución',
    world: 1, order: 2, difficulty: 1,
    npc: 'Linux el Sabio',
    story: '"Cada reino tiene su estandarte. Tu distribución es tu bandera en batalla. En el archivo /etc/os-release encontraras el nombre, version e identificacion de tu clan. Usa cat para leerlo."',
    hints: ['cat /etc/os-release muestra la informacion de tu distro', 'Busca las lineas NAME= y VERSION=', 'Cada distribucion tiene su propio contenido'],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee el pergamino de identificacion de tu reino', type: 'command_output', command: 'cat /etc/os-release', validationFn: 'output.includes("NAME=")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 3,
    title: 'Las Familias del Reino',
    description: 'Explora los clanes de distribuciones en /reino/distros/',
    world: 1, order: 3, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Las distribuciones son clanes ancestrales. En /reino/distros/ encontraras pergaminos sobre cada familia: Debian, Red Hat, Arch, SUSE. Explora con ls y lee con cat para conocer a cada clan."',
    hints: ['ls /reino/distros/ te muestra los archivos de cada familia', 'cat /reino/distros/debian.txt te cuenta sobre Debian', 'cat /reino/distros/familias.txt tiene el resumen completo'],
    requiredCommands: ['ls', 'cat'],
    objectives: [
      { id: 1, description: 'Lista los pergaminos de las familias del reino', type: 'command_output', command: 'ls /reino/distros/', validationFn: 'output.includes("debian")' },
      { id: 2, description: 'Lee el pergamino de la familia Debian', type: 'command_output', command: 'cat /reino/distros/debian.txt', validationFn: 'output.includes("Ubuntu")' }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 4,
    title: 'El Estandarte del León',
    description: 'Descubre qué gestor de paquetes usa tu sistema',
    world: 1, order: 4, difficulty: 1,
    npc: 'Linux el Sabio',
    story: '"Cada clan tiene su herrero de paquetes. Usa which para buscar el gestor de tu reino. Si es apt, perteneces a Debian. Si es dnf, a Red Hat. Si es pacman, a Arch."',
    hints: ['which busca ejecutables en el PATH', 'apt = Debian/Ubuntu', 'dnf = Fedora/RHEL', 'pacman = Arch'],
    requiredCommands: ['which'],
    objectives: [
      { id: 1, description: 'Busca el gestor de paquetes de tu reino', type: 'command_output', command: 'which apt || which dnf || which pacman || echo "No encontrado"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 5,
    title: 'El Lenguaje del Sistema',
    description: 'Usa uname -s para revelar solo el nombre del SO',
    world: 1, order: 5, difficulty: 1,
    npc: 'Linux el Sabio',
    story: '"uname tiene muchos secretos. Con -s revela solo el nombre del sistema operativo. Con -m la arquitectura. Con -r la version del kernel. Cada opcion es una perspectiva diferente."',
    hints: ['uname -s muestra solo el nombre del SO', 'uname -m muestra la arquitectura (x86_64, aarch64)', 'uname -r muestra solo la version del kernel'],
    requiredCommands: ['uname'],
    objectives: [
      { id: 1, description: 'Revela solo el nombre de tu sistema operativo', type: 'command_output', command: 'uname -s', validationFn: 'output.includes("Linux")' },
      { id: 2, description: 'Revela tu arquitectura de procesador', type: 'command_output', command: 'uname -m', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 6,
    title: 'Sistemas Embebidos y la Nube',
    description: 'Lee sobre Android, Raspberry Pi y Cloud Computing',
    world: 1, order: 6, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Linux no solo vive en PCs. En /reino/distros/embebidos.txt descubriras como Android usa un kernel modificado, como Raspberry Pi lleva Linux a dispositivos pequenos, y como el 90% de la nube publica corre Linux."',
    hints: ['cat /reino/distros/embebidos.txt tiene toda la info', 'Android usa kernel Linux MODIFICADO (no es Linux puro)', 'Raspberry Pi usa procesador ARM'],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee el pergamino de sistemas embebidos', type: 'command_output', command: 'cat /reino/distros/embebidos.txt', validationFn: 'output.includes("Android")' }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 7,
    title: 'Las Herramientas Libres',
    description: 'Explora el software libre en /reino/software/',
    world: 1, order: 7, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"En el reino del software libre, cada herramienta propietaria tiene su equivalente. En /reino/software/ descubriras alternativas libres para ofimatica, multimedia, servidores y mas."',
    hints: ['ls /reino/software/ te muestra las categorias', 'cat /reino/software/escritorio.txt = alternativas de ofimatica', 'GIMP = Photoshop, LibreOffice = Microsoft Office'],
    requiredCommands: ['ls', 'cat'],
    objectives: [
      { id: 1, description: 'Lista las categorias de software libre', type: 'command_output', command: 'ls /reino/software/', validationFn: 'output.includes("escritorio")' },
      { id: 2, description: 'Lee las alternativas de escritorio', type: 'command_output', command: 'cat /reino/software/escritorio.txt', validationFn: 'output.includes("LibreOffice")' }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 8,
    title: 'El Pacto de la Libertad',
    description: 'Lee sobre las 4 libertades del software libre',
    world: 1, order: 8, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Las Cuatro Libertades son el codigo de honor del reino. En /reino/historia/stallman.txt descubriras como Richard Stallman las creo. Usa grep para buscar la palabra libertad en los pergaminos."',
    hints: ['cat /reino/historia/stallman.txt tiene las 4 libertades', 'grep "libertad" /reino/historia/*.txt busca en todos los pergaminos', 'Las libertades son: Usar, Estudiar, Distribuir, Modificar'],
    requiredCommands: ['cat', 'grep'],
    objectives: [
      { id: 1, description: 'Lee el pergamino de Richard Stallman', type: 'command_output', command: 'cat /reino/historia/stallman.txt', validationFn: 'output.includes("libertades")' },
      { id: 2, description: 'Busca la palabra "libertad" en los pergaminos', type: 'command_output', command: 'grep -i "libertad" /reino/historia/*.txt 2>/dev/null | head -3', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 9,
    title: 'Las Licencias Sagradas',
    description: 'Compara GPL, MIT, BSD y Apache en /reino/licencias/',
    world: 1, order: 9, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"Las licencias son los tratados que rigen el reino. En /reino/licencias/ encontraras los pergaminos de GPL, MIT, BSD y Apache. Cada una define que puedes hacer con el software."',
    hints: ['ls /reino/licencias/ te muestra los pergaminos', 'GPL = copyleft (modificaciones deben ser libres)', 'MIT = permisiva (puedes hacer lo que quieras)'],
    requiredCommands: ['ls', 'cat'],
    objectives: [
      { id: 1, description: 'Lista los pergaminos de licencias', type: 'command_output', command: 'ls /reino/licencias/', validationFn: 'output.includes("gpl")' },
      { id: 2, description: 'Lee el pergamino de GPL', type: 'command_output', command: 'cat /reino/licencias/gpl.txt', validationFn: 'output.includes("Copyleft")' },
      { id: 3, description: 'Lee el pergamino de MIT', type: 'command_output', command: 'cat /reino/licencias/mit.txt', validationFn: 'output.includes("Permisiva")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 10,
    title: 'El Escritorio del Guerrero',
    description: 'Descubre los entornos gráficos y tu shell',
    world: 1, order: 10, difficulty: 1,
    npc: 'Linux el Sabio',
    story: '"Los entornos graficos son las armaduras visuales del guerrero. En /reino/software/escritorios.txt descubriras GNOME, KDE, XFCE y mas. Tu shell ($SHELL) es tu arma principal."',
    hints: ['cat /reino/software/escritorios.txt describe cada entorno', 'echo $SHELL muestra tu shell actual', 'echo $USER muestra tu nombre de usuario'],
    requiredCommands: ['cat', 'echo'],
    objectives: [
      { id: 1, description: 'Lee sobre los entornos de escritorio', type: 'command_output', command: 'cat /reino/software/escritorios.txt', validationFn: 'output.includes("GNOME")' },
      { id: 2, description: 'Muestra tu shell y usuario actual', type: 'command_output', command: 'echo "Usuario: $USER Shell: $SHELL"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 11,
    title: 'La Nube Mágica',
    description: 'Conecta con el mundo exterior usando curl',
    world: 1, order: 11, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"El 90% de la nube publica corre Linux. AWS, Azure, GCP son los grandes reinos en las nubes. Usa curl para tocar la puerta del mundo exterior y verificar que tu conexion con el reino funciona."',
    hints: ['curl hace peticiones HTTP', 'La API de GitHub tiene un endpoint zen que devuelve frases', '--connect-timeout evita que se cuelgue'],
    requiredCommands: ['curl'],
    objectives: [
      { id: 1, description: 'Envia un mensajero al mundo exterior', type: 'command_output', command: 'curl -s --connect-timeout 5 https://api.github.com/zen || echo "Sin conexion externa"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 12,
    title: 'Boss: El Guardián del Conocimiento',
    description: 'Demuestra que dominas el Tema 1 LPI — Comunidad Linux',
    world: 1, order: 12, difficulty: 5,
    npc: 'BOSS',
    story: 'El Guardián del Conocimiento bloquea la puerta al Mundo 2. Solo aquellos que demuestren dominio sobre la historia, distribuciones y filosofía de Linux podran pasar. ¡Preparate para la batalla!',
    hints: ['Usa uname, cat, which, echo y curl', 'Recuerda las familias de distribuciones', 'Las 4 libertades son: Usar, Estudiar, Distribuir, Modificar'],
    requiredCommands: ['uname', 'cat', 'which', 'echo', 'curl', 'ls', 'grep'],
    objectives: [
      { id: 1, description: 'Identifica tu sistema con uname -a', type: 'command_output', command: 'uname -a', validationFn: 'output.includes("Linux")' },
      { id: 2, description: 'Lee la identificacion de tu reino', type: 'command_output', command: 'cat /etc/os-release', validationFn: 'output.includes("NAME=")' },
      { id: 3, description: 'Explora los pergaminos de distros', type: 'command_output', command: 'ls /reino/distros/', validationFn: 'output.includes("debian")' },
      { id: 4, description: 'Busca informacion sobre licencias', type: 'command_output', command: 'grep -l "Copyleft" /reino/licencias/*.txt 2>/dev/null', validationFn: 'output.includes("gpl")' }
    ],
    prerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    rewards: { xp: 200, coins: 100, achievement: 'mundo_1' }
  },

  // ==========================================
  // MUNDO 2: LOS SENDEROS DEL SISTEMA (18 misiones)
  // Tema 2 LPI: Encontrando el camino (peso 9 — MÁS IMPORTANTE)
  // ==========================================
  {
    id: 13,
    title: 'El Primer Paso del Caminante',
    description: 'Usa pwd para saber dónde estás en el laberinto',
    world: 2, order: 1, difficulty: 1,
    npc: 'Grep-ild',
    story: '"¡Bienvenido a los Senderos del Sistema, aventurero! Cada viaje comienza sabiendo donde estas. pwd (Print Working Directory) revela tu posicion exacta en el laberinto de directorios."',
    hints: ['pwd = Print Working Directory', 'Siempre muestra la ruta absoluta desde la raiz /', 'Tu posicion actual es el punto de partida de todo'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Revela tu posicion actual en el laberinto', type: 'command_output', command: 'pwd', validationFn: 'output.startsWith("/")' }
    ],
    prerequisites: [12],
    rewards: { xp: 30, coins: 5 }
  },
  {
    id: 14,
    title: 'El Eco del Cambio',
    description: 'Usa echo para hablar con el sistema',
    world: 2, order: 2, difficulty: 1,
    npc: 'Grep-ild',
    story: '"echo es la voz del sistema. Repite todo lo que le digas. Prueba a decir tu nombre, a usar variables como $USER, y a combinar texto con variables."',
    hints: ['echo imprime texto en la terminal', 'echo $USER muestra tu nombre de usuario', 'Puedes usar comillas para frases con espacios'],
    requiredCommands: ['echo'],
    objectives: [
      { id: 1, description: 'Habla al sistema con echo', type: 'command_output', command: 'echo "Soy $USER y estoy en el reino de Linux"', validationFn: 'output.includes("reino")' }
    ],
    prerequisites: [12],
    rewards: { xp: 30, coins: 5 }
  },
  {
    id: 15,
    title: 'La Estructura del Comando',
    description: 'Aprende la estructura: comando -opciones argumentos',
    world: 2, order: 3, difficulty: 1,
    npc: 'Grep-ild',
    story: '"Todo hechizo sigue un patron: comando -opciones argumentos. Como un conjuro: ls -l /home. El comando es la accion, las opciones modifican como se ejecuta, y los argumentos son el objetivo. Ejecuta ls con opciones."',
    hints: ['ls es el comando, -l es la opcion, / es el argumento', 'Las opciones cortas usan -, las largas usan --', 'ls -l / muestra el contenido de la raiz en formato largo'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Ejecuta ls con opciones y argumentos', type: 'command_output', command: 'ls -l /', validationFn: 'output.includes("total") || output.includes("root")' }
    ],
    prerequisites: [12],
    rewards: { xp: 40, coins: 5 }
  },
  {
    id: 16,
    title: 'Las Variables del Entorno',
    description: 'Descubre las variables mágicas: $USER, $HOME, $SHELL',
    world: 2, order: 4, difficulty: 2,
    npc: 'Grep-ild',
    story: '"Las variables de entorno son runas invisibles que guardan informacion crucial. $USER es tu nombre, $HOME tu refugio, $SHELL tu arma favorita. Revelalas con echo."',
    hints: ['$USER = tu nombre de usuario', '$HOME = tu directorio personal', '$SHELL = tu shell predeterminado', '$PWD = tu directorio actual'],
    requiredCommands: ['echo'],
    objectives: [
      { id: 1, description: 'Revela las runas de tu entorno', type: 'command_output', command: 'echo "Usuario: $USER | Home: $HOME | Shell: $SHELL | Dir: $PWD"', validationFn: 'output.includes("Usuario")' }
    ],
    prerequisites: [14],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 17,
    title: 'Exportar el Poder',
    description: 'Crea y exporta variables de entorno',
    world: 2, order: 5, difficulty: 2,
    npc: 'Grep-ild',
    story: '"Exportar una variable es como compartir un hechizo con tus aliados (subprocesos). Sin export, la variable solo vive en tu shell actual. Con export, viaja por todo el reino."',
    hints: ['export VAR=value crea una variable de entorno', 'Sin export, la variable es local al shell actual', 'echo $VAR verifica que se creo'],
    requiredCommands: ['export', 'echo'],
    objectives: [
      { id: 1, description: 'Crea y exporta una variable de entorno', type: 'command_output', command: 'export QUEST_VAR=linuxquest && echo "Mi variable: $QUEST_VAR"', validationFn: 'output.includes("linuxquest")' }
    ],
    prerequisites: [16],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 18,
    title: 'El Manual del Sabio',
    description: 'Consulta las páginas de manual con man',
    world: 2, order: 6, difficulty: 2,
    npc: 'Grep-ild',
    story: '"Las paginas de manual son los pergaminos ancestrales del sistema. Cada comando tiene su pergamino. man ls te ensena todo sobre ls. man -k busca por palabra clave."',
    hints: ['man ls abre el manual de ls', 'man -k palabra busca en todos los manuales', 'q para salir del manual'],
    requiredCommands: ['man'],
    objectives: [
      { id: 1, description: 'Lee el pergamino del comando ls', type: 'command_output', command: 'man ls', validationFn: 'output.includes("NAME") || output.includes("ls")' }
    ],
    prerequisites: [15],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 19,
    title: 'La Búsqueda de Conocimiento',
    description: 'Usa apropos, whatis y type para encontrar comandos',
    world: 2, order: 7, difficulty: 2,
    npc: 'Grep-ild',
    story: '"¿No recuerdas el nombre de un hechizo? apropos busca por descripcion, whatis da una linea resumen, y type te dice si es un hechizo interno (builtin) o externo."',
    hints: ['apropos palabra busca en las descripciones de manuales', 'whatis comando da descripcion de una linea', 'type comando dice si es builtin o externo'],
    requiredCommands: ['apropos', 'whatis', 'type'],
    objectives: [
      { id: 1, description: 'Busca comandos relacionados con "copy"', type: 'command_output', command: 'apropos copy 2>/dev/null | head -5', validationFn: 'output.length > 0' },
      { id: 2, description: 'Descubre que tipo de comando es echo', type: 'command_output', command: 'type echo', validationFn: 'output.includes("echo")' }
    ],
    prerequisites: [18],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 20,
    title: 'Listando los Tesoros',
    description: 'Aprende ls, ls -l y ls -a',
    world: 2, order: 8, difficulty: 1,
    npc: 'Grep-ild',
    story: '"ls es tus ojos en el reino. Te muestra los tesoros (archivos) en cada claro (directorio). Con -l ves detalles, con -a ves los archivos ocultos que se esconden tras el punto."',
    hints: ['ls lista archivos del directorio actual', 'ls -l muestra permisos, tamano, fecha', 'ls -a incluye archivos ocultos (empiezan con .)'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Lista los tesoros del directorio actual', type: 'command_output', command: 'ls -la', validationFn: 'output.includes("total")' }
    ],
    prerequisites: [13],
    rewards: { xp: 40, coins: 5 }
  },
  {
    id: 21,
    title: 'La Vista Detallada',
    description: 'Domina ls -lh, ls -lt y ls -lS',
    world: 2, order: 9, difficulty: 2,
    npc: 'Grep-ild',
    story: '"Ahora que conoces ls basico, aprende sus transformaciones. -lh muestra tamano legible (KB, MB), -lt ordena por fecha, -lS ordena por tamano. Cada variante revela una perspectiva diferente."',
    hints: ['-lh = tamano humanos (K, M, G)', '-lt = ordenado por tiempo (mas reciente primero)', '-lS = ordenado por tamano (mas grande primero)'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Muestra archivos con tamano legible', type: 'command_output', command: 'ls -lh /reino/', validationFn: 'output.length > 0' },
      { id: 2, description: 'Ordena por tamano', type: 'command_output', command: 'ls -lS /reino/software/', validationFn: 'output.length > 0' }
    ],
    prerequisites: [20],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 22,
    title: 'El Salto del Conejo',
    description: 'Domina cd, cd .., cd ~ y cd -',
    world: 2, order: 10, difficulty: 2,
    npc: 'Grep-ild',
    story: '"cd (Change Directory) es tu caballo de batalla. cd .. sube un nivel, cd ~ va a tu hogar, cd - vuelve al lugar anterior. Domina estos saltos y nunca te perderas."',
    hints: ['cd sin argumentos va a $HOME', 'cd .. sube un nivel', 'cd - vuelve al directorio anterior', 'pwd verifica donde estas'],
    requiredCommands: ['cd', 'pwd'],
    objectives: [
      { id: 1, description: 'Salta a tu hogar y verifica con pwd', type: 'command_output', command: 'cd ~ && pwd', validationFn: 'output.includes("/home") || output.includes("/root")' },
      { id: 2, description: 'Explora /reino con cd y pwd', type: 'command_output', command: 'cd /reino && pwd && ls', validationFn: 'output.includes("distros")' }
    ],
    prerequisites: [13],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 23,
    title: 'El Sendero Absoluto',
    description: 'Navega usando rutas absolutas',
    world: 2, order: 11, difficulty: 2,
    npc: 'Grep-ild',
    story: '"Las rutas absolutas son mapas que siempre empiezan desde la raiz /. Como una direccion completa: /home/usuario/documentos. No importa donde estes, siempre te llevan al destino exacto."',
    hints: ['Ruta absoluta siempre empieza con /', 'cd /reino/distros te lleva al directorio de distros', 'pwd verifica donde estas'],
    requiredCommands: ['cd', 'pwd'],
    objectives: [
      { id: 1, description: 'Viaja al reino de las distros usando ruta absoluta', type: 'command_output', command: 'cd /reino/distros && pwd && ls', validationFn: 'output.includes("debian")' }
    ],
    prerequisites: [22],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 24,
    title: 'Crear el Refugio',
    description: 'Crea directorios con mkdir y mkdir -p',
    world: 2, order: 12, difficulty: 2,
    npc: 'Grep-ild',
    story: '"Todo guerrero necesita un refugio. mkdir crea un directorio nuevo. Con -p puedes crear rutas completas de una vez, como construir un castillo con todas sus torres de un solo hechizo."',
    hints: ['mkdir directorio crea un directorio', 'mkdir -p a/b/c crea toda la ruta de golpe', 'mkdir -p no falla si ya existe'],
    requiredCommands: ['mkdir'],
    objectives: [
      { id: 1, description: 'Construye tu refugio con mkdir -p', type: 'command_output', command: 'mkdir -p refugio/armas/pociones && ls -R refugio', validationFn: 'output.includes("pociones")' }
    ],
    prerequisites: [23],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 25,
    title: 'El Pergamino en Blanco',
    description: 'Crea archivos vacíos con touch',
    world: 2, order: 13, difficulty: 1,
    npc: 'Grep-ild',
    story: '"Touch es la pluma magica que crea pergaminos en blanco. Si el archivo no existe, lo crea. Si ya existe, actualiza su fecha de ultima modificacion."',
    hints: ['touch archivo crea un archivo vacio', 'touch tambien actualiza la fecha de archivos existentes', 'ls -l verifica que se creo'],
    requiredCommands: ['touch'],
    objectives: [
      { id: 1, description: 'Crea un pergamino en blanco', type: 'command_output', command: 'touch pergamino.txt && ls -l pergamino.txt', validationFn: 'output.includes("pergamino.txt")' }
    ],
    prerequisites: [24],
    rewards: { xp: 40, coins: 5 }
  },
  {
    id: 26,
    title: 'El Espejo de los Pergaminos',
    description: 'Copia archivos con cp y cp -r',
    world: 2, order: 14, difficulty: 2,
    npc: 'Grep-ild',
    story: '"cp crea copias exactas de tus pergaminos. Con -r copias directorios enteros con todo su contenido. Como un clon magico de tu biblioteca."',
    hints: ['cp origen destino copia un archivo', 'cp -r copia directorios recursivamente', 'cp -i pregunta antes de sobrescribir'],
    requiredCommands: ['cp'],
    objectives: [
      { id: 1, description: 'Copia tu pergamino', type: 'command_output', command: 'cp pergamino.txt pergamino_copia.txt && ls pergamino*.txt', validationFn: 'output.includes("copia")' }
    ],
    prerequisites: [25],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 27,
    title: 'El Ritual de Renombrar',
    description: 'Mueve y renombra archivos con mv',
    world: 2, order: 15, difficulty: 2,
    npc: 'Grep-ild',
    story: '"mv es el hechizo de transformacion. Puede mover un archivo a otro directorio o darle un nuevo nombre. Como renombrar una espada legendaria."',
    hints: ['mv origen destino mueve o renombra', 'mv archivo.txt nuevo.txt renombra', 'mv archivo.txt /otro/lugar/ mueve'],
    requiredCommands: ['mv'],
    objectives: [
      { id: 1, description: 'Renombra tu pergamino copia', type: 'command_output', command: 'mv pergamino_copia.txt leyenda.txt && ls leyenda.txt', validationFn: 'output.includes("leyenda.txt")' }
    ],
    prerequisites: [26],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 28,
    title: 'La Eliminación del Mal',
    description: 'Borra archivos con rm y rmdir',
    world: 2, order: 16, difficulty: 3,
    npc: 'Grep-ild',
    story: '"rm es la espada que destruye. ¡Cuidado! En Linux no hay papelera de reciclaje. rm borra permanentemente. Usa rmdir para directorios vacios."',
    hints: ['rm archivo borra un archivo', 'rm -r borra directorios recursivamente', 'rmdir solo borra directorios vacios'],
    requiredCommands: ['rm', 'rmdir'],
    objectives: [
      { id: 1, description: 'Destruye el pergamino de leyenda', type: 'command_output', command: 'rm leyenda.txt && echo "Eliminado" && ls leyenda.txt 2>&1', validationFn: 'output.includes("Eliminado")' }
    ],
    prerequisites: [27],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 29,
    title: 'El Glob del Caos',
    description: 'Usa patrones glob para seleccionar archivos',
    world: 2, order: 17, difficulty: 3,
    npc: 'Grep-ild',
    story: '"Los globs son comodines magicos: * cualquier cantidad de caracteres, ? exactamente uno, [abc] cualquiera de esos. Son como hechizos de area que afectan a multiples archivos."',
    hints: ['*.txt selecciona todos los .txt', 'archivo? selecciona archivo + 1 caracter', '[abc]* selecciona los que empiezan con a, b o c'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Usa globs para encontrar archivos .txt', type: 'command_output', command: 'ls *.txt', validationFn: 'output.includes(".txt")' },
      { id: 2, description: 'Usa globs para encontrar archivos por rango', type: 'command_output', command: 'ls archivo[1-3].txt', validationFn: 'output.includes("archivo")' }
    ],
    prerequisites: [20],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 30,
    title: 'Boss: El Guardián de los Senderos',
    description: 'Demuestra que dominas la navegación y manipulación de archivos',
    world: 2, order: 18, difficulty: 5,
    npc: 'BOSS',
    story: 'El Guardián de los Senderos bloquea el paso al Mundo 3. Debes demostrar que puedes navegar, crear, copiar, mover y eliminar archivos sin perderte en el laberinto del sistema.',
    hints: ['Usa mkdir -p para crear estructuras complejas', 'cp -r para copiar directorios', 'rm -r para limpiar'],
    requiredCommands: ['mkdir', 'touch', 'cp', 'mv', 'rm', 'ls', 'pwd', 'cd'],
    objectives: [
      { id: 1, description: 'Crea la estructura: mision/arma/escudo/', type: 'command_output', command: 'mkdir -p mision/arma/escudo && ls -R mision', validationFn: 'output.includes("escudo")' },
      { id: 2, description: 'Crea y copia un archivo', type: 'command_output', command: 'touch mision/orden.txt && cp mision/orden.txt mision/arma/orden_copia.txt && ls mision/arma/', validationFn: 'output.includes("orden_copia")' },
      { id: 3, description: 'Renombra y limpia', type: 'command_output', command: 'mv mision/arma/orden_copia.txt mision/arma/orden_final.txt && rm -rf mision && echo "Mision completada"', validationFn: 'output.includes("completada")' }
    ],
    prerequisites: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    rewards: { xp: 200, coins: 100, achievement: 'mundo_2' }
  },

  // ==========================================
  // MUNDO 3: LAS TORRES DEL PROCESAMIENTO (18 misiones)
  // Tema 3 LPI: Poder de la línea de comandos (peso 9)
  // ==========================================
  {
    id: 31,
    title: 'El Poder de Grep',
    description: 'Busca patrones en archivos con grep',
    world: 3, order: 1, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"Bienvenido a las Torres del Procesamiento. grep es tu lupa magica: busca patrones en oceanos de texto. Es el comando mas usado por los sabios del reino. Busca errores en el log de servidores."',
    hints: ['grep "patron" archivo busca texto', 'grep -i ignora mayusculas/minusculas', 'grep -n muestra numeros de linea'],
    requiredCommands: ['grep'],
    objectives: [
      { id: 1, description: 'Busca errores en el log de servidores', type: 'command_output', command: 'grep "ERROR" /misiones/servidores.log', validationFn: 'output.includes("ERROR")' }
    ],
    prerequisites: [30],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 32,
    title: 'El Cazador Insensible',
    description: 'Domina grep -i y grep -v',
    world: 3, order: 2, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"grep -i no distingue entre mayusculas y minusculas: caza sin importar el tamano de la presa. grep -v es el espejo inverso: muestra todo EXCEPTO lo que buscas."',
    hints: ['-i = case insensitive (ignora mayusculas)', '-v = invert match (muestra lo que NO coincide)'],
    requiredCommands: ['grep'],
    objectives: [
      { id: 1, description: 'Busca sin distinguir mayusculas', type: 'command_output', command: 'grep -i "error" /misiones/servidores.log', validationFn: 'output.includes("ERROR")' },
      { id: 2, description: 'Muestra todo excepto las lineas INFO', type: 'command_output', command: 'grep -v "INFO" /misiones/servidores.log', validationFn: 'output.includes("WARNING") || output.includes("ERROR")' }
    ],
    prerequisites: [31],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 33,
    title: 'La Búsqueda Recursiva',
    description: 'Busca en directorios completos con grep -r',
    world: 3, order: 3, difficulty: 3,
    npc: 'Chmod-ard',
    story: '"grep -r es como desatar un enjambre de abejas buscadoras. Explora cada archivo de cada directorio en busca de tu patron. Con -l solo te dice que archivos contienen el tesoro."',
    hints: ['-r = recursivo (busca en subdirectorios)', '-l = solo nombres de archivos que coinciden', '-c = contar coincidencias'],
    requiredCommands: ['grep'],
    objectives: [
      { id: 1, description: 'Busca recursivamente en el reino', type: 'command_output', command: 'grep -r "Linux" /reino/ 2>/dev/null | head -5', validationFn: 'output.includes("Linux")' },
      { id: 2, description: 'Encuentra que archivos contienen "Ubuntu"', type: 'command_output', command: 'grep -rl "Ubuntu" /reino/ 2>/dev/null', validationFn: 'output.includes("debian")' }
    ],
    prerequisites: [31],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 34,
    title: 'Las Cabezas y Colas',
    description: 'Lee el inicio y final de archivos con head y tail',
    world: 3, order: 4, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"head te muestra las primeras lineas de un pergamino, tail las ultimas. tail -f es especial: sigue el pergamino en tiempo real, como vigilar un rio de datos fluyendo."',
    hints: ['head -n 5 muestra las primeras 5 lineas', 'tail -n 5 muestra las ultimas 5', 'tail -f sigue el archivo en tiempo real'],
    requiredCommands: ['head', 'tail'],
    objectives: [
      { id: 1, description: 'Lee las primeras 3 lineas del log', type: 'command_output', command: 'head -n 3 /misiones/servidores.log', validationFn: 'output.includes("INFO")' },
      { id: 2, description: 'Lee las ultimas 3 lineas del log', type: 'command_output', command: 'tail -n 3 /misiones/servidores.log', validationFn: 'output.length > 0' }
    ],
    prerequisites: [30],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 35,
    title: 'El Contador de Palabras',
    description: 'Cuenta líneas, palabras y bytes con wc',
    world: 3, order: 5, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"wc (Word Count) es el contador del reino. Cuenta lineas con -l, palabras con -w, bytes con -c. ¿Cuantas lineas tiene el log de servidores? ¡wc lo sabe!"',
    hints: ['wc archivo muestra lineas, palabras, bytes', 'wc -l solo lineas', 'wc -w solo palabras'],
    requiredCommands: ['wc'],
    objectives: [
      { id: 1, description: 'Cuenta las lineas del log de servidores', type: 'command_output', command: 'wc -l /misiones/servidores.log', validationFn: 'output.includes("/misiones")' },
      { id: 2, description: 'Cuenta las palabras del CSV de usuarios', type: 'command_output', command: 'wc -w /misiones/usuarios.csv', validationFn: 'output.includes("/misiones")' }
    ],
    prerequisites: [30],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 36,
    title: 'El Ordenador Místico',
    description: 'Ordena datos con sort',
    world: 3, order: 6, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"sort es el organizador del caos. Ordena alfabeticamente por defecto. Con -n ordena numeros, con -r invierte, con -u elimina duplicados. Transforma el caos en orden."',
    hints: ['sort ordena alfabeticamente', '-n = numerico', '-r = reverso', '-u = unicos (sin duplicados)'],
    requiredCommands: ['sort'],
    objectives: [
      { id: 1, description: 'Ordena numeros de menor a mayor', type: 'command_output', command: 'sort -n /numeros.txt', validationFn: 'output.includes("3")' },
      { id: 2, description: 'Ordena numeros de mayor a menor', type: 'command_output', command: 'sort -rn /numeros.txt', validationFn: 'output.includes("91")' }
    ],
    prerequisites: [30],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 37,
    title: 'Los Únicos Sobrevivientes',
    description: 'Elimina duplicados con sort | uniq -c',
    world: 3, order: 7, difficulty: 3,
    npc: 'Chmod-ard',
    story: '"uniq elimina lineas duplicadas, pero solo si estan adyacentes. Por eso siempre se usa con sort primero. uniq -c cuenta cuantas veces aparece cada una. Es como contar ejercitos enemigos."',
    hints: ['uniq solo elimina duplicados adyacentes', 'sort archivo | uniq es el patron tipico', 'uniq -c agrega conteo'],
    requiredCommands: ['sort', 'uniq'],
    objectives: [
      { id: 1, description: 'Cuenta departamentos unicos en el CSV', type: 'command_output', command: 'cut -d "," -f 4 /misiones/usuarios.csv | sort | uniq -c | sort -rn', validationFn: 'output.includes("Desarrollo")' }
    ],
    prerequisites: [36, 38],
    rewards: { xp: 60, coins: 15 }
  },
  {
    id: 38,
    title: 'El Cuchillo Cortador',
    description: 'Extrae columnas con cut',
    world: 3, order: 8, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"cut es el cuchillo que rebanada datos por columnas. Con -d defines el separador, con -f que columnas extraer. /etc/passwd usa : como separador. ¡Cortemos datos!"',
    hints: ['-d "," define coma como separador', '-f 1 extrae la primera columna', 'cut -c 1-10 extrae caracteres 1 al 10'],
    requiredCommands: ['cut'],
    objectives: [
      { id: 1, description: 'Extrae los nombres del CSV de usuarios', type: 'command_output', command: 'cut -d "," -f 1 /misiones/usuarios.csv', validationFn: 'output.includes("Ana")' },
      { id: 2, description: 'Extrae los nombres de usuario del sistema', type: 'command_output', command: 'cut -d ":" -f 1 /etc/passwd | head -5', validationFn: 'output.includes("root")' }
    ],
    prerequisites: [34],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 39,
    title: 'El Traductor',
    description: 'Transforma texto con tr',
    world: 3, order: 9, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"tr es el traductor universal. Convierte minusculas a mayusculas, elimina caracteres, reemplaza simbolos. Solo lee de stdin, asi que siempre usalo con pipes."',
    hints: ['tr "a-z" "A-Z" convierte a mayusculas', 'tr -d " " elimina espacios', 'Siempre se usa con pipe: echo "hola" | tr "a-z" "A-Z"'],
    requiredCommands: ['tr'],
    objectives: [
      { id: 1, description: 'Convierte texto a mayusculas', type: 'command_output', command: 'echo "linuxquest" | tr "a-z" "A-Z"', validationFn: 'output.includes("LINUXQUEST")' },
      { id: 2, description: 'Elimina espacios de un texto', type: 'command_output', command: 'echo "h o l a" | tr -d " "', validationFn: 'output.includes("hola")' }
    ],
    prerequisites: [30],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 40,
    title: 'Tuberías: El Flujo de Datos',
    description: 'Encadena comandos con pipes',
    world: 3, order: 10, difficulty: 3,
    npc: 'Chmod-ard',
    story: '"El pipe | es la tuberia maestra del reino. Conecta la salida de un comando con la entrada del siguiente. Es como encadenar hechizos: ls | grep .txt | wc -l. ¡El verdadero poder!"',
    hints: ['| conecta la salida de un comando con la entrada del siguiente', 'Puedes encadenar muchos pipes', 'Cada comando procesa y pasa al siguiente'],
    requiredCommands: ['ls', 'grep', 'wc'],
    objectives: [
      { id: 1, description: 'Cuenta archivos .txt en el reino', type: 'command_output', command: 'ls /reino/distros/*.txt 2>/dev/null | wc -l', validationFn: 'output.length > 0' },
      { id: 2, description: 'Filtra y cuenta errores en el log', type: 'command_output', command: 'grep "ERROR" /misiones/servidores.log | wc -l', validationFn: 'output.length > 0' }
    ],
    prerequisites: [31, 35],
    rewards: { xp: 70, coins: 15 }
  },
  {
    id: 41,
    title: 'La Redirección al Infinito',
    description: 'Domina >, >>, 2> y &>',
    world: 3, order: 11, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"La redireccion envia la salida a donde tu quieras. > sobrescribe, >> agrega al final, 2> captura errores, &> captura todo. Como desviar un rio hacia otro cauce."',
    hints: ['> sobrescribe el archivo', '>> agrega al final (append)', '2> captura solo errores (stderr)', '&> captura todo (stdout + stderr)'],
    requiredCommands: ['echo', 'cat'],
    objectives: [
      { id: 1, description: 'Redirige la salida a un archivo', type: 'command_output', command: 'echo "primer mensaje" > /tmp/redir_test.txt && echo "segundo mensaje" >> /tmp/redir_test.txt && cat /tmp/redir_test.txt', validationFn: 'output.includes("primer") && output.includes("segundo")' }
    ],
    prerequisites: [30],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 42,
    title: 'Los Espejos del Tee',
    description: 'Duplica salida a pantalla y archivo con tee',
    world: 3, order: 12, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"tee es como un espejo magico que duplica el flujo de datos. Muestra en pantalla Y guarda en archivo simultaneamente. Con -a agrega en lugar de sobrescribir."',
    hints: ['tee archivo muestra Y guarda', 'tee -a agrega al archivo sin sobrescribir', 'Se usa con pipes: comando | tee archivo'],
    requiredCommands: ['tee'],
    objectives: [
      { id: 1, description: 'Duplica la salida con tee', type: 'command_output', command: 'echo "Mensaje duplicado" | tee /tmp/tee_test.txt && cat /tmp/tee_test.txt', validationFn: 'output.includes("duplicado")' }
    ],
    prerequisites: [41],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 43,
    title: 'El Hechizo Sed',
    description: 'Transforma texto con sed',
    world: 3, order: 13, difficulty: 4,
    npc: 'Chmod-ard',
    story: '"sed (Stream Editor) es el mago transformador. s/old/new/g reemplaza texto, /patron/d elimina lineas, -n \'5,10p\' extrae rangos. Es uno de los hechizos mas poderosos del reino."',
    hints: ["sed 's/old/new/' reemplaza la primera ocurrencia", "sed 's/old/new/g' reemplaza todas (global)", "sed -i edita el archivo in-place"],
    requiredCommands: ['sed'],
    objectives: [
      { id: 1, description: 'Transforma texto con sed', type: 'command_output', command: 'echo "El reino de Linux" | sed "s/Linux/LinuxQuest/g"', validationFn: 'output.includes("LinuxQuest")' },
      { id: 2, description: 'Elimina lineas de comentario de un config', type: 'command_output', command: 'sed "/^#/d" /misiones/config_ejemplo.conf', validationFn: 'output.includes("servidor")' }
    ],
    prerequisites: [40],
    rewards: { xp: 70, coins: 15 }
  },
  {
    id: 44,
    title: 'El Buscador Awk',
    description: 'Procesa datos por columnas con awk',
    world: 3, order: 14, difficulty: 4,
    npc: 'Chmod-ard',
    story: '"awk es el procesador de datos definitivo. Trabaja columna por columna. {print $1} imprime la primera, {print $1, $3} la primera y tercera. Con -F defines el separador."',
    hints: ["awk '{print $1}' imprime la primera columna", "-F ',' cambia el separador a coma", "awk '{sum+=$1} END {print sum}' suma la columna"],
    requiredCommands: ['awk'],
    objectives: [
      { id: 1, description: 'Extrae nombres del CSV', type: 'command_output', command: 'awk -F "," \'{print $1}\' /misiones/usuarios.csv | head -5', validationFn: 'output.includes("nombre")' },
      { id: 2, description: 'Extrae nombre y ciudad del CSV', type: 'command_output', command: 'awk -F "," \'{print $1, "vive en", $3}\' /misiones/usuarios.csv | head -3', validationFn: 'output.includes("vive en")' }
    ],
    prerequisites: [38],
    rewards: { xp: 70, coins: 15 }
  },
  {
    id: 45,
    title: 'La Búsqueda Rápida',
    description: 'Busca archivos con find',
    world: 3, order: 15, difficulty: 3,
    npc: 'Chmod-ard',
    story: '"find es el explorador definitivo del sistema de archivos. Busca por nombre con -name, por tipo con -type, por tamano con -size, por fecha con -mtime. Recorre todo el reino."',
    hints: ['find / -name "archivo.txt" busca por nombre', 'find . -type f solo archivos', 'find . -type d solo directorios'],
    requiredCommands: ['find'],
    objectives: [
      { id: 1, description: 'Busca archivos .txt en el reino', type: 'command_output', command: 'find /reino -name "*.txt" -type f', validationFn: 'output.includes(".txt")' },
      { id: 2, description: 'Busca directorios en /reino', type: 'command_output', command: 'find /reino -type d', validationFn: 'output.includes("distros")' }
    ],
    prerequisites: [30],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 46,
    title: 'El Compresor de Pergaminos',
    description: 'Archiva y comprime con tar',
    world: 3, order: 16, difficulty: 3,
    npc: 'Chmod-ard',
    story: '"tar es el archivador ancestral. -c crea, -x extrae, -z comprime con gzip, -v muestra que hace, -f especifica el archivo. Es como meter todos tus pergaminos en una bolsa magica comprimida."',
    hints: ['tar -czvf archivo.tar.gz directorio/ crea comprimido', 'tar -xzvf archivo.tar.gz extrae', 'tar -tvf archivo.tar.gz lista sin extraer'],
    requiredCommands: ['tar'],
    objectives: [
      { id: 1, description: 'Crea un archivo comprimido del reino', type: 'command_output', command: 'tar -czvf /tmp/reino_backup.tar.gz -C / reino && echo "Backup creado" && ls -lh /tmp/reino_backup.tar.gz', validationFn: 'output.includes("Backup creado")' }
    ],
    prerequisites: [30],
    rewards: { xp: 60, coins: 15 }
  },
  {
    id: 47,
    title: 'Tu Primer Script Mágico',
    description: 'Crea y ejecuta un script bash',
    world: 3, order: 17, difficulty: 3,
    npc: 'Chmod-ard',
    story: '"Un script es un grimorio: un archivo con hechizos escritos que el sistema ejecuta en orden. Empieza con #!/bin/bash (el shebang), hazlo ejecutable con chmod +x, y ejecutalo con ./script.sh"',
    hints: ['#!/bin/bash es el shebang (primera linea)', 'chmod +x hace el script ejecutable', './script.sh ejecuta el script'],
    requiredCommands: ['echo', 'chmod'],
    objectives: [
      { id: 1, description: 'Crea tu primer grimorio ejecutable', type: 'command_output', command: 'echo \'#!/bin/bash\' > /tmp/saludo.sh && echo \'echo "Hola LinuxQuest"\' >> /tmp/saludo.sh && chmod +x /tmp/saludo.sh && /tmp/saludo.sh', validationFn: 'output.includes("Hola LinuxQuest")' }
    ],
    prerequisites: [41],
    rewards: { xp: 80, coins: 20 }
  },
  {
    id: 48,
    title: 'Boss: El Maestro del Flujo',
    description: 'Demuestra que dominas pipes, grep, sed, awk y scripts',
    world: 3, order: 18, difficulty: 5,
    npc: 'BOSS',
    story: 'El Maestro del Flujo controla el rio de datos del reino. Solo aquellos que dominen el arte de las tuberias, la busqueda de patrones y la transformacion de texto podran pasar a la Forja del Nucleo.',
    hints: ['Encadena comandos con pipes', 'Usa grep para filtrar, awk para extraer', 'tar para comprimir'],
    requiredCommands: ['grep', 'awk', 'sed', 'sort', 'uniq', 'tar', 'echo', 'chmod', 'cat', 'head', 'tail', 'wc', 'cut', 'tr', 'find'],
    objectives: [
      { id: 1, description: 'Procesa el log: encuentra errores con conteo', type: 'command_output', command: 'grep "ERROR" /misiones/servidores.log | wc -l', validationFn: 'output.length > 0' },
      { id: 2, description: 'Extrae datos del CSV con awk', type: 'command_output', command: 'awk -F "," \'{print $1}\' /misiones/usuarios.csv | tail -3', validationFn: 'output.length > 0' },
      { id: 3, description: 'Transforma texto con sed', type: 'command_output', command: 'echo "El reino magico" | sed "s/magico/digital/g"', validationFn: 'output.includes("digital")' }
    ],
    prerequisites: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    rewards: { xp: 250, coins: 150, achievement: 'mundo_3' }
  },

  // ==========================================
  // MUNDO 4: LA FORJA DEL NÚCLEO (17 misiones)
  // Tema 4 LPI: El sistema operativo Linux (peso 8)
  // ==========================================
  {
    id: 49,
    title: '¿Quién Soy?',
    description: 'Identifica tu usuario con whoami e id',
    world: 4, order: 1, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"Bienvenido a la Forja del Nucleo. Primero: ¿quien eres? whoami revela tu nombre, id revela tu UID, GID y grupos. Cada usuario tiene un UID unico."',
    hints: ['whoami muestra tu nombre de usuario', 'id muestra UID, GID y grupos', 'UID 0 = root, 1000+ = usuarios normales'],
    requiredCommands: ['whoami', 'id'],
    objectives: [
      { id: 1, description: 'Revela tu identidad en el reino', type: 'command_output', command: 'whoami', validationFn: 'output.length > 0' },
      { id: 2, description: 'Muestra tus IDs y grupos', type: 'command_output', command: 'id', validationFn: 'output.includes("uid=")' }
    ],
    prerequisites: [48],
    rewards: { xp: 40, coins: 5 }
  },
  {
    id: 50,
    title: 'Mi Sistema',
    description: 'Consulta la version del kernel con uname -r',
    world: 4, order: 2, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"El kernel es el corazon del sistema. uname -r muestra su version, uname -m la arquitectura. Conoce los cimientos sobre los que se construye todo el reino."',
    hints: ['uname -r muestra la version del kernel', 'uname -m muestra la arquitectura'],
    requiredCommands: ['uname'],
    objectives: [
      { id: 1, description: 'Consulta la version de tu kernel', type: 'command_output', command: 'uname -r', validationFn: 'output.length > 0' }
    ],
    prerequisites: [48],
    rewards: { xp: 40, coins: 5 }
  },
  {
    id: 51,
    title: 'Hora del Sistema',
    description: 'Consulta la fecha, calendario y uptime',
    world: 4, order: 3, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"El tiempo es vida en el reino. date muestra la fecha actual, cal el calendario, uptime cuanto tiempo lleva encendido tu sistema. Son los relojes del reino."',
    hints: ['date muestra fecha y hora actuales', 'cal muestra el calendario del mes', 'uptime muestra tiempo encendido y carga'],
    requiredCommands: ['date', 'cal', 'uptime'],
    objectives: [
      { id: 1, description: 'Consulta la hora del reino', type: 'command_output', command: 'date', validationFn: 'output.length > 0' },
      { id: 2, description: 'Muestra el calendario', type: 'command_output', command: 'cal', validationFn: 'output.length > 0' }
    ],
    prerequisites: [48],
    rewards: { xp: 40, coins: 5 }
  },
  {
    id: 52,
    title: 'Procesos en Ejecución',
    description: 'Lista procesos con ps y ps aux',
    world: 4, order: 4, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"Los procesos son los habitantes vivos de tu reino. ps muestra los del shell actual, ps aux muestra TODOS. Cada proceso tiene un PID unico, como un numero de identificacion."',
    hints: ['ps muestra procesos del shell actual', 'ps aux muestra todos los procesos del sistema', 'La columna PID es el identificador unico'],
    requiredCommands: ['ps'],
    objectives: [
      { id: 1, description: 'Lista todos los procesos del reino', type: 'command_output', command: 'ps aux | head -10', validationFn: 'output.includes("PID") || output.includes("USER")' }
    ],
    prerequisites: [48],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 53,
    title: 'Top: Monitor en Vivo',
    description: 'Monitorea el sistema en tiempo real con top',
    world: 4, order: 5, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"top es la torre de vigilancia del reino. Muestra procesos, uso de CPU, memoria, todo en tiempo real. En modo batch (-b -n 1) captura una foto del estado actual."',
    hints: ['top -b -n 1 ejecuta en modo batch (no interactivo)', 'Muestra %CPU, %MEM de cada proceso'],
    requiredCommands: ['top'],
    objectives: [
      { id: 1, description: 'Captura una foto del estado del reino', type: 'command_output', command: 'top -b -n 1 | head -15', validationFn: 'output.includes("Tasks") || output.includes("Cpu")' }
    ],
    prerequisites: [52],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 54,
    title: 'El Verdugo de Procesos',
    description: 'Termina procesos con kill y killall',
    world: 4, order: 6, difficulty: 3,
    npc: 'Kernel el Forjador',
    story: '"kill envia senales a los procesos. SIGTERM (default) les pide que se vayan amablemente. SIGKILL (-9) los destruye sin piedad. killall mata por nombre."',
    hints: ['kill PID envia SIGTERM (amable)', 'kill -9 PID envia SIGKILL (forzado)', 'kill -l lista todas las senales'],
    requiredCommands: ['kill', 'killall'],
    objectives: [
      { id: 1, description: 'Aprende las senales de terminacion', type: 'command_output', command: 'kill -l | head -10', validationFn: 'output.includes("HUP") || output.includes("TERM")' }
    ],
    prerequisites: [52],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 55,
    title: 'Jobs y Background',
    description: 'Gestiona procesos en segundo plano',
    world: 4, order: 7, difficulty: 3,
    npc: 'Kernel el Forjador',
    story: '"Los jobs son procesos que ejecutas en segundo plano. & al final de un comando lo envia al background. jobs los lista, fg trae uno al frente, bg lo envia atras."',
    hints: ['comando & ejecuta en background', 'jobs lista los jobs activos', 'fg %1 trae el job 1 al frente'],
    requiredCommands: ['jobs'],
    objectives: [
      { id: 1, description: 'Lista los jobs activos del reino', type: 'command_output', command: 'jobs', validationFn: 'true' }
    ],
    prerequisites: [52],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 56,
    title: 'Espacio en Disco',
    description: 'Verifica el espacio con df -h y du -sh',
    world: 4, order: 8, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"df -h muestra el espacio usado en cada filesystem. du -sh muestra el tamano de un directorio. Como medir las arcas del reino."',
    hints: ['df -h muestra espacio de todos los filesystems', 'du -sh directorio/ muestra tamano de un directorio', '-h = formato humano (KB, MB, GB)'],
    requiredCommands: ['df', 'du'],
    objectives: [
      { id: 1, description: 'Muestra el espacio en disco del reino', type: 'command_output', command: 'df -h /', validationFn: 'output.includes("%")' },
      { id: 2, description: 'Muestra el tamano del directorio /reino', type: 'command_output', command: 'du -sh /reino/', validationFn: 'output.includes("/reino")' }
    ],
    prerequisites: [48],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 57,
    title: 'Memoria del Reino',
    description: 'Consulta la memoria RAM con free -h',
    world: 4, order: 9, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: '"La memoria RAM es la fuerza vital del sistema. free -h muestra cuanta tienes, cuanto usas y cuanto queda. El swap es el respaldo cuando la RAM se agota."',
    hints: ['free -h muestra RAM y swap en formato humano', 'total = memoria total', 'used = en uso', 'available = disponible'],
    requiredCommands: ['free'],
    objectives: [
      { id: 1, description: 'Consulta la memoria del reino', type: 'command_output', command: 'free -h', validationFn: 'output.includes("Mem")' }
    ],
    prerequisites: [48],
    rewards: { xp: 40, coins: 5 }
  },
  {
    id: 58,
    title: 'El Camino de Red',
    description: 'Consulta la configuracion de red con ip',
    world: 4, order: 10, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"ip addr muestra las direcciones IP de tus interfaces de red. ip route muestra como enrutas el trafico. Son los mapas de carreteras del reino digital."',
    hints: ['ip addr muestra todas las IPs', 'ip a es la forma abreviada', 'ip route muestra la tabla de rutas'],
    requiredCommands: ['ip'],
    objectives: [
      { id: 1, description: 'Consulta las direcciones de red del reino', type: 'command_output', command: 'ip addr show | grep "inet "', validationFn: 'output.includes("inet")' }
    ],
    prerequisites: [48],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 59,
    title: 'El Eco del Cielo',
    description: 'Prueba conectividad con ping',
    world: 4, order: 11, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"ping envia paquetes ICMP a un destino y espera respuesta. Es como gritar ¿estas ahi? al otro lado del reino. Con -c limitas el numero de paquetes."',
    hints: ['ping -c 4 envia solo 4 paquetes', 'Si no hay respuesta, el destino es inalcanzable'],
    requiredCommands: ['ping'],
    objectives: [
      { id: 1, description: 'Envia un eco al localhost', type: 'command_output', command: 'ping -c 2 -W 3 127.0.0.1', validationFn: 'output.includes("bytes from") || output.includes("ttl=")' }
    ],
    prerequisites: [58],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 60,
    title: 'El DNS Mágico',
    description: 'Resuelve nombres de dominio con host y nslookup',
    world: 4, order: 12, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"DNS es el diccionario del reino que traduce nombres a direcciones IP. host es simple, nslookup es mas detallado."',
    hints: ['host google.com resuelve un dominio', 'nslookup localhost es otra forma', 'cat /etc/resolv.conf muestra tus servidores DNS'],
    requiredCommands: ['host', 'nslookup'],
    objectives: [
      { id: 1, description: 'Resuelve localhost', type: 'command_output', command: 'host localhost 2>/dev/null || nslookup localhost 2>/dev/null || echo "DNS no disponible"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [58],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 61,
    title: 'Los Puertos del Castillo',
    description: 'Lista puertos abiertos con ss -tuln',
    world: 4, order: 13, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"Los puertos son las puertas del castillo. ss -tuln muestra cuales estan abiertas y escuchando. -t TCP, -u UDP, -l listening, -n numerico."',
    hints: ['-t = TCP', '-u = UDP', '-l = listening (escuchando)', '-n = numerico (no resuelve nombres)'],
    requiredCommands: ['ss'],
    objectives: [
      { id: 1, description: 'Lista los puertos abiertos del castillo', type: 'command_output', command: 'ss -tuln 2>/dev/null || echo "ss no disponible"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [58],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 62,
    title: 'La Conexión SSH',
    description: 'Genera un par de llaves SSH con ssh-keygen',
    world: 4, order: 14, difficulty: 3,
    npc: 'Kernel el Forjador',
    story: '"SSH es el tunel seguro del reino. ssh-keygen genera un par de llaves: la privada (tu secreto) y la publica (la que compartes). Ed25519 es el algoritmo moderno."',
    hints: ['ssh-keygen -t ed25519 genera llave moderna', 'La llave privada NUNCA se comparte', 'La llave publica se copia a servidores'],
    requiredCommands: ['ssh-keygen'],
    objectives: [
      { id: 1, description: 'Genera un par de llaves SSH', type: 'command_output', command: 'ssh-keygen -t ed25519 -f /tmp/test_key -N "" -q && echo "Llave generada exitosamente"', validationFn: 'output.includes("generada")' }
    ],
    prerequisites: [48],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 63,
    title: 'El Mensajero curl',
    description: 'Haz peticiones HTTP con curl',
    world: 4, order: 15, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"curl es el mensajero universal del reino digital. Hace peticiones HTTP: GET para obtener, POST para enviar. Con -I solo muestra headers, con -L sigue redirects."',
    hints: ['curl url hace un GET request', 'curl -I url solo muestra headers', '--connect-timeout evita cuelgues'],
    requiredCommands: ['curl'],
    objectives: [
      { id: 1, description: 'Envia un mensajero HTTP', type: 'command_output', command: 'curl -s --connect-timeout 5 -m 10 https://api.github.com/zen || echo "Sin conexion"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [48],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 64,
    title: 'Logs del Sistema',
    description: 'Lee los registros del sistema con tail -f',
    world: 4, order: 16, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: '"Los logs son el diario del reino. /var/log/syslog registra eventos generales. tail -f sigue el log en tiempo real."',
    hints: ['tail -f /var/log/syslog sigue el log general', 'dmesg muestra mensajes del kernel'],
    requiredCommands: ['tail'],
    objectives: [
      { id: 1, description: 'Lee los registros del reino', type: 'command_output', command: 'tail -n 5 /var/log/syslog 2>/dev/null || tail -n 5 /var/log/messages 2>/dev/null || echo "Logs no accesibles"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [34],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 65,
    title: 'Boss: El Señor del Núcleo',
    description: 'Demuestra que dominas el sistema operativo Linux',
    world: 4, order: 17, difficulty: 5,
    npc: 'BOSS',
    story: 'El Senor del Nucleo protege el corazon del sistema. Solo aquellos que entiendan procesos, memoria, red y logs podran acceder a las Bovedas de la Seguridad.',
    hints: ['Usa ps, free, df, ip, ping', 'Muestra que entiendes el hardware y la red'],
    requiredCommands: ['ps', 'free', 'df', 'ip', 'ping', 'ss', 'uname', 'date'],
    objectives: [
      { id: 1, description: 'Muestra procesos y memoria del sistema', type: 'command_output', command: 'ps aux | wc -l && free -h | head -2', validationFn: 'output.length > 0' },
      { id: 2, description: 'Muestra espacio en disco y red', type: 'command_output', command: 'df -h / && ip addr show | grep "inet "', validationFn: 'output.includes("%")' }
    ],
    prerequisites: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
    rewards: { xp: 250, coins: 150, achievement: 'mundo_4' }
  },

  // ==========================================
  // MUNDO 5: LAS BÓVEDAS DE LA SEGURIDAD (15 misiones)
  // Tema 5 LPI: Seguridad y permisos (peso 7)
  // ==========================================
  {
    id: 66,
    title: 'Tu Identidad en el Reino',
    description: 'Identifícate con whoami, id y who',
    world: 5, order: 1, difficulty: 1,
    npc: 'Sudo-Man',
    story: '"Bienvenido a las Bovedas de la Seguridad. Aqui el poder se otorga con responsabilidad. Primero: ¿quien eres? whoami, id y who revelan tu identidad y la de otros en el reino."',
    hints: ['whoami = tu nombre de usuario', 'id = UID, GID y grupos', 'who = quien esta conectado actualmente'],
    requiredCommands: ['whoami', 'id', 'who'],
    objectives: [
      { id: 1, description: 'Revela tu identidad completa', type: 'command_output', command: 'whoami && id', validationFn: 'output.includes("uid=")' },
      { id: 2, description: 'Muestra quien esta conectado', type: 'command_output', command: 'who 2>/dev/null || w 2>/dev/null || echo "Solo tu estas conectado"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [65],
    rewards: { xp: 40, coins: 5 }
  },
  {
    id: 67,
    title: 'El Libro de los Usuarios',
    description: 'Lee /etc/passwd para entender los usuarios',
    world: 5, order: 2, difficulty: 2,
    npc: 'Sudo-Man',
    story: '"/etc/passwd es el libro de registro de todos los usuarios del reino. Cada linea tiene 7 campos separados por : usuario:x:UID:GID:info:home:shell. No contiene contrasenas."',
    hints: ['7 campos separados por :', 'x en el segundo campo = contrasena en /etc/shadow', 'UID 0 = root, 1000+ = usuarios normales'],
    requiredCommands: ['cat', 'cut'],
    objectives: [
      { id: 1, description: 'Lee el libro de los usuarios', type: 'command_output', command: 'cat /etc/passwd | head -5', validationFn: 'output.includes("root")' },
      { id: 2, description: 'Extrae solo los nombres de usuario', type: 'command_output', command: 'cut -d ":" -f 1 /etc/passwd', validationFn: 'output.includes("root")' }
    ],
    prerequisites: [65],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 68,
    title: 'Los Permisos Sagrados',
    description: 'Interpreta los permisos de archivos con ls -la',
    world: 5, order: 3, difficulty: 2,
    npc: 'Sudo-Man',
    story: '"Los permisos son las leyes del reino. -rwxr-xr-- significa: dueno puede leer/escribir/ejecutar, grupo puede leer/ejecutar, otros solo leer. Aprende a leer esta escritura sagrada."',
    hints: ['r=4(leer), w=2(escribir), x=1(ejecutar)', 'Primer caracter: - = archivo, d = directorio', '3 grupos: usuario, grupo, otros'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Interpreta los permisos de archivos del sistema', type: 'command_output', command: 'ls -la /etc/passwd /etc/shadow /tmp 2>/dev/null', validationFn: 'output.includes("root")' },
      { id: 2, description: 'Interpreta permisos del directorio /reino', type: 'command_output', command: 'ls -la /reino/', validationFn: 'output.includes("distros")' }
    ],
    prerequisites: [65],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 69,
    title: 'Los Permisos en Octal',
    description: 'Lee permisos con stat y cambia con chmod 755',
    world: 5, order: 4, difficulty: 3,
    npc: 'Sudo-Man',
    story: '"El modo octal resume permisos en numeros: 755 = rwxr-xr-x, 644 = rw-r--r--, 600 = rw-------. stat -c %a muestra el octal actual. chmod lo cambia."',
    hints: ['stat -c %a archivo muestra permisos en octal', 'chmod 755 = rwxr-xr-x (scripts/directorios)', 'chmod 644 = rw-r--r-- (archivos normales)'],
    requiredCommands: ['stat', 'chmod'],
    objectives: [
      { id: 1, description: 'Crea un archivo y asigna permisos 755', type: 'command_output', command: 'touch /tmp/test_perm.txt && chmod 755 /tmp/test_perm.txt && stat -c %a /tmp/test_perm.txt', validationFn: 'output.includes("755")' }
    ],
    prerequisites: [68],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 70,
    title: 'El Cambio Simbólico',
    description: 'Cambia permisos con notacion simbolica',
    world: 5, order: 5, difficulty: 3,
    npc: 'Sudo-Man',
    story: '"La notacion simbolica es mas intuitiva: u+x agrega ejecucion al dueno, g-w quita escritura al grupo, o=r da solo lectura a otros. u=usuario, g=grupo, o=otros, a=todos."',
    hints: ['chmod u+x agrega ejecucion al dueno', 'chmod g-w quita escritura al grupo', 'chmod o=r da solo lectura a otros'],
    requiredCommands: ['chmod'],
    objectives: [
      { id: 1, description: 'Cambia permisos con notacion simbolica', type: 'command_output', command: 'touch /tmp/simb_test.txt && chmod u+x,g-w,o=r /tmp/simb_test.txt && ls -l /tmp/simb_test.txt', validationFn: 'output.includes("x")' }
    ],
    prerequisites: [68],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 71,
    title: 'La Propiedad Cambiada',
    description: 'Cambia propietario con chown y chgrp',
    world: 5, order: 6, difficulty: 3,
    npc: 'Sudo-Man',
    story: '"chown cambia el propietario de un archivo. chgrp cambia el grupo. Solo root puede cambiar la propiedad de archivos de otros."',
    hints: ['chown usuario archivo cambia el propietario', 'chown usuario:archivo cambia ambos', 'chgrp grupo archivo cambia solo el grupo'],
    requiredCommands: ['chown', 'chgrp'],
    objectives: [
      { id: 1, description: 'Cambia la propiedad de un archivo', type: 'command_output', command: 'touch /tmp/chown_test.txt && ls -l /tmp/chown_test.txt', validationFn: 'output.includes("chown_test")' }
    ],
    prerequisites: [68],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 72,
    title: 'El SUID Mágico',
    description: 'Entiende y aplica el bit SUID',
    world: 5, order: 7, difficulty: 4,
    npc: 'Sudo-Man',
    story: '"SUID (Set User ID) hace que un programa se ejecute con los permisos de su dueno, no de quien lo ejecuta. passwd lo necesita para escribir en /etc/shadow. chmod u+s lo activa."',
    hints: ['chmod u+s archivo activa SUID', 'chmod 4755 archivo es la forma numerica', 'El ejecutable se corre como el dueno (ej: root)'],
    requiredCommands: ['chmod', 'ls'],
    objectives: [
      { id: 1, description: 'Aprende sobre el poder SUID', type: 'command_output', command: 'ls -l /usr/bin/passwd 2>/dev/null | head -1', validationFn: 'output.includes("s") || output.includes("x")' }
    ],
    prerequisites: [68],
    rewards: { xp: 70, coins: 15 }
  },
  {
    id: 73,
    title: 'El Pegajoso de /tmp',
    description: 'Entiende el sticky bit en directorios',
    world: 5, order: 8, difficulty: 3,
    npc: 'Sudo-Man',
    story: '"El sticky bit (+t) en un directorio significa que solo el dueno de un archivo puede borrarlo, aunque el directorio sea escribible por todos. /tmp lo tiene."',
    hints: ['ls -ld /tmp muestra el sticky bit (t al final)', 'chmod +t directorio activa el sticky bit', 'chmod 1755 es la forma numerica'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Verifica el sticky bit de /tmp', type: 'command_output', command: 'ls -ld /tmp', validationFn: 'output.includes("t") || output.includes("T")' }
    ],
    prerequisites: [68],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 74,
    title: 'El Enlace Duro',
    description: 'Crea hard links con ln',
    world: 5, order: 9, difficulty: 3,
    npc: 'Sudo-Man',
    story: '"Un hard link es otro nombre para el mismo archivo (mismo inodo). Si borras el original, el hard link sigue funcionando. Solo funciona dentro del mismo filesystem."',
    hints: ['ln archivo enlace crea un hard link', 'Comparten el mismo inodo', 'Borrar uno NO afecta al otro'],
    requiredCommands: ['ln'],
    objectives: [
      { id: 1, description: 'Crea un enlace duro', type: 'command_output', command: 'echo "contenido" > /tmp/original.txt && ln /tmp/original.txt /tmp/enlace_duro.txt && ls -li /tmp/original.txt /tmp/enlace_duro.txt', validationFn: 'output.includes("original")' }
    ],
    prerequisites: [68],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 75,
    title: 'El Enlace Suave',
    description: 'Crea symbolic links con ln -s',
    world: 5, order: 10, difficulty: 3,
    npc: 'Sudo-Man',
    story: '"Un symbolic link (symlink) es un acceso directo que apunta a otra ruta. Si borras el original, el symlink queda roto. Puede cruzar filesystems."',
    hints: ['ln -s archivo enlace crea un symlink', 'Si borras el original, el symlink queda roto', 'Puede cruzar filesystems'],
    requiredCommands: ['ln'],
    objectives: [
      { id: 1, description: 'Crea un enlace simbolico', type: 'command_output', command: 'ln -s /tmp/original.txt /tmp/enlace_suave.txt && ls -l /tmp/enlace_suave.txt', validationFn: 'output.includes("->")' }
    ],
    prerequisites: [74],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 76,
    title: 'El Grupo Sagrado',
    description: 'Lee /etc/group para entender los grupos',
    world: 5, order: 11, difficulty: 2,
    npc: 'Sudo-Man',
    story: '"/etc/group es el libro de los clanes del reino. Cada linea: grupo:x:GID:miembros. Los grupos controlan el acceso compartido a recursos."',
    hints: ['4 campos separados por :', 'grupo:x:GID:miembros', 'groups comando muestra tus grupos'],
    requiredCommands: ['cat', 'groups'],
    objectives: [
      { id: 1, description: 'Lee el libro de los grupos', type: 'command_output', command: 'cat /etc/group | head -5', validationFn: 'output.includes("root")' },
      { id: 2, description: 'Muestra tus grupos', type: 'command_output', command: 'groups', validationFn: 'output.length > 0' }
    ],
    prerequisites: [65],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 77,
    title: 'Crear un Aliado',
    description: 'Aprende a crear usuarios con useradd y passwd',
    world: 5, order: 12, difficulty: 3,
    npc: 'Sudo-Man',
    story: '"useradd -m crea un nuevo guerrero con su propio hogar. passwd le asigna una contrasena. usermod -aG lo agrega a un grupo. Cada usuario tiene su UID unico."',
    hints: ['useradd -m usuario crea usuario con home', 'passwd usuario asigna contrasena', 'usermod -aG grupo usuario agrega a grupo (-a = append)'],
    requiredCommands: ['echo', 'cat'],
    objectives: [
      { id: 1, description: 'Aprende la sintaxis para crear usuarios', type: 'command_output', command: 'echo "Para crear un usuario:" && echo "  useradd -m aliado" && echo "  passwd aliado" && echo "  usermod -aG sudo aliado" && cat /etc/passwd | head -3', validationFn: 'output.includes("useradd")' }
    ],
    prerequisites: [67],
    rewards: { xp: 70, coins: 15 }
  },
  {
    id: 78,
    title: 'Archivos Especiales',
    description: 'Explora /dev y entiende los dispositivos',
    world: 5, order: 13, difficulty: 2,
    npc: 'Sudo-Man',
    story: '"/dev contiene los archivos de dispositivos del sistema. /dev/null es un agujero negro que traga todo. /dev/zero genera ceros infinitos. /dev/random genera datos aleatorios."',
    hints: ['/dev/null descarta todo lo que le envies', '/dev/zero genera bytes de cero', '/dev/random genera datos aleatorios'],
    requiredCommands: ['ls', 'echo'],
    objectives: [
      { id: 1, description: 'Explora los dispositivos del reino', type: 'command_output', command: 'ls /dev/null /dev/zero /dev/random 2>/dev/null', validationFn: 'output.includes("null")' },
      { id: 2, description: 'Descarta texto con /dev/null', type: 'command_output', command: 'echo "Este texto desaparece" > /dev/null && echo "Funciona"', validationFn: 'output.includes("Funciona")' }
    ],
    prerequisites: [65],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 79,
    title: 'Logs de Seguridad',
    description: 'Lee los registros de autenticacion',
    world: 5, order: 14, difficulty: 2,
    npc: 'Sudo-Man',
    story: '"/var/log/auth.log registra todos los intentos de autenticacion: logins exitosos, fallidos, uso de sudo. Es el guardian que vigila quien entra al reino."',
    hints: ['/var/log/auth.log (Debian/Ubuntu)', '/var/log/secure (Red Hat/CentOS)', 'tail -f sigue en tiempo real'],
    requiredCommands: ['cat', 'tail'],
    objectives: [
      { id: 1, description: 'Lee los registros de seguridad del reino', type: 'command_output', command: 'tail -n 5 /var/log/auth.log 2>/dev/null || tail -n 5 /var/log/secure 2>/dev/null || echo "Logs de seguridad no accesibles"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [64],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 80,
    title: 'Boss: El Guardián Supremo',
    description: 'Demuestra que dominas la seguridad y permisos de Linux',
    world: 5, order: 15, difficulty: 5,
    npc: 'BOSS',
    story: 'El Guardian Supremo protege las Bovedas de la Seguridad. Solo aquellos que entiendan usuarios, grupos, permisos, SUID, sticky bit y enlaces podran obtener el Pergamino de la Certificacion.',
    hints: ['Usa whoami, id, chmod, chown, ls -la', 'Recuerda: r=4, w=2, x=1', 'SUID=4, SGID=2, Sticky=1'],
    requiredCommands: ['whoami', 'id', 'chmod', 'chown', 'ls', 'cat', 'ln'],
    objectives: [
      { id: 1, description: 'Identificate y muestra tus permisos', type: 'command_output', command: 'whoami && id', validationFn: 'output.includes("uid=")' },
      { id: 2, description: 'Crea un archivo con permisos especificos', type: 'command_output', command: 'touch /tmp/boss_test.txt && chmod 644 /tmp/boss_test.txt && stat -c %a /tmp/boss_test.txt', validationFn: 'output.includes("644")' },
      { id: 3, description: 'Crea un enlace simbolico', type: 'command_output', command: 'ln -sf /tmp/boss_test.txt /tmp/boss_link.txt && ls -l /tmp/boss_link.txt', validationFn: 'output.includes("->")' }
    ],
    prerequisites: [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    rewards: { xp: 500, coins: 300, achievement: 'mundo_5', title: 'Guardian de Linux' }
  },

  // ==========================================
  // QUESTS EXTRA (5 misiones)
  // Refuerzo de temas LPI importantes
  // ==========================================
  {
    id: 81,
    title: 'El Editor de los Antiguos',
    description: 'Conoce vi, el editor ancestral del reino',
    world: 1, order: 13, difficulty: 3,
    npc: 'Linux el Sabio',
    story: '"vi es el editor mas antiguo y poderoso de Linux. Tiene 3 modos: comando (navegar), insercion (escribir) y ex (guardar/salir). Aunque intimidante, es vital para la certificacion."',
    hints: ['i entra en modo insercion', 'ESC sale de insercion', ':w guarda, :q sale, :wq guarda y sale', ':q! sale sin guardar'],
    requiredCommands: ['vi'],
    objectives: [
      { id: 1, description: 'Consulta la version de vi', type: 'command_output', command: 'vi --version 2>/dev/null | head -3 || echo "vi no disponible"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 60, coins: 10 }
  },
  {
    id: 82,
    title: 'El Editor Moderno',
    description: 'Conoce nano, el editor amigable',
    world: 1, order: 14, difficulty: 2,
    npc: 'Linux el Sabio',
    story: '"nano es el editor amigable para principiantes. Ctrl+O guarda, Ctrl+X sale, Ctrl+W busca. No tiene modos como vi: escribes directamente."',
    hints: ['Ctrl+O = guardar', 'Ctrl+X = salir', 'Ctrl+W = buscar', 'Ctrl+K = cortar linea, Ctrl+U = pegar'],
    requiredCommands: ['nano'],
    objectives: [
      { id: 1, description: 'Consulta la version de nano', type: 'command_output', command: 'nano --version 2>/dev/null | head -3 || echo "nano no disponible"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 83,
    title: 'El Tipo de Archivo',
    description: 'Identifica tipos de archivo con file',
    world: 2, order: 19, difficulty: 2,
    npc: 'Grep-ild',
    story: '"file es el adivino del reino. Mira un archivo y dice que es: texto, imagen, ejecutable, comprimido. No se fia de la extension: lee el contenido real."',
    hints: ['file archivo dice que tipo es', 'Lee magic bytes, no la extension', 'Util para archivos sin extension'],
    requiredCommands: ['file'],
    objectives: [
      { id: 1, description: 'Identifica el tipo de archivos del reino', type: 'command_output', command: 'file /etc/passwd && file /reino/distros/debian.txt && file /tmp/saludo.sh 2>/dev/null', validationFn: 'output.includes("text")' }
    ],
    prerequisites: [30],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 84,
    title: 'La Búsqueda Rápida',
    description: 'Busca archivos con locate',
    world: 3, order: 19, difficulty: 2,
    npc: 'Chmod-ard',
    story: '"locate es la busqueda relampago. Usa una base de datos pre-indexada para encontrar archivos en milisegundos. Mas rapido que find, pero necesita actualizacion periodica."',
    hints: ['locate archivo busca en la base de datos', 'sudo updatedb actualiza la base', 'Mas rapido que find pero puede no tener archivos nuevos'],
    requiredCommands: ['locate'],
    objectives: [
      { id: 1, description: 'Busca archivos con locate', type: 'command_output', command: 'locate passwd 2>/dev/null | head -5 || echo "locate no disponible (necesita updatedb)"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [48],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 85,
    title: 'El Permisos de /var/tmp',
    description: 'Compara /tmp y /var/tmp',
    world: 5, order: 16, difficulty: 3,
    npc: 'Sudo-Man',
    story: '"/tmp se borra al reiniciar. /var/tmp persiste entre reinicios. Ambos tienen sticky bit. Es importante saber cual usar para archivos temporales."',
    hints: ['/tmp = temporal, se borra al boot', '/var/tmp = persistente, sobrevive al boot', 'Ambos tienen sticky bit (drwxrwxrwt)'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Compara los permisos de /tmp y /var/tmp', type: 'command_output', command: 'ls -ld /tmp /var/tmp', validationFn: 'output.includes("tmp")' }
    ],
    prerequisites: [73],
    rewards: { xp: 60, coins: 10 }
  }
];

const seedQuests = async () => {
  try {
    console.log(`Seeding ${quests.length} quests from LPI Linux Essentials curriculum...`);

    await pool.query('TRUNCATE TABLE user_quest_progress CASCADE');
    await pool.query('TRUNCATE TABLE quests CASCADE');
    console.log('Cleared existing quest data');

    for (const quest of quests) {
      await pool.query(
        `INSERT INTO quests
         (title, description, world, "order", difficulty, npc, story, hints, required_commands, objectives, prerequisites, rewards)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          quest.title,
          quest.description,
          quest.world,
          quest.order,
          quest.difficulty,
          quest.npc,
          quest.story,
          JSON.stringify(quest.hints),
          JSON.stringify(quest.requiredCommands),
          JSON.stringify(quest.objectives),
          JSON.stringify(quest.prerequisites),
          JSON.stringify(quest.rewards)
        ]
      );
    }

    console.log(`✅ ${quests.length} quests seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding quests:', error.message);
    process.exit(1);
  }
};

seedQuests();
