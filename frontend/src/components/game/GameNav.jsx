import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';

export default function GameNav({ onShowAchievements }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { userStats } = useGameStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav" style={{ flexShrink: 0 }}>
      <button className="nav-item" onClick={() => navigate('/')}>
        ◀ MAPA
      </button>

      <div className="nav-brand">
        <span style={{ fontSize: 16 }}>⬡</span>
        <span>LINUXQUEST</span>
      </div>

      <div className="nav-right">
        <div className="nav-item" style={{ cursor: 'default', gap: 6 }}>
          <span className="tiny up" style={{ color: 'var(--amber)' }}>NIV</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11 }}>
            {String(userStats?.level || 1).padStart(2, '0')}
          </span>
        </div>

        <div className="nav-item" style={{ cursor: 'default', gap: 6 }}>
          <span className="tiny up" style={{ color: 'var(--amber)' }}>XP</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11 }}>
            {userStats?.xp || 0}
          </span>
        </div>

        <div className="nav-item" style={{ cursor: 'default', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--amber)' }}>
            ◈ {userStats?.coins || 0}
          </span>
        </div>

        <div style={{ height: '100%', width: '180px', display: 'flex', alignItems: 'center', padding: '0 16px', borderLeft: '4px solid var(--ink)' }}>
          <div className="bar" style={{ flex: 1, height: 12 }}>
            <i style={{ width: `${userStats?.progress || 0}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <button className="nav-item" onClick={() => navigate('/stats')}>
          STATS ↗
        </button>

        <button className="nav-item" onClick={onShowAchievements}>
          LOGROS
        </button>

        <button className="nav-cta" onClick={handleLogout}>
          SALIR
        </button>
      </div>
    </nav>
  );
}
