import pool from '../src/db.js';

const quests = [
  // ==========================================
  // MUNDO 1: CASTILLO DE LINUX (15 misiones)
  // Tema 1 LPI: Comunidad Linux y código abierto
  // ==========================================
  {
    id: 1,
    title: 'El Despertar del Iniciado',
    description: 'Descubre qué versión de Linux ejecutas',
    world: 1, order: 1, difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'El anciano sabio te recibe y te pide que descubras qué versión de Linux ejecutas.',
    hints: ['uname -a muestra información completa del sistema', 'uname -r muestra solo la versión del kernel'],
    requiredCommands: ['uname'],
    objectives: [
      { id: 1, description: 'Ejecuta uname -a para ver tu sistema', type: 'command_output', command: 'uname -a', validationFn: 'output.includes("Linux")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 2,
    title: 'Identificando el Reino',
    description: 'Identifica la distribución Linux que estás usando',
    world: 1, order: 2, difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'Ahora necesitas saber exactamente qué distribución usas. Cada una tiene características únicas.',
    hints: ['cat /etc/os-release muestra información de la distribución', 'Busca la línea NAME= para identificarla'],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee el archivo de información de distribución', type: 'command_output', command: 'cat /etc/os-release', validationFn: 'output.includes("NAME=")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 5 }
  },
  {
    id: 3,
    title: 'El Pergamino de las Familias',
    description: 'Descubre a qué familia de distribuciones pertenece tu sistema',
    world: 1, order: 3, difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'Las distribuciones se agrupan en familias: Debian, Red Hat, Arch, SUSE. Conoce la tuya.',
    hints: ['Debian family: Ubuntu, Mint, Kali', 'Red Hat family: Fedora, CentOS, Rocky', 'cat /etc/os-release revela la familia'],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Identifica la familia de tu distribución', type: 'command_output', command: 'cat /etc/os-release', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 4,
    title: 'El Estandarte del León',
    description: 'Conoce el gestor de paquetes de tu sistema',
    world: 1, order: 4, difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'Cada familia usa un gestor de paquetes diferente. ¿Cuál es el tuyo?',
    hints: ['Debian/Ubuntu: apt', 'Red Hat/Fedora: dnf/yum', 'Arch: pacman', 'which apt te dice si lo tienes'],
    requiredCommands: ['which'],
    objectives: [
      { id: 1, description: 'Encuentra tu gestor de paquetes', type: 'command_output', command: 'which apt || which dnf || which pacman || which zypper', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 5,
    title: 'Los Tesoros de Office',
    description: 'Descubre qué software libre tienes instalado',
    world: 1, order: 5, difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'En Linux existen alternativas libres para cada software propietario.',
    hints: ['LibreOffice Writer reemplaza Word', 'GIMP reemplaza Photoshop', 'which te dice si están instalados'],
    requiredCommands: ['which'],
    objectives: [
      { id: 1, description: 'Verifica si LibreOffice está instalado', type: 'command_output', command: 'which libreoffice || which soffice || echo "No instalado"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 6,
    title: 'El Camino del Servidor',
    description: 'Identifica servidores web instalados en tu sistema',
    world: 1, order: 6, difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'Linux es el rey de los servidores. Apache y Nginx son los más populares.',
    hints: ['Apache se llama apache2 o httpd', 'Nginx es el servidor web moderno', 'which te ayuda a encontrarlos'],
    requiredCommands: ['which'],
    objectives: [
      { id: 1, description: 'Busca servidores web instalados', type: 'command_output', command: 'which apache2 || which nginx || which httpd || echo "Ninguno instalado"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 7,
    title: 'El Pacto de la Libertad',
    description: 'Explora la documentación de licencias en tu sistema',
    world: 1, order: 7, difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'El software libre tiene 4 libertades fundamentales. Cada paquete instalado tiene una licencia.',
    hints: ['Los archivos de licencia están en /usr/share/doc/', 'GPL, MIT, BSD son licencias comunes', 'ls te ayuda a explorar el directorio'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Explora los archivos de documentación de paquetes', type: 'command_output', command: 'ls /usr/share/doc/ | head -20', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 8,
    title: 'Las Diez Licencias',
    description: 'Descubre las licencias de los paquetes instalados',
    world: 1, order: 8, difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'Cada software libre tiene una licencia que define sus libertades. GPL es la más común en Linux.',
    hints: ['Los paquetes tienen archivos copyright', 'cat puede mostrar el contenido', 'GPL v2 y v3 son las más usadas'],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee la licencia de un paquete del sistema', type: 'command_output', command: 'ls /usr/share/doc/ | head -5', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 9,
    title: 'Los Embajadores Libres',
    description: 'Busca organizaciones del software libre en tu sistema',
    world: 1, order: 9, difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'FSF y OSI son organizaciones que defienden el software libre. Sus ideas están en cada paquete.',
    hints: ['Los créditos de paquetes mencionan organizaciones', 'grep busca texto en archivos', 'Busca referencias a FSF o GNU'],
    requiredCommands: ['grep'],
    objectives: [
      { id: 1, description: 'Busca referencias a organizaciones libres', type: 'command_output', command: 'grep -r "Free Software" /usr/share/doc/ 2>/dev/null | head -5 || echo "Explora con ls"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 10,
    title: 'El Escritorio Místico',
    description: 'Identifica los entornos gráficos disponibles',
    world: 1, order: 10, difficulty: 1,
    npc: 'Linux el Sabio',
    story: 'GNOME, KDE, XFCE, Cinnamon, MATE son los principales entornos gráficos de Linux.',
    hints: ['which te dice si un entorno está instalado', 'echo $XDG_CURRENT_DESKTOP muestra el actual', 'Cada entorno tiene un estilo diferente'],
    requiredCommands: ['echo'],
    objectives: [
      { id: 1, description: 'Identifica tu entorno gráfico actual', type: 'command_output', command: 'echo $XDG_CURRENT_DESKTOP || echo "Sin entorno gráfico (servidor)"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 11,
    title: 'La Nube Mágica',
    description: 'Verifica conectividad con servicios en la nube',
    world: 1, order: 11, difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'La mayoría de servicios cloud (AWS, Azure, GCP) corren Linux internamente.',
    hints: ['curl hace peticiones HTTP', 'Puedes probar conectividad a APIs', 'Los servicios cloud usan Linux masivamente'],
    requiredCommands: ['curl'],
    objectives: [
      { id: 1, description: 'Haz una petición a un servicio externo', type: 'command_output', command: 'curl -s https://api.github.com/zen || echo "Conectividad verificada"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 12,
    title: 'Los Sistemas Embebidos',
    description: 'Descubre la arquitectura de tu procesador',
    world: 1, order: 12, difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'Linux corre en todo: desde Raspberry Pi hasta supercomputadoras. La arquitectura importa.',
    hints: ['uname -m muestra la arquitectura', 'x86_64 es PC normal', 'aarch64 es ARM (Raspberry Pi, móviles)'],
    requiredCommands: ['uname'],
    objectives: [
      { id: 1, description: 'Identifica la arquitectura de tu procesador', type: 'command_output', command: 'uname -m', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 13,
    title: 'El Desafío del Encriptado',
    description: 'Verifica las herramientas de criptografía disponibles',
    world: 1, order: 13, difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'GPG te permite encriptar archivos y mensajes. Es esencial para la seguridad.',
    hints: ['gpg --version muestra la versión', 'GPG usa criptografía de clave pública', 'Puedes encriptar y desencriptar archivos'],
    requiredCommands: ['gpg'],
    objectives: [
      { id: 1, description: 'Verifica la instalación de GPG', type: 'command_output', command: 'gpg --version | head -3', validationFn: 'output.includes("gpg")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 14,
    title: 'El Guardián de la Privacidad',
    description: 'Verifica la seguridad de conexiones de red',
    world: 1, order: 14, difficulty: 2,
    npc: 'Linux el Sabio',
    story: 'HTTPS encripta tu comunicación web. VPN enmascara tu IP. La privacidad es poder.',
    hints: ['curl -I muestra headers HTTP', 'HTTPS usa certificados SSL/TLS', 'Los datos viajan encriptados'],
    requiredCommands: ['curl'],
    objectives: [
      { id: 1, description: 'Verifica una conexión HTTPS segura', type: 'command_output', command: 'curl -I https://example.com 2>/dev/null | head -3', validationFn: 'output.includes("HTTP")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 15,
    title: 'Boss: Guardián del Conocimiento Libre',
    description: 'Demuestra dominio del Tema 1 LPI',
    world: 1, order: 15, difficulty: 5,
    npc: 'El Guardián del Castillo',
    story: 'Has aprendido la historia y filosofía de Linux. Demuéstrale al Guardián tu sabiduría.',
    hints: ['Usa uname para info del sistema', 'cat /etc/os-release para tu distro', 'lsb_release -a para detalles'],
    requiredCommands: ['uname', 'cat', 'curl'],
    objectives: [
      { id: 1, description: 'Identifica tu sistema completo', type: 'command_output', command: 'uname -a', validationFn: 'output.includes("Linux")' },
      { id: 2, description: 'Identifica tu distribución', type: 'command_output', command: 'cat /etc/os-release', validationFn: 'output.includes("NAME=")' }
    ],
    prerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    rewards: { xp: 200, coins: 100, achievement: 'mundo_1_complete' }
  },

  // ==========================================
  // MUNDO 2: CAMINOS PERDIDOS (20 misiones)
  // Tema 2 LPI: Navegación y archivos
  // ==========================================
  {
    id: 16,
    title: 'El Primer Paso del Caminante',
    description: 'Aprende la estructura básica de un comando',
    world: 2, order: 1, difficulty: 1,
    npc: 'Grep-ild',
    story: 'GREP-ILD te enseña que cada comando tiene una estructura: comando, opciones, argumentos.',
    hints: ['pwd muestra tu directorio actual', 'echo imprime texto', 'La estructura es: comando -opciones argumentos'],
    requiredCommands: ['pwd', 'echo'],
    objectives: [
      { id: 1, description: 'Ejecuta pwd para ver tu ubicación', type: 'command_output', command: 'pwd', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 17,
    title: 'El Eco del Cambio',
    description: 'Domina el comando echo para imprimir texto',
    world: 2, order: 2, difficulty: 1,
    npc: 'Grep-ild',
    story: 'echo es tu primer poder: repetir lo que dices. Útil para debuggear scripts.',
    hints: ['echo "texto" imprime texto', 'echo $USER muestra tu usuario', 'Las comillas protegen espacios'],
    requiredCommands: ['echo'],
    objectives: [
      { id: 1, description: 'Imprime texto con echo', type: 'command_output', command: 'echo "Hola LinuxQuest"', validationFn: 'output.includes("Hola LinuxQuest")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 18,
    title: 'Listando los Tesoros',
    description: 'Explora archivos con el comando ls',
    world: 2, order: 3, difficulty: 1,
    npc: 'Grep-ild',
    story: 'ls es tu mapa: muestra todo lo que hay en un directorio.',
    hints: ['ls sin argumentos lista el directorio actual', 'ls -l muestra detalles', 'ls -a incluye archivos ocultos'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Lista los archivos de tu directorio', type: 'command_output', command: 'ls', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 19,
    title: 'Los Secretos Ocultos',
    description: 'Descubre archivos ocultos con ls -a',
    world: 2, order: 4, difficulty: 1,
    npc: 'Grep-ild',
    story: 'Los archivos que empiezan con punto están ocultos. ls normal no los muestra.',
    hints: ['ls -a muestra todo, incluyendo ocultos', '. y .. son directorios especiales', '.bashrc es configuración del shell'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Muestra archivos ocultos', type: 'command_output', command: 'ls -a', validationFn: 'output.includes(".")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 20,
    title: 'La Vista Detallada',
    description: 'Obtén información detallada con ls -l',
    world: 2, order: 5, difficulty: 2,
    npc: 'Grep-ild',
    story: 'ls -l te muestra permisos, propietario, tamaño y fecha de cada archivo.',
    hints: ['ls -l muestra detalles completos', 'Los primeros caracteres son permisos', 'rwx = lectura, escritura, ejecución'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Lista archivos con detalles', type: 'command_output', command: 'ls -l', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 21,
    title: 'Los Tamaños Humanos',
    description: 'Lee tamaños de archivos en formato legible',
    world: 2, order: 6, difficulty: 2,
    npc: 'Grep-ild',
    story: 'ls -lh convierte bytes en KB, MB, GB para que sea más fácil de leer.',
    hints: ['ls -lh muestra tamaños legibles', 'K = kilobytes, M = megabytes', 'ls -lah incluye todo'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Lista con tamaños legibles', type: 'command_output', command: 'ls -lh', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 22,
    title: 'El Salto del Conejo',
    description: 'Navega entre directorios con cd',
    world: 2, order: 7, difficulty: 2,
    npc: 'Grep-ild',
    story: 'cd te permite moverte. cd .. sube un nivel, cd ~ va a home.',
    hints: ['cd .. sube un directorio', 'cd ~ va a tu home', 'cd - vuelve al anterior', 'pwd verifica dónde estás'],
    requiredCommands: ['cd', 'pwd'],
    objectives: [
      { id: 1, description: 'Navega a home y verifica con pwd', type: 'command_output', command: 'cd ~ && pwd', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 23,
    title: 'El Sendero Absoluto',
    description: 'Navega con rutas absolutas usando cd',
    world: 2, order: 8, difficulty: 2,
    npc: 'Grep-ild',
    story: 'Las rutas absolutas empiezan desde /. /tmp es un directorio temporal del sistema.',
    hints: ['Las rutas absolutas empiezan con /', 'cd /tmp te lleva al directorio temporal', 'pwd confirma la ruta'],
    requiredCommands: ['cd', 'pwd'],
    objectives: [
      { id: 1, description: 'Navega a /tmp con ruta absoluta', type: 'command_output', command: 'cd /tmp && pwd', validationFn: 'output.includes("/tmp")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 24,
    title: 'Crear el Refugio',
    description: 'Crea tu primer directorio con mkdir',
    world: 2, order: 9, difficulty: 2,
    npc: 'Grep-ild',
    story: 'mkdir crea directorios. Es como construir una nueva sala en el castillo.',
    hints: ['mkdir nombre crea un directorio', 'mkdir -p a/b/c crea ruta anidada', 'Verifica con ls'],
    requiredCommands: ['mkdir', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un directorio llamado proyecto', type: 'command_output', command: 'mkdir proyecto', validationFn: 'true' },
      { id: 2, description: 'Verifica su creación con ls', type: 'command_output', command: 'ls', validationFn: 'output.includes("proyecto")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 25,
    title: 'El Pergamino en Blanco',
    description: 'Crea archivos vacíos con touch',
    world: 2, order: 10, difficulty: 2,
    npc: 'Grep-ild',
    story: 'touch crea archivos vacíos. Es como preparar un pergamino en blanco.',
    hints: ['touch archivo.txt crea un archivo', 'Verifica con ls', 'touch puede crear varios a la vez'],
    requiredCommands: ['touch', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo llamado datos.txt', type: 'command_output', command: 'touch datos.txt', validationFn: 'true' },
      { id: 2, description: 'Verifica su existencia', type: 'command_output', command: 'ls', validationFn: 'output.includes("datos")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 26,
    title: 'La Ruta Perfecta',
    description: 'Crea directorios anidados con mkdir -p',
    world: 2, order: 11, difficulty: 2,
    npc: 'Grep-ild',
    story: 'mkdir -p crea toda la ruta de directorios de una vez.',
    hints: ['mkdir -p a/b/c crea la ruta completa', 'Si ya existe, no da error', 'Verifica con ls'],
    requiredCommands: ['mkdir', 'ls'],
    objectives: [
      { id: 1, description: 'Crea una ruta anidada a/b/c', type: 'command_output', command: 'mkdir -p a/b/c', validationFn: 'true' },
      { id: 2, description: 'Verifica la estructura', type: 'command_output', command: 'ls a/', validationFn: 'output.includes("b")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 27,
    title: 'El Espejo de los Pergaminos',
    description: 'Copia archivos con cp',
    world: 2, order: 12, difficulty: 2,
    npc: 'Grep-ild',
    story: 'cp duplica archivos. Como un espejo que crea una copia perfecta.',
    hints: ['cp origen destino copia un archivo', 'cp -r copia directorios recursivamente', 'cp -p preserva atributos'],
    requiredCommands: ['cp', 'touch', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo fuente', type: 'command_output', command: 'touch source.txt', validationFn: 'true' },
      { id: 2, description: 'Cópialo a otro nombre', type: 'command_output', command: 'cp source.txt backup.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 28,
    title: 'El Ritual de Renombrar',
    description: 'Mueve y renombra archivos con mv',
    world: 2, order: 13, difficulty: 2,
    npc: 'Grep-ild',
    story: 'mv puede mover archivos de lugar o cambiarles el nombre.',
    requiredCommands: ['mv', 'touch', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'touch miarchivo.txt', validationFn: 'true' },
      { id: 2, description: 'Renómbralo', type: 'command_output', command: 'mv miarchivo.txt renombrado.txt', validationFn: 'true' }
    ],
    hints: ['mv archivo.txt nuevo_nombre.txt renombra', 'mv archivo.txt directorio/ mueve'],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 29,
    title: 'La Eliminación del Mal',
    description: 'Elimina archivos con rm',
    world: 2, order: 14, difficulty: 3,
    npc: 'Grep-ild',
    story: 'rm borra archivos. ¡Cuidado! No se pueden recuperar.',
    hints: ['rm archivo.txt elimina un archivo', 'NO uses rm -rf /', 'rm es para siempre'],
    requiredCommands: ['rm', 'touch', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo temporal', type: 'command_output', command: 'touch temp.txt', validationFn: 'true' },
      { id: 2, description: 'Elimínalo', type: 'command_output', command: 'rm temp.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 25 }
  },
  {
    id: 30,
    title: 'El Manual del Sabio',
    description: 'Aprende a usar la documentación del sistema',
    world: 2, order: 15, difficulty: 2,
    npc: 'Grep-ild',
    story: 'man es tu mejor amigo: contiene documentación completa de cada comando.',
    hints: ['man ls muestra el manual de ls', 'q para salir', 'man -k busca en títulos', 'man -f da descripción corta'],
    requiredCommands: ['man'],
    objectives: [
      { id: 1, description: 'Abre el manual de ls', type: 'command_output', command: 'man ls 2>/dev/null | head -5 || man -f ls', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 31,
    title: 'La Búsqueda de Conocimiento',
    description: 'Busca comandos relacionados con apropos',
    world: 2, order: 16, difficulty: 2,
    npc: 'Grep-ild',
    story: 'apropos busca comandos por descripción. Es como un índice de la biblioteca.',
    hints: ['apropos palabra busca comandos relacionados', 'apropos copy busca comandos de copiar', 'Equivalente a man -k'],
    requiredCommands: ['apropos'],
    objectives: [
      { id: 1, description: 'Busca comandos sobre archivos', type: 'command_output', command: 'apropos file 2>/dev/null | head -10', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 32,
    title: 'La Variable Mística',
    description: 'Usa variables de entorno con echo',
    world: 2, order: 17, difficulty: 2,
    npc: 'Grep-ild',
    story: 'Las variables almacenan información del sistema. $USER tiene tu nombre.',
    hints: ['$USER contiene tu nombre de usuario', 'echo $HOME muestra tu directorio', '$PWD es la ruta actual'],
    requiredCommands: ['echo'],
    objectives: [
      { id: 1, description: 'Muestra tu nombre de usuario', type: 'command_output', command: 'echo $USER', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 33,
    title: 'Archivos Ocultos: El Punto',
    description: 'Explora archivos ocultos del sistema',
    world: 2, order: 18, difficulty: 1,
    npc: 'Grep-ild',
    story: 'Los archivos ocultos empiezan con punto (.). Son archivos de configuración.',
    hints: ['ls -a muestra archivos ocultos', '.bashrc es configuración del shell', '.git es de control de versiones'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Muestra archivos ocultos', type: 'command_output', command: 'ls -a', validationFn: 'output.includes(".")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 34,
    title: 'El Glob del Caos',
    description: 'Usa comodines para filtrar archivos',
    world: 2, order: 19, difficulty: 3,
    npc: 'Grep-ild',
    story: 'Los comodines (*) seleccionan múltiples archivos de una vez.',
    requiredCommands: ['ls', 'touch'],
    objectives: [
      { id: 1, description: 'Crea varios archivos .txt', type: 'command_output', command: 'touch a.txt b.txt c.txt', validationFn: 'true' },
      { id: 2, description: 'Lista solo los .txt', type: 'command_output', command: 'ls *.txt', validationFn: 'output.includes(".txt")' }
    ],
    hints: ['ls *.txt lista todos los .txt', '* reemplaza cualquier texto', 'ls archivo? lista con un comodín'],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 35,
    title: 'Boss: Maestro de Caminos',
    description: 'Domina la navegación y manipulación de archivos',
    world: 2, order: 20, difficulty: 5,
    npc: 'El Rey de los Caminos',
    story: 'Has aprendido a navegar y manipular archivos. Demuéstrale tu maestría.',
    hints: ['Usa ls, cd, mkdir, touch, cp, mv, rm'],
    requiredCommands: ['pwd', 'ls', 'cd', 'mkdir', 'touch', 'cat', 'cp', 'mv', 'rm'],
    objectives: [
      { id: 1, description: 'Crea y explora una estructura', type: 'command_output', command: 'mkdir -p test/boss && touch test/boss/file.txt', validationFn: 'true' },
      { id: 2, description: 'Copia y renombra', type: 'command_output', command: 'cp test/boss/file.txt test/boss/copy.txt', validationFn: 'true' }
    ],
    prerequisites: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    rewards: { xp: 200, coins: 100, achievement: 'mundo_2_complete' }
  },

  // ==========================================
  // MUNDO 3: TORRES ANTIGUAS DEL PODER (15 misiones)
  // Tema 3 LPI: Procesamiento de texto y scripts
  // ==========================================
  {
    id: 36,
    title: 'El Poder de Grep',
    description: 'Busca patrones en archivos con grep',
    world: 3, order: 1, difficulty: 3,
    npc: 'Chmod-ard',
    story: 'CHMOD-ARD te enseña grep: el poder para buscar información en cualquier archivo.',
    hints: ['grep "patron" archivo busca líneas', 'grep -i ignora mayúsculas', 'grep -n muestra números de línea'],
    requiredCommands: ['grep', 'echo'],
    objectives: [
      { id: 1, description: 'Crea un archivo y busca en él', type: 'command_output', command: 'echo -e "linea1\nlinea2\nerror aqui" > test.log', validationFn: 'true' },
      { id: 2, description: 'Busca "error" en el archivo', type: 'command_output', command: 'grep "error" test.log', validationFn: 'output.includes("error")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 25 }
  },
  {
    id: 37,
    title: 'Tuberías: El Flujo de Datos',
    description: 'Conecta comandos con pipes (|)',
    world: 3, order: 2, difficulty: 3,
    npc: 'Chmod-ard',
    story: 'El pipe | conecta la salida de un comando con la entrada de otro. El verdadero poder.',
    hints: ['ls | grep txt busca .txt en el listado', 'comando1 | comando2 enlaza salidas', 'Puedes encadenar varios pipes'],
    requiredCommands: ['ls', 'grep', 'echo'],
    objectives: [
      { id: 1, description: 'Crea archivos de prueba', type: 'command_output', command: 'touch a.txt b.txt c.sh', validationFn: 'true' },
      { id: 2, description: 'Usa un pipe para filtrar', type: 'command_output', command: 'ls | grep .txt', validationFn: 'output.includes(".txt")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 25 }
  },
  {
    id: 38,
    title: 'La Redirección al Infinito',
    description: 'Guarda la salida de comandos en archivos',
    world: 3, order: 3, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'Redirige la salida de comandos a archivos con > y >>.',
    hints: ['> sobrescribe el archivo', '>> agrega al final', 'ls > listado.txt guarda el listado'],
    requiredCommands: ['echo', 'ls'],
    objectives: [
      { id: 1, description: 'Redirige salida a un archivo', type: 'command_output', command: 'echo "datos" > output.txt', validationFn: 'true' },
      { id: 2, description: 'Agrega más contenido', type: 'command_output', command: 'echo "mas datos" >> output.txt', validationFn: 'true' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 39,
    title: 'Los Espejos del Tee',
    description: 'Muestra y guarda salida simultáneamente con tee',
    world: 3, order: 4, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'tee duplica el flujo: muestra en pantalla Y guarda en archivo.',
    hints: ['comando | tee archivo muestra y guarda', 'tee -a archivo agrega en vez de sobrescribir', 'Útil para logging'],
    requiredCommands: ['ls', 'tee'],
    objectives: [
      { id: 1, description: 'Usa tee para guardar y mostrar', type: 'command_output', command: 'ls | tee listado.txt', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 40,
    title: 'El Cazador de Patrones',
    description: 'Domina grep con diferentes opciones',
    world: 3, order: 5, difficulty: 3,
    npc: 'Chmod-ard',
    story: 'grep es un cazador de patrones: encuentra lo que buscas en cualquier texto.',
    hints: ['grep -r busca recursivamente', 'grep -i ignora mayúsculas', 'grep -v muestra lo que NO coincide'],
    requiredCommands: ['grep', 'echo'],
    objectives: [
      { id: 1, description: 'Crea un archivo con contenido', type: 'command_output', command: 'echo -e "error1\ninfo\nerror2\nok" > log.txt', validationFn: 'true' },
      { id: 2, description: 'Busca con grep -i', type: 'command_output', command: 'grep -i "ERROR" log.txt', validationFn: 'output.includes("error")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 25 }
  },
  {
    id: 41,
    title: 'Las Mil Búsquedas',
    description: 'Busca archivos recursivamente con grep -r',
    world: 3, order: 6, difficulty: 3,
    npc: 'Chmod-ard',
    story: 'grep -r busca en todos los archivos de un directorio y sus subdirectorios.',
    hints: ['grep -r "patron" directorio busca en todo', 'grep -rn muestra números de línea', 'grep -rl muestra solo nombres de archivo'],
    requiredCommands: ['grep', 'echo'],
    objectives: [
      { id: 1, description: 'Crea archivos con contenido', type: 'command_output', command: 'echo "TODO fix this" > note.txt', validationFn: 'true' },
      { id: 2, description: 'Busca recursivamente', type: 'command_output', command: 'grep -r "TODO" .', validationFn: 'output.includes("TODO")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 25 }
  },
  {
    id: 42,
    title: 'El Conjuro Insensible',
    description: 'Busca sin importar mayúsculas con grep -i',
    world: 3, order: 7, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'grep -i ignora diferencias entre mayúsculas y minúsculas.',
    hints: ['grep -i "warning" encuentra Warning, WARNING, warning', 'Útil cuando no sabes la capitalización', 'grep -iv invierte y es insensible'],
    requiredCommands: ['grep', 'echo'],
    objectives: [
      { id: 1, description: 'Crea archivo con texto variado', type: 'command_output', command: 'echo -e "Error\nWARNING\ninfo\nError" > syslog.txt', validationFn: 'true' },
      { id: 2, description: 'Busca sin importar caso', type: 'command_output', command: 'grep -i "error" syslog.txt', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 43,
    title: 'La Inversión Sagrada',
    description: 'Invierte la búsqueda con grep -v',
    world: 3, order: 8, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'grep -v muestra las líneas que NO contienen el patrón. La inversión del poder.',
    hints: ['grep -v "#" muestra líneas sin comentarios', 'grep -v "^$" elimina líneas vacías', 'Útil para filtrar'],
    requiredCommands: ['grep', 'echo'],
    objectives: [
      { id: 1, description: 'Crea archivo con comentarios', type: 'command_output', command: 'echo -e "#comentario\ndato1\ndato2\n#otro" > config.txt', validationFn: 'true' },
      { id: 2, description: 'Muestra solo datos (sin #)', type: 'command_output', command: 'grep -v "#" config.txt', validationFn: 'output.includes("dato")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 44,
    title: 'Las Cabezas y Colas',
    description: 'Muestra inicio y fin de archivos con head y tail',
    world: 3, order: 9, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'head muestra las primeras líneas, tail las últimas. Essenciales para logs.',
    hints: ['head -n 5 muestra 5 primeras líneas', 'tail -n 5 muestra 5 últimas', 'tail -f sigue cambios en tiempo real'],
    requiredCommands: ['head', 'tail', 'echo'],
    objectives: [
      { id: 1, description: 'Crea un archivo de varias líneas', type: 'command_output', command: 'seq 1 20 > numeros.txt', validationFn: 'true' },
      { id: 2, description: 'Muestra las primeras 5 líneas', type: 'command_output', command: 'head -n 5 numeros.txt', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 45,
    title: 'El Ordenador Místico',
    description: 'Ordena líneas con sort',
    world: 3, order: 10, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'sort organiza datos alfabética o numéricamente.',
    hints: ['sort archivo ordena alfabéticamente', 'sort -n ordena numéricamente', 'sort -r ordena inverso'],
    requiredCommands: ['sort', 'echo'],
    objectives: [
      { id: 1, description: 'Crea un archivo desordenado', type: 'command_output', command: 'echo -e "banana\nmanzana\ncereza" > frutas.txt', validationFn: 'true' },
      { id: 2, description: 'Ordena alfabéticamente', type: 'command_output', command: 'sort frutas.txt', validationFn: 'output.includes("banana")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 46,
    title: 'Los Únicos Sobrevivientes',
    description: 'Elimina líneas duplicadas con uniq',
    world: 3, order: 11, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'uniq elimina líneas duplicadas consecutivas. Funciona con sort.',
    hints: ['uniq necesita archivo ordenado', 'sort archivo | uniq elimina todos los duplicados', 'uniq -c cuenta repeticiones'],
    requiredCommands: ['sort', 'uniq', 'echo'],
    objectives: [
      { id: 1, description: 'Crea archivo con duplicados', type: 'command_output', command: 'echo -e "a\nb\na\nc\nb" > dupes.txt', validationFn: 'true' },
      { id: 2, description: 'Elimina duplicados', type: 'command_output', command: 'sort dupes.txt | uniq', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 47,
    title: 'El Cuchillo Cortador',
    description: 'Extrae columnas de texto con cut',
    world: 3, order: 12, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'cut extrae partes específicas de cada línea, como columnas de una tabla.',
    hints: ['cut -d "," -f 1 extrae columna 1 (separado por coma)', 'cut -c 1-5 extrae caracteres 1-5', 'cut -f 2 extrae campo 2 (tab)'],
    requiredCommands: ['cut', 'echo'],
    objectives: [
      { id: 1, description: 'Crea un CSV simple', type: 'command_output', command: 'echo -e "juan,25,dev\nmaria,30,diseno" > datos.csv', validationFn: 'true' },
      { id: 2, description: 'Extrae la primera columna', type: 'command_output', command: 'cut -d "," -f 1 datos.csv', validationFn: 'output.includes("juan")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 15 }
  },
  {
    id: 48,
    title: 'El Hechizo Sed',
    description: 'Reemplaza texto con sed',
    world: 3, order: 13, difficulty: 4,
    npc: 'Chmod-ard',
    story: 'sed es el editor de flujo: modifica texto sin abrir archivos.',
    hints: ['sed "s/viejo/nuevo/g" reemplaza todas las ocurrencias', 'sed "s/viejo/nuevo/" reemplaza la primera', 'sed -i edita en su lugar'],
    requiredCommands: ['sed', 'echo'],
    objectives: [
      { id: 1, description: 'Crea un archivo de texto', type: 'command_output', command: 'echo "hola mundo hola" > texto.txt', validationFn: 'true' },
      { id: 2, description: 'Reemplaza texto con sed', type: 'command_output', command: 'sed "s/hola/adios/g" texto.txt', validationFn: 'output.includes("adios")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 49,
    title: 'El Buscador Awk',
    description: 'Procesa campos de texto con awk',
    world: 3, order: 14, difficulty: 4,
    npc: 'Chmod-ard',
    story: 'awk es un procesador de patrones potente para datos estructurados.',
    hints: ['awk "{print $1}" imprime primer campo', 'awk -F "," usa coma como separador', 'NF = número de campos'],
    requiredCommands: ['awk', 'echo'],
    objectives: [
      { id: 1, description: 'Crea datos de prueba', type: 'command_output', command: 'echo -e "juan 25\nmaria 30\npedro 22" > personas.txt', validationFn: 'true' },
      { id: 2, description: 'Extrae la primera columna', type: 'command_output', command: 'awk "{print $1}" personas.txt', validationFn: 'output.includes("juan")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 50,
    title: 'Boss: Maestro del Flujo',
    description: 'Domina pipes, grep, sed, awk y procesamiento de texto',
    world: 3, order: 15, difficulty: 5,
    npc: 'El Mago de las Tuberías',
    story: 'Eres un maestro del procesamiento de datos. Demuéstrale tu poder.',
    hints: ['Combina grep, sed, awk, sort, uniq'],
    requiredCommands: ['grep', 'sed', 'awk', 'sort', 'uniq', 'cut', 'echo'],
    objectives: [
      { id: 1, description: 'Crea datos y procesalos', type: 'command_output', command: 'echo -e "a\nb\na\nc" | sort | uniq -c', validationFn: 'output.length > 0' }
    ],
    prerequisites: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    rewards: { xp: 250, coins: 150, achievement: 'mundo_3_complete' }
  },

  // ==========================================
  // MUNDO 4: NÚCLEO DEL REINO (20 misiones)
  // Tema 4 LPI: Sistema operativo y hardware
  // ==========================================
  {
    id: 51,
    title: '¿Quién Soy?',
    description: 'Identifica tu usuario con whoami',
    world: 4, order: 1, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'KERNEL te pregunta: ¿quién eres en el sistema?',
    hints: ['whoami muestra tu usuario actual', 'id muestra UID, GID y grupos'],
    requiredCommands: ['whoami'],
    objectives: [
      { id: 1, description: 'Identifica tu usuario', type: 'command_output', command: 'whoami', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 52,
    title: 'Mi Sistema',
    description: 'Descubre tu sistema operativo con uname',
    world: 4, order: 2, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'uname te dice qué sistema operativo estás usando.',
    hints: ['uname muestra el SO', 'uname -a muestra todo', 'uname -r la versión del kernel'],
    requiredCommands: ['uname'],
    objectives: [
      { id: 1, description: 'Muestra info del sistema', type: 'command_output', command: 'uname -a', validationFn: 'output.includes("Linux")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 53,
    title: 'Hora del Sistema',
    description: 'Consulta fecha y hora con date',
    world: 4, order: 3, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'date muestra la fecha y hora del sistema.',
    hints: ['date muestra fecha completa', 'date "+%Y-%m-%d" formato específico', 'date "+%H:%M:%S" solo hora'],
    requiredCommands: ['date'],
    objectives: [
      { id: 1, description: 'Muestra la fecha actual', type: 'command_output', command: 'date', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 54,
    title: 'Procesos en Ejecución',
    description: 'Lista procesos activos con ps',
    world: 4, order: 4, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'ps muestra qué procesos se están ejecutando en el sistema.',
    hints: ['ps muestra procesos del shell', 'ps aux muestra todos los procesos', 'PID es el identificador del proceso'],
    requiredCommands: ['ps'],
    objectives: [
      { id: 1, description: 'Lista los procesos', type: 'command_output', command: 'ps', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 55,
    title: 'Top: Monitor en Tiempo Real',
    description: 'Monitorea procesos con top',
    world: 4, order: 5, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'top muestra procesos en tiempo real, actualizándose continuamente.',
    hints: ['top muestra CPU y memoria en vivo', 'q para salir', 'top -b -n 1 muestra una instantánea'],
    requiredCommands: ['top'],
    objectives: [
      { id: 1, description: 'Toma una instantánea del sistema', type: 'command_output', command: 'top -b -n 1 | head -15', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 56,
    title: 'El Verdugo de Procesos',
    description: 'Termina procesos con kill',
    world: 4, order: 6, difficulty: 3,
    npc: 'Kernel el Forjador',
    story: 'kill envía señales a procesos. SIGTERM termina gracefully, SIGKILL fuerza.',
    hints: ['kill PID envía SIGTERM', 'kill -9 PID fuerza la terminación', 'killall nombre mata por nombre'],
    requiredCommands: ['kill', 'ps'],
    objectives: [
      { id: 1, description: 'Identifica un proceso', type: 'command_output', command: 'ps aux | head -5', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 57,
    title: 'Espacio en Disco',
    description: 'Mira el espacio en disco con df',
    world: 4, order: 7, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'df muestra cuánto espacio hay en cada partición del disco.',
    hints: ['df muestra espacio en disco', 'df -h en formato legible (GB, MB)', 'Verifica si hay espacio disponible'],
    requiredCommands: ['df'],
    objectives: [
      { id: 1, description: 'Muestra el espacio en disco', type: 'command_output', command: 'df -h', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 58,
    title: 'Du: Tamaño de Directorios',
    description: 'Calcula tamaño de directorios con du',
    world: 4, order: 8, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'du calcula cuánto espacio usa cada directorio.',
    hints: ['du directorio muestra tamaño', 'du -sh muestra total legible', 'du -sh * muestra tamaño de cada item'],
    requiredCommands: ['du'],
    objectives: [
      { id: 1, description: 'Muestra el tamaño del directorio actual', type: 'command_output', command: 'du -sh .', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 59,
    title: 'Free: Memoria RAM',
    description: 'Consulta la memoria RAM con free',
    world: 4, order: 9, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'free muestra cuánta memoria RAM y swap tienes disponible.',
    hints: ['free muestra memoria', 'free -h en formato legible', 'Total, Used, Free son las columnas principales'],
    requiredCommands: ['free'],
    objectives: [
      { id: 1, description: 'Muestra la memoria del sistema', type: 'command_output', command: 'free -h', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 60,
    title: 'Uptime: Tiempo del Sistema',
    description: 'Verifica cuánto tiempo lleva encendido el sistema',
    world: 4, order: 10, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'uptime muestra el tiempo que el sistema lleva funcionando sin reiniciarse.',
    hints: ['uptime muestra tiempo encendido', 'También muestra carga promedio', 'Útil para diagnóstico'],
    requiredCommands: ['uptime'],
    objectives: [
      { id: 1, description: 'Muestra el tiempo del sistema', type: 'command_output', command: 'uptime', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 61,
    title: 'El Camino de Red',
    description: 'Explora la configuración de red con ip',
    world: 4, order: 11, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'ip addr muestra todas las interfaces de red y sus direcciones IP.',
    hints: ['ip addr muestra IPs', 'ip a es la forma abreviada', 'inet es la dirección IPv4'],
    requiredCommands: ['ip'],
    objectives: [
      { id: 1, description: 'Muestra las interfaces de red', type: 'command_output', command: 'ip addr', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 62,
    title: 'Las Rutas del Mensajero',
    description: 'Consulta la tabla de rutas con ip route',
    world: 4, order: 12, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'ip route muestra cómo el sistema enruta el tráfico de red.',
    hints: ['ip route muestra tabla de rutas', 'ip r es la forma abreviada', 'El gateway es tu puerta de salida'],
    requiredCommands: ['ip'],
    objectives: [
      { id: 1, description: 'Muestra la tabla de rutas', type: 'command_output', command: 'ip route', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 63,
    title: 'El Eco del Cielo',
    description: 'Prueba conectividad con ping',
    world: 4, order: 13, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'ping verifica si puedes comunicarte con otra máquina en la red.',
    hints: ['ping -c 4 envía 4 paquetes', 'ping 127.0.0.1 prueba tu propia máquina', 'Ctrl+C detiene el ping'],
    requiredCommands: ['ping'],
    objectives: [
      { id: 1, description: 'Prueba conexión a tu propia máquina', type: 'command_output', command: 'ping -c 2 127.0.0.1', validationFn: 'output.includes("bytes from")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 64,
    title: 'El DNS Mágico',
    description: 'Resuelve nombres de dominio con host',
    world: 4, order: 14, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'DNS convierte nombres de dominio en direcciones IP. host te help a consultar.',
    hints: ['host google.com resuelve un dominio', 'dig da más información', 'nslookup es otra alternativa'],
    requiredCommands: ['host'],
    objectives: [
      { id: 1, description: 'Resuelve un nombre de dominio', type: 'command_output', command: 'host localhost', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 65,
    title: 'Los Puertos del Castillo',
    description: 'Mira qué puertos están abiertos con ss',
    world: 4, order: 15, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'ss muestra los puertos de red que están escuchando conexiones.',
    hints: ['ss -tuln muestra puertos TCP/UDP escuchando', 'ss -t = TCP, ss -u = UDP', 'netstat es la alternativa legacy'],
    requiredCommands: ['ss'],
    objectives: [
      { id: 1, description: 'Muestra puertos abiertos', type: 'command_output', command: 'ss -tuln', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 66,
    title: 'La Conexión SSH',
    description: 'Genera llaves criptográficas con ssh-keygen',
    world: 4, order: 16, difficulty: 3,
    npc: 'Kernel el Forjador',
    story: 'SSH permite acceder a sistemas remotos de forma segura. Las llaves son más seguras que contraseñas.',
    hints: ['ssh-keygen genera pares de claves', 'La clave pública se copia al servidor', 'La privada nunca se comparte'],
    requiredCommands: ['ssh-keygen'],
    objectives: [
      { id: 1, description: 'Genera una llave SSH', type: 'command_output', command: 'ssh-keygen -t rsa -b 2048 -f /tmp/test_key -N ""', validationFn: 'output.includes("public key")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 67,
    title: 'El Mensajero curl',
    description: 'Haz peticiones HTTP con curl',
    world: 4, order: 17, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'curl es la herramienta para comunicarte con APIs y servicios web.',
    hints: ['curl url hace un GET', 'curl -O descarga un archivo', 'curl -X POST -d "data" envía datos'],
    requiredCommands: ['curl'],
    objectives: [
      { id: 1, description: 'Haz una petición HTTP', type: 'command_output', command: 'curl -s https://api.github.com/zen', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 68,
    title: 'Los Ríos USB',
    description: 'Lista dispositivos USB con lsusb',
    world: 4, order: 18, difficulty: 1,
    npc: 'Kernel el Forjador',
    story: 'lsusb muestra todos los dispositivos USB conectados al sistema.',
    hints: ['lsusb lista dispositivos USB', 'Muestra fabricante y dispositivo', 'Útil para diagnosticar hardware'],
    requiredCommands: ['lsusb'],
    objectives: [
      { id: 1, description: 'Lista dispositivos USB', type: 'command_output', command: 'lsusb', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 69,
    title: 'El Mensaje del Kernel',
    description: 'Lee mensajes del kernel con dmesg',
    world: 4, order: 19, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'dmesg muestra los mensajes del kernel, útiles para diagnosticar hardware.',
    hints: ['dmesg muestra logs del kernel', 'dmesg | tail muestra los últimos', 'dmesg | grep error busca errores'],
    requiredCommands: ['dmesg'],
    objectives: [
      { id: 1, description: 'Lee los últimos mensajes del kernel', type: 'command_output', command: 'dmesg | tail -10', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 70,
    title: 'Boss: Señor del Núcleo',
    description: 'Domina el conocimiento del sistema y hardware',
    world: 4, order: 20, difficulty: 5,
    npc: 'El Núcleo Absoluto',
    story: 'Conoces el corazón del sistema. Demuéstrale tu maestría al Núcleo.',
    hints: ['Usa whoami, uname, ps, df, free, ip, ping'],
    requiredCommands: ['whoami', 'uname', 'date', 'ps', 'df', 'free', 'uptime', 'ip'],
    objectives: [
      { id: 1, description: 'Identifica tu usuario y sistema', type: 'command_output', command: 'whoami && uname -a', validationFn: 'output.includes("Linux")' },
      { id: 2, description: 'Revisa recursos del sistema', type: 'command_output', command: 'free -h', validationFn: 'output.length > 0' }
    ],
    prerequisites: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    rewards: { xp: 250, coins: 150, achievement: 'mundo_4_complete' }
  },

  // ==========================================
  // MUNDO 5: BÓVEDAS SECRETAS (20 misiones)
  // Tema 5 LPI: Seguridad y permisos
  // ==========================================
  {
    id: 71,
    title: 'Tu Identidad en el Reino',
    description: 'Identifícate con whoami',
    world: 5, order: 1, difficulty: 1,
    npc: 'Sudo-Man',
    story: 'SUDO-MAN te pregunta quién eres. En seguridad, la identidad lo es todo.',
    hints: ['whoami muestra tu usuario', 'id muestra UID, GID y grupos'],
    requiredCommands: ['whoami'],
    objectives: [
      { id: 1, description: 'Identifica tu usuario', type: 'command_output', command: 'whoami', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 72,
    title: 'Los Detalles del Ser',
    description: 'Muestra tu ID de usuario y grupos con id',
    world: 5, order: 2, difficulty: 1,
    npc: 'Sudo-Man',
    story: 'id te muestra tu UID, GID y a qué grupos perteneces.',
    hints: ['id muestra toda tu identidad', 'uid = user ID', 'gid = group ID'],
    requiredCommands: ['id'],
    objectives: [
      { id: 1, description: 'Muestra tu ID completo', type: 'command_output', command: 'id', validationFn: 'output.includes("uid=")' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 73,
    title: 'Los Ojos del Castillo',
    description: 'Ve quién está conectado con who',
    world: 5, order: 3, difficulty: 1,
    npc: 'Sudo-Man',
    story: 'who muestra qué usuarios tienen sesiones activas en el sistema.',
    hints: ['who muestra usuarios conectados', 'w muestra más detalles', 'who -b muestra último boot'],
    requiredCommands: ['who'],
    objectives: [
      { id: 1, description: 'Muestra usuarios conectados', type: 'command_output', command: 'who', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 74,
    title: 'El Libro de los Usuarios',
    description: 'Lee la base de datos de usuarios',
    world: 5, order: 4, difficulty: 2,
    npc: 'Sudo-Man',
    story: '/etc/passwd contiene información de todos los usuarios del sistema.',
    hints: ['cat /etc/passwd muestra usuarios', 'Formato: usuario:x:UID:GID:home:shell', 'Los campos están separados por :'],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee el archivo de usuarios', type: 'command_output', command: 'cat /etc/passwd | head -10', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 75,
    title: 'Los Permisos Sagrados',
    description: 'Interpreta los permisos de archivos',
    world: 5, order: 5, difficulty: 2,
    npc: 'Sudo-Man',
    story: 'Los permisos determinan quién puede leer, escribir y ejecutar archivos.',
    hints: ['ls -la muestra permisos detallados', 'rwx = lectura, escritura, ejecución', 'Los primeros 10 caracteres son los permisos'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Muestra permisos de archivos', type: 'command_output', command: 'ls -la', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 76,
    title: 'El Cambio de Permisos Numérico',
    description: 'Cambia permisos con chmod en notación octal',
    world: 5, order: 6, difficulty: 3,
    npc: 'Sudo-Man',
    story: 'chmod cambia permisos. 755 = rwxr-xr-x, 644 = rw-r--r--.',
    hints: ['chmod 755 archivo', '4=read, 2=write, 1=execute', 'chmod 644 es el más común para archivos'],
    requiredCommands: ['chmod', 'ls', 'touch'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'touch test_perm.txt', validationFn: 'true' },
      { id: 2, description: 'Cambia sus permisos a 755', type: 'command_output', command: 'chmod 755 test_perm.txt && ls -la test_perm.txt', validationFn: 'output.includes("rwx")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 77,
    title: 'El Cambio Simbólico',
    description: 'Cambia permisos con chmod en notación simbólica',
    world: 5, order: 7, difficulty: 3,
    npc: 'Sudo-Man',
    story: 'chmod también acepta notación simbólica: u+x, g-w, o=r.',
    hints: ['u+x agrega ejecución al usuario', 'g-w quita escritura al grupo', 'o=r establece solo lectura a otros'],
    requiredCommands: ['chmod', 'ls', 'touch'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'touch test_sim.txt', validationFn: 'true' },
      { id: 2, description: 'Agrega ejecución al usuario', type: 'command_output', command: 'chmod u+x test_sim.txt && ls -la test_sim.txt', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 78,
    title: 'La Propiedad Cambiada',
    description: 'Cambia el propietario de archivos con chown',
    world: 5, order: 8, difficulty: 3,
    npc: 'Sudo-Man',
    story: 'chown cambia quién es el dueño de un archivo.',
    hints: ['chown usuario archivo', 'chown usuario:grupo archivo', 'chown -R cambia recursivamente'],
    requiredCommands: ['chown', 'ls', 'touch'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'touch test_chown.txt', validationFn: 'true' },
      { id: 2, description: 'Muestra el propietario actual', type: 'command_output', command: 'ls -la test_chown.txt', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 79,
    title: 'El SUID Mágico',
    description: 'Entiende los permisos especiales SUID y SGID',
    world: 5, order: 9, difficulty: 4,
    npc: 'Sudo-Man',
    story: 'SUID permite ejecutar un archivo con los permisos del propietario. passwd usa SUID.',
    hints: ['chmod u+s activa SUID', 'SUID se muestra como s en permisos', 'passwd usa SUID para modificar /etc/shadow'],
    requiredCommands: ['chmod', 'ls', 'touch'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'touch test_suid.txt', validationFn: 'true' },
      { id: 2, description: 'Activa SUID', type: 'command_output', command: 'chmod u+s test_suid.txt && ls -la test_suid.txt', validationFn: 'output.includes("s")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 80,
    title: 'El Pegajoso de /tmp',
    description: 'Observa el sticky bit en /tmp',
    world: 5, order: 10, difficulty: 3,
    npc: 'Sudo-Man',
    story: 'El sticky bit en /tmp evita que usuarios borren archivos de otros.',
    hints: ['chmod +t activa sticky bit', '/tmp tiene sticky bit por defecto', 'Solo el dueño puede borrar su archivo'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Muestra permisos de /tmp', type: 'command_output', command: 'ls -ld /tmp', validationFn: 'output.includes("t")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 81,
    title: 'El Enlace Duro',
    description: 'Crea enlaces duros con ln',
    world: 5, order: 11, difficulty: 3,
    npc: 'Sudo-Man',
    story: 'Un hard link es otro nombre para el mismo inodo. Ambos archivos son idénticos.',
    hints: ['ln archivo enlace crea hard link', 'Ambos apuntan al mismo dato', 'Si borras uno, el otro sigue existiendo'],
    requiredCommands: ['ln', 'echo', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'echo "datos" > original.txt', validationFn: 'true' },
      { id: 2, description: 'Crea un hard link', type: 'command_output', command: 'ln original.txt enlace_duro.txt && cat enlace_duro.txt', validationFn: 'output.includes("datos")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 82,
    title: 'El Enlace Suave',
    description: 'Crea enlaces simbólicos con ln -s',
    world: 5, order: 12, difficulty: 3,
    npc: 'Sudo-Man',
    story: 'Un symlink es un atajo que apunta a otro archivo. Se muestra con l en ls -l.',
    hints: ['ln -s archivo enlace crea symlink', 'El symlink se rompe si borras el original', 'ls -l muestra -> para symlinks'],
    requiredCommands: ['ln', 'echo', 'ls'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'echo "contenido" > destino.txt', validationFn: 'true' },
      { id: 2, description: 'Crea un symbolic link', type: 'command_output', command: 'ln -s destino.txt enlace.txt && ls -la enlace.txt', validationFn: 'output.includes("->")' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 83,
    title: 'El Grupo Sagrado',
    description: 'Gestiona grupos de usuarios',
    world: 5, order: 13, difficulty: 2,
    npc: 'Sudo-Man',
    story: 'Los grupos organizan usuarios y controlan permisos colectivos.',
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee la base de datos de grupos', type: 'command_output', command: 'cat /etc/group | head -10', validationFn: 'output.length > 0' }
    ],
    hints: ['/etc/group contiene los grupos', 'Formato: grupo:x:GID:miembros', 'groups muestra tus grupos'],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 84,
    title: 'Archivos Especiales: /dev',
    description: 'Explora archivos de dispositivos',
    world: 5, order: 14, difficulty: 3,
    npc: 'Sudo-Man',
    story: '/dev contiene archivos especiales que representan dispositivos del sistema.',
    hints: ['/dev/null aguja negra (descarta todo)', '/dev/zero genera ceros', '/dev/tty es tu terminal'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Lista dispositivos especiales', type: 'command_output', command: 'ls /dev | head -20', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 85,
    title: 'Archivos de Configuración',
    description: 'Explora directorios del sistema',
    world: 5, order: 15, difficulty: 3,
    npc: 'Sudo-Man',
    story: 'La configuración del sistema está organizada en directorios específicos.',
    hints: ['/etc = configuración', '/var = datos variables', '/home = usuarios', '/opt = software extra'],
    requiredCommands: ['ls'],
    objectives: [
      { id: 1, description: 'Lista el directorio de configuración', type: 'command_output', command: 'ls /etc | head -20', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 75, coins: 20 }
  },
  {
    id: 86,
    title: 'Logs del Sistema',
    description: 'Lee registros del sistema',
    world: 5, order: 16, difficulty: 2,
    npc: 'Sudo-Man',
    story: 'Los logs registran todo lo que sucede en el sistema. Son esenciales para seguridad.',
    hints: ['/var/log/ contiene los logs', 'auth.log registra autenticaciones', 'tail -f sigue cambios en tiempo real'],
    requiredCommands: ['cat', 'tail'],
    objectives: [
      { id: 1, description: 'Explora el directorio de logs', type: 'command_output', command: 'ls /var/log/ | head -10', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 87,
    title: 'Firewall Básico: iptables',
    description: 'Conceptos de firewall con iptables',
    world: 5, order: 17, difficulty: 4,
    npc: 'Sudo-Man',
    story: 'iptables controla qué tráfico de red se permite y cuál se bloquea.',
    hints: ['iptables filtra paquetes', 'INPUT = tráfico entrante', 'OUTPUT = tráfico saliente'],
    requiredCommands: ['iptables'],
    objectives: [
      { id: 1, description: 'Muestra las reglas actuales', type: 'command_output', command: 'iptables -L -n 2>/dev/null || echo "iptables disponible"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 88,
    title: 'SSH y Criptografía',
    description: 'Entiende SSH para acceso remoto seguro',
    world: 5, order: 18, difficulty: 4,
    npc: 'Sudo-Man',
    story: 'SSH encripta toda la comunicación. Es la forma segura de acceder a sistemas remotos.',
    hints: ['ssh usuario@host conecta remotamente', 'ssh-keygen genera llaves', 'Mejor que telnet porque encripta'],
    requiredCommands: ['ssh-keygen'],
    objectives: [
      { id: 1, description: 'Genera un par de llaves SSH', type: 'command_output', command: 'ssh-keygen -t rsa -b 2048 -f /tmp/ssh_test -N ""', validationFn: 'output.includes("public key")' }
    ],
    prerequisites: [],
    rewards: { xp: 100, coins: 30 }
  },
  {
    id: 89,
    title: 'Seguridad en Contraseñas',
    description: 'Buenas prácticas de contraseñas',
    world: 5, order: 19, difficulty: 2,
    npc: 'Sudo-Man',
    story: 'Las contraseñas seguras son la primera línea de defensa.',
    hints: ['Mínimo 12 caracteres', 'Mayúsculas + minúsculas + números + símbolos', 'Único por cada sitio'],
    requiredCommands: ['cat'],
    objectives: [
      { id: 1, description: 'Lee la política de contraseñas', type: 'command_output', command: 'cat /etc/login.defs 2>/dev/null | grep PASS || echo "Politica del sistema"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [],
    rewards: { xp: 50, coins: 10 }
  },
  {
    id: 90,
    title: 'Boss: Guardián Supremo de la Seguridad',
    description: 'Demuestra dominio completo de Seguridad',
    world: 5, order: 20, difficulty: 5,
    npc: 'Sudo-Man El Absoluto',
    story: 'Has aprendido los secretos de seguridad. Demuestra que eres digno del poder absoluto.',
    hints: ['Usa whoami, id, chmod, chown, ls -la, ln'],
    requiredCommands: ['whoami', 'id', 'chmod', 'chown', 'ls', 'ln'],
    objectives: [
      { id: 1, description: 'Identifica tu usuario y permisos', type: 'command_output', command: 'whoami && id', validationFn: 'output.length > 0' },
      { id: 2, description: 'Modifica y verifica permisos', type: 'command_output', command: 'touch /tmp/boss_test && chmod 700 /tmp/boss_test && ls -la /tmp/boss_test', validationFn: 'output.includes("rwx")' }
    ],
    prerequisites: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
    rewards: { xp: 500, coins: 300, achievement: 'mundo_5_complete', title: 'Guardian of Linux' }
  },

  // ==========================================
  // QUESTS EXTRA: Cubren temas LPI faltantes
  // ==========================================

  // Extra Mundo 2: Globbing y wildcards
  {
    id: 91,
    title: 'El Rango Mágico',
    description: 'Usa comodines de rango para seleccionar archivos',
    world: 2, order: 21, difficulty: 3,
    npc: 'Grep-ild',
    story: 'Los corchetes [] seleccionan rangos de caracteres. Es magia pura.',
    hints: ['ls archivo[1-5] selecciona archivo1 a archivo5', 'ls [abc]* selecciona los que empiezan con a, b o c', 'ls arquivo[0-9][0-9] para dos dígitos'],
    requiredCommands: ['ls', 'touch'],
    objectives: [
      { id: 1, description: 'Crea archivos de prueba', type: 'command_output', command: 'touch archivo1.txt archivo2.txt archivo3.txt', validationFn: 'true' },
      { id: 2, description: 'Usa un rango para filtrar', type: 'command_output', command: 'ls archivo[1-2].txt', validationFn: 'output.includes("archivo")' }
    ],
    prerequisites: [34],
    rewards: { xp: 75, coins: 20 }
  },

  // Extra Mundo 3: Editores de texto (Topic 3.3 LPI)
  {
    id: 92,
    title: 'El Editor de los Antiguos',
    description: 'Aprende los conceptos básicos del editor vi',
    world: 3, order: 16, difficulty: 3,
    npc: 'Chmod-ard',
    story: 'vi es el editor clásico de Linux. Conocerlo es un rito de iniciación.',
    hints: ['vi tiene modos: inserción (i), comando (:), visual (v)', 'ESC sale del modo inserción', ':wq guarda y sale', ':q! sale sin guardar', 'dd borra una línea', 'yy copia una línea', 'p pega'],
    requiredCommands: ['vi'],
    objectives: [
      { id: 1, description: 'Abre vi en modo lectura', type: 'command_output', command: 'vi --version 2>/dev/null | head -3 || echo "vi disponible en el sistema"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [48],
    rewards: { xp: 100, coins: 30 }
  },

  // Extra Mundo 3: nano (Topic 3.3 LPI)
  {
    id: 93,
    title: 'El Editor Moderno',
    description: 'Aprende los conceptos básicos del editor nano',
    world: 3, order: 17, difficulty: 2,
    npc: 'Chmod-ard',
    story: 'nano es el editor más fácil de usar. Perfecto para principiantes.',
    hints: ['nano archivo abre el editor', 'Ctrl+O guarda', 'Ctrl+X sale', 'Ctrl+W busca', 'Ctrl+K corta línea', 'Ctrl+U pega'],
    requiredCommands: ['nano'],
    objectives: [
      { id: 1, description: 'Verifica nano disponible', type: 'command_output', command: 'nano --version 2>/dev/null | head -1 || echo "nano disponible en el sistema"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [92],
    rewards: { xp: 75, coins: 20 }
  },

  // Extra Mundo 4: locate (Topic 3.2 LPI)
  {
    id: 94,
    title: 'La Búsqueda Rápida',
    description: 'Usa locate para buscar archivos por nombre rápidamente',
    world: 4, order: 21, difficulty: 2,
    npc: 'Kernel el Forjador',
    story: 'locate es como find pero mucho más rápido: busca en una base de datos precompilada.',
    hints: ['locate archivo busca en la BD', 'updatedb actualiza la BD', 'locate -i ignora mayúsculas', 'locate -r usa regex'],
    requiredCommands: ['locate'],
    objectives: [
      { id: 1, description: 'Busca un archivo del sistema', type: 'command_output', command: 'locate passwd 2>/dev/null | head -5 || echo "locate disponible"', validationFn: 'output.length > 0' }
    ],
    prerequisites: [69],
    rewards: { xp: 75, coins: 20 }
  },

  // Extra Mundo 5: chgrp (Topic 5.3 LPI)
  {
    id: 95,
    title: 'El Grupo Cambiado',
    description: 'Cambia el grupo propietario con chgrp',
    world: 5, order: 21, difficulty: 2,
    npc: 'Sudo-Man',
    story: 'chgrp cambia el grupo al que pertenece un archivo. Es como reasignar la lealtad.',
    hints: ['chgrp grupo archivo', 'chgrp -R grupo dir/ cambia recursivamente', 'ls -la muestra el grupo actual', 'groups muestra tus grupos'],
    requiredCommands: ['chgrp', 'ls', 'touch'],
    objectives: [
      { id: 1, description: 'Crea un archivo', type: 'command_output', command: 'touch test_chgrp.txt', validationFn: 'true' },
      { id: 2, description: 'Muestra el grupo actual', type: 'command_output', command: 'ls -la test_chgrp.txt', validationFn: 'output.length > 0' }
    ],
    prerequisites: [90],
    rewards: { xp: 75, coins: 20 }
  }
];

const seedQuests = async () => {
  try {
    console.log(`Seeding ${quests.length} quests from LPI Linux Essentials curriculum...`);

    // Limpiar datos existentes para evitar duplicados
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
