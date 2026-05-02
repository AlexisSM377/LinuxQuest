import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';

export default function GameNav({ onShowAchievements }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { userStats } = useGameStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav" style={{ flexShrink: 0, position: 'relative' }}>
      {/* Siempre visible */}
      <button className="nav-item" onClick={() => navigate('/')}>
        ◀ <span className="nav-label-full">MAPA</span>
      </button>

      <div className="nav-brand">
        <span style={{ fontSize: 16 }}>⬡</span>
        <span className="nav-label-full">LINUXQUEST</span>
        <span className="nav-label-short">LQ</span>
      </div>

      {/* Derecha — desktop: todo visible; mobile: solo nivel + menú */}
      <div className="nav-right">

        {/* Nivel — siempre visible */}
        <div className="nav-item" style={{ cursor: 'default', gap: 6 }}>
          <span className="tiny up" style={{ color: 'var(--amber)' }}>NIV</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11 }}>
            {String(userStats?.level || 1).padStart(2, '0')}
          </span>
        </div>

        {/* XP, monedas, barra — ocultos en móvil */}
        <div className="nav-item nav-hide-mobile" style={{ cursor: 'default', gap: 6 }}>
          <span className="tiny up" style={{ color: 'var(--amber)' }}>XP</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11 }}>
            {userStats?.xp || 0}
          </span>
        </div>

        <div className="nav-item nav-hide-mobile" style={{ cursor: 'default', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--amber)' }}>
            ◈ {userStats?.coins || 0}
          </span>
        </div>

        <div className="nav-hide-mobile" style={{ height: '100%', width: '140px', display: 'flex', alignItems: 'center', padding: '0 16px', borderLeft: '4px solid var(--ink)' }}>
          <div className="bar" style={{ flex: 1, height: 12 }}>
            <i style={{ width: `${userStats?.progress || 0}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <button className="nav-item nav-hide-mobile" onClick={() => navigate('/stats')}>
          STATS ↗
        </button>

        <button className="nav-item nav-hide-mobile" onClick={onShowAchievements}>
          LOGROS
        </button>

        {/* Menú hamburguesa — solo en móvil */}
        <button
          className="nav-item nav-show-mobile"
          onClick={() => setMenuOpen(o => !o)}
          style={{ fontSize: 16, padding: '14px 16px' }}
          aria-label="Menú"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <button className="nav-cta" onClick={handleLogout}>
          SALIR
        </button>
      </div>

      {/* Dropdown menú móvil */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'var(--bg-2)',
          border: '4px solid var(--ink)',
          borderTop: 'none',
          zIndex: 100,
          minWidth: 180,
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '3px solid var(--ink)',
            fontFamily: 'var(--font-display)',
            fontSize: 9,
            color: 'var(--amber)',
          }}>
            XP: {userStats?.xp || 0} · ◈ {userStats?.coins || 0}
          </div>
          <button
            onClick={() => { navigate('/stats'); setMenuOpen(false); }}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '14px 16px',
              fontFamily: 'var(--font-display)', fontSize: 9,
              color: 'var(--parchment)', background: 'none',
              border: 'none', borderBottom: '3px solid var(--ink)',
              cursor: 'pointer',
            }}
          >
            STATS ↗
          </button>
          <button
            onClick={() => { onShowAchievements(); setMenuOpen(false); }}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '14px 16px',
              fontFamily: 'var(--font-display)', fontSize: 9,
              color: 'var(--parchment)', background: 'none', border: 'none',
              cursor: 'pointer',
            }}
          >
            LOGROS
          </button>
        </div>
      )}
    </nav>
  );
}
