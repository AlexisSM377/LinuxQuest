import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const ALLOWED_COMMANDS = {
  help: 'Muestra comandos disponibles',
  ls: 'Lista archivos',
  pwd: 'Directorio actual',
  echo: 'Imprime texto',
  cat: 'Muestra contenido de archivo',
  whoami: 'Usuario actual',
  date: 'Fecha y hora'
};

const SANDBOX_DIR = process.cwd();
const TIMEOUT_MS = 5000;

export const executeCommand = async (command) => {
  try {
    const cmd = command.trim().split(' ')[0];

    // Validar comando en lista blanca
    if (!ALLOWED_COMMANDS[cmd]) {
      return {
        error: `Comando no permitido: ${cmd}. Usa 'help' para ver disponibles.`,
        output: ''
      };
    }

    // Si es help, retornar lista de comandos sin ejecutar
    if (cmd === 'help') {
      const helpText = Object.entries(ALLOWED_COMMANDS)
        .map(([name, desc]) => `  ${name.padEnd(10)} - ${desc}`)
        .join('\n');
      return { output: `Comandos disponibles:\n${helpText}`, error: '' };
    }

    // Ejecutar comando con timeout
    const { stdout, stderr } = await execAsync(command, {
      cwd: SANDBOX_DIR,
      timeout: TIMEOUT_MS,
      maxBuffer: 1024 * 1024
    });

    if (stderr) {
      return { error: stderr, output: '' };
    }

    return { output: stdout || '(sin salida)', error: '' };
  } catch (error) {
    if (error.code === 'ERR_CHILD_PROCESS_TIMEOUT') {
      return { error: 'Comando excedió tiempo límite (5s)', output: '' };
    }
    return { error: error.message || 'Error ejecutando comando', output: '' };
  }
};
