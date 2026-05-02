import { useState, useEffect, useCallback, useRef } from 'react';

const writeChar = (setter, text, speed = 18) =>
  new Promise(resolve => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) {
        setter(prev => prev + text[i]);
        i++;
      } else {
        clearInterval(iv);
        setter(prev => prev + '\n');
        resolve();
      }
    }, speed);
  });

const wait = (ms) => new Promise(r => setTimeout(r, ms));

export default function IntroOverlay({ onComplete }) {
  const [text, setText] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const [cols, setCols] = useState(() => Math.max(30, Math.floor(window.innerWidth / 12)));
  const cancelledRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setCols(Math.max(30, Math.floor(window.innerWidth / 12)));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleComplete = useCallback(() => {
    if (done) return;
    cancelledRef.current = true;
    setDone(true);
    localStorage.setItem('lq-intro-shown', '1');
    setTimeout(onComplete, 400);
  }, [done, onComplete]);

  const runIntro = useCallback(async () => {
    if (started) return;
    setStarted(true);
    const isMobile = window.innerWidth < 768;
    const speedMul = isMobile ? 0.6 : 1;
    const waitMul = isMobile ? 0.5 : 1;
    const sep = '═'.repeat(Math.min(cols, 50)) + '\n';
    const c = async (t, s) => {
      if (cancelledRef.current) return;
      await writeChar(setText, t, Math.round(s * speedMul));
    };
    const w = async (ms) => {
      if (cancelledRef.current) return;
      await wait(Math.round(ms * waitMul));
    };

    await w(500);
    await c('\n', 50);
    await c(sep, 12);
    await c('\n', 100);
    await c('         LINUXQUEST\n', 45);
    await c('    El Reino del Kernel\n', 30);
    await c('\n', 300);
    await c(sep, 12);
    await c('\n', 500);

    await c('  En el principio, solo existia\n', 20);
    await c('  el Caos Binario. Ceros y unos\n', 20);
    await c('  vagaban sin proposito por el\n', 20);
    await c('  vacio digital.\n', 20);
    await w(400);

    await c('\n', 200);
    await c('  Entonces, un joven herrero\n', 20);
    await c('  finlandes llamado Linus forjo\n', 20);
    await c('  el Primer Kernel — un corazon\n', 20);
    await c('  de codigo que daria vida a\n', 20);
    await c('  todo un reino.\n', 20);
    await w(400);

    await c('\n', 200);
    await c('  Pero el codigo solo no bastaba.\n', 20);
    await c('  Richard el Sabio creo las\n', 20);
    await c('  Cuatro Libertades, leyes\n', 20);
    await c('  sagradas que permitirian a\n', 20);
    await c('  todo ser digital copiar,\n', 20);
    await c('  estudiar, modificar y\n', 20);
    await c('  compartir el conocimiento.\n', 20);
    await w(400);

    await c('\n', 200);
    await c('  Asi nacio el Reino del Kernel.\n', 28);
    await w(500);

    await c('\n', 300);
    await c('  Cinco guardianes protegen\n', 20);
    await c('  los cinco dominios:\n', 20);
    await c('\n', 200);
    await c('  I.  Linux el Sabio\n', 16);
    await c('      El Castillo del Conocimiento\n', 16);
    await c('  II. Grep-ild\n', 16);
    await c('      Los Senderos del Sistema\n', 16);
    await c('  III.Chmod-ard\n', 16);
    await c('      Las Torres del Procesamiento\n', 16);
    await c('  IV. Kernel el Forjador\n', 16);
    await c('      La Forja del Nucleo\n', 16);
    await c('  V.  Sudo-Man\n', 16);
    await c('      Las Bovedas de la Seguridad\n', 16);
    await w(400);

    await c('\n', 300);
    await c('  Pero las fuerzas del Caos\n', 20);
    await c('  Propietario acechan. Virus\n', 20);
    await c('  textuales, procesos zombies\n', 20);
    await c('  y permisos corruptos amenazan\n', 20);
    await c('  el reino.\n', 20);
    await w(400);

    await c('\n', 200);
    await c('  Tu, joven Aprendiz del Codigo,\n', 20);
    await c('  debes dominar los comandos\n', 20);
    await c('  sagrados para convertirte en\n', 20);
    await c('  Maestro Linux y obtener el\n', 20);
    await c('  Pergamino de la Certificacion\n', 20);
    await c('  LPI.\n', 20);
    await w(500);

    await c('\n', 200);
    await c(sep, 12);
    await c('\n', 300);

    if (!cancelledRef.current) setShowPrompt(true);
  }, [started, cols]);

  useEffect(() => {
    runIntro();
  }, [runIntro]);

  useEffect(() => {
    if (!showPrompt) return;
    const handler = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        handleComplete();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showPrompt, handleComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050a08',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.4s ease',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'auto',
        cursor: showPrompt ? 'pointer' : 'default',
        padding: '20px',
      }}
      onClick={showPrompt ? handleComplete : undefined}
    >
      {/* Botón saltar — siempre visible */}
      <button
        onClick={(e) => { e.stopPropagation(); handleComplete(); }}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          background: 'transparent',
          border: '2px solid #5fff7f44',
          color: '#5fff7f88',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(7px, 1.5vw, 9px)',
          padding: '10px 16px',
          cursor: 'pointer',
          letterSpacing: 1,
          minHeight: 44,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        SALTAR ▸
      </button>

      <pre style={{
        fontFamily: "'VT323', 'Courier New', monospace",
        fontSize: 'clamp(13px, 2.5vw, 20px)',
        color: '#5fff7f',
        lineHeight: 1.5,
        maxWidth: 600,
        width: '100%',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        textShadow: '0 0 8px rgba(95,255,127,0.3)',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 120px)',
      }}>
        {text}
        <span style={{ opacity: 0.6 }}>█</span>
      </pre>

      {showPrompt && (
        <div style={{
          marginTop: 24,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(8px, 2vw, 12px)',
          color: '#f5a623',
          animation: 'introBlink 1s infinite',
          letterSpacing: 2,
          textAlign: 'center',
          padding: '12px 20px',
        }}>
          PRESIONA ENTER O TOCA PARA CONTINUAR
        </div>
      )}

      <style>{`
        @keyframes introBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 480px) {
          pre { font-size: 13px !important; }
        }
      `}</style>
    </div>
  );
}
