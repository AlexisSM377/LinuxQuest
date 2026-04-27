import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import 'xterm/css/xterm.css';

export default function Terminal() {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const commandBuffer = useRef('');
  const { token } = useAuthStore();

  useEffect(() => {
    if (!terminalRef.current || !token) return;

    const rect = terminalRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn('Terminal container has no dimensions');
      return;
    }

    const term = new XTerm({
      cursorBlink: true,
      theme: {
        background: '#1a1a1a',
        foreground: '#00ff00'
      }
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);

    // Esperar a que el contenedor tenga dimensiones antes de ajustar
    const fitTerminal = () => {
      try {
        const rect = terminalRef.current?.getBoundingClientRect();
        if (rect && rect.width > 0 && rect.height > 0) {
          fitAddon.fit();
        } else {
          setTimeout(fitTerminal, 50);
        }
      } catch (error) {
        console.error('FitAddon error:', error);
      }
    };

    fitTerminal();

    // Conectar Socket.io
    socketRef.current = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      auth: { token }
    });

    socketRef.current.on('connect', () => {
      term.write('Conectado al servidor\r\n');
      term.write('Welcome to LinuxQuest Terminal\r\nType "help" for available commands\r\n\r\n$ ');
    });

    socketRef.current.on('connect_error', (error) => {
      term.write(`\r\nError de conexión: ${error.message}\r\n$ `);
    });

    // Manejar entrada del usuario
    term.onData((data) => {
      if (data === '\r') {
        // Enviar comando al backend
        const command = commandBuffer.current.trim();
        commandBuffer.current = '';

        if (command.length > 0) {
          term.write('\r\n');
          console.log('Enviando comando:', command);
          socketRef.current.emit('command', command, (response) => {
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
      } else if (data === '\u007F') {
        // Backspace
        if (commandBuffer.current.length > 0) {
          commandBuffer.current = commandBuffer.current.slice(0, -1);
          term.write('\b \b');
        }
      } else if (data >= ' ' && data <= '~') {
        // Caracteres imprimibles
        commandBuffer.current += data;
        term.write(data);
      }
    });

    const handleResize = () => {
      try {
        fitAddon.fit();
      } catch (error) {
        console.error('Terminal resize error:', error);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      term.dispose();
    };
  }, [token]);

  return <div ref={terminalRef} className="w-full h-full bg-black" style={{ display: 'flex' }} />;
}
