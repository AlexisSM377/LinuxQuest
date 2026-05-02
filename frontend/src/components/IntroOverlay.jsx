import { useState, useEffect, useCallback } from 'react';

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
  const [cols, setCols] = useState(() => Math.max(40, Math.floor(window.innerWidth / 12)));

  useEffect(() => {
    const handleResize = () => {
      setCols(Math.max(40, Math.floor(window.innerWidth / 12)));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const runIntro = useCallback(async () => {
    if (started) return;
    setStarted(true);
    const sep = '═'.repeat(Math.min(cols, 63)) + '\n';
    const c = (t, s) => writeChar(setText, t, s);

    await wait(500);
    await c('\n', 50);
    await c(sep, 12);
    await c('\n', 100);
    await c('                    LINUXQUEST\n', 45);
    await c('              El Reino del Kernel\n', 30);
    await c('\n', 300);
    await c(sep, 12);
    await c('\n', 500);

    await c('  En el principio, solo existia el Caos Binario.\n', 20);
    await c('  Ceros y unos vagaban sin proposito por el vacio\n', 20);
    await c('  digital.\n', 20);
    await wait(400);

    await c('\n', 200);
    await c('  Entonces, un joven herrero finlandes llamado Linus\n', 20);
    await c('  forjo el Primer Kernel — un corazon de codigo que\n', 20);
    await c('  daria vida a todo un reino.\n', 20);
    await wait(400);

    await c('\n', 200);
    await c('  Pero el codigo solo no bastaba. Richard el Sabio\n', 20);
    await c('  creo las Cuatro Libertades, leyes sagradas que\n', 20);
    await c('  permitirian a todo ser digital copiar, estudiar,\n', 20);
    await c('  modificar y compartir el conocimiento.\n', 20);
    await wait(400);

    await c('\n', 200);
    await c('  Asi nacio el Reino del Kernel.\n', 28);
    await wait(500);

    await c('\n', 300);
    await c('  Cinco guardianes protegen los cinco dominios:\n', 20);
    await c('\n', 200);
    await c('    I.   Linux el Sabio     — El Castillo del Conocimiento\n', 16);
    await c('    II.  Grep-ild           — Los Senderos del Sistema\n', 16);
    await c('    III. Chmod-ard          — Las Torres del Procesamiento\n', 16);
    await c('    IV.  Kernel el Forjador — La Forja del Nucleo\n', 16);
    await c('    V.   Sudo-Man           — Las Bovedas de la Seguridad\n', 16);
    await wait(400);

    await c('\n', 300);
    await c('  Pero las fuerzas del Caos Propietario acechan.\n', 20);
    await c('  Virus textuales, procesos zombies y permisos\n', 20);
    await c('  corruptos amenazan el reino.\n', 20);
    await wait(400);

    await c('\n', 200);
    await c('  Tu, joven Aprendiz del Codigo, debes dominar los\n', 20);
    await c('  comandos sagrados para convertirte en Maestro Linux\n', 20);
    await c('  y obtener el Pergamino de la Certificacion LPI.\n', 20);
    await wait(500);

    await c('\n', 200);
    await c(sep, 12);
    await c('\n', 300);

    setShowPrompt(true);
  }, [started, cols]);

  useEffect(() => {
    runIntro();
  }, [runIntro]);

  useEffect(() => {
    if (!showPrompt) return;
    const handler = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        setDone(true);
        localStorage.setItem('lq-intro-shown', '1');
        setTimeout(onComplete, 400);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showPrompt, onComplete]);

  return (
    <div style={{
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
    }}>
      <pre style={{
        fontFamily: "'VT323', 'Courier New', monospace",
        fontSize: 'clamp(14px, 2vw, 20px)',
        color: '#5fff7f',
        lineHeight: 1.5,
        maxWidth: 720,
        width: '90%',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        textShadow: '0 0 8px rgba(95,255,127,0.3)',
      }}>
        {text}
        <span style={{ opacity: 0.6 }}>█</span>
      </pre>

      {showPrompt && (
        <div style={{
          marginTop: 32,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 12,
          color: '#f5a623',
          animation: 'introBlink 1s infinite',
          letterSpacing: 2,
        }}>
          PRESIONA ENTER PARA CONTINUAR
        </div>
      )}

      <style>{`
        @keyframes introBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
