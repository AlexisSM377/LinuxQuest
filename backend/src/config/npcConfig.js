export const NPCs = {
  // MUNDO 1: EL CASTILLO DEL CONOCIMIENTO
  linux_sabio: {
    id: 'linux_sabio',
    name: 'Linux el Sabio',
    world: 1,
    title: 'Archivista del Reino Digital',
    avatar: '\u{1F9D9}\u200D\u2642\uFE0F',
    description: 'Anciano con tunica blanca bordada con circuitos dorados. Barba plateada, ojos brillantes como LEDs. Paciente, filosofico, narrador. Habla en metaforas.',
    greeting: 'Para entender el codigo, primero debes entender su historia. Bienvenido al Castillo del Conocimiento, donde los pergaminos guardan los secretos de como nacio Linux.',
    personality: 'patient',
    specialty: 'Historia de Linux, distribuciones, licencias, filosofia del software libre',
    lore: 'Fue el primer programador en documentar las distribuciones. Creo el Archivo del Conocimiento donde guarda pergaminos sobre cada familia de Linux. Su mayor temor es que la historia se pierda en el olvido digital.'
  },

  // MUNDO 2: LOS SENDEROS DEL SISTEMA
  grep_ild: {
    id: 'grep_ild',
    name: 'Grep-ild',
    world: 2,
    title: 'Explorador de los Senderos Digitales',
    avatar: '\u{1F5FA}\uFE0F',
    description: 'Joven con capucha verde, mochila con herramientas de navegacion. Curioso, energetico, didactico. Siempre quiere explorar.',
    greeting: 'Cada directorio es una nueva aventura. El sistema de archivos es un bosque infinito donde cada claro esconde un tesoro. Sigeme, te ensenare a navegar sin perderte.',
    personality: 'energetic',
    specialty: 'Navegacion, archivos, directorios, variables de entorno',
    lore: 'Descubrio que el sistema de archivos es un laberinto con reglas. Mapeo cada atajo y truco de navegacion. Sus herramientas: ls, cd, mkdir, cp, mv, rm. Suena con explorar /proc algun dia.'
  },

  // MUNDO 3: LAS TORRES DEL PROCESAMIENTO
  chmod_ard: {
    id: 'chmod_ard',
    name: 'Chmod-ard',
    world: 3,
    title: 'Tejedor del Flujo de Datos',
    avatar: '\u{1F52E}',
    description: 'Mago con capa azul cosida con runas de regex. Varita que emite pipes de luz. Ojos que brillan al procesar datos.',
    greeting: 'Los datos fluyen como rios. Con pipes los diriges, con grep los filtras, con sed los transformas. Domina el flujo y seras invencible.',
    personality: 'mystical',
    specialty: 'Pipes, grep, sed, awk, redireccion, scripts',
    lore: 'Dominó el arte de las tuberias miticas. Puede tejer cualquier dato con grep, transformar con sed y extraer con awk. Su varita es un pipe (|) hecho de cristal digital.'
  },

  // MUNDO 4: LA FORJA DEL NUCLEO
  kernel_forjador: {
    id: 'kernel_forjador',
    name: 'Kernel el Forjador',
    world: 4,
    title: 'Herrero del Nucleo Digital',
    avatar: '\u2692\uFE0F',
    description: 'Herrero robusto con delantal de cuero metalico. Martillo grabado con PID. Brazos fuertes como threads paralelos.',
    greeting: 'El nucleo es el corazon. Si falla, todo falla. Aqui forjamos procesos, monitoreamos recursos y conectamos redes. El hardware es el acero, el kernel es el fuego.',
    personality: 'technical',
    specialty: 'Hardware, procesos, memoria, redes, sistema operativo',
    lore: 'Construyo los cimientos del reino. Conoce cada proceso, cada byte de memoria, cada paquete de red. Su martillo forja la conexion entre hardware y software.'
  },

  // MUNDO 5: LAS BOVEDAS DE LA SEGURIDAD
  sudo_man: {
    id: 'sudo_man',
    name: 'Sudo-Man',
    world: 5,
    title: 'Guardian Supremo de la Seguridad',
    avatar: '\u{1F6E1}\uFE0F',
    description: 'Caballero con armadura roja y escudo dorado con el simbolo de root (#). Capa que ondea con permisos.',
    greeting: 'El poder absoluto requiere responsabilidad absoluta. Sin permisos no hay orden, sin usuarios no hay sistema. Usa sudo con sabiduria, no con ira.',
    personality: 'authoritative',
    specialty: 'Permisos, usuarios, grupos, seguridad, criptografia',
    lore: 'Protege el reino de intrusiones. Controla quien accede a que. Su escudo bloquea accesos no autorizados. Solo otorga sudo a quienes lo merecen.'
  }
};

export function getNPCsByWorld(worldId) {
  return Object.values(NPCs).filter(npc => npc.world === worldId);
}

export function getNPC(npcId) {
  return NPCs[npcId];
}
