import { useState, useEffect, useRef } from 'react';

const STEPS = [
  {
    target: '[data-tutorial="nav"]',
    title: 'BARRA DE NAVEGACIÓN',
    text: 'Aquí ves tu nivel, XP, monedas y puedes acceder a estadísticas y logros. Es tu panel de control superior.',
  },
  {
    target: '[data-tutorial="quest-detail"]',
    title: 'DETALLE DE LA MISIÓN',
    text: 'Cuando seleccionas una misión, aquí ves la historia, los comandos que debes usar, las pistas y tu progreso. Lee bien la historia — te guía hacia la solución.',
  },
  {
    target: '[data-tutorial="quest-list"]',
    title: 'LISTA DE MISIONES',
    text: 'Cada mundo tiene misiones organizadas. Las que tienen 🔒 requieren completar misiones previas. Las que tienen ► están en progreso. Las ✓ ya las completaste.',
  },
  {
    target: '[data-tutorial="terminal-bar"]',
    title: 'BARRA DE LA TERMINAL',
    text: 'Muestra en qué misión estás trabajando. Los puntos de colores son decorativos. Puedes cambiar el tema de la terminal si tu nivel lo permite.',
  },
  {
    target: '[data-tutorial="terminal"]',
    title: 'TERMINAL',
    text: 'Aquí escribes los comandos de Linux. La terminal valida cada comando contra la misión actual. Solo se permiten los comandos que la misión requiere. ¡Escribe help si necesitas ayuda!',
  },
];

export default function GameTutorial({ onComplete }) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateRect();
      setVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    const handleResize = () => updateRect();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [step]);

  const updateRect = () => {
    const selector = STEPS[step]?.target;
    if (!selector) return;
    const el = document.querySelector(selector);
    if (el) {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    } else {
      setRect(null);
    }
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setVisible(false);
      setTimeout(() => setStep(step + 1), 150);
    } else {
      localStorage.setItem('lq-tutorial-done', '1');
      onComplete();
    }
  };

  const skip = () => {
    localStorage.setItem('lq-tutorial-done', '1');
    onComplete();
  };

  if (!visible) return null;

  const current = STEPS[step];
  const PAD = 12;
  const spotStyle = rect
    ? {
        position: 'fixed',
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
        borderRadius: 8,
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.78)',
        zIndex: 10001,
        pointerEvents: 'none',
        transition: 'all 0.35s ease',
      }
    : {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height: 120,
        borderRadius: 8,
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.78)',
        zIndex: 10001,
        pointerEvents: 'none',
        transition: 'all 0.35s ease',
      };

  const tooltipTop = rect
    ? rect.top + rect.height + 20
    : '50%';
  const tooltipLeft = rect
    ? Math.max(16, Math.min(rect.left, window.innerWidth - 360))
    : '50%';

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
      <div style={spotStyle} />

      <div
        style={{
          position: 'fixed',
          top: tooltipTop,
          left: tooltipLeft,
          zIndex: 10002,
          width: 340,
          background: 'var(--bg-2, #1a1a2e)',
          border: '2px solid var(--amber, #f5a623)',
          borderRadius: 8,
          padding: '16px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          animation: 'tutorialFadeIn 0.3s ease',
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
            fontSize: 10,
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 4,
            letterSpacing: 1,
          }}>
            {step + 1}/{STEPS.length}
          </span>
          <span style={{
            fontFamily: 'var(--font-display, monospace)',
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--amber, #f5a623)',
            letterSpacing: 1,
          }}>
            {current.title}
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body, monospace)',
          fontSize: 13,
          color: 'var(--parchment, #e0d8c0)',
          lineHeight: 1.5,
          margin: 0,
          marginBottom: 14,
        }}>
          {current.text}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={skip}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--parchment-2, #888)',
              fontFamily: 'var(--font-display, monospace)',
              fontSize: 9,
              cursor: 'pointer',
              letterSpacing: 1,
              padding: '4px 0',
            }}
          >
            SALTAR TUTORIAL
          </button>
          <button
            onClick={next}
            style={{
              background: 'var(--amber, #f5a623)',
              color: '#000',
              border: 'none',
              borderRadius: 4,
              padding: '8px 20px',
              fontFamily: 'var(--font-display, monospace)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              cursor: 'pointer',
            }}
          >
            {step < STEPS.length - 1 ? 'SIGUIENTE ▶' : '¡ENTENDIDO!'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes tutorialFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
