import { useState } from 'react';

const FILTER_OPTS = [
  { id: 'all',    label: 'TODOS' },
  { id: 'earned', label: 'DESBLOQUEADOS' },
  { id: 'locked', label: 'BLOQUEADOS' },
];

export default function AchievementsPanel({ achievements, userAchievements, onClose }) {
  const [filter, setFilter] = useState('all');

  const earnedIds = userAchievements.map(a => a.id);
  const earnedCount = earnedIds.length;
  const totalCount = achievements.length;
  const pct = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;

  const filtered = achievements.filter(a => {
    if (filter === 'earned') return earnedIds.includes(a.id);
    if (filter === 'locked') return !earnedIds.includes(a.id);
    return true;
  });

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(26, 15, 31, 0.85)',
      zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    }}>
      <div style={{
        background: 'var(--bg-2)',
        border: '4px solid var(--ink)',
        boxShadow: '8px 8px 0 var(--shadow)',
        width: '100%', maxWidth: 640,
        maxHeight: '85vh',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '4px solid var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--bg-3)',
          flexShrink: 0,
        }}>
          <div>
            <div className="tiny up" style={{ color: 'var(--amber)', marginBottom: 6 }}>▸ GALERÍA DE LOGROS</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--parchment)', textShadow: '2px 2px 0 var(--ink)' }}>
              {earnedCount} / {totalCount} DESBLOQUEADOS
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 140 }}>
              <div className="bar">
                <i style={{ width: pct + '%', background: 'var(--amber)' }} />
              </div>
              <div className="tiny up muted" style={{ marginTop: 4 }}>{pct}%</div>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ fontSize: 14, padding: '8px 12px' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{
          padding: '10px 16px',
          borderBottom: '4px solid var(--ink)',
          display: 'flex', gap: 6,
          flexShrink: 0,
          background: 'var(--bg-2)',
        }}>
          {FILTER_OPTS.map(o => (
            <button
              key={o.id}
              onClick={() => setFilter(o.id)}
              className={filter === o.id ? 'btn btn-amber' : 'btn btn-ghost'}
              style={{ fontSize: 8, padding: '8px 10px' }}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ overflowY: 'auto', flex: 1, padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {filtered.map(achievement => {
              const earned = earnedIds.includes(achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={earned ? 'pcard' : 'pcard locked'}
                  style={{
                    background: earned ? 'var(--bg-2)' : 'var(--bg)',
                    padding: 12,
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    background: earned ? 'var(--amber)' : 'var(--bg-3)',
                    border: '4px solid var(--ink)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    {achievement.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: 9,
                      color: earned ? 'var(--parchment)' : 'var(--parchment-2)',
                      marginBottom: 4,
                      textShadow: earned ? '2px 2px 0 var(--ink)' : 'none',
                    }}>
                      {achievement.title}
                    </div>
                    <div className="vt muted" style={{ fontSize: 15 }}>{achievement.description}</div>
                    <div className="tiny up" style={{ marginTop: 4, color: earned ? 'var(--leaf)' : 'var(--parchment-2)', opacity: earned ? 1 : 0.5 }}>
                      {earned ? '✓ DESBLOQUEADO' : '✕ BLOQUEADO'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
