import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import 'xterm/css/xterm.css';

export default function Terminal({ questId = null }) {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const commandBuffer = useRef('');
  const { token } = useAuthStore();
  const termInstanceRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current || !token) return;

    let term = null;
    let fitAddon = null;
    let mounted = true;

    const initTerminal = async () => {
      try {
        term = new XTerm({
          cursorBlink: true,
          theme: {
            background: '#050a08',
            foreground: '#5fff7f',
            cursor: '#5fff7f',
            selectionBackground: '#3fcc5f44',
            black: '#1a0f1f',
            brightBlack: '#4a2f54',
            red: '#e85d4d',
            brightRed: '#ff7f7f',
            green: '#7fb069',
            brightGreen: '#5fff7f',
            yellow: '#f5a623',
            brightYellow: '#ffd58a',
            blue: '#5fb3d4',
            brightBlue: '#5fffdf',
            magenta: '#8b5a96',
            brightMagenta: '#cba6f7',
            cyan: '#5fb3d4',
            brightCyan: '#5fffdf',
            white: '#f4e4c1',
            brightWhite: '#ffffff',
          },
          fontFamily: '"JetBrains Mono", "Courier New", monospace',
          fontSize: 13,
          lineHeight: 1.55,
        });

        fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        if (mounted && terminalRef.current) {
          term.open(terminalRef.current);
          termInstanceRef.current = term;
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (mounted && fitAddon && termInstanceRef.current) {
          try { fitAddon.fit(); } catch {}
        }

        if (mounted && term) {
          term.onData((data) => {
            if (data === '\r') {
              const command = commandBuffer.current.trim();
              commandBuffer.current = '';
              if (command.length > 0) {
                term.write('\r\n');
                socketRef.current?.emit('command', command, questId, (response) => {
                  if (!term) return;
                  if (response?.error) {
                    term.write(`\x1b[91m${response.error}\x1b[0m\r\n`);
                  } else if (response?.output) {
                    term.write(`${response.output.replace(/\n/g, '\r\n')}\r\n`);
                  } else {
                    term.write('(sin salida)\r\n');
                  }
                  term.write('\x1b[94m$\x1b[0m ');
                });
              } else {
                term.write('\x1b[94m$\x1b[0m ');
              }
            } else if (data === '' || data === '\b') {
              if (commandBuffer.current.length > 0) {
                commandBuffer.current = commandBuffer.current.slice(0, -1);
                term.write('\b \b');
              }
            } else if (data >= ' ' && data <= '~') {
              commandBuffer.current += data;
              term.write(data);
            }
          });
        }

        if (mounted) {
          const authToken = token || localStorage.getItem('token');
          socketRef.current = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
            auth: { token: authToken },
          });

          socketRef.current.on('connect', () => {
            if (term) {
              term.write('\x1b[92m● CONECTADO AL SERVIDOR\x1b[0m\r\n');
              term.write('\x1b[90mLinuxQuest Terminal v1.0 — escribe "help" para ayuda\x1b[0m\r\n\r\n');
              term.write('\x1b[94m$\x1b[0m ');
            }
          });

          socketRef.current.on('connect_error', (error) => {
            if (term) {
              term.write(`\x1b[91m✗ Error de conexión: ${error.message}\x1b[0m\r\n`);
              term.write('\x1b[94m$\x1b[0m ');
            }
          });
        }

        const handleResize = () => {
          if (fitAddon && term) try { fitAddon.fit(); } catch {}
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    };

    initTerminal();

    return () => {
      mounted = false;
      socketRef.current?.disconnect();
      try { termInstanceRef.current?.dispose(); } catch {}
    };
  }, [token, questId]);

  return (
    <div className="term" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="term-bar">
        <div className="term-dots">
          <span className="term-dot"></span>
          <span className="term-dot y"></span>
          <span className="term-dot g"></span>
        </div>
        <span style={{ marginLeft: 8 }}>
          SANDBOX — {questId ? `quest/${String(questId).padStart(3, '0')}` : 'libre'}
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ color: 'var(--leaf)' }}>● EN VIVO</span>
      </div>

      <div
        ref={terminalRef}
        style={{ flex: 1, padding: '8px 4px', minHeight: 0 }}
      />
    </div>
  );
}
