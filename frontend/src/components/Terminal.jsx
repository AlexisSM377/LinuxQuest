import { useEffect, useRef, useCallback, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import 'xterm/css/xterm.css';

const writeLine = (term, text, delay = 0) =>
  new Promise(resolve => {
    setTimeout(() => { term.write(text + '\r\n'); resolve(); }, delay);
  });

const writeChar = (term, text, speed = 18) =>
  new Promise(resolve => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) { term.write(text[i]); i++; }
      else { clearInterval(iv); term.write('\r\n'); resolve(); }
    }, speed);
  });

const INTRO_LINES = [
  { text: '', color: '', delay: 300 },
  { text: '═══════════════════════════════════════════════════════════════', color: '\x1b[93m', delay: 80 },
  { text: '', color: '', delay: 100 },
  { text: '                    LINUXQUEST', color: '\x1b[93m', delay: 200, typing: true, speed: 50 },
  { text: '              El Reino del Kernel', color: '\x1b[90m', delay: 150, typing: true, speed: 35 },
  { text: '', color: '', delay: 400 },
  { text: '═══════════════════════════════════════════════════════════════', color: '\x1b[93m', delay: 80 },
  { text: '', color: '', delay: 500 },
  { text: '  En el principio, solo existia el Caos Binario.', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  Ceros y unos vagaban sin proposito por el vacio', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  digital.', color: '\x1b[97m', delay: 300, typing: true, speed: 22 },
  { text: '', color: '', delay: 400 },
  { text: '  Entonces, un joven herrero finlandes llamado Linus', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  forjo el Primer Kernel — un corazon de codigo que', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  daria vida a todo un reino.', color: '\x1b[97m', delay: 400, typing: true, speed: 22 },
  { text: '', color: '', delay: 300 },
  { text: '  Pero el codigo solo no bastaba. Richard el Sabio', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  creo las Cuatro Libertades, leyes sagradas que', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  permitirian a todo ser digital copiar, estudiar,', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  modificar y compartir el conocimiento.', color: '\x1b[97m', delay: 400, typing: true, speed: 22 },
  { text: '', color: '', delay: 300 },
  { text: '  Asi nacio el Reino del Kernel.', color: '\x1b[93m', delay: 500, typing: true, speed: 30 },
  { text: '', color: '', delay: 500 },
  { text: '  Cinco guardianes protegen los cinco dominios:', color: '\x1b[96m', delay: 100, typing: true, speed: 22 },
  { text: '', color: '', delay: 200 },
  { text: '    I.   Linux el Sabio     — El Castillo del Conocimiento', color: '\x1b[93m', delay: 120, typing: true, speed: 18 },
  { text: '    II.  Grep-ild           — Los Senderos del Sistema', color: '\x1b[92m', delay: 120, typing: true, speed: 18 },
  { text: '    III. Chmod-ard          — Las Torres del Procesamiento', color: '\x1b[94m', delay: 120, typing: true, speed: 18 },
  { text: '    IV.  Kernel el Forjador — La Forja del Nucleo', color: '\x1b[95m', delay: 120, typing: true, speed: 18 },
  { text: '    V.   Sudo-Man           — Las Bovedas de la Seguridad', color: '\x1b[91m', delay: 300, typing: true, speed: 18 },
  { text: '', color: '', delay: 500 },
  { text: '  Pero las fuerzas del Caos Propietario acechan.', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  Virus textuales, procesos zombies y permisos', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  corruptos amenazan el reino.', color: '\x1b[97m', delay: 400, typing: true, speed: 22 },
  { text: '', color: '', delay: 300 },
  { text: '  Tu, joven Aprendiz del Codigo, debes dominar los', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  comandos sagrados para convertirte en Maestro Linux', color: '\x1b[97m', delay: 80, typing: true, speed: 22 },
  { text: '  y obtener el Pergamino de la Certificacion LPI.', color: '\x1b[97m', delay: 400, typing: true, speed: 22 },
  { text: '', color: '', delay: 300 },
  { text: '═══════════════════════════════════════════════════════════════', color: '\x1b[93m', delay: 80 },
  { text: '', color: '', delay: 200 },
  { text: '  Domina los comandos. Obtén la certificación.', color: '\x1b[90m', delay: 100, typing: true, speed: 25 },
  { text: '  Escribe "help" para ver tus comandos disponibles.', color: '\x1b[90m', delay: 100, typing: true, speed: 25 },
  { text: '', color: '', delay: 300 },
];

const WORLD_INTERLUDES = {
  2: {
    title: 'MUNDO 2 DESBLOQUEADO',
    lines: [
      'Las puertas del Castillo se abren lentamente.',
      'Mas alla, un sendero serpentea entre arboles',
      'de codigo centenarios.',
      '',
      'Grep-ild te espera al inicio del camino,',
      'con una sonrisa y un mapa enrollado.',
      '',
      '"Cada directorio es una nueva aventura.',
      ' Listo para explorar?"',
    ],
    color: '\x1b[92m',
  },
  3: {
    title: 'MUNDO 3 DESBLOQUEADO',
    lines: [
      'Los senderos te llevan hasta unas torres',
      'que se alzan hacia el cielo digital.',
      '',
      'Chmod-ard, el mago de los datos, te recibe',
      'con su capa azul bordada de runas de regex.',
      '',
      '"Los datos fluyen como rios.',
      ' Con pipes los diriges, con grep los filtras.',
      ' Domina el flujo y seras invencible."',
    ],
    color: '\x1b[94m',
  },
  4: {
    title: 'MUNDO 4 DESBLOQUEADO',
    lines: [
      'Detras de las torres, una forja humea.',
      'El martillo de Kernel el Forjador resuena',
      'con cada golpe sobre el acero digital.',
      '',
      '"El hardware es el acero, el kernel es el fuego.',
      ' Aqui forjamos procesos, monitoreamos recursos',
      ' y conectamos redes."',
      '',
      '"El nucleo es el corazon. Si falla, todo falla."',
    ],
    color: '\x1b[95m',
  },
  5: {
    title: 'MUNDO 5 DESBLOQUEADO',
    lines: [
      'La forja se esconde tras una puerta de hierro.',
      'Mas alla, bovedas selladas guardan los secretos',
      'mas valiosos del reino.',
      '',
      'Sudo-Man, el guardian supremo, bloquea el paso',
      'con su escudo dorado marcado con el simbolo #.',
      '',
      '"Sin permisos no hay orden. Sin usuarios no hay sistema.',
      ' El poder absoluto requiere responsabilidad absoluta."',
    ],
    color: '\x1b[91m',
  },
};

const TERMINAL_THEMES = {
  1: {
    name: 'CLASSIC',
    background: '#050a08',
    foreground: '#5fff7f',
    cursor: '#5fff7f',
    selectionBackground: '#3fcc5f44',
    black: '#1a0f1f', brightBlack: '#4a2f54',
    red: '#e85d4d', brightRed: '#ff7f7f',
    green: '#7fb069', brightGreen: '#5fff7f',
    yellow: '#f5a623', brightYellow: '#ffd58a',
    blue: '#5fb3d4', brightBlue: '#5fffdf',
    magenta: '#8b5a96', brightMagenta: '#cba6f7',
    cyan: '#5fb3d4', brightCyan: '#5fffdf',
    white: '#f4e4c1', brightWhite: '#ffffff',
    barBg: '#0a1410',
  },
  4: {
    name: 'PHOSPHOR',
    background: '#0a0f0a',
    foreground: '#33ff33',
    cursor: '#33ff33',
    selectionBackground: '#33ff3344',
    black: '#0a0f0a', brightBlack: '#1a3a1a',
    red: '#ff3333', brightRed: '#ff6666',
    green: '#33ff33', brightGreen: '#66ff66',
    yellow: '#ffff33', brightYellow: '#ffff66',
    blue: '#33ffff', brightBlue: '#66ffff',
    magenta: '#ff33ff', brightMagenta: '#ff66ff',
    cyan: '#33ffff', brightCyan: '#66ffff',
    white: '#ccffcc', brightWhite: '#ffffff',
    barBg: '#0d1a0d',
  },
  8: {
    name: 'AMBER',
    background: '#0f0800',
    foreground: '#ffb000',
    cursor: '#ffb000',
    selectionBackground: '#ffb00044',
    black: '#0f0800', brightBlack: '#2a1800',
    red: '#ff4444', brightRed: '#ff7777',
    green: '#ffb000', brightGreen: '#ffcc44',
    yellow: '#ffdd00', brightYellow: '#ffee66',
    blue: '#ff8800', brightBlue: '#ffaa44',
    magenta: '#ff6600', brightMagenta: '#ff8844',
    cyan: '#ffcc00', brightCyan: '#ffdd66',
    white: '#ffddaa', brightWhite: '#ffffff',
    barBg: '#1a0f05',
  },
  13: {
    name: 'COPPERPLATE',
    background: '#1a1520',
    foreground: '#d4c5a0',
    cursor: '#d4a040',
    selectionBackground: '#d4a04044',
    black: '#1a1520', brightBlack: '#2a2530',
    red: '#c45c4a', brightRed: '#e87d6a',
    green: '#7a9a5a', brightGreen: '#9aba7a',
    yellow: '#d4a040', brightYellow: '#f4c060',
    blue: '#6a8ab0', brightBlue: '#8aaad0',
    magenta: '#8a6a9a', brightMagenta: '#aa8aba',
    cyan: '#5a9a9a', brightCyan: '#7ababa',
    white: '#d4c5a0', brightWhite: '#f0e8d0',
    barBg: '#201a28',
  },
};

const THEME_UNLOCK_LEVELS = [1, 4, 8, 13];

function getThemeForLevel(level) {
  let themeId = 1;
  for (const lvl of THEME_UNLOCK_LEVELS) {
    if (level >= lvl) themeId = lvl;
  }
  return themeId;
}

export default function Terminal({ questId = null, onCommandExec = null, userLevel = 1 }) {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const commandBuffer = useRef('');
  const cursorPos = useRef(0);
  const history = useRef([]);
  const historyIndex = useRef(-1);
  const { token } = useAuthStore();
  const termInstanceRef = useRef(null);
  const fitAddonRef = useRef(null);
  const questIdRef = useRef(questId);
  const onCommandExecRef = useRef(onCommandExec);
  const resizeHandlerRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  // Sync refs outside render
  useEffect(() => {
    questIdRef.current = questId;
  }, [questId]);
  useEffect(() => {
    onCommandExecRef.current = onCommandExec;
  }, [onCommandExec]);

  const [selectedThemeId, setSelectedThemeId] = useState(() => {
    const saved = localStorage.getItem('linuxquest-terminal-theme');
    const id = saved ? parseInt(saved) : 1;
    return THEME_UNLOCK_LEVELS.includes(id) ? id : 1;
  });

  const theme = TERMINAL_THEMES[selectedThemeId] || TERMINAL_THEMES[1];

  const selectTheme = useCallback((lvl) => {
    if (userLevel < lvl) return;
    setSelectedThemeId(lvl);
    localStorage.setItem('linuxquest-terminal-theme', String(lvl));
  }, [userLevel]);

  // Si el nivel baja (improbable) o al montar, asegurarse que el tema sea válido
  useEffect(() => {
    if (userLevel < selectedThemeId) {
      const best = getThemeForLevel(userLevel);
      setSelectedThemeId(best);
    }
  }, [userLevel, selectedThemeId]);

  const redrawBuffer = useCallback((term) => {
    const buf = commandBuffer.current;
    const pos = cursorPos.current;
    // Mover cursor al inicio de la línea, borrar toda la línea
    term.write('\r\x1b[2K');
    // Escribir prompt
    term.write('\x1b[94m$\x1b[0m ');
    // Escribir buffer
    if (buf.length > 0) {
      term.write(buf);
    }
    // Mover cursor a la posición correcta
    const moveBack = buf.length - pos;
    if (moveBack > 0) {
      term.write(`\x1b[${moveBack}D`);
    }
  }, []);

  // Aplicar tema sin recrear terminal
  useEffect(() => {
    const term = termInstanceRef.current;
    if (!term) return;
    term.options.theme = theme;
  }, [theme]);

  // Inicializar terminal (solo una vez por token)
  useEffect(() => {
    if (!terminalRef.current || !token) return;

    let term = null;
    let fitAddon = null;
    let mounted = true;

    const initTerminal = async () => {
      try {
        term = new XTerm({
          cursorBlink: true,
          theme,
          fontFamily: '"JetBrains Mono", "Courier New", monospace',
          fontSize: 12,
          lineHeight: 1.4,
          allowProposedApi: true,
        });

        fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddonRef.current = fitAddon;

        if (mounted && terminalRef.current) {
          term.open(terminalRef.current);
          termInstanceRef.current = term;
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (mounted && fitAddon && termInstanceRef.current) {
          try { fitAddon.fit(); } catch { /* not visible */ }
        }

        if (mounted && term) {
          term.onData((data) => {
            const buf = commandBuffer.current;
            const pos = cursorPos.current;

            if (data === '\r') {
              const command = buf.trim();
              commandBuffer.current = '';
              cursorPos.current = 0;
              historyIndex.current = -1;
              if (command.length > 0) {
                if (history.current[0] !== command) {
                  history.current.unshift(command);
                  if (history.current.length > 50) history.current.pop();
                }
                term.write('\r\n');
                socketRef.current?.emit('command', command, questIdRef.current, (response) => {
                  if (!term) return;
                  // Handle clear command
                  if (response?.isClear) {
                    term.clear();
                    term.write('\x1b[94m$\x1b[0m ');
                    if (onCommandExecRef.current) onCommandExecRef.current(command, response);
                    return;
                  }
                  if (response?.error && !response?.output) {
                    term.write(`\x1b[91m${response.error}\x1b[0m\r\n`);
                  } else if (response?.output) {
                    // Normalize line endings for terminal
                    const output = response.output.replace(/\n/g, '\r\n');
                    term.write(output);
                    if (!output.endsWith('\r\n')) {
                      term.write('\r\n');
                    }
                    if (response?.error) {
                      term.write(`\x1b[91m${response.error}\x1b[0m\r\n`);
                    }
                  } else {
                    term.write('\r\n');
                  }
                  term.write('\x1b[94m$\x1b[0m ');
                  if (onCommandExecRef.current) onCommandExecRef.current(command, response);
                });
              } else {
                term.write('\x1b[94m$\x1b[0m ');
              }
              return;
            }

            if (data === '\x7f' || data === '\b') {
              if (pos > 0) {
                commandBuffer.current = buf.slice(0, pos - 1) + buf.slice(pos);
                cursorPos.current = pos - 1;
                redrawBuffer(term);
              }
              return;
            }

            if (data === '\x1b[3~') {
              if (pos < buf.length) {
                commandBuffer.current = buf.slice(0, pos) + buf.slice(pos + 1);
                redrawBuffer(term);
              }
              return;
            }

            if (data === '\x1b[D') {
              if (pos > 0) {
                cursorPos.current = pos - 1;
                term.write('\x1b[D');
              }
              return;
            }

            if (data === '\x1b[C') {
              if (pos < buf.length) {
                cursorPos.current = pos + 1;
                term.write('\x1b[C');
              }
              return;
            }

            if (data === '\x1b[A') {
              if (history.current.length > 0) {
                const newIdx = Math.min(historyIndex.current + 1, history.current.length - 1);
                if (newIdx !== historyIndex.current) {
                  historyIndex.current = newIdx;
                  commandBuffer.current = history.current[newIdx];
                  cursorPos.current = commandBuffer.current.length;
                  redrawBuffer(term);
                }
              }
              return;
            }

            if (data === '\x1b[B') {
              if (historyIndex.current > 0) {
                historyIndex.current--;
                commandBuffer.current = history.current[historyIndex.current];
                cursorPos.current = commandBuffer.current.length;
                redrawBuffer(term);
              } else if (historyIndex.current === 0) {
                historyIndex.current = -1;
                commandBuffer.current = '';
                cursorPos.current = 0;
                redrawBuffer(term);
              }
              return;
            }

            if (data === '\x1b[H') {
              cursorPos.current = 0;
              term.write(`\x1b[${buf.length}D`);
              return;
            }

            if (data === '\x1b[F') {
              cursorPos.current = buf.length;
              term.write(`\x1b[${buf.length - pos}C`);
              return;
            }

            if (data >= ' ' && data <= '~') {
              commandBuffer.current = buf.slice(0, pos) + data + buf.slice(pos);
              cursorPos.current = pos + 1;
              if (pos === buf.length) {
                term.write(data);
              } else {
                redrawBuffer(term);
              }
              return;
            }
          });
        }

        if (mounted) {
          const authToken = token || localStorage.getItem('token');
          socketRef.current = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
            auth: { token: authToken },
          });

          socketRef.current.on('connect', async () => {
            setConnectionStatus('connected');
            if (term) {
              const introShown = localStorage.getItem('lq-intro-shown');
              if (!introShown) {
                for (const line of INTRO_LINES) {
                  if (line.typing) {
                    await writeChar(term, (line.color || '') + line.text + '\x1b[0m', line.speed || 22);
                  } else {
                    await writeLine(term, (line.color || '') + line.text + '\x1b[0m', line.delay || 0);
                  }
                }
                localStorage.setItem('lq-intro-shown', '1');
              }
              term.write('\x1b[92m● CONECTADO AL SERVIDOR\x1b[0m\r\n');
              term.write('\x1b[94m$\x1b[0m ');
            }
          });

          socketRef.current.on('disconnect', () => {
            setConnectionStatus('disconnected');
            if (term) {
              term.write('\r\n\x1b[91m● DESCONECTADO DEL SERVIDOR\x1b[0m\r\n');
            }
          });

          socketRef.current.on('reconnect', () => {
            setConnectionStatus('connected');
            if (term) {
              term.write('\r\n\x1b[92m● RECONECTADO\x1b[0m\r\n');
              term.write('\x1b[94m$\x1b[0m ');
            }
          });

          socketRef.current.on('connect_error', (error) => {
            setConnectionStatus('error');
            if (term) {
              term.write(`\x1b[91m✗ Error de conexión: ${error.message}\x1b[0m\r\n`);
              term.write('\x1b[94m$\x1b[0m ');
            }
          });
        }

        // Resize handler (fuera del async, cleanup funciona correctamente)
        const handleResize = () => {
          if (fitAddon && term) try { fitAddon.fit(); } catch { /* not visible */ }
        };
        resizeHandlerRef.current = handleResize;
        window.addEventListener('resize', handleResize);
      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    };

    initTerminal();

    return () => {
      mounted = false;
      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current);
        resizeHandlerRef.current = null;
      }
      socketRef.current?.disconnect();
      try { termInstanceRef.current?.dispose(); } catch { /* already disposed */ }
      termInstanceRef.current = null;
      fitAddonRef.current = null;
    };
  }, [token]); // NO incluir theme aquí

  useEffect(() => {
    const handler = async (e) => {
      const world = e.detail?.world;
      const interlude = WORLD_INTERLUDES[world];
      const term = termInstanceRef.current;
      if (!interlude || !term) return;
      term.write('\r\n');
      term.write('\x1b[93m═══════════════════════════════════════════════════════════════\x1b[0m\r\n');
      await writeLine(term, '', 200);
      await writeChar(term, `  ${interlude.title}`, 30);
      await writeLine(term, '', 200);
      term.write('\x1b[93m═══════════════════════════════════════════════════════════════\x1b[0m\r\n');
      await writeLine(term, '', 300);
      for (const l of interlude.lines) {
        await writeChar(term, interlude.color + '  ' + l + '\x1b[0m', 22);
        await new Promise(r => setTimeout(r, 80));
      }
      await writeLine(term, '', 400);
      term.write('\x1b[93m═══════════════════════════════════════════════════════════════\x1b[0m\r\n');
      term.write('\r\n');
      term.write('\x1b[94m$\x1b[0m ');
    };
    window.addEventListener('world:unlock', handler);
    return () => window.removeEventListener('world:unlock', handler);
  }, []);

  const statusColors = {
    connected: 'var(--leaf)',
    disconnected: 'var(--blood)',
    error: 'var(--blood)',
    connecting: 'var(--amber)',
  };
  const statusLabels = {
    connected: 'EN VIVO',
    disconnected: 'OFFLINE',
    error: 'ERROR',
    connecting: '...',
  };

  return (
    <div className="term" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="term-bar" data-tutorial="terminal-bar">
        <div className="term-dots">
          <span className="term-dot"></span>
          <span className="term-dot y"></span>
          <span className="term-dot g"></span>
        </div>
        <span style={{ marginLeft: 8 }}>
          SANDBOX — {questId ? `quest/${String(questId).padStart(3, '0')}` : 'libre'}
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginRight: 8 }}>
          {THEME_UNLOCK_LEVELS.map(lvl => {
            const t = TERMINAL_THEMES[lvl];
            const isUnlocked = userLevel >= lvl;
            const isActive = selectedThemeId === lvl;
            return (
              <button
                key={lvl}
                onClick={() => selectTheme(lvl)}
                disabled={!isUnlocked}
                title={isUnlocked ? `Tema: ${t.name}` : `Desbloquea en nivel ${lvl}`}
                style={{
                  fontSize: 7,
                  padding: '2px 6px',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.05em',
                  background: isActive ? theme.foreground : 'transparent',
                  color: isActive ? theme.background : isUnlocked ? theme.foreground : 'var(--parchment-2)',
                  border: `2px solid ${isActive ? theme.foreground : isUnlocked ? theme.foreground + '88' : '#444'}`,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.35,
                  transition: 'none',
                  lineHeight: '1.4',
                }}
              >
                {isUnlocked ? t.name : `LV${lvl}`}
              </button>
            );
          })}
        </div>
        <span style={{ color: statusColors[connectionStatus] }}>● {statusLabels[connectionStatus]}</span>
      </div>

      <div
        ref={terminalRef}
        style={{ flex: 1, padding: '4px', minHeight: 0 }}
      />
    </div>
  );
}
