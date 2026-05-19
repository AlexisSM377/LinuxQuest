import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

const ANSI_COLORS = {
  '30': '#333', '31': '#e85d4d', '32': '#7fb069', '33': '#f5a623',
  '34': '#5fb3d4', '35': '#8b5a96', '36': '#5fb3d4', '37': '#f4e4c1',
  '90': '#666', '91': '#ff7f7f', '92': '#5fff7f', '93': '#ffd58a',
  '94': '#5fffdf', '95': '#cba6f7', '96': '#7fffef', '97': '#ffffff',
};

function AnsiText({ text }) {
  const parts = [];
  const regex = /\x1b\[([0-9;]*)m/g;
  let last = 0;
  let color = null;
  let bold = false;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ t: text.slice(last, match.index), c: color, b: bold });
    }
    const codes = match[1] ? match[1].split(';') : ['0'];
    for (const code of codes) {
      if (code === '0' || code === '') { color = null; bold = false; }
      else if (code === '1') bold = true;
      else if (ANSI_COLORS[code]) color = ANSI_COLORS[code];
    }
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push({ t: text.slice(last), c: color, b: bold });
  if (!parts.length) return null;

  return (
    <>
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.c || undefined, fontWeight: p.b ? 'bold' : undefined }}>
          {p.t}
        </span>
      ))}
    </>
  );
}

const TERMINAL_THEMES = {
  1:  { name: 'CLASSIC',     background: '#050a08', foreground: '#5fff7f', cursor: '#5fff7f', barBg: '#0a1410' },
  4:  { name: 'PHOSPHOR',    background: '#0a0f0a', foreground: '#33ff33', cursor: '#33ff33', barBg: '#0d1a0d' },
  8:  { name: 'AMBER',       background: '#0f0800', foreground: '#ffb000', cursor: '#ffb000', barBg: '#1a0f05' },
  13: { name: 'COPPERPLATE', background: '#1a1520', foreground: '#d4c5a0', cursor: '#d4a040', barBg: '#201a28' },
};
const THEME_UNLOCK_LEVELS = [1, 4, 8, 13];

function getThemeForLevel(level) {
  let id = 1;
  for (const lvl of THEME_UNLOCK_LEVELS) { if (level >= lvl) id = lvl; }
  return id;
}

let lineKey = 0;

export default function MobileTerminal({ questId = null, onCommandExec = null, userLevel = 1 }) {
  const [lines, setLines] = useState(() => [
    { id: ++lineKey, text: '\x1b[93mLINUXQUEST — Terminal\x1b[0m' },
    { id: ++lineKey, text: 'Conectando al servidor...' },
  ]);
  const [input, setInput] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const socketRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const history = useRef([]);
  const historyIndex = useRef(-1);
  const questIdRef = useRef(questId);
  const onCommandExecRef = useRef(onCommandExec);
  const { token } = useAuthStore();

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

  useEffect(() => {
    if (userLevel < selectedThemeId) setSelectedThemeId(getThemeForLevel(userLevel));
  }, [userLevel, selectedThemeId]);

  useEffect(() => { questIdRef.current = questId; }, [questId]);
  useEffect(() => { onCommandExecRef.current = onCommandExec; }, [onCommandExec]);

  // Auto-scroll on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const addLines = useCallback((texts) => {
    const newLines = texts.map(text => ({ id: ++lineKey, text }));
    setLines(prev => [...prev, ...newLines]);
  }, []);

  // Socket connection
  useEffect(() => {
    if (!token) return;

    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      auth: { token },
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnectionStatus('connected');
      addLines(['\x1b[92m● CONECTADO AL SERVIDOR\x1b[0m']);
    });
    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
      addLines(['\x1b[91m● DESCONECTADO DEL SERVIDOR\x1b[0m']);
    });
    socket.on('reconnect', () => {
      setConnectionStatus('connected');
      addLines(['\x1b[92m● RECONECTADO\x1b[0m']);
    });
    socket.on('connect_error', (err) => {
      setConnectionStatus('error');
      addLines([`\x1b[91m✗ Error de conexión: ${err.message}\x1b[0m`]);
    });

    return () => socket.disconnect();
  }, [token, addLines]);

  const sendCommand = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;

    if (history.current[0] !== cmd) {
      history.current.unshift(cmd);
      if (history.current.length > 50) history.current.pop();
    }
    historyIndex.current = -1;
    setInput('');

    addLines([`\x1b[94m$\x1b[0m ${cmd}`]);

    socketRef.current?.emit('command', cmd, questIdRef.current, (response) => {
      if (response?.isClear) {
        setLines([]);
        return;
      }
      const toAdd = [];
      if (response?.output) {
        const outputLines = response.output.split('\n');
        if (outputLines[outputLines.length - 1] === '') outputLines.pop();
        toAdd.push(...outputLines);
      }
      if (response?.error && !response?.output) {
        toAdd.push(`\x1b[91m${response.error}\x1b[0m`);
      } else if (response?.error) {
        toAdd.push(`\x1b[91m${response.error}\x1b[0m`);
      }
      if (toAdd.length) addLines(toAdd);
      if (onCommandExecRef.current) onCommandExecRef.current(cmd, response);
    });
  }, [input, addLines]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.current.length) return;
      const idx = Math.min(historyIndex.current + 1, history.current.length - 1);
      historyIndex.current = idx;
      setInput(history.current[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex.current <= 0) { historyIndex.current = -1; setInput(''); }
      else { historyIndex.current--; setInput(history.current[historyIndex.current]); }
    }
  }, [sendCommand]);

  const statusColors = { connected: '#5fff7f', disconnected: '#ff7f7f', error: '#ff7f7f', connecting: '#ffd58a' };
  const statusLabels = { connected: 'EN VIVO', disconnected: 'OFFLINE', error: 'ERROR', connecting: '...' };

  const historyUp = useCallback(() => {
    if (!history.current.length) return;
    const idx = Math.min(historyIndex.current + 1, history.current.length - 1);
    historyIndex.current = idx;
    setInput(history.current[idx]);
  }, []);

  const historyDown = useCallback(() => {
    if (historyIndex.current <= 0) { historyIndex.current = -1; setInput(''); }
    else { historyIndex.current--; setInput(history.current[historyIndex.current]); }
  }, []);

  return (
    <div className="term" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.background }}>
      {/* Bar */}
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

      {/* Output */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 10px',
          fontFamily: '"JetBrains Mono", "Courier New", monospace',
          fontSize: 12,
          lineHeight: 1.6,
          color: theme.foreground,
          wordBreak: 'break-all',
          WebkitOverflowScrolling: 'touch',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map(line => (
          <div key={line.id} style={{ minHeight: '1.6em' }}>
            {line.text ? <AnsiText text={line.text} /> : ' '}
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderTop: `2px solid ${theme.foreground}33`,
        padding: '0 10px',
        minHeight: 48,
        background: theme.background,
        gap: 6,
      }}>
        <span style={{
          color: '#5fb3d4',
          fontFamily: '"JetBrains Mono", "Courier New", monospace',
          fontSize: 14,
          flexShrink: 0,
          userSelect: 'none',
        }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          inputMode="text"
          placeholder="escribe un comando..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: theme.foreground,
            fontFamily: '"JetBrains Mono", "Courier New", monospace',
            fontSize: 14,
            caretColor: theme.cursor,
            minWidth: 0,
          }}
        />
        <button
          onPointerDown={(e) => { e.preventDefault(); sendCommand(); setTimeout(() => inputRef.current?.focus(), 0); }}
          style={{
            background: theme.foreground,
            color: theme.background,
            border: 'none',
            padding: '6px 14px',
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            cursor: 'pointer',
            flexShrink: 0,
            fontWeight: 'bold',
          }}
        >↵</button>
      </div>

      {/* Mobile keys bar */}
      <div className="mobile-keys-bar">
        {[
          { label: 'Tab',  onPress: () => setInput(i => i + '\t') },
          { label: '↑',   onPress: historyUp },
          { label: '↓',   onPress: historyDown },
          { label: 'C⃗',  title: 'Ctrl+C', onPress: () => { addLines(['^C']); setInput(''); historyIndex.current = -1; } },
          { label: '⌫',   onPress: () => setInput(i => i.slice(0, -1)) },
        ].map(({ label, title, onPress }) => (
          <button
            key={label}
            title={title || label}
            onPointerDown={(e) => {
              e.preventDefault();
              onPress();
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
