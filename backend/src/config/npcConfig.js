export const NPCs = {
  // MUNDO 1: Fundamentos
  linux_sabio: {
    id: 'linux_sabio',
    name: 'Linux el Sabio',
    world: 1,
    title: 'Guardián del Conocimiento',
    avatar: '🧙',
    description: 'Un anciano sabio que domina los secretos de Linux',
    greeting: 'Bienvenido, aprendiz. Aquí aprenderás los fundamentos del sistema operativo libre.',
    personality: 'patient'
  },
  stallman: {
    id: 'stallman',
    name: 'Richard Stallman',
    world: 1,
    title: 'Paladín del Software Libre',
    avatar: '🛡️',
    description: 'El fundador de la Free Software Foundation',
    greeting: '¡Hola! Aquí aprenderás sobre la libertad del software.',
    personality: 'passionate'
  },

  // MUNDO 2: Archivos & Permisos
  archivista: {
    id: 'archivista',
    name: 'El Archivista',
    world: 2,
    title: 'Guardián de Archivos',
    avatar: '📚',
    description: 'Un guardián meticuloso de la biblioteca de archivos del sistema',
    greeting: 'Bienvenido a mi biblioteca. Aquí aprenderás a navegar y manipular archivos.',
    personality: 'organized',
    specialty: 'Archivos y Directorios'
  },
  guardian_permisos: {
    id: 'guardian_permisos',
    name: 'Guardián de Permisos',
    world: 2,
    title: 'Protector de Seguridad',
    avatar: '🔐',
    description: 'Un guardián que protege los permisos y accesos del sistema',
    greeting: 'Los permisos son la clave de la seguridad. Aprendamos juntos.',
    personality: 'strict',
    specialty: 'Permisos y Control de Acceso'
  },

  // MUNDO 3: Procesos
  maestro_procesos: {
    id: 'maestro_procesos',
    name: 'Maestro de Procesos',
    world: 3,
    title: 'Controlador del Caos',
    avatar: '⚙️',
    description: 'Un experto que controla los procesos del sistema',
    greeting: 'Todo en Linux es un proceso. Domina el arte de controlarlos.',
    personality: 'commanding',
    specialty: 'Procesos y Servicios'
  },
  jefe_sistema: {
    id: 'jefe_sistema',
    name: 'Jefe del Sistema',
    world: 3,
    title: 'Boss de Procesos',
    avatar: '👹',
    description: 'Un adversario poderoso que controla los procesos más peligrosos',
    greeting: '¡Atrevámonos a un combate de procesos! ¡Derrota mis zombies!',
    personality: 'aggressive',
    specialty: 'Combate de Procesos',
    isBoss: true
  },

  // MUNDO 4: Redes
  ingeniero_redes: {
    id: 'ingeniero_redes',
    name: 'Ingeniero de Redes',
    world: 4,
    title: 'Maestro de Conectividad',
    avatar: '🌐',
    description: 'Un experto en redes que domina toda la comunicación del sistema',
    greeting: 'La red es la sangre del sistema. Aprende a configurarla correctamente.',
    personality: 'technical',
    specialty: 'Configuración de Red'
  },
  explorador_puertos: {
    id: 'explorador_puertos',
    name: 'Explorador de Puertos',
    world: 4,
    title: 'Descubridor de Servicios',
    avatar: '🚪',
    description: 'Un viajero que conoce todos los puertos y servicios',
    greeting: 'Cada puerto es una puerta a un servicio diferente. Exploremos.',
    personality: 'adventurous',
    specialty: 'Puertos y Servicios'
  },

  // MUNDO 5: Scripts & Automatización
  mago_scripts: {
    id: 'mago_scripts',
    name: 'El Mago de Scripts',
    world: 5,
    title: 'Maestro de Automatización',
    avatar: '🧙‍♂️',
    description: 'Un mago que crea hechizos en forma de scripts bash',
    greeting: 'Con bash, puedes automatizar cualquier cosa. Aprende la magia.',
    personality: 'mysterious',
    specialty: 'Scripting Bash'
  },
  dragon_final: {
    id: 'dragon_final',
    name: 'Dragón del Sistema',
    world: 5,
    title: 'Boss Final - Señor de la Automatización',
    avatar: '🐉',
    description: 'El boss final: un dragón que domina todos los comandos y scripts',
    greeting: '¡Finalmente llegaste, pequeño explorador! Prepárate para la batalla épica final.',
    personality: 'menacing',
    specialty: 'Scripting Avanzado',
    isBoss: true,
    difficulty: 5
  }
};

export function getNPCsByWorld(worldId) {
  return Object.values(NPCs).filter(npc => npc.world === worldId);
}

export function getNPC(npcId) {
  return NPCs[npcId];
}
