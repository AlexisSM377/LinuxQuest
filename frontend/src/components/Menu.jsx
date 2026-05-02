import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';

function HeroTerminal() {
  const lines = [
    { prompt: true, cmd: 'whoami', delay: 400 },
    { output: 'aprendiz_de_kernel', delay: 200 },
    { prompt: true, cmd: 'cat /etc/linuxquest', delay: 600 },
    { output: 'NIVEL: 4 / 85\nXP: 245   RACHA: 7d', delay: 200 },
    { prompt: true, cmd: './iniciar.sh', delay: 700 },
    { output: '> Cargando misión "La búsqueda perdida"...', delay: 300 },
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(s => s + 1), lines[shown].delay);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className="term scanlines" style={{ width: 'min(520px, 100%)' }}>
      <div className="term-bar">
        <div className="term-dots">
          <span className="term-dot"></span>
          <span className="term-dot y"></span>
          <span className="term-dot g"></span>
        </div>
        <span style={{ marginLeft: 8 }}>~/quest — bash</span>
      </div>
      <div className="term-body">
        {lines.slice(0, shown).map((l, i) => (
          <div className="term-line" key={i}>
            {l.prompt ? (
              <>
                <span className="term-prompt">pixie@linuxquest</span>
                <span style={{ color: '#f4e4c1' }}>:</span>
                <span style={{ color: '#5fb3d4' }}>~</span>
                <span style={{ color: '#f4e4c1' }}>$ </span>
                <span className="term-user">{l.cmd}</span>
              </>
            ) : (
              <span style={{ color: '#c8f4c0', whiteSpace: 'pre-wrap' }}>{l.output}</span>
            )}
          </div>
        ))}
        {shown >= lines.length && <span className="term-cursor"></span>}
      </div>
    </div>
  );
}

function StatsBar({ userStats }) {
  const stats = [
    { k: 'NIVEL ACTUAL', v: String(userStats.level).padStart(2, '0'), sub: `${userStats.xpToNext} XP PARA SUBIR` },
    { k: 'XP TOTAL',     v: userStats.xp,    sub: 'PUNTOS DE EXPERIENCIA' },
    { k: 'MONEDAS',      v: userStats.coins,  sub: 'MONEDAS GANADAS' },
    { k: 'PROGRESO',     v: `${Math.round(userStats.progress || 0)}%`, sub: 'DEL VIAJE COMPLETADO' },
  ];
  return (
    <div className="stats-grid">
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: '22px 28px',
          borderRight: i < 3 ? '4px solid var(--ink)' : 'none',
          background: i % 2 ? 'var(--bg-2)' : 'var(--bg)',
        }}>
          <div className="tiny up" style={{ color: 'var(--amber)' }}>{s.k}</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            marginTop: 8,
            color: 'var(--parchment)',
            textShadow: '3px 3px 0 var(--ink)',
          }}>{s.v}</div>
          <div className="tiny up muted" style={{ marginTop: 6 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

const FEATURES = [
  {
    icon: '⌨',
    title: 'TERMINAL REAL',
    body: '85 misiones diseñadas para que aprendas usando comandos reales en un entorno seguro.',
  },
  {
    icon: '⬡',
    title: 'DESBLOQUEA LOGROS',
    body: '12 badges, sistema de XP y 20 niveles de progresión. Sube de rango completando misiones.',
  },
  {
    icon: '⚡',
    title: 'COMPITE GLOBALMENTE',
    body: 'Tabla de clasificación global. ¿Cuánto tardas en dominar el filesystem?',
  },
];

export default function Menu({ onNewGame, onContinue }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { userStats, fetchUserStats } = useGameStore();

  useEffect(() => {
    if (isAuthenticated) fetchUserStats();
  }, [isAuthenticated]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-item active" style={{ cursor: 'default' }}>
          <span>INICIO</span>
        </div>
        {isAuthenticated && (
          <>
            <div className="nav-item">
              <span>XP: {userStats.xp}</span>
            </div>
            <div className="nav-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/stats')}>
              <span>NIV: {String(userStats.level).padStart(2, '0')}</span>
              <span className="arrow">↗</span>
            </div>
          </>
        )}

        <div className="nav-brand">
          <span style={{ fontSize: 20 }}>⬡</span>
          <span>LINUXQUEST</span>
        </div>

        <div className="nav-right">
          {isAuthenticated ? (
            <button className="nav-cta" onClick={onContinue}>
              CONTINUAR ▶
            </button>
          ) : (
            <button className="nav-cta" onClick={() => navigate('/login')}>
              INICIAR SESIÓN ↗
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 48px) 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 48,
        alignItems: 'center',
        borderBottom: '4px solid var(--ink)',
        backgroundImage: 'radial-gradient(circle at 30% 30%, var(--bg-2) 0%, var(--bg) 60%)',
      }}>
        <div>
          <div className="tiny up" style={{ marginBottom: 18, color: 'var(--amber)' }}>
            ▸ APRENDE LINUX JUGANDO
          </div>
          <h1 style={{ marginBottom: 24, fontSize: 'clamp(28px, 4vw, 52px)' }}>
            DESBLOQUEA<br />
            <span style={{ color: 'var(--amber)' }}>EL TERMINAL</span><br />
            PIXEL A PIXEL
          </h1>
          <p className="vt vt-lg" style={{ maxWidth: 520, marginBottom: 32, color: 'var(--parchment-2)' }}>
            85 misiones, 5 mundos y un pingüino pixelado que cree en ti.
            Desde <code>pwd</code> hasta <code>awk</code> — sin instalar nada.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <button className="btn btn-amber" onClick={onContinue}>
                  CONTINUAR MISIÓN ▶
                </button>
                <button className="btn" onClick={() => navigate('/stats')}>
                  VER PROGRESO
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-amber" onClick={onNewGame}>
                  COMENZAR GRATIS ▶
                </button>
                <button className="btn btn-ghost" onClick={() => navigate('/login')}>
                  YA TENGO CUENTA
                </button>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HeroTerminal />
        </div>
      </div>

      {/* Stats bar (solo autenticado) */}
      {isAuthenticated && <StatsBar userStats={userStats} />}

      {/* Feature cards (solo visitante) */}
      {!isAuthenticated && (
        <div style={{
          padding: 'clamp(32px, 5vw, 48px)',
          borderBottom: '4px solid var(--ink)',
          background: 'var(--bg-2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="pcard">
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <div className="tiny up" style={{ color: 'var(--amber)', marginBottom: 10 }}>{f.title}</div>
              <p className="vt" style={{ color: 'var(--parchment-2)', fontSize: 18 }}>{f.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer style={{
        padding: '32px clamp(24px, 5vw, 48px)',
        borderTop: '4px solid var(--ink)',
        background: 'var(--bg-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--amber)' }}>
          LINUXQUEST
        </div>
        <div className="tiny up muted">PRESS START 2P · VT323 · JETBRAINS MONO</div>
        <div className="tiny up muted">v1.0 · 2026</div>
      </footer>
    </div>
  );
}
