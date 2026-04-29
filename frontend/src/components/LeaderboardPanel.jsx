import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';
import { useToastStore } from '../store/toastStore';

const RANK_COLORS = ['var(--amber)', 'var(--parchment-2)', 'var(--blood)'];
const RANK_LABELS = ['01', '02', '03'];

export default function LeaderboardPanel({ userId }) {
  const [players, setPlayers] = useState([]);
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('global');

  useEffect(() => {
    fetchLeaderboard();
    if (userId) fetchPlayerStats();
  }, [userId, tab]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const endpoint = tab === 'global'
        ? `${import.meta.env.VITE_API_URL}/api/leaderboard/top?limit=10`
        : `${import.meta.env.VITE_API_URL}/api/leaderboard/world/${tab}`;
      const res = await apiFetch(endpoint);
      if (!res.ok) throw new Error('No se pudo cargar el ranking');
      setPlayers(await res.json());
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      useToastStore.getState().error(error.message || 'Error al cargar ranking');
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayerStats = async () => {
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/api/leaderboard/player/${userId}`);
      if (!res.ok) return;
      setPlayerStats(await res.json());
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  };

  const tabs = [
    { id: 'global', label: 'GLOBAL' },
    { id: 1, label: 'M1' }, { id: 2, label: 'M2' },
    { id: 3, label: 'M3' }, { id: 4, label: 'M4' }, { id: 5, label: 'M5' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={tab === t.id ? 'btn btn-amber' : 'btn btn-ghost'}
            style={{ fontSize: 9, padding: '8px 10px' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tu posición */}
      {playerStats && (
        <div className="pcard" style={{ background: 'var(--bg-3)', padding: 14 }}>
          <div className="tiny up" style={{ color: 'var(--plum)', marginBottom: 10 }}>▸ TU POSICIÓN</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { k: 'RANK', v: `#${playerStats.rank}`, c: 'var(--amber)' },
              { k: 'NIV',  v: playerStats.user?.level, c: 'var(--leaf)' },
              { k: 'MISIONES', v: playerStats.questStats?.completed_quests, c: 'var(--sky)' },
              { k: 'LOGROS', v: playerStats.achievements, c: 'var(--plum)' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: s.c, textShadow: '2px 2px 0 var(--ink)' }}>
                  {s.v}
                </div>
                <div className="tiny up muted" style={{ marginTop: 4 }}>{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabla */}
      <div style={{ border: '4px solid var(--ink)', background: 'var(--bg-2)' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '40px 1fr 50px 70px',
          padding: '10px 14px',
          borderBottom: '4px solid var(--ink)',
          background: 'var(--bg-3)',
        }}>
          {['#', 'JUGADOR', 'NIV', 'XP'].map(h => (
            <div key={h} className="tiny up" style={{ color: 'var(--amber)' }}>{h}</div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: 20, textAlign: 'center' }}>
            <div className="tiny up muted">CARGANDO...</div>
          </div>
        ) : players.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center' }}>
            <div className="tiny up muted">SIN DATOS</div>
          </div>
        ) : (
          players.map((player, i) => {
            const isMe = userId === player.id;
            const rankColor = i < 3 ? RANK_COLORS[i] : 'var(--parchment-2)';
            return (
              <div
                key={player.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 50px 70px',
                  padding: '10px 14px',
                  borderBottom: i < players.length - 1 ? '4px solid var(--ink)' : 'none',
                  background: isMe ? 'var(--bg-3)' : 'transparent',
                  outline: isMe ? '4px solid var(--amber)' : 'none',
                  outlineOffset: -4,
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: rankColor }}>
                  {i < 3 ? RANK_LABELS[i] : `${String(player.rank).padStart(2, '0')}`}
                </div>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: 13, color: isMe ? 'var(--amber)' : 'var(--parchment)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {isMe ? '▶ ' : ''}{player.username}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--leaf)', textAlign: 'right' }}>
                  {player.level}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--sky)', textAlign: 'right' }}>
                  {player.xp?.toLocaleString()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
