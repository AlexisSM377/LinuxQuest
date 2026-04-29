import pool from '../src/db.js';

const quests = [
  // MUNDO 1: CASTILLO DE LINUX (15 misiones)
  {
    id: 1,
    title: 'El Despertar del Iniciado',
    description: 'Entender qué es una distribución Linux',
    world: 1,
    order: 1,
    difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'El anciano sabio te recibe y te pide que descubras qué versión de Linux ejecutas.',
    hints: ['Usa uname para ver información del sistema', 'uname -a muestra todos los detalles'],
    requiredCommands: ['uname'],
    objectives: [
      { id: 1, description: 'Ejecuta uname -a', type: 'command_output', command: 'uname -a', validationFn: 'output.includes("Linux")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 2,
    title: 'Identificando el Reino',
    description: 'Identifica la distribución actual del sistema',
    world: 1,
    order: 2,
    difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'Ahora necesitas saber exactamente qué distribución usas.',
    hints: ['cat /etc/os-release muestra información de la distribución', 'Busca la línea NAME='],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee /etc/os-release', type: 'command_output', command: 'cat /etc/os-release', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 3,
    title: 'El Pergamino de las Familias',
    description: 'Aprender sobre la familia Debian',
    world: 1,
    order: 3,
    difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'Las distribuciones se agrupan en familias. Debian es la madre de muchas.',
    hints: ['Familias principales: Debian, Red Hat, Arch', 'Debian incluye: Ubuntu, Mint, Kali'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Comprende las familias de distribuciones', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 4,
    title: 'El Estandarte del León',
    description: 'Conocer la familia Red Hat',
    world: 1,
    order: 4,
    difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'La familia Red Hat es el reino corporativo de Linux.',
    hints: ['Red Hat es la distribución empresarial', 'Fedora, CentOS y Rocky Linux derivan de Red Hat', 'Usan yum/dnf como gestor de paquetes'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Comprende Red Hat y derivadas', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 5,
    title: 'Los Tesoros de Office',
    description: 'Aprender alternativas de software libre para ofimática',
    world: 1,
    order: 5,
    difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'En Linux tienes alternativas libres para todo software propietario.',
    hints: ['LibreOffice es la suite ofimática libre', 'GIMP es el Photoshop libre', 'Blender para 3D y animación'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Conoce alternativas libres', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 6,
    title: 'El Camino del Servidor',
    description: 'Identificar servicios y software para servidores',
    world: 1,
    order: 6,
    difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'Linux es el rey de los servidores. Aprende los principales servicios.',
    hints: ['Apache y Nginx son servidores web', 'MySQL y PostgreSQL para bases de datos', 'Postfix para correo'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Identifica servicios de servidor', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 7,
    title: 'El Pacto de la Libertad',
    description: 'Entender las 4 libertades del software libre',
    world: 1,
    order: 7,
    difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'El software libre tiene 4 libertades fundamentales según la FSF.',
    hints: ['Libertad 1: Usar para cualquier propósito', 'Libertad 2: Estudiar y modificar', 'Libertad 3: Distribuir copias', 'Libertad 4: Mejorar y compartir mejoras'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Memoriza las 4 libertades del software libre', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 8,
    title: 'Las Diez Licencias',
    description: 'Conocer GPL vs MIT y otras licencias importantes',
    world: 1,
    order: 8,
    difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'Licencias como GPL y MIT protegen el software libre de diferentes formas.',
    hints: ['GPL es copyleft: exige que derivadas sean libres', 'MIT es permisiva: permite uso comercial privado', 'Linux usa GPLv2'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Entiende GPL vs MIT', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 9,
    title: 'Los Embajadores Libres',
    description: 'Conocer FSF y OSI',
    world: 1,
    order: 9,
    difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'FSF y OSI son organizaciones que defienden el software libre.',
    hints: ['FSF: Free Software Foundation (Stallman)', 'OSI: Open Source Initiative', 'Ambas luchan por la libertad del software'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Comprende el rol de FSF y OSI', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 10,
    title: 'El Escritorio Místico',
    description: 'Identificar entornos gráficos en Linux',
    world: 1,
    order: 10,
    difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'Existen varios entornos gráficos (DE) en Linux con diferentes estilos.',
    hints: ['GNOME es moderno y simplista', 'KDE Plasma es muy configurable', 'XFCE es ligera y rápida', 'Cinnamon se parece a Windows', 'MATE es clásica'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Conoce los principales entornos gráficos', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 11,
    title: 'La Nube Mágica',
    description: 'Entender cloud computing y Linux',
    world: 1,
    order: 11,
    difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'La mayoría de servicios cloud corren Linux internamente.',
    hints: ['AWS, Azure y GCP usan Linux', 'Cloud ofrece escalabilidad y pago por uso', 'No necesitas comprar hardware'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Comprende cloud computing', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 12,
    title: 'Los Sistemas Embebidos',
    description: 'Linux en dispositivos pequeños (Raspberry Pi, Android)',
    world: 1,
    order: 12,
    difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'Linux no solo está en computadoras: está en smartphones, routers y más.',
    hints: ['Android es Linux modificado', 'Raspberry Pi usa Raspbian (derivada de Debian)', 'Routers usan OpenWRT'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Conoce Linux embebido', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 13,
    title: 'El Desafío del Encriptado',
    description: 'Conceptos básicos de GPG y encriptación',
    world: 1,
    order: 13,
    difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'La privacidad es importante. GPG te permite encriptar datos.',
    hints: ['gpg --version muestra la versión de GPG', 'GPG usa criptografía de clave pública', 'Puedes encriptar archivos y mensajes'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Entiende conceptos de GPG', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 14,
    title: 'El Guardián de la Privacidad',
    description: 'HTTPS, VPN, Tor y privacidad en internet',
    world: 1,
    order: 14,
    difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'Tu privacidad en internet requiere herramientas y conocimiento.',
    hints: ['HTTPS encripta la comunicación web', 'VPN enmascara tu IP', 'Tor anonimiza tu identidad', 'Cookies rastrean tu actividad'],
    requiredCommands: ['pwd'],
    objectives: [
      { id: 1, description: 'Aprende sobre privacidad y seguridad en internet', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 15,
    title: 'Boss: Guardián del Conocimiento Libre',
    description: 'Demuestra dominio completo del Tema 1 LPI',
    world: 1,
    order: 15,
    difficulty: 5,
    npc: 'El Guardián del Castillo',
    story: 'Has aprendido toda la historia y filosofía de Linux. Ahora demuéstrale al Guardián tu sabiduría.',
    hints: ['Necesitarás toda la información del Mundo 1', 'Prepárate para preguntas sobre distribuciones, licencias y concepto'],
    requiredCommands: ['pwd', 'uname', 'cat'],
    objectives: [
      { id: 1, description: 'Supera el desafío final', type: 'command_output', command: 'echo success', validationFn: 'output.includes("success")' }
    ],
    prerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    rewards: { xp: 200, coins: 100, achievement: 'mundo_1_complete' }
  },

  // MUNDO 2: CAMINOS PERDIDOS (20 misiones)
  {
    id: 16,
    title: 'El Primer Paso del Caminante',
    description: 'Aprende la estructura básica de un comando',
    world: 2,
    order: 1,
    difficulty: 1,
    npc: 'Grep-ild',
    story: 'GREP-ILD te enseña que cada comando tiene opciones y argumentos.',
    hints: ['Estructura: comando -opciones argumentos', 'echo es un comando simple', 'pwd no necesita argumentos'],
    requiredCommands: ['pwd', 'echo'],
    objectives: [
      { id: 1, description: 'Ejecuta pwd', type: 'command_output', command: 'pwd', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 17,
    title: 'El Eco del Cambio',
    description: 'Domina el comando echo',
    world: 2,
    order: 2,
    difficulty: 1,
    npc: 'Grep-ild',
    story: 'echo es tu primer poder: repetir lo que dices.',
    hints: ['echo imprime texto', 'echo "Hola Mundo"', 'echo $USER muestra tu nombre'],
    requiredCommands: ['echo'],
    objectives: [
      { id: 1, description: 'Usa echo con texto', type: 'command_output', command: 'echo test', validationFn: 'output.includes("test")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 18,
    title: 'Listando los Tesoros',
    description: 'El comando ls muestra archivos y directorios',
    world: 2,
    order: 3,
    difficulty: 1,
    npc: 'Grep-ild',
    story: 'Ahora aprenderás a explorar directorios con ls.',
    hints: ['ls muestra los archivos', 'ls -l muestra más detalles', 'ls -a incluye archivos ocultos'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Ejecuta ls', type: 'command_output', command: 'ls', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 19,
    title: 'Creando Directorios',
    description: 'Aprende mkdir para crear directorios',
    world: 2,
    order: 4,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'Es hora de organizar: crea tus propios directorios.',
    hints: ['mkdir nombre crea un directorio', 'mkdir -p a/b/c crea anidados', 'Verifica con ls'],
    requiredCommands: ['mkdir', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un directorio llamado "proyecto"', type: 'command_output', command: 'mkdir proyecto', validationFn: 'true' },
      { id: 2, description: 'Verifica su creación con ls', type: 'command_output', command: 'ls', validationFn: 'output.includes("proyecto")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 20,
    title: 'Tocando la Existencia',
    description: 'Usa touch para crear archivos',
    world: 2,
    order: 5,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'Con touch puedes crear archivos vacíos.',
    hints: ['touch archivo.txt crea un archivo', 'Verifica con ls', 'Puedes crear varios a la vez'],
    requiredCommands: ['touch', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo llamado datos.txt', type: 'command_output', command: 'touch datos.txt', validationFn: 'true' },
      { id: 2, description: 'Verifica su existencia', type: 'command_output', command: 'ls', validationFn: 'output.includes("datos")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 21,
    title: 'Leyendo el Pasado',
    description: 'El comando cat muestra contenido de archivos',
    world: 2,
    order: 6,
    difficulty: 1,
    npc: 'Grep-ild',
    story: 'Con cat puedes leer qué contienen los archivos.',
    hints: ['cat archivo.txt muestra su contenido', 'cat < archivo redirige entrada', 'man cat para más opciones'],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee el archivo datos.txt', type: 'command_output', command: 'cat datos.txt', validationFn: 'output.length >= 0' }
    ],
    prerequisites: [20],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 22,
    title: 'El Camino hacia Atrás',
    description: 'Navega con cd (change directory)',
    world: 2,
    order: 7,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'cd te permite moverte entre directorios.',
    hints: ['cd / va a la raíz', 'cd ~ va a home', 'cd .. sube un nivel', 'cd - vuelve al anterior'],
    requiredCommands: ['cd', 'pwd'],
    objectives: [
      { id: 1, description: 'Cambia a home y verifica con pwd', type: 'command_output', command: 'pwd', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 23,
    title: 'Variables: El Poder de Recordar',
    description: 'Usa variables de entorno',
    world: 2,
    order: 8,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'Las variables almacenan información que el sistema usa.',
    hints: ['$USER contiene tu nombre', 'echo $HOME muestra tu directorio', '$PWD es el directorio actual'],
    requiredCommands: ['echo'],
    objectives: [
      { id: 1, description: 'Usa echo para mostrar $USER', type: 'command_output', command: 'echo $USER', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 24,
    title: 'El Comando Which',
    description: 'Encuentra dónde están los comandos',
    world: 2,
    order: 9,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'which te dice dónde se encuentra un comando ejecutable.',
    hints: ['which ls muestra dónde está ls', 'which cd muestra nada (es un builtin del shell)'],
    requiredCommands: ['which'],
    objectives: [
      { id: 1, description: 'Usa which para localizar ls', type: 'command_output', command: 'which ls', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 25,
    title: 'Ayuda: El Manual Man',
    description: 'Aprende a usar man (manual)',
    world: 2,
    order: 10,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'man es tu mejor amigo: contiene documentación de todo comando.',
    hints: ['man ls muestra el manual de ls', 'q para salir', 'man -k busca en títulos', 'man -f comando da descripción corta'],
    requiredCommands: ['man'],
    objectives: [
      { id: 1, description: 'Comprende cómo usar man', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 26,
    title: 'Eliminar Archivos: rm',
    description: 'Aprende a eliminar archivos (¡con cuidado!)',
    world: 2,
    order: 11,
    difficulty: 3,
    npc: 'Grep-ild',
    story: 'rm borra archivos. ¡Ten cuidado: no se pueden recuperar!',
    hints: ['rm archivo.txt elimina un archivo', 'rm -r directorio elimina un directorio', 'NO uses rm con /*'],
    requiredCommands: ['rm', 'touch', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo temporal', type: 'command_output', command: 'touch temp.txt', validationFn: 'true' },
      { id: 2, description: 'Elimina el archivo', type: 'command_output', command: 'rm temp.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 25 }
  },
  {
    id: 27,
    title: 'Copiar Archivos: cp',
    description: 'Aprende a copiar archivos',
    world: 2,
    order: 12,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'cp copia archivos. Útil para hacer respaldos.',
    hints: ['cp archivo.txt copia.txt', 'cp -r directorio/ copia_dir/ copia recursivamente'],
    requiredCommands: ['cp', 'touch', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo source', type: 'command_output', command: 'touch source.txt', validationFn: 'true' },
      { id: 2, description: 'Cópialo', type: 'command_output', command: 'cp source.txt backup.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 28,
    title: 'Mover Archivos: mv',
    description: 'Aprende a mover y renombrar',
    world: 2,
    order: 13,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'mv mueve archivos o los renombra.',
    hints: ['mv archivo.txt nuevo_nombre.txt renombra', 'mv archivo.txt directorio/ mueve'],
    requiredCommands: ['mv', 'touch', 'mkdir'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'touch miarchivo.txt', validationFn: 'true' },
      { id: 2, description: 'Renómbralo', type: 'command_output', command: 'mv miarchivo.txt renombrado.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 29,
    title: 'Rutas Absolutas vs Relativas',
    description: 'Entiende la diferencia de cómo especificar rutas',
    world: 2,
    order: 14,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'Las rutas pueden ser absolutas (desde /) o relativas (desde donde estás).',
    hints: ['Rutas absolutas: /home/usuario/archivo', 'Rutas relativas: ./archivo o ../archivo', 'pwd muestra tu ruta absoluta'],
    requiredCommands: ['pwd', 'cd', 'ls'],
    objectives: [
      { id: 1, description: 'Comprende rutas absolutas y relativas', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 30,
    title: 'Archivos Ocultos: El Punto',
    description: 'Los archivos que comienzan con . están ocultos',
    world: 2,
    order: 15,
    difficulty: 1,
    npc: 'Grep-ild',
    story: 'Los archivos ocultos comienzan con un punto.',
    hints: ['ls no muestra archivos ocultos', 'ls -a muestra todo', '.bashrc y .bash_profile son configuración'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Ejecuta ls -a para ver ocultos', type: 'command_output', command: 'ls -a', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 31,
    title: 'Directorio Especial: Home',
    description: 'Comprende tu directorio home (~)',
    world: 2,
    order: 16,
    difficulty: 1,
    npc: 'Grep-ild',
    story: 'Tu home es donde tienes permisos completos.',
    hints: ['~ representa tu home', 'cd ~ te lleva a home', '$HOME contiene la ruta'],
    requiredCommands: ['cd', 'pwd'],
    objectives: [
      { id: 1, description: 'Navega a home y verifica con pwd', type: 'command_output', command: 'pwd', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 32,
    title: 'Buscando Archivos: find',
    description: 'Usa find para buscar archivos',
    world: 2,
    order: 17,
    difficulty: 3,
    npc: 'Grep-ild',
    story: 'find es poderoso: busca recursivamente en directorios.',
    hints: ['find . -name "*.txt" busca archivos .txt', 'find / -name "archivo" busca en todo', 'find . -type f busca solo archivos'],
    requiredCommands: ['find'],
    objectives: [
      { id: 1, description: 'Busca archivos .txt en el directorio actual', type: 'command_output', command: 'find . -name "*.txt"', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 20 }
  },
  {
    id: 33,
    title: 'Contando: wc',
    description: 'wc cuenta líneas, palabras y caracteres',
    world: 2,
    order: 18,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'wc es útil para estadísticas de archivos.',
    hints: ['wc archivo.txt muestra líneas, palabras, caracteres', 'wc -l archivo muestra solo líneas', 'wc -w cuenta palabras'],
    requiredCommands: ['wc'],
    objectives: [
      { id: 1, description: 'Cuenta líneas en un archivo', type: 'command_output', command: 'wc -l datos.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 34,
    title: 'Ordenando: sort',
    description: 'sort ordena líneas de archivos',
    world: 2,
    order: 19,
    difficulty: 2,
    npc: 'Grep-ild',
    story: 'sort organiza datos alfabética o numéricamente.',
    hints: ['sort archivo.txt ordena alfabéticamente', 'sort -n ordena numéricamente', 'sort -r ordena invertido'],
    requiredCommands: ['sort'],
    objectives: [
      { id: 1, description: 'Ordena el contenido de un archivo', type: 'command_output', command: 'sort datos.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 35,
    title: 'Boss: Maestro de Caminos',
    description: 'Domina la navegación y manipulación de archivos',
    world: 2,
    order: 20,
    difficulty: 5,
    npc: 'El Rey de los Caminos',
    story: 'Has aprendido a navegar y manipular archivos. Demuéstrale tu maestría.',
    hints: ['Necesitarás todos los comandos del Mundo 2'],
    requiredCommands: ['pwd', 'ls', 'cd', 'mkdir', 'touch', 'cat', 'find', 'rm', 'cp', 'mv'],
    objectives: [
      { id: 1, description: 'Supera el desafío final', type: 'command_output', command: 'echo success', validationFn: 'output.includes("success")' }
    ],
    prerequisites: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    rewards: { xp: 200, coins: 100, achievement: 'mundo_2_complete' }
  },

  // MUNDO 3: TORRES ANTIGUAS DEL PODER (15 misiones)
  {
    id: 36,
    title: 'El Poder de Grep',
    description: 'Aprende grep para buscar patrones',
    world: 3,
    order: 1,
    difficulty: 3,
    npc: 'Chmod-ard',
    story: 'CHMOD-ARD te enseña grep: el poder para buscar información.',
    hints: ['grep palabra archivo busca líneas con palabra', 'grep -i ignora mayúsculas', 'grep -n muestra números de línea'],
    requiredCommands: ['grep'],
    objectives: [
      { id: 1, description: 'Busca un patrón en un archivo', type: 'command_output', command: 'grep Linux datos.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 25 }
  },
  {
    id: 37,
    title: 'Tuberías: El Flujo de Datos',
    description: 'Usa el pipe (|) para conectar comandos',
    world: 3,
    order: 2,
    difficulty: 3,
    npc: 'Chmod-ard',
    story: 'El verdadero poder de Linux: conectar comandos con pipes.',
    hints: ['ls | grep txt busca archivos .txt en el listado', 'comando1 | comando2 enruía salida de 1 a 2'],
    requiredCommands: ['ls', 'grep'],
    objectives: [
      { id: 1, description: 'Usa un pipe para buscar en listado', type: 'command_output', command: 'ls | grep txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 25 }
  },
  {
    id: 38,
    title: 'Redirección: Guardando Poder',
    description: 'Guarda salida de comandos en archivos',
    world: 3,
    order: 3,
    difficulty: 2,
    npc: 'Chmod-ard',
    story: 'Redirige la salida de comandos a archivos.',
    hints: ['echo "texto" > archivo.txt crea/sobreescribe', 'echo "más" >> archivo.txt añade', 'ls > listado.txt guarda listado'],
    requiredCommands: ['echo'],
    objectives: [
      { id: 1, description: 'Redirige echo a un archivo', type: 'command_output', command: 'echo test > output.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 39,
    title: 'Head y Tail: Primeras y Últimas',
    description: 'Mira el inicio o final de archivos',
    world: 3,
    order: 4,
    difficulty: 2,
    npc: 'Chmod-ard',
    story: 'head muestra primeras líneas, tail las últimas.',
    hints: ['head -5 archivo muestra 5 primeras líneas', 'tail -5 archivo muestra 5 últimas', 'tail -f archivo muestra cambios en tiempo real'],
    requiredCommands: ['head', 'tail'],
    objectives: [
      { id: 1, description: 'Usa head para ver inicio de archivo', type: 'command_output', command: 'head datos.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 40,
    title: 'Expresiones Regulares Básicas',
    description: 'Patrones poderosos con regex',
    world: 3,
    order: 5,
    difficulty: 4,
    npc: 'Chmod-ard',
    story: 'Las expresiones regulares son el lenguaje secreto de los patrones.',
    hints: ['. = cualquier carácter', '* = 0 o más repeticiones', '^ = inicio de línea', '$ = final de línea', '[abc] = a o b o c'],
    requiredCommands: ['grep'],
    objectives: [
      { id: 1, description: 'Usa grep con expresión regular', type: 'command_output', command: 'grep "[0-9]" datos.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 41,
    title: 'Sed: Editor Avanzado',
    description: 'sed reemplaza patrones en texto',
    world: 3,
    order: 6,
    difficulty: 4,
    npc: 'Chmod-ard',
    story: 'sed es el editor stream: modifica texto sin editar archivos.',
    hints: ['sed "s/viejo/nuevo/g" archivo reemplaza', 's = substitute, g = global'],
    requiredCommands: ['sed'],
    objectives: [
      { id: 1, description: 'Usa sed para sustituir texto', type: 'command_output', command: 'echo "hello" | sed "s/hello/goodbye/"', validationFn: 'output.includes("goodbye")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 42,
    title: 'Awk: El Procesador de Campos',
    description: 'awk procesa columnas de texto',
    world: 3,
    order: 7,
    difficulty: 4,
    npc: 'Chmod-ard',
    story: 'awk es poderoso para procesar datos estructurados.',
    hints: ['awk "{print $1}" archivo imprime primer campo', '$0 = línea completa', 'NF = número de campos'],
    requiredCommands: ['awk'],
    objectives: [
      { id: 1, description: 'Usa awk para procesar campos', type: 'command_output', command: 'echo "a b c" | awk "{print $1}"', validationFn: 'output.includes("a")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 43,
    title: 'Cut: Extrayendo Columnas',
    description: 'cut extrae columnas de texto',
    world: 3,
    order: 8,
    difficulty: 2,
    npc: 'Chmod-ard',
    story: 'cut es simple: extrae partes específicas de líneas.',
    hints: ['cut -f 1 archivo extrae primer campo (tab)', 'cut -c 1-5 archivo extrae caracteres 1-5'],
    requiredCommands: ['cut'],
    objectives: [
      { id: 1, description: 'Usa cut para extraer columnas', type: 'command_output', command: 'echo "a:b:c" | cut -d: -f1', validationFn: 'output.includes("a")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 44,
    title: 'Tr: Traducir Caracteres',
    description: 'tr traduce o elimina caracteres',
    world: 3,
    order: 9,
    difficulty: 2,
    npc: 'Chmod-ard',
    story: 'tr transforma caracteres de forma elegante.',
    hints: ['tr "a-z" "A-Z" convierte minúsculas a mayúsculas', 'tr -d "caracteres" elimina caracteres'],
    requiredCommands: ['tr'],
    objectives: [
      { id: 1, description: 'Usa tr para transformar texto', type: 'command_output', command: 'echo "hello" | tr "a-z" "A-Z"', validationFn: 'output.includes("HELLO")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 45,
    title: 'Uniq: Eliminando Duplicados',
    description: 'uniq elimina líneas duplicadas',
    world: 3,
    order: 10,
    difficulty: 2,
    npc: 'Chmod-ard',
    story: 'uniq limpia datos duplicados.',
    hints: ['uniq archivo elimina líneas seguidas iguales', 'sort | uniq elimina duplicados de cualquier lugar', 'uniq -c cuenta repeticiones'],
    requiredCommands: ['uniq'],
    objectives: [
      { id: 1, description: 'Usa uniq para eliminar duplicados', type: 'command_output', command: 'printf "a\\na\\nb" | uniq', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 46,
    title: 'Tee: Bifurcando el Flujo',
    description: 'tee guarda y muestra salida',
    world: 3,
    order: 11,
    difficulty: 2,
    npc: 'Chmod-ard',
    story: 'tee divide el flujo: guarda Y muestra simultáneamente.',
    hints: ['comando | tee archivo muestra y guarda', 'tee -a archivo añade en lugar de sobreescribir'],
    requiredCommands: ['tee'],
    objectives: [
      { id: 1, description: 'Usa tee para bifurcar flujo', type: 'command_output', command: 'echo test | tee output.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 47,
    title: 'Xargs: Construyendo Comandos',
    description: 'xargs construye comandos desde entrada',
    world: 3,
    order: 12,
    difficulty: 3,
    npc: 'Chmod-ard',
    story: 'xargs es poderoso: convierte entrada en argumentos.',
    hints: ['find . -name "*.txt" | xargs rm borra todos .txt', 'echo "a b c" | xargs echo imprime como argumentos'],
    requiredCommands: ['xargs'],
    objectives: [
      { id: 1, description: 'Comprende xargs', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 48,
    title: 'Combinando Todo: Pipeline Avanzado',
    description: 'Encadena múltiples comandos',
    world: 3,
    order: 13,
    difficulty: 4,
    npc: 'Chmod-ard',
    story: 'Ahora combinas todo lo aprendido: pipelines complejos.',
    hints: ['ls | grep .txt | sort | uniq', 'cat archivo | grep palabra | wc -l', 'Piensa en cada comando como un filtro'],
    requiredCommands: ['ls', 'grep', 'sort', 'uniq', 'wc'],
    objectives: [
      { id: 1, description: 'Crea un pipeline de múltiples comandos', type: 'command_output', command: 'echo -e "b\\na\\nb" | sort | uniq', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 49,
    title: 'Comprimiendo Datos: gzip y tar',
    description: 'Aprende archivos comprimidos',
    world: 3,
    order: 14,
    difficulty: 3,
    npc: 'Chmod-ard',
    story: 'Comprime archivos para ahorrar espacio.',
    hints: ['gzip archivo comprime', 'gunzip archivo.gz descomprime', 'tar -czf archivo.tar.gz carpeta comprime carpetas'],
    requiredCommands: ['tar', 'gzip'],
    objectives: [
      { id: 1, description: 'Comprende compresión básica', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 50,
    title: 'Boss: Maestro del Flujo',
    description: 'Domina pipes, redirecciones y procesamiento de texto',
    world: 3,
    order: 15,
    difficulty: 5,
    npc: 'El Mago de las Tuberías',
    story: 'Eres un maestro del procesamiento de datos. Demuéstrale tu poder.',
    hints: ['Necesitarás pipes, grep, sed, awk, sort y más'],
    requiredCommands: ['grep', 'sed', 'awk', 'sort', 'uniq', 'cut', 'tr', 'head', 'tail'],
    objectives: [
      { id: 1, description: 'Supera el desafío final', type: 'command_output', command: 'echo success', validationFn: 'output.includes("success")' }
    ],
    prerequisites: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    rewards: { xp: 250, coins: 150, achievement: 'mundo_3_complete' }
  },

  // MUNDO 4: NÚCLEO DEL REINO (20 misiones)
  {
    id: 51,
    title: '¿Quién Soy?',
    description: 'El comando whoami',
    world: 4,
    order: 1,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'KERNEL te pregunta: ¿quién eres en el sistema?',
    hints: ['whoami muestra tu usuario'],
    requiredCommands: ['whoami'],
    objectives: [
      { id: 1, description: 'Ejecuta whoami', type: 'command_output', command: 'whoami', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 52,
    title: 'Mi Sistema',
    description: 'El comando uname muestra SO',
    world: 4,
    order: 2,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'Descubre qué sistema operativo usas.',
    hints: ['uname muestra el SO', 'uname -a muestra todo', 'Linux es el núcleo'],
    requiredCommands: ['uname'],
    objectives: [
      { id: 1, description: 'Ejecuta uname', type: 'command_output', command: 'uname', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 53,
    title: 'Hora del Sistema',
    description: 'El comando date',
    world: 4,
    order: 3,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'Verifica la fecha y hora del sistema.',
    hints: ['date muestra fecha y hora', 'date "+%Y-%m-%d" formatea específicamente'],
    requiredCommands: ['date'],
    objectives: [
      { id: 1, description: 'Ejecuta date', type: 'command_output', command: 'date', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 54,
    title: 'Procesos en Ejecución',
    description: 'El comando ps',
    world: 4,
    order: 4,
    difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'ps muestra qué procesos se ejecutan.',
    hints: ['ps muestra procesos del usuario', 'ps aux muestra todos los procesos', 'PID = Process ID'],
    requiredCommands: ['ps'],
    objectives: [
      { id: 1, description: 'Usa ps para listar procesos', type: 'command_output', command: 'ps', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 55,
    title: 'Top: Monitor en Tiempo Real',
    description: 'El comando top',
    world: 4,
    order: 5,
    difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'top monitorea CPU y memoria en tiempo real.',
    hints: ['top muestra procesos activos', 'Press q para salir', 'Útil para encontrar procesos que usan muchos recursos'],
    requiredCommands: ['top'],
    objectives: [
      { id: 1, description: 'Comprende top', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 56,
    title: 'Espacio en Disco',
    description: 'El comando df',
    world: 4,
    order: 6,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'df muestra cuánto espacio hay en disco.',
    hints: ['df muestra el espacio', 'df -h muestra en formato legible (GB, MB)', 'Verifica si hay espacio disponible'],
    requiredCommands: ['df'],
    objectives: [
      { id: 1, description: 'Ejecuta df para ver espacio', type: 'command_output', command: 'df', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 57,
    title: 'Du: Tamaño de Directorios',
    description: 'El comando du',
    world: 4,
    order: 7,
    difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'du calcula cuánto espacio usan directorios.',
    hints: ['du directorio muestra tamaño', 'du -sh muestra total en unidades legibles'],
    requiredCommands: ['du'],
    objectives: [
      { id: 1, description: 'Usa du para ver tamaños', type: 'command_output', command: 'du -sh .', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 58,
    title: 'Free: Memoria RAM',
    description: 'El comando free',
    world: 4,
    order: 8,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'free muestra cuánta memoria RAM tienes disponible.',
    hints: ['free muestra memoria', 'free -h en formato legible', 'Total, Used, Free, Shared, Buffers, Cached'],
    requiredCommands: ['free'],
    objectives: [
      { id: 1, description: 'Ejecuta free', type: 'command_output', command: 'free', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 59,
    title: 'Uptime: Tiempo del Sistema',
    description: 'El comando uptime',
    world: 4,
    order: 9,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'uptime muestra cuánto tiempo lleva corriendo el sistema.',
    hints: ['uptime muestra tiempo de funcionamiento', 'Útil para saber si hace poco se reinició'],
    requiredCommands: ['uptime'],
    objectives: [
      { id: 1, description: 'Ejecuta uptime', type: 'command_output', command: 'uptime', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 60,
    title: 'Hostname: Nombre de la Máquina',
    description: 'El comando hostname',
    world: 4,
    order: 10,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'hostname muestra el nombre de tu máquina en la red.',
    hints: ['hostname muestra el nombre', 'Se usa en redes para identificar máquinas'],
    requiredCommands: ['hostname'],
    objectives: [
      { id: 1, description: 'Ejecuta hostname', type: 'command_output', command: 'hostname', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 61,
    title: 'Ifconfig: Configuración de Red',
    description: 'El comando ifconfig (o ip)',
    world: 4,
    order: 11,
    difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'ifconfig muestra tu configuración de red.',
    hints: ['ifconfig muestra interfaces de red', 'Muestra IP, máscara, MAC', 'ip addr show es la alternativa moderna'],
    requiredCommands: ['ifconfig'],
    objectives: [
      { id: 1, description: 'Ejecuta ifconfig', type: 'command_output', command: 'ifconfig', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 62,
    title: 'Ping: Probando Conectividad',
    description: 'El comando ping',
    world: 4,
    order: 12,
    difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'ping verifica si puedes conectar con otra máquina.',
    hints: ['ping google.com verifica conexión a internet', 'ping 127.0.0.1 es tu propia máquina (localhost)', 'Ctrl+C para detener'],
    requiredCommands: ['ping'],
    objectives: [
      { id: 1, description: 'Comprende ping', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 63,
    title: 'Nslookup: Resolución DNS',
    description: 'El comando nslookup',
    world: 4,
    order: 13,
    difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'nslookup resuelve nombres de dominio a IPs.',
    hints: ['nslookup google.com', 'DNS convierte nombres a direcciones IP'],
    requiredCommands: ['nslookup'],
    objectives: [
      { id: 1, description: 'Comprende DNS y nslookup', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 64,
    title: 'Dmesg: Mensajes del Kernel',
    description: 'El comando dmesg',
    world: 4,
    order: 14,
    difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'dmesg muestra mensajes del kernel del sistema.',
    hints: ['dmesg | tail muestra últimos mensajes', 'Útil para diagnóstico de hardware', 'dmesg | grep error busca errores'],
    requiredCommands: ['dmesg'],
    objectives: [
      { id: 1, description: 'Ejecuta dmesg', type: 'command_output', command: 'dmesg', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 65,
    title: 'Lsmod: Módulos Cargados',
    description: 'El comando lsmod',
    world: 4,
    order: 15,
    difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'lsmod lista los módulos del kernel cargados.',
    hints: ['lsmod muestra módulos', 'Los módulos amplían funcionalidad del kernel'],
    requiredCommands: ['lsmod'],
    objectives: [
      { id: 1, description: 'Ejecuta lsmod', type: 'command_output', command: 'lsmod', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 66,
    title: 'Fdisk: Particiones de Disco',
    description: 'El comando fdisk',
    world: 4,
    order: 16,
    difficulty: 3,
    npc: 'Kernel el Forjador',
    story: 'fdisk te muestra las particiones del disco.',
    hints: ['fdisk -l muestra particiones', 'Muestra qué espacios hay en disco', 'Requiere permisos de administrador para modificar'],
    requiredCommands: ['fdisk'],
    objectives: [
      { id: 1, description: 'Comprende particiones de disco', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 67,
    title: 'Lsusb: Dispositivos USB',
    description: 'El comando lsusb',
    world: 4,
    order: 17,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'lsusb lista dispositivos USB conectados.',
    hints: ['lsusb muestra dispositivos USB', 'Útil para ver qué está conectado'],
    requiredCommands: ['lsusb'],
    objectives: [
      { id: 1, description: 'Ejecuta lsusb', type: 'command_output', command: 'lsusb', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 68,
    title: 'Lspci: Dispositivos PCI',
    description: 'El comando lspci',
    world: 4,
    order: 18,
    difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'lspci lista dispositivos internos (GPU, etc).',
    hints: ['lspci muestra hardware PCI', 'Muestra targetas gráficas, de red, etc'],
    requiredCommands: ['lspci'],
    objectives: [
      { id: 1, description: 'Ejecuta lspci', type: 'command_output', command: 'lspci', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 69,
    title: 'Runlevels y Servicios',
    description: 'Entiende cómo inicia Linux',
    world: 4,
    order: 19,
    difficulty: 3,
    npc: 'Kernel el Forjador',
    story: 'El sistema arranca en niveles: desde BIOS hasta usuario.',
    hints: ['systemd es el init moderno', 'systemctl start/stop servicios', 'runlevels 0-6 en sistemas antiguos'],
    requiredCommands: ['systemctl'],
    objectives: [
      { id: 1, description: 'Comprende init y servicios', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 70,
    title: 'Boss: Señor del Núcleo',
    description: 'Domina el conocimiento del sistema y hardware',
    world: 4,
    order: 20,
    difficulty: 5,
    npc: 'El Núcleo Absoluto',
    story: 'Conoces el corazón del sistema. Demuéstrale tu maestría al Núcleo.',
    hints: ['Necesitarás todos los comandos de Sistema e Información'],
    requiredCommands: ['whoami', 'uname', 'date', 'ps', 'df', 'free', 'uptime', 'hostname'],
    objectives: [
      { id: 1, description: 'Supera el desafío final', type: 'command_output', command: 'echo success', validationFn: 'output.includes("success")' }
    ],
    prerequisites: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    rewards: { xp: 250, coins: 150, achievement: 'mundo_4_complete' }
  },

  // MUNDO 5: BÓVEDAS SECRETAS (25 misiones)
  {
    id: 71,
    title: 'Permisos: El Guardián de Acceso',
    description: 'Entiende chmod, rwx',
    world: 5,
    order: 1,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'SUDO-MAN te enseña: todo se controla con permisos.',
    hints: ['r = lectura (read)', 'w = escritura (write)', 'x = ejecución (execute)', 'chmod 755 archivo'],
    requiredCommands: ['chmod', 'ls'],
    objectives: [
      { id: 1, description: 'Entiende permisos r, w, x', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 72,
    title: 'Chmod Octal',
    description: 'Usa notación octal para permisos',
    world: 5,
    order: 2,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: '755 = rwxr-xr-x. Los números son un lenguaje de permisos.',
    hints: ['4 = read, 2 = write, 1 = execute', 'chmod 644 archivo = rw-r--r--', 'chmod 755 archivo = rwxr-xr-x'],
    requiredCommands: ['chmod'],
    objectives: [
      { id: 1, description: 'Aprende notación octal de chmod', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [71],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 73,
    title: 'Chown: Cambiar Propietario',
    description: 'El comando chown',
    world: 5,
    order: 3,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'chown cambia quién es el dueño de un archivo.',
    hints: ['chown usuario archivo', 'chown usuario:grupo archivo', 'Requiere ser root'],
    requiredCommands: ['chown'],
    objectives: [
      { id: 1, description: 'Comprende chown', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 74,
    title: 'Chgrp: Cambiar Grupo',
    description: 'El comando chgrp',
    world: 5,
    order: 4,
    difficulty: 2,
    npc: 'Sudo-Man',
    story: 'chgrp cambia el grupo propietario de un archivo.',
    hints: ['chgrp grupo archivo', 'Útil para compartir archivos dentro de un grupo'],
    requiredCommands: ['chgrp'],
    objectives: [
      { id: 1, description: 'Comprende chgrp', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 75,
    title: 'Umask: Máscara de Permisos',
    description: 'La máscara por defecto de nuevos archivos',
    world: 5,
    order: 5,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'umask controla qué permisos tienen los archivos nuevos.',
    hints: ['umask muestra la máscara actual', 'umask 022 (por defecto)', '777 - 022 = 755 (nuevos directorios)'],
    requiredCommands: ['umask'],
    objectives: [
      { id: 1, description: 'Comprende umask', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 76,
    title: 'Sudo: Poder Elevado',
    description: 'El comando sudo',
    world: 5,
    order: 6,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'sudo ejecuta comandos como root, con cuidado.',
    hints: ['sudo comando ejecuta como root', 'sudo -u usuario ejecuta como otro usuario', 'Requiere contraseña'],
    requiredCommands: ['sudo'],
    objectives: [
      { id: 1, description: 'Entiende qué es sudo', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 77,
    title: 'Su: Cambiar Usuario',
    description: 'El comando su',
    world: 5,
    order: 7,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'su cambia a otro usuario (su = switch user).',
    hints: ['su usuario cambia a usuario', 'su (sin argumentos) = su root', 'exit para volver a tu usuario'],
    requiredCommands: ['su'],
    objectives: [
      { id: 1, description: 'Comprende la diferencia entre su y sudo', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 78,
    title: 'Passwd: Cambiar Contraseña',
    description: 'El comando passwd',
    world: 5,
    order: 8,
    difficulty: 2,
    npc: 'Sudo-Man',
    story: 'passwd te permite cambiar tu contraseña.',
    hints: ['passwd cambia tu contraseña', 'Se te pedirá contraseña vieja y nueva', 'sudo passwd usuario para cambiar otra'],
    requiredCommands: ['passwd'],
    objectives: [
      { id: 1, description: 'Entiende passwd', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 79,
    title: 'Useradd: Crear Usuarios',
    description: 'El comando useradd',
    world: 5,
    order: 9,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'useradd crea nuevos usuarios (requiere root).',
    hints: ['sudo useradd nombre crea usuario', 'useradd -m -s /bin/bash con home y shell', 'userdel para eliminar'],
    requiredCommands: ['useradd'],
    objectives: [
      { id: 1, description: 'Comprende creación de usuarios', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 80,
    title: 'Groupadd: Crear Grupos',
    description: 'El comando groupadd',
    world: 5,
    order: 10,
    difficulty: 2,
    npc: 'Sudo-Man',
    story: 'groupadd crea nuevos grupos (requiere root).',
    hints: ['sudo groupadd nombre', 'Los grupos organizan usuarios', 'groupdel para eliminar'],
    requiredCommands: ['groupadd'],
    objectives: [
      { id: 1, description: 'Comprende grupos', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 81,
    title: 'Usermod: Modificar Usuarios',
    description: 'El comando usermod',
    world: 5,
    order: 11,
    difficulty: 2,
    npc: 'Sudo-Man',
    story: 'usermod cambia propiedades de usuarios.',
    hints: ['sudo usermod -aG grupo usuario añade a grupo', 'usermod -s /bin/bash usuario cambia shell'],
    requiredCommands: ['usermod'],
    objectives: [
      { id: 1, description: 'Comprende usermod', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 82,
    title: 'Visudo: Configurar Sudo',
    description: 'El comando visudo',
    world: 5,
    order: 12,
    difficulty: 4,
    npc: 'Sudo-Man',
    story: 'visudo configura quién puede usar sudo.',
    hints: ['sudo visudo edita /etc/sudoers', 'Define qué comandos puede ejecutar cada usuario', 'Requiere cuidado'],
    requiredCommands: ['visudo'],
    objectives: [
      { id: 1, description: 'Entiende /etc/sudoers', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 83,
    title: 'Setuid y Setgid',
    description: 'Permisos especiales SUID y SGID',
    world: 5,
    order: 13,
    difficulty: 4,
    npc: 'Sudo-Man',
    story: 'SUID permite ejecutar como el propietario del archivo.',
    hints: ['chmod 4755 = SUID', 'chmod 2755 = SGID', 'passwd usa SUID para cambiar /etc/shadow'],
    requiredCommands: ['chmod', 'ls'],
    objectives: [
      { id: 1, description: 'Entiende SUID y SGID', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [71, 72],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 84,
    title: 'Sticky Bit',
    description: 'El bit especial sticky',
    world: 5,
    order: 14,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'Sticky bit evita que otros borren tu archivo.',
    hints: ['chmod 1777 = sticky bit', 'chmod +t directorio', '/tmp usa sticky bit'],
    requiredCommands: ['chmod'],
    objectives: [
      { id: 1, description: 'Comprende sticky bit', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [71, 72],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 85,
    title: 'ACLs: Control de Acceso Extendido',
    description: 'Access Control Lists',
    world: 5,
    order: 15,
    difficulty: 4,
    npc: 'Sudo-Man',
    story: 'ACLs ofrecen control fino de permisos.',
    hints: ['setfacl establece ACLs', 'getfacl muestra ACLs', 'Más granular que chmod'],
    requiredCommands: ['setfacl', 'getfacl'],
    objectives: [
      { id: 1, description: 'Comprende ACLs', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [71, 72],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 86,
    title: 'Archivos Especiales: /dev',
    description: 'Dispositivos en /dev',
    world: 5,
    order: 16,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: '/dev contiene archivos especiales que representan dispositivos.',
    hints: ['/dev/null punto de basura', '/dev/zero fuente de ceros', '/dev/sda disco duro', '/dev/tty terminal'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Comprende archivos especiales', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 87,
    title: 'Archivos de Configuración Sistema',
    description: 'Directorios críticos /etc, /var, etc',
    world: 5,
    order: 17,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'La configuración del sistema está en directorios específicos.',
    hints: ['/etc = configuración', '/var = datos variables (logs)', '/opt = software opcional', '/home = carpetas usuarios'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Comprende estructura de directorios sistema', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 88,
    title: 'Logs del Sistema',
    description: 'Dónde están los logs y cómo leerlos',
    world: 5,
    order: 18,
    difficulty: 2,
    npc: 'Sudo-Man',
    story: 'Los logs registran qué sucede en el sistema.',
    hints: ['/var/log = directorio de logs', '/var/log/syslog = evento del sistema', '/var/log/auth.log = intentos login'],
    requiredCommands: ['cat', 'tail', 'grep'],
    objectives: [
      { id: 1, description: 'Entiende logs del sistema', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 89,
    title: 'Firewall Básico: iptables',
    description: 'Conceptos de firewall y seguridad de red',
    world: 5,
    order: 19,
    difficulty: 4,
    npc: 'Sudo-Man',
    story: 'iptables controla qué tráfico de red se permite.',
    hints: ['iptables filtra paquetes', 'ufw es una interfaz más simple', 'INPUT, OUTPUT, FORWARD chains'],
    requiredCommands: ['iptables'],
    objectives: [
      { id: 1, description: 'Comprende firewall básico', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 90,
    title: 'SSH y Criptografía de Clave Pública',
    description: 'SSH para acceso remoto seguro',
    world: 5,
    order: 20,
    difficulty: 4,
    npc: 'Sudo-Man',
    story: 'SSH es el protocolo seguro para acceso remoto.',
    hints: ['ssh usuario@host', 'ssh-keygen genera pares de claves', 'Mejor que telnet porque encripta'],
    requiredCommands: ['ssh', 'ssh-keygen'],
    objectives: [
      { id: 1, description: 'Comprende SSH y criptografía de clave pública', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 91,
    title: 'Seguridad en Contraseñas',
    description: 'Buenas prácticas de contraseñas',
    world: 5,
    order: 21,
    difficulty: 2,
    npc: 'Sudo-Man',
    story: 'Las contraseñas seguras protegen tu cuenta.',
    hints: ['Mayúsculas, minúsculas, números, símbolos', 'Mínimo 12 caracteres', 'Único por sitio', 'Cambiar regularmente'],
    requiredCommands: ['passwd'],
    objectives: [
      { id: 1, description: 'Entiende seguridad de contraseñas', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 92,
    title: 'Auditoría: auditd',
    description: 'Auditoría de acciones del sistema',
    world: 5,
    order: 22,
    difficulty: 4,
    npc: 'Sudo-Man',
    story: 'auditd registra acciones críticas para auditoría.',
    hints: ['auditctl configura reglas', 'ausearch busca en logs de auditoría', 'Útil para cumplimiento normativo'],
    requiredCommands: ['auditctl'],
    objectives: [
      { id: 1, description: 'Comprende auditoría del sistema', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 93,
    title: 'SELinux: Control de Acceso Obligatorio',
    description: 'SELinux para control granular',
    world: 5,
    order: 23,
    difficulty: 4,
    npc: 'Sudo-Man',
    story: 'SELinux es seguridad avanzada que controla TODO.',
    hints: ['semanage administra SELinux', 'Contexto = usuario:rol:tipo:nivel', 'Red Hat/CentOS lo usan por defecto'],
    requiredCommands: ['semanage'],
    objectives: [
      { id: 1, description: 'Entiende SELinux', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 94,
    title: 'AppArmor: Confinamiento de Aplicaciones',
    description: 'AppArmor vs SELinux',
    world: 5,
    order: 24,
    difficulty: 3,
    npc: 'Sudo-Man',
    story: 'AppArmor confina aplicaciones de forma más simple.',
    hints: ['Debian/Ubuntu lo usan', 'Más simple que SELinux', 'aa-enforce y aa-complain'],
    requiredCommands: ['aa-status'],
    objectives: [
      { id: 1, description: 'Comprende AppArmor', type: 'understanding', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 95,
    title: 'Boss Final: Guardián Supremo de la Seguridad',
    description: 'Demuestra dominio completo de Tema 5 LPI',
    world: 5,
    order: 25,
    difficulty: 5,
    npc: 'Sudo-Man El Absoluto',
    story: 'Has aprendido todos los secretos de seguridad. Ahora debes demostrar que eres digno del poder absoluto. La responsabilidad de cuidar el reino te espera.',
    hints: ['Necesitarás todo lo aprendido en el Mundo 5', 'Permisos, usuarios, seguridad, auditoría', 'Eres el nuevo guardián'],
    requiredCommands: ['chmod', 'chown', 'sudo', 'passwd', 'ssh'],
    objectives: [
      { id: 1, description: 'Supera el desafío final', type: 'command_output', command: 'echo success', validationFn: 'output.includes("success")' }
    ],
    prerequisites: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94],
    rewards: { xp: 500, coins: 300, achievement: 'mundo_5_complete', title: 'Guardian of Linux' }
  }
];

const seedQuests = async () => {
  try {
    console.log('Seeding quests from comprehensive LPI curriculum...');

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

    console.log(`✅ ${quests.length} quests seeded successfully based on LPI Linux Essentials curriculum`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding quests:', error.message);
    process.exit(1);
  }
};

seedQuests();
