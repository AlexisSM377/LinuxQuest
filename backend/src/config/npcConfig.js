export const NPCs = {
  // MUNDO 1: CASTILLO DE LINUX
  linux_sabio: {
    id: 'linux_sabio',
    name: 'Linux el Sabio',
    world: 1,
    title: 'Guardián del Conocimiento Libre',
    avatar: '🧙',
    description: 'Anciano fundador de los reinos digitales. Vestimenta: túnica blanca, barba plateada. Filósofo, narrador, paciente.',
    greeting: 'Para entender el camino, primero debes conocer a tus ancestros. Bienvenido al Castillo de Linux, donde la historia del software libre cobra vida.',
    personality: 'patient',
    specialty: 'Historia y filosofía de Linux',
    lore: 'Linux el Sabio fue el primer programador del Reino Digital. Observó cómo Linus Torvalds creó el kernel y decidió preservar ese conocimiento para las futuras generaciones. Su sabiduría abarca desde las primeras distribuciones hasta las nubes modernas.'
  },

  // MUNDO 2: CAMINOS PERDIDOS
  grep_ild: {
    id: 'grep_ild',
    name: 'Grep-ild',
    world: 2,
    title: 'Explorador-Cartógrafo de Archivos',
    avatar: '🗺️',
    description: 'Joven explorador-curioso y energético. Vestimenta: capucha verde, mapa enrollado. Didáctico y entusiasta.',
    greeting: 'Cada directorio es una nueva aventura. Sígueme, y te enseñaré a navegar por los senderos del sistema de archivos.',
    personality: 'energetic',
    specialty: 'Navegación y manipulación de archivos',
    lore: 'Grep-ild descubrió que el sistema de archivos es como un laberinto mágico. Cada directorio contiene secretos, y cada archivo es un tesoro esperando ser encontrado. Sus herramientas: ls, cd, mkdir, cp, mv, rm.'
  },

  // MUNDO 3: TORRES ANTIGUAS DEL PODER
  chmod_ard: {
    id: 'chmod_ard',
    name: 'Chmod-ard',
    world: 3,
    title: 'Mago del Procesamiento de Datos',
    avatar: '🔮',
    description: 'Mago artesano que controla el flujo de información. Vestimenta: capa azul con runas. Místico, técnico, preciso.',
    greeting: 'El verdadero poder fluye a través de las tuberías. Permíteme mostrarte cómo los datos se transforman con grep, sed, awk y los pipes.',
    personality: 'mystical',
    specialty: 'Pipes, redirecciones, expresiones regulares',
    lore: 'Chmod-ard dominó el arte de las tuberías místicas. Con grep puede encontrar cualquier patrón, con sed puede reemplazar cualquier texto, y con awk puede procesar cualquier dato. Sus pipes conectan el poder de múltiples comandos.'
  },

  // MUNDO 4: NÚCLEO DEL REINO
  kernel_forjador: {
    id: 'kernel_forjador',
    name: 'Kernel el Forjador',
    world: 4,
    title: 'Herrero del Sistema Operativo',
    avatar: '⚒️',
    description: 'Herrero del reino digital. Vestimenta: armadura metálica, martillo. Robusto, técnico, confiable.',
    greeting: 'El núcleo es donde la magia se forja en realidad. Cada proceso, cada hilo, cada byte importa. Aprende a forjar tu camino en el sistema.',
    personality: 'technical',
    specialty: 'Sistema, hardware, redes',
    lore: 'Kernel el Forjador construyó los cimientos del Reino Digital. Conoce cada proceso que corre, cada byte de memoria, y cada paquete de red. Su martillo forja la conexión entre el hardware y el software.'
  },

  // MUNDO 5: BÓVEDAS SECRETAS
  sudo_man: {
    id: 'sudo_man',
    name: 'Sudo-Man',
    world: 5,
    title: 'Guardián Supremo de la Seguridad',
    avatar: '🛡️',
    description: 'Guardián supremo del reino. Vestimenta: armadura roja con escudo dorado. Autoritario pero justo, vigilante.',
    greeting: 'El poder absoluto requiere absoluta responsabilidad. Usa sudo con sabiduría, no con ira. Los permisos son la línea entre el orden y el caos.',
    personality: 'authoritative',
    specialty: 'Seguridad, usuarios, permisos',
    lore: 'Sudo-Man protege el Reino Digital de las amenazas. Controla quién puede acceder a qué, y ejecuta su poder con precisión quirúrgica. Su escudo dorado refleja la luz de la seguridad en cada rincón del sistema.'
  }
};

export function getNPCsByWorld(worldId) {
  return Object.values(NPCs).filter(npc => npc.world === worldId);
}

export function getNPC(npcId) {
  return NPCs[npcId];
}
