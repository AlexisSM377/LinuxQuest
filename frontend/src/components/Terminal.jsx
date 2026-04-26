import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css';

export default function Terminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;

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
    fitAddon.fit();

    term.write('Welcome to LinuxQuest Terminal\r\nType "help" for available commands\r\n\r\n$ ');

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
      term.dispose();
    };
  }, []);

  return <div ref={terminalRef} className="w-full h-full bg-black" />;
}
