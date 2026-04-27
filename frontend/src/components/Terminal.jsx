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
        // Create terminal
        term = new XTerm({
          cursorBlink: true,
          theme: {
            background: '#1a1a1a',
            foreground: '#00ff00'
          }
        });

        fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        if (mounted && terminalRef.current) {
          term.open(terminalRef.current);
          termInstanceRef.current = term;
        }

        // Wait a tick then fit
        await new Promise(resolve => setTimeout(resolve, 100));

        if (mounted && fitAddon && termInstanceRef.current) {
          try {
            fitAddon.fit();
          } catch (err) {
            console.warn('FitAddon fit failed (terminal might not be ready)', err.message);
          }
        }

        // Setup input handling
        if (mounted && term) {
          term.onData((data) => {
            if (data === '\r') {
              const command = commandBuffer.current.trim();
              commandBuffer.current = '';

              if (command.length > 0) {
                term.write('\r\n');
                console.log('Enviando comando:', command, 'questId:', questId);
                socketRef.current?.emit('command', command, questId, (response) => {
                  if (!term) return;
                  console.log('Respuesta recibida:', response);
                  if (response?.error) {
                    term.write(`\x1b[91m${response.error}\x1b[0m\r\n`);
                  } else if (response?.output) {
                    const output = response.output.replace(/\n/g, '\r\n');
                    term.write(`${output}\r\n`);
                  } else {
                    term.write('(sin salida)\r\n');
                  }
                  term.write('$ ');
                });
              } else {
                term.write('$ ');
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

        // Setup socket
        if (mounted) {
          const authToken = token || localStorage.getItem('token');
          socketRef.current = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
            auth: { token: authToken }
          });

          socketRef.current.on('connect', () => {
            if (term) {
              term.write('Conectado al servidor\r\n');
              term.write('Welcome to LinuxQuest Terminal\r\nType "help" for available commands\r\n\r\n$ ');
            }
          });

          socketRef.current.on('connect_error', (error) => {
            if (term) {
              term.write(`\r\nError de conexión: ${error.message}\r\n$ `);
            }
          });
        }

        // Setup resize
        const handleResize = () => {
          if (fitAddon && term) {
            try {
              fitAddon.fit();
            } catch (error) {
              console.warn('Resize fit failed:', error.message);
            }
          }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    };

    initTerminal();

    return () => {
      mounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (termInstanceRef.current) {
        try {
          termInstanceRef.current.dispose();
        } catch (e) {
          console.warn('Terminal dispose error:', e.message);
        }
      }
    };
  }, [token, questId]);

  return <div ref={terminalRef} className="w-full h-full bg-black" />;
}
