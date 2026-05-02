import { useState, useEffect, useCallback } from 'react';

const STEPS = [
  {
    target: '[data-tutorial="nav"]',
    title: 'BARRA DE NAVEGACION',
    text: 'Aqui ves tu nivel, XP, monedas. Puedes acceder a estadisticas y logros. Es tu panel de control superior.',
  },
  {
    target: '[data-tutorial="quest-detail"]',
    title: 'DETALLE DE LA MISION',
    text: 'Aqui ves la historia, los comandos que debes usar y las pistas. Lee bien la historia — te guia hacia la solucion.',
  },
  {
    target: '[data-tutorial="quest-list"]',
    title: 'LISTA DE MISIONES',
    text: 'Cada mundo tiene misiones. Bloqueada = pendiente, En progreso = activa, Completada = hecha. Toca para seleccionar.',
  },
  {
    target: '[data-tutorial="terminal-bar"]',
    title: 'BARRA DE LA TERMINAL',
    text: 'Muestra en que mision estas. Los puntos de colores son decorativos. Puedes cambiar el tema si tu nivel lo permite.',
  },
  {
    target: '[data-tutorial="terminal"]',
    title: 'TERMINAL',
    text: 'Aqui escribes los comandos de Linux. Solo se permiten los comandos que la mision requiere. Escribe "help" si necesitas ayuda.',
  },
];

export default function GameTutorial({ onComplete, onStepChange }) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  useEffect(() => {
    setReady(false);
    setRect(null);
    let attempts = 0;
    const tryFind = () => {
      attempts++;
      const selector = STEPS[step]?.target;
      if (!selector) return;
      const el = document.querySelector(selector);
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width > 10 && r.height > 10) {
          setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
          setReady(true);
          return;
        }
      }
      if (attempts < 15) {
        setTimeout(tryFind, 200);
      } else {
        setStep(s => Math.min(s + 1, STEPS.length - 1));
      }
    };
    setTimeout(tryFind, 150);
    const handleResize = () => {
      const selector = STEPS[step]?.target;
      const el = document.querySelector(selector);
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.width > 10 && r.height > 10) {
          setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [step]);

  const next = useCallback(() => {
    if (step < STEPS.length - 1) {
      setReady(false);
      setTimeout(() => setStep(step + 1), 100);
    } else {
      localStorage.setItem('lq-tutorial-done', '1');
      onComplete();
    }
  }, [step, onComplete]);

  const skip = useCallback(() => {
    localStorage.setItem('lq-tutorial-done', '1');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        next();
      }
      if (e.key === 'Escape') {
        skip();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, skip]);

  if (!ready) return null;

  const current = STEPS[step];
  const PAD = 10;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isMobile = vw < 768;

  const spotTop = rect.top - PAD;
  const spotLeft = rect.left - PAD;
  const spotW = rect.width + PAD * 2;
  const spotH = rect.height + PAD * 2;

  const tooltipW = Math.min(340, vw - 32);
  const tooltipH = isMobile ? 180 : 160;

  let ttTop = spotTop + spotH + 14;
  let ttLeft = Math.max(16, Math.min(spotLeft, vw - tooltipW - 16));

  if (ttTop + tooltipH > vh - 16) {
    ttTop = spotTop - tooltipH - 14;
  }
  if (ttTop < 16) {
    ttTop = 16;
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          cursor: 'pointer',
        }}
        onClick={next}
      />

      <div
        style={{
          position: 'fixed',
          top: spotTop,
          left: spotLeft,
          width: spotW,
          height: spotH,
          borderRadius: 8,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.78)',
          zIndex: 10001,
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
          border: '2px solid var(--amber, #f5a623)',
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: ttTop,
          left: ttLeft,
          zIndex: 10002,
          width: tooltipW,
          background: 'var(--bg-2, #1a1a2e)',
          border: '2px solid var(--amber, #f5a623)',
          borderRadius: 8,
          padding: isMobile ? '12px 14px' : '14px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          animation: 'tutorialFadeIn 0.25s ease',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}>
          <span style={{
            background: 'var(--amber, #f5a623)',
            color: '#000',
            fontFamily: 'var(--font-display, monospace)',
            fontSize: isMobile ? 9 : 10,
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 4,
            letterSpacing: 1,
          }}>
            {step + 1}/{STEPS.length}
          </span>
          <span style={{
            fontFamily: 'var(--font-display, monospace)',
            fontSize: isMobile ? 10 : 11,
            fontWeight: 700,
            color: 'var(--amber, #f5a623)',
            letterSpacing: 1,
          }}>
            {current.title}
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body, monospace)',
          fontSize: isMobile ? 14 : 13,
          color: 'var(--parchment, #e0d8c0)',
          lineHeight: 1.5,
          margin: 0,
          marginBottom: 14,
        }}>
          {current.text}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={(e) => { e.stopPropagation(); skip(); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--parchment-2, #888)',
              fontFamily: 'var(--font-display, monospace)',
              fontSize: 9,
              cursor: 'pointer',
              letterSpacing: 1,
              padding: '8px 4px',
              minHeight: 44,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            SALTAR [ESC]
          </button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {!isMobile && (
              <span style={{
                color: 'var(--parchment-2, #666)',
                fontFamily: 'var(--font-display, monospace)',
                fontSize: 9,
              }}>
                ENTER
              </span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                background: 'var(--amber, #f5a623)',
                color: '#000',
                border: 'none',
                borderRadius: 4,
                padding: isMobile ? '12px 20px' : '8px 18px',
                fontFamily: 'var(--font-display, monospace)',
                fontSize: isMobile ? 11 : 10,
                fontWeight: 700,
                letterSpacing: 1,
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              {step < STEPS.length - 1 ? 'SIGUIENTE' : 'ENTENDIDO!'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tutorialFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
